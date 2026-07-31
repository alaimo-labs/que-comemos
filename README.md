# Qué Comemos

Planificá las cenas de tu casa a partir de una foto de tu heladera. La app corre **entera en tu computadora**: tus datos y tu API Key nunca salen de ahí (solo se usan para hablar con el proveedor de IA que elijas).

## Cómo instalarla (no hace falta saber programar)

**👉 [Guía de instalación paso a paso](INSTALACION.md)** — pensada para cualquier persona, sin conocimientos técnicos, con solución a los problemas frecuentes.

La versión corta:

1. **Instalá Node.js** (una sola vez). Entrá a [nodejs.org](https://nodejs.org), bajá la versión LTS (el botón verde) e instalala como cualquier programa.
2. **Descargá esta app**: en esta página de GitHub, botón verde **Code → Download ZIP**. Descomprimí el ZIP donde quieras (por ejemplo, en Documentos).
3. **Abrila**:
   - En **Mac**: doble click en `Iniciar QueComemos.command`. La primera vez, si Mac lo bloquea, hacé click derecho → Abrir. Si te dice que no tiene permisos, abrí la app Terminal, escribí `chmod +x ` (con un espacio al final), arrastrá el archivo a la ventana y presioná Enter.
   - En **Windows**: doble click en `Iniciar QueComemos.bat`.

La primera vez tarda unos minutos (descarga lo que necesita y se prepara). Después se abre sola en tu navegador.

## Configurar la inteligencia artificial

La app usa un servicio de IA para reconocer los alimentos en tus fotos. Funciona con **Anthropic (Claude)** o con **OpenAI** — elegís uno y usás tu propia API Key:

1. Conseguí una API Key del proveedor que prefieras:
   - Anthropic: [platform.claude.com](https://platform.claude.com)
   - OpenAI: [platform.openai.com](https://platform.openai.com)
2. En la app, andá a **Ajustes › IA**, elegí el proveedor, pegá la API Key y guardá.
3. Abajo de esa misma pestaña, tocá **Probar conexión IA** para confirmar que funciona.

### ¿Por qué la API Key se guarda en la app y no en un archivo?

Decisión deliberada: la API Key se guarda en la base de datos local de la app (carpeta `data/`), no en un archivo de configuración tipo `.env`. La seguridad es la misma en ambos casos — la API Key queda guardada en tu computadora, en texto plano, y no se sube a ningún lado —, pero pegarla en la pantalla de Ajustes es algo que cualquiera puede hacer, mientras que editar un archivo oculto a mano no. La API Key nunca se muestra completa en pantalla ni viaja al navegador.

> ⚠️ **Importante:** la carpeta `data/` contiene tu API Key y tus datos. Si compartís la carpeta de la app con alguien, borrá antes la carpeta `data/`.

## Para desarrolladores

```bash
corepack enable        # habilita pnpm (viene con Node)
pnpm install           # instala dependencias y genera el build (postinstall)
pnpm start             # sirve app + API en http://localhost:4321
pnpm test              # tests (Vitest) con DB efímera y LLM mockeado
pnpm dev               # server con --watch + Vite dev server (HMR) en :5173
```

- **Stack**: Node + Express + better-sqlite3 (archivo en `data/`, migraciones `.sql` en `server/db/migrations/`) + Vite/React.
- **Capa LLM**: [Vercel AI SDK](https://sdk.vercel.ai) con `@ai-sdk/anthropic` y `@ai-sdk/openai` — un solo code path (`generateObject` + Zod) para ambos proveedores.
- **Decisiones de arquitectura y sus razones**: `product/decisions/2026-07-30-2239-arquitectura-app-local.md`.
- **Discovery de producto** (specs, personas, research): carpeta `product/`.
