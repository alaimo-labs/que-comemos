import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { getSetting } from '../db/index.js';

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
