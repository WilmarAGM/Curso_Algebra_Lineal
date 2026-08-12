import { useState } from 'react'
import { ModuleShell } from '@/components/app/ModuleShell'
import { TALLER_MATRIX_M, type SectionId } from '@/data/content'
import { cn } from '@/lib/utils'

interface ModuleProps {
  onNavigate: (id: SectionId) => void
  onDone: () => void
}

function NumericCheckField({
  question,
  answer,
  tolerance = 0.01,
  onCorrect,
}: {
  question: string
  answer: number
  tolerance?: number
  onCorrect?: () => void
}) {
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(false)
  const isCorrect = Math.abs(Number(value) - answer) < tolerance

  return (
    <div className="rounded border border-line bg-surface p-4">
      <p className="text-sm text-ink">{question}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          type="number"
          step="any"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Respuesta"
          className="w-28 rounded border border-line-strong bg-surface px-3 py-1.5 font-mono-nums text-sm text-ink outline-none focus:border-pine"
        />
        <button
          onClick={() => {
            setChecked(true)
            if (Math.abs(Number(value) - answer) < tolerance) onCorrect?.()
          }}
          disabled={value === ''}
          className="rounded border border-line-strong px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-surface-raised disabled:opacity-40"
        >
          Verificar
        </button>
        {checked && (
          <span className={cn('text-sm font-medium', isCorrect ? 'text-pine' : 'text-danger')}>
            {isCorrect ? '✓ Correcto' : `✗ La respuesta correcta es ${answer}`}
          </span>
        )}
      </div>
    </div>
  )
}

function ExerciseHeader({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pine/15 font-mono-nums text-sm font-bold text-pine">
        {n}
      </span>
      <h2 className="font-display text-xl text-ink">{title}</h2>
    </div>
  )
}

export function ModuleTaller({ onNavigate, onDone }: ModuleProps) {
  const [, setDoneFlags] = useState<Record<string, boolean>>({})

  const markSub = (key: string) => {
    setDoneFlags((d) => {
      const next = { ...d, [key]: true }
      if (Object.keys(next).length >= 3) onDone()
      return next
    })
  }

  return (
    <ModuleShell
      id="taller"
      eyebrow="Módulo 07 · Semana 2"
      title="Taller de Saberes Previos y Consolidación"
      onNavigate={onNavigate}
      intro="Cinco ejercicios para consolidar sistemas de ecuaciones lineales, matrices, rango, los teoremas de esta semana y una aplicación de ingeniería. Algunos ejercicios son abiertos (para resolver en tu cuaderno o discutir en clase); otros tienen verificación numérica inmediata."
    >
      <section className="mb-14">
        <ExerciseHeader n={1} title="Clasificación geométrica" />
        <p className="text-sm leading-relaxed text-ink-muted">
          Escribe un sistema lineal de tres ecuaciones con tres variables que represente cada situación:
        </p>
        <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-muted">
          <li className="rounded border border-line bg-surface p-3">a) Tres planos paralelos no coincidentes (sistema inconsistente).</li>
          <li className="rounded border border-line bg-surface p-3">b) Tres planos que se intersectan en una única recta común (SCI).</li>
          <li className="rounded border border-line bg-surface p-3">c) Tres planos que se cortan en un único punto (SCD).</li>
        </ul>
      </section>

      <section className="mb-14">
        <ExerciseHeader n={2} title="Rango y operaciones de renglón" />
        <p className="mb-4 text-sm leading-relaxed text-ink-muted">
          Considera la matriz M. Llévala a su forma escalonada por filas (REF) y luego a su forma escalonada
          reducida (RREF).
        </p>
        <div className="mb-5 inline-flex items-stretch gap-2 rounded bg-surface-raised p-3 font-mono-nums">
          <div className="w-2 rounded-l border-y-2 border-l-2 border-line-strong" />
          <div className="flex flex-col gap-1.5 py-1">
            {TALLER_MATRIX_M.map((row, r) => (
              <div key={r} className="flex gap-4">
                {row.map((v, c) => (
                  <span key={c} className="w-6 text-center text-sm text-ink">{v}</span>
                ))}
              </div>
            ))}
          </div>
          <div className="w-2 rounded-r border-y-2 border-r-2 border-line-strong" />
        </div>
        <p className="mb-4 text-sm leading-relaxed text-ink-muted">
          Si M fuera la matriz de coeficientes de un sistema homogéneo Mx = 0 con x = [x₁, x₂, x₃, x₄]ᵀ, identifica
          las variables pivote y libres, y escribe el conjunto solución en forma paramétrica.
        </p>
        <div className="flex flex-col gap-3">
          <NumericCheckField question="¿Cuál es el rango de M?" answer={2} onCorrect={() => markSub('m-rango')} />
          <NumericCheckField
            question="¿Cuántas variables libres tiene el sistema homogéneo Mx = 0 (n = 4)?"
            answer={2}
            onCorrect={() => markSub('m-libres')}
          />
        </div>
      </section>

      <section className="mb-14">
        <ExerciseHeader n={3} title="Discusión del Teorema del Rango" />
        <p className="text-sm leading-relaxed text-ink-muted">
          Demuestra que si un sistema lineal Ax = b es consistente y tiene más variables que ecuaciones (n &gt; m),
          entonces el sistema obligatoriamente tiene infinitas soluciones. Usa las propiedades del rango y el
          Teorema del Rango en tu demostración.
        </p>
        <p className="mt-2 text-xs text-ink-muted">
          Pista: el rango de una matriz nunca puede superar su número de filas.
        </p>
      </section>

      <section className="mb-14">
        <ExerciseHeader n={4} title="Análisis paramétrico por Rouché-Capelli" />
        <p className="mb-4 font-mono-nums text-sm leading-relaxed text-ink-muted">
          x − 2y + 3z = 1{'\n'}2x + y + z = 2{'\n'}−3x + y + az = b
        </p>
        <p className="mb-4 text-sm leading-relaxed text-ink-muted">
          Determina las condiciones sobre los parámetros a y b para que el sistema tenga: (a) solución única, (b)
          infinitas soluciones, (c) ninguna solución.
        </p>
        <NumericCheckField
          question="Para empezar: ¿para qué valor de a la matriz de coeficientes se vuelve singular (determinante = 0)?"
          answer={-4}
          onCorrect={() => markSub('rc-a')}
        />
        <p className="mt-3 text-xs text-ink-muted">
          Con ese valor de a fijo, sigue reduciendo por filas en términos de b para encontrar la condición que separa
          el caso (b) del caso (c).
        </p>
      </section>

      <section>
        <ExerciseHeader n={5} title="Flujo de tránsito urbano (modelación de redes)" />
        <p className="mb-5 text-sm leading-relaxed text-ink-muted">
          La red muestra el flujo de vehículos (por hora) en cuatro intersecciones A, B, C y D durante la hora pico.
          Las calles son de un solo sentido. En cada intersección, <strong>el flujo de entrada es igual al flujo de
          salida</strong>.
        </p>

        <TrafficDiagram />

        <p className="mt-5 mb-4 text-sm leading-relaxed text-ink-muted">
          a) Deduce el sistema de ecuaciones lineales para el flujo en cada intersección. b) Escribe la matriz
          aumentada y llévala a su RREF mediante Gauss-Jordan. c) Determina el rango y el número de variables
          libres; escribe la solución general en términos de las variables libres. d) Si la calle de x₅ debe
          cerrarse (x₅ = 0), determina los flujos restantes. ¿Es factible, considerando que todo flujo debe ser no
          negativo?
        </p>

        <NumericCheckField
          question="Con x₅ = 0, ¿cuál es el mayor valor entero de x₄ para el cual todos los flujos siguen siendo no negativos?"
          answer={200}
          onCorrect={() => markSub('traffic')}
        />
      </section>
    </ModuleShell>
  )
}

function TrafficDiagram() {
  return (
    <div className="overflow-x-auto rounded border border-line bg-surface p-4">
      <svg viewBox="0 0 420 240" className="mx-auto h-auto w-full max-w-xl" role="img" aria-label="Red de tránsito con intersecciones A, B, C, D">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
          </marker>
        </defs>
        <g className="text-ink-muted" stroke="currentColor" fill="none" strokeWidth="1.5">
          {/* nodes */}
          <circle cx="90" cy="60" r="22" className="text-line-strong" fill="none" />
          <circle cx="330" cy="60" r="22" className="text-line-strong" fill="none" />
          <circle cx="90" cy="180" r="22" className="text-line-strong" fill="none" />
          <circle cx="330" cy="180" r="22" className="text-line-strong" fill="none" />
        </g>
        <g className="text-ink font-mono-nums" fontSize="15" fontWeight="700" textAnchor="middle">
          <text x="90" y="65">A</text>
          <text x="330" y="65">B</text>
          <text x="90" y="185">C</text>
          <text x="330" y="185">D</text>
        </g>

        {/* internal flows */}
        <g className="text-pine" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)">
          <line x1="114" y1="60" x2="306" y2="60" />
          <line x1="90" y1="84" x2="90" y2="156" />
          <line x1="306" y1="180" x2="114" y2="180" />
          <line x1="330" y1="84" x2="330" y2="156" />
          <line x1="108" y1="164" x2="312" y2="76" />
        </g>
        <g className="text-pine font-mono-nums" fontSize="13" textAnchor="middle">
          <text x="200" y="52">x₁</text>
          <text x="72" y="122">x₂</text>
          <text x="200" y="196">x₃</text>
          <text x="348" y="122">x₄</text>
          <text x="230" y="110">x₅</text>
        </g>

        {/* external inflows */}
        <g className="text-leaf" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)">
          <line x1="20" y1="60" x2="66" y2="60" />
          <line x1="90" y1="238" x2="90" y2="204" />
        </g>
        <g className="text-leaf font-mono-nums" fontSize="13" fontWeight="700">
          <text x="18" y="48">500</text>
          <text x="96" y="228">200</text>
        </g>

        {/* external outflows */}
        <g className="text-ember" stroke="currentColor" strokeWidth="2" markerEnd="url(#arrow)">
          <line x1="330" y1="36" x2="330" y2="4" />
          <line x1="66" y1="180" x2="20" y2="180" />
        </g>
        <g className="text-ember font-mono-nums" fontSize="13" fontWeight="700">
          <text x="336" y="16">300</text>
          <text x="18" y="168">400</text>
        </g>
      </svg>
      <p className="mt-2 text-center text-xs text-ink-muted">
        <span className="text-leaf font-medium">500 y 200 entran</span> a la red por A y D ·{' '}
        <span className="text-ember font-medium">300 y 400 salen</span> de la red por B y C.
      </p>
    </div>
  )
}
