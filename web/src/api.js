async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(body?.error || `Error del servidor (${res.status})`);
  }
  return body;
}

export const api = {
  health: () => request('/api/health'),
  getSettings: () => request('/api/settings'),
  saveSettings: (data) =>
    request('/api/settings', { method: 'PUT', body: JSON.stringify(data) }),
  testVision: () => request('/api/vision/test', { method: 'POST' }),
  crearCiclo: (data = {}) =>
    request('/api/ciclos', { method: 'POST', body: JSON.stringify(data) }),
  cicloActual: () => request('/api/ciclos/actual'),
  extraerFotos: (cicloId, data) =>
    request(`/api/ciclos/${cicloId}/extraccion`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  editarCiclo: (cicloId, data) =>
    request(`/api/ciclos/${cicloId}`, { method: 'PATCH', body: JSON.stringify(data) }),
  agregarItem: (cicloId, data) =>
    request(`/api/ciclos/${cicloId}/items`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  editarItem: (cicloId, itemId, data) =>
    request(`/api/ciclos/${cicloId}/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  borrarItem: (cicloId, itemId) =>
    request(`/api/ciclos/${cicloId}/items/${itemId}`, { method: 'DELETE' }),
  generarPropuesta: (cicloId) =>
    request(`/api/ciclos/${cicloId}/propuesta`, { method: 'POST' }),
};
