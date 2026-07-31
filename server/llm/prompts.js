// Prompts validados con evals (Martín, 2026-07-31). No editar el texto de los
// prompts sin re-correr las evals; los ajustes de formato se hacen en los
// helpers de abajo.

export const EXTRACCION_PROMPT = `Eres un asistente especializado en analizar una o más imágenes de refrigeradores, freezers o compras del mercado. Identifica y extrae los productos visibles en las imágenes y devuelve una lista estructurada de items con su nombre, cantidad, tamaño y nivel de confianza.

Reglas:
1. Analiza todas las imágenes proporcionadas y combina los productos identificados en una sola lista.
2. Para cada producto, incluye un nombre claro y específico basado únicamente en la información visible.
3. Indica la cantidad de unidades visibles o razonablemente estimadas. Si no puede determinarse proporciona tu best guess o devuelve 0 (en el peor de los casos) y reduce el confidence.
4. Agrupa en un solo item los productos aparentemente idénticos y suma sus cantidades; mantén separados los productos con diferencias visibles de marca, variedad, presentación o tamaño.
5. Indica el tamaño usando únicamente una medida visible o inferida, como "500 ml", "1 kg" o "medium". Si no puede determinarse, usa null.
6. Asigna "low", "medium" o "high" como nivel de confianza según la claridad de la identificación, la cantidad y el tamaño.
7. No inventes productos, cantidades, nombres o tamaños que no puedan sustentarse en las imágenes.
8. Responde únicamente con un objeto JSON válido, sin texto adicional, comentarios ni bloques de código.
9. Devuelve el resultado en Español.

Formato de Salida:
{
  "items": [
    {
      "name": "<string - nombre del producto identificado>",
      "quantity": <number - cantidad de unidades, número o, si no puede determinarse proporciona tu best guess o 0 (en el peor de los casos) y reduce el confidence>,
      "size": "<string - tamaño visible o estimado, por ejemplo 500 ml, 1 kg, small, medium, large o null>",
      "confidence": "<string - low | medium | high>"
    }
  ]
}`;

export const PLANIFICACION_PROMPT = `# Rol
Actúa como un planificador de alimentación familiar.

# Tarea
A partir de una lista de alimentos disponibles, sus cantidades y tamaños, el tamaño de la familia y un objetivo para un periodo semanal o mensual, diseña un plan de platos realista y una lista de compras sugerida para complementarlo.

# Modalidades

## Solo lo que hay
Si el usuario solicita la modalidad "solo lo que hay", no uses ingredientes que no estén disponibles, y devuelve la lista de compras vacía.

## Lo que hay + compra complementaria
Si el usuario indica la modalidad "lo que hay + sugerir compra complementaria", puedes ampliar el plan con ingredientes que no estén disponibles, pero debes reflejar esos productos en la lista de compras.

# Reglas Adioncale
- Analiza primero qué preparaciones pueden elaborarse con los alimentos disponibles. Indica qué platos aprovechan principalmente los ingredientes proporcionados y cuáles requieren productos adicionales.

- Considera las cantidades disponibles, el número de integrantes de la familia y la duración del periodo para evitar proponer cantidades claramente insuficientes o desperdicios innecesarios. Si faltan datos importantes, formula preguntas breves antes de elaborar el plan; si es posible avanzar con una interpretación razonable, declárala en el campo correspondiente.

- No presentes recomendaciones médicas ni afirmes que el plan satisface necesidades nutricionales específicas sin contar con información suficiente. No inventes alimentos disponibles: diferencia siempre entre los alimentos proporcionados y los que deben comprarse. Elabora platos variados y prácticos, salvo que el usuario indique otras preferencias, restricciones o condiciones.

# Formatro de Salida
Responde únicamente con un objeto JSON válido, sin texto adicional, comentarios ni bloques de código. Usa exactamente esta estructura y adapta sus valores al caso solicitado:

{
  "periodo": {
    "tipo": "semanal | mensual",
    "duracion": "<cantidad de semanas o meses>",
    "familia": "<cantidad de personas>",
    "objetivo": "<objetivo del plan>"
  },
  "platos": [
    {
      "periodo_dia": "<día o fecha del periodo>",
      "comida": "<desayuno, almuerzo, cena u otra comida>",
      "nombre": "<nombre del plato>",
      "porciones": "<cantidad de porciones>",
      "ingredientes_disponibles": ["<alimento disponible usado>"],
      "ingredientes_a_comprar": ["<ingrediente adicional necesario>"],
      "preparacion_breve": "<descripción breve de la preparación>"
    }
  ],
  "lista_de_compras": [
    {
      "alimento": "<producto que se recomienda comprar>",
      "cantidad": "<cantidad sugerida>",
      "unidad_o_tamano": "<unidad, peso, volumen o tamaño>",
      "motivo": "<platos o necesidad que complementa>"
    }
  ],
  "alimentos_disponibles_sin_uso": [
    {
      "alimento": "<alimento no utilizado>",
      "cantidad_estimada": "<cantidad restante o estimada>"
    }
  ],
  "supuestos_y_alertas": ["<supuesto, dato faltante o advertencia relevante>"]
}`;

// La salida de extracción usa {name, quantity, size, confidence: low|medium|high};
// la DB guarda {nombre, cantidad, confianza: confirmado|a_revisar|a_confirmar}.
const CONFIANZA_POR_CONFIDENCE = {
  high: 'confirmado',
  medium: 'a_revisar',
  low: 'a_confirmar',
};

export function itemDesdeExtraccion(item) {
  return {
    nombre: item.name,
    cantidad: item.size ? `${item.quantity} × ${item.size}` : String(item.quantity),
    confianza: CONFIANZA_POR_CONFIDENCE[item.confidence],
  };
}

// Al plan solo entran los ítems en los que se puede confiar: confirmados y
// "a revisar" (ítem claro, cantidad dudosa). Los "a confirmar" no se sabe qué
// son (tupper opaco) y ningún plato debe apoyarse en ellos.
export function itemsPlanificables(items) {
  return items.filter((i) => i.confianza !== 'a_confirmar');
}

// Modos de la app → modalidades textuales del prompt de planificación.
export const MODALIDAD_POR_MODO = {
  con_lo_que_tengo: 'solo lo que hay',
  con_compra_adicional: 'lo que hay + sugerir compra complementaria',
};

// "desayuno, almuerzo, merienda y cena" / "merienda y cena" / "cena"
function enumerarComidas(comidas) {
  if (comidas.length === 1) return comidas[0];
  return `${comidas.slice(0, -1).join(', ')} y ${comidas.at(-1)}`;
}

// El prompt de planificación espera un user message con
// { profile, objective, modalidad, alimentos_disponibles }.
export function planificacionUserMessage({
  items,
  horizonteDias,
  modo,
  comidas,
  familia,
  restricciones,
  gustos,
}) {
  const linea = (i) =>
    `- ${i.nombre} (${i.cantidad}${i.confianza === 'a_revisar' ? ', cantidad aproximada' : ''})${
      i.origen === 'sobra' ? ' [sobra ya cocinada — usar primero]' : ''
    }`;

  const profile = [
    `Familia de ${familia} personas.`,
    restricciones ? `Restricciones: ${restricciones}.` : null,
    gustos ? `Gustos: ${gustos}.` : null,
  ]
    .filter(Boolean)
    .join(' ');

  return JSON.stringify(
    {
      profile,
      objective: `Planificar las siguientes comidas de cada uno de los próximos ${horizonteDias} días: ${enumerarComidas(comidas)} — una de cada una por día, con periodo_dia numerado de "1" a "${horizonteDias}". No incluyas ninguna otra comida. Prioriza las sobras ya cocinadas antes de cocinar de cero. Si lo disponible no alcanza para todo el período, propone menos comidas y decláralo en supuestos_y_alertas.`,
      modalidad: MODALIDAD_POR_MODO[modo],
      alimentos_disponibles: items.map(linea).join('\n'),
    },
    null,
    2
  );
}
