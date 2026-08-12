import { Users, BookOpen } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

const PAAP_URL = 'https://pascualbravo.edu.co/paap' // url genérica para el código QR

export function Paap() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="border-b border-line pb-8 mb-10">
        <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl font-bold flex items-center gap-4">
          <Users className="h-10 w-10 text-pine" />
          PAAP
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Programa de Acompañamiento Académico Permanente.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-line bg-surface/50 backdrop-blur p-8 shadow-[0_0_20px_rgba(32,80,223,0.05)]">
            <h2 className="font-display text-2xl font-bold text-pine mb-4">¿Qué es el PAAP?</h2>
            <p className="text-ink-muted leading-relaxed mb-4">
              Es un espacio dirigido a estudiantes de pregrado que ofrece <strong>asesorías presenciales y virtuales</strong> en las asignaturas del Departamento de Fundamentación Básica.
            </p>
            <p className="text-ink-muted leading-relaxed">
              Estos espacios son una oportunidad para que los estudiantes <strong>resuelvan dudas, refuercen conceptos y fortalezcan su proceso de aprendizaje</strong> en Álgebra Lineal.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface/50 backdrop-blur p-8 shadow-[0_0_20px_rgba(32,80,223,0.05)]">
            <h2 className="font-display text-2xl font-bold text-ember mb-4 flex items-center gap-3">
              <BookOpen className="h-6 w-6" />
              Asesorías
            </h2>
            <p className="text-ink-muted leading-relaxed">
              Durante el semestre, docentes del PAAP estarán realizando acompañamiento continuo. Te invitamos a participar activamente de estos espacios para mejorar tus resultados académicos.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl border-[1px] border-leaf/40 bg-surface/30 backdrop-blur-xl p-10 shadow-[0_0_30px_rgba(214,245,35,0.1),inset_0_0_20px_rgba(214,245,35,0.05)]">
          <h3 className="font-display text-2xl font-bold text-leaf drop-shadow-[0_0_8px_rgba(214,245,35,0.6)] mb-2 uppercase tracking-widest text-center">
            Programación PAAP
          </h3>
          <p className="text-ink-muted mb-8 text-center max-w-xs">
            Escanea el código QR para consultar la programación, horarios y docentes disponibles.
          </p>

          <div className="bg-white p-4 rounded-2xl shadow-xl transition-transform hover:scale-105 duration-300">
            <QRCodeSVG value={PAAP_URL} size={200} bgColor="#ffffff" fgColor="#000000" />
          </div>

          <p className="mt-8 font-display font-bold text-ink uppercase tracking-wider text-sm text-center">
            Departamento de<br/>Fundamentación Básica
          </p>
        </div>
      </div>
    </div>
  )
}
