import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import './db/index.js';
import { healthRouter } from './routes/health.js';
import { settingsRouter } from './routes/settings.js';
import { visionRouter } from './routes/vision.js';
import { ciclosRouter, metricasRouter } from './routes/ciclos.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(here, '../dist');

// Defensa CSRF: un form HTML de un sitio externo no puede fabricar
// Content-Type: application/json, y un fetch cross-origin con ese header
// muere en el preflight (no servimos CORS). El chequeo de Origin cubre
// además DNS rebinding.
const MUTACIONES = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
const HOSTS_LOCALES = new Set(['localhost', '127.0.0.1', '::1', '[::1]']);

export function createApp() {
  const app = express();
  app.use(express.json({ limit: '25mb' }));

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

  return app;
}
