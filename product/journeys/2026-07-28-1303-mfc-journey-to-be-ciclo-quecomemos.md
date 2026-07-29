# MFC — Mapa de Fricción Cognitiva: Journey TO-BE "El ciclo con QueComemos"

- **Journey fuente:** `product/journeys/2026-07-28-1236-journey-to-be-ciclo-quecomemos.md` (versión post-panel de crítica) — archivo existente, mapeado a pedido.
- **Actor:** quien decide las comidas del hogar (perfil Valeria; configuración co-decisora en Andrés). **Objetivo:** resolver "¿qué comemos hoy?" sin carga mental, sin repetir, dentro de las restricciones, con la compra acompañando.
- **Nota de método:** el MFC se aplica normalmente al as-is; acá se mapea el **to-be** con doble lectura por paso — la **fricción que absorbe** (la fricción del as-is que el paso le quita al humano: eso es la oportunidad de IA que el paso encapsula) y la **fricción residual** (el esfuerzo mental que sigue siendo humano en el to-be: eso es el riesgo de retención del paso).
- **Métricas:** `product/overview.md` no declara métricas de input todavía — **todos los "metric impact" de este mapa son propuestos**; se marca una sola vez acá.
- **Evidencia:** encuesta n=141 (`product/insights/2026-07-28-1213-…`), panel de crítica (Valeria 4/5, Andrés 3.5/5, Tomás 4/5) y — desde la revisión 2026-07-29 — **7 entrevistas reales** E01–E07 (`product/insights/2026-07-29-1213-…`).

---

## Mapa por paso

### 1. Define el objetivo y las restricciones del hogar

**Fricción que absorbe**
- **Category:** Transformation
  - **Why:** el humano traducía una aspiración difusa ("comer mejor", "gastar menos") a decisiones concretas de cada día — y esa traducción se rehacía en cada intento de cambio, que moría en una semana.
- **Friction:** convertir lo vago en parámetros operables, cada vez, sin guía.
- **Problem:** los intentos de cambio no sobreviven la primera semana complicada.
- **Evidence metric:** episodios D de E01–E07: 6 intentos de cambio narrados; sobrevivieron solo los que **eliminaban decisiones** (E02: stock de emergencia) o se montaban en un movimiento existente (E07: tupper). Los que exigían decidir/coordinar a diario murieron todos en 2–4 semanas (E01, E03, E04, E06). El disparador sostenible fue económico en todos los casos; el único de salud (E04) se rompió primero.
- **Severity:** media — baja frecuencia (intentos esporádicos) × intensidad alta (cada fracaso desalienta el siguiente).

**Fricción residual**
- **Category:** Transformation
  - **Why:** articular el objetivo sigue siendo humano: el hogar tiene que saber qué quiere y declararlo el día 1.
- **Friction:** poner en palabras el objetivo real del hogar (que puede no ser de salud) y enumerar restricciones sin olvidar ninguna.
- **Problem:** un objetivo mal declarado envenena todas las sugerencias — o produce mentira de onboarding (Andrés: "le miento a la app desde el día uno").
- **Evidence metric:** no medida aún — proponer: % de onboarding completado; % de objetivos re-editados en la semana 1.
- **Severity:** media — ocurre una vez × intensidad alta como puerta de entrada.
- **Metric impact:** activación.

### 2. El inventario se arma solo; la captura manual es corrección

**Fricción que absorbe**
- **Category:** Limiter
  - **Why:** el inventario mental de heladera + freezer + alacena excede la memoria de trabajo de cualquiera — hoy se lleva "de memoria y a ojo".
- **Friction:** recordar qué hay, cuánto queda y qué se está por vencer, en tres lugares físicos, todos los días.
- **Problem:** compras dobles, faltantes y comida que se vence sin que nadie la vea.
- **Evidence metric:** 44% organiza "solo de memoria" (Q4); desperdicio ~9 menciones en la abierta. B2 medido en E01–E07: la distancia entre inventario mental y real es enorme en hogares grandes (tuppers sin identificar, camarones de diciembre, costillas de marzo; "cincuenta por ciento de segura", E06) y nula en hogares chicos (E02, E07: "el freezer es chiquito, no hay misterio") — la fricción escala con el tamaño del stock. El punto ciego mayor es **lo cocinado**: "lo que compro se usa; lo que cocino de más se pierde" (E04, 5/7 hogares).
- **Severity:** alta — frecuencia continua × intensidad media.

**Fricción residual**
- **Category:** Limiter
  - **Why:** detectar cuándo el estado del sistema divergió de la realidad (y corregirlo) sigue siendo monitoreo humano.
- **Friction:** notar que "la app cree que hay pollo y no hay" antes de que la sugerencia falle.
- **Problem:** la divergencia crece en silencio y degrada la calidad del paso 3 sin que el usuario sepa por qué — la falla se percibe como "la app no sirve", no como "el inventario está viejo" (Andrés: "las sugerencias del jueves salen de una nevera que ya no existe").
- **Evidence metric:** **confirmada con caso real (E04):** la app de inventario murió en una semana exactamente por esto — "a la semana la app decía una cosa y mi despensa decía otra, y una app que miente no sirve para nada. Borrarla fue un alivio". Proponer: tasa de corrección manual; % de sugerencias rechazadas con motivo "no tengo eso".
- **Severity:** **alta** — frecuencia continua × falla silenciosa que erosiona la confianza en el motor del producto. Ya mató un producto de la categoría en este mismo corpus.
- **Metric impact:** retención (vía confianza en la sugerencia).

### 3. Recibe "qué comemos hoy" con lo que hay, a tiempo

**Fricción que absorbe** — la central del as-is
- **Category:** Limiter (dominante), Transformation, Evaluator
  - **Why Limiter:** la decisión diaria es combinatoria — ingredientes disponibles × restricciones × historial de la semana × tiempo y energía del día — resuelta a las 18:30, cansada, sin margen.
  - **Why Transformation:** de "esto es lo que hay" a "esto se cocina hoy" — el pienso es traducción pura de estado a acción.
  - **Why Evaluator:** "que sea balanceado/nutritivo" exige criterio nutricional que la mayoría no tiene ("calcular macronutrientes e intercalarlo con las otras comidas").
- **Friction:** resolver esa combinatoria mentalmente todos los días, en el peor momento del día — y las entrevistas afinaron el dónde: la combinatoria no es de recetas sino de **memoria del repertorio propio** ("sé hacer cuarenta cosas, cocino ocho", E01; la lista de 25 platos de E05 como la pieza más útil de su sistema), y la ventana puede empezar a la mañana con el descongelado (E01).
- **Problem:** 56% llega a la hora de cocinar sin saber qué preparar varias veces por semana o a diario; la salida es repetir (77%) o delivery. Nombrado en E06 como el dolor central: "cocinar no me molesta; decidir todos los días qué van a comer cuatro personas, eso me está matando".
- **Evidence metric:** Q2 (56% dolor alto), Q3 (77% repetición), temas #1 + #2 de la abierta (~45 de 76 menciones), Q1 (87% decide con <24 h); 6/7 entrevistas lo confirman (la excepción, E07, marca el borde del segmento).
- **Severity:** **alta** — la máxima del mapa: frecuencia diaria × intensidad alta.

**Fricción residual**
- **Category:** Evaluator
  - **Why:** juzgar si la sugerencia merece confianza sigue siendo humano — "¿esto lo comen mis hijos?", "¿me salió bien la última vez que le hice caso?".
- **Friction:** evaluar la sugerencia cada día hasta que la confianza se construye (o no).
- **Problem:** sugerencia percibida como ajena ("mis hijos no comen bowls") → rechazo → vuelta a lo de siempre; el precedente es el 58% de churn de quienes probaron ChatGPT para menús.
- **Evidence metric:** **C2 respondida por E01–E07** — el abandono operó por tres mecanismos, ninguno de calidad: re-contexto (E01: "terminé escribiendo más de lo que me ahorraba"), destiempo (E06: "lo usaba cuando ya no servía"; E02: "la alacena está más cerca que la app") y credibilidad local (E04: "dejé de creerle"; E05: "me da una semana ideal de una casa que no es la mía"). Proponer: tasa de aceptación de la sugerencia en los días 1–14.
- **Severity:** **alta al inicio, decreciente** — diaria × alta las primeras dos semanas: la ventana donde murió todo lo anterior ("todo lo que probé funcionó dos semanas" — patrón confirmado en E01, E02, E04, E06).
- **Metric impact:** retención D7/D30 — la métrica madre del producto.

### 4. El plan llega al hogar

**Fricción que absorbe**
- **Category:** Standardizer
  - **Why:** la negociación de la mesa hoy depende del humor, del cansancio y de quién esté — mismo hogar, resultado distinto cada noche; y en el hogar co-decisor, el proceso no tiene dueño ("cada uno asume que el otro pensó").
- **Friction:** renegociar cada noche, desde cero y sin proceso, qué se come — con el costo cayendo siempre en la misma persona. Las entrevistas corrigieron la causa: el otro adulto no participa **porque no puede ver lo que hay**, no porque no quiera (E06: el esposo cumplió una semana y desertó — "para escoger tienes que saber qué hay y él nunca sabe qué hay").
- **Problem:** la cena como campo de batalla o como bug de coordinación que termina en domicilio; el "¿qué hay de comer?" como única interfaz del hogar con la cocinera (E06).
- **Evidence metric:** gustos/dietas tema #5 de la abierta (~12 menciones); decisión compartida 44% de la muestra; asimetría de información confirmada en E01, E03 y E06 ("abre el congelador y dice 'no hay nada', y hay de todo"). Mecanismo Juli con primer respaldo real (E04: el quiebre fue en la mesa); se sigue en D2.
- **Severity:** media — diaria × intensidad media (solo hogares multi-persona, pero son la mayoría de la muestra).

**Fricción residual**
- **Category:** Standardizer
  - **Why:** la negociación en sí (votar, vetar, aceptar) sigue siendo humana; el producto le pone marco, no la elimina. **La tensión de configuración se resolvió con E01–E07:** la carga simétrica murió en todos los casos observados (planilla E02, Bring E01, intento de E05); el modelo vivo es un dueño de carga + visibilidad para todos.
- **Friction:** operar el mecanismo de participación sin que se vuelva otra tarea — y, en el modelo dueño-único, **el hogar depende de una sola persona**.
- **Problem:** dos modos de falla reales: participación que exige mantenimiento a un segundo miembro (muere, evidencia unánime) y el **bus factor** del dueño (E05: "estuve una semana en cama y esta casa comió empanadas cinco días").
- **Evidence metric:** confirmada la dirección en E05/E06/E04; proponer: % de planes con participación efectiva de un 2º miembro (consulta o elección, no carga) y continuidad del ciclo cuando el dueño no interactúa N días.
- **Severity:** media — diaria × media; ya no condicionada a entrevistas — condicionada a diseño.
- **Metric impact:** retención del hogar completo (vs. retención del usuario solitario).

### 5. La lista de gaps se arma sola, partida por canal

**Fricción que absorbe**
- **Category:** Transformation, Limiter
  - **Why Transformation:** plan + inventario → faltantes por canal es traducción pura ("turn X into Y") que hoy hace el humano cada vez que compra (82%).
  - **Why Limiter:** sostener los faltantes de 2–3 canales en la cabeza entre compra y compra.
- **Friction:** armar y recordar la lista correcta para cada lugar de compra.
- **Problem:** olvidos ("olvidarse un ingrediente… todo queda a 10 km"), compras dobles, y el gesto manual de revisar-y-anotar repetido en cada compra.
- **Evidence metric:** 82% arma lista revisando qué hay (Q9); 84% compra en 2+ canales (Q8).
- **Severity:** media-alta — frecuencia semanal-diaria × intensidad media.

**Fricción residual:** prácticamente ninguna — un vistazo de verificación a la lista. No se fuerza fricción donde no la hay.

### 6. Compra como siempre: grande o reposición

Sin fricción cognitiva propia en el to-be: la compra física no es esfuerzo mental que el producto toque, y el paso existe justamente para **no** agregar proceso. Paso sin fricción — se registra y se pasa.

### 7. El sistema aprende qué se cocinó

**Fricción que absorbe**
- **Category:** Limiter
  - **Why:** la memoria del repertorio y del historial de rotación era humana y falla sistemáticamente — por eso el 77% repite y "caemos en lo mismo por practicidad".
- **Friction:** recordar qué se comió esta semana, qué platos existen en el repertorio y cuáles hace meses no aparecen — y recordar **qué quedó cocinado**: las sobras congeladas desaparecen de la memoria del hogar (5/7 entrevistas).
- **Problem:** rotación de 6–8 platos percibida como aburrimiento y culpa (tema #1 de la abierta); lo cocinado de más se pierde ("no es que boté porotos, es que boté un domingo entero", E04).
- **Evidence metric:** Q3 (77%), ~24 menciones de repetición/variedad; repertorio real ~40 platos vs ~8 cocinados (E01, E05, E06); cementerio de tuppers en E01/E03/E04/E06.
- **Severity:** alta — diaria × media, compuesta en el tiempo.

**Fricción residual**
- **Category:** Standardizer (de hábito, más que cognitiva)
  - **Why:** la micro-confirmación ("¿ayer comieron lo sugerido?") es intensidad mínima pero frecuencia máxima — y su cumplimiento varía por persona y por día.
- **Friction:** atender un toque diario más, para siempre.
- **Problem:** acumulada, convierte al producto en "otra app que me pide algo cada día" — la forma exacta del churn de la categoría (88%, Q6) y de todos los registros muertos del corpus ("si faltas una semana, ya no vuelves", E06).
- **Evidence metric:** la neutralización por diseño tiene precedente real: los registros vivos del corpus no exigen completitud (la nota que "no me exige nada", E01) y el único sistema sostenido usa granularidad selectiva (E05 anota el arroz de 5 kg, no la cebolla). Proponer el par: % de días con confirmación **y** retención de quienes nunca confirman. Si los que nunca confirman retienen igual, el requisito "nunca se degrada" se cumplió y esta fricción es irrelevante por diseño.
- **Severity:** media — frecuencia máxima × intensidad mínima, con riesgo compuesto.
- **Metric impact:** retención D30+.

---

## Ranking de oportunidades de IA (fricciones absorbidas, por severidad)

1. **Paso 3 — la combinatoria diaria del "qué cocino"** (Limiter + Transformation + Evaluator). Diaria × alta; 56% dolor frecuente, 45/76 menciones de la abierta. Es el corazón del producto y el supuesto a matar primero (C2).
2. **Pasos 2+5 — inventario vivo y su traducción a lista por canal** (Limiter + Transformation). Continua/semanal × media-alta; 82% hace el gesto a mano, 44% de memoria. Es además el insumo del paso 3: sin inventario confiable no hay sugerencia creíble.
3. **Paso 7 — memoria de repertorio y rotación** (Limiter). Diaria × media; 77% repite. Es la mitad "variedad" de la promesa.
4. **Paso 4 — estandarizar la decisión del hogar** (Standardizer). Diaria × media; 44% de hogares co-decide. Desbloqueada: dirección resuelta por E01–E07 (visibilidad compartida + un dueño de carga).
5. **Paso 1 — traducir la aspiración a parámetros** (Transformation). Una vez × media. Matizada por entrevistas: el objetivo operable sostenible es económico; salud es aspiración de fondo.

## Riesgos residuales (dónde el to-be puede morir, por severidad)

1. **Divergencia silenciosa del inventario** (paso 2) — degrada el paso 3 sin explicación visible. **Confirmado con caso real:** ya mató la app de inventario de E04 en una semana.
2. **Evaluación diaria de confianza en la sugerencia** (paso 3) — la ventana crítica son los días 1–14; "todo funcionó dos semanas" es el patrón unánime del corpus. Con C2 respondida, la vara es concreta: sin re-contexto, a tiempo, creíble localmente.
3. **Micro-confirmación diaria** (paso 7) — neutralizable por diseño (modo perdonador); el precedente real existe (registros sin exigencia sobreviven años).
4. **Mecanismo de participación del hogar** (paso 4) — dirección resuelta; queda diseñar la participación sin carga y el **bus factor** del dueño único (nuevo, E05).
5. **Articulación del objetivo** (paso 1) — matizado: capturar el objetivo económico sin forzar el de salud.

## Métricas de input propuestas (el overview no declara ninguna)

Tasa de aceptación de la sugerencia diaria (D1–D14) · retención D7/D30 · tasa de corrección manual del inventario · % de sugerencias rechazadas por "no tengo eso" · % de hogares con 2º miembro activo · retención de quienes nunca confirman el paso 7 · continuidad del ciclo cuando el dueño no interactúa N días (bus factor).

## Revisión 2026-07-29 — actualización con entrevistas reales E01–E07

Fuente: `product/insights/2026-07-29-1213-entrevistas-e01-e07-planificacion-hogares.md`. Qué cambió en este mapa:
- **Varias fricciones pasaron de "propuesta a instrumentar" a "confirmada con episodio real":** la divergencia silenciosa del paso 2 (mató la app de inventario de E04 en una semana — el riesgo residual #1 ya no es hipotético), la ventana 1–14 del paso 3 ("todo funcionó dos semanas", patrón unánime) y el mecanismo de abandono de IA (C2 respondida: re-contexto, destiempo, credibilidad local).
- **Paso 3 afinado:** la combinatoria es sobre el repertorio propio (memoria, no habilidad: ~40 platos sabidos vs ~8 cocinados) y la ventana puede empezar a la mañana con el descongelado (E01).
- **Paso 4 desbloqueado:** la tensión de configuración se resolvió (dueño de carga + visibilidad para todos; la carga simétrica murió en todos los casos del corpus); entra el **bus factor** como riesgo nuevo.
- **Paso 7 ampliado:** la fricción absorbida incluye la memoria de lo cocinado — las sobras congeladas como punto ciego (5/7 hogares); la neutralización de la micro-confirmación tiene precedente real (registros sin exigencia que sobreviven años; granularidad selectiva de E05).
- **Paso 1 matizado:** los cambios sostenidos del corpus fueron económicos y eliminaban decisiones; el objetivo de salud fue el primero en romperse.
- **Borde del mapa:** E07 confirma que la fricción central (paso 3) no existe en el hogar de repertorio fijo por presupuesto — el mapa aplica al ICP, no al hogar de subsistencia.
