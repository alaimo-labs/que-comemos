export const DIAS_SEMANA = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

// Día 1 = el día en que se generó la propuesta.
export function etiquetaDia(periodoDia, baseIso) {
  const n = Number(periodoDia);
  if (!Number.isInteger(n) || n < 1 || !baseIso) {
    return String(periodoDia).toUpperCase();
  }
  const fecha = new Date(baseIso);
  fecha.setDate(fecha.getDate() + n - 1);
  return DIAS_SEMANA[fecha.getDay()];
}
