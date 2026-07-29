# Crítica de persona: Journey TO-BE "El ciclo con QueComemos" — Andrés

- **Documento:** `product/journeys/2026-07-28-1236-journey-to-be-ciclo-quecomemos.md`
- **Panel:** Andrés Cabrera (persona secundaria — pareja sin hijos que co-decide, creada el 2026-07-28 desde la evidencia de la encuesta)
- **source:** persona-critique (sintética — feedback de dirección, no evidencia de usuario real)
- **Crítica previa del mismo documento:** Valeria 4/5 (`2026-07-28-1250-critique-journey-to-be-ciclo-quecomemos.md`)
- **Fecha:** 2026-07-28

---

### Andrés Cabrera — Analista de datos, co-decide las comidas con su esposa

**Overall rating:** 3.5/5

**Strengths:** (lo que sí me sirve)

- El paso 3 ataca nuestro problema de las 5 de la tarde. Si a esa hora en vez del chat de "¿esta noche qué?" — "¿qué hay?" — "no sé, mira tú" nos llegara una respuesta ya pensada con lo que hay en la nevera, se acaba la mitad de nuestras discusiones.
- La memoria permanente de restricciones es exactamente lo que ChatGPT no tenía. Yo le expliqué tres veces que Camila es vegetariana y yo no, y a la cuarta conversación había que empezar de cero. Si esta app lo sabe para siempre, ya me ganó donde la otra me perdió.
- La lista por canal es mi casa retratada: supermercado quincenal + fruver del barrio. Hoy "qué se compra dónde" vive en la cabeza de cada uno y por eso compramos doble o falta algo. Que se arme sola y separada, sí.
- El paso 6 respeta cómo compramos de verdad — la grande quincenal y la reposición de frescos. No nos pide cambiar el patrón.
- Que el sistema aprenda y rote (paso 7) le pega a nuestro aburrimiento: los mismos 6 platos hace meses no es un problema de salud, es que cocinar juntos se volvió trámite. Variedad sin esfuerzo nos devolvería algo que perdimos.

**Concerns:** (lo que me deja por fuera)

- El journey está escrito para otra casa. El actor es "quien decide las comidas del hogar" — singular — y el paso 4 se llama "la familia ve el plan y opina". En mi casa no hay un decisor y espectadores: somos dos dueños del problema. Si la app se instala en el teléfono de uno y el otro "opina", acabamos de recrear nuestro bug: cada uno asumiendo que el otro es el que piensa.
- ¿A quién le llega la sugerencia del paso 3? Si me llega solo a mí, me convierto en el gerente de la cena con una herramienta mejor — pero sigo siendo el gerente. La gracia sería que nos llegue a los dos y decidir sea un toque: uno propone, el otro acepta. Eso el documento no lo dice.
- "Dos dietas" no puede significar "cocinen dos veces". Si la sugerencia resuelve lo vegetariano con un plato aparte para Camila, no resolvió nada — hoy ya sabemos hacer eso y por eso repetimos los 6 platos que sirven para ambos. Necesito un plato con variante, no dos platos.
- El paso 2 con dos personas tiene un problema de sincronía que con una no existe: yo hago la foto de la nevera el domingo, Camila compra el miércoles, ¿y ahora qué sabe la app? Si el estado no se actualiza con lo que CUALQUIERA de los dos hace, las sugerencias del jueves salen de una nevera que ya no existe.
- El paso 7, ¿quién marca? Va a pasar lo mismo que con nuestra nota compartida del plan semanal: los dos creímos que el otro la actualizaba y murió el miércoles. Si marcar es una tarea asignada a "alguien", en una pareja es una tarea asignada a nadie.
- Menor, pero lo digo: el paso 1 habla de "objetivo de alimentación" como si todos quisiéramos comer más sano. Nuestro objetivo es otro — variedad y dejar de gastar en domicilios por cansancio. Si el onboarding me obliga a elegir un objetivo de salud, le estoy mintiendo a la app desde el día uno.

**Suggestions:** (mejoras concretas)

- Cuenta de hogar con dos dueños simétricos, no un administrador y visitantes. Todo lo que uno hace (foto, compra, marcar, vetar) le queda visible al otro al instante — nuestra herramienta real hoy es WhatsApp justamente porque los dos lo vemos.
- Flujo de decisión de pareja en el paso 3/4: la sugerencia llega a ambos, uno propone con un toque, el otro acepta o contrapropone de las mismas opciones. Máximo dos toques en total; si hay que chatear sobre la app, perdió contra WhatsApp.
- Sugerencias "un plato, dos versiones": misma base, variante vegetariana y omnívora del mismo esfuerzo de cocina.
- El paso 2 alimentado por los dos y por la lista: lo que se compró (que la app ya sabe, porque la lista es suya) entra solo al inventario. Que la foto sea corrección, no fuente única.
- Paso 7 sin dueño: lo marca quien cocinó ese día con un toque, o la app lo infiere de que el plan propuesto fue aceptado y pregunta al día siguiente si algo cambió.
- En el paso 1, que "el objetivo" admita objetivos que no son de salud: variedad, presupuesto, menos domicilios. El nuestro es "volver a comer distinto sin pensarlo tanto".

En resumen: los pasos 3, 5 y 6 son mi casa; el problema es que el journey los cuelga de una estructura de hogar que no es la mía. Tal como está escrito, esta app se la instalaría uno de los dos — y ese es precisamente el problema que tenemos.

---

## Síntesis del researcher (fuera de personaje) — panel acumulado Valeria + Andrés

**Acuerdos (señal fuerte):**
1. **El paso 3 es el motor y "con lo que hay" + memoria permanente de restricciones es la diferencia con ChatGPT** — ambos lo nombran como el punto donde la IA genérica los perdió (re-explicar todo cada vez, ingredientes que no tienen). Refuerza que C2 es la pregunta de entrevista correcta.
2. **El paso 7 es el punto de muerte anunciada** — Valeria por costo diario ("las cosas que se rompen cuando les fallo, las abandono"), Andrés por difusión de responsabilidad ("una tarea asignada a 'alguien' es una tarea asignada a nadie"). Convergen en la misma spec: marcar debe ser opcional, perdonador o inferido — nunca requisito de funcionamiento.
3. **El paso 2 no puede ser fuente única manual** — Valeria exige "foto y listo"; Andrés propone que la lista de compras alimente el inventario sola. Juntos apuntan a lo mismo: el relevamiento se deriva de lo que el sistema ya sabe, la captura manual es corrección.

**Conflictos (tensiones de diseño a decidir):**
1. **La forma del hogar en el paso 4:** Valeria quiere jerarquía (ella aprueba, los demás eligen entre 2–3 opciones acotadas — "participación sí, asamblea no"); Andrés quiere simetría total (dos dueños, propuesta/aceptación). No es un detalle de UI: son dos modelos de cuenta distintos. El producto necesita soportar ambos o elegir su hogar primario de verdad.
2. **El objetivo del paso 1:** para Valeria es salud (creencia 2); para Andrés es variedad/presupuesto y declararle salud a la app sería "mentirle desde el día uno". El "objetivo del hogar" debe ser plural o la creencia 2 es solo del segmento familiar — dato clave para el Bloque D de entrevistas: preguntar el objetivo sin asumir que es salud.

**Cambios de mayor impacto sugeridos por el panel:**
1. Reescribir el paso 4 como dos mecanismos separados con dos configuraciones de hogar (decisor con comensales / co-dueños simétricos) — y el paso 3 heredando a quién y cómo llega la sugerencia.
2. Especificar el modo de falla del paso 7 (perdonador, inferencia por defecto) como requisito del supuesto crítico, no como detalle.
3. Derivar el paso 2 de la lista/compra (automático) con captura manual como corrección + declarar la ventana horaria de la sugerencia del paso 3.

**Siguiente paso natural:** aplicar estos cambios al journey to-be y recién entonces correr a Tomás (probará el extremo de automatización total) — o llevar las dos tensiones de diseño como probes a las entrevistas antes de tocar el journey.
