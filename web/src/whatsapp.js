import { etiquetaDia } from './dias.js';

function capitalizar(palabra) {
  return palabra.charAt(0).toUpperCase() + palabra.slice(1);
}

// Texto plano legible sin abrir la app: el plan agrupado por día y, si hay,
// la lista de compras. Vive en el canal donde ya vive la logística del hogar.
export function textoParaWhatsApp({ propuesta, ciclo }) {
  const lineas = [`Comidas para ${ciclo.horizonte_dias} días`, ''];

  const porDia = new Map();
  for (const plato of propuesta.platos) {
    const clave = String(plato.periodo_dia);
    if (!porDia.has(clave)) porDia.set(clave, []);
    porDia.get(clave).push(plato);
  }

  for (const [dia, platos] of porDia) {
    lineas.push(etiquetaDia(dia, ciclo.propuesta_at));
    for (const plato of platos) {
      lineas.push(`  ${capitalizar(plato.comida)}: ${plato.nombre} (rinde ${plato.porciones})`);
    }
  }

  if (propuesta.lista_de_compras?.length) {
    lineas.push('', 'Compras:');
    for (const compra of propuesta.lista_de_compras) {
      const cantidad = [compra.cantidad, compra.unidad_o_tamano].filter(Boolean).join(' ');
      lineas.push(`• ${compra.alimento} — ${cantidad}${compra.motivo ? ` (${compra.motivo})` : ''}`);
    }
  }

  return lineas.join('\n');
}

export function urlWhatsApp(texto) {
  return `https://wa.me/?text=${encodeURIComponent(texto)}`;
}
