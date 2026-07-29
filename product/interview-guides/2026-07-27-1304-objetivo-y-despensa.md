# Interview guide: El objetivo, la despensa y las herramientas que no retuvieron — creencias 2 y 3 + por qués de la encuesta

- **Learning goals:**
  1. **¿Un objetivo concreto del hogar — del tipo que sea: salud, variedad, gasto, coordinación — motiva y sostiene un cambio de hábito?** (creencia 2 del overview — la más crítica y sin cobertura en la encuesta). *Decisión:* si el "objetivo semanal" es el corazón del producto o un feature decorativo — y de qué tipo es el objetivo real de cada segmento (el panel de crítica mostró que asumir salud deja afuera a la pareja sin hijos: "si me obliga a elegir un objetivo de salud, le miento a la app desde el día uno").
  2. **¿El gesto de partir de lo que ya hay existe hoy, y duele cuando falla?** (creencia 3, mitad demanda). *Decisión:* si "relevá lo que tenés" es un hábito a potenciar o uno a crear de cero.
  3. **¿Qué tan sostenible es para esta persona mantener un registro vivo de lo que hay en casa?** (creencia 3, mitad hábito — donde murieron KitchenPal y Nooddle). *Decisión:* cuánta automatización necesita el relevamiento para ser viable (la vara de Valeria: "si me suma trabajo, no la abro más").
  4. **¿Qué "variedad" buscan cuando quieren cortar la repetición, y por qué ChatGPT y las apps no lograron dársela de forma sostenida?** (por qués abiertos del análisis de encuesta `product/insights/2026-07-28-1213-encuesta-planificacion-hogares-latam.md`: 56% probó IA para menús y el 58% de ellos abandonó; 88% de churn en apps de la categoría; "variedad/no repetir" fue el tema #1 de la abierta). *Decisión:* qué tiene que hacer distinto QueComemos para retener donde la IA genérica y las apps murieron — y si "variedad" significa recetas nuevas o rotar mejor el repertorio conocido.
- **Participant profile:** persona que decide la mayoría de las comidas de un hogar con hijos en edad escolar o universitaria (perfil Valeria). Reclutar en los mismos grupos que la encuesta o entre respondentes de Q10 que dejen contacto. **Priorizar respondentes que en Q5 marcaron "lo probé alguna vez, pero no seguí"** — son el corazón del goal 4. Variante Andrés (pareja sin hijos, decisión compartida — 29% de la muestra) usa esta misma guía; reclutarlo entre quienes probaron y dejaron la IA (41% de ese segmento) y prestar atención a cómo se reparte la decisión entre los dos. La variante Graciela quedó archivada junto con la persona (el segmento no apareció en la encuesta). **Contraste:** reservar 1–2 entrevistas para respondentes que sí planifican multi-día (el 13% de Q1) — misma guía, con la variante del Bloque D. Excluir a quien cocina como hobby y disfruta improvisar (perfil Hernán) — el screening es la pregunta W1.
- **Mode:** exploración
- **Duration:** ~45–55 min según historial del participante — el Bloque C se encoge solo: sin historia de IA ni apps (44% y 82% de la muestra respectivamente) queda en una sola pregunta (~5 min)
- **Idioma:** la guía está en rioplatense; correr cada entrevista en la variante local del participante (tuteo en México/Colombia/Perú, voseo en Argentina/Uruguay).

> Regla para el entrevistador: esta guía es un mapa, no un guion. Seguí la energía del participante; usá las preguntas para chequear que nada esencial quede sin tocar. Nunca menciones la idea del producto — en el momento en que aparece una app que "resolvería esto", el participante empieza a cuidarte y los datos mueren.

## Warm-up (5 min)

W1. Contame quiénes viven en tu casa y cómo se reparten hoy la cocina y las compras.
   - *Confirma el perfil (decide la mayoría de las comidas, hogar con chicos). Si cocinar es su hobby y lo disfruta improvisando, agradecer y cerrar corto — es un Hernán.*

W2. ¿Cómo fue la cena de ayer? ¿Qué comieron y cómo se decidió?
   - Probes: ¿a qué hora se supo qué se comía? ¿quién lo decidió? ¿alguien opinó?
   - *Episodio concreto que relaja y da el contexto del flujo real. No preguntar todavía por planes ni objetivos.*

## Bloque A — Partir de lo que hay (goal 2, ~10 min)

**Creencia que testea:** quieren partir de lo que ya tienen; aprovechar y no desperdiciar pesa más que la lista ideal.
**Qué sonaría a "estábamos equivocados":** nunca revisa lo que hay antes de comprar o cocinar; la lista nace del menú deseado y no de lo que falta; el desperdicio no le duele o ni lo registra.

A1. Llevame a tu última compra grande de alimentos: ¿cómo supiste qué comprar?
   - Probes: ¿revisaste qué había en casa antes? ¿hubo lista — dónde estaba, quién la armó, cuándo? ¿qué compraste que no estaba en la lista? ¿qué te olvidaste?
   - Probe: ¿y las compras chicas de reposición entre compra y compra — cómo se decide qué comprar en esas?
   - Probe: esa lista, ¿fue una sola para todo, o hay una para el súper y otra para la verdulería / el barrio? ¿Cómo sabés qué cosa se compra en qué lugar?
   - *El último probe resuelve el "por qué" multi-canal de la encuesta (84% compra en 2+ canales): ¿la lista real ya vive partida por canal, o es una sola que se parte mentalmente en el momento? La respuesta es la spec de la lista de gaps.*

A2. ¿Cuándo fue la última vez que tiraste comida? ¿Qué era?
   - Probes: ¿cómo llegó a ese estado? ¿te diste cuenta antes o al encontrarla? ¿qué sentiste? ¿pasa seguido?
   - *Escuchar si el episodio trae bronca/culpa espontánea (la creencia respira) o indiferencia (la creencia sufre).*

A3. Contame la última vez que tuviste un ingrediente dando vueltas y no supiste bien qué hacer con él. ¿Qué hiciste?
   - Probes: ¿buscaste ideas en algún lado — dónde? ¿le preguntaste a alguien? ¿lo terminaste usando o se perdió? ¿qué hubiera tenido que pasar para que lo uses?
   - *Apunta al episodio de fricción (la búsqueda creativa que falla) — el default "cocino con lo que hay" no discrimina en este perfil.*

## Bloque B — El registro y su costo (goal 3, ~10 min)

**Creencia que testea:** sostendrían un relevamiento de la despensa si el costo es bajo.
**Qué sonaría a "estábamos equivocados":** todo intento previo de registro doméstico (gastos, listas, planillas, apps) murió en semanas por costo de mantenimiento; ni el papel sobrevive; nadie más del hogar contribuye jamás.

B1. ¿Alguna vez intentaste llevar algún registro de la casa — gastos, una lista compartida, una planilla, una app de lo que sea? Contame el último intento.
   - Probes: ¿qué te llevó a arrancar? ¿cuánto duró? ¿qué lo mató, exactamente — el día que dejaste de cargarlo, qué pasó? ¿alguien más del hogar lo usaba o cargaba? ¿Y algo que sí haya sobrevivido — una lista, una libreta, lo que sea? ¿Por qué ese sí?
   - *Este es el proxy más directo de la mitad que mató a las apps de inventario. Pedir el episodio de abandono con detalle — y si aparece un registro que sobrevive, explotarlo: sus propiedades (efímero, borra, no exige completitud) son la spec del relevamiento viable.*

B2. Sin ir a mirar: ¿me podés decir qué hay ahora mismo en tu freezer?
   - Probes: ¿cómo lo sabés (o por qué no)? ¿quién más de tu casa lo sabría? ¿cuándo fue la última vez que encontraste algo que no sabías que estaba?
   - *Mide el inventario mental real. La distancia entre lo que cree saber y lo que admite no saber es el tamaño del problema — y del trabajo de relevamiento que el producto le pediría.*

## Bloque C — La repetición y las herramientas que no duraron (goal 4, ~5–12 min)

**Creencia que testea:** la repetición duele (77% en la encuesta) y quienes probaron ChatGPT o una app la abandonaron por fricción o resultados genéricos — no porque el problema no importara.
**Qué sonaría a "estábamos equivocados":** abandonaron porque el problema no ameritaba una herramienta ("me olvidé de que existía, no me hacía falta") — señal de que el dolor no sostiene ningún producto; o las respuestas de la IA eran buenas y útiles y aun así no volvieron; o "variedad" resulta ser un deseo declarado sin ningún episodio real de búsqueda detrás.
*Va antes del Bloque D a propósito: es de baja sensibilidad (herramientas, no fracasos personales) y la historia de repetición que cosecha C1 le da contexto a D.*

C1. Contame la última vez que quisiste cortar con "siempre lo mismo" y hacer algo distinto de comer. ¿Qué hiciste?
   - Probes: ¿dónde buscaste ideas — alguien de la familia, Google, Instagram/TikTok, un libro, una IA? ¿encontraste algo? ¿qué terminaron comiendo ese día? ¿cada cuánto te pasa de querer "algo distinto"?
   - Probe (solo si no quedó claro): eso distinto que buscabas, ¿era una receta nueva que nunca hicieron, o algo que ya sabés hacer pero hacía mucho que no aparecía?
   - *Resuelve el "por qué" de variedad: recetas nuevas vs rotar mejor el repertorio conocido. No ofrecer las dos opciones de entrada — dejar que el episodio lo diga; el probe cerrado es solo desempate final.*

C2. ¿Alguna vez le pediste ideas de comidas o un menú a ChatGPT u otra IA? Contame la última vez, paso a paso.
   - Probes: ¿qué le escribiste, más o menos? ¿qué te devolvió? ¿cocinaste algo de eso? ¿qué hiciste con la respuesta — la guardaste, captura de pantalla, nada? ¿al día siguiente / la semana siguiente volviste a usarlo?
   - Si lo dejó: ¿te acordás de la última vez que lo usaste para esto? ¿qué pasó, que no volviste?
   - Si nunca lo usó: ¿qué te frenó? — y seguir de largo, sin insistir.
   - *El "por qué" del 58% de abandono. No sugerir causas ("¿era muy genérico?", "¿daba fiaca escribirle?"): dejar que el episodio muestre si el quiebre fue fricción de uso (re-explicar todo cada vez), calidad del resultado (recetas ajenas a su cocina), desconfianza, o que el problema no ameritaba. Anotar cuál.*

C3. (solo si en B1 o acá apareció una app de comidas, recetas o listas descargada) Esa app — contame el día que la descargaste y el día que la dejaste de abrir.
   - Probes: ¿qué esperabas que hiciera por vos? ¿qué te pedía la app que no le diste? ¿las recetas/comidas eran de las que se comen en tu casa? ¿pagaste o hubieras pagado algo?
   - *El "por qué" del 88% de churn de la categoría. Si B1 ya cosechó este episodio, no re-preguntar desde cero: profundizar con estos probes en el momento. El mecanismo exacto de abandono (carga de datos, rigidez del plan semanal, recetas ajenas) es la spec inversa del producto.*

## Bloque D — El intento de cambiar (goal 1, ~12 min)

**Creencia que testea:** un objetivo concreto es motivo suficiente para dejar la improvisación y sostener un cambio. **El tipo de objetivo es dato, no premisa:** registrar cuál aparece espontáneamente (salud / variedad / gasto / coordinación / otro) — no asumir que es de salud.
**Qué sonaría a "estábamos equivocados":** los cambios nacen de eventos externos (médico, dieta de un hijo) y mueren por la mesa o la logística — nunca por falta o presencia de un plan; o la persona declara aspiraciones pero no recuerda ningún intento real en el último año. **También cuenta:** que los intentos reales nunca sean de salud — la creencia 2 como está escrita sería de un solo segmento.
*Va al final a propósito: toca fracaso y culpa; necesita la confianza construida en A, B y C.*

D1. Contame la última vez que en tu casa intentaron cambiar algo de cómo comen o de cómo resuelven las comidas.
   - Probes: ¿qué quisieron cambiar, exactamente? ¿qué lo disparó? ¿quién lo propuso? ¿qué hicieron distinto la primera semana, concretamente?
   - *No dar ejemplos: la redacción anterior ("menos gaseosa, menos frituras, más verdura") primaba salud y contaminaba el dato del tipo de objetivo. Si el participante se traba y pide ejemplos, ofrecer un abanico mixto en una sola frase: "comer distinto, gastar menos, variar más, pedir menos delivery — lo que sea que hayan intentado".*

D2. ¿Y qué pasó después? ¿Cuánto duró y qué lo cortó?
   - Probes: contame el momento exacto en que se cayó — ¿qué pasó ese día? ¿qué dijeron los demás en la mesa? ¿quién cedió primero? ¿volvieron a intentar?
   - *Acá aparece (o no) el mecanismo Juli: si el quiebre es en la mesa, la creencia 2 necesita que el plan llegue a los comensales, no solo a quien cocina.*

D3. Además de ese intento que me contaste, ¿hay alguna otra cosa de cómo comen en casa que te dé vueltas?
   - Probes: ¿hace cuánto te da vueltas? ¿probaste algo, aunque sea chiquito? si no — ¿qué lo frena?
   - *El gap entre aspiración y acción es la medida honesta de la creencia 2 — pero sin tono de examen: D2 acaba de hacerle revivir un fracaso. No sugerir causas; dejar el silencio trabajar.*

**Variante planificador** (las 1–2 entrevistas de contraste con quien sí planifica multi-día): en este bloque, reemplazar D1–D2 por:
   - ¿Cómo empezaste a planificar las comidas? Contame la época en que no lo hacías y qué cambió.
   - Contame la última semana en que el plan se rompió. ¿Qué lo rompió y qué comieron ese día?
   - Probes: ¿qué herramienta sostiene el plan (papel, planilla, cabeza)? ¿cuánto tiempo te lleva armarlo? ¿alguien más lo consulta?
   - *El "por qué" del 13% que planifica: qué los hizo distintos (evento, herramienta, personalidad) y dónde se les rompe. Si lo que los convirtió es replicable, es mecánica de onboarding; si es personalidad, el producto no convierte improvisadores en planificadores — planifica por ellos.*

## Wrap-up (5 min)

- ¿Qué te tendría que haber preguntado y no te pregunté?
- ¿Conocés a alguien que organice las comidas de su casa de una forma muy distinta a la tuya? ¿Me lo presentarías?
- Gracias; ofrecer compartir los resultados si le interesan.

---

## Al terminar cada entrevista

- Volcar notas/transcripción en `product/interviews/` y llevarlas a `/extract-insights`.
- Marcar por goal: ¿la respuesta fue memoria (episodio) o predicción? Solo los episodios cuentan como evidencia.
- En C2/C3, anotar el mecanismo de abandono en una de cuatro categorías: **fricción de uso / calidad del resultado / desconfianza / el problema no ameritaba**. Con 5+ entrevistas, la distribución de esa categoría es la decisión de diseño más importante que sale de esta ronda.
- En C1, anotar qué fue "variedad" en el episodio: **receta nueva / rotación del repertorio conocido / ambas**.
- En C1/C2, anotar **a qué hora** buscó ideas o le pidió a la IA (la ventana útil de la sugerencia es una dimensión de diseño abierta).
- En D1, anotar el **tipo de objetivo espontáneo**: salud / variedad / gasto / coordinación / otro — sin haberlo sugerido.
- Si dos entrevistas seguidas falsifican el mismo goal, no esperar a completar la ronda: revisar la creencia en `overview.md` y rediseñar.

## Pretest notes — 2026-07-27

*(Referencias renumeradas el 2026-07-28: el viejo Bloque C es ahora el Bloque D.)*

Dry-run contra la persona sintética **Valeria Domínguez** (primaria). Estructura general sana: el funnel A→B→D construyó la confianza que D necesitaba, B2 produjo el dato buscado, D2 hizo aparecer el mecanismo de la mesa sin nombrarlo. Cuatro cambios aplicados:

1. **A1** anclada a "compra grande" + probe de reposición — la redacción original ("última compra") cosechó la verdulería de ayer, episodio trivial.
2. **A3** reformulada al "ingrediente huérfano" — la original no discriminaba: para quien improvisa, "aprovechar lo que hay" es el default diario, no un episodio.
3. **B1** ganó el probe del registro que sobrevive — en el dry-run, la lista de notas del celular (viva hace años) apareció solo por un probe improvisado; sus propiedades son la spec del relevamiento viable.
4. **D3** reescrita sin carga de culpa y apuntada a una aspiración *nueva* — la original ("¿qué hiciste al respecto?") justo después del fracaso de D2 produjo defensividad ("ya sé que está mal") y re-cosechó la misma historia.

Dejado como está a propósito: **W2** es técnicamente doble ("¿qué comieron y cómo se decidió?") pero los probes la rescatan en un paso; partirla alargaría el warm-up.

Límite del pretest: valida estructura (especulación, sesgo, redundancia, orden, cobertura), no recepción — una persona sintética es más articulada y cooperativa que cualquier participante real. Pretest limpio = guía sólida, no guía validada.

## Revisión 2026-07-28 — incorporación de los "por qués" de la encuesta

Fuente: `product/insights/2026-07-28-1213-encuesta-planificacion-hogares-latam.md` (n=141). Cambios:

1. **Goal 4 nuevo** (variedad + abandono de IA/apps) con su **Bloque C** propio: C1 (qué es "variedad" en episodios reales), C2 (última vez con ChatGPT/IA — mecanismo de abandono del 58%), C3 (condicional: abandono de la app descargada — churn del 88%). El bloque se autorregula: sin historial de IA/apps queda en ~5 min.
2. **Probe multi-canal en A1**: ¿la lista vive partida por canal o se parte en el momento? (84% compra en 2+ canales).
3. **Variante planificador en Bloque D** para las 1–2 entrevistas de contraste con el 13% que sí planifica: cómo empezaron, dónde se les rompe el plan.
4. **Reclutamiento**: priorizar respondentes de Q5 "lo probé pero no seguí"; reservar contraste de planificadores desde Q1.
5. **Codificación al cierre**: mecanismo de abandono en 4 categorías (fricción / calidad / desconfianza / no ameritaba) y tipo de variedad (receta nueva / rotación).
6. El viejo Bloque C (intento de cambiar, goal 1) pasa a ser **Bloque D** y sigue al final por su sensibilidad. Duración pasa a ~45–55 min.

**Pendiente: pretest del Bloque C** — el bloque nuevo no pasó por dry-run; correrlo contra una persona sintética que haya probado y abandonado ChatGPT para menús (perfil Valeria con historial de IA) antes de la primera entrevista real. Riesgos a mirar: que C2 coseche opinión sobre IA en general en vez del episodio, y redundancia B1↔C3.

## Revisión 2026-07-28 (2) — D1 sin primado de salud

Fuente: panel de crítica del journey to-be (Valeria 4/5, Andrés 3.5/5, Tomás 4/5 — `product/insights/2026-07-28-125*-critique-*`). La crítica de Andrés ("si me obliga a elegir un objetivo de salud, le miento a la app desde el día uno") y el objetivo real de Tomás (gasto en delivery) mostraron que D1 primaba salud con sus ejemplos. Cambios: learning goal 1 reformulado (el **tipo** de objetivo es dato a capturar, no premisa), D1 sin ejemplos (abanico mixto solo si el participante lo pide), falsificación ampliada (intentos reales que nunca son de salud = creencia 2 acotada a un segmento), y codificación del tipo de objetivo al cierre. Se agregó también el probe de hora en C1/C2 (ventana útil de la sugerencia).
