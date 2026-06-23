"use client"

import dynamic from "next/dynamic"

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <section className="h-screen bg-brand-iron flex items-center justify-center">
      <div className="text-brand-amber/30 font-display font-extrabold text-xl uppercase tracking-widest animate-pulse">
        Loading Experience...
      </div>
    </section>
  ),
})

export default function ScrollHero() {
  return <Scene3D />
}
