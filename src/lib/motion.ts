import type { Variants } from "framer-motion"

export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

export const fadeInLeft: Variants = {
  hidden:  { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

export const fadeInRight: Variants = {
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.90 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: "easeOut" } }
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } }
}

export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.0 } }
}

export const slideUp: Variants = {
  hidden:  { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.80, ease: [0.16, 1, 0.3, 1] } }
}

export const viewportOnce = { once: true, margin: "-80px" } as const

// --- Advanced motion variants ---

export const blurFadeIn: Variants = {
  hidden:  { opacity: 0, filter: "blur(12px)", y: 24 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

export const clipReveal: Variants = {
  hidden:  { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: { clipPath: "inset(0 0% 0 0)", opacity: 1, transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } }
}

export const rotateIn: Variants = {
  hidden:  { opacity: 0, rotate: -6, scale: 0.92 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export const slideFromBottom: Variants = {
  hidden:  { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
}

export const elasticScale: Variants = {
  hidden:  { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20, mass: 0.8 } }
}

export const drawLine: Variants = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
}

export const staggerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
}

export const counterPulse: Variants = {
  hidden:  { opacity: 0, scale: 0.5, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 12 } }
}

export const shimmer: Variants = {
  hidden:  { opacity: 0, x: -20, skewX: -2 },
  visible: { opacity: 1, x: 0, skewX: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
}

export const floatAnimation = {
  y: [-8, 8, -8],
  transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
}

export const pulseGlow = {
  boxShadow: [
    "0 0 20px rgba(217, 119, 6, 0.0)",
    "0 0 40px rgba(217, 119, 6, 0.3)",
    "0 0 20px rgba(217, 119, 6, 0.0)",
  ],
  transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
}
