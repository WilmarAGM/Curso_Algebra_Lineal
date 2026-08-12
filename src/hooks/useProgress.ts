import { useCallback, useEffect, useState } from 'react'
import type { SectionId } from '@/data/content'

const STORAGE_KEY = 'algebra-lineal-progreso-v1'

export function useProgress() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setCompleted(JSON.parse(raw))
    } catch {
      // localStorage no disponible; el progreso solo vive en memoria
    }
  }, [])

  const markComplete = useCallback((id: SectionId) => {
    setCompleted((prev) => {
      const next = { ...prev, [id]: true }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // ignorar si no hay almacenamiento disponible
      }
      return next
    })
  }, [])

  return { completed, markComplete }
}
