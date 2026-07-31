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
};
