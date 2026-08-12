import { useState } from 'react'
import { ModuleShell } from '@/components/app/ModuleShell'
import { GAUSS_EXAMPLE, GAUSS_JORDAN_EXAMPLE, GAUSS_COMPREHENSION, type SectionId } from '@/data/content'
import { cn } from '@/lib/utils'

interface ModuleProps {
  onNavigate: (id: SectionId) => void
  onDone: () => void
}

function StepReveal({ title, intro, steps, discussion }: { title: string; intro: string; steps: { label: string; expr: string }[]; discussion: string }) {
  const [step, setStep] = useState(0)
  const done = step === steps.length - 1
  return (
    <div className="mt-10">
      <h2 className="font-display text-xl text-ink">{title}</h2>
      <p className="mt-1 mb-5 text-sm leading-relaxed text-ink-muted">{intro}</p>
      <div className="flex flex-col gap-2">
        {steps.slice(0, step + 1).map((s) => (
          <div key={s.label} className="animate-in fade-in slide-in-from-bottom-1 rounded border border-line bg-surface p-4 duration-300">
            <span className="text-xs uppercase tracking-wide text-warm">{s.label}</span>
            <pre className="mt-1 whitespace-pre-wrap font-mono-nums text-sm text-ink">{s.expr}</pre>
          </div>
        ))}
      </div>
      {!done ? (
        <button
          onClick={() => setStep((s) => Math.min(s + 1, steps.length - 1))}
          className="mt-4 rounded bg-pine px-4 py-2 text-sm font-medium text-pine-foreground transition hover:opacity-90"
        >
          Siguiente paso →
        </button>
      ) : (
        <div className="mt-5 rounded border-l-2 border-pine bg-pine/5 px-4 py-3 text-sm leading-relaxed text-ink animate-in fade-in">
          <strong className="text-pine">Análisis — </strong> {discussion}
        </div>
      )}
    </div>
  )
}

export function ModuleAlgoritmos({ onNavigate, onDone }: ModuleProps) {
  const [inputs, setInputs] = useState<Record<number, string>>({})
  const [checked, setChecked] = useState<Record<number, boolean>>({})

  const check = (i: number) => {
    setChecked((c) => {
      const next = { ...c, [i]: true }
      if (Object.keys(next).length === GAUSS_COMPREHENSION.length) onDone()
      return next
    })
  }

  return (
    <ModuleShell
      id="algoritmos"
      eyebrow="Módulo 05 · Semana 2"
      title="Eliminación de Gauss y Gauss-Jordan"
      onNavigate={onNavigate}
      intro="Dos algoritmos basados en operaciones de renglón para resolver Ax = b: Gauss lleva la matriz a forma escalonada (REF) y resuelve por sustitución hacia atrás; Gauss-Jordan continúa hasta la forma escalonada reducida (RREF), leyendo la solución directamente."
    >
      <StepReveal {...GAUSS_EXAMPLE} title="1 · Eliminación de Gauss (mezcla de cereales)" />
      <StepReveal {...GAUSS_JORDAN_EXAMPLE} title="2 · Eliminación de Gauss-Jordan (infinitas soluciones)" />

      <div className="mt-12">
        <h2 className="font-display text-xl text-ink">Comprueba tu comprensión</h2>
        <p className="mt-1 mb-5 text-sm text-ink-muted">Responde con base en los dos ejemplos anteriores.</p>
        <div className="flex flex-col gap-4">
          {GAUSS_COMPREHENSION.map((q, i) => {
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
    </ModuleShell>
  )
}
