import { useEffect, useRef, useState } from 'react';
import { api } from '../api.js';
import { prepararImagen } from '../imagen.js';

const GRUPOS = [
  { confianza: 'confirmado', titulo: 'Confirmados' },
  { confianza: 'a_revisar', titulo: 'A revisar' },
  { confianza: 'a_confirmar', titulo: 'A confirmar' },
];

export function Ciclo() {
  const [cargando, setCargando] = useState(true);
  const [ciclo, setCiclo] = useState(null);
  const [items, setItems] = useState([]);
  const [propuesta, setPropuesta] = useState(null);
  const [inputMode, setInputMode] = useState('archivos');
  const [ocupado, setOcupado] = useState(null); // 'creando' | 'extraccion' | 'propuesta'
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.cicloActual(), api.getSettings()])
      .then(([actual, settings]) => {
        setCiclo(actual.ciclo);
        setItems(actual.items || []);
        setPropuesta(actual.propuesta || null);
        setInputMode(settings.input_mode);
      })
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  async function empezarCiclo() {
    setOcupado('creando');
    setError(null);
    try {
      const { ciclo: nuevo } = await api.crearCiclo();
      setCiclo(nuevo);
      setItems([]);
      setPropuesta(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setOcupado(null);
    }
  }

  async function extraer(fotos, primeraFotoTs) {
    setOcupado('extraccion');
    setError(null);
    try {
      const imagenes = [];
      for (const foto of fotos) {
        imagenes.push(await prepararImagen(foto.file));
      }
      const res = await api.extraerFotos(ciclo.id, {
        imagenes,
        primera_foto_ts: primeraFotoTs,
      });
      setCiclo(res.ciclo);
      setItems(res.items);
    } catch (e) {
      setError(e.message);
    } finally {
      setOcupado(null);
    }
  }

  async function pisarHorizonte(dias) {
    try {
      const { ciclo: actualizado } = await api.editarCiclo(ciclo.id, {
        horizonte_dias: dias,
      });
      setCiclo(actualizado);
    } catch (e) {
      setError(e.message);
    }
  }

  async function armarCenas() {
    setOcupado('propuesta');
    setError(null);
    try {
      const res = await api.generarPropuesta(ciclo.id);
      setCiclo(res.ciclo);
      setPropuesta(res.propuesta);
    } catch (e) {
      setError(e.message);
    } finally {
      setOcupado(null);
    }
  }

  if (cargando) return <section className="screen">Cargando…</section>;

  return (
    <section className="screen">
      {!ciclo && (
        <>
          <h2>Un plan nuevo</h2>
          <div className="card muted">
            <p>
              Sacale fotos a tu heladera, freezer, alacena o a la compra — con eso
              armamos las cenas del período. Nada para tipear.
            </p>
          </div>
          <button
            className="btn primary espaciado"
            onClick={empezarCiclo}
            disabled={ocupado === 'creando'}
          >
            {ocupado === 'creando' ? 'Abriendo…' : 'Empezar con una foto'}
          </button>
        </>
      )}

      {ciclo?.estado === 'captura' &&
        (ocupado === 'extraccion' ? (
          <Espera mensaje="Leyendo tus fotos…" />
        ) : (
          <Captura
            ciclo={ciclo}
            inputMode={inputMode}
            onExtraer={extraer}
            onHorizonte={pisarHorizonte}
          />
        ))}

      {ciclo?.estado === 'triage' &&
        (ocupado === 'propuesta' ? (
          <Espera mensaje="Armando tus cenas…" />
        ) : (
          <Triage
            ciclo={ciclo}
            items={items}
            setItems={setItems}
            setError={setError}
            onArmarCenas={armarCenas}
          />
        ))}

      {ciclo?.estado === 'propuesta' && propuesta && (
        <Propuesta
          ciclo={ciclo}
          propuesta={propuesta}
          items={items}
          onCicloNuevo={empezarCiclo}
        />
      )}

      {error && <p className="error">{error}</p>}
    </section>
  );
}

function Espera({ mensaje }) {
  return (
    <div className="espera">
      <div className="spinner" />
      <p className="muted">{mensaje}</p>
    </div>
  );
}

function Captura({ ciclo, inputMode, onExtraer, onHorizonte }) {
  const [fotos, setFotos] = useState([]);
  const [arrastrando, setArrastrando] = useState(false);
  const primeraFotoTs = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    return () => fotos.forEach((f) => URL.revokeObjectURL(f.url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function agregar(fileList) {
    const nuevas = [...fileList]
      .filter((f) => f.type.startsWith('image/') || /\.heic$/i.test(f.name))
      .map((file) => ({ file, url: URL.createObjectURL(file) }));
    if (!nuevas.length) return;
    if (!primeraFotoTs.current) primeraFotoTs.current = new Date().toISOString();
    setFotos((prev) => [...prev, ...nuevas]);
  }

  function quitar(idx) {
    setFotos((prev) => {
      URL.revokeObjectURL(prev[idx].url);
      return prev.filter((_, i) => i !== idx);
    });
  }

  return (
    <>
      <h2>Sacá o sumá fotos</h2>
      <p className="muted">
        Heladera, freezer, alacena, la compra sobre la mesada o el ticket — todas
        suman a la misma lista.
      </p>

      {inputMode === 'camara' ? (
        <button
          className="btn primary espaciado"
          onClick={() => inputRef.current?.click()}
        >
          Sacar foto
        </button>
      ) : (
        <div
          className={arrastrando ? 'dropzone dragover' : 'dropzone'}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setArrastrando(true);
          }}
          onDragLeave={() => setArrastrando(false)}
          onDrop={(e) => {
            e.preventDefault();
            setArrastrando(false);
            agregar(e.dataTransfer.files);
          }}
        >
          <p>Arrastrá tus fotos acá</p>
          <p className="muted">o tocá para elegirlas</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        {...(inputMode === 'camara' ? { capture: 'environment' } : {})}
        onChange={(e) => {
          agregar(e.target.files);
          e.target.value = '';
        }}
      />

      {fotos.length > 0 && (
        <div className="thumbs">
          {fotos.map((foto, idx) => (
            <div className="thumb" key={foto.url}>
              <img src={foto.url} alt={`Foto ${idx + 1}`} />
              <button
                type="button"
                aria-label="Quitar foto"
                onClick={() => quitar(idx)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="stepper">
        <span>Cenas para</span>
        <button
          type="button"
          disabled={ciclo.horizonte_dias <= 1}
          onClick={() => onHorizonte(ciclo.horizonte_dias - 1)}
        >
          –
        </button>
        <strong>{ciclo.horizonte_dias} días</strong>
        <button
          type="button"
          disabled={ciclo.horizonte_dias >= 30}
          onClick={() => onHorizonte(ciclo.horizonte_dias + 1)}
        >
          +
        </button>
      </div>

      <button
        className="btn primary"
        disabled={fotos.length === 0}
        onClick={() => onExtraer(fotos, primeraFotoTs.current)}
      >
        {fotos.length === 0
          ? 'Sumá al menos una foto'
          : `Leer ${fotos.length === 1 ? 'la foto' : `las ${fotos.length} fotos`}`}
      </button>
    </>
  );
}

function Triage({ ciclo, items, setItems, setError, onArmarCenas }) {
  const [editando, setEditando] = useState(null); // { id, nombre, cantidad }
  const [agregando, setAgregando] = useState(null); // { origen, nombre, cantidad }
  const [tabActiva, setTabActiva] = useState('confirmado');

  async function guardarEdicion() {
    if (!editando) return;
    const original = items.find((i) => i.id === editando.id);
    const nombre = editando.nombre.trim();
    const cantidad = editando.cantidad.trim();
    if (!nombre || !cantidad) return;
    if (nombre === original.nombre && cantidad === original.cantidad) {
      setEditando(null);
      return;
    }
    try {
      const { item } = await api.editarItem(ciclo.id, editando.id, {
        nombre,
        cantidad,
      });
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
      setEditando(null);
    } catch (e) {
      setError(e.message);
    }
  }

  async function confirmar(item) {
    try {
      const { item: actualizado } = await api.editarItem(ciclo.id, item.id, {
        confianza: 'confirmado',
      });
      setItems((prev) => prev.map((i) => (i.id === actualizado.id ? actualizado : i)));
    } catch (e) {
      setError(e.message);
    }
  }

  async function borrar(item) {
    try {
      await api.borrarItem(ciclo.id, item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (e) {
      setError(e.message);
    }
  }

  async function agregarItem(e) {
    e.preventDefault();
    const nombre = agregando.nombre.trim();
    const cantidad = agregando.cantidad.trim();
    if (!nombre || !cantidad) return;
    try {
      const { item } = await api.agregarItem(ciclo.id, {
        nombre,
        cantidad,
        origen: agregando.origen,
      });
      setItems((prev) => [...prev, item]);
      setAgregando(null);
      setTabActiva('confirmado');
    } catch (e2) {
      setError(e2.message);
    }
  }

  function fila(item) {
    if (editando?.id === item.id) {
      return (
        <li className="item-row" key={item.id}>
          <form
            className="item-edicion"
            onSubmit={(e) => {
              e.preventDefault();
              guardarEdicion();
            }}
          >
            <input
              autoFocus
              value={editando.nombre}
              aria-label="Nombre"
              onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
            />
            <input
              value={editando.cantidad}
              aria-label="Cantidad"
              onChange={(e) => setEditando({ ...editando, cantidad: e.target.value })}
            />
            <button type="submit" className="accion" aria-label="Guardar">
              ✓
            </button>
          </form>
        </li>
      );
    }

    return (
      <li className="item-row" key={item.id}>
        <button
          type="button"
          className="item-texto"
          onClick={() =>
            setEditando({ id: item.id, nombre: item.nombre, cantidad: item.cantidad })
          }
        >
          {item.nombre} <span className="muted">({item.cantidad})</span>
          {item.origen === 'sobra' && <span className="tag tag-confirmado">sobra</span>}
        </button>
        <span className="item-acciones">
          {item.confianza !== 'confirmado' && (
            <button
              type="button"
              className="accion"
              aria-label="Confirmar"
              onClick={() => confirmar(item)}
            >
              ✓
            </button>
          )}
          <button
            type="button"
            className="accion destructiva"
            aria-label="Sacar"
            onClick={() => borrar(item)}
          >
            ×
          </button>
        </span>
      </li>
    );
  }

  const vacio = items.length === 0;

  return (
    <>
      <h2>Un solo repaso</h2>
      <p className="muted">
        Corregí lo que haga falta tocando el ítem, sacá lo que no va y sumá lo que la
        foto no puede ver. No estás obligada a completar nada.
      </p>

      {vacio && (
        <div className="card warn-card">
          <p>
            No encontramos alimentos en las fotos — agregá a mano lo que tengas, o
            empezá un plan nuevo con otras fotos.
          </p>
        </div>
      )}

      <div className="tabs">
        {GRUPOS.map(({ confianza, titulo }) => (
          <button
            key={confianza}
            type="button"
            className={tabActiva === confianza ? 'tab active' : 'tab'}
            onClick={() => setTabActiva(confianza)}
          >
            {titulo}
            <span className={`tag tag-${confianza}`}>
              {items.filter((i) => i.confianza === confianza).length}
            </span>
          </button>
        ))}
      </div>

      {(() => {
        const grupo = items.filter((i) => i.confianza === tabActiva);
        return grupo.length ? (
          <>
            {tabActiva === 'a_confirmar' && (
              <p className="muted espaciado">
                Estos ítems no entran al plan hasta que los confirmes con ✓ (o los
                corrijas tocándolos).
              </p>
            )}
            <ul className="items-list">{grupo.map(fila)}</ul>
          </>
        ) : (
          <p className="muted espaciado">Nada por acá.</p>
        );
      })()}

      <div className="acciones-sticky">
      {agregando ? (
        <form className="item-edicion espaciado" onSubmit={agregarItem}>
          <input
            autoFocus
            placeholder={agregando.origen === 'sobra' ? 'Guiso' : 'Nombre'}
            value={agregando.nombre}
            onChange={(e) => setAgregando({ ...agregando, nombre: e.target.value })}
          />
          <input
            placeholder={agregando.origen === 'sobra' ? '2 porciones' : 'Cantidad'}
            value={agregando.cantidad}
            onChange={(e) => setAgregando({ ...agregando, cantidad: e.target.value })}
          />
          <button type="submit" className="accion" aria-label="Agregar">
            ✓
          </button>
          <button
            type="button"
            className="accion destructiva"
            aria-label="Cancelar"
            onClick={() => setAgregando(null)}
          >
            ×
          </button>
        </form>
      ) : (
        <div className="acciones-agregar">
          <button
            type="button"
            className="btn secundario"
            onClick={() => setAgregando({ origen: 'manual', nombre: '', cantidad: '' })}
          >
            + Agregar ítem
          </button>
          <button
            type="button"
            className="btn secundario"
            onClick={() => setAgregando({ origen: 'sobra', nombre: '', cantidad: '' })}
          >
            + Sobra
          </button>
        </div>
      )}

      <button className="btn primary" disabled={vacio} onClick={onArmarCenas}>
        Armar las cenas
      </button>
      </div>
    </>
  );
}

const DIAS_SEMANA = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

// Día 1 = el día en que se generó la propuesta.
function etiquetaDia(periodoDia, baseIso) {
  const n = Number(periodoDia);
  if (!Number.isInteger(n) || n < 1 || !baseIso) {
    return String(periodoDia).toUpperCase();
  }
  const fecha = new Date(baseIso);
  fecha.setDate(fecha.getDate() + n - 1);
  return DIAS_SEMANA[fecha.getDay()];
}

function Propuesta({ ciclo, propuesta, items, onCicloNuevo }) {
  const [confirmandoNuevo, setConfirmandoNuevo] = useState(false);

  const nombresSobras = items
    .filter((i) => i.origen === 'sobra')
    .map((i) => i.nombre.toLowerCase());
  const usaSobra = (plato) =>
    plato.ingredientes_disponibles.some((ing) =>
      nombresSobras.some((s) => ing.toLowerCase().includes(s))
    );

  return (
    <>
      <h2>Tus cenas para {ciclo.horizonte_dias} días</h2>

      {propuesta.platos.map((plato, idx) => (
        <div className="card plato" key={idx}>
          <span className="plato-dia">
            {etiquetaDia(plato.periodo_dia, ciclo.propuesta_at)}
          </span>
          <div className="plato-cuerpo">
            <p className="plato-nombre">{plato.nombre}</p>
            <p className="plato-sub">Rinde {plato.porciones} · con lo que tenés</p>
            <div className="plato-pills">
              <span className="pill">Con lo que hay</span>
              {usaSobra(plato) && <span className="pill pill-sobra">Aprovecha sobras</span>}
            </div>
            <p className="muted">{plato.preparacion_breve}</p>
            {plato.ingredientes_disponibles.length > 0 && (
              <ul className="plato-lista muted">
                {plato.ingredientes_disponibles.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            )}
            {plato.ingredientes_a_comprar.length > 0 && (
              <>
                <p className="plato-faltantes">Te falta:</p>
                <ul className="plato-lista plato-lista-faltantes">
                  {plato.ingredientes_a_comprar.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      ))}

      {propuesta.supuestos_y_alertas?.length > 0 && (
        <div className="card warn-card">
          {propuesta.supuestos_y_alertas.map((alerta, idx) => (
            <p key={idx}>{alerta}</p>
          ))}
        </div>
      )}

      {propuesta.alimentos_disponibles_sin_uso?.length > 0 && (
        <div className="card">
          <p className="sin-uso-titulo">Te queda sin usar</p>
          <ul className="plato-lista muted">
            {propuesta.alimentos_disponibles_sin_uso.map((a, idx) => (
              <li key={idx}>
                {a.alimento}
                {a.cantidad_estimada ? ` (${a.cantidad_estimada})` : ''}
              </li>
            ))}
          </ul>
        </div>
      )}

      {confirmandoNuevo ? (
        <div className="card">
          <p>Empezar un plan nuevo reemplaza este. ¿Seguimos?</p>
          <div className="acciones-agregar">
            <button type="button" className="btn primary" onClick={onCicloNuevo}>
              Sí, plan nuevo
            </button>
            <button
              type="button"
              className="btn secundario"
              onClick={() => setConfirmandoNuevo(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          className="btn primary espaciado"
          onClick={() => setConfirmandoNuevo(true)}
        >
          Empezar un plan nuevo
        </button>
      )}
    </>
  );
}
