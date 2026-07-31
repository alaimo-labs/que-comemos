import { describe, expect, it } from 'vitest';
import {
  itemDesdeExtraccion,
  itemsPlanificables,
  planificacionUserMessage,
} from '../server/llm/prompts.js';

describe('itemDesdeExtraccion', () => {
  it('mapea confidence a confianza', () => {
    expect(itemDesdeExtraccion({ name: 'a', quantity: 1, size: null, confidence: 'high' }).confianza).toBe('confirmado');
    expect(itemDesdeExtraccion({ name: 'a', quantity: 1, size: null, confidence: 'medium' }).confianza).toBe('a_revisar');
    expect(itemDesdeExtraccion({ name: 'a', quantity: 1, size: null, confidence: 'low' }).confianza).toBe('a_confirmar');
  });

  it('compone la cantidad con y sin size', () => {
    expect(
      itemDesdeExtraccion({ name: 'Leche', quantity: 2, size: '500 ml', confidence: 'high' })
    ).toEqual({ nombre: 'Leche', cantidad: '2 × 500 ml', confianza: 'confirmado' });
    expect(
      itemDesdeExtraccion({ name: 'Manzanas', quantity: 3, size: null, confidence: 'medium' }).cantidad
    ).toBe('3');
  });
});

describe('itemsPlanificables', () => {
  it('excluye a_confirmar y conserva el resto', () => {
    const items = [
      { nombre: 'Huevos', confianza: 'confirmado' },
      { nombre: 'Arroz', confianza: 'a_revisar' },
      { nombre: 'Tupper', confianza: 'a_confirmar' },
    ];
    expect(itemsPlanificables(items).map((i) => i.nombre)).toEqual(['Huevos', 'Arroz']);
  });
});

describe('planificacionUserMessage', () => {
  const base = {
    items: [
      { nombre: 'Huevos', cantidad: '12', confianza: 'confirmado', origen: 'foto' },
      { nombre: 'Arroz', cantidad: '1 kg', confianza: 'a_revisar', origen: 'foto' },
      { nombre: 'Guiso', cantidad: '2 porciones', confianza: 'confirmado', origen: 'sobra' },
    ],
    horizonteDias: 5,
    familia: '4',
    restricciones: 'sin maní',
    gustos: 'guisos',
  };

  it('produce el JSON con la estructura que espera el prompt', () => {
    const msg = JSON.parse(planificacionUserMessage(base));
    expect(Object.keys(msg)).toEqual(['profile', 'objective', 'modalidad', 'alimentos_disponibles']);
    expect(msg.modalidad).toBe('solo lo que hay');
  });

  it('interpola horizonte, familia, restricciones y gustos', () => {
    const msg = JSON.parse(planificacionUserMessage(base));
    expect(msg.objective).toContain('5 días');
    expect(msg.objective).toContain('"5"');
    expect(msg.profile).toContain('Familia de 4 personas');
    expect(msg.profile).toContain('Restricciones: sin maní');
    expect(msg.profile).toContain('Gustos: guisos');
  });

  it('omite restricciones y gustos vacíos del profile', () => {
    const msg = JSON.parse(
      planificacionUserMessage({ ...base, restricciones: '', gustos: '' })
    );
    expect(msg.profile).toBe('Familia de 4 personas.');
  });

  it('anota cantidad aproximada solo en a_revisar y marca las sobras', () => {
    const msg = JSON.parse(planificacionUserMessage(base));
    expect(msg.alimentos_disponibles).toContain('- Arroz (1 kg, cantidad aproximada)');
    expect(msg.alimentos_disponibles).toContain('- Huevos (12)');
    expect(msg.alimentos_disponibles).not.toContain('Huevos (12, cantidad aproximada');
    expect(msg.alimentos_disponibles).toContain('- Guiso (2 porciones) [sobra ya cocinada — usar primero]');
  });
});
