import { Router } from 'express';
import { db, getSetting } from '../db/index.js';
import { extraerItems, generarPlan } from '../llm/index.js';
import { itemsPlanificables } from '../llm/prompts.js';
import { HOGAR_DEFAULTS, MODOS, normalizarComidas } from './settings.js';

export const ciclosRouter = Router();
export const metricasRouter = Router();

const CONFIANZAS = ['confirmado', 'a_revisar', 'a_confirmar'];
const ORIGENES_MANUALES = ['manual', 'sobra'];

function hogar(clave) {
  return getSetting(clave) ?? HOGAR_DEFAULTS[clave];
}

function buscarCiclo(id) {
  return db.prepare('SELECT * FROM ciclos WHERE id = ?').get(id);
}

function itemsDelCiclo(cicloId) {
  return db
    .prepare('SELECT * FROM ciclo_items WHERE ciclo_id = ? ORDER BY id')
    .all(cicloId);
}

function publicarCiclo(ciclo) {
  const { propuesta_json, ...resto } = ciclo;
  return { ...resto, comidas: JSON.parse(ciclo.comidas) };
}

function errorIA(res, err) {
  if (err?.code === 'needs_key') {
    return res.status(400).json({ error: err.message });
  }
  res.status(502).json({
    error:
      'No pudimos hablar con el servicio de IA. Revisá tu conexión y la API Key, y volvé a intentar.',
    detail: err?.message || String(err),
  });
}

// Abrir un ciclo nuevo: reemplaza (lógicamente) al que estuviera abierto.
ciclosRouter.post('/', (req, res) => {
  const horizonte = Number(req.body?.horizonte_dias ?? hogar('horizonte_dias'));
  if (!Number.isInteger(horizonte) || horizonte < 1 || horizonte > 30) {
    return res.status(400).json({ error: 'El horizonte tiene que ser entre 1 y 30 días' });
  }

  const modo = req.body?.modo ?? hogar('modo');
  if (!MODOS.includes(modo)) {
    return res.status(400).json({ error: 'Modo de plan inválido' });
  }

  const comidas = normalizarComidas(req.body?.comidas ?? JSON.parse(hogar('comidas')));
  if (!comidas) {
    return res.status(400).json({ error: 'Elegí al menos una comida válida' });
  }

  db.prepare(
    `UPDATE ciclos
     SET abandonado_desde = estado,
         abandonado_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now'),
         estado = 'abandonado'
     WHERE estado IN ('captura', 'triage')`
  ).run();

  const { lastInsertRowid } = db
    .prepare('INSERT INTO ciclos (horizonte_dias, modo, comidas) VALUES (?, ?, ?)')
    .run(horizonte, modo, JSON.stringify(comidas));

  res.json({ ciclo: publicarCiclo(buscarCiclo(lastInsertRowid)) });
});

// El ciclo vigente (para retomar): el último que no fue abandonado.
ciclosRouter.get('/actual', (req, res) => {
  const ciclo = db
    .prepare("SELECT * FROM ciclos WHERE estado != 'abandonado' ORDER BY id DESC LIMIT 1")
    .get();
  if (!ciclo) return res.json({ ciclo: null });

  res.json({
    ciclo: publicarCiclo(ciclo),
    items: itemsDelCiclo(ciclo.id),
    propuesta: ciclo.propuesta_json ? JSON.parse(ciclo.propuesta_json) : null,
  });
});

// La extracción: un solo llamado al LLM con todas las fotos del ciclo.
ciclosRouter.post('/:id/extraccion', async (req, res) => {
  const ciclo = buscarCiclo(req.params.id);
  if (!ciclo) return res.status(404).json({ error: 'Ese plan no existe' });
  if (ciclo.estado !== 'captura') {
    return res.status(409).json({ error: 'Este plan ya leyó sus fotos' });
  }

  const { imagenes, primera_foto_ts } = req.body || {};
  if (!Array.isArray(imagenes) || imagenes.length === 0) {
    return res.status(400).json({ error: 'Mandá al menos una foto' });
  }
  const invalida = imagenes.some(
    (img) => typeof img?.imagen !== 'string' || !img.imagen || typeof img?.mediaType !== 'string'
  );
  if (invalida) {
    return res.status(400).json({ error: 'Alguna de las fotos llegó incompleta' });
  }

  let items;
  try {
    items = await extraerItems({ imagenes });
  } catch (err) {
    return errorIA(res, err);
  }

  const insertar = db.prepare(
    'INSERT INTO ciclo_items (ciclo_id, nombre, cantidad, confianza) VALUES (?, ?, ?, ?)'
  );
  db.transaction(() => {
    for (const item of items) {
      insertar.run(ciclo.id, item.nombre, item.cantidad, item.confianza);
    }
    db.prepare(
      `UPDATE ciclos
       SET estado = 'triage',
           fotos_count = ?,
           primera_foto_at = COALESCE(?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
       WHERE id = ?`
    ).run(imagenes.length, primera_foto_ts || null, ciclo.id);
  })();

  res.json({
    ciclo: publicarCiclo(buscarCiclo(ciclo.id)),
    items: itemsDelCiclo(ciclo.id),
  });
});

// Pisar horizonte, modo o comidas del ciclo en un gesto.
ciclosRouter.patch('/:id', (req, res) => {
  const ciclo = buscarCiclo(req.params.id);
  if (!ciclo) return res.status(404).json({ error: 'Ese plan no existe' });
  if (ciclo.estado === 'abandonado' || ciclo.estado === 'propuesta') {
    return res.status(409).json({ error: 'Este plan ya no se puede modificar' });
  }

  const { horizonte_dias, modo, comidas } = req.body || {};
  const cambios = {};

  if (horizonte_dias !== undefined) {
    const horizonte = Number(horizonte_dias);
    if (!Number.isInteger(horizonte) || horizonte < 1 || horizonte > 30) {
      return res.status(400).json({ error: 'El horizonte tiene que ser entre 1 y 30 días' });
    }
    cambios.horizonte_dias = horizonte;
  }

  if (modo !== undefined) {
    if (!MODOS.includes(modo)) {
      return res.status(400).json({ error: 'Modo de plan inválido' });
    }
    cambios.modo = modo;
  }

  if (comidas !== undefined) {
    const normalizadas = normalizarComidas(comidas);
    if (!normalizadas) {
      return res.status(400).json({ error: 'Elegí al menos una comida válida' });
    }
    cambios.comidas = JSON.stringify(normalizadas);
  }

  if (Object.keys(cambios).length === 0) {
    return res.status(400).json({ error: 'No hay nada para cambiar' });
  }

  const set = Object.keys(cambios).map((c) => `${c} = ?`).join(', ');
  db.prepare(`UPDATE ciclos SET ${set} WHERE id = ?`).run(...Object.values(cambios), ciclo.id);
  res.json({ ciclo: publicarCiclo(buscarCiclo(ciclo.id)) });
});

// Agregar un ítem a mano durante el repaso: manual o sobra.
ciclosRouter.post('/:id/items', (req, res) => {
  const ciclo = buscarCiclo(req.params.id);
  if (!ciclo) return res.status(404).json({ error: 'Ese plan no existe' });
  if (ciclo.estado !== 'triage') {
    return res.status(409).json({ error: 'Este plan no está en repaso' });
  }

  const { nombre, cantidad, origen } = req.body || {};
  if (typeof nombre !== 'string' || !nombre.trim()) {
    return res.status(400).json({ error: 'El ítem necesita un nombre' });
  }
  if (typeof cantidad !== 'string' || !cantidad.trim()) {
    return res.status(400).json({ error: 'El ítem necesita una cantidad' });
  }
  if (!ORIGENES_MANUALES.includes(origen)) {
    return res.status(400).json({ error: 'Origen inválido' });
  }

  const { lastInsertRowid } = db
    .prepare(
      "INSERT INTO ciclo_items (ciclo_id, nombre, cantidad, confianza, origen) VALUES (?, ?, ?, 'confirmado', ?)"
    )
    .run(ciclo.id, nombre.trim(), cantidad.trim(), origen);

  res.json({
    item: db.prepare('SELECT * FROM ciclo_items WHERE id = ?').get(lastInsertRowid),
  });
});

// Corregir un ítem (nombre, cantidad o confianza) en ≤2 gestos.
ciclosRouter.patch('/:id/items/:itemId', (req, res) => {
  const ciclo = buscarCiclo(req.params.id);
  if (!ciclo) return res.status(404).json({ error: 'Ese plan no existe' });
  if (ciclo.estado !== 'triage') {
    return res.status(409).json({ error: 'Este plan no está en repaso' });
  }

  const item = db
    .prepare('SELECT * FROM ciclo_items WHERE id = ? AND ciclo_id = ?')
    .get(req.params.itemId, ciclo.id);
  if (!item) return res.status(404).json({ error: 'Ese ítem no existe' });

  const { nombre, cantidad, confianza } = req.body || {};
  const cambios = {};
  if (nombre !== undefined) {
    if (typeof nombre !== 'string' || !nombre.trim()) {
      return res.status(400).json({ error: 'El nombre no puede quedar vacío' });
    }
    cambios.nombre = nombre.trim();
  }
  if (cantidad !== undefined) {
    if (typeof cantidad !== 'string' || !cantidad.trim()) {
      return res.status(400).json({ error: 'La cantidad no puede quedar vacía' });
    }
    cambios.cantidad = cantidad.trim();
  }
  if (confianza !== undefined) {
    if (!CONFIANZAS.includes(confianza)) {
      return res.status(400).json({ error: 'Confianza inválida' });
    }
    cambios.confianza = confianza;
  }
  if (Object.keys(cambios).length === 0) {
    return res.status(400).json({ error: 'No hay nada para cambiar' });
  }

  const set = Object.keys(cambios).map((c) => `${c} = ?`).join(', ');
  db.prepare(`UPDATE ciclo_items SET ${set} WHERE id = ?`).run(
    ...Object.values(cambios),
    item.id
  );

  res.json({
    item: db.prepare('SELECT * FROM ciclo_items WHERE id = ?').get(item.id),
  });
});

// Sacar un ítem que no va.
ciclosRouter.delete('/:id/items/:itemId', (req, res) => {
  const ciclo = buscarCiclo(req.params.id);
  if (!ciclo) return res.status(404).json({ error: 'Ese plan no existe' });
  if (ciclo.estado !== 'triage') {
    return res.status(409).json({ error: 'Este plan no está en repaso' });
  }

  const { changes } = db
    .prepare('DELETE FROM ciclo_items WHERE id = ? AND ciclo_id = ?')
    .run(req.params.itemId, ciclo.id);
  if (!changes) return res.status(404).json({ error: 'Ese ítem no existe' });

  res.json({ ok: true });
});

// El cierre del ciclo: generar la propuesta de cenas. El triage nunca bloquea:
// llamar esto sin haber tocado nada es "aceptar tal cual".
ciclosRouter.post('/:id/propuesta', async (req, res) => {
  const ciclo = buscarCiclo(req.params.id);
  if (!ciclo) return res.status(404).json({ error: 'Ese plan no existe' });
  if (ciclo.estado !== 'triage') {
    return res.status(409).json({ error: 'Este plan no está listo para la propuesta' });
  }

  const items = itemsDelCiclo(ciclo.id);
  if (items.length === 0) {
    return res.status(400).json({ error: 'Sumá al menos un ítem antes de armar las cenas' });
  }
  if (itemsPlanificables(items).length === 0) {
    return res.status(400).json({
      error:
        'Con esto no llegamos a una propuesta: todos tus ítems están "a confirmar". Confirmá los que reconozcas o sumá alguno a mano.',
    });
  }

  let propuesta;
  try {
    propuesta = await generarPlan({
      items,
      horizonteDias: ciclo.horizonte_dias,
      modo: ciclo.modo,
      comidas: JSON.parse(ciclo.comidas),
      familia: hogar('familia'),
      restricciones: hogar('restricciones'),
      gustos: hogar('gustos'),
    });
  } catch (err) {
    return errorIA(res, err);
  }

  db.prepare(
    `UPDATE ciclos
     SET estado = 'propuesta',
         propuesta_json = ?,
         propuesta_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
     WHERE id = ?`
  ).run(JSON.stringify(propuesta), ciclo.id);

  const actualizado = buscarCiclo(ciclo.id);
  res.json({
    ciclo: publicarCiclo(actualizado),
    propuesta,
    metrica: { foto_a_propuesta_seg: segundosEntre(actualizado.primera_foto_at, actualizado.propuesta_at) },
  });
});

function segundosEntre(desde, hasta) {
  if (!desde || !hasta) return null;
  const ms = new Date(hasta) - new Date(desde);
  return Number.isFinite(ms) ? Math.round(ms / 1000) : null;
}

// La lectura del piloto: métricas crudas de todos los ciclos.
metricasRouter.get('/ciclos', (req, res) => {
  const ciclos = db.prepare('SELECT * FROM ciclos ORDER BY id DESC').all();
  const contarPorOrigen = db.prepare(
    'SELECT origen, COUNT(*) AS n FROM ciclo_items WHERE ciclo_id = ? GROUP BY origen'
  );

  res.json({
    ciclos: ciclos.map((c) => {
      const origenes = Object.fromEntries(
        contarPorOrigen.all(c.id).map((r) => [r.origen, r.n])
      );
      return {
        id: c.id,
        estado: c.estado,
        horizonte_dias: c.horizonte_dias,
        modo: c.modo,
        comidas: JSON.parse(c.comidas),
        fotos_count: c.fotos_count,
        creado_at: c.creado_at,
        primera_foto_at: c.primera_foto_at,
        propuesta_at: c.propuesta_at,
        foto_a_propuesta_seg: segundosEntre(c.primera_foto_at, c.propuesta_at),
        abandonado_at: c.abandonado_at,
        abandonado_desde: c.abandonado_desde,
        items_foto: origenes.foto || 0,
        items_manual: origenes.manual || 0,
        items_sobra: origenes.sobra || 0,
      };
    }),
  });
});
