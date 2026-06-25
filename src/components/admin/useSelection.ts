"use client"

import { useCallback, useState } from "react"

// Lightweight multi-select state for bulk actions on bespoke admin lists.
export function useSelection() {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })
  }, [])

  const toggleAll = useCallback((ids: string[]) => {
    setSelected((prev) => (prev.size === ids.length && ids.length > 0 ? new Set() : new Set(ids)))
  }, [])

  const clear = useCallback(() => setSelected(new Set()), [])

  const isAllSelected = useCallback(
    (ids: string[]) => ids.length > 0 && ids.every((id) => selected.has(id)),
    [selected]
  )

  return { selected, toggle, toggleAll, clear, isAllSelected }
}
