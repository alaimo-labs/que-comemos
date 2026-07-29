# Idea: Kickoff por foto — el ciclo de planificación arranca con una foto

- **Estado:** clarificada (sesión `/clarify-idea` 2026-07-29)
- **Origen:** idea de Martín; clarificada contra la evidencia de encuesta (n=141), entrevistas reales E01–E07 y el journey to-be revisado (`product/journeys/2026-07-28-1236-…`)
- **Relación con el journey:** redefine el paso 2 (inventario) con un modelo distinto al del to-be — inventario **efímero por ciclo** en vez de inventario vivo persistente — y encadena directo al paso 3 (propuesta)

## La idea clarificada

**Problema:** el arranque en frío del ciclo de planificación. Hoy "contarle todo" a la herramienta es el costo que mató la retención de ChatGPT (E01: "terminé escribiendo más de lo que me ahorraba") y la carga manual de inventario mató a las apps de la categoría (E04: muerta en una semana).

**Para quién:** Valeria (persona primaria, derivada). La foto es el techo de esfuerzo de captura validado — E04 fotografía su heladera antes de comprar desde hace años, por WhatsApp.

**Valor:** eliminar el "contarle todo". Es literal lo que pidió E04: "que me dijera qué cocinar con lo que tengo; pero para eso primero yo tenía que contarle todo, y ahí ya perdí."

**Forma (flujo):**
1. La persona abre un ciclo sacando **una o varias fotos de lo que sea**: heladera, freezer, alacena, la compra en la mesada o el ticket — mismo pipeline; las fotos suman al mismo ciclo.
2. Un LLM devuelve la lista de **solo alimentos** (filtra repasadores, servilletas, no-comestibles), con **cantidades estimadas** y **nivel de confianza** por ítem.
3. **Triage:** alta → lista confirmada (editable, pero la edición no es explícita); media → lista "a revisar"; baja → "a confirmar", con un gesto para agregar desde ahí lo que el LLM dudó.
4. **La persona repasa el triage una vez** (corrige ítems y cantidades) y recién entonces…
5. …se genera la **propuesta de comidas del período**: "con esto tenés estas comidas para tu horizonte". Ahí termina la feature.

## Decisiones tomadas (en orden)

1. **Cada ciclo inicia de cero con la foto; el inventario no se arrastra.** Cada período es un proceso de planificación independiente. Efecto lateral clave: mata por diseño la divergencia silenciosa (riesgo residual #1 del MFC, el que destruyó la app de E04) y replica el patrón real de los registros que sobreviven — la nota se borra tras la compra, la pizarra se borra el sábado: "empieza limpio".
2. **Horizonte declarado en el perfil (opcional) y overrideable al momento de sacar la foto.** El default vive en el perfil; el ciclo puntual puede pisarlo.
3. **El flujo termina en la propuesta, no en el inventario.** Nadie quiere un inventario; quieren la cena resuelta. La lista triageada es un paso intermedio visible, no el entregable.
4. **Triage primero, propuesta después** ⚠️ decisión contra la recomendación de evidencia (fricción antes del valor): se sostiene porque ocurre una vez por ciclo en el momento de máxima motivación (la revisada del viernes de E03 es el gesto real equivalente), no a diario. La métrica que la valida o la mata: **tiempo foto→propuesta**.
5. **Muere el stock; sobrevive la memoria del hogar.** Entre ciclos se arrastran restricciones, gustos, historial de propuestas/cocinado y repertorio aprendido. Sin eso, cada ciclo sería una conversación nueva con ChatGPT (el re-contexto que mató la retención).
6. **Cualquier foto, mismo pipeline.** No hay tipos de foto que aprender; el filtro "solo alimentos" absorbe el ruido.
7. **Cantidades estimadas siempre, corregibles en el triage** ⚠️ también contra la recomendación (presencia sola): coherente con la decisión 4 — el triage obligatorio le da un lugar natural a la corrección antes de que un error de cantidad envenene la propuesta o la credibilidad (patrón salmón de E04).

## Supuestos abiertos (rankeados por letalidad)

1. **Precisión del LLM en fotos reales** (ítems + cantidades + filtro alimentos): si media/baja se llenan, el triage-first se convierte en "la hora escaneando códigos" que mató a la app de E04. **Testeable sin construir el producto:** prototipo con 20–30 fotos reales de heladeras/compras y medir distribución de confianza y tasa de error.
2. **Que el triage se complete y sea corto:** el kickoff muere si el repaso se alarga o se abandona. Métrica: tiempo foto→propuesta y tasa de abandono en triage.
3. **Los tuppers/sobras:** la foto no puede ver adentro ("no sé si es salsa o sopa", E04) — y las sobras son el punto ciego #1 del corpus (5/7 hogares). El modelo efímero tampoco las arrastra del ciclo anterior. Sin resolver: puede ser una limitación aceptada del MVP.
4. **Pudor/logística de la foto:** heladera real desordenada, con mala luz, con niños colgados. E04 lo hace hace años (a favor); el resto del corpus no lo hizo nunca.
5. **Tickets:** nombres crípticos de productos en tickets LatAm — calidad de extracción desconocida.

## Tensión documentada con el journey to-be

El paso 2 del to-be describe un **inventario vivo** que se alimenta de la lista comprada y de lo cocinado, con la captura manual como corrección. Esta idea propone lo contrario: **inventario efímero que nace de la foto en cada ciclo**. No son necesariamente incompatibles (el efímero puede ser el MVP y el vivo la evolución), pero la decisión debe hacerse explícita en el spec: si el kickoff por foto retiene, el inventario vivo quizás nunca haga falta — y con él desaparece el riesgo residual #1. Actualizar el journey cuando el spec lo resuelva.

## Próximo paso

Escribir el spec (`/write-spec`) de este flujo — o, antes, matar el supuesto #1 con el prototipo de fotos reales, que es barato y decide si el triage-first es viable.
