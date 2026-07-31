import { Router } from 'express';
import { testConnection } from '../llm/index.js';

export const visionRouter = Router();

visionRouter.post('/test', async (req, res) => {
  try {
    res.json(await testConnection());
  } catch (err) {
    const detail = err?.message || String(err);
    res.status(502).json({
      ok: false,
      error:
        'No pudimos conectarnos al servicio de IA. Revisá que la clave sea válida y que tengas conexión a internet.',
      detail,
    });
  }
});
