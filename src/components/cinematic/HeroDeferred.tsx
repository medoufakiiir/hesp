"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// ScrollHero already lazy-loads Scene3D with ssr:false. We additionally hold off
// importing/mounting it until the browser is idle, so the 1MB Three.js bundle is
// parsed and the WebGL render loop starts AFTER first paint + hydration finish.
// This is what cuts Total Blocking Time — the static fallback paints instantly and
// becomes the LCP candidate, then the 3D scene swaps in.
const ScrollHero = dynamic(() => import("./ScrollHero"), { ssr: false })

const HeroFallback = () => (
  <section className="h-screen bg-brand-iron flex items-center justify-center" aria-hidden="true">
    <div className="text-brand-amber/30 font-display font-extrabold text-xl uppercase tracking-widest animate-pulse">
      Loading Experience...
    </div>
  </section>
)

export default function HeroDeferred() {
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    type IdleWindow = Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
    }
    const w = window as IdleWindow
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setIdle(true), { timeout: 2000 })
      return () => (w as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id)
    }
    const t = setTimeout(() => setIdle(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return idle ? <ScrollHero /> : <HeroFallback />
}
