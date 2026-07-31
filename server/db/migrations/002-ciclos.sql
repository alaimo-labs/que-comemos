CREATE TABLE ciclos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  estado TEXT NOT NULL DEFAULT 'captura'
    CHECK (estado IN ('captura', 'triage', 'propuesta', 'abandonado')),
  horizonte_dias INTEGER NOT NULL,
  fotos_count INTEGER NOT NULL DEFAULT 0,
  creado_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  primera_foto_at TEXT,
  propuesta_at TEXT,
  abandonado_at TEXT,
  abandonado_desde TEXT,
  propuesta_json TEXT
);

CREATE TABLE ciclo_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ciclo_id INTEGER NOT NULL REFERENCES ciclos(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  cantidad TEXT NOT NULL,
  confianza TEXT NOT NULL
    CHECK (confianza IN ('confirmado', 'a_revisar', 'a_confirmar')),
  origen TEXT NOT NULL DEFAULT 'foto'
    CHECK (origen IN ('foto', 'manual', 'sobra')),
  creado_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX idx_ciclo_items_ciclo ON ciclo_items(ciclo_id);
