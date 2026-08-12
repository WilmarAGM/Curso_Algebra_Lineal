import { useState } from 'react'
import { SideBar, type PageId } from '@/components/app/SideBar'
import { Home } from '@/sections/Home'
import { WeeksGrid } from '@/sections/WeeksGrid'
import { SupportMaterial } from '@/sections/SupportMaterial'
import { Workshops } from '@/sections/Workshops'
import { Paap } from '@/sections/Paap'
import { WeekHub } from '@/sections/WeekHub'
import { ModuleSelDefinicion } from '@/sections/ModuleSelDefinicion'
import { ModuleSelClasificacion } from '@/sections/ModuleSelClasificacion'
import { ModuleMatrices } from '@/sections/ModuleMatrices'
import { ModuleRango } from '@/sections/ModuleRango'
import { ModuleAlgoritmos } from '@/sections/ModuleAlgoritmos'
import { ModuleRoucheCapelli } from '@/sections/ModuleRoucheCapelli'
import { ModuleTaller } from '@/sections/ModuleTaller'
import { MODULES_SEMANA1, MODULES_SEMANA2, type SectionId } from '@/data/content'
import { useProgress } from '@/hooks/useProgress'

function App() {
  const [page, setPage] = useState<PageId | SectionId>('inicio')
  const { completed, markComplete } = useProgress()

  const navigate = (id: string) => {
    setPage(id as PageId | SectionId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen font-body flex relative overflow-hidden bg-[#0b162c]">
      {/* Background Neon Blobs for true glassmorphism effect — fixed to the viewport so they don't drift into content on tall pages */}
      <div className="pointer-events-none fixed -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-leaf/20 blur-[120px]" />
      <div className="pointer-events-none fixed top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-ember/20 blur-[150px]" />
      <div className="pointer-events-none fixed -bottom-40 left-1/4 h-[400px] w-[400px] rounded-full bg-pine/20 blur-[100px]" />

      {/* SideBar for Desktop - For mobile, a hamburger menu would be added here */}
      <SideBar active={page as PageId} onNavigate={navigate as (id: PageId) => void} />

      {/* Main Content Area - padded left by the sidebar width (w-72 = 18rem = 288px) on desktop */}
      <main className="flex-1 md:ml-72 min-h-screen flex flex-col">
        <div className="flex-1">
          {page === 'inicio' && <Home />}
          {page === 'semanas' && <WeeksGrid onNavigate={navigate} />}
          {page === 'material' && <SupportMaterial />}
          {page === 'talleres' && <Workshops onNavigate={navigate} />}
          {page === 'paap' && <Paap />}

          {/* Semana 1 */}
          {page === 'semana1' && (
            <WeekHub
              weekNumber={1}
              title="Sistemas Lineales, Matrices y su Clasificación"
              intro="Recorre los tres módulos de esta semana: definición de sistemas de ecuaciones lineales, su clasificación por tipo de solución, y la definición y clasificación de las matrices. Cada módulo combina teoría con un ejercicio interactivo — tu progreso se guarda automáticamente."
              modules={MODULES_SEMANA1}
              onNavigate={navigate as (id: SectionId) => void}
              completed={completed}
              onBack={() => navigate('semanas')}
            />
          )}
          {page === 'selDefinicion' && (
            <ModuleSelDefinicion onNavigate={navigate as (id: SectionId) => void} onDone={() => markComplete('selDefinicion')} />
          )}
          {page === 'selClasificacion' && (
            <ModuleSelClasificacion onNavigate={navigate as (id: SectionId) => void} onDone={() => markComplete('selClasificacion')} />
          )}
          {page === 'matrices' && (
            <ModuleMatrices onNavigate={navigate as (id: SectionId) => void} onDone={() => markComplete('matrices')} />
          )}

          {/* Semana 2 */}
          {page === 'semana2' && (
            <WeekHub
              weekNumber={2}
              title="Rango, Gauss-Jordan y Rouché-Capelli"
              intro="Esta semana llevamos las matrices al terreno computacional: rango y variables libres, los algoritmos de Gauss y Gauss-Jordan, el Teorema del Rango y el Teorema de Rouché-Capelli, y cerramos con un taller de consolidación con aplicaciones de ingeniería."
              modules={MODULES_SEMANA2}
              onNavigate={navigate as (id: SectionId) => void}
              completed={completed}
              onBack={() => navigate('semanas')}
            />
          )}
          {page === 'rango' && (
            <ModuleRango onNavigate={navigate as (id: SectionId) => void} onDone={() => markComplete('rango')} />
          )}
          {page === 'algoritmos' && (
            <ModuleAlgoritmos onNavigate={navigate as (id: SectionId) => void} onDone={() => markComplete('algoritmos')} />
          )}
          {page === 'roucheCapelli' && (
            <ModuleRoucheCapelli onNavigate={navigate as (id: SectionId) => void} onDone={() => markComplete('roucheCapelli')} />
          )}
          {page === 'taller' && (
            <ModuleTaller onNavigate={navigate as (id: SectionId) => void} onDone={() => markComplete('taller')} />
          )}
        </div>

        <footer className="border-t border-line px-5 py-6 text-center text-xs text-ink-muted">
          Álgebra Lineal · Institución Universitaria Pascual Bravo · Semestre 2026-II
        </footer>
      </main>
    </div>
  )
}

export default App
