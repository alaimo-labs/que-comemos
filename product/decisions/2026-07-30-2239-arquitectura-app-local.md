# Arquitectura de la app: local, autocontenida y agnóstica del proveedor de IA

- **Origen:** decisión técnica conversada en sesión de planificación (2026-07-30), previa al primer scaffold de código
- **Spec que habilita:** `product/specs/2026-07-30-1209-kickoff-por-foto.md` (kickoff por foto)
- **Estado:** aprobada — implementada en el scaffold inicial del repo

## Restricciones que definen la arquitectura

1. **Autocontenida.** La app se descarga de GitHub (clone o ZIP) y se ejecuta local por personas sin conocimientos técnicos, con el mínimo de pasos posible. No hay servidor central, no hay deploy, no hay cuenta que crear.
2. **Web mobile-first.** La UI se abre en el browser local (el celular se simula con el modo responsive de devtools durante esta etapa). Todo en español.
3. **Sin servidor de base de datos.** SQLite embebido como archivo (`data/quecomemos.db`, gitignored). Persiste entre ejecuciones sin ningún proceso adicional.
4. **IA agnóstica del proveedor.** La app funciona con OpenAI o Anthropic, a elección del usuario. La API key es del usuario y el browser nunca la conoce: el backend local hace de proxy.
5. **Un solo proceso.** El mismo proceso Node sirve el frontend estático y la API.

## Decisiones y razones

### Stack: Node + Express + better-sqlite3 + Vite/React, sin TypeScript

El único prerequisito de instalación es Node (pnpm se activa vía corepack, que viene incluido). Express es estable y sirve build estático + API desde un proceso. better-sqlite3 es SQLite embebido, síncrono y zero-config. React facilita la UI de la feature (cámara, triage). Se descartaron Next.js/SvelteKit (complejidad de build/runtime que el usuario final no necesita) y Bun (un instalador más).

Los usuarios finales corren un build de producción que se genera solo durante `pnpm install` (hook `postinstall`); nunca ven un dev server.

### Capa de IA: Vercel AI SDK (`ai` + `@ai-sdk/anthropic` + `@ai-sdk/openai`)

Lo que la app necesita del LLM es exactamente el subset commodity: mandar imagen + prompt y recibir JSON estructurado (lista de ingredientes). Con el AI SDK eso es **un solo code path** (`generateObject` con schema Zod) para ambos proveedores — el SDK normaliza el formato de imagen y la salida estructurada, y valida con retry. Cambiar de proveedor es una línea en la factory; agregar Gemini u Ollama local en el futuro es un paquete más.

Se descartó el adaptador propio sobre los SDKs oficiales (duplicaba el código de imagen + salida estructurada, las dos partes con más quirks por proveedor). El costo aceptado: una capa de abstracción más al debuggear, y acceso menos directo a features específicas de cada proveedor (que esta app no usa).

Modelos default (editables en Ajustes): Anthropic `claude-opus-5`, OpenAI `gpt-5.6-luna`.

### Credenciales: en SQLite (tabla `settings`) con pantalla de Ajustes, no `.env`

En seguridad son equivalentes: ambos son texto plano en disco local, gitignored, mismo threat model. La diferencia es UX, que es la restricción central del producto: editar un archivo oculto a mano es una barrera real para Valeria; pegar la clave en una pantalla de Ajustes no. Las claves son write-only hacia el browser (la API devuelve solo `{configured, last4}`).

Riesgo residual documentado en el README: si el usuario comparte la carpeta `data/`, la clave viaja adentro.

### Migraciones: runner propio, sin framework

~30 líneas: archivos `.sql` numerados aplicados en transacción al boot, registrados en `schema_migrations`. Para una app local de instancia única sin rollbacks en producción, un framework (Drizzle, Umzug) no paga su costo hoy. Si el proyecto crece, migrar a Drizzle es barato porque los `.sql` ya existen.

### Distribución y arranque

- `pnpm` como package manager (`packageManager` fijado en `package.json`, corepack lo resuelve solo).
- El server abre el browser automáticamente al arrancar.
- Lanzadores de doble click (`Iniciar QueComemos.command` / `.bat`) que verifican Node con error amigable en español, habilitan pnpm, instalan si hace falta y arrancan.

## Implicancias para las features

- El futuro `/api/extract` (foto → ingredientes del spec kickoff-por-foto) ya tiene su base: la ruta `/api/vision/test` demuestra el wiring browser → backend → AI SDK → proveedor elegido.
- Las tablas de dominio (ciclos, ítems, plan de cenas) llegan como migraciones nuevas (`002-*.sql`, …) cuando se implemente el spec.
- Compartir por WhatsApp (historia 6 del spec) no requiere backend: texto plano + deep link `wa.me`, compatible con la app local.
