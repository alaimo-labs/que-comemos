# Kickoff por foto — el ciclo de planificación arranca con una foto

- **Origen:** idea clarificada `product/ideas/2026-07-29-1313-kickoff-por-foto.md` (sesión `/clarify-idea` 2026-07-29); ampliado con la lista de compras en la propuesta (sesión `/clarify-idea` 2026-07-30)
- **Journey:** redefine el paso 2 del to-be (`product/journeys/2026-07-28-1236-journey-to-be-ciclo-quecomemos.md`), encadena directo al paso 3 y adelanta una versión mínima del paso 5 (lista de gaps)
- **Estado:** revisado tras panel de crítica (Valeria 4/5, `product/insights/2026-07-30-1249-critique-kickoff-por-foto.md`)

## Problema

Cada intento de resolver "¿qué comemos?" con una herramienta murió en el arranque en frío: antes de recibir valor, la persona tiene que contarle a la herramienta todo lo que hay en su casa — y ese costo mata la retención antes de que exista. Le pasó a ChatGPT (re-contexto en cada uso) y a las apps de inventario de la categoría (88% de churn, Q6 de la encuesta; la de E04 murió en una semana). El gesto que sí sobrevive años es el opuesto: una foto de la heladera que no exige nada.

> Evidencia: "Que me dijera qué cocinar con lo que tengo. Eso era lo que yo quería. Pero para que hiciera eso, primero yo tenía que contarle todo lo que tengo, y ahí ya perdí." — Daniela (E04), `product/interviews/2026-07-28-e04-daniela-santiago.md`

> Evidencia: "Cada vez tenía que volver a contarle todo […] Terminé escribiendo más de lo que me ahorraba." — Paola (E01), insight 2 de `product/insights/2026-07-29-1213-entrevistas-e01-e07-planificacion-hogares.md`

> Evidencia: "Antes de salir abro el refrigerador y le saco una foto, y la despensa también, y las mando al grupo." — Daniela (E04), hace años, por WhatsApp — el techo real de esfuerzo de captura.

## Para quién

**Valeria Domínguez** (`product/personas/valeria-dominguez.md`), la decisora familiar sobrecargada — persona primaria derivada de E01/E04/E06 y del segmento con más dolor de la encuesta (hijos escolares: 7% planifica, 67% dolor alto). Es quien carga con la decisión diaria y ya tiene el gesto de revisar qué hay antes de comprar (82%, Q9); lo que nunca sostuvo es un registro que le exija carga.

## User journey

1. **Trigger** — Viernes a la noche o antes de la compra grande: el momento en que Valeria ya hoy revisa qué queda ("el viernes en la noche miro y hago un cálculo de qué me queda", E03) o le saca una foto a la heladera (E04). Es su pico de motivación del ciclo.
2. **Fotos** — Abre QueComemos y saca una o varias fotos de lo que sea: heladera, freezer, alacena, la compra sobre la mesada o el ticket. No elige "tipo de foto"; todas suman al mismo ciclo. Ahí mismo ve los dos ajustes del ciclo, que vienen del perfil y puede pisar para esta vez: el **horizonte** y el **modo** — «con lo que tengo» (default) o «con compra adicional».
3. **Lista con triage** — En segundos ve una lista de solo alimentos (la app filtró repasadores y no comestibles), con cantidades estimadas, agrupada por certeza: **confirmados** / **a revisar** / **a confirmar**.
4. **Un solo repaso** — Recorre la lista una vez: corrige un par de cantidades, saca lo que no va y agrega a mano lo que la foto no puede ver — el tupper del freezer entra como sobra ("guiso, 2 porciones") con un gesto, ahí mismo. No está obligada a completar nada — puede aceptar tal cual y seguir.
5. **Outcome: la propuesta** — Recibe las **cenas** del período (alcance del MVP; ver revisión abajo) junto con la lista de compras que las completa: "con esto tenés estas cenas para tu horizonte — y comprando esto llegás entero". Las sobras que registró van primero, antes que cocinar de cero; después platos de su repertorio, cocinables con lo que la foto encontró, dentro de los gustos del hogar. La lista es corta (los gaps que destraban el plan) y simple, como el chorizo de WhatsApp que ya usa — y plan + lista se mandan al WhatsApp de la casa con un toque. La decisión diaria del período quedó pre-resuelta. La app entrega y se desentiende: acá termina la feature, sin estado "esperando compra".
6. **El ciclo siguiente empieza limpio** — Nada del inventario se arrastra: el próximo ciclo arranca con fotos nuevas, como la nota que se borra al volver del mercado. Lo único que persiste es la memoria del hogar: restricciones, gustos, historial y repertorio — nunca vuelve a contarle su casa a la app.

## Critical user stories

### 1. Abrir un ciclo con cualquier foto

As Valeria, quiero arrancar el ciclo sacando fotos de lo que sea (heladera, alacena, compra, ticket), so that nunca tenga que contarle a la app lo que hay en mi casa.

Acceptance criteria:
- [ ] Un ciclo se inicia con una sola foto y admite sumar más fotos antes de generar la propuesta; todas alimentan la misma lista.
- [ ] No existe selección de "tipo de foto": heladera, freezer, alacena, compra en mesada y ticket pasan por el mismo flujo.
- [ ] El horizonte del ciclo se toma del perfil (si está declarado) y puede pisarse al momento de la foto en un solo gesto.
- [ ] El modo del ciclo («con lo que tengo» / «con compra adicional») se toma del perfil, se muestra con su valor vigente al momento de la foto y se pisa en un solo gesto — mismo patrón que el horizonte.
- [ ] Edge: una foto sin alimentos reconocibles devuelve una lista vacía con un mensaje claro — nunca un error técnico ni ítems inventados.

Traces to: idea (decisiones 2 y 6) · insight 1 de E01–E07 (el registro que sobrevive no exige nada) · E04 (foto como techo de captura).

### 2. Lista de solo alimentos con cantidades y triage por confianza

As Valeria, quiero que la app me devuelva solo alimentos, con cantidades estimadas y separados por certeza, so that solo tenga que mirar lo dudoso.

Acceptance criteria:
- [ ] La lista contiene solo alimentos; los no comestibles detectados en la foto no aparecen.
- [ ] Cada ítem muestra cantidad estimada y cae en exactamente uno de tres grupos: confirmados / a revisar / a confirmar.
- [ ] Los ítems confirmados no piden ninguna acción; son editables pero la edición no es un paso explícito.
- [ ] Desde "a confirmar" se agrega un ítem dudoso con un solo gesto.
- [ ] Desde el repaso se agrega una **sobra** a mano ("guiso, 2 porciones") en un solo gesto — la foto no ve adentro del tupper; el gesto sí. Es opcional: no agregarla no genera deuda ni aviso.
- [ ] Edge: un envase opaco (tupper, bolsa) aparece como "a confirmar" genérico — nunca adivinado como confirmado.

Traces to: idea (decisiones 6 y 7) · insight 5 de E01–E07 (el tupper es el punto ciego: "no sé si es salsa o si es sopa") · patrón salmón de E04 (un error confiado rompe la credibilidad de todo).

### 3. Un repaso único, corto y sin deuda

As Valeria, quiero repasar y corregir la lista una sola vez, so that la propuesta salga de datos que yo validé sin que un error la envenene.

Acceptance criteria:
- [ ] El repaso completo (corregir nombres y cantidades, agregar, sacar) ocurre en un solo flujo, sin navegación entre pantallas por ítem.
- [ ] Corregir la cantidad o el nombre de un ítem toma ≤2 gestos.
- [ ] La lista se puede aceptar tal cual con un solo gesto: el triage nunca bloquea la propuesta exigiendo completar los "a confirmar".
- [ ] El tiempo foto→propuesta se mide y registra por ciclo (es la métrica que valida o mata el triage-first).
- [ ] Edge: si Valeria abandona a mitad del triage, el ciclo queda retomable sin pérdida — y ese abandono se registra.

Traces to: idea (decisión 4, ⚠️ contra la recomendación de evidencia — fricción antes del valor, sostenida porque ocurre una vez por ciclo en el pico de motivación: la revisada del viernes de E03) · insight 1 (nada de deuda ni completitud exigida).

### 4. La propuesta de comidas del período

As Valeria, quiero recibir las cenas que puedo hacer con lo que tengo para mi horizonte, so that la decisión diaria del período quede resuelta.

Acceptance criteria:
- [ ] Confirmado el triage, se genera la propuesta para el horizonte del ciclo — el flujo termina ahí, no en el inventario.
- [ ] El alcance de la propuesta es la **cena** (una comida por día del horizonte); almuerzos y loncheras no aparecen ni se prometen.
- [ ] Si el triage registró sobras, la propuesta las ofrece primero — antes que cocinar de cero (sobras antes que recetas).
- [ ] Cada comida propuesta es cocinable con los ítems de la lista confirmada; si pide algo que no está, lo marca explícitamente como faltante.
- [ ] La propuesta respeta las restricciones y gustos guardados en la memoria del hogar.
- [ ] Cuando existe historial, la propuesta arranca del repertorio del hogar — no de un recetario ajeno.
- [ ] Edge: si lo confirmado no alcanza para el horizonte, la propuesta lo dice ("con esto llegás hasta el miércoles") en vez de estirar con comidas no cocinables.

Traces to: idea (decisión 3: nadie quiere un inventario, quieren la cena resuelta) · insight 3 (repertorio propio, no recetas nuevas) · insight 5 (sobras antes que recetas, 5/7 hogares) · insight 2 (credibilidad local como requisito).

### 5. Cada ciclo empieza limpio; el hogar se recuerda

As Valeria, quiero que cada ciclo arranque de cero con fotos nuevas pero que la app ya conozca mi hogar, so that no exista deuda acumulada ni tenga que re-explicar mi casa.

Acceptance criteria:
- [ ] Al abrir un ciclo nuevo, el inventario del anterior no se arrastra ni se muestra como "desactualizado" o "pendiente".
- [ ] No existe ningún estado visible de atraso o deuda en ninguna pantalla, en ningún momento del ciclo.
- [ ] Restricciones, gustos, historial de propuestas/cocinado y repertorio aprendido persisten entre ciclos.
- [ ] Edge: el segundo ciclo no pide re-ingresar ningún dato del hogar — solo fotos.

Traces to: idea (decisiones 1 y 5) · insight 1 ("la nota se borra y queda en blanco; el Excel te acumulaba la culpa") · insight 2 (el re-contexto mató a ChatGPT).

### 6. La lista de compras que completa el plan

As Valeria, quiero que junto con las comidas llegue la lista de lo que falta comprar para lograrlas, so that el plan sea realizable sin que yo tenga que deducir los gaps.

Acceptance criteria:
- [ ] La propuesta incluye una lista de compras con exactamente lo que el plan necesita y la foto no encontró — ni catálogo ni sugerencias de más.
- [ ] En el modo por defecto («con lo que tengo»), el plan se arma primero desde lo encontrado y la lista solo completa el horizonte o destraba platos casi-cocinables.
- [ ] En el modo «con compra adicional», la lista se amplía a lo que el mejor plan del período necesite. El modo se configura en el perfil o se pisa por ciclo al momento de la foto (historia 1); sin configurar nada, rige «con lo que tengo».
- [ ] La lista es simple: sin partición por canal y sin tope de gasto (ambos son evolución, no esta versión).
- [ ] Entregada la lista, la app se desentiende: no hay check-off obligatorio, ni estado "esperando compra", ni el plan se marca como desactualizado si la compra difiere.
- [ ] El plan y la lista se comparten a WhatsApp con un solo toque, como texto plano legible sin abrir la app — la lista tiene que poder vivir en el canal donde ya vive la logística del hogar.
- [ ] Edge: si lo encontrado alcanza para todo el horizonte, la propuesta llega sin lista — no se inventan compras.

Traces to: paso 5 del journey to-be [VALIDADO] (82% ya arma la lista de gaps, Q9; 84% multi-canal, Q8) · insight 1 (sin deuda: la nota se borra al volver del mercado) · decisiones de la sesión `/clarify-idea` 2026-07-30 (abajo).

## Hipótesis

Creemos que **Valeria (la decisora familiar sobrecargada)** va a **abrir cada ciclo de planificación con fotos y completar el triage hasta llegar a la propuesta (cenas del período + lista de compras)** porque **la foto elimina el "contarle todo" que mató a ChatGPT y a las apps de la categoría, y el repaso ocurre una sola vez por ciclo, en su momento de máxima motivación**.

Nos equivocamos si:
- el tiempo mediano foto→propuesta supera los **5 minutos**, o
- más del **30%** de los ciclos iniciados se abandonan en el triage sin llegar a la propuesta, o
- quienes completaron un primer ciclo no vuelven a abrir un segundo dentro de su horizonte declarado.

*(Los umbrales de 5 min y 30% son propuestos, no derivados de evidencia — ajustar con el primer dato real.)*

## Decisión de modelo que este spec fija

**Inventario efímero por ciclo, no inventario vivo.** El paso 2 del journey to-be describía un inventario persistente alimentado por compras y cocinado; este spec apuesta lo contrario: el inventario nace de la foto en cada ciclo y muere con él. Efecto lateral buscado: elimina por diseño la divergencia silenciosa (riesgo residual #1 del MFC — "una app que miente no sirve para nada", E04). El inventario vivo queda como evolución posible, no como plan. **Pendiente al validar: actualizar el paso 2 del journey to-be.**

## Decisiones de la ampliación (sesión `/clarify-idea` 2026-07-30)

1. **La propuesta incluye la lista de compras de los gaps.** El plan sin la lista deja el horizonte incompleto; la lista es lo que hace realizable el plan.
2. **La orientación del plan es configuración del perfil del hogar, adelantada a esta versión:** modo «con lo que tengo» vs. «con compra adicional». El input replica el patrón del horizonte (decisión 2 de la idea): default en el perfil, visible y pisable por ciclo al momento de la foto.
3. **Default: «con lo que tengo».** El motor de cambio sostenible del corpus es económico (paso 1 del journey matizado), la frase fundacional es "qué cocinar con lo que tengo" (E04), y el default es el producto para la mayoría — nadie configura. «Con compra adicional» queda como opt-in para el borde que pide novedad (Rocío/Marisol).
4. **Entrega y se desentiende.** Sin check-off, sin estado "esperando compra", sin ajuste post-entrega — cero deuda (insight 1). La re-foto de la compra queda como posibilidad natural del pipeline, fuera de esta feature.
5. **Lista simple, sin canales ni tope de gasto.** La lista de gaps es corta por naturaleza y el artefacto que sobrevive es el chorizo (WhatsApp de E04, 8 años); el dolor del split aparece cuando otro lee la lista (paso 4, otra feature). Canales y tope: evolución — el tope, junto al presupuesto como dimensión de la sugerencia (alcance pendiente del journey).

## Assumptions

Rankeados por letalidad (del archivo de idea):

1. **Precisión del LLM sobre fotos reales** (ítems + cantidades + filtro de alimentos): si "a revisar" y "a confirmar" se llenan, el triage se convierte en "la hora escaneando códigos" que mató a la app de E04. Testeable sin construir: prototipo con 20–30 fotos reales midiendo distribución de confianza y tasa de error.
2. **Que el triage se complete y sea corto:** el kickoff muere si el repaso se alarga o abandona. Cubierto por la métrica foto→propuesta (historia 3).
3. **Que las sobras se agreguen a mano:** la foto no ve adentro de un envase; la mitigación es el gesto manual en el triage (revisión post-crítica). Queda asumido que Valeria efectivamente lo usa — si no lo usa, el punto ciego #1 del corpus (5/7 hogares) sigue abierto y la propuesta hace re-cocinar lo ya cocinado.
4. **Pudor y logística de la foto:** heladera desordenada, mala luz, apuro. Solo E04 lo hace hoy de forma sostenida; el resto del corpus nunca lo hizo.
5. **Tickets LatAm:** nombres crípticos de productos — calidad de extracción desconocida.
6. **El pico de motivación existe en todos los hogares:** la "revisada del viernes" está documentada en E03 y E04; asumimos que el resto del segmento tiene un momento equivalente por ciclo.
7. **La lista de gaps convive con la lista madre del hogar:** asumimos que complementa (y no compite con) la nota/WhatsApp donde el hogar ya anota lo que se acaba — si el hogar termina manteniendo dos listas, reaparece el patrón que mató a Bring ("yo escribía en la app, él en el WhatsApp; dos listas y ninguna servía", E01). Mitigación post-crítica: el share a WhatsApp con un toque (historia 6) lleva la lista al canal madre en vez de competirle.
8. **El modo «con compra adicional» tiene demanda real:** nadie del corpus lo pidió; solo lo insinúa el borde de hijos adultos que piden novedad (E03). Riesgo bajo por ser opt-in.

## Revisión 2026-07-30 — panel de crítica (Valeria, 4/5)

Fuente: `product/insights/2026-07-30-1249-critique-kickoff-por-foto.md`. Cambios aplicados:

1. **Sobras manuales en el triage** (historias 2 y 4, journey pasos 4–5): un gesto para agregar "guiso, 2 porciones" durante el repaso, y la propuesta las ofrece antes que cocinar de cero. Ataca el punto ciego #1 del corpus sin romper el modelo efímero; la assumption 3 pasó de "limitación aceptada" a "mitigada, pendiente de uso real".
2. **Alcance de comidas declarado: la cena como cuña del MVP** (historia 4, journey paso 5, hipótesis). Almuerzos y loncheras (dolor documentado E01/E06, sin dueño) quedan como evolución explícita — resuelve el pendiente que el journey arrastraba desde su revisión del 2026-07-29.
3. **Share a WhatsApp con un toque** (historia 6): plan + lista como texto plano hacia el canal donde ya vive la logística del hogar; mitiga la assumption 7 (dos listas = muerte tipo Bring).

**No tomado — tensión abierta:** plan-calendario vs. plan-canasta. La crítica argumenta que el plan asignado a días diverge a mitad de ciclo (el martes malo de E04) igual que divergía el inventario; el overview promete "claridad sobre qué se come cada día". Queda sin decidir en esta revisión — candidata a resolverse con el primer dato real de uso (¿la gente sigue el orden propuesto?).
