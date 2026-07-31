import { Router } from 'express';
import { getSetting, setSetting } from '../db/index.js';
import { DEFAULT_MODELS } from '../llm/index.js';

export const settingsRouter = Router();

const PROVIDERS = ['anthropic', 'openai'];

function keyStatus(provider) {
  const key = getSetting(`api_key_${provider}`);
  return key
    ? { configured: true, last4: key.slice(-4) }
    : { configured: false, last4: null };
}

settingsRouter.get('/', (req, res) => {
  res.json({
    provider: getSetting('provider') || 'anthropic',
    models: {
      anthropic: getSetting('model_anthropic') || DEFAULT_MODELS.anthropic,
      openai: getSetting('model_openai') || DEFAULT_MODELS.openai,
    },
    keys: {
      anthropic: keyStatus('anthropic'),
      openai: keyStatus('openai'),
    },
  });
});

settingsRouter.put('/', (req, res) => {
  const { provider, models = {}, keys = {} } = req.body || {};

  if (provider !== undefined) {
    if (!PROVIDERS.includes(provider)) {
      return res.status(400).json({ error: 'Proveedor inválido' });
    }
    setSetting('provider', provider);
  }

  for (const p of PROVIDERS) {
    if (typeof models[p] === 'string' && models[p].trim()) {
      setSetting(`model_${p}`, models[p].trim());
    }
    if (typeof keys[p] === 'string' && keys[p].trim()) {
      setSetting(`api_key_${p}`, keys[p].trim());
    }
  }

  res.json({ ok: true });
});
