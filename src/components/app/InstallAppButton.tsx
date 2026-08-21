import { useEffect, useRef, useState } from 'react'
import { Download, Share2 } from 'lucide-react'
import { useInstallPrompt } from '@/hooks/useInstallPrompt'

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent)
}

export function InstallAppButton() {
  const { canInstall, installed, promptInstall } = useInstallPrompt()
  const [showIosHint, setShowIosHint] = useState(false)
  const [ios, setIos] = useState(false)
  const hintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIos(isIos())
  }, [])

  useEffect(() => {
    if (!showIosHint) return
    const onClickOutside = (e: MouseEvent) => {
      if (hintRef.current && !hintRef.current.contains(e.target as Node)) setShowIosHint(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [showIosHint])

  if (installed || (!canInstall && !ios)) return null

  return (
    <div ref={hintRef} className="relative">
      <button
        onClick={() => (ios ? setShowIosHint((s) => !s) : promptInstall())}
        className="inline-flex items-center gap-1.5 rounded-lg border border-pine/40 bg-pine/10 px-3 py-1.5 text-xs font-medium text-pine transition hover:bg-pine/20"
      >
        <Download className="h-3.5 w-3.5" />
        Instalar app
      </button>
      {showIosHint && (
        <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-lg border border-line bg-surface p-3 text-left text-xs leading-relaxed text-ink-muted shadow-lg animate-in fade-in slide-in-from-top-1">
          Toca <Share2 className="inline h-3 w-3 -translate-y-0.5 text-pine" /> Compartir en Safari y elige{' '}
          <strong className="text-ink">"Agregar a inicio"</strong>.
        </div>
      )}
    </div>
  )
}
