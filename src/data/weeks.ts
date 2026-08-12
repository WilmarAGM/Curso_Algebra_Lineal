import type { SectionId } from '@/data/content'

export interface Week {
  number: number
  title: string
  status: 'disponible' | 'proximamente'
  summary: string
  unidad?: string
  hubId?: SectionId
}

export const WEEKS: Week[] = [
  {
    number: 1,
    title: 'Sistemas lineales, matrices y su clasificación',
    status: 'disponible',
    unidad: 'Unidad 1 · Álgebra Matricial',
    summary:
      'Encuadre metodológico y diagnóstico de saberes previos. Definición de sistemas de ecuaciones lineales (SEL), clasificación (SCD, SCI, SI) e interpretación geométrica. Definición y clasificación de matrices y operaciones elementales de renglón.',
    hubId: 'semana1',
  },
  {
    number: 2,
    title: 'Rango, Gauss-Jordan y Rouché-Capelli',
    status: 'disponible',
    unidad: 'Unidad 1 · Álgebra Matricial',
    summary:
      'Rango de una matriz y variables libres. Eliminación de Gauss y Gauss-Jordan. Teorema del Rango y Teorema de Rouché-Capelli. Taller de consolidación con aplicaciones de ingeniería.',
    hubId: 'semana2',
  },
  {
    number: 3,
    title: 'Determinantes e inversa de una matriz',
    status: 'proximamente',
    unidad: 'Unidad 1 · Álgebra Matricial',
    summary: 'Definición y clasificación de determinantes. Cálculo de la inversa de una matriz.',
  },
  {
    number: 4,
    title: 'Profundización: inversa y Gauss-Jordan',
    status: 'proximamente',
    unidad: 'Unidad 1 · Álgebra Matricial',
    summary:
      'Consolidación de la inversa de una matriz cuadrada y del método de Gauss-Jordan. Quiz Unidad 1 (5%) — 26 de agosto.',
  },
  {
    number: 5,
    title: 'Evaluación Unidad 1',
    status: 'proximamente',
    unidad: 'Unidad 1 · Álgebra Matricial',
    summary:
      'Simulacro del parcial (5%) — 9 de septiembre. Parcial 1 (20%) — 11 de septiembre. Inicio Unidad 2: vectores en R² y R³.',
  },
  {
    number: 6,
    title: 'Operaciones con vectores',
    status: 'proximamente',
    unidad: 'Unidad 2 · Vectores en el Plano y el Espacio',
    summary: 'Operaciones con vectores (suma, resta, multiplicación por escalar).',
  },
  {
    number: 7,
    title: 'Producto interno y vector unitario',
    status: 'proximamente',
    unidad: 'Unidad 2 · Vectores en el Plano y el Espacio',
    summary: 'Producto interno en R² y R³. Vector unitario.',
  },
  {
    number: 8,
    title: 'Ortogonalidad',
    status: 'proximamente',
    unidad: 'Unidad 2 · Vectores en el Plano y el Espacio',
    summary: 'Propiedades del producto interno. Vectores ortogonales.',
  },
  {
    number: 9,
    title: 'Proyección de vectores',
    status: 'proximamente',
    unidad: 'Unidad 2 · Vectores en el Plano y el Espacio',
    summary:
      'Proyección de un vector sobre otro. Taller de repaso. Quiz Unidad 2 (5%) — 30 de septiembre.',
  },
  {
    number: 10,
    title: 'Evaluación Unidad 2',
    status: 'proximamente',
    unidad: 'Unidad 2 · Vectores en el Plano y el Espacio',
    summary:
      'Simulacro del parcial (5%) — 7 de octubre. Parcial 2 (20%) — 9 de octubre. Inicio Unidad 3: espacios y subespacios vectoriales.',
  },
  {
    number: 11,
    title: 'Bases de un espacio vectorial',
    status: 'proximamente',
    unidad: 'Unidad 3 · Espacios Vectoriales y Transformaciones Lineales',
    summary: 'Determinación de bases de un espacio vectorial.',
  },
  {
    number: 12,
    title: 'Ortogonalidad y ortonormalidad',
    status: 'proximamente',
    unidad: 'Unidad 3 · Espacios Vectoriales y Transformaciones Lineales',
    summary: 'Conjuntos ortogonales y ortonormales.',
  },
  {
    number: 13,
    title: 'Valores y vectores propios',
    status: 'proximamente',
    unidad: 'Unidad 3 · Espacios Vectoriales y Transformaciones Lineales',
    summary: 'Vectores y valores propios de una matriz cuadrada.',
  },
  {
    number: 14,
    title: 'Diagonalización',
    status: 'proximamente',
    unidad: 'Unidad 3 · Espacios Vectoriales y Transformaciones Lineales',
    summary: 'Matrices diagonalizables.',
  },
  {
    number: 15,
    title: 'Transformaciones lineales',
    status: 'proximamente',
    unidad: 'Unidad 3 · Espacios Vectoriales y Transformaciones Lineales',
    summary:
      'Transformaciones lineales: kernel y rango. Representación matricial. Quiz Unidad 3 (10%) — 11 de noviembre.',
  },
  {
    number: 16,
    title: 'Evaluación Unidad 3',
    status: 'proximamente',
    unidad: 'Unidad 3 · Espacios Vectoriales y Transformaciones Lineales',
    summary:
      'Simulacro del parcial (10%) — 20 de noviembre. Parcial 3 (20%) — 25 de noviembre. Evaluación final del curso.',
  },
]
