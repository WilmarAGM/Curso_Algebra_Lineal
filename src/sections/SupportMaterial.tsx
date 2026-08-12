import { SUPPORT_MATERIALS } from '@/data/content'
import { FileText, Download } from 'lucide-react'

export function SupportMaterial() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="border-b border-line pb-8 mb-10">
        <h1 className="font-display text-3xl leading-tight text-ink md:text-5xl">
          Material formal de apoyo
        </h1>
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink-muted">
          Guías oficiales en PDF para el desarrollo del curso.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {SUPPORT_MATERIALS.map((m) => (
          <a
            key={m.file}
            href={m.file}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-xl border border-line bg-surface/50 backdrop-blur p-5 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(32,80,223,0.15)] hover:border-pine/50"
          >
            <div className="rounded-lg bg-pine/10 p-3 text-pine group-hover:bg-pine group-hover:text-white transition-colors">
              <FileText className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-lg text-ink group-hover:text-pine transition-colors">{m.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{m.description}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-pine">
                <Download className="h-4 w-4" />
                Descargar PDF
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
