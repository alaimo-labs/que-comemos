import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import open from 'open';
import './db/index.js';
import { healthRouter } from './routes/health.js';
import { settingsRouter } from './routes/settings.js';
import { visionRouter } from './routes/vision.js';
import { ciclosRouter, metricasRouter } from './routes/ciclos.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(here, '../dist');

const app = express();
app.use(express.json({ limit: '25mb' }));

// Defensa CSRF: un form HTML de un sitio externo no puede fabricar
// Content-Type: application/json, y un fetch cross-origin con ese header
// muere en el preflight (no servimos CORS). El chequeo de Origin cubre
// además DNS rebinding.
const MUTACIONES = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
const HOSTS_LOCALES = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);

app.use('/api', (req, res, next) => {
  if (!MUTACIONES.has(req.method)) return next();

  const contentType = (req.headers['content-type'] || '').toLowerCase();
  if (!contentType.startsWith('application/json')) {
    return res
      .status(415)
      .json({ error: 'Las modificaciones requieren Content-Type: application/json' });
  }

  const origin = req.headers.origin;
  if (origin) {
    let hostname = null;
    try {
      hostname = new URL(origin).hostname;
    } catch {
      // Origin malformado: se rechaza abajo.
    }
    if (!hostname || (!HOSTS_LOCALES.has(hostname) && hostname !== req.hostname)) {
      return res.status(403).json({ error: 'Origen no permitido' });
    }
  }

  next();
});

app.use('/api/health', healthRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/vision', visionRouter);
app.use('/api/ciclos', ciclosRouter);
app.use('/api/metricas', metricasRouter);

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  app.use((req, res) => {
    res
      .status(503)
      .send('Falta el build de la interfaz. Ejecutá "pnpm install" y volvé a intentar.');
  });
}

// Solo localhost por defecto: la API expone datos del hogar y llamadas pagas
// a la IA sin autenticación. Para usar el teléfono en la LAN (modo cámara del
// piloto), exponer a propósito con HOST=0.0.0.0 — el chequeo de Origin de
// arriba sigue vigente.
const host = process.env.HOST || '127.0.0.1';

function listen(port, attemptsLeft) {
  const server = app.listen(port, host);
  server.on('listening', () => {
    const url = `http://localhost:${port}`;
    console.log(`Qué Comemos corriendo en ${url}`);
    if (!process.env.NO_OPEN) {
      open(url).catch(() => {
        console.log(`Abrí ${url} en tu navegador.`);
      });
    }
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && attemptsLeft > 0) {
      listen(port + 1, attemptsLeft - 1);
    } else {
      console.error('No se pudo iniciar el servidor:', err.message);
      process.exit(1);
    }
  });
}

listen(Number(process.env.PORT) || 4321, 5);
