import { useRegisterSW } from 'virtual:pwa-register/react'

export function PwaUpdater() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      registration?.update()
    },
  })

  if (!offlineReady && !needRefresh) return null

  const dismiss = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-sm items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 shadow-lg animate-in fade-in slide-in-from-bottom-4 md:left-auto">
      <p className="flex-1 text-sm text-ink">
        {needRefresh
          ? 'Hay una versión nueva del curso disponible.'
          : 'El curso ya está disponible sin conexión.'}
      </p>
      {needRefresh ? (
        <button
          onClick={() => updateServiceWorker(true)}
          className="shrink-0 rounded border border-line-strong px-3 py-1.5 text-xs font-medium text-pine transition hover:bg-surface-raised"
        >
          Actualizar
        </button>
      ) : (
        <button
          onClick={dismiss}
          className="shrink-0 rounded border border-line-strong px-3 py-1.5 text-xs font-medium text-ink-muted transition hover:bg-surface-raised"
        >
          Listo
        </button>
      )}
    </div>
  )
}
