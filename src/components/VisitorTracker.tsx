"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

// Fires a lightweight page-view ping on every public route change.
// Admin routes are ignored both here and on the server.
export default function VisitorTracker() {
  const pathname = usePathname()
  const last = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname) return
    if (pathname.startsWith("/admin")) return
    if (last.current === pathname) return
    last.current = pathname

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, referrer: document.referrer }),
      keepalive: true,
    }).catch(() => {})
  }, [pathname])

  return null
}
