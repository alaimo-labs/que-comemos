import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createApp } from '../server/app.js';

let server;
let base;

beforeAll(async () => {
  await new Promise((resolve) => {
    server = createApp().listen(0, '127.0.0.1', resolve);
  });
  base = `http://127.0.0.1:${server.address().port}`;
});

afterAll(() => {
  server.close();
});

describe('defensa CSRF (fixes del auditor)', () => {
  it('rechaza mutaciones con Content-Type de formulario → 415', async () => {
    const res = await fetch(`${base}/api/ciclos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'x=1',
    });
    expect(res.status).toBe(415);
  });

  it('rechaza mutaciones text/plain → 415', async () => {
    const res = await fetch(`${base}/api/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'text/plain' },
      body: '{}',
    });
    expect(res.status).toBe(415);
  });

  it('rechaza Origin externo → 403 (cubre también DNS rebinding)', async () => {
    const res = await fetch(`${base}/api/ciclos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'http://evil.com' },
      body: '{}',
    });
    expect(res.status).toBe(403);
  });

  it('acepta Origin localhost (dev de Vite) y same-host', async () => {
    const dev = await fetch(`${base}/api/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:5173' },
      body: '{}',
    });
    expect(dev.status).toBe(200);

    const sameHost = await fetch(`${base}/api/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Origin: base },
      body: '{}',
    });
    expect(sameHost.status).toBe(200);
  });

  it('no restringe los GET', async () => {
    const res = await fetch(`${base}/api/health`, {
      headers: { Origin: 'http://evil.com' },
    });
    expect(res.status).toBe(200);
  });

  it('un POST sin body pero con header JSON pasa el middleware', async () => {
    // Es el shape de api.generarPropuesta(); 404 (plan inexistente), nunca 415.
    const res = await fetch(`${base}/api/ciclos/9999/propuesta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.status).toBe(404);
  });
});
