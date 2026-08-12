import { WEEKS } from '@/data/weeks'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { PageId } from '@/components/app/SideBar'

interface WeeksGridProps {
  onNavigate: (id: PageId | string) => void
}

export function WeeksGrid({ onNavigate }: WeeksGridProps) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="border-b border-line pb-8 mb-10">
        <h1 className="font-display text-3xl leading-tight text-ink md:text-5xl">
          Semanas del curso
        </h1>
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink-muted">
          Aquí encontrarás el material organizado cronológicamente, según el temario oficial.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WEEKS.map((w) => {
          const available = w.status === 'disponible' && w.hubId
          return (
            <Card
              key={w.number}
              role="button"
              onClick={() => available && onNavigate(w.hubId as string)}
              className={cn(
                'flex flex-col items-start gap-2 p-5 text-left cursor-pointer transition-all active:translate-y-1 active:shadow-none hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(32,80,223,0.15)] bg-surface/50 backdrop-blur border-line',
                !available && 'cursor-not-allowed opacity-60 hover:translate-y-0 active:translate-y-0 shadow-none',
              )}
            >
              <span className="font-mono-nums text-xs uppercase tracking-wide text-ink-muted">
                Semana {w.number}{w.unidad ? ` · ${w.unidad}` : ''}
              </span>
              <div className="flex items-center gap-3">
                <img src={available ? '/icon_math.png' : '/icon_trophy.png'} alt="Module" className="h-10 w-10 drop-shadow-sm" />
                <span className="font-display text-lg text-ink">{w.title}</span>
              </div>
              <span className="text-sm leading-relaxed text-ink-muted">{w.summary}</span>
              <span
                className={cn(
                  'mt-auto pt-2 inline-flex items-center gap-1.5 text-xs font-medium',
                  available ? 'text-pine' : 'text-ink-muted',
                )}
              >
                <span
                  className={cn('h-2 w-2 rounded-full', available ? 'bg-leaf shadow-[0_0_10px_rgba(214,245,35,0.5)]' : 'bg-line-strong')}
                />
                {available ? 'Disponible' : 'Próximamente'}
              </span>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
