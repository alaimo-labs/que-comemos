# Crítica de persona — Spec "Kickoff por foto" (+ lista de compras)

- **Documento:** `product/specs/2026-07-30-1209-kickoff-por-foto.md` (versión con lista de compras y modo «con lo que tengo»/«con compra adicional»)
- **Panel:** Valeria Domínguez (persona primaria, derivada de E01/E04/E06) — panel de 1 a pedido del usuario
- **source:** synthetic (crítica en personaje sobre persona derivada de evidencia real)
- **Fecha:** 2026-07-30

---

### Valeria Domínguez — decisora familiar sobrecargada (contadora, hogar de 4)

**Overall rating:** 4/5

**Strengths:** (lo que me sirve de verdad)

- **La foto en vez de contarle todo.** Esto es exactamente donde me perdieron todos. Con ChatGPT terminaba escribiendo más de lo que me ahorraba, y la app de despensa que me recomendaron me tuvo una hora escaneando códigos un domingo. Sacar una foto ya lo hago — le mando la foto de la heladera a mi marido antes de ir al súper. Si eso alcanza para arrancar, arranco.
- **Que cada ciclo empiece limpio.** El Excel nunca empezaba limpio, el Excel te acumulaba la culpa. Que la app no me muestre nunca "atrasado" o "pendiente" es la única forma de que yo vuelva después de una semana mala — y semanas malas hay siempre: un cierre de mes y no cargué nada, y si la app me lo reprocha, la borro.
- **Que me proponga MIS platos.** Yo sé hacer como cuarenta cosas y cocino ocho, porque a las seis y media no se me ocurre pastel de papa, se me ocurre arroz con pollo. Si me recuerda lo que ya sé hacer con lo que ya tengo, eso es la mitad de mi problema resuelto. Y que no me venga con recetas de kale y salmón, que acá no existen.
- **La lista de compras de lo que falta, y que después no me controle.** Yo ya reviso qué hay y anoto lo que falta — si la app lo deduce del plan, me saca un paso. Y que "entregue y se desentienda" es clave: si el miércoles compré otra cosa porque estaba en oferta, no quiero que la app me lo marque en rojo.
- **El default «con lo que tengo» está bien elegido.** Nosotros arrancamos todo esto por la plata de los deliveries, no por ganas de cocinar distinto. Comprar de más para un "plan ideal" es exactamente lo que no necesito.

**Concerns:** (lo que me preocupa)

- **Mi freezer es invisible para esta app — y ahí está mi plata enterrada.** La foto no ve adentro de un tupper, ya lo sé. Pero el spec dice que las sobras "quedan afuera" y para mí eso no es un detalle: lo que compro se usa, lo que cocino de más se pierde. Si el viernes tengo tres tuppers en el freezer y la app me planifica la semana como si no existieran, me está haciendo cocinar de nuevo lo que ya cociné — y me va a hacer tirar otro domingo entero a la basura.
- **El plan por día se me rompe el martes.** El período entero pre-resuelto suena hermoso el viernes a la noche. Pero el martes llego tarde del trabajo, el miércoles mi hijo está insoportable y necesito algo en veinte minutos. Si el plan dice qué se come cada día, para el jueves el plan ya "miente" — y ustedes mismos dicen que una app que miente no sirve para nada. El inventario no diverge más, bárbaro: ahora diverge el plan.
- **¿Esto es la cena, o también las viandas?** El spec no lo dice. Mi peor momento no es la cena: son las loncheras a las seis y media de la mañana, sin nadie despierto que ayude. Si "las comidas del período" es solo la cena, díganmelo — me sirve igual, pero no me lo vendan como "la decisión resuelta", porque la mitad de mis decisiones son antes de las siete de la mañana.
- **La lista nueva contra la lista de siempre.** Nosotros ya tenemos la nota donde anotamos lo que se acaba. Ahora voy a tener esa nota Y la lista de la app. Ya me pasó con Bring: yo escribía en la app, él escribía en el WhatsApp, dos listas y ninguna servía. Si la lista de la app no termina en mi WhatsApp, se muere una de las dos — y no va a ser el WhatsApp.
- **Cinco minutos de repaso el viernes a la noche, con suerte.** Yo el viernes a la noche estoy fundida. Si el repaso es corregir dos cantidades y listo, va. Si la lista viene llena de "a revisar" y tengo que tocar veinte ítems con el nene colgado del brazo, la segunda semana no lo hago — y ustedes ya saben cómo sigue esa historia.

**Suggestions:** (mejoras concretas)

- **Déjenme decirle "tengo tres tuppers" a mano en el repaso.** No pido que la foto adivine qué hay adentro. Pido un gesto para agregar "guiso, 2 porciones" mientras reviso la lista — ya estoy ahí corrigiendo, es el momento. Y que la propuesta los use primero, antes de hacerme cocinar de cero.
- **Denme las comidas del período como changuito, no como agenda.** "Estas seis comidas salen con lo que tenés" y yo las acomodo según el día que tuve. Si me asignan platos a días, el primer martes malo el plan queda viejo. Ya que estamos: márquenme cuáles salen en veinte minutos, así el martes malo sé cuál agarrar.
- **Que el plan y la lista se puedan mandar al WhatsApp con un toque.** Ahí vive todo lo de esta casa hace años; ahí la ve mi marido sin que yo le explique nada. Si la lista queda presa en la app, la app pierde contra la nota.
- **Díganme qué comidas cubre.** Aunque sea "por ahora, la cena". Prefiero un alcance chico y claro que descubrir el lunes a las 6:30 que las viandas siguen siendo problema mío.

Miren: la foto y el "empezar limpio" son la primera vez que veo algo pensado para gente como yo y no para la que tiene todo en un Notion. Pero el freezer es donde me duele la plata en serio — si la app lo ignora, me resuelve la mitad fácil del problema.

---

## Síntesis (como investigador, fuera de personaje)

Panel de una sola persona — sin conflictos entre personas que reportar; las señales se leen contra la evidencia del corpus.

**Señales más fuertes (respaldadas por evidencia real, no solo por el roleplay):**

1. **Las sobras no pueden ser una limitación silenciosa.** La crítica coincide con el punto ciego #1 del corpus (5/7 hogares; "boté un domingo entero", E04). El spec ya lo asume como limitación (assumption 3), pero Valeria muestra el costo concreto: la propuesta hace re-cocinar lo que ya está cocinado — un error de credibilidad tipo "salmón" en el corazón del valor. **Mitigación barata que no rompe el modelo efímero:** entrada manual de sobras dentro del triage (un gesto, "guiso, 2 porciones") + la propuesta las prioriza. Convierte la limitación en decisión de diseño.
2. **Plan-calendario vs. plan-canasta es una decisión no tomada que el spec esconde.** El spec mató la divergencia silenciosa del inventario, pero un plan asignado a días diverge a mitad de ciclo por vida real (el martes tarde de E04 mató las recetas nuevas). La canasta de platos ("estas comidas salen con lo que tenés, acomodalas vos") + marcar los platos ≤20 min es más coherente con el principio sin-deuda del propio spec. Hay que decidirlo y escribirlo.
3. **El alcance de comidas sigue sin decidirse** — ya estaba como pendiente del journey ("cena como cuña vs. ciclo completo") y el spec no lo resolvió. Las loncheras 6:30 son el dolor sin dueño de E01/E06. Mínimo: declarar el alcance en el spec; la hipótesis se mide distinto si "propuesta del período" incluye 3 comidas diarias.
4. **Salida a WhatsApp** — refuerza la assumption 7 (dos listas = muerte tipo Bring) con una mitigación concreta: exportar plan + lista al canal donde ya vive la logística del hogar. Barato y alineado con "WhatsApp como sistema operativo del hogar" (persona).

**Los 2–3 cambios de mayor impacto:**

1. Agregar sobras manuales al triage (historia 2 o 3) y que la propuesta las use primero — ataca el punto ciego #1 sin inventario vivo.
2. Decidir y especificar la forma del plan: canasta de platos con marca de "rápido (≤20 min)" en vez de calendario por día — o justificar lo contrario.
3. Declarar el alcance de comidas del MVP (¿solo cena?) en el spec y en la hipótesis.

**Nota de método:** crítica sintética sobre persona derivada — útil para encontrar huecos, no reemplaza validación real. Los cambios 1 y 2 tocan decisiones del spec; el 3 es una omisión. Ninguno invalida la hipótesis central del kickoff por foto.
