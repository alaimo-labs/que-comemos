import { Router } from 'express';
import { getSetting, setSetting } from '../db/index.js';
import { DEFAULT_MODELS } from '../llm/index.js';

export const settingsRouter = Router();

const PROVIDERS = ['anthropic', 'openai'];
const INPUT_MODES = ['archivos', 'camara'];

export const MODOS = ['con_lo_que_tengo', 'con_compra_adicional'];
export const COMIDAS = ['desayuno', 'almuerzo', 'merienda', 'cena'];

export const HOGAR_DEFAULTS = {
  input_mode: 'archivos',
  horizonte_dias: '7',
  familia: '4',
  restricciones: '',
  gustos: '',
  modo: 'con_lo_que_tengo',
  comidas: JSON.stringify(COMIDAS),
};

// Valida un array de comidas; devuelve el array normalizado (en el orden
// canónico) o null si es inválido.
export function normalizarComidas(comidas) {
  if (!Array.isArray(comidas) || comidas.length === 0) return null;
  if (comidas.some((c) => !COMIDAS.includes(c))) return null;
  return COMIDAS.filter((c) => comidas.includes(c));
}

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
    input_mode: getSetting('input_mode') || HOGAR_DEFAULTS.input_mode,
    horizonte_dias: getSetting('horizonte_dias') || HOGAR_DEFAULTS.horizonte_dias,
    familia: getSetting('familia') || HOGAR_DEFAULTS.familia,
    restricciones: getSetting('restricciones') ?? HOGAR_DEFAULTS.restricciones,
    gustos: getSetting('gustos') ?? HOGAR_DEFAULTS.gustos,
    modo: getSetting('modo') || HOGAR_DEFAULTS.modo,
    comidas: JSON.parse(getSetting('comidas') || HOGAR_DEFAULTS.comidas),
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

  const { input_mode, horizonte_dias, familia, restricciones, gustos, modo, comidas } =
    req.body || {};

  if (input_mode !== undefined) {
    if (!INPUT_MODES.includes(input_mode)) {
      return res.status(400).json({ error: 'Modo de captura inválido' });
    }
    setSetting('input_mode', input_mode);
  }

  if (horizonte_dias !== undefined) {
    const dias = Number(horizonte_dias);
    if (!Number.isInteger(dias) || dias < 1 || dias > 30) {
      return res.status(400).json({ error: 'El horizonte tiene que ser entre 1 y 30 días' });
    }
    setSetting('horizonte_dias', String(dias));
  }

  if (familia !== undefined) {
    const personas = Number(familia);
    if (!Number.isInteger(personas) || personas < 1 || personas > 20) {
      return res.status(400).json({ error: 'La familia tiene que ser entre 1 y 20 personas' });
    }
    setSetting('familia', String(personas));
  }

  if (modo !== undefined) {
    if (!MODOS.includes(modo)) {
      return res.status(400).json({ error: 'Modo de plan inválido' });
    }
    setSetting('modo', modo);
  }

  if (comidas !== undefined) {
    const normalizadas = normalizarComidas(comidas);
    if (!normalizadas) {
      return res.status(400).json({ error: 'Elegí al menos una comida válida' });
    }
    setSetting('comidas', JSON.stringify(normalizadas));
  }

  if (typeof restricciones === 'string') setSetting('restricciones', restricciones.trim());
  if (typeof gustos === 'string') setSetting('gustos', gustos.trim());

  res.json({ ok: true });
});
