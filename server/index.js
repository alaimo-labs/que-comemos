import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import open from 'open';
import './db/index.js';
import { healthRouter } from './routes/health.js';
import { settingsRouter } from './routes/settings.js';
import { visionRouter } from './routes/vision.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(here, '../dist');

const app = express();
app.use(express.json({ limit: '25mb' }));

app.use('/api/health', healthRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/vision', visionRouter);

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

function listen(port, attemptsLeft) {
  const server = app.listen(port);
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
