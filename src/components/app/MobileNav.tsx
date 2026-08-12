import { useState } from 'react'
import { Menu, FileText, User } from 'lucide-react'
import { BrandMark, NavList, type PageId } from '@/components/app/SideBar'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'

interface MobileNavProps {
  active: PageId
  onNavigate: (id: PageId) => void
}

export function MobileNav({ active, onNavigate }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-surface/90 backdrop-blur px-4 py-3 md:hidden">
      <div className="scale-90 origin-left">
        <BrandMark />
      </div>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink-muted transition hover:bg-line/40 hover:text-ink"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="flex w-72 flex-col border-line bg-surface p-5 text-ink">
          <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
          <div className="mb-8">
            <BrandMark />
            <p className="mt-2 text-xs text-ink-muted leading-tight">
              Institución Universitaria Pascual Bravo
            </p>
          </div>

          <button className="flex items-center gap-3 rounded-lg border border-line bg-surface-raised px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-line/50 hover:border-pine/50 mb-8 group">
            <User className="h-5 w-5 text-ink-muted group-hover:text-pine transition-colors" />
            <span>Iniciar sesión</span>
          </button>

          <NavList
            active={active}
            onNavigate={(id) => {
              onNavigate(id)
              setOpen(false)
            }}
          />

          <div className="mt-auto pt-6">
            <a
              href="/programa_semanal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-ember to-warm px-4 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(255,157,0,0.3)] transition-all hover:scale-[1.02]"
            >
              <FileText className="h-5 w-5" />
              Ver Temario
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
