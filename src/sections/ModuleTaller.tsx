import { useState } from 'react'
import { ModuleShell } from '@/components/app/ModuleShell'
import {
  MATRIX_KIND_LABEL,
  TALLER1_AUGMENTED_ITEMS,
  TALLER1_MATRIX_CLASSIFY_ITEMS,
  TALLER1_RANK_ITEMS,
  TALLER1_ROWOP_SEQ,
  TALLER1_RREF_ITEMS,
  type MatrixKind,
  type SectionId,
} from '@/data/content'
import { cn } from '@/lib/utils'

interface ModuleProps {
  onNavigate: (id: SectionId) => void
  onDone: () => void
}

const KIND_OPTIONS: MatrixKind[] = ['diagonal', 'identidad', 'triSup', 'triInf', 'simetrica', 'ninguna']

function NumericCheckField({
  question,
  answer,
  tolerance = 0.01,
  onCorrect,
}: {
  question: string
  answer: number
  tolerance?: number
  onCorrect?: () => void
}) {
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(false)
  const isCorrect = Math.abs(Number(value) - answer) < tolerance

  return (
    <div className="rounded border border-line bg-surface p-4">
      <p className="text-sm text-ink">{question}</p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          type="number"
          step="any"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Respuesta"
          className="w-28 rounded border border-line-strong bg-surface px-3 py-1.5 font-mono-nums text-sm text-ink outline-none focus:border-pine"
        />
        <button
          onClick={() => {
            setChecked(true)
            if (Math.abs(Number(value) - answer) < tolerance) onCorrect?.()
          }}
          disabled={value === ''}
          className="rounded border border-line-strong px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-surface-raised disabled:opacity-40"
        >
          Verificar
        </button>
        {checked && (
          <span className={cn('text-sm font-medium', isCorrect ? 'text-pine' : 'text-danger')}>
            {isCorrect ? '✓ Correcto' : `✗ La respuesta correcta es ${answer}`}
          </span>
        )}
      </div>
    </div>
  )
}

function ExerciseHeader({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pine/15 font-mono-nums text-sm font-bold text-pine">
        {n}
      </span>
      <h2 className="font-display text-xl text-ink">{title}</h2>
    </div>
  )
}

function MatrixGrid({ rows, augCol }: { rows: number[][]; augCol?: number }) {
  return (
    <div className="inline-flex items-stretch gap-2 rounded bg-surface-raised p-3 font-mono-nums">
      <div className="w-2 rounded-l border-y-2 border-l-2 border-line-strong" />
      <div className="flex flex-col gap-1.5 py-1">
        {rows.map((row, r) => (
          <div key={r} className="flex items-center gap-3">
            {row.map((v, c) => (
              <span key={c} className="flex items-center gap-3">
                {augCol !== undefined && c === augCol && <span className="h-4 w-px bg-line-strong" />}
                <span className="w-6 text-center text-sm text-ink">{v}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="w-2 rounded-r border-y-2 border-r-2 border-line-strong" />
    </div>
  )
}

function SystemBlock({ lines }: { lines: string[] }) {
  return (
    <p className="font-mono-nums text-sm leading-relaxed text-ink">
      {lines.map((l, i) => (
        <span key={i}>
          {l}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  )
}

function RevealButton({ open, onClick, showLabel, hideLabel }: { open: boolean; onClick: () => void; showLabel: string; hideLabel: string }) {
  return (
    <button
      onClick={onClick}
      className="rounded border border-line-strong px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-surface-raised"
    >
      {open ? hideLabel : showLabel}
    </button>
  )
}

export function ModuleTaller({ onNavigate, onDone }: ModuleProps) {
  const [, setDoneFlags] = useState<Record<string, boolean>>({})
  const markSub = (key: string) => {
    setDoneFlags((d) => {
      const next = { ...d, [key]: true }
      if (Object.keys(next).length >= 4) onDone()
      return next
    })
  }

  // Bloque 1
  const [augRevealed, setAugRevealed] = useState<Record<number, boolean>>({})

  // Bloque 2
  const [b2Revealed, setB2Revealed] = useState<Record<number, boolean>>({})
  const [b2Choice, setB2Choice] = useState<Record<number, MatrixKind>>({})
  const chooseB2 = (i: number, kind: MatrixKind) => {
    if (b2Revealed[i]) return
    setB2Choice((c) => ({ ...c, [i]: kind }))
    setB2Revealed((r) => {
      const next = { ...r, [i]: true }
      markSub('b2')
      return next
    })
  }

  // Bloque 3
  const [b3Revealed, setB3Revealed] = useState<Record<number, boolean>>({})

  // Bloque 4
  const [b4Step, setB4Step] = useState<Record<number, number>>({})

  // Bloque 5
  const [b5Revealed, setB5Revealed] = useState<Record<number, boolean>>({})
  const [b5RrefInputs, setB5RrefInputs] = useState<Record<string, string>>({})
  const [b5RrefChecked, setB5RrefChecked] = useState<Record<number, boolean>>({})
  const [b5Class, setB5Class] = useState<Record<number, string>>({})
  const [b5ClassChecked, setB5ClassChecked] = useState<Record<number, boolean>>({})

  return (
    <ModuleShell
      id="taller"
      eyebrow="Módulo 07 · Semana 2"
      title="Taller de Saberes Previos y Consolidación"
      onNavigate={onNavigate}
      intro="Cinco bloques de ejercicios para consolidar matrices, matriz aumentada, operaciones elementales de fila, rango y el Teorema del Rango. Los ejercicios de escritura son para tu cuaderno; las casillas numéricas verifican tu respuesta al instante."
    >
      {/* Bloque 1 */}
      <section className="mb-14">
        <ExerciseHeader n={1} title="Escribir la matriz aumentada" />
        <p className="mb-5 text-sm leading-relaxed text-ink-muted">
          Para cada sistema, escribe en tu cuaderno la matriz aumentada [A | b] y luego verifica con el botón.
        </p>
        <div className="flex flex-col gap-4">
          {TALLER1_AUGMENTED_ITEMS.map((item, i) => (
            <div key={i} className="rounded border border-line bg-surface p-4">
              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-ink-muted">
                Sistema {i + 1}
              </span>
              <SystemBlock lines={item.system} />
              {item.note && <p className="mt-2 text-xs text-ink-muted">{item.note}</p>}
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <RevealButton
                  open={!!augRevealed[i]}
                  showLabel="Mostrar matriz aumentada"
                  hideLabel="Ocultar"
                  onClick={() => {
                    setAugRevealed((r) => ({ ...r, [i]: !r[i] }))
                    markSub(`aug-${i}`)
                  }}
                />
              </div>
              {augRevealed[i] && (
                <div className="mt-3 animate-in fade-in">
                  <MatrixGrid rows={item.rows} augCol={item.rows[0].length - 1} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bloque 2 */}
      <section className="mb-14">
        <ExerciseHeader n={2} title="Identificar el tipo de matriz" />
        <p className="mb-5 text-sm leading-relaxed text-ink-muted">
          Clasifica cada matriz como Diagonal, Identidad, Triangular Superior, Triangular Inferior, Simétrica o
          Ninguna de las anteriores.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {TALLER1_MATRIX_CLASSIFY_ITEMS.map((item, i) => {
            const isRevealed = b2Revealed[i]
            return (
              <div key={i} className="rounded border border-line bg-surface p-4">
                <MatrixGrid rows={item.rows} />
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {KIND_OPTIONS.map((k) => {
                    const isChosen = b2Choice[i] === k
                    const isCorrectKind = k === item.kind
                    return (
                      <button
                        key={k}
                        onClick={() => chooseB2(i, k)}
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
                  <p className={cn('mt-3 animate-in fade-in text-sm leading-relaxed', b2Choice[i] === item.kind ? 'text-pine' : 'text-danger')}>
                    {b2Choice[i] === item.kind ? 'Correcto — ' : 'Incorrecto — '}
                    {item.explain}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Bloque 3 */}
      <section className="mb-14">
        <ExerciseHeader n={3} title="Secuencias de operaciones elementales de fila" />
        <p className="mb-5 text-sm leading-relaxed text-ink-muted">
          Aplica la secuencia de operaciones <strong>en el orden dado</strong> y verifica la entrada indicada del
          resultado final.
        </p>
        <div className="flex flex-col gap-4">
          {TALLER1_ROWOP_SEQ.map((item, i) => (
            <div key={i} className="rounded border border-line bg-surface p-4">
              <MatrixGrid rows={item.rows} augCol={item.augCol} />
              <ol className="mt-3 flex flex-col gap-1 text-sm text-ink-muted">
                {item.ops.map((op, k) => (
                  <li key={k} className="font-mono-nums text-ink">
                    {k + 1}. {op}
                  </li>
                ))}
              </ol>
              <div className="mt-3 flex flex-col gap-3">
                <NumericCheckField
                  question={`Verificación: valor en la posición (${item.checkPos[0]}, ${item.checkPos[1]}) de la matriz final.`}
                  answer={item.checkAnswer}
                  onCorrect={() => markSub(`row-${i}`)}
                />
                <div>
                  <RevealButton
                    open={!!b3Revealed[i]}
                    showLabel="Mostrar matriz final completa"
                    hideLabel="Ocultar"
                    onClick={() => setB3Revealed((r) => ({ ...r, [i]: !r[i] }))}
                  />
                </div>
                {b3Revealed[i] && (
                  <div className="animate-in fade-in">
                    <MatrixGrid rows={item.finalRows} augCol={item.augCol} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bloque 4 */}
      <section className="mb-14">
        <ExerciseHeader n={4} title="De un sistema al rango: escalonar de forma guiada" />
        <p className="mb-5 text-sm leading-relaxed text-ink-muted">
          Escribe la matriz aumentada, escalónala usando las operaciones sugeridas y determina el rango, las
          variables pivote y las variables libres.
        </p>
        <div className="flex flex-col gap-4">
          {TALLER1_RANK_ITEMS.map((item, i) => {
            const step = b4Step[i] ?? 0
            return (
              <div key={i} className="rounded border border-line bg-surface p-4">
                <span
                  className={cn(
                    'mb-2 inline-block rounded-full border px-2 py-0.5 text-xs font-medium',
                    item.tag === 'scd' ? 'border-pine text-pine' : 'border-warm text-warm',
                  )}
                >
                  {item.tag === 'scd' ? 'rango completo' : 'variables libres'}
                </span>
                <SystemBlock lines={item.system} />
                <div className="mt-3 flex flex-wrap gap-2">
                  <RevealButton
                    open={step >= 1}
                    showLabel="Paso 1 · Mostrar matriz aumentada"
                    hideLabel="Paso 1 · Ocultar matriz aumentada"
                    onClick={() => setB4Step((s) => ({ ...s, [i]: step >= 1 ? 0 : 1 }))}
                  />
                  {step >= 1 && (
                    <RevealButton
                      open={step >= 2}
                      showLabel="Paso 2 · Escalonar (ver operaciones y resultado)"
                      hideLabel="Paso 2 · Ocultar escalonamiento"
                      onClick={() => setB4Step((s) => ({ ...s, [i]: step >= 2 ? 1 : 2 }))}
                    />
                  )}
                </div>
                {step >= 1 && (
                  <div className="mt-3 animate-in fade-in">
                    <MatrixGrid rows={item.augRows} augCol={item.augRows[0].length - 1} />
                  </div>
                )}
                {step >= 2 && (
                  <div className="mt-3 animate-in fade-in">
                    <ol className="mb-2 flex flex-col gap-1 font-mono-nums text-sm text-ink-muted">
                      {item.echelonOps.map((op, k) => (
                        <li key={k}>
                          {k + 1}. {op}
                        </li>
                      ))}
                    </ol>
                    <MatrixGrid rows={item.echelonRows} augCol={item.echelonRows[0].length - 1} />
                  </div>
                )}
                <div className="mt-4 flex flex-col gap-3">
                  <NumericCheckField
                    question="¿Cuál es el rango de la matriz de coeficientes?"
                    answer={item.rank}
                    onCorrect={() => markSub(`rank-${i}`)}
                  />
                  <NumericCheckField
                    question="¿Cuántas variables libres tiene el sistema?"
                    answer={item.freeCount}
                    onCorrect={() => markSub(`free-${i}`)}
                  />
                </div>
                {step >= 2 && (
                  <p className="mt-3 text-xs text-ink-muted">
                    Variables pivote: <strong className="text-ink">{item.pivotVars}</strong> · Variables libres:{' '}
                    <strong className="text-ink">{item.freeVars}</strong>
                    {item.extra ? ` — ${item.extra}` : ''}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Bloque 5 */}
      <section>
        <ExerciseHeader n={5} title="RREF y el Teorema del Rango" />
        <p className="mb-4 text-sm leading-relaxed text-ink-muted">
          Los tres sistemas comparten las mismas dos primeras ecuaciones — solo cambia la tercera. Escalona cada uno
          hasta su forma escalonada <strong>reducida</strong> (RREF) y usa el Teorema del Rango para clasificarlo.
        </p>
        <div className="mb-6 rounded border-l-4 border-pine bg-pine/10 p-4 text-sm leading-relaxed text-ink">
          <strong className="text-pine">Observación: </strong>
          la forma escalonada por filas (REF) <em>no es única</em> — dos secuencias válidas de operaciones pueden
          terminar en matrices distintas, aunque ambas sean correctas. La forma escalonada <strong>reducida</strong>{' '}
          (RREF) sí es única para cada matriz: por eso este ejercicio pide sus valores exactos y no los de una
          escalonada cualquiera.
        </div>
        <div className="flex flex-col gap-5">
          {TALLER1_RREF_ITEMS.map((item, i) => {
            const inputsFilled = item.rrefRows.every((row, r) =>
              row.every((_, c) => b5RrefInputs[`${i}-${r}-${c}`] !== undefined && b5RrefInputs[`${i}-${r}-${c}`] !== ''),
            )
            const rrefChecked = b5RrefChecked[i]
            const rrefCorrect =
              rrefChecked &&
              item.rrefRows.every((row, r) =>
                row.every((v, c) => Math.abs(Number(b5RrefInputs[`${i}-${r}-${c}`] ?? NaN) - v) < 0.01),
              )
            const classChecked = b5ClassChecked[i]
            const classCorrect = b5Class[i] === item.classification
            return (
              <div key={i} className="rounded border border-line bg-surface p-4">
                <SystemBlock lines={item.system} />
                <div className="mt-3">
                  <RevealButton
                    open={!!b5Revealed[i]}
                    showLabel="Mostrar matriz aumentada"
                    hideLabel="Ocultar"
                    onClick={() => setB5Revealed((r) => ({ ...r, [i]: !r[i] }))}
                  />
                </div>
                {b5Revealed[i] && (
                  <div className="mt-3 animate-in fade-in">
                    <MatrixGrid rows={item.augRows} augCol={item.augRows[0].length - 1} />
                  </div>
                )}

                <p className="mt-4 mb-2 text-sm text-ink-muted">
                  Ingresa los valores de la RREF, fila por fila (incluida la columna aumentada):
                </p>
                <div className="flex flex-col gap-1.5">
                  {item.rrefRows.map((row, r) => (
                    <div key={r} className="flex flex-wrap items-center gap-2">
                      {row.map((_, c) => (
                        <input
                          key={c}
                          type="number"
                          step="any"
                          value={b5RrefInputs[`${i}-${r}-${c}`] ?? ''}
                          onChange={(e) =>
                            setB5RrefInputs((s) => ({ ...s, [`${i}-${r}-${c}`]: e.target.value }))
                          }
                          disabled={rrefChecked}
                          className="w-14 rounded border border-line-strong bg-surface px-2 py-1 text-center font-mono-nums text-sm text-ink outline-none focus:border-pine disabled:opacity-70"
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setB5RrefChecked((s) => ({ ...s, [i]: true }))
                      markSub(`rref-${i}`)
                    }}
                    disabled={!inputsFilled || rrefChecked}
                    className="rounded border border-line-strong px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-surface-raised disabled:opacity-40"
                  >
                    Verificar RREF
                  </button>
                  {rrefChecked && (
                    <span className={cn('text-sm font-medium', rrefCorrect ? 'text-pine' : 'text-danger')}>
                      {rrefCorrect ? '✓ Correcto' : '✗ Revisa tus valores'}
                    </span>
                  )}
                </div>

                <p className="mt-4 mb-2 text-sm text-ink-muted">
                  Según el Teorema del Rango, este sistema tiene:
                </p>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { key: 'unica', label: 'Solución única' },
                      { key: 'infinitas', label: 'Infinitas soluciones' },
                      { key: 'inconsistente', label: 'Ninguna solución' },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setB5Class((s) => ({ ...s, [i]: opt.key }))}
                      disabled={classChecked}
                      className={cn(
                        'rounded border px-3 py-1.5 text-sm font-medium transition',
                        b5Class[i] === opt.key ? 'border-pine text-pine' : 'border-line-strong text-ink hover:border-pine/50',
                        classChecked && 'opacity-70',
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setB5ClassChecked((s) => ({ ...s, [i]: true }))
                      if (b5Class[i] === item.classification) markSub(`class-${i}`)
                    }}
                    disabled={!b5Class[i] || classChecked}
                    className="rounded border border-line-strong px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-surface-raised disabled:opacity-40"
                  >
                    Verificar
                  </button>
                  {classChecked && (
                    <span className={cn('text-sm font-medium', classCorrect ? 'text-pine' : 'text-danger')}>
                      {classCorrect ? '✓ Correcto' : '✗ Revisa el rango de A y de [A|b]'}
                    </span>
                  )}
                </div>
                {classChecked && <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.explain}</p>}
              </div>
            )
          })}
        </div>
        <p className="mt-5 text-xs text-ink-muted">
          Nota: las mismas dos primeras ecuaciones definen una recta común a dos planos; la tercera ecuación decide
          si el tercer plano corta esa recta en un punto (5.1), la contiene por completo (5.2) o la elude (5.3).
        </p>
      </section>
    </ModuleShell>
  )
}
