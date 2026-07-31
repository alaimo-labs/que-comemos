import { useEffect, useState } from 'react';
import { api } from '../api.js';

const PROVIDER_NAMES = { anthropic: 'Anthropic (Claude)', openai: 'OpenAI' };

const TABS = [
  { id: 'hogar', titulo: 'Tu Hogar' },
  { id: 'ia', titulo: 'IA' },
  { id: 'estado', titulo: 'Estado' },
];

export function Ajustes() {
  const [tab, setTab] = useState('hogar');
  const [settings, setSettings] = useState(null);
  const [provider, setProvider] = useState('anthropic');
  const [models, setModels] = useState({ anthropic: '', openai: '' });
  const [newKey, setNewKey] = useState('');
  const [inputMode, setInputMode] = useState('archivos');
  const [horizonteDias, setHorizonteDias] = useState('7');
  const [familia, setFamilia] = useState('4');
  const [restricciones, setRestricciones] = useState('');
  const [gustos, setGustos] = useState('');
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);
  const [health, setHealth] = useState(null);
  const [healthError, setHealthError] = useState(null);
  const [test, setTest] = useState(null);
  const [testing, setTesting] = useState(false);

  async function load() {
    const s = await api.getSettings();
    setSettings(s);
    setProvider(s.provider);
    setModels(s.models);
    setInputMode(s.input_mode);
    setHorizonteDias(s.horizonte_dias);
    setFamilia(s.familia);
    setRestricciones(s.restricciones);
    setGustos(s.gustos);
  }

  useEffect(() => {
    load().catch((e) => setStatus({ ok: false, message: e.message }));
  }, []);

  useEffect(() => {
    if (tab !== 'estado') return;
    setHealthError(null);
    api.health().then(setHealth).catch((e) => setHealthError(e.message));
  }, [tab]);

  async function guardar(e) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await api.saveSettings({
        provider,
        models,
        keys: newKey.trim() ? { [provider]: newKey.trim() } : {},
        input_mode: inputMode,
        horizonte_dias: horizonteDias,
        familia,
        restricciones,
        gustos,
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

  async function probarIA() {
    setTesting(true);
    setTest(null);
    try {
      setTest(await api.testVision());
    } catch (e) {
      setTest({ ok: false, error: e.message });
    } finally {
      setTesting(false);
    }
  }

  if (!settings) return <section className="screen">Cargando…</section>;

  const keyInfo = settings.keys[provider];

  return (
    <section className="screen">
      <h2>Ajustes</h2>

      <div className="tabs">
        {TABS.map(({ id, titulo }) => (
          <button
            key={id}
            type="button"
            className={tab === id ? 'tab active' : 'tab'}
            onClick={() => setTab(id)}
          >
            {titulo}
          </button>
        ))}
      </div>

      {tab === 'hogar' && (
        <form onSubmit={guardar} className="form espaciado">
          <label className="field">
            <span>Horizonte de planificación (días)</span>
            <input
              type="number"
              min="1"
              max="30"
              value={horizonteDias}
              onChange={(e) => setHorizonteDias(e.target.value)}
            />
          </label>

          <label className="field">
            <span>Integrantes de la familia</span>
            <input
              type="number"
              min="1"
              max="20"
              value={familia}
              onChange={(e) => setFamilia(e.target.value)}
            />
          </label>

          <label className="field">
            <span>Restricciones</span>
            <textarea
              rows="2"
              value={restricciones}
              onChange={(e) => setRestricciones(e.target.value)}
              placeholder="Ej: sin maní (alergia), la nena no come picante"
            />
          </label>

          <label className="field">
            <span>Gustos</span>
            <textarea
              rows="2"
              value={gustos}
              onChange={(e) => setGustos(e.target.value)}
              placeholder="Ej: pastas caseras, guisos, nada de brócoli"
            />
          </label>

          <button className="btn primary" type="submit" disabled={saving}>
            {saving ? 'Guardando…' : 'Guardar'}
          </button>
        </form>
      )}

      {tab === 'ia' && (
        <>
          <form onSubmit={guardar} className="form espaciado">
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

            <label className="field">
              <span>Modo de captura de fotos</span>
              <select value={inputMode} onChange={(e) => setInputMode(e.target.value)}>
                <option value="archivos">Arrastrar archivos</option>
                <option value="camara">Cámara</option>
              </select>
            </label>

            <button className="btn primary" type="submit" disabled={saving}>
              {saving ? 'Guardando…' : 'Guardar'}
            </button>
          </form>

          <div className="card muted">
            <p>
              Tu API Key se guarda solo en esta computadora, dentro de la carpeta{' '}
              <code>data</code> de la app. Nunca se muestra completa ni sale de acá,
              salvo para hablar con el proveedor de IA que elijas.
            </p>
          </div>

          <button
            className="btn secundario espaciado"
            onClick={probarIA}
            disabled={testing}
          >
            {testing ? 'Probando…' : 'Probar conexión IA'}
          </button>

          {test && test.ok && (
            <div className="card">
              <p>
                Conexión exitosa con {PROVIDER_NAMES[test.provider] || test.provider} (
                {test.modelId}).
              </p>
            </div>
          )}

          {test && test.needsKey && (
            <div className="card warn-card">
              <p>
                Todavía no ingresaste tu API Key. Pegala arriba, guardá — y volvé a
                probar.
              </p>
            </div>
          )}

          {test && !test.ok && !test.needsKey && <p className="error">{test.error}</p>}
        </>
      )}

      {tab === 'estado' && (
        <div className="espaciado">
          {healthError && (
            <p className="error">No se pudo contactar al servidor: {healthError}</p>
          )}

          {health && (
            <ul className="status-list">
              <li className="status-item">
                <span className="status-ok">✓</span> Servidor funcionando
              </li>
              <li className="status-item">
                <span className="status-ok">✓</span> Base de datos lista
                <span className="muted"> ({health.dbVersion})</span>
              </li>
              <li className="status-item">
                {health.apiKeyConfigured ? (
                  <>
                    <span className="status-ok">✓</span> API Key de{' '}
                    {PROVIDER_NAMES[health.provider] || health.provider} configurada
                  </>
                ) : (
                  <>
                    <span className="status-warn">!</span> Falta la API Key
                  </>
                )}
              </li>
            </ul>
          )}

          {health && !health.apiKeyConfigured && (
            <button className="btn primary" onClick={() => setTab('ia')}>
              Ingresar API Key
            </button>
          )}
        </div>
      )}

      {status && tab !== 'estado' && (
        <p className={status.ok ? 'success' : 'error'}>{status.message}</p>
      )}
    </section>
  );
}
