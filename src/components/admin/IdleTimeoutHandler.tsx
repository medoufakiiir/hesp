"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { signOut, useSession } from "next-auth/react"

const WARNING_AFTER_MS = 9 * 60 * 1000 // show warning at 9 minutes idle
const LOGOUT_AFTER_MS = 10 * 60 * 1000 // sign out at 10 minutes idle
const ACTIVITY_THROTTLE_MS = 1000 // ignore activity bursts within this window

const ACTIVITY_EVENTS = ["mousemove", "keydown", "click", "scroll"] as const

/** Idle-logout for the admin panel. Mounted once in src/app/admin/layout.tsx.
 * Only arms itself while a session actually exists, so it's inert on
 * /admin/login. Both timers are scheduled together from the same activity
 * timestamp (not chained off each other), so logout still fires at the
 * 10-minute mark even though no further activity occurs after the warning
 * is shown — that's expected, not a bug. */
export default function IdleTimeoutHandler() {
  const { status } = useSession()
  const [showWarning, setShowWarning] = useState(false)
  const warningTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastReset = useRef(0)

  const clearTimers = useCallback(() => {
    if (warningTimer.current) clearTimeout(warningTimer.current)
    if (logoutTimer.current) clearTimeout(logoutTimer.current)
  }, [])

  // setState-free: only (re)schedules the two timeouts. Safe to call
  // directly from the effect body below.
  const armTimers = useCallback(() => {
    clearTimers()
    warningTimer.current = setTimeout(() => setShowWarning(true), WARNING_AFTER_MS)
    logoutTimer.current = setTimeout(() => {
      signOut({ callbackUrl: "/admin/login" })
    }, LOGOUT_AFTER_MS)
  }, [clearTimers])

  // Hides the warning (if shown) and reschedules — only called from event
  // callbacks (activity listener, "Stay logged in" click), never directly
  // from an effect body.
  const resetTimers = useCallback(() => {
    setShowWarning(false)
    lastReset.current = Date.now()
    armTimers()
  }, [armTimers])

  useEffect(() => {
    if (status !== "authenticated") {
      clearTimers()
      return
    }

    lastReset.current = Date.now()
    armTimers()

    const handleActivity = () => {
      const now = Date.now()
      if (now - lastReset.current < ACTIVITY_THROTTLE_MS) return
      resetTimers()
    }

    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, handleActivity, { passive: true }))
    return () => {
      clearTimers()
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, handleActivity))
    }
  }, [status, armTimers, clearTimers, resetTimers])

  if (!showWarning) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-2xl border border-brand-amber/20 bg-brand-iron p-6 shadow-2xl shadow-black/40">
        <h2 className="font-display font-extrabold uppercase tracking-tight text-lg text-brand-white">
          Still there?
        </h2>
        <p className="text-brand-muted text-sm mt-2">
          You&apos;ll be signed out in 1 minute due to inactivity.
        </p>
        <div className="mt-5 flex justify-end">
          <button
            onClick={resetTimers}
            className="bg-brand-amber text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer"
          >
            Stay logged in
          </button>
        </div>
      </div>
    </div>
  )
}
