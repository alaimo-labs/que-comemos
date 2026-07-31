import { describe, expect, it } from 'vitest';
import { textoParaWhatsApp, urlWhatsApp } from '../web/src/whatsapp.js';
import { etiquetaDia } from '../web/src/dias.js';

const CICLO = { horizonte_dias: 2, propuesta_at: '2026-07-28T12:00:00.000Z' };

const PROPUESTA = {
  platos: [
    {
      periodo_dia: '1',
      comida: 'almuerzo',
      nombre: 'Guiso de lentejas',
      porciones: '4',
      ingredientes_disponibles: [],
      ingredientes_a_comprar: [],
      preparacion_breve: '',
    },
    {
      periodo_dia: '1',
      comida: 'cena',
      nombre: 'Arroz con pollo',
      porciones: '4',
      ingredientes_disponibles: [],
      ingredientes_a_comprar: [],
      preparacion_breve: '',
    },
    {
      periodo_dia: '2',
      comida: 'cena',
      nombre: 'Tortilla de papas',
      porciones: '4',
      ingredientes_disponibles: [],
      ingredientes_a_comprar: [],
      preparacion_breve: '',
    },
  ],
  lista_de_compras: [],
  alimentos_disponibles_sin_uso: [],
  supuestos_y_alertas: [],
};

describe('textoParaWhatsApp', () => {
  it('agrupa por día con la comida capitalizada, legible sin la app', () => {
    const texto = textoParaWhatsApp({ propuesta: PROPUESTA, ciclo: CICLO });
    const dia1 = etiquetaDia('1', CICLO.propuesta_at);
    const dia2 = etiquetaDia('2', CICLO.propuesta_at);

    expect(texto).toContain('Comidas para 2 días');
    expect(texto).toContain(`${dia1}\n  Almuerzo: Guiso de lentejas (rinde 4)\n  Cena: Arroz con pollo (rinde 4)`);
    expect(texto).toContain(`${dia2}\n  Cena: Tortilla de papas (rinde 4)`);
    // La etiqueta del día 1 aparece una sola vez aunque tenga dos platos.
    expect(texto.split(dia1).length - 1).toBe(1);
    expect(texto).not.toContain('<');
  });

  it('incluye la sección Compras solo cuando hay lista', () => {
    expect(textoParaWhatsApp({ propuesta: PROPUESTA, ciclo: CICLO })).not.toContain('Compras:');

    const conCompras = {
      ...PROPUESTA,
      lista_de_compras: [
        { alimento: 'Cebolla', cantidad: '2', unidad_o_tamano: 'unidades', motivo: 'para el guiso' },
        { alimento: 'Aceite', cantidad: '1', unidad_o_tamano: 'botella', motivo: '' },
      ],
    };
    const texto = textoParaWhatsApp({ propuesta: conCompras, ciclo: CICLO });
    expect(texto).toContain('Compras:');
    expect(texto).toContain('• Cebolla — 2 unidades (para el guiso)');
    expect(texto).toContain('• Aceite — 1 botella');
    expect(texto).not.toContain('• Aceite — 1 botella (');
  });
});

describe('urlWhatsApp', () => {
  it('arma el deep link wa.me con el texto URL-encodeado', () => {
    const url = urlWhatsApp('hola\nmundo & más');
    expect(url.startsWith('https://wa.me/?text=')).toBe(true);
    expect(decodeURIComponent(url.split('text=')[1])).toBe('hola\nmundo & más');
  });
});
