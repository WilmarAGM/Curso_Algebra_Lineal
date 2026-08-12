import { useState } from 'react'
import { ModuleShell } from '@/components/app/ModuleShell'
import {
  MATRIX_CLASSIFY_ITEMS,
  MATRIX_KIND_LABEL,
  ROW_OPERATIONS,
  ROW_OP_QUIZ,
  type MatrixKind,
  type SectionId,
} from '@/data/content'
import { cn } from '@/lib/utils'

interface ModuleProps {
  onNavigate: (id: SectionId) => void
  onDone: () => void
}

const KIND_OPTIONS: MatrixKind[] = ['diagonal', 'identidad', 'triSup', 'triInf', 'simetrica', 'ninguna']

export function ModuleMatrices({ onNavigate, onDone }: ModuleProps) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})
  const [choice, setChoice] = useState<Record<number, MatrixKind>>({})
  const [rowOpAnswers, setRowOpAnswers] = useState<Record<number, string>>({})
  const [rowOpChecked, setRowOpChecked] = useState<Record<number, boolean>>({})

  const choose = (i: number, kind: MatrixKind) => {
    if (revealed[i]) return
    setChoice((c) => ({ ...c, [i]: kind }))
    setRevealed((r) => {
      const next = { ...r, [i]: true }
      if (Object.keys(next).length === MATRIX_CLASSIFY_ITEMS.length) onDone()
      return next
    })
  }

  const correctCount = MATRIX_CLASSIFY_ITEMS.filter((it, i) => revealed[i] && choice[i] === it.kind).length
  const attempted = Object.keys(revealed).length

  return (
    <ModuleShell
      id="matrices"
      eyebrow="Módulo 03 · Semana 1"
      title="Definición y Clasificación de las Matrices"
      onNavigate={onNavigate}
      intro="Una matriz A de tamaño m × n es un arreglo rectangular de m filas y n columnas. Cuando m = n, es cuadrada y sus entradas a₁₁, a₂₂, …, aₙₙ forman la diagonal principal."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DefCard title="Diagonal" text="aᵢⱼ = 0 para todo i ≠ j." />
        <DefCard title="Identidad (Iₙ)" text="Diagonal con unos en toda la diagonal principal." />
        <DefCard title="Triangular Superior" text="aᵢⱼ = 0 cuando i > j (ceros debajo de la diagonal)." />
        <DefCard title="Triangular Inferior" text="aᵢⱼ = 0 cuando i < j (ceros encima de la diagonal)." />
        <DefCard title="Simétrica" text="A = Aᵀ, es decir, aᵢⱼ = aⱼᵢ para todo i, j." />
      </div>

      <div className="mt-12">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-xl text-ink">Ejercicio: clasifica cada matriz</h2>
          <span className="font-mono-nums text-sm text-ink-muted">
            {correctCount}/{attempted} correctas
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {MATRIX_CLASSIFY_ITEMS.map((item, i) => {
            const isRevealed = revealed[i]
            return (
              <div key={i} className="rounded border border-line bg-surface p-4">
                <MatrixGrid rows={item.rows} />
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {KIND_OPTIONS.map((k) => {
                    const isChosen = choice[i] === k
                    const isCorrectKind = k === item.kind
                    return (
                      <button
                        key={k}
                        onClick={() => choose(i, k)}
                        disabled={isRevealed}
                        className={cn(
                          'rounded border px-2 py-1 text-xs font-medium transition',
                          !isRevealed && 'border-line-strong text-ink hover:border-pine hover:text-pine',
                          isRevealed && isCorrectKind && 'border-pine bg-pine/15 text-pine',
                          isRevealed && isChosen && !isCorrectKind && 'border-danger bg-danger/10 text-danger',
                          isRevealed && !isChosen && !isCorrectKind && 'border-line text-ink-muted opacity-50',
                        )}
                      >
                        {MATRIX_KIND_LABEL[k]}
                      </button>
                    )
                  })}
                </div>
                {isRevealed && (
                  <p className={cn('mt-3 animate-in fade-in text-sm leading-relaxed', choice[i] === item.kind ? 'text-pine' : 'text-danger')}>
                    {choice[i] === item.kind ? 'Correcto — ' : 'Incorrecto — '}
                    {item.explain}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl text-ink">Operaciones elementales de renglón</h2>
        <p className="mt-1 mb-5 text-sm text-ink-muted">
          Estas tres operaciones transforman una matriz sin alterar el conjunto solución del sistema asociado.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {ROW_OPERATIONS.map((op) => (
            <div key={op.name} className="rounded border border-line bg-surface p-4">
              <span className="font-display text-base text-pine">{op.name}</span>
              <p className="mt-1 font-mono-nums text-sm text-ink">{op.rule}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{op.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl text-ink">Identifica la operación aplicada</h2>
        <p className="mt-1 mb-5 text-sm text-ink-muted">
          Compara la fila antes y después, y elige qué operación elemental se aplicó.
        </p>
        <div className="flex flex-col gap-3">
          {ROW_OP_QUIZ.map((q, i) => {
            const value = rowOpAnswers[i]
            const isChecked = rowOpChecked[i]
            const isCorrect = value === q.answer
            return (
              <div key={i} className="rounded border border-line bg-surface p-4">
                <p className="font-mono-nums text-sm text-ink">
                  Antes: {q.before} &nbsp;→&nbsp; Después: {q.after}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(['Intercambio', 'Escalamiento', 'Adición'] as const).map((op) => (
                    <button
                      key={op}
                      onClick={() => setRowOpAnswers((a) => ({ ...a, [i]: op }))}
                      disabled={isChecked}
                      className={cn(
                        'rounded border px-3 py-1.5 text-sm font-medium transition',
                        value === op ? 'border-pine text-pine' : 'border-line-strong text-ink hover:border-pine/50',
                        isChecked && 'opacity-70',
                      )}
                    >
                      {op}
                    </button>
                  ))}
                  <button
                    onClick={() => setRowOpChecked((c) => ({ ...c, [i]: true }))}
                    disabled={!value || isChecked}
                    className="rounded border border-line-strong px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-surface-raised disabled:opacity-40"
                  >
                    Verificar
                  </button>
                  {isChecked && (
                    <span className={cn('self-center text-sm font-medium', isCorrect ? 'text-pine' : 'text-danger')}>
                      {isCorrect ? '✓ Correcto' : `✗ Era ${q.answer}`}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
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

function MatrixGrid({ rows }: { rows: number[][] }) {
  return (
    <div className="inline-flex items-stretch gap-2 rounded bg-surface-raised p-3 font-mono-nums">
      <div className="w-2 rounded-l border-y-2 border-l-2 border-line-strong" />
      <div className="flex flex-col gap-1.5 py-1">
        {rows.map((row, r) => (
          <div key={r} className="flex gap-3">
            {row.map((v, c) => (
              <span key={c} className={cn('w-6 text-center text-sm', r === c ? 'text-pine font-bold' : 'text-ink')}>
                {v}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="w-2 rounded-r border-y-2 border-r-2 border-line-strong" />
    </div>
  )
}
