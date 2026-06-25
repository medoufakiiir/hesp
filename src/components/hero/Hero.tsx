"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { useLang } from "@/context/LangContext"
import { cinematicText } from "@/data/cinematic-translations"
import { useReducedMotion } from "@/hooks/useReducedMotion"

// Same background images, in the same order, as the old Three.js Scene3D hero.
const imagePaths = [
  "/images/equipment/excavator-1.jpg",
  "/images/equipment/bulldozer-1.jpg",
  "/images/equipment/crane-1.jpg",
  "/images/equipment/loader-1.jpg",
  "/images/equipment/dump-truck-1.jpg",
  "/images/equipment/hydraulic-parts.jpg",
  "/images/equipment/workshop.jpg",
]

const AUTOPLAY_MS = 5000

// All animation is CSS-driven (no rAF / WebGL / canvas). Keyframes are scoped to
// this component and disabled under prefers-reduced-motion.
const heroCss = `
@keyframes heroIntroFade { from { opacity: 1 } to { opacity: 0 } }
@keyframes heroSpin { to { transform: rotate(360deg) } }
@keyframes heroSpinRev { to { transform: rotate(-360deg) } }
@keyframes heroFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-22px) } }
.hero-intro { animation: heroIntroFade .8s ease-out forwards; }
.hero-ring { animation: heroSpin 26s linear infinite; }
.hero-ring--rev { animation: heroSpinRev 34s linear infinite; }
.hero-ring--slow { animation: heroSpin 44s linear infinite; }
.hero-particle { animation: heroFloat 6s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .hero-intro { animation: none; opacity: 0; }
  .hero-ring, .hero-ring--rev, .hero-ring--slow, .hero-particle { animation: none; }
}
`

const particles = [
  { top: "18%", left: "12%", size: 6, delay: "0s" },
  { top: "30%", left: "82%", size: 4, delay: "1.2s" },
  { top: "68%", left: "20%", size: 5, delay: "2.1s" },
  { top: "75%", left: "70%", size: 4, delay: "0.6s" },
  { top: "45%", left: "90%", size: 5, delay: "1.8s" },
  { top: "55%", left: "8%", size: 4, delay: "2.6s" },
]

export default function Hero() {
  const { lang, isArabic } = useLang()
  const frames = cinematicText[lang].hero.frames
  const reduced = useReducedMotion()

  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startAutoplay = useCallback(() => {
    if (reduced) return
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % imagePaths.length)
    }, AUTOPLAY_MS)
  }, [reduced])

  useEffect(() => {
    startAutoplay()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startAutoplay])

  const goTo = (i: number) => {
    setActive(i)
    startAutoplay() // reset autoplay timing on manual navigation
  }

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-brand-iron"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <style dangerouslySetInnerHTML={{ __html: heroCss }} />

      {/* ── Background slides (crossfade) ── */}
      <div className="absolute inset-0 z-0">
        {imagePaths.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={frames[i]?.headline.replace("\n", " ") || "Heavy equipment"}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
        {/* Darkening + vignette — replicates the old fog/vignette mood */}
        <div className="absolute inset-0 bg-brand-iron/65" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(17,19,24,0.85) 100%)" }}
        />
      </div>

      {/* ── Decorative CSS rings (replace Three.js gears) ── */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="hero-ring absolute -left-24 -top-24 h-72 w-72 rounded-full border border-brand-amber/20" />
        <div className="hero-ring--rev absolute -right-16 top-1/3 h-96 w-96 rounded-full border border-brand-amber/15" />
        <div className="hero-ring--slow absolute -bottom-28 left-10 h-64 w-64 rounded-full border border-brand-amber/10" />
        {particles.map((p, i) => (
          <span
            key={i}
            className="hero-particle absolute rounded-full bg-brand-amber/50"
            style={{ top: p.top, left: p.left, width: p.size, height: p.size, animationDelay: p.delay }}
          />
        ))}
      </div>

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Centered text (crossfade per slide) ── */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
        <div className={`relative text-center max-w-5xl px-6 ${isArabic ? "font-arabic" : ""}`}>
          {frames.slice(0, imagePaths.length).map((frame, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
                active === i ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-sm"
              }`}
            >
              <h1
                className={`text-brand-white leading-[0.9] whitespace-pre-line ${
                  isArabic
                    ? "font-arabic font-bold text-[clamp(2.5rem,8vw,6rem)]"
                    : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,9vw,7rem)]"
                }`}
                style={{ textShadow: "0 0 60px rgba(217,119,6,0.3), 0 4px 30px rgba(0,0,0,0.7)" }}
              >
                {frame.headline}
              </h1>
              <p
                className="text-brand-white/50 text-sm sm:text-base lg:text-lg mt-6 max-w-xl mx-auto"
                style={{ textShadow: "0 2px 15px rgba(0,0,0,0.8)" }}
              >
                {frame.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Frame counter */}
      <div className={`absolute top-28 z-[3] font-display ${isArabic ? "left-6 lg:left-12" : "right-6 lg:right-12"}`}>
        <span className="text-brand-amber font-bold text-base">{String(active + 1).padStart(2, "0")}</span>
        <span className="text-brand-white/15 mx-2 text-xs">/</span>
        <span className="text-brand-white/15 text-xs">{String(imagePaths.length).padStart(2, "0")}</span>
      </div>

      {/* Progress dots / navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex items-center gap-2">
        {imagePaths.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-500 ${
              active === i ? "w-8 h-2 bg-brand-amber shadow-lg shadow-brand-amber/50" : "w-2 h-2 bg-brand-white/15 hover:bg-brand-white/40"
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 group"
        aria-label="Scroll to explore"
      >
        <span className="text-brand-white/20 text-[9px] uppercase tracking-[0.3em] font-bold group-hover:text-brand-amber/60 transition-colors">
          Scroll to explore
        </span>
        <span className="w-5 h-8 rounded-full border border-brand-white/15 flex justify-center pt-1.5">
          <span className="hero-particle w-1 h-2 bg-brand-amber rounded-full" />
        </span>
      </button>

      {/* ── Intro overlay: CSS-only black fade (replaces the 70% Three.js preloader) ── */}
      <div className="hero-intro absolute inset-0 z-[40] bg-black pointer-events-none" aria-hidden="true" />
    </section>
  )
}
