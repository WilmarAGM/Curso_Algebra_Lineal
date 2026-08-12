import { useState } from 'react'
import { ModuleShell } from '@/components/app/ModuleShell'
import { CEREAL_PROBLEM, LINEAR_CLASSIFY_ITEMS, type SectionId } from '@/data/content'
import { cn } from '@/lib/utils'

interface ModuleProps {
  onNavigate: (id: SectionId) => void
  onDone: () => void
}

export function ModuleSelDefinicion({ onNavigate, onDone }: ModuleProps) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})
  const [choice, setChoice] = useState<Record<number, boolean>>({})
  const [step, setStep] = useState(0)

  const choose = (i: number, guess: boolean) => {
    if (revealed[i]) return
    setChoice((c) => ({ ...c, [i]: guess }))
    setRevealed((r) => {
      const next = { ...r, [i]: true }
      if (Object.keys(next).length === LINEAR_CLASSIFY_ITEMS.length) onDone()
      return next
    })
  }

  const correctCount = LINEAR_CLASSIFY_ITEMS.filter((it, i) => revealed[i] && choice[i] === it.isLinear).length
  const attempted = Object.keys(revealed).length

  return (
    <ModuleShell
      id="selDefinicion"
      eyebrow="Módulo 01 · Semana 1"
      title="Sistemas de Ecuaciones Lineales"
      onNavigate={onNavigate}
      intro="Una ecuación lineal solo permite variables a la primera potencia, sin productos entre ellas ni funciones no lineales. Un conjunto de estas ecuaciones que comparten variables forma un Sistema de Ecuaciones Lineales (SEL)."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <DefCard
          title="Ecuación lineal"
          text="a₁x₁ + a₂x₂ + ⋯ + aₙxₙ = b, con coeficientes aᵢ y término independiente b reales."
        />
        <DefCard
          title="Sistema lineal"
          text="Conjunto de m ecuaciones lineales que comparten las mismas n variables: Ax = b."
        />
        <DefCard
          title="Vector solución"
          text="Una n-tupla (s₁, …, sₙ) que satisface simultáneamente las m ecuaciones del sistema."
        />
        <DefCard
          title="Matriz aumentada [A | b]"
          text="Anexa la columna de términos independientes b a la derecha de la matriz de coeficientes A."
        />
      </div>

      <div className="mt-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-xl text-ink">Ejercicio: ¿es lineal esta ecuación?</h2>
          <span className="font-mono-nums text-sm text-ink-muted">
            {correctCount}/{attempted} correctas
          </span>
        </div>
        <p className="mb-5 text-sm text-ink-muted">
          Recuerda: sin exponentes distintos de 1, sin productos entre variables, sin raíces ni funciones aplicadas a una variable.
        </p>

        <div className="flex flex-col gap-3">
          {LINEAR_CLASSIFY_ITEMS.map((item, i) => {
            const isRevealed = revealed[i]
            const isCorrect = choice[i] === item.isLinear
            return (
              <div key={item.expr} className="rounded border border-line bg-surface p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono-nums text-lg text-ink">{item.expr}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => choose(i, true)}
                      disabled={isRevealed}
                      className={cn(
                        'rounded border px-3 py-1.5 text-sm font-medium transition',
                        !isRevealed && 'border-line-strong text-ink hover:border-pine hover:text-pine',
                        isRevealed && item.isLinear && 'border-pine bg-pine/15 text-pine',
                        isRevealed && choice[i] === true && !item.isLinear && 'border-danger bg-danger/10 text-danger',
                        isRevealed && choice[i] !== true && !(item.isLinear) && 'border-line text-ink-muted opacity-50',
                      )}
                    >
                      Lineal
                    </button>
                    <button
                      onClick={() => choose(i, false)}
                      disabled={isRevealed}
                      className={cn(
                        'rounded border px-3 py-1.5 text-sm font-medium transition',
                        !isRevealed && 'border-line-strong text-ink hover:border-warm hover:text-warm',
                        isRevealed && !item.isLinear && 'border-warm bg-warm/15 text-warm',
                        isRevealed && choice[i] === false && item.isLinear && 'border-danger bg-danger/10 text-danger',
                        isRevealed && choice[i] !== false && item.isLinear && 'border-line text-ink-muted opacity-50',
                      )}
                    >
                      No lineal
                    </button>
                  </div>
                </div>
                {isRevealed && (
                  <p className={cn('mt-3 animate-in fade-in text-sm leading-relaxed', isCorrect ? 'text-pine' : 'text-danger')}>
                    {isCorrect ? 'Correcto — ' : 'Incorrecto — '}
                    {item.explain}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl text-ink">Ejemplo aplicado: mezcla de cereales</h2>
        <p className="mt-1 mb-5 text-sm leading-relaxed text-ink-muted">
          Un ingeniero de alimentos mezcla tres cereales para lograr exactamente 110 g de carbohidratos,
          26 g de proteínas y 12 g de grasas por cada 100 g de cada cereal ($x_1, x_2, x_3$).
        </p>

        <div className="overflow-x-auto rounded border border-line">
          <table className="w-full text-sm">
            <thead className="bg-surface-raised text-ink-muted">
              <tr>
                <th className="p-3 text-left">Nutriente (g)</th>
                <th className="p-3 text-right">Cereal 1</th>
                <th className="p-3 text-right">Cereal 2</th>
                <th className="p-3 text-right">Cereal 3</th>
                <th className="p-3 text-right">Requerido</th>
              </tr>
            </thead>
            <tbody>
              {CEREAL_PROBLEM.table.map((row) => (
                <tr key={row.nutriente} className="border-t border-line">
                  <td className="p-3 text-ink">{row.nutriente}</td>
                  <td className="p-3 text-right font-mono-nums text-ink-muted">{row.c1}</td>
                  <td className="p-3 text-right font-mono-nums text-ink-muted">{row.c2}</td>
                  <td className="p-3 text-right font-mono-nums text-ink-muted">{row.c3}</td>
                  <td className="p-3 text-right font-mono-nums font-medium text-ink">{row.requerido}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          {CEREAL_PROBLEM.steps.slice(0, step + 1).map((s) => (
            <div key={s.label} className="animate-in fade-in slide-in-from-bottom-1 rounded border border-line bg-surface p-4 duration-300">
              <span className="text-xs uppercase tracking-wide text-warm">{s.label}</span>
              <pre className="mt-1 whitespace-pre-wrap font-mono-nums text-base text-ink">{s.expr}</pre>
            </div>
          ))}
        </div>

        {step < CEREAL_PROBLEM.steps.length - 1 && (
          <button
            onClick={() => setStep((s) => Math.min(s + 1, CEREAL_PROBLEM.steps.length - 1))}
            className="mt-4 rounded bg-pine px-4 py-2 text-sm font-medium text-pine-foreground transition hover:opacity-90"
          >
            Siguiente paso →
          </button>
        )}
        <p className="mt-4 text-xs text-ink-muted">
          Resolveremos este sistema por eliminación de Gauss en el Módulo 05 (Semana 2).
        </p>
      </div>
    </ModuleShell>
  )
}

function DefCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded border border-line bg-surface p-4">
      <span className="font-display text-base text-pine">{title}</span>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{text}</p>
    </div>
  )
}
