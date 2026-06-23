"use client"
import { useEffect, useState } from "react"

type GsapCore = typeof import("gsap")["default"]
type ScrollTriggerType = typeof import("gsap/ScrollTrigger")["default"]

export function useGsapReady() {
  const [ready, setReady] = useState(false)
  const [gsap, setGsap] = useState<GsapCore | null>(null)
  const [ScrollTrigger, setScrollTrigger] = useState<ScrollTriggerType | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapMod, stMod]) => {
      if (cancelled) return
      const g = gsapMod.default || gsapMod.gsap
      const st = stMod.default || stMod.ScrollTrigger
      g.registerPlugin(st)
      setGsap(g as GsapCore)
      setScrollTrigger(st as ScrollTriggerType)
      setReady(true)
    })
    return () => { cancelled = true }
  }, [])

  return { ready, gsap, ScrollTrigger }
}
