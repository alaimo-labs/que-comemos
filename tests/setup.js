import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// Cada archivo de test corre en su propio proceso: DB SQLite efímera por
// archivo, sin tocar data/ real. Se setea antes de que cualquier import
// cargue server/db/index.js.
process.env.QUECOMEMOS_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), 'quecomemos-test-')
);
