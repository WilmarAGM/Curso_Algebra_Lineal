import { Card } from '@/components/ui/card'
import { PenTool } from 'lucide-react'

interface WorkshopsProps {
  onNavigate: (id: string) => void
}

export function Workshops({ onNavigate }: WorkshopsProps) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="border-b border-line pb-8 mb-10">
        <h1 className="font-display text-3xl leading-tight text-ink md:text-5xl">
          Talleres
        </h1>
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink-muted">
          Ejercicios y talleres prácticos para el desarrollo del curso.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card
          role="button"
          onClick={() => onNavigate('taller')}
          className="group flex flex-col items-start gap-2 p-5 text-left cursor-pointer transition-all active:translate-y-1 active:shadow-none hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(32,80,223,0.15)]"
        >
          <span className="font-mono-nums text-xs uppercase tracking-wide text-ink-muted">Semana 2 · Módulo 07</span>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-pine/10 text-pine">
              <PenTool className="h-5 w-5" />
            </span>
            <span className="font-display text-lg text-ink">Taller de Saberes Previos y Consolidación</span>
          </div>
          <span className="text-sm leading-relaxed text-ink-muted">
            Matriz aumentada, tipos de matrices, operaciones elementales de fila, rango de una matriz y el
            Teorema del Rango.
          </span>
          <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-pine">
            <span className="h-2 w-2 rounded-full bg-accent-green" />
            Ir al taller
          </span>
        </Card>
      </div>

      <div className="mt-6 rounded-xl border border-line bg-surface/30 border-dashed p-6 text-center">
        <p className="text-ink-muted text-sm">Los talleres de las próximas semanas se irán habilitando aquí.</p>
      </div>
    </div>
  )
}
