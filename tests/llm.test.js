import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('ai', () => ({ generateObject: vi.fn() }));

import { generateObject } from 'ai';
import { extraerItems, generarPlan } from '../server/llm/index.js';
import { EXTRACCION_PROMPT, PLANIFICACION_PROMPT } from '../server/llm/prompts.js';
import { db, setSetting } from '../server/db/index.js';

const PLAN_FAKE = {
  periodo: { tipo: 'semanal', duracion: '3', familia: '4', objetivo: 'cenas' },
  platos: [],
  lista_de_compras: [],
  alimentos_disponibles_sin_uso: [],
  supuestos_y_alertas: [],
};

beforeEach(() => {
  db.exec('DELETE FROM settings');
  vi.clearAllMocks();
});

describe('extraerItems', () => {
  it('sin API key rechaza con needs_key, sin llamar al SDK', async () => {
    await expect(
      extraerItems({ imagenes: [{ imagen: 'AAA', mediaType: 'image/jpeg' }] })
    ).rejects.toMatchObject({ code: 'needs_key' });
    expect(generateObject).not.toHaveBeenCalled();
  });

  it('hace UN solo llamado con las n imágenes y mapea la salida', async () => {
    setSetting('api_key_anthropic', 'sk-test');
    generateObject.mockResolvedValue({
      object: {
        items: [
          { name: 'Leche', quantity: 2, size: '1 L', confidence: 'high' },
          { name: 'Tupper con comida', quantity: 1, size: null, confidence: 'low' },
        ],
      },
    });

    const items = await extraerItems({
      imagenes: [
        { imagen: 'AAA', mediaType: 'image/jpeg' },
        { imagen: 'BBB', mediaType: 'image/png' },
        { imagen: 'CCC', mediaType: 'image/jpeg' },
      ],
    });

    expect(generateObject).toHaveBeenCalledTimes(1);
    const { messages } = generateObject.mock.calls[0][0];
    const content = messages[0].content;
    expect(content[0]).toEqual({ type: 'text', text: EXTRACCION_PROMPT });
    const partesImagen = content.slice(1);
    expect(partesImagen).toHaveLength(3);
    expect(partesImagen[1]).toEqual({ type: 'image', image: 'BBB', mediaType: 'image/png' });

    expect(items).toEqual([
      { nombre: 'Leche', cantidad: '2 × 1 L', confianza: 'confirmado' },
      { nombre: 'Tupper con comida', cantidad: '1', confianza: 'a_confirmar' },
    ]);
  });
});

describe('generarPlan', () => {
  it('usa el prompt validado como system y filtra los a_confirmar del user message', async () => {
    setSetting('api_key_anthropic', 'sk-test');
    generateObject.mockResolvedValue({ object: PLAN_FAKE });

    const plan = await generarPlan({
      items: [
        { nombre: 'Huevos', cantidad: '12', confianza: 'confirmado', origen: 'foto' },
        { nombre: 'Arroz', cantidad: '1 kg', confianza: 'a_revisar', origen: 'foto' },
        { nombre: 'Tupper con comida', cantidad: '1', confianza: 'a_confirmar', origen: 'foto' },
      ],
      horizonteDias: 3,
      modo: 'con_compra_adicional',
      comidas: ['almuerzo', 'cena'],
      familia: '4',
      restricciones: '',
      gustos: '',
    });

    expect(plan).toEqual(PLAN_FAKE);
    expect(generateObject).toHaveBeenCalledTimes(1);
    const args = generateObject.mock.calls[0][0];
    expect(args.system).toBe(PLANIFICACION_PROMPT);

    const userMessage = JSON.parse(args.messages[0].content);
    expect(userMessage.alimentos_disponibles).toContain('Huevos');
    expect(userMessage.alimentos_disponibles).toContain('Arroz');
    expect(userMessage.alimentos_disponibles).not.toContain('Tupper');
    expect(userMessage.modalidad).toBe('lo que hay + sugerir compra complementaria');
    expect(userMessage.objective).toContain('almuerzo y cena');
  });
});
