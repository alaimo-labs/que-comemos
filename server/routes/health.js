import { Router } from 'express';
import { schemaVersion } from '../db/index.js';
import { getApiKey, getProvider } from '../llm/index.js';

export const healthRouter = Router();

healthRouter.get('/', (req, res) => {
  res.json({
    ok: true,
    dbVersion: schemaVersion(),
    provider: getProvider(),
    apiKeyConfigured: Boolean(getApiKey()),
  });
});
