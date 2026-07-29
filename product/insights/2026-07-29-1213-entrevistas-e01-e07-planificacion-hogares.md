# Insights de entrevistas — E01–E07 (planificación de comidas en hogares LatAm)

- **Fuentes:** `product/interviews/` — E01 Paola (Medellín, familia 4, hijos escolares), E02 Sebastián (Buenos Aires, pareja sin hijos), E03 Rocío (Lima, hijos adultos), E04 Daniela (Santiago, hijo de 7), E05 Mariano (Rosario, planificador, contraste), E06 Karla (Guadalajara, 2 niños chicos), E07 Verónica (Quito, monoparental, caso disconfirmante)
- **source:** real (7 entrevistas, 2026-07-28 y 2026-07-29)
- **Guía:** `product/interview-guides/2026-07-27-1304-objetivo-y-despensa.md`
- **Contra qué se lee:** los 4 supuestos críticos del journey to-be (`product/journeys/2026-07-28-1236-journey-to-be-ciclo-quecomemos.md`, pasos 1, 2, 3 y 7) y las tensiones abiertas del panel sintético
- **Fecha:** 2026-07-29

Ordenados por impacto en decisiones de producto. La recurrencia entre entrevistadas es la señal de priorización.

---

## 1. El único registro que sobrevive es el que cuesta 3 segundos, está en el camino y no acumula deuda

Recurrencia 6/7. Todos los hogares tienen exactamente un registro vivo (nota del celular E01, pizarra E03, grupo de WhatsApp E04, hoja del refri E06, planilla propia E05) y un cementerio de intentos muertos en 2–4 semanas (Excel, apps de gastos, Bring, app de inventario). El mecanismo de muerte es siempre el mismo: el atraso se vuelve deuda y la deuda mata el sistema — nunca hubo un "día en que se decidió dejarlo". Esto **valida el paso 2 del to-be** (captura derivada, corrección manual) y **convierte el modo perdonador del paso 7 en requisito confirmado con datos reales**: el producto no puede tener estado "atrasado" visible ni exigir completitud; debe "empezar limpio" después de cada ciclo, como la nota que se borra al volver del mercado.

> Evidencia: "Cuando se te atrasa, ya perdiste. […] La nota no me exige nada. No tiene que estar completa. Y cuando vuelvo del mercado la borro toda y queda en blanco. El Excel nunca empezaba limpio, el Excel te acumulaba la culpa." — Paola (E01)

> Evidencia: "No es un registro, poh. Es una conversación. Nadie tiene que mantenerlo. Si escribo 'comprar pan' y no compramos pan, no pasa nada, nadie me reta." — Daniela (E04), sobre el WhatsApp que lleva 8 años

> Evidencia: "Es como el gimnasio: si faltas una semana, ya no vuelves." — Karla (E06)

## 2. ChatGPT no se abandonó por calidad: murió por costo de re-contexto, por llegar a destiempo y por perder credibilidad local

Recurrencia 5/5 entre quienes probaron IA — y responde la pregunta C2 con tres mecanismos concretos, ninguno de los cuales es "las sugerencias eran malas". (a) **Re-contexto:** volver a explicar el hogar cada vez cuesta más de lo que ahorra (E01, E06). (b) **Destiempo:** se usaba de noche, con calma, "cuando ya no servía"; en el momento de la decisión la alacena está más cerca que la app (E02, E06). (c) **Credibilidad local:** un solo error de contexto ("salmón dos veces por semana") rompe la confianza en todo lo demás (E04, E05). Esto valida las tres apuestas del paso 3 del to-be — memoria permanente, llegada proactiva en la ventana, sugerencia anclada en lo que hay — y agrega un matiz de Mariano: la IA genérica sí retiene cuando la pregunta es chica y contextual ("qué hago con estos porotos"), no la semana ideal de una casa que no existe.

> Evidencia: "Cada vez tenía que volver a contarle todo […] Terminé escribiendo más de lo que me ahorraba. Y no fue que dijera 'esto no sirve'. Fue que un domingo no me dieron ganas de escribirle y ya no volví." — Paola (E01)

> Evidencia: "No falló. Me olvidé de que existía. El martes a las nueve yo no me acuerdo de que hay una herramienta, abro la alacena. La alacena está más cerca que la app." — Sebastián (E02)

> Evidencia: "Si me dijo salmón dos veces por semana, ¿qué más me está diciendo que está mal y yo no me doy cuenta? Es como cuando pillas a alguien en una mentira chica." — Daniela (E04)

## 3. "Variedad" en el segmento familiar significa recuperar el repertorio propio, no aprender recetas nuevas

Recurrencia 4/7, con un contraejemplo que define el borde. Las cocineras saben hacer 25–40 platos y cocinan 6–8: el cuello de botella es la memoria en el momento de decidir, no la habilidad ni el recetario. La herramienta más valiosa del único sistema que funciona (Mariano) no son las fórmulas: es su lista de 25 platos propios. El contraejemplo es Rocío (hijos adultos que ya conocen todo el repertorio y piden novedad) — la novedad es capa premium para un sub-segmento, no el motor. **Implicación directa para el motor de sugerencias del paso 3:** arranca del repertorio del hogar (elicitado en onboarding o aprendido del uso) y rota sobre él; las recetas nuevas de internet además fallan logísticamente porque piden ingredientes que no están en casa (E01, E03, E04).

> Evidencia: "Yo sé hacer como cuarenta cosas. Lo que pasa es que cocino ocho. […] A las seis y media no se me ocurre pastel de papa, se me ocurre arroz con pollo." — Paola (E01)

> Evidencia: "No quiero aprender algo nuevo, quiero acordarme de lo que ya sé." — Karla (E06)

> Evidencia: "La lista de veinticinco platos es lo más útil de todo, más que las fórmulas. No es que no sé cocinar, es que no me acuerdo." — Mariano (E05)

## 4. La co-decisión no falla por falta de voluntad: falla por asimetría de información sobre lo que hay

Recurrencia 5/7 — y resuelve la dirección de la tensión abierta del paso 4. El otro adulto no participa porque no puede: "para escoger tienes que saber qué hay, y él nunca sabe qué hay" (Karla, cuyo esposo cumplió una semana y desertó). El patrón del freezer lo confirma en todos los hogares grandes: quien no cocina abre y "no hay nada" donde hay de todo. Los sistemas de carga compartida murieron siempre (Excel de Sebastián, Bring de Paola, intento de Mariano con Andrea); el único sistema vivo multipersona es **un dueño que carga + los demás consultan** (planilla de Mariano, fotos de WhatsApp de Daniela). Implicación: el paso 4 del to-be debería apostar primero a **visibilidad compartida con carga automática** — no a simetría de carga — y la participación (elegir entre opciones) se vuelve posible recién cuando todos ven lo mismo. Riesgo que queda abierto: el bus factor del dueño único (la semana de cama de Mariano = empanadas 5 días).

> Evidencia: "Me dijo que él no sabe qué hay en la casa, que él no sabe qué se puede hacer. Y tiene razón. Para escoger tienes que saber qué hay y él nunca sabe qué hay." — Karla (E06)

> Evidencia: "Los sistemas compartidos se mueren. Este vive porque hay un solo responsable. […] Yo no creo que la gente se vuelva como yo: si hay algo que le sirva a la gente, tiene que hacer el trabajo por ellos." — Mariano (E05)

> Evidencia: "Yo escribía en la app, él escribía en el WhatsApp. Entonces yo tenía dos listas y ninguna servía." — Paola (E01)

## 5. Lo cocinado es el punto ciego del inventario: el freezer es un agujero negro y las sobras se pierden más que lo comprado

Recurrencia 5/7 — y confirma con datos reales el candidato "sobras como stock" que había aportado la crítica sintética de Tomás. Lo comprado se ve y se usa; lo cocinado y congelado desaparece: tuppers sin etiqueta que nadie descongela "para averiguar" (E04), bolsas negras que ya no se abren (E03), camarones de diciembre (E01), costillas de marzo (E06). Daniela lo nombra como patrón: "lo que compro se usa; lo que cocino de más se pierde" — y perder un tupper de porotos no es perder plata, es perder un domingo. El único que no tira etiqueta a mano con fecha y fibrón (E05). **Implicación para los pasos 2 y 7:** marcar "cociné" debe crear stock de sobras con fecha, y la sugerencia del día debería ofrecer sobras antes que recetas cuando existen.

> Evidencia: "No es que boté porotos, es que boté un domingo entero. […] Yo congelo con la mejor intención y después no sé si es salsa o si es sopa, y no lo voy a descongelar para averiguar un martes." — Daniela (E04)

> Evidencia: "Hay algo en una bolsa negra que no sé qué es y que ya no voy a abrir." — Rocío (E03)

---

## Hallazgos al margen (no llegan a insight, pero mueven decisiones)

- **Borde del segmento (caso disconfirmante):** para Verónica (E07, hogar monoparental de presupuesto ajustado y compra fija semanal) decidir qué cocinar **no es un problema** — sus dolores son plata y tiempo, y su repertorio acotado es una estrategia deliberada ("comprar cosas raras es botar plata"). El dolor de decisión no es universal: el target real es el hogar con abundancia relativa y aspiración de variedad. Confirma dejar el hogar de subsistencia fuera del ICP.
- **La ventana de decisión empieza a la mañana, no a la tarde:** la decisión real de Paola fue al sacar el pollo del congelador a la mañana; Karla "a las 6:30 no soy la misma persona que a las 10 de la noche". El trigger más temprano y accionable podría ser "¿qué descongelo hoy?" — refina la ventana del paso 3 y apoya que sea aprendida, no configurada.
- **Los cambios de hábito que sobreviven eliminan decisiones o se montan en un movimiento existente:** el plan anti-delivery de Sebastián vive porque "no me pedía decidir nada, solo tener cosas"; el tupper de Verónica vive porque "es el mismo movimiento". Los que exigen decidir o coordinar cada día murieron todos (D en E01, E03, E04, E06). Criterio de diseño transversal.
- **Comidas no cubiertas por la guía, nombradas espontáneamente en 4 wrap-ups:** loncheras/almuerzos escolares a las 6:30 am (E01, E06), la once chilena (E04), el dinero como tema ausente (E03). Candidatas para la próxima iteración de la guía o de la encuesta.
- **Fotos del refri por WhatsApp (E04):** hallazgo no previsto — el "inventario" real de Daniela es una foto en un chat, tomada justo antes de comprar. Es el techo de esfuerzo aceptado para captura manual y un formato de entrada ya naturalizado para el paso 2.

## Impacto sobre los supuestos críticos del to-be

| Paso del to-be | Supuesto | Estado tras E01–E07 |
|---|---|---|
| 2 — inventario derivado | La captura manual sostenida mata la retención | **Reforzado** (insight 1; app de inventario de E04 muerta en 1 semana) |
| 3 — sugerencia que retiene | La memoria + ventana + "con lo que hay" es lo que ChatGPT no tiene | **Reforzado con mecanismo** (insight 2: re-contexto, destiempo, credibilidad local) |
| 7 — loop perdonador | El registro exigente reproduce el churn | **Reforzado** (insight 1) + nueva spec: cocinar crea stock de sobras (insight 5) |
| 4 — modelo de hogar | Tensión jerárquico vs simétrico | **Dirección resuelta:** visibilidad compartida + un dueño de carga; la simetría de carga murió en todos los casos (insight 4) |
| 1 — objetivo que sostiene | El objetivo motiva el arranque | **Matizado:** los objetivos reales fueron plata (E02, E05, E07, E01-abril) y solo uno de salud (E04, disparado por el pediatra y roto por deserción del padre). El objetivo económico aparece más sostenible que el de salud. |
