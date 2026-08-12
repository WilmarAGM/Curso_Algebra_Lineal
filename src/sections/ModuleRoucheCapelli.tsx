import { useState } from 'react'
import { ModuleShell } from '@/components/app/ModuleShell'
import { ROUCHE_EXAMPLE, ROUCHE_COMPREHENSION, type SectionId } from '@/data/content'
import { cn } from '@/lib/utils'

interface ModuleProps {
  onNavigate: (id: SectionId) => void
  onDone: () => void
}

export function ModuleRoucheCapelli({ onNavigate, onDone }: ModuleProps) {
  const [step, setStep] = useState(0)
  const [showCases, setShowCases] = useState(false)
  const [inputs, setInputs] = useState<Record<number, string>>({})
  const [checked, setChecked] = useState<Record<number, boolean>>({})

  const revealCases = () => {
    setShowCases(true)
    onDone()
  }

  const check = (i: number) => setChecked((c) => ({ ...c, [i]: true }))

  return (
    <ModuleShell
      id="roucheCapelli"
      eyebrow="Módulo 06 · Semana 2"
      title="Teorema del Rango y Rouché-Capelli"
      onNavigate={onNavigate}
      intro="Estos dos teoremas permiten conocer el tipo de solución de un sistema sin resolverlo explícitamente, comparando el rango de la matriz de coeficientes con el rango de la matriz aumentada."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded border-2 border-danger bg-surface p-4">
          <span className="font-display text-base text-danger">Teorema de Rouché-Capelli</span>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
            Ax = b es <strong>consistente</strong> ⇔ rango(A) = rango([A | b]). Si rango(A) &lt; rango([A | b]), el
            sistema es inconsistente.
          </p>
        </div>
        <div className="rounded border-2 border-pine bg-surface p-4">
          <span className="font-display text-base text-pine">Teorema del Rango</span>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
            Si el sistema es consistente: solución única ⇔ rango(A) = n. Infinitas soluciones ⇔ rango(A) &lt; n, con
            n − rango(A) variables libres.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl text-ink">Ejemplo: sistema paramétrico</h2>
        <p className="mt-1 mb-5 font-mono-nums text-sm leading-relaxed text-ink-muted">{ROUCHE_EXAMPLE.system}</p>

        <div className="flex flex-col gap-2">
          {ROUCHE_EXAMPLE.steps.slice(0, step + 1).map((s) => (
            <div key={s.label} className="animate-in fade-in slide-in-from-bottom-1 rounded border border-line bg-surface p-4 duration-300">
              <span className="text-xs uppercase tracking-wide text-warm">{s.label}</span>
              <pre className="mt-1 whitespace-pre-wrap font-mono-nums text-sm text-ink">{s.expr}</pre>
            </div>
          ))}
        </div>

        {step < ROUCHE_EXAMPLE.steps.length - 1 && (
          <button
            onClick={() => setStep((s) => Math.min(s + 1, ROUCHE_EXAMPLE.steps.length - 1))}
            className="mt-4 rounded bg-pine px-4 py-2 text-sm font-medium text-pine-foreground transition hover:opacity-90"
          >
            Siguiente paso →
          </button>
        )}

        {step === ROUCHE_EXAMPLE.steps.length - 1 && !showCases && (
          <button
            onClick={revealCases}
            className="mt-4 rounded bg-pine px-4 py-2 text-sm font-medium text-pine-foreground transition hover:opacity-90"
          >
            Analizar los casos →
          </button>
        )}

        {showCases && (
          <div className="mt-5 flex flex-col gap-3 animate-in fade-in">
            {ROUCHE_EXAMPLE.cases.map((c) => (
              <div key={c.condition} className="rounded border-l-2 border-pine bg-pine/5 px-4 py-3 text-sm leading-relaxed text-ink">
                <strong className="text-pine">{c.condition} — </strong> {c.result}
              </div>
            ))}
          </div>
        )}
      </div>

      {showCases && (
        <div className="mt-12">
          <h2 className="font-display text-xl text-ink">Comprueba tu comprensión</h2>
          <div className="mt-5 flex flex-col gap-4">
            {ROUCHE_COMPREHENSION.map((q, i) => {
              const value = inputs[i] ?? ''
              const isChecked = checked[i]
              const isCorrect = Math.abs(Number(value) - q.answer) < (q.tolerance ?? 0.01)
              return (
                <div key={q.question} className="rounded border border-line bg-surface p-4">
                  <p className="text-sm text-ink">{q.question}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      value={value}
                      onChange={(e) => setInputs((v) => ({ ...v, [i]: e.target.value }))}
                      placeholder="Respuesta"
                      className="w-32 rounded border border-line-strong bg-surface px-3 py-1.5 font-mono-nums text-sm text-ink outline-none focus:border-pine"
                    />
                    <button
                      onClick={() => check(i)}
                      disabled={value === ''}
                      className="rounded border border-line-strong px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-surface-raised disabled:opacity-40"
                    >
                      Verificar
                    </button>
                    {isChecked && (
                      <span className={cn('text-sm font-medium', isCorrect ? 'text-pine' : 'text-danger')}>
                        {isCorrect ? '✓ Correcto' : `✗ La respuesta correcta es ${q.answer}`}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </ModuleShell>
  )
}
