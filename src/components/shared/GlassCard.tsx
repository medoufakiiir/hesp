"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover3D?: boolean
  glowColor?: string
}

export default function GlassCard({ children, className = "", delay = 0, hover3D = true, glowColor = "brand-amber" }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(y, [0, 1], [6, -6]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-6, 6]), { stiffness: 200, damping: 25 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!hover3D) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }
  const handleLeave = () => { x.set(0.5); y.set(0.5) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={hover3D ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
      initial={{ opacity: 0, y: 40, rotateX: hover3D ? 6 : 0 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.015 }}
      className={`group relative rounded-2xl overflow-hidden cursor-default
        bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent
        backdrop-blur-sm border border-white/[0.07]
        hover:border-${glowColor}/25 hover:shadow-2xl hover:shadow-${glowColor}/10
        transition-[border,box-shadow] duration-500 ${className}`}
    >
      {/* Top edge glass highlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />
      {/* Hover glow */}
      <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700
        bg-gradient-to-br from-${glowColor}/[0.08] via-transparent to-${glowColor}/[0.03] pointer-events-none`} />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
