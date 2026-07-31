# Plan de exposición — Kickoff por foto

- **Spec:** `product/specs/2026-07-30-1209-kickoff-por-foto.md`
- **Origen:** sesión `/slice-this-feature` 2026-07-31
- **Decisiones de la sesión:** el plan queda en **2 niveles** — no existe un nivel de "memoria del hogar / segundo ciclo": un ciclo nuevo reemplaza al anterior, el ciclo limpio es parte del modelo base desde el Nivel 1. La assumption #1 de la spec (precisión del LLM sobre fotos reales) **ya está validada con evals** — el prompt existe y se reutiliza.

## Hipótesis del spec

Creemos que **Valeria (la decisora familiar sobrecargada)** va a **abrir cada ciclo de planificación con fotos y completar el triage hasta llegar a la propuesta (cenas del período + lista de compras)** porque **la foto elimina el "contarle todo" que mató a ChatGPT y a las apps de la categoría, y el repaso ocurre una sola vez por ciclo, en su momento de máxima motivación**.

## Mecanismo de exposición

**Recomendación:** Desarrollo incremental

**Por qué:** ningún nivel segmenta sub-cohortes dentro de la población desplegada — la audiencia crece por reclutamiento de hogares, no por gating — y el repositorio mantiene contexto durable entre iteraciones (specs, decisiones e insights en `product/`), lo que permite construir capa por capa sin deriva.

Solo una sugerencia — el equipo de ingeniería decide la implementación final.

## Niveles

El Nivel 2 acumula sobre el Nivel 1. El modelo de **ciclo efímero forma parte de la base desde el Nivel 1**: un ciclo nuevo reemplaza al anterior, sin inventario arrastrado ni estados de deuda; restricciones, gustos y repertorio del hogar persisten como parte del modelo, no como capa a revelar.

### Nivel 1 — El ciclo mínimo: de la foto a las cenas

Lo que se revela: apertura de ciclo con una o varias fotos sin "tipo de foto"; horizonte visible y pisable al momento de la foto; lista de solo alimentos con cantidades estimadas y triage por certeza (confirmados / a revisar / a confirmar); repaso único con el gesto de agregar sobras ("guiso, 2 porciones"); propuesta de cenas «con lo que tengo»; un ciclo nuevo reemplaza al anterior. Queda deliberadamente oculto: la lista de compras de gaps, el share a WhatsApp y el modo «con compra adicional».

**Belief:** el repaso único es lo bastante corto y la propuesta lo bastante creíble para que Valeria llegue de la foto a las cenas en su pico de motivación, sin que el triage la expulse.

**Audiencia:** 8–12 hogares tipo Valeria — decisoras/es familiares con hijos escolares que ya revisan qué hay antes de la compra grande.

**Duración:** 2 semanas (al menos un ciclo de compra completo por hogar).

**Validation:**
- **Avanzar si:** la mediana foto→propuesta es ≤5 minutos y ≥70% de los ciclos iniciados llegan a la propuesta (umbrales del spec, a recalibrar con el primer dato real).
- **Detener si:** más del 30% de los ciclos se abandona en el triage, o las correcciones dominan el repaso — la señal cualitativa de "la hora escaneando códigos" que mató a la app de E04.

### Nivel 2 — La lista de compras que completa el plan

Lo que se revela: junto a las cenas, la lista de gaps (exactamente lo que el plan necesita y la foto no encontró); el share de plan + lista a WhatsApp con un toque, como texto plano; el modo «con compra adicional» como opt-in en el perfil, pisable por ciclo.

**Belief:** la lista de gaps hace realizable el plan y vive en el canal madre del hogar — se comparte a WhatsApp en lugar de convertirse en una segunda lista que compite con la existente.

**Audiencia:** los mismos hogares del Nivel 1 — observar el efecto compuesto sobre quienes ya completan ciclos.

**Duración:** 2–3 semanas (permite además observar la vuelta al siguiente ciclo).

**Validation:**
- **Avanzar si (hipótesis resuelta):** ≥60% de las propuestas con gaps se comparten a WhatsApp, ningún hogar reporta lista doble, y quienes completaron un ciclo abren el siguiente dentro de 1,5× su horizonte declarado.
- **Detener si:** reaparece el patrón Bring (dos listas conviviendo sin fusionarse), la lista se ignora al comprar, o los hogares no vuelven a abrir ciclos aunque el Nivel 1 haya validado.

## Validaciones en paralelo

Riesgos que no se validan revelando una capa del producto, pero que corren el mismo reloj:

- **Precisión del LLM sobre fotos reales:** ya validada con evals; el prompt se reutiliza como base del Nivel 1.
- **Tickets LatAm:** verificar que los evals existentes cubran tickets con nombres crípticos de la región; si no, se puede excluir el ticket del Nivel 1 sin tocar el resto del flujo.
- **Costo por ciclo (viabilidad):** medir el costo de inferencia por ciclo (fotos + propuesta) en ambos providers; define si el modelo económico soporta un uso semanal por hogar.
- **Pudor y logística de la foto:** solo E04 lo hace hoy de forma sostenida; sondear en el reclutamiento si el gesto aparece en más hogares.

## Preguntas abiertas para el equipo de producto

- **Uso real del gesto de sobras:** si en el Nivel 1 nadie lo usa, el punto ciego #1 del corpus (5/7 hogares) sigue abierto — decidir si se promueve o se rediseña antes del Nivel 2.
- **Plan-calendario vs. plan-canasta:** tensión abierta de la revisión de la spec — el Nivel 1 es la oportunidad de observar si los hogares siguen el orden propuesto de cenas o eligen a demanda.
- **Reclutamiento:** de dónde salen los 8–12 hogares tipo Valeria y quién sostiene los check-ins durante las ~4–5 semanas del plan.
- **Umbrales propuestos, no derivados:** 5 min, 30%, 60% deben recalibrarse con el primer dato real de cada nivel.
