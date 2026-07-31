import { useEffect, useState } from 'react';
import { api } from '../api.js';

const PROVIDER_NAMES = { anthropic: 'Anthropic (Claude)', openai: 'OpenAI' };

export function Inicio({ onIngresarKey }) {
  const [health, setHealth] = useState(null);
  const [healthError, setHealthError] = useState(null);
  const [test, setTest] = useState(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    api.health().then(setHealth).catch((e) => setHealthError(e.message));
  }, []);

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

  const hasKey = health?.apiKeyConfigured;

  return (
    <section className="screen">
      <h2>Estado</h2>

      {healthError && <p className="error">No se pudo contactar al servidor: {healthError}</p>}

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
            {hasKey ? (
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

      {health &&
        (hasKey ? (
          <button className="btn primary" onClick={probarIA} disabled={testing}>
            {testing ? 'Probando…' : 'Probar conexión IA'}
          </button>
        ) : (
          <button className="btn primary" onClick={onIngresarKey}>
            Ingresar API Key
          </button>
        ))}

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
            Todavía no ingresaste tu API Key. Andá a <strong>Ajustes</strong>, elegí un
            proveedor y pegala — después volvé a probar.
          </p>
        </div>
      )}

      {test && !test.ok && !test.needsKey && <p className="error">{test.error}</p>}
    </section>
  );
}
