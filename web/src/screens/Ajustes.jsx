import { useEffect, useState } from 'react';
import { api } from '../api.js';

export function Ajustes() {
  const [settings, setSettings] = useState(null);
  const [provider, setProvider] = useState('anthropic');
  const [models, setModels] = useState({ anthropic: '', openai: '' });
  const [newKey, setNewKey] = useState('');
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const s = await api.getSettings();
    setSettings(s);
    setProvider(s.provider);
    setModels(s.models);
  }

  useEffect(() => {
    load().catch((e) => setStatus({ ok: false, message: e.message }));
  }, []);

  async function guardar(e) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await api.saveSettings({
        provider,
        models,
        keys: newKey.trim() ? { [provider]: newKey.trim() } : {},
      });
      setNewKey('');
      await load();
      setStatus({ ok: true, message: 'Ajustes guardados.' });
    } catch (err) {
      setStatus({ ok: false, message: err.message });
    } finally {
      setSaving(false);
    }
  }

  if (!settings) return <section className="screen">Cargando…</section>;

  const keyInfo = settings.keys[provider];

  return (
    <section className="screen">
      <h2>Ajustes</h2>

      <form onSubmit={guardar} className="form">
        <label className="field">
          <span>Proveedor de IA</span>
          <select value={provider} onChange={(e) => setProvider(e.target.value)}>
            <option value="anthropic">Anthropic (Claude)</option>
            <option value="openai">OpenAI</option>
          </select>
        </label>

        <label className="field">
          <span>API Key de {provider === 'openai' ? 'OpenAI' : 'Anthropic'}</span>
          <input
            type="password"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder={
              keyInfo.configured
                ? `Configurada (termina en …${keyInfo.last4}) — pegá una nueva para reemplazarla`
                : 'Pegá tu API Key acá'
            }
          />
        </label>

        <label className="field">
          <span>Modelo</span>
          <input
            type="text"
            value={models[provider]}
            onChange={(e) => setModels({ ...models, [provider]: e.target.value })}
          />
        </label>

        <button className="btn primary" type="submit" disabled={saving}>
          {saving ? 'Guardando…' : 'Guardar'}
        </button>
      </form>

      {status && (
        <p className={status.ok ? 'success' : 'error'}>{status.message}</p>
      )}

      <div className="card muted">
        <p>
          Tu API Key se guarda solo en esta computadora, dentro de la carpeta{' '}
          <code>data</code> de la app. Nunca se muestra completa ni sale de acá,
          salvo para hablar con el proveedor de IA que elijas.
        </p>
      </div>
    </section>
  );
}
