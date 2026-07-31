import open from 'open';
import { createApp } from './app.js';

const app = createApp();

// Solo localhost por defecto: la API expone datos del hogar y llamadas pagas
// a la IA sin autenticación. Para usar el teléfono en la LAN (modo cámara del
// piloto), exponer a propósito con HOST=0.0.0.0 — el chequeo de Origin del
// middleware sigue vigente.
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
