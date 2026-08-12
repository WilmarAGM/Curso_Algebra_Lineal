// ---------------------------------------------------------------
// Contenido del curso de Álgebra Lineal — Semana 1 y 2.
// Todo el contenido matemático proviene de guia-clase-semana1y2.tex
// (auditada y corregida: red de tránsito balanceada, ejercicio de
// Rouché-Capelli con caso paramétrico real).
// ---------------------------------------------------------------

export type SectionId =
  | 'inicio'
  | 'semana1'
  | 'semana2'
  | 'selDefinicion'
  | 'selClasificacion'
  | 'matrices'
  | 'rango'
  | 'algoritmos'
  | 'roucheCapelli'
  | 'taller'

export const MODULES_SEMANA1: { id: SectionId; short: string; title: string }[] = [
  { id: 'selDefinicion', short: '01', title: 'Sistemas de Ecuaciones Lineales' },
  { id: 'selClasificacion', short: '02', title: 'Clasificación de los SEL' },
  { id: 'matrices', short: '03', title: 'Matrices y Operaciones Elementales' },
]

export const MODULES_SEMANA2: { id: SectionId; short: string; title: string }[] = [
  { id: 'rango', short: '04', title: 'Rango de una Matriz y Variables Libres' },
  { id: 'algoritmos', short: '05', title: 'Eliminación de Gauss y Gauss-Jordan' },
  { id: 'roucheCapelli', short: '06', title: 'Teorema del Rango y Rouché-Capelli' },
  { id: 'taller', short: '07', title: 'Taller de Consolidación' },
]

export const ALL_MODULES = [...MODULES_SEMANA1, ...MODULES_SEMANA2]

// ---- Evaluación del curso (Unidad 1 · Álgebra Matricial) ----
export interface EvalStage {
  label: string
  peso: string
  fecha: string
}

export interface UnitSchedule {
  unidad: string
  competencia: string
  stages: EvalStage[]
}

export const EVAL_SCHEDULE: UnitSchedule[] = [
  {
    unidad: 'Unidad 1 · Álgebra Matricial',
    competencia: 'Aplicar los sistemas de ecuaciones lineales y matrices en problemas de ingeniería',
    stages: [
      { label: 'Quiz', peso: '5%', fecha: '26 de agosto' },
      { label: 'Simulacro del parcial', peso: '5%', fecha: '9 de septiembre' },
      { label: 'Parcial 1', peso: '20%', fecha: '11 de septiembre' },
    ],
  },
  {
    unidad: 'Unidad 2 · Vectores en el Plano y el Espacio',
    competencia: 'Aplicar operaciones de vectores en Rⁿ en fenómenos de la industria',
    stages: [
      { label: 'Quiz', peso: '5%', fecha: '30 de septiembre' },
      { label: 'Simulacro del parcial', peso: '5%', fecha: '7 de octubre' },
      { label: 'Parcial 2', peso: '20%', fecha: '9 de octubre' },
    ],
  },
  {
    unidad: 'Unidad 3 · Espacios Vectoriales y Transformaciones Lineales',
    competencia: 'Aplicar los vectores en n dimensiones en los espacios y subespacios vectoriales',
    stages: [
      { label: 'Quiz', peso: '10%', fecha: '11 de noviembre' },
      { label: 'Simulacro del parcial', peso: '10%', fecha: '20 de noviembre' },
      { label: 'Parcial 3', peso: '20%', fecha: '25 de noviembre' },
    ],
  },
]

export interface SupportMaterial {
  title: string
  description: string
  file: string
}

export const SUPPORT_MATERIALS: SupportMaterial[] = [
  {
    title: 'Temario Semanal — Álgebra Lineal',
    description: 'Cronograma oficial de las 16 semanas del curso: unidades, temas y fechas de quiz, simulacro y parcial.',
    file: '/docs/Temario_Semanal.pdf',
  },
  {
    title: 'Guía de Clase — Semanas 1 y 2',
    description: 'Sistemas de ecuaciones lineales, matrices, rango, eliminación de Gauss y Gauss-Jordan, Teorema del Rango y Rouché-Capelli.',
    file: '/docs/Guia_Clase_Semana1y2.pdf',
  },
]

// ---- Módulo 01: Definición de SEL ----
export interface LinearClassifyItem {
  expr: string
  isLinear: boolean
  explain: string
}

export const LINEAR_CLASSIFY_ITEMS: LinearClassifyItem[] = [
  { expr: '3x − 5y + z = 7', isLinear: true, explain: 'Todas las variables aparecen a la primera potencia y no se multiplican entre sí: es lineal.' },
  { expr: 'x² + y = 4', isLinear: false, explain: 'La variable x está elevada al cuadrado: no es lineal.' },
  { expr: '2x + 3xy = 10', isLinear: false, explain: 'El término 3xy es un producto de dos variables: no es lineal.' },
  { expr: '√x + y = 5', isLinear: false, explain: 'La raíz de una variable no es una operación lineal: no es lineal.' },
  { expr: 'x₁ − 2x₂ + 4x₃ = 0', isLinear: true, explain: 'Tres variables, todas a la primera potencia, sin productos entre ellas: es lineal.' },
  { expr: 'sen(x) + y = 1', isLinear: false, explain: 'La función seno aplicada a una variable no es lineal.' },
  { expr: '5 = 2x − y', isLinear: true, explain: 'Es la misma estructura lineal, solo reordenada: es lineal.' },
  { expr: '1/x + y = 3', isLinear: false, explain: '1/x equivale a x⁻¹: una potencia negativa, no permitida en una ecuación lineal.' },
]

export const CEREAL_PROBLEM = {
  table: [
    { nutriente: 'Carbohidratos', c1: 50, c2: 40, c3: 30, requerido: 110 },
    { nutriente: 'Proteínas', c1: 10, c2: 8, c3: 12, requerido: 26 },
    { nutriente: 'Grasas', c1: 4, c2: 2, c3: 6, requerido: 12 },
  ],
  steps: [
    { label: 'Sistema planteado', expr: '50x₁ + 40x₂ + 30x₃ = 110\n10x₁ + 8x₂ + 12x₃ = 26\n4x₁ + 2x₂ + 6x₃ = 12' },
    { label: 'Simplificado (÷10, ÷2)', expr: '5x₁ + 4x₂ + 3x₃ = 11\n5x₁ + 4x₂ + 6x₃ = 13\n4x₁ + 2x₂ + 6x₃ = 12' },
    {
      label: 'Matriz aumentada [A | b]',
      expr: '⎡ 5  4  3 ⎥ 11 ⎤\n⎢ 5  4  6 ⎥ 13 ⎥\n⎣ 4  2  6 ⎥ 12 ⎦',
    },
  ],
}

// ---- Módulo 02: Clasificación de SEL ----
export type SelType = 'SCD' | 'SCI' | 'SI'

export const SEL_TYPES: { type: SelType; name: string; text: string }[] = [
  { type: 'SCD', name: 'Consistente Determinado', text: 'Exactamente una solución. En el plano: las rectas se cortan en un único punto.' },
  { type: 'SCI', name: 'Consistente Indeterminado', text: 'Infinitas soluciones (hay variables libres). En el plano: las rectas son coincidentes.' },
  { type: 'SI', name: 'Inconsistente', text: 'Ninguna solución, conjunto solución vacío. En el plano: rectas paralelas no coincidentes.' },
]

export interface SelClassifyItem {
  eq1: string
  eq2: string
  type: SelType
  explain: string
}

export const SEL_WORKED_SYSTEMS: SelClassifyItem[] = [
  { eq1: 'x + y = 3', eq2: 'x − y = 1', type: 'SCD', explain: 'Sumando ambas ecuaciones: 2x = 4 ⇒ x = 2, y = 1. Solución única (2, 1).' },
  { eq1: 'x + y = 3', eq2: '2x + 2y = 6', type: 'SCI', explain: 'La segunda ecuación es el doble de la primera: son la misma recta. Infinitas soluciones (3−t, t).' },
  { eq1: 'x + y = 3', eq2: 'x + y = 1', type: 'SI', explain: 'x + y no puede valer 3 y 1 a la vez: al restar se obtiene 0 = 2, una contradicción.' },
]

export const SEL_PRACTICE_SYSTEMS: SelClassifyItem[] = [
  { eq1: 'x + y = 4', eq2: 'x − y = 2', type: 'SCD', explain: 'Sumando: 2x = 6 ⇒ x = 3, y = 1. Rectas que se cortan en un único punto.' },
  { eq1: 'x − y = 1', eq2: '2x − 2y = 2', type: 'SCI', explain: 'La segunda ecuación es el doble de la primera: rectas coincidentes.' },
  { eq1: 'x + y = 5', eq2: '2x + 2y = 6', type: 'SI', explain: 'Si x+y=5 entonces 2x+2y=10, no 6: contradicción, rectas paralelas.' },
]

// ---- Módulo 03: Matrices ----
export type MatrixKind = 'diagonal' | 'identidad' | 'triSup' | 'triInf' | 'simetrica' | 'ninguna'

export const MATRIX_KIND_LABEL: Record<MatrixKind, string> = {
  diagonal: 'Diagonal',
  identidad: 'Identidad',
  triSup: 'Triangular Superior',
  triInf: 'Triangular Inferior',
  simetrica: 'Simétrica',
  ninguna: 'Ninguna de las anteriores',
}

export interface MatrixClassifyItem {
  rows: number[][]
  kind: MatrixKind
  explain: string
}

export const MATRIX_CLASSIFY_ITEMS: MatrixClassifyItem[] = [
  {
    rows: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    kind: 'identidad',
    explain: 'Diagonal con unos en toda la diagonal principal: es la matriz Identidad I₃.',
  },
  {
    rows: [
      [2, 0, 0],
      [0, -3, 0],
      [0, 0, 5],
    ],
    kind: 'diagonal',
    explain: 'Todas las entradas fuera de la diagonal principal son cero: es Diagonal (pero no Identidad).',
  },
  {
    rows: [
      [1, 2, 3],
      [0, 5, 6],
      [0, 0, 9],
    ],
    kind: 'triSup',
    explain: 'Todas las entradas debajo de la diagonal principal son cero: es Triangular Superior.',
  },
  {
    rows: [
      [4, 0, 0],
      [1, 2, 0],
      [3, 5, 6],
    ],
    kind: 'triInf',
    explain: 'Todas las entradas encima de la diagonal principal son cero: es Triangular Inferior.',
  },
  {
    rows: [
      [1, 2, 3],
      [2, 4, 5],
      [3, 5, 6],
    ],
    kind: 'simetrica',
    explain: 'aᵢⱼ = aⱼᵢ para todo i, j (es igual a su transpuesta): es Simétrica.',
  },
  {
    rows: [
      [1, 2, 0],
      [3, 4, 0],
      [0, 0, 5],
    ],
    kind: 'ninguna',
    explain: 'No es diagonal (tiene entradas 2 y 3 fuera de la diagonal), ni triangular, ni simétrica (a₁₂=2 ≠ a₂₁=3).',
  },
]

export const ROW_OPERATIONS = [
  { name: 'Intercambio', rule: 'Rᵢ ↔ Rⱼ', text: 'Intercambiar de lugar dos filas.' },
  { name: 'Escalamiento', rule: 'Rᵢ ← cRᵢ, c ≠ 0', text: 'Multiplicar una fila por un escalar no nulo.' },
  { name: 'Adición', rule: 'Rᵢ ← Rᵢ + kRⱼ', text: 'Sumar a una fila el múltiplo de otra fila.' },
]

export interface RowOpQuizItem {
  before: string
  after: string
  answer: 'Intercambio' | 'Escalamiento' | 'Adición'
}

export const ROW_OP_QUIZ: RowOpQuizItem[] = [
  { before: '[2, 4, 6]', after: '[1, 2, 3]', answer: 'Escalamiento' },
  { before: 'R₁=[1,2,3], R₂=[4,5,6]', after: 'R₁=[4,5,6], R₂=[1,2,3]', answer: 'Intercambio' },
  { before: 'R₁=[1,2,3], R₂=[2,7,9]', after: 'R₁=[1,2,3], R₂=[0,3,3]', answer: 'Adición' },
  { before: '[3, −6, 9]', after: '[1, −2, 3]', answer: 'Escalamiento' },
]

// ---- Módulo 04: Rango y variables libres ----
export const RANGO_TEACHING_EXAMPLE = {
  original: [
    [1, 1, 2],
    [2, 2, 4],
    [1, -1, 0],
  ],
  steps: [
    { label: 'Matriz original', rows: [[1, 1, 2], [2, 2, 4], [1, -1, 0]] },
    { label: 'R₂ ← R₂ − 2R₁', rows: [[1, 1, 2], [0, 0, 0], [1, -1, 0]] },
    { label: 'R₃ ← R₃ − R₁', rows: [[1, 1, 2], [0, 0, 0], [0, -2, -2]] },
    { label: 'Intercambio R₂ ↔ R₃ (forma escalonada)', rows: [[1, 1, 2], [0, -2, -2], [0, 0, 0]] },
  ],
  rango: 2,
  pivotCols: [0, 1],
  freeCols: [2],
}

// ---- Módulo 05: Gauss y Gauss-Jordan (reutiliza los ejemplos de la guía) ----
export const GAUSS_EXAMPLE = {
  intro: 'Resolvamos el sistema de los cereales (Módulo 01) por Eliminación de Gauss con sustitución hacia atrás.',
  steps: [
    { label: 'Matriz aumentada inicial', expr: '⎡ 5  4  3 ⎥ 11 ⎤\n⎢ 5  4  6 ⎥ 13 ⎥\n⎣ 4  2  6 ⎥ 12 ⎦' },
    { label: 'R₂ ← R₂ − R₁', expr: '⎡ 5  4  3 ⎥ 11 ⎤\n⎢ 0  0  3 ⎥  2 ⎥\n⎣ 4  2  6 ⎥ 12 ⎦' },
    { label: 'R₃ ← 5R₃, luego R₃ ← R₃ − 4R₁', expr: '⎡ 5  4  3 ⎥ 11 ⎤\n⎢ 0  0  3 ⎥  2 ⎥\n⎣ 0 −6 18 ⎥ 16 ⎦' },
    { label: 'Intercambio R₂ ↔ R₃ (forma escalonada)', expr: '⎡ 5   4  3 ⎥ 11 ⎤\n⎢ 0  −6 18 ⎥ 16 ⎥\n⎣ 0   0  3 ⎥  2 ⎦' },
    { label: 'Sustitución hacia atrás', expr: 'x₃ = 2/3 ≈ 0.667\nx₂ = −2/3 ≈ −0.667\nx₁ = 7/3 ≈ 2.333' },
  ],
  discussion:
    'x₂ resulta negativo, pero las variables representan cientos de gramos de cereal: una porción negativa es físicamente imposible. Este requerimiento nutricional no se puede lograr con estos tres cereales.',
}

export const GAUSS_JORDAN_EXAMPLE = {
  intro: 'Resolvamos por Gauss-Jordan un sistema con infinitas soluciones: x₁ − x₂ + 2x₃ = 4, 2x₁ + 2x₂ − 2x₃ = 2, 3x₁ + x₂ = 6.',
  steps: [
    { label: 'Matriz aumentada inicial', expr: '⎡ 1 −1  2 ⎥ 4 ⎤\n⎢ 2  2 −2 ⎥ 2 ⎥\n⎣ 3  1  0 ⎥ 6 ⎦' },
    { label: 'R₂ ← R₂ − 2R₁, R₃ ← R₃ − 3R₁', expr: '⎡ 1 −1  2 ⎥ 4 ⎤\n⎢ 0  4 −6 ⎥ −6 ⎥\n⎣ 0  4 −6 ⎥ −6 ⎦' },
    { label: 'R₃ ← R₃ − R₂ (forma escalonada, REF)', expr: '⎡ 1 −1  2 ⎥ 4 ⎤\n⎢ 0  4 −6 ⎥ −6 ⎥\n⎣ 0  0  0 ⎥ 0 ⎦' },
    { label: 'R₂ ← ¼R₂, luego R₁ ← R₁ + R₂ (RREF)', expr: '⎡ 1  0  1/2 ⎥ 5/2 ⎤\n⎢ 0  1 −3/2 ⎥ −3/2 ⎥\n⎣ 0  0   0  ⎥  0  ⎦' },
    { label: 'Solución paramétrica (x₃ = t)', expr: 'x₁ = 5/2 − t/2\nx₂ = −3/2 + 3t/2\nx₃ = t,  t ∈ ℝ' },
  ],
  discussion:
    'rango(A) = 2 < n = 3, así que hay 1 variable libre (x₃). Las infinitas soluciones forman una recta en ℝ³ que pasa por (5/2, −3/2, 0) con dirección (−1/2, 3/2, 1).',
}

export interface NumericCheck {
  question: string
  answer: number
  tolerance?: number
}

export const GAUSS_COMPREHENSION: NumericCheck[] = [
  { question: '¿Cuál es el rango de la matriz de coeficientes A en el ejemplo de los cereales (3 pivotes)?', answer: 3 },
  { question: 'En la solución del sistema de infinitas soluciones, ¿cuál es el valor de x₁ cuando t = 0?', answer: 2.5 },
  { question: '¿Cuántas variables libres tiene el sistema de infinitas soluciones (n=3, rango=2)?', answer: 1 },
]

// ---- Módulo 06: Teorema del Rango y Rouché-Capelli (ejemplo real de la guía) ----
export const ROUCHE_EXAMPLE = {
  system: 'x + y + z = 2,   2x + 3y + 2z = 5,   2x + 3y + (a² − 1)z = a + 3',
  steps: [
    { label: 'Matriz aumentada', expr: '⎡ 1  1     1    ⎥   2   ⎤\n⎢ 2  3     2    ⎥   5   ⎥\n⎣ 2  3  a²−1    ⎥ a+3   ⎦' },
    { label: 'R₂ ← R₂ − 2R₁, R₃ ← R₃ − 2R₁', expr: '⎡ 1  1    1  ⎥   2  ⎤\n⎢ 0  1    0  ⎥   1  ⎥\n⎣ 0  1  a²−3 ⎥ a−1  ⎦' },
    { label: 'R₃ ← R₃ − R₂ (forma escalonada)', expr: '⎡ 1  1    1  ⎥   2  ⎤\n⎢ 0  1    0  ⎥   1  ⎥\n⎣ 0  0  a²−3 ⎥ a−2  ⎦' },
  ],
  cases: [
    { condition: 'a ≠ √3 y a ≠ −√3', result: 'rango(A) = rango([A|b]) = 3 = n → Solución única.' },
    { condition: 'a = √3  (o a = −√3)', result: 'rango(A) = 2 < rango([A|b]) = 3 → Sistema inconsistente (sin solución).' },
    { condition: '¿Infinitas soluciones?', result: 'Requeriría a² − 3 = 0 y a − 2 = 0 a la vez; ningún real cumple ambas: nunca ocurre.' },
  ],
}

export const ROUCHE_COMPREHENSION: NumericCheck[] = [
  { question: '¿Cuál es el valor positivo de a para el cual el sistema se vuelve inconsistente? (√3 ≈ 1.732)', answer: 1.732, tolerance: 0.01 },
]

// ---- Módulo 07: Taller de consolidación ----
export const TALLER_MATRIX_M = [
  [1, 2, -1, 3],
  [-2, -4, 4, -10],
  [3, 6, -5, 13],
]

export const TRAFFIC_FLOWS = {
  inflows: [
    { node: 'A', value: 500 },
    { node: 'D', value: 200 },
  ],
  outflows: [
    { node: 'B', value: 300 },
    { node: 'C', value: 400 },
  ],
}
