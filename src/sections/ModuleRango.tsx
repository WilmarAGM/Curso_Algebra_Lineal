import { useState } from 'react'
import { ModuleShell } from '@/components/app/ModuleShell'
import { RANGO_TEACHING_EXAMPLE, type SectionId } from '@/data/content'
import { cn } from '@/lib/utils'

interface ModuleProps {
  onNavigate: (id: SectionId) => void
  onDone: () => void
}

export function ModuleRango({ onNavigate, onDone }: ModuleProps) {
  const [step, setStep] = useState(0)
  const [selectedCols, setSelectedCols] = useState<number[]>([])
  const [checked, setChecked] = useState(false)

  const toggleCol = (c: number) => {
    if (checked) return
    setSelectedCols((cols) => (cols.includes(c) ? cols.filter((x) => x !== c) : [...cols, c]))
  }

  const verify = () => {
    setChecked(true)
    onDone()
  }

  const isFullyRevealed = step === RANGO_TEACHING_EXAMPLE.steps.length - 1
  const pivotSet = new Set(RANGO_TEACHING_EXAMPLE.pivotCols)
  const guessCorrect =
    selectedCols.length === RANGO_TEACHING_EXAMPLE.pivotCols.length &&
    selectedCols.every((c) => pivotSet.has(c))

  return (
    <ModuleShell
      id="rango"
      eyebrow="Módulo 04 · Semana 2"
      title="Rango de una Matriz y Variables Libres"
      onNavigate={onNavigate}
      intro="El rango de una matriz A es el número de pivotes (filas no nulas) tras llevarla a su forma escalonada por filas. Las columnas con pivote son columnas pivotales (variables dependientes); las demás corresponden a variables libres."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded border border-line bg-surface p-4">
          <span className="font-display text-base text-pine">Pivote</span>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
            Primera entrada distinta de cero en una fila no nula de la forma escalonada.
          </p>
        </div>
        <div className="rounded border border-line bg-surface p-4">
          <span className="font-display text-base text-pine">Variable libre</span>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
            Corresponde a una columna sin pivote; puede tomar cualquier valor real y actúa como parámetro en la solución.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl text-ink">Ejemplo paso a paso</h2>
        <p className="mt-1 mb-5 text-sm text-ink-muted">
          Llevemos esta matriz a su forma escalonada y determinemos su rango.
        </p>

        <div className="flex flex-col gap-2">
          {RANGO_TEACHING_EXAMPLE.steps.slice(0, step + 1).map((s) => (
            <div key={s.label} className="animate-in fade-in slide-in-from-bottom-1 rounded border border-line bg-surface p-4 duration-300">
              <span className="text-xs uppercase tracking-wide text-warm">{s.label}</span>
              <div className="mt-2 inline-flex flex-col gap-1 font-mono-nums text-sm text-ink">
                {s.rows.map((row, r) => (
                  <div key={r} className="flex gap-4">
                    {row.map((v, c) => (
                      <span key={c} className="w-6 text-center">{v}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!isFullyRevealed && (
          <button
            onClick={() => setStep((s) => Math.min(s + 1, RANGO_TEACHING_EXAMPLE.steps.length - 1))}
            className="mt-4 rounded bg-pine px-4 py-2 text-sm font-medium text-pine-foreground transition hover:opacity-90"
          >
            Siguiente paso →
          </button>
        )}

        {isFullyRevealed && (
          <div className="mt-6 rounded border border-line bg-surface p-5">
            <p className="text-sm text-ink">
              Hay <strong className="text-pine">2 pivotes</strong> → rango(A) = 2. Con n = 3 columnas, hay{' '}
              <strong className="text-warm">1 variable libre</strong>.
            </p>
            <p className="mt-3 text-sm text-ink-muted">
              Haz clic en las columnas de la forma escalonada final que consideres <strong>pivotales</strong>:
            </p>
            <div className="mt-3 flex gap-2">
              {[0, 1, 2].map((c) => (
                <button
                  key={c}
                  onClick={() => toggleCol(c)}
                  disabled={checked}
                  className={cn(
                    'rounded border px-4 py-2 text-sm font-mono-nums transition',
                    selectedCols.includes(c) ? 'border-pine bg-pine/15 text-pine' : 'border-line-strong text-ink hover:border-pine/50',
                    checked && pivotSet.has(c) && 'border-pine bg-pine/15 text-pine',
                    checked && !pivotSet.has(c) && selectedCols.includes(c) && 'border-danger bg-danger/10 text-danger',
                  )}
                >
                  Columna {c + 1}
                </button>
              ))}
            </div>
            <button
              onClick={verify}
              disabled={selectedCols.length === 0 || checked}
              className="mt-4 rounded border border-line-strong px-4 py-2 text-sm font-medium text-ink transition hover:bg-surface-raised disabled:opacity-40"
            >
              Verificar
            </button>
            {checked && (
              <p className={cn('mt-3 text-sm font-medium', guessCorrect ? 'text-pine' : 'text-danger')}>
                {guessCorrect
                  ? '✓ Correcto — las columnas 1 y 2 son pivotales; la columna 3 es libre.'
                  : '✗ Las columnas pivotales son la 1 y la 2 (donde aparece el primer valor no nulo de cada fila no nula); la columna 3 queda libre.'}
              </p>
            )}
          </div>
        )}
      </div>
    </ModuleShell>
  )
}
