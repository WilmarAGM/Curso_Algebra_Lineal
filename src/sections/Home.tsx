import { EVAL_SCHEDULE } from '@/data/content'
import { Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { QRCodeSVG } from 'qrcode.react'

const SITE_URL = 'https://curso-algebra-lineal.vercel.app/'

export function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-12 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <p className="font-mono-nums text-sm uppercase tracking-[0.14em] text-pine mb-2">
            Institución Universitaria Pascual Bravo
          </p>
          <h1 className="font-display text-4xl leading-tight text-ink md:text-6xl font-bold">
            Álgebra <br /> Lineal
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Sistemas de ecuaciones lineales, matrices, espacios vectoriales y transformaciones
            lineales aplicados a problemas reales de ingeniería. Explora las semanas disponibles
            y mantente al tanto de las fechas de quiz, simulacro y parcial de cada unidad.
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-2 rounded-2xl border border-line bg-surface/50 backdrop-blur p-5 shadow-[0_0_15px_rgba(214,245,35,0.05)] border-leaf/20">
          <div className="bg-white p-2 rounded-xl">
            <QRCodeSVG value={SITE_URL} size={100} bgColor="#ffffff" fgColor="#000000" />
          </div>
          <span className="text-center text-xs font-medium text-ink-muted mt-1">
            Escanea para acceder<br />al sitio del curso
          </span>
        </div>
      </header>

      <section aria-labelledby="fechas-heading" className="mt-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 id="fechas-heading" className="font-display text-2xl text-ink font-bold flex items-center gap-3">
            <Calendar className="h-6 w-6 text-pine" />
            Fechas Evaluativas por Unidad
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {EVAL_SCHEDULE.map((u, idx) => {
            const isGreen = idx % 2 === 0
            const neonClass = isGreen
              ? 'shadow-[0_0_20px_rgba(214,245,35,0.15),inset_0_0_20px_rgba(214,245,35,0.05)] border-leaf/40 hover:shadow-[0_0_40px_rgba(214,245,35,0.3),inset_0_0_20px_rgba(214,245,35,0.1)] hover:border-leaf/70'
              : 'shadow-[0_0_20px_rgba(255,180,51,0.15),inset_0_0_20px_rgba(255,180,51,0.05)] border-ember/40 hover:shadow-[0_0_40px_rgba(255,180,51,0.3),inset_0_0_20px_rgba(255,180,51,0.1)] hover:border-ember/70'

            const titleColor = isGreen ? 'text-leaf drop-shadow-[0_0_10px_rgba(214,245,35,0.8)]' : 'text-ember drop-shadow-[0_0_10px_rgba(255,180,51,0.8)]'

            return (
              <div
                key={u.unidad}
                className={cn(
                  'h-full rounded-[2rem] border-[1px] bg-surface/30 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-2',
                  neonClass,
                )}
              >
                <h3 className={cn('font-display text-xl font-bold mb-2 tracking-tight', titleColor)}>
                  {u.unidad}
                </h3>
                <p className="text-sm text-ink-muted mb-6 leading-relaxed">{u.competencia}</p>

                <ul className="flex flex-col gap-3">
                  {u.stages.map((s) => (
                    <li key={s.label} className="relative pl-4 border-l-2 border-line">
                      <span className={cn('absolute -left-[5px] top-1.5 h-2 w-2 rounded-full', isGreen ? 'bg-leaf' : 'bg-ember')} />
                      <div className="flex justify-between items-center gap-3 text-sm">
                        <span className="text-ink font-medium">{s.label}</span>
                        <span className={cn('font-mono-nums font-bold', titleColor)}>{s.peso}</span>
                      </div>
                      <p className="font-mono-nums text-xs text-ink-muted mt-0.5">{s.fecha}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
