import { useState } from 'react'
import { ModuleShell } from '@/components/app/ModuleShell'
import { SEL_TYPES, SEL_WORKED_SYSTEMS, SEL_PRACTICE_SYSTEMS, type SelType, type SectionId } from '@/data/content'
import { cn } from '@/lib/utils'

interface ModuleProps {
  onNavigate: (id: SectionId) => void
  onDone: () => void
}

const TYPE_COLOR: Record<SelType, { border: string; text: string; bg: string }> = {
  SCD: { border: 'border-pine', text: 'text-pine', bg: 'bg-pine/15' },
  SCI: { border: 'border-warm', text: 'text-warm', bg: 'bg-warm/15' },
  SI: { border: 'border-danger', text: 'text-danger', bg: 'bg-danger/15' },
}

export function ModuleSelClasificacion({ onNavigate, onDone }: ModuleProps) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})
  const [choice, setChoice] = useState<Record<number, SelType>>({})

  const choose = (i: number, type: SelType) => {
    if (revealed[i]) return
    setChoice((c) => ({ ...c, [i]: type }))
    setRevealed((r) => {
      const next = { ...r, [i]: true }
      if (Object.keys(next).length === SEL_PRACTICE_SYSTEMS.length) onDone()
      return next
    })
  }

  const correctCount = SEL_PRACTICE_SYSTEMS.filter((it, i) => revealed[i] && choice[i] === it.type).length
  const attempted = Object.keys(revealed).length

  return (
    <ModuleShell
      id="selClasificacion"
      eyebrow="Módulo 02 · Semana 1"
      title="Clasificación de los Sistemas de Ecuaciones Lineales"
      onNavigate={onNavigate}
      intro="Todo SEL con coeficientes reales cumple exactamente una de tres posibilidades: única solución, infinitas soluciones, o ninguna solución. Nunca un número finito mayor a uno."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {SEL_TYPES.map((t) => (
          <div key={t.type} className={cn('rounded border-2 bg-surface p-4', TYPE_COLOR[t.type].border)}>
            <span className={cn('font-display text-lg', TYPE_COLOR[t.type].text)}>{t.type}</span>
            <p className="mt-0.5 text-sm font-medium text-ink">{t.name}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl text-ink">Interpretación geométrica en el plano</h2>
        <p className="mt-1 mb-5 text-sm text-ink-muted">
          Tres sistemas de dos ecuaciones con dos incógnitas, uno por cada tipo de solución.
        </p>
        <div className="flex flex-col gap-3">
          {SEL_WORKED_SYSTEMS.map((s) => (
            <div key={s.eq1 + s.eq2} className={cn('rounded border-l-4 bg-surface p-4', TYPE_COLOR[s.type].border)}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono-nums text-ink">{s.eq1} &nbsp;·&nbsp; {s.eq2}</span>
                <span className={cn('rounded px-2 py-0.5 text-xs font-bold', TYPE_COLOR[s.type].bg, TYPE_COLOR[s.type].text)}>
                  {s.type}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.explain}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-xl text-ink">Ahora practica tú</h2>
          <span className="font-mono-nums text-sm text-ink-muted">
            {correctCount}/{attempted} correctas
          </span>
        </div>
        <p className="mb-5 text-sm text-ink-muted">Clasifica cada sistema como SCD, SCI o SI.</p>

        <div className="flex flex-col gap-3">
          {SEL_PRACTICE_SYSTEMS.map((s, i) => {
            const isRevealed = revealed[i]
            return (
              <div key={s.eq1 + s.eq2} className="rounded border border-line bg-surface p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono-nums text-ink">{s.eq1} &nbsp;·&nbsp; {s.eq2}</span>
                  <div className="flex gap-2">
                    {(['SCD', 'SCI', 'SI'] as SelType[]).map((t) => {
                      const isChosen = choice[i] === t
                      const isCorrectType = t === s.type
                      return (
                        <button
                          key={t}
                          onClick={() => choose(i, t)}
                          disabled={isRevealed}
                          className={cn(
                            'rounded border px-3 py-1.5 text-sm font-medium transition',
                            !isRevealed && 'border-line-strong text-ink hover:border-pine hover:text-pine',
                            isRevealed && isCorrectType && cn(TYPE_COLOR[t].border, TYPE_COLOR[t].bg, TYPE_COLOR[t].text),
                            isRevealed && isChosen && !isCorrectType && 'border-danger bg-danger/10 text-danger',
                            isRevealed && !isChosen && !isCorrectType && 'border-line text-ink-muted opacity-50',
                          )}
                        >
                          {t}
                        </button>
                      )
                    })}
                  </div>
                </div>
                {isRevealed && (
                  <p className={cn('mt-3 animate-in fade-in text-sm leading-relaxed', choice[i] === s.type ? 'text-pine' : 'text-danger')}>
                    {choice[i] === s.type ? 'Correcto — ' : `Incorrecto, es ${s.type} — `}
                    {s.explain}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </ModuleShell>
  )
}
