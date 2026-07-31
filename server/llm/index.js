import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { getSetting } from '../db/index.js';
import {
  EXTRACCION_PROMPT,
  PLANIFICACION_PROMPT,
  itemDesdeExtraccion,
  itemsPlanificables,
  planificacionUserMessage,
} from './prompts.js';

export const DEFAULT_MODELS = {
  anthropic: 'claude-opus-5',
  openai: 'gpt-5.6-luna',
};

export const itemsSchema = z.object({
  items: z.array(
    z.object({
      nombre: z.string(),
      cantidad: z.string(),
      confianza: z.enum(['confirmado', 'a_revisar', 'a_confirmar']),
    })
  ),
});

export function getProvider() {
  return getSetting('provider') || 'anthropic';
}

export function getModelId(provider = getProvider()) {
  return getSetting(`model_${provider}`) || DEFAULT_MODELS[provider];
}

export function getApiKey(provider = getProvider()) {
  return getSetting(`api_key_${provider}`);
}

export function getActiveModel() {
  const provider = getProvider();
  const apiKey = getApiKey(provider);
  if (!apiKey) return null;
  const modelId = getModelId(provider);
  const factory =
    provider === 'openai' ? createOpenAI({ apiKey }) : createAnthropic({ apiKey });
  return { model: factory(modelId), provider, modelId };
}

function requireActiveModel() {
  const active = getActiveModel();
  if (!active) {
    const err = new Error('Falta la API Key. Configurala en Ajustes.');
    err.code = 'needs_key';
    throw err;
  }
  return active;
}

// Salida del prompt de extracción (validado con evals).
export const extraccionSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      size: z.string().nullable(),
      confidence: z.enum(['low', 'medium', 'high']),
    })
  ),
});

// Salida del prompt de planificación (validado con evals).
export const planSchema = z.object({
  periodo: z.object({
    tipo: z.string(),
    duracion: z.coerce.string(),
    familia: z.coerce.string(),
    objetivo: z.string(),
  }),
  platos: z.array(
    z.object({
      periodo_dia: z.coerce.string(),
      comida: z.string(),
      nombre: z.string(),
      porciones: z.coerce.string(),
      ingredientes_disponibles: z.array(z.string()),
      ingredientes_a_comprar: z.array(z.string()),
      preparacion_breve: z.string(),
    })
  ),
  lista_de_compras: z.array(
    z.object({
      alimento: z.string(),
      cantidad: z.coerce.string(),
      unidad_o_tamano: z.string(),
      motivo: z.string(),
    })
  ),
  alimentos_disponibles_sin_uso: z.array(
    z.object({
      alimento: z.string(),
      cantidad_estimada: z.coerce.string(),
    })
  ),
  supuestos_y_alertas: z.array(z.string()),
});

// Un solo llamado con las n imágenes del ciclo; devuelve ítems ya mapeados
// al formato de la DB ({nombre, cantidad, confianza}).
export async function extraerItems({ imagenes }) {
  const active = requireActiveModel();
  const { object } = await generateObject({
    model: active.model,
    schema: extraccionSchema,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: EXTRACCION_PROMPT },
          ...imagenes.map((img) => ({
            type: 'image',
            image: img.imagen,
            mediaType: img.mediaType,
          })),
        ],
      },
    ],
  });
  return object.items.map(itemDesdeExtraccion);
}

export async function generarPlan({ items, horizonteDias, familia, restricciones, gustos }) {
  const active = requireActiveModel();
  const planificables = itemsPlanificables(items);
  const { object } = await generateObject({
    model: active.model,
    schema: planSchema,
    system: PLANIFICACION_PROMPT,
    messages: [
      {
        role: 'user',
        content: planificacionUserMessage({
          items: planificables,
          horizonteDias,
          familia,
          restricciones,
          gustos,
        }),
      },
    ],
  });
  return object;
}

export async function testConnection() {
  const active = getActiveModel();
  if (!active) {
    return {
      ok: false,
      needsKey: true,
      provider: getProvider(),
    };
  }

  await generateObject({
    model: active.model,
    schema: itemsSchema,
    messages: [
      {
        role: 'user',
        content:
          'Prueba de conexión: devolvé una lista de exactamente 2 ingredientes de cocina inventados, en español.',
      },
    ],
  });

  return {
    ok: true,
    provider: active.provider,
    modelId: active.modelId,
  };
}
