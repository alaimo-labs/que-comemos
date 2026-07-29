# MFC — Mapa de Fricción Cognitiva: Journey TO-BE "El ciclo con QueComemos"

- **Journey fuente:** `product/journeys/2026-07-28-1236-journey-to-be-ciclo-quecomemos.md` (versión post-panel de crítica) — archivo existente, mapeado a pedido.
- **Actor:** quien decide las comidas del hogar (perfil Valeria; configuración co-decisora en Andrés). **Objetivo:** resolver "¿qué comemos hoy?" sin carga mental, sin repetir, dentro de las restricciones, con la compra acompañando.
- **Nota de método:** el MFC se aplica normalmente al as-is; acá se mapea el **to-be** con doble lectura por paso — la **fricción que absorbe** (la fricción del as-is que el paso le quita al humano: eso es la oportunidad de IA que el paso encapsula) y la **fricción residual** (el esfuerzo mental que sigue siendo humano en el to-be: eso es el riesgo de retención del paso).
- **Métricas:** `product/overview.md` no declara métricas de input todavía — **todos los "metric impact" de este mapa son propuestos**; se marca una sola vez acá.
- **Evidencia:** encuesta n=141 (`product/insights/2026-07-28-1213-…`), panel de crítica (Valeria 4/5, Andrés 3.5/5, Tomás 4/5).

---

## Mapa por paso

### 1. Define el objetivo y las restricciones del hogar

**Fricción que absorbe**
- **Category:** Transformation
  - **Why:** el humano traducía una aspiración difusa ("comer mejor", "gastar menos") a decisiones concretas de cada día — y esa traducción se rehacía en cada intento de cambio, que moría en una semana.
- **Friction:** convertir lo vago en parámetros operables, cada vez, sin guía.
- **Problem:** los intentos de cambio no sobreviven la primera semana complicada.
- **Evidence metric:** sin cobertura de encuesta (creencia 2); se mide en entrevistas D (episodios de intento y muerte).
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
- **Evidence metric:** 44% organiza "solo de memoria" (Q4); desperdicio ~9 menciones en la abierta; B2 de la guía mide la distancia entre inventario mental y real.
- **Severity:** alta — frecuencia continua × intensidad media.

**Fricción residual**
- **Category:** Limiter
  - **Why:** detectar cuándo el estado del sistema divergió de la realidad (y corregirlo) sigue siendo monitoreo humano.
- **Friction:** notar que "la app cree que hay pollo y no hay" antes de que la sugerencia falle.
- **Problem:** la divergencia crece en silencio y degrada la calidad del paso 3 sin que el usuario sepa por qué — la falla se percibe como "la app no sirve", no como "el inventario está viejo" (Andrés: "las sugerencias del jueves salen de una nevera que ya no existe").
- **Evidence metric:** no medida aún — proponer: tasa de corrección manual; % de sugerencias rechazadas con motivo "no tengo eso".
- **Severity:** **alta** — frecuencia continua × falla silenciosa que erosiona la confianza en el motor del producto.
- **Metric impact:** retención (vía confianza en la sugerencia).

### 3. Recibe "qué comemos hoy" con lo que hay, a tiempo

**Fricción que absorbe** — la central del as-is
- **Category:** Limiter (dominante), Transformation, Evaluator
  - **Why Limiter:** la decisión diaria es combinatoria — ingredientes disponibles × restricciones × historial de la semana × tiempo y energía del día — resuelta a las 18:30, cansada, sin margen.
  - **Why Transformation:** de "esto es lo que hay" a "esto se cocina hoy" — el pienso es traducción pura de estado a acción.
  - **Why Evaluator:** "que sea balanceado/nutritivo" exige criterio nutricional que la mayoría no tiene ("calcular macronutrientes e intercalarlo con las otras comidas").
- **Friction:** resolver esa combinatoria mentalmente todos los días, en el peor momento del día.
- **Problem:** 56% llega a la hora de cocinar sin saber qué preparar varias veces por semana o a diario; la salida es repetir (77%) o delivery.
- **Evidence metric:** Q2 (56% dolor alto), Q3 (77% repetición), temas #1 + #2 de la abierta (~45 de 76 menciones), Q1 (87% decide con <24 h).
- **Severity:** **alta** — la máxima del mapa: frecuencia diaria × intensidad alta.

**Fricción residual**
- **Category:** Evaluator
  - **Why:** juzgar si la sugerencia merece confianza sigue siendo humano — "¿esto lo comen mis hijos?", "¿me salió bien la última vez que le hice caso?".
- **Friction:** evaluar la sugerencia cada día hasta que la confianza se construye (o no).
- **Problem:** sugerencia percibida como ajena ("mis hijos no comen bowls") → rechazo → vuelta a lo de siempre; el precedente es el 58% de churn de quienes probaron ChatGPT para menús.
- **Evidence metric:** Q5 + C2 (mecanismo de abandono); proponer: tasa de aceptación de la sugerencia en los días 1–14.
- **Severity:** **alta al inicio, decreciente** — diaria × alta las primeras dos semanas (la ventana donde murió todo lo anterior).
- **Metric impact:** retención D7/D30 — la métrica madre del producto.

### 4. El plan llega al hogar

**Fricción que absorbe**
- **Category:** Standardizer
  - **Why:** la negociación de la mesa hoy depende del humor, del cansancio y de quién esté — mismo hogar, resultado distinto cada noche; y en el hogar co-decisor, el proceso no tiene dueño ("cada uno asume que el otro pensó").
- **Friction:** renegociar cada noche, desde cero y sin proceso, qué se come — con el costo cayendo siempre en la misma persona.
- **Problem:** la cena como campo de batalla o como bug de coordinación que termina en domicilio.
- **Evidence metric:** gustos/dietas tema #5 de la abierta (~12 menciones); decisión compartida 44% de la muestra; mecanismo Juli pendiente en D2.
- **Severity:** media — diaria × intensidad media (solo hogares multi-persona, pero son la mayoría de la muestra).

**Fricción residual**
- **Category:** Standardizer
  - **Why:** la negociación en sí (votar, vetar, aceptar) sigue siendo humana; el producto le pone marco, no la elimina — y el marco correcto depende de la configuración del hogar, que es la tensión de diseño abierta.
- **Friction:** operar el mecanismo de participación sin que se vuelva otra tarea.
- **Problem:** configuración equivocada → asamblea (Valeria) o gerente-con-mejor-herramienta (Andrés): en ambos casos la carga vuelve a quien decidía.
- **Evidence metric:** no medida aún — proponer: % de planes con participación efectiva de un 2º miembro del hogar.
- **Severity:** media — diaria × media; condicionada a resolver la tensión con entrevistas D.
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
- **Friction:** recordar qué se comió esta semana, qué platos existen en el repertorio y cuáles hace meses no aparecen.
- **Problem:** rotación de 6–8 platos percibida como aburrimiento y culpa (tema #1 de la abierta).
- **Evidence metric:** Q3 (77%), ~24 menciones de repetición/variedad.
- **Severity:** alta — diaria × media, compuesta en el tiempo.

**Fricción residual**
- **Category:** Standardizer (de hábito, más que cognitiva)
  - **Why:** la micro-confirmación ("¿ayer comieron lo sugerido?") es intensidad mínima pero frecuencia máxima — y su cumplimiento varía por persona y por día.
- **Friction:** atender un toque diario más, para siempre.
- **Problem:** acumulada, convierte al producto en "otra app que me pide algo cada día" — la forma exacta del churn de la categoría (88%, Q6).
- **Evidence metric:** no medida aún — proponer el par: % de días con confirmación **y** retención de quienes nunca confirman. Si los que nunca confirman retienen igual, el requisito "nunca se degrada" se cumplió y esta fricción es irrelevante por diseño.
- **Severity:** media — frecuencia máxima × intensidad mínima, con riesgo compuesto.
- **Metric impact:** retención D30+.

---

## Ranking de oportunidades de IA (fricciones absorbidas, por severidad)

1. **Paso 3 — la combinatoria diaria del "qué cocino"** (Limiter + Transformation + Evaluator). Diaria × alta; 56% dolor frecuente, 45/76 menciones de la abierta. Es el corazón del producto y el supuesto a matar primero (C2).
2. **Pasos 2+5 — inventario vivo y su traducción a lista por canal** (Limiter + Transformation). Continua/semanal × media-alta; 82% hace el gesto a mano, 44% de memoria. Es además el insumo del paso 3: sin inventario confiable no hay sugerencia creíble.
3. **Paso 7 — memoria de repertorio y rotación** (Limiter). Diaria × media; 77% repite. Es la mitad "variedad" de la promesa.
4. **Paso 4 — estandarizar la decisión del hogar** (Standardizer). Diaria × media; 44% de hogares co-decide. Bloqueada por la tensión de diseño del modelo de hogar.
5. **Paso 1 — traducir la aspiración a parámetros** (Transformation). Una vez × media. Condicionada a la creencia 2 (entrevistas D).

## Riesgos residuales (dónde el to-be puede morir, por severidad)

1. **Divergencia silenciosa del inventario** (paso 2) — degrada el paso 3 sin explicación visible.
2. **Evaluación diaria de confianza en la sugerencia** (paso 3) — la ventana crítica son los días 1–14, donde murió ChatGPT.
3. **Micro-confirmación diaria** (paso 7) — neutralizable por diseño (modo perdonador); la métrica propuesta verifica si se logró.
4. **Mecanismo de participación del hogar** (paso 4) — pendiente de la tensión de diseño.
5. **Articulación del objetivo** (paso 1) — pendiente de creencia 2.

## Métricas de input propuestas (el overview no declara ninguna)

Tasa de aceptación de la sugerencia diaria (D1–D14) · retención D7/D30 · tasa de corrección manual del inventario · % de sugerencias rechazadas por "no tengo eso" · % de hogares con 2º miembro activo · retención de quienes nunca confirman el paso 7.
