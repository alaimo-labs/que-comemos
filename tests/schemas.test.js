import { describe, expect, it } from 'vitest';
import { extraccionSchema, planSchema } from '../server/llm/index.js';

describe('extraccionSchema', () => {
  it('acepta la salida canónica del prompt de extracción', () => {
    const salida = {
      items: [
        { name: 'Leche entera', quantity: 1, size: '1 galón', confidence: 'high' },
        { name: 'Tupper con comida', quantity: 1, size: null, confidence: 'low' },
      ],
    };
    expect(extraccionSchema.parse(salida).items).toHaveLength(2);
  });

  it('rechaza un confidence fuera del enum', () => {
    const salida = {
      items: [{ name: 'Leche', quantity: 1, size: null, confidence: 'alta' }],
    };
    expect(() => extraccionSchema.parse(salida)).toThrow();
  });
});

describe('planSchema', () => {
  const plan = {
    periodo: { tipo: 'semanal', duracion: '3 días', familia: '4', objetivo: 'cenas' },
    platos: [
      {
        periodo_dia: '1',
        comida: 'cena',
        nombre: 'Arroz con pollo',
        porciones: '4',
        ingredientes_disponibles: ['Arroz', 'Pollo'],
        ingredientes_a_comprar: [],
        preparacion_breve: 'Cocinar y servir.',
      },
    ],
    lista_de_compras: [],
    alimentos_disponibles_sin_uso: [{ alimento: 'Mostaza', cantidad_estimada: '1 envase' }],
    supuestos_y_alertas: ['Cantidades estimadas.'],
  };

  it('acepta la salida canónica del prompt de planificación', () => {
    expect(planSchema.parse(plan).platos[0].nombre).toBe('Arroz con pollo');
  });

  it('coerciona campos numéricos a string (porciones, familia, periodo_dia)', () => {
    const conNumeros = {
      ...plan,
      periodo: { ...plan.periodo, familia: 4 },
      platos: [{ ...plan.platos[0], porciones: 4, periodo_dia: 1 }],
    };
    const parseado = planSchema.parse(conNumeros);
    expect(parseado.periodo.familia).toBe('4');
    expect(parseado.platos[0].porciones).toBe('4');
    expect(parseado.platos[0].periodo_dia).toBe('1');
  });
});
