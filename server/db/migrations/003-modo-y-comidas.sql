ALTER TABLE ciclos ADD COLUMN modo TEXT NOT NULL DEFAULT 'con_lo_que_tengo'
  CHECK (modo IN ('con_lo_que_tengo', 'con_compra_adicional'));

-- JSON serializado; el subset válido se valida en la ruta.
ALTER TABLE ciclos ADD COLUMN comidas TEXT NOT NULL
  DEFAULT '["desayuno","almuerzo","merienda","cena"]';
