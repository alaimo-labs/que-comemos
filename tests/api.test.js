import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../server/llm/index.js', async (importOriginal) => {
  const real = await importOriginal();
  return { ...real, extraerItems: vi.fn(), generarPlan: vi.fn(), testConnection: vi.fn() };
});

import { extraerItems, generarPlan } from '../server/llm/index.js';
import { db } from '../server/db/index.js';
import { createApp } from '../server/app.js';

const PLAN_FAKE = {
  periodo: { tipo: 'semanal', duracion: '3', familia: '4', objetivo: 'cenas' },
  platos: [
    {
      periodo_dia: '1',
      comida: 'cena',
      nombre: 'Arroz con pollo',
      porciones: '4',
      ingredientes_disponibles: ['Arroz', 'Pollo'],
      ingredientes_a_comprar: [],
      preparacion_breve: 'Cocinar.',
    },
  ],
  lista_de_compras: [],
  alimentos_disponibles_sin_uso: [],
  supuestos_y_alertas: [],
};

let server;
let base;

beforeAll(async () => {
  await new Promise((resolve) => {
    server = createApp().listen(0, '127.0.0.1', resolve);
  });
  base = `http://127.0.0.1:${server.address().port}`;
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  db.exec('DELETE FROM ciclo_items; DELETE FROM ciclos; DELETE FROM settings;');
  vi.clearAllMocks();
});

function pedir(method, path, body) {
  return fetch(base + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

async function json(method, path, body) {
  const res = await pedir(method, path, body);
  return { status: res.status, body: await res.json() };
}

// Deja un ciclo en triage con los ítems que devuelva el mock de extracción.
async function cicloEnTriage(itemsExtraidos = [], primeraFotoTs) {
  const { body: creado } = await json('POST', '/api/ciclos', {});
  extraerItems.mockResolvedValue(itemsExtraidos);
  await json('POST', `/api/ciclos/${creado.ciclo.id}/extraccion`, {
    imagenes: [{ imagen: 'AAA', mediaType: 'image/jpeg' }],
    primera_foto_ts: primeraFotoTs,
  });
  return creado.ciclo.id;
}

describe('settings', () => {
  it('GET devuelve los defaults del hogar', async () => {
    const { body } = await json('GET', '/api/settings');
    expect(body.input_mode).toBe('archivos');
    expect(body.horizonte_dias).toBe('7');
    expect(body.familia).toBe('4');
    expect(body.restricciones).toBe('');
    expect(body.gustos).toBe('');
    expect(body.modo).toBe('con_lo_que_tengo');
    expect(body.comidas).toEqual(['desayuno', 'almuerzo', 'merienda', 'cena']);
  });

  it('PUT persiste el perfil del hogar completo', async () => {
    const { status } = await json('PUT', '/api/settings', {
      input_mode: 'camara',
      horizonte_dias: 5,
      familia: 3,
      restricciones: 'sin maní',
      gustos: 'guisos',
      modo: 'con_compra_adicional',
      comidas: ['almuerzo', 'cena'],
    });
    expect(status).toBe(200);
    const { body } = await json('GET', '/api/settings');
    expect(body.input_mode).toBe('camara');
    expect(body.horizonte_dias).toBe('5');
    expect(body.familia).toBe('3');
    expect(body.restricciones).toBe('sin maní');
    expect(body.gustos).toBe('guisos');
    expect(body.modo).toBe('con_compra_adicional');
    expect(body.comidas).toEqual(['almuerzo', 'cena']);
  });

  it('valida horizonte, familia, input_mode, modo y comidas', async () => {
    expect((await json('PUT', '/api/settings', { horizonte_dias: 0 })).status).toBe(400);
    expect((await json('PUT', '/api/settings', { horizonte_dias: 31 })).status).toBe(400);
    expect((await json('PUT', '/api/settings', { familia: 0 })).status).toBe(400);
    expect((await json('PUT', '/api/settings', { input_mode: 'telepatía' })).status).toBe(400);
    expect((await json('PUT', '/api/settings', { modo: 'a_lo_loco' })).status).toBe(400);
    expect((await json('PUT', '/api/settings', { comidas: [] })).status).toBe(400);
    expect((await json('PUT', '/api/settings', { comidas: ['brunch'] })).status).toBe(400);
    expect((await json('PUT', '/api/settings', { comidas: 'cena' })).status).toBe(400);
  });

  it('la API key es write-only: el GET solo expone last4', async () => {
    await json('PUT', '/api/settings', { keys: { anthropic: 'sk-super-secreta-1234' } });
    const { body } = await json('GET', '/api/settings');
    expect(body.keys.anthropic).toEqual({ configured: true, last4: '1234' });
    expect(JSON.stringify(body)).not.toContain('sk-super-secreta');
  });
});

describe('ciclo de vida del ciclo', () => {
  it('crea en captura con el horizonte del perfil, pisable por body', async () => {
    await json('PUT', '/api/settings', { horizonte_dias: 10 });
    const { body: a } = await json('POST', '/api/ciclos', {});
    expect(a.ciclo.estado).toBe('captura');
    expect(a.ciclo.horizonte_dias).toBe(10);

    const { body: b } = await json('POST', '/api/ciclos', { horizonte_dias: 3 });
    expect(b.ciclo.horizonte_dias).toBe(3);
  });

  it('abrir un ciclo nuevo abandona los abiertos pero no los completados', async () => {
    const idTriage = await cicloEnTriage();
    const { body: completadoRes } = await json('POST', '/api/ciclos', {});
    const idCaptura = completadoRes.ciclo.id;
    // El de triage quedó abandonado; simulamos que el nuevo se completa.
    db.prepare("UPDATE ciclos SET estado = 'propuesta' WHERE id = ?").run(idCaptura);

    await json('POST', '/api/ciclos', {});
    const estados = db.prepare('SELECT id, estado, abandonado_desde FROM ciclos ORDER BY id').all();
    expect(estados.find((c) => c.id === idTriage)).toMatchObject({
      estado: 'abandonado',
      abandonado_desde: 'triage',
    });
    expect(estados.find((c) => c.id === idCaptura).estado).toBe('propuesta');
  });

  it('toma modo y comidas del perfil, pisables por body', async () => {
    await json('PUT', '/api/settings', { modo: 'con_compra_adicional', comidas: ['cena'] });
    const { body: delPerfil } = await json('POST', '/api/ciclos', {});
    expect(delPerfil.ciclo.modo).toBe('con_compra_adicional');
    expect(delPerfil.ciclo.comidas).toEqual(['cena']);

    const { body: pisado } = await json('POST', '/api/ciclos', {
      modo: 'con_lo_que_tengo',
      comidas: ['desayuno', 'merienda'],
    });
    expect(pisado.ciclo.modo).toBe('con_lo_que_tengo');
    expect(pisado.ciclo.comidas).toEqual(['desayuno', 'merienda']);

    expect((await json('POST', '/api/ciclos', { modo: 'x' })).status).toBe(400);
    expect((await json('POST', '/api/ciclos', { comidas: [] })).status).toBe(400);
  });

  it('PATCH pisa modo y comidas en un gesto', async () => {
    const { body: creado } = await json('POST', '/api/ciclos', {});
    expect(creado.ciclo.modo).toBe('con_lo_que_tengo');
    expect(creado.ciclo.comidas).toEqual(['desayuno', 'almuerzo', 'merienda', 'cena']);

    const { body } = await json('PATCH', `/api/ciclos/${creado.ciclo.id}`, {
      modo: 'con_compra_adicional',
      comidas: ['almuerzo', 'cena'],
    });
    expect(body.ciclo.modo).toBe('con_compra_adicional');
    expect(body.ciclo.comidas).toEqual(['almuerzo', 'cena']);

    expect(
      (await json('PATCH', `/api/ciclos/${creado.ciclo.id}`, { comidas: ['brunch'] })).status
    ).toBe(400);
    expect((await json('PATCH', `/api/ciclos/${creado.ciclo.id}`, {})).status).toBe(400);
  });

  it('GET /actual devuelve null sin ciclos y el vigente cuando existe', async () => {
    expect((await json('GET', '/api/ciclos/actual')).body.ciclo).toBeNull();
    const { body } = await json('POST', '/api/ciclos', {});
    const { body: actual } = await json('GET', '/api/ciclos/actual');
    expect(actual.ciclo.id).toBe(body.ciclo.id);
    expect(actual.items).toEqual([]);
    expect(actual.propuesta).toBeNull();
  });
});

describe('extracción', () => {
  it('un llamado con n imágenes inserta los ítems y transiciona a triage', async () => {
    const { body: creado } = await json('POST', '/api/ciclos', {});
    extraerItems.mockResolvedValue([
      { nombre: 'Leche', cantidad: '1', confianza: 'confirmado' },
      { nombre: 'Tupper', cantidad: '1', confianza: 'a_confirmar' },
    ]);

    const ts = '2026-07-31T10:00:00.000Z';
    const { status, body } = await json('POST', `/api/ciclos/${creado.ciclo.id}/extraccion`, {
      imagenes: [
        { imagen: 'AAA', mediaType: 'image/jpeg' },
        { imagen: 'BBB', mediaType: 'image/jpeg' },
      ],
      primera_foto_ts: ts,
    });

    expect(status).toBe(200);
    expect(extraerItems).toHaveBeenCalledTimes(1);
    expect(extraerItems.mock.calls[0][0].imagenes).toHaveLength(2);
    expect(body.ciclo.estado).toBe('triage');
    expect(body.ciclo.fotos_count).toBe(2);
    expect(body.ciclo.primera_foto_at).toBe(ts);
    expect(body.items).toHaveLength(2);
    expect(body.items.every((i) => i.origen === 'foto')).toBe(true);
  });

  it('la extracción ocurre una sola vez por ciclo (reintento → 409)', async () => {
    const id = await cicloEnTriage();
    const { status } = await json('POST', `/api/ciclos/${id}/extraccion`, {
      imagenes: [{ imagen: 'AAA', mediaType: 'image/jpeg' }],
    });
    expect(status).toBe(409);
  });

  it('sin imágenes → 400; fotos sin alimentos → 200 con lista vacía', async () => {
    const { body: creado } = await json('POST', '/api/ciclos', {});
    expect(
      (await json('POST', `/api/ciclos/${creado.ciclo.id}/extraccion`, { imagenes: [] })).status
    ).toBe(400);

    extraerItems.mockResolvedValue([]);
    const { status, body } = await json('POST', `/api/ciclos/${creado.ciclo.id}/extraccion`, {
      imagenes: [{ imagen: 'AAA', mediaType: 'image/jpeg' }],
    });
    expect(status).toBe(200);
    expect(body.items).toEqual([]);
    expect(body.ciclo.estado).toBe('triage');
  });
});

describe('triage: CRUD de ítems', () => {
  it('agrega manual y sobra, que nacen confirmados con su origen', async () => {
    const id = await cicloEnTriage();
    const { body: manual } = await json('POST', `/api/ciclos/${id}/items`, {
      nombre: 'Arroz',
      cantidad: '1 kg',
      origen: 'manual',
    });
    const { body: sobra } = await json('POST', `/api/ciclos/${id}/items`, {
      nombre: 'Guiso',
      cantidad: '2 porciones',
      origen: 'sobra',
    });
    expect(manual.item).toMatchObject({ confianza: 'confirmado', origen: 'manual' });
    expect(sobra.item).toMatchObject({ confianza: 'confirmado', origen: 'sobra' });
  });

  it('edita nombre, cantidad y confianza; borra', async () => {
    const id = await cicloEnTriage([
      { nombre: 'Lech', cantidad: '1', confianza: 'a_revisar' },
    ]);
    const itemId = db.prepare('SELECT id FROM ciclo_items WHERE ciclo_id = ?').get(id).id;

    const { body: editado } = await json('PATCH', `/api/ciclos/${id}/items/${itemId}`, {
      nombre: 'Leche',
      cantidad: '2 L',
    });
    expect(editado.item).toMatchObject({ nombre: 'Leche', cantidad: '2 L' });

    const { body: confirmado } = await json('PATCH', `/api/ciclos/${id}/items/${itemId}`, {
      confianza: 'confirmado',
    });
    expect(confirmado.item.confianza).toBe('confirmado');

    expect((await json('DELETE', `/api/ciclos/${id}/items/${itemId}`)).status).toBe(200);
    expect((await json('DELETE', `/api/ciclos/${id}/items/${itemId}`)).status).toBe(404);
  });

  it('valida campos y rechaza fuera de triage', async () => {
    const id = await cicloEnTriage();
    expect(
      (await json('POST', `/api/ciclos/${id}/items`, { nombre: '', cantidad: '1', origen: 'manual' })).status
    ).toBe(400);
    expect(
      (await json('POST', `/api/ciclos/${id}/items`, { nombre: 'X', cantidad: '1', origen: 'foto' })).status
    ).toBe(400);

    const { body: enCaptura } = await json('POST', '/api/ciclos', {});
    expect(
      (await json('POST', `/api/ciclos/${enCaptura.ciclo.id}/items`, {
        nombre: 'X',
        cantidad: '1',
        origen: 'manual',
      })).status
    ).toBe(409);
  });
});

describe('propuesta', () => {
  it('guarda el plan, cierra el ciclo y devuelve la métrica foto→propuesta', async () => {
    const hace60s = new Date(Date.now() - 60_000).toISOString();
    const id = await cicloEnTriage(
      [{ nombre: 'Arroz', cantidad: '1 kg', confianza: 'confirmado' }],
      hace60s
    );
    generarPlan.mockResolvedValue(PLAN_FAKE);

    const { status, body } = await json('POST', `/api/ciclos/${id}/propuesta`);
    expect(status).toBe(200);
    expect(body.ciclo.estado).toBe('propuesta');
    expect(body.propuesta.platos[0].nombre).toBe('Arroz con pollo');
    expect(generarPlan.mock.calls[0][0]).toMatchObject({
      modo: 'con_lo_que_tengo',
      comidas: ['desayuno', 'almuerzo', 'merienda', 'cena'],
    });
    expect(body.metrica.foto_a_propuesta_seg).toBeGreaterThanOrEqual(59);
    expect(body.metrica.foto_a_propuesta_seg).toBeLessThan(120);

    // Retomable: GET /actual devuelve la propuesta persistida.
    const { body: actual } = await json('GET', '/api/ciclos/actual');
    expect(actual.propuesta.platos).toHaveLength(1);
  });

  it('sin ítems → 400; con solo a_confirmar → 400 honesto; fuera de triage → 409', async () => {
    const sinItems = await cicloEnTriage();
    expect((await json('POST', `/api/ciclos/${sinItems}/propuesta`)).status).toBe(400);

    const soloDudosos = await cicloEnTriage([
      { nombre: 'Tupper', cantidad: '1', confianza: 'a_confirmar' },
    ]);
    const res = await json('POST', `/api/ciclos/${soloDudosos}/propuesta`);
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('a confirmar');
    expect(generarPlan).not.toHaveBeenCalled();

    const { body: enCaptura } = await json('POST', '/api/ciclos', {});
    expect((await json('POST', `/api/ciclos/${enCaptura.ciclo.id}/propuesta`)).status).toBe(409);
  });
});

describe('métricas', () => {
  it('expone tiempos, conteo por origen y abandono', async () => {
    const hace30s = new Date(Date.now() - 30_000).toISOString();
    const idCompletado = await cicloEnTriage(
      [{ nombre: 'Arroz', cantidad: '1', confianza: 'confirmado' }],
      hace30s
    );
    await json('POST', `/api/ciclos/${idCompletado}/items`, {
      nombre: 'Guiso',
      cantidad: '2 porciones',
      origen: 'sobra',
    });
    generarPlan.mockResolvedValue(PLAN_FAKE);
    await json('POST', `/api/ciclos/${idCompletado}/propuesta`);

    const idAbandonado = await cicloEnTriage();
    await json('POST', '/api/ciclos', {});

    const { body } = await json('GET', '/api/metricas/ciclos');
    const completado = body.ciclos.find((c) => c.id === idCompletado);
    const abandonado = body.ciclos.find((c) => c.id === idAbandonado);

    expect(completado).toMatchObject({ estado: 'propuesta', items_foto: 1, items_sobra: 1 });
    expect(completado.foto_a_propuesta_seg).toBeGreaterThanOrEqual(29);
    expect(completado.modo).toBe('con_lo_que_tengo');
    expect(completado.comidas).toEqual(['desayuno', 'almuerzo', 'merienda', 'cena']);
    expect(abandonado).toMatchObject({ estado: 'abandonado', abandonado_desde: 'triage' });
  });
});
