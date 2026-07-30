# Crítica de persona (ronda 2) — Spec "Kickoff por foto" revisado

- **Documento:** `product/specs/2026-07-30-1209-kickoff-por-foto.md` (versión post-revisión: sobras en triage, cena como cuña, share a WhatsApp)
- **Panel:** Valeria Domínguez (persona primaria) — panel de 1 a pedido del usuario
- **Ronda anterior:** `product/insights/2026-07-30-1249-critique-kickoff-por-foto.md` (4/5)
- **source:** synthetic (crítica en personaje sobre persona derivada de evidencia real)
- **Fecha:** 2026-07-30

---

### Valeria Domínguez — decisora familiar sobrecargada (contadora, hogar de 4)

**Overall rating:** 4.5/5

**Strengths:** (lo que mejoró desde la última vez)

- **Me escucharon con los tuppers.** Poder agregar "guiso, 2 porciones" mientras ya estoy repasando la lista — sin pantalla aparte, sin obligación — es exactamente lo que pedí. Y que la propuesta me ofrezca primero las sobras antes de hacerme cocinar de cero… eso es plata y domingos que no tiro. Para mí este era el agujero grande, y lo taparon bien.
- **Ahora sé qué me están vendiendo.** "La cena, una por día; almuerzos y viandas no aparecen ni se prometen." Perfecto. Prefiero mil veces esto que descubrirlo el lunes a las 6:30. Las viandas siguen siendo mi problema, pero al menos nadie me dice que "la decisión está resuelta" cuando resuelve la mitad.
- **La lista termina en mi WhatsApp.** Un toque y está en el grupo de la casa, donde mi marido la ve sin que yo le explique nada. Ahí la app deja de competir con mi nota y empieza a alimentarla. Eso era matar o morir, y lo resolvieron para el lado correcto.
- Todo lo que ya me gustaba sigue: la foto en vez de contarle todo, el empezar limpio, mis platos y no recetas de kale.

**Concerns:** (lo que me queda)

- **¿Le tengo que sacar foto a la alacena TODAS las semanas?** Esto lo vi recién ahora, pensando en la semana dos. Mi heladera cambia todos los días, pero la alacena es siempre la misma: arroz, fideos, aceite, lentejas, atún. Si cada ciclo empieza de cero y yo un viernes solo le saco foto a la heladera porque estoy cansada, ¿la app se olvida de que existe el arroz? ¿Me propone cenas sin fideos porque no fotografié el estante? Sacarle foto todas las semanas al mismo estante que no cambió me va a empezar a dar pereza — y ustedes ya saben qué pasa cuando algo me da pereza.
- **El plan por día sigue ahí, y el martes malo también.** Ya lo dije la vez pasada: si me asignan platos a días, el primer martes que llego tarde el plan queda viejo. Veo que lo anotaron como "tensión abierta" — bueno, sigue abierta y yo sigo teniendo martes.
- **El gesto de la sobra depende de mí, un viernes a la noche.** Lo van a medir, bien. Solo digo: si agregar el guiso me toma más de dos toques, no lo voy a hacer, y volvemos al cementerio de tuppers.

**Suggestions:** (mejoras concretas)

- **Una despensa base que se declare una vez.** Las cinco cosas que en mi casa siempre hay — arroz, fideos, aceite, sal, atún — decírselas una sola vez (o que las aprenda de las primeras fotos) y que las dé por existentes en cada ciclo, sin foto. No es inventario: es como decirle "en esta casa nunca falta arroz". Si un día falta, lo saco en el repaso, un toque.
- Lo del plan-canasta lo sostengo: denme las cenas y déjenme acomodarlas, con los platos de 20 minutos marcados.

La verdad, entre la primera versión y esta hay una diferencia grande: antes era una buena idea para el viernes; ahora es una buena idea para toda la semana. Lo único que me frena de ponerle 5 es que la semana dos —la foto repetida de la alacena y el martes que rompe el calendario— todavía no está pensada, y en mi casa todo se muere en la semana dos.

---

## Síntesis (como investigador, fuera de personaje)

**Lo que la revisión resolvió (confirmado en esta ronda):** las tres mitigaciones de la ronda 1 (sobras en triage, alcance declarado, share a WhatsApp) fueron aceptadas sin reservas nuevas. La nota subió de 4 a 4.5.

**Hallazgo nuevo — y es estructural: el costo de re-captura de lo estático.** El modelo efímero puro obliga a re-fotografiar cada ciclo también lo que no cambia (la alacena de básicos). Consecuencias si no se resuelve: (a) fatiga del gesto en la semana 2–4 — exactamente la ventana donde murió todo en el corpus; o (b) cobertura parcial → la propuesta ignora básicos existentes → cenas "sin fideos" → error de credibilidad tipo salmón. La sugerencia de Valeria (despensa base declarada una vez o aprendida de las primeras fotos, presente por default en cada ciclo, removible con un toque en el repaso) es coherente con el modelo: los básicos son, por definición, lo que siempre se repone — el riesgo de divergencia silenciosa es mínimo y el repaso ya existe como punto de corrección. Nota: es una excepción acotada al principio "cada ciclo nace solo de la foto" — hay que decidirla explícitamente, no dejarla entrar por la ventana.

**Tensión que sigue abierta (segunda ronda que aparece):** plan-calendario vs. plan-canasta. Ya documentada en el spec; Valeria la volvió a levantar sin argumentos nuevos. Se sostiene la decisión de resolverla con dato real de uso.

**Los 2 cambios de mayor impacto:**

1. **Decidir la "despensa base"** (declarada una vez o aprendida; presente por default; removible en el repaso) — ataca la fatiga de re-captura antes de que exista y protege la credibilidad de la propuesta con cobertura parcial de fotos.
2. **Blindar el gesto de sobra a ≤2 toques** — ya implícito en la historia 3 para correcciones; hacerlo explícito también para el alta de sobras, porque es el gesto del que depende la assumption 3.

**Nota de método:** segunda ronda con la misma persona sintética — rendimiento decreciente esperable; el hallazgo de la despensa base es genuinamente nuevo pero conviene validarlo contra usuarios reales (¿cuántos hogares tienen "básicos que nunca faltan"?). No amerita tercera ronda con Valeria; si se quiere más señal, cambiar de persona (Tomás para viabilidad técnica del pipeline, o Andrés para el borde no-familiar).
