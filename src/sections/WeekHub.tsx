import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import type { SectionId } from '@/data/content'

interface WeekHubProps {
  weekNumber: number
  title: string
  intro: string
  modules: { id: SectionId; short: string; title: string }[]
  onNavigate: (id: SectionId) => void
  completed: Record<string, boolean>
  onBack: () => void
}

export function WeekHub({ weekNumber, title, intro, modules, onNavigate, completed, onBack }: WeekHubProps) {
  const doneCount = modules.filter((m) => completed[m.id]).length

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="font-mono-nums text-sm uppercase tracking-[0.14em] text-warm">Semana {weekNumber}</p>
      <h1 className="mt-2 font-display text-4xl text-ink">{title}</h1>
      <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink-muted">{intro}</p>

      <div className="mt-4 flex items-center gap-3">
        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-warm transition-[width]"
            style={{ width: `${(doneCount / modules.length) * 100}%` }}
          />
        </div>
        <span className="font-mono-nums text-sm text-ink-muted">
          {doneCount}/{modules.length} completados
        </span>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {modules.map((m) => (
          <Card
            key={m.id}
            role="button"
            onClick={() => onNavigate(m.id)}
            className="group flex flex-col items-start gap-2 p-5 text-left cursor-pointer transition-all active:translate-y-1 active:shadow-none hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(32,80,223,0.15)]"
          >
            <span className="font-mono-nums text-xs uppercase tracking-wide text-ink-muted">Módulo {m.short}</span>
            <div className="flex items-center gap-3">
              <img src="/icon_math.png" alt="Math" className="h-10 w-10 drop-shadow-sm" />
              <span className="font-display text-lg text-ink">{m.title}</span>
            </div>
            <span
              className={cn(
                'mt-2 inline-flex items-center gap-1.5 text-xs font-medium',
                completed[m.id] ? 'text-primary' : 'text-ink-muted',
              )}
            >
              <span className={cn('h-2 w-2 rounded-full', completed[m.id] ? 'bg-accent-green' : 'bg-line-strong')} />
              {completed[m.id] ? 'Completado' : 'Empezar'}
            </span>
          </Card>
        ))}
      </div>

      <div className="mt-10 border-t border-line pt-6">
        <button onClick={onBack} className="text-sm text-ink-muted transition hover:text-ink">
          ← Volver a Semanas
        </button>
      </div>
    </div>
  )
}
