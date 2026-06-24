"use client"

import { useRef, useMemo, useState, useEffect, useCallback, Suspense } from "react"
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { TextureLoader, MathUtils, Vector2 } from "three"
import type { Mesh, Group } from "three"
import { useLang } from "@/context/LangContext"
import { cinematicText } from "@/data/cinematic-translations"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const imagePaths = [
  "/images/equipment/excavator-1.jpg",
  "/images/equipment/bulldozer-1.jpg",
  "/images/equipment/crane-1.jpg",
  "/images/equipment/loader-1.jpg",
  "/images/equipment/dump-truck-1.jpg",
  "/images/equipment/hydraulic-parts.jpg",
  "/images/equipment/workshop.jpg",
]

// Shared mouse state - avoids per-component listeners
const mouseState = { x: 0, y: 0, targetX: 0, targetY: 0 }

function Gear({ position, size = 1, speed = 0.3, color = "#D97706" }: {
  position: [number, number, number]; size?: number; speed?: number; color?: string
}) {
  const ref = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.z += delta * speed
    // React to cursor
    ref.current.position.x = position[0] + mouseState.x * 0.15
    ref.current.position.y = position[1] + mouseState.y * 0.1
  })
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[size, size * 0.15, 6, 24]} />
      <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} emissive={color} emissiveIntensity={0.15} />
    </mesh>
  )
}

function HexBolt({ position, size = 0.3 }: { position: [number, number, number]; size?: number }) {
  const ref = useRef<Mesh>(null)
  const speed = useMemo(() => Math.random() * 0.5 + 0.2, [])
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.5
    ref.current.rotation.y += 0.005
  })
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={ref} position={position}>
        <cylinderGeometry args={[size, size, size * 0.4, 6]} />
        <meshStandardMaterial color="#2A3144" metalness={0.95} roughness={0.1} />
      </mesh>
    </Float>
  )
}

function WireBox({ position, size = 1, color = "#D97706" }: {
  position: [number, number, number]; size?: number; color?: string
}) {
  const ref = useRef<Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.08
    ref.current.rotation.y = state.clock.elapsedTime * 0.12
    ref.current.position.x = position[0] + mouseState.x * 0.08
    ref.current.position.y = position[1] + mouseState.y * 0.06
  })
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color={color} wireframe transparent opacity={0.25} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  )
}

function ImagePanel({ path, index, activeIndex }: {
  path: string; index: number; activeIndex: number
}) {
  const meshRef = useRef<Mesh>(null)
  const frameRef = useRef<Mesh>(null)
  const texture = useLoader(TextureLoader, path)
  const isActive = index === activeIndex
  const opacity = useRef(index === 0 ? 1 : 0)

  useFrame((state) => {
    if (!meshRef.current || !frameRef.current) return
    const target = isActive ? 1 : 0
    opacity.current = MathUtils.lerp(opacity.current, target, 0.05)

    const mat = meshRef.current.material as any
    if (mat.opacity !== undefined) mat.opacity = opacity.current
    const frameMat = frameRef.current.material as any
    if (frameMat.opacity !== undefined) frameMat.opacity = opacity.current * 0.5

    const targetZ = isActive ? 0 : -3
    meshRef.current.position.z = MathUtils.lerp(meshRef.current.position.z, targetZ, 0.04)
    frameRef.current.position.z = meshRef.current.position.z - 0.05

    // Cursor parallax on the image
    meshRef.current.rotation.y = mouseState.x * 0.06
    meshRef.current.rotation.x = -mouseState.y * 0.04
    meshRef.current.position.x = mouseState.x * 0.15
    meshRef.current.position.y = mouseState.y * 0.1 + Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.03

    frameRef.current.rotation.y = mouseState.x * 0.04
    frameRef.current.rotation.x = -mouseState.y * 0.03
    frameRef.current.position.x = mouseState.x * 0.1
    frameRef.current.position.y = mouseState.y * 0.07

    const targetScale = isActive ? 1 : 0.7
    const s = MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.04)
    meshRef.current.scale.set(s, s, s)
    frameRef.current.scale.set(s * 1.06, s * 1.06, 1)
  })

  return (
    <group>
      <mesh ref={frameRef} position={[0, 0, -0.05]}>
        <planeGeometry args={[5, 3.2]} />
        <meshStandardMaterial color="#D97706" transparent opacity={0.5} metalness={0.9} roughness={0.1} emissive="#D97706" emissiveIntensity={0.15} />
      </mesh>
      <mesh ref={meshRef} position={[0, 0, index === 0 ? 0 : -3]}>
        <planeGeometry args={[4.6, 2.9]} />
        <meshBasicMaterial map={texture} transparent opacity={index === 0 ? 1 : 0} />
      </mesh>
    </group>
  )
}

// Reduced particle count, instanced approach
function AmbientParticles({ count = 50 }: { count?: number }) {
  const groupRef = useRef<Group>(null)
  const particles = useMemo(() =>
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 14,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 8,
      speed: Math.random() * 0.3 + 0.1,
      size: Math.random() * 0.018 + 0.006,
    })),
  [count])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.children.forEach((child, i) => {
      const p = particles[i]
      child.position.y = p.y + Math.sin(t * p.speed + i * 0.5) * 0.3
      child.position.x = p.x + Math.cos(t * p.speed * 0.3 + i) * 0.15 + mouseState.x * 0.05
    })
  })

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.size, 4, 4]} />
          <meshStandardMaterial color="#D97706" emissive="#D97706" emissiveIntensity={0.6} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

function ScrollCamera({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()
  useFrame(() => {
    const t = scrollProgress
    // Camera responds to both scroll AND cursor
    const cx = Math.sin(t * Math.PI * 0.8) * 0.5 + mouseState.x * 0.3
    const cy = Math.cos(t * Math.PI * 0.4) * 0.2 + mouseState.y * 0.2
    const cz = 5.5 - t * 1.2
    camera.position.x = MathUtils.lerp(camera.position.x, cx, 0.03)
    camera.position.y = MathUtils.lerp(camera.position.y, cy, 0.03)
    camera.position.z = MathUtils.lerp(camera.position.z, cz, 0.03)
    camera.lookAt(0, 0, 0)
  })
  return null
}

// Cursor-following light
function CursorLight() {
  const lightRef = useRef<any>(null)
  useFrame(() => {
    if (!lightRef.current) return
    lightRef.current.position.x = MathUtils.lerp(lightRef.current.position.x, mouseState.x * 4, 0.05)
    lightRef.current.position.y = MathUtils.lerp(lightRef.current.position.y, mouseState.y * 3 + 1, 0.05)
  })
  return <pointLight ref={lightRef} position={[0, 1, 3]} intensity={1.5} color="#D97706" distance={10} />
}

function InnerScene({ activeIndex, scrollProgress }: { activeIndex: number; scrollProgress: number }) {
  return (
    <>
      <ScrollCamera scrollProgress={scrollProgress} />
      <ambientLight intensity={0.25} />
      <pointLight position={[5, 3, 4]} intensity={1.5} color="#D97706" distance={15} />
      <pointLight position={[-5, -2, 3]} intensity={0.5} color="#64748B" distance={12} />
      <CursorLight />

      <Gear position={[-4.5, 2, -3]} size={0.8} speed={0.2} />
      <Gear position={[4.5, -1.5, -4]} size={1.2} speed={-0.15} color="#F59E0B" />
      <Gear position={[-3, -2.5, -5]} size={0.6} speed={0.3} />

      <HexBolt position={[-3, 1.5, -2]} size={0.2} />
      <HexBolt position={[3.5, -0.5, -2.5]} size={0.25} />
      <HexBolt position={[-2, -1.8, -1.5]} size={0.15} />
      <HexBolt position={[2, 2, -3]} size={0.18} />

      <WireBox position={[-5, -1, -5]} size={1.5} />
      <WireBox position={[5, 2, -6]} size={2} color="#F59E0B" />

      <Suspense fallback={null}>
        {imagePaths.map((path, i) => (
          <ImagePanel key={path} path={path} index={i} activeIndex={activeIndex} />
        ))}
      </Suspense>

      <AmbientParticles count={40} />

      <EffectComposer multisampling={0}>
        <Bloom intensity={0.6} luminanceThreshold={0.4} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette darkness={0.5} offset={0.3} />
      </EffectComposer>
    </>
  )
}

export default function Scene3D() {
  const { lang, isArabic } = useLang()
  const text = cinematicText[lang].hero
  const reduced = useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  // Global cursor tracking — one listener, shared state
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseState.targetX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseState.targetY = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", onMove, { passive: true })

    let raf: number
    const smooth = () => {
      mouseState.x = MathUtils.lerp(mouseState.x, mouseState.targetX, 0.08)
      mouseState.y = MathUtils.lerp(mouseState.y, mouseState.targetY, 0.08)
      raf = requestAnimationFrame(smooth)
    }
    raf = requestAnimationFrame(smooth)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const total = imagePaths.length
    setActiveIndex(Math.min(Math.floor(v * total), total - 1))
    setProgress(v)
  })

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  if (reduced) {
    return (
      <section className="py-20 bg-brand-iron">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {imagePaths.map((src, i) => (
            <div key={i} className="relative aspect-video rounded-2xl overflow-hidden">
              <img src={src} alt={text.frames[i]?.headline.replace("\n", " ") || ""} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-iron/60 flex items-end p-4">
                <h3 className={`text-brand-white font-extrabold text-sm ${isArabic ? "font-arabic" : "font-display uppercase"}`}>
                  {text.frames[i]?.headline.replace("\n", " ")}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-brand-iron">
        <div className="absolute inset-0">
          <Canvas
            gl={{ antialias: false, alpha: false, powerPreference: "high-performance", stencil: false, depth: true }}
            camera={{ position: [0, 0, 5.5], fov: 50 }}
            dpr={[1, 1.5]}
            style={{ background: "#111318" }}
            performance={{ min: 0.5 }}
          >
            <color attach="background" args={["#111318"]} />
            <fog attach="fog" args={["#111318", 8, 16]} />
            <InnerScene activeIndex={activeIndex} scrollProgress={progress} />
          </Canvas>
        </div>

        {/* Text overlay */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
          <div className={`text-center max-w-5xl px-6 ${isArabic ? "font-arabic" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
            {text.frames.map((frame, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: activeIndex === i ? 1 : 0,
                  y: activeIndex === i ? 0 : activeIndex > i ? -50 : 50,
                  scale: activeIndex === i ? 1 : 0.9,
                  filter: activeIndex === i ? "blur(0px)" : "blur(12px)",
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <h2
                  className={`text-brand-white leading-[0.9] whitespace-pre-line ${
                    isArabic
                      ? "font-arabic font-bold text-[clamp(2.5rem,8vw,6rem)]"
                      : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,9vw,7rem)]"
                  }`}
                  style={{ textShadow: "0 0 60px rgba(217,119,6,0.3), 0 4px 30px rgba(0,0,0,0.7)" }}
                >
                  {frame.headline}
                </h2>
                <p className="text-brand-white/50 text-sm sm:text-base lg:text-lg mt-6 max-w-xl mx-auto"
                  style={{ textShadow: "0 2px 15px rgba(0,0,0,0.8)" }}>
                  {frame.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Frame counter */}
        <div className={`absolute top-28 z-[3] font-display ${isArabic ? "left-6 lg:left-12" : "right-6 lg:right-12"}`}>
          <span className="text-brand-amber font-bold text-base">{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="text-brand-white/15 mx-2 text-xs">/</span>
          <span className="text-brand-white/15 text-xs">{String(imagePaths.length).padStart(2, "0")}</span>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex items-center gap-2">
          {imagePaths.map((_, i) => (
            <div key={i} className={`rounded-full transition-all duration-500 ${
              activeIndex === i ? "w-8 h-2 bg-brand-amber shadow-lg shadow-brand-amber/50" : "w-2 h-2 bg-brand-white/15"
            }`} />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
          style={{ opacity: scrollHintOpacity }}>
          <span className="text-brand-white/20 text-[9px] uppercase tracking-[0.3em] font-bold">Scroll to explore</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-brand-white/15 flex justify-center pt-1.5">
            <motion.div className="w-1 h-2 bg-brand-amber rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
