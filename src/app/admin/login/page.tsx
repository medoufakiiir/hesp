"use client"

import { useState } from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, Mail, AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password required"),
})

type LoginData = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [lockedUntil, setLockedUntil] = useState<number | null>(null)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const isLocked = lockedUntil && Date.now() < lockedUntil

  const onSubmit = async (data: LoginData) => {
    if (isLocked) return
    setError("")

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      if (newAttempts >= 5) {
        setLockedUntil(Date.now() + 15 * 60 * 1000)
        setError("Too many failed attempts. Try again in 15 minutes.")
        return
      }
      setError("Invalid email or password")
    } else {
      router.push("/admin/dashboard")
    }
  }

  return (
    <main className="min-h-screen bg-brand-iron flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-amber/[0.03] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md mx-4 p-8 rounded-2xl
          bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent
          backdrop-blur-sm border border-white/[0.07]"
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

        <div className="text-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Riyada Ventures"
            width={200} height={80} priority
            className="h-16 w-auto object-contain mx-auto mb-4"
          />
          <h1 className="font-display font-extrabold uppercase text-2xl tracking-tight text-brand-white">
            HESP Admin
          </h1>
          <p className="text-brand-muted text-sm mt-1">Sign in to manage your content</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            role="alert">
            <AlertCircle size={16} />{error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="login-email" className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input id="login-email" type="email" autoComplete="email"
                {...register("email")}
                aria-invalid={!!errors.email}
                placeholder="admin@riyada-ventures.com"
                className={`input-field pl-11! ${errors.email ? "border-red-500/50" : ""}`} />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="login-password" className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password"
                {...register("password")}
                aria-invalid={!!errors.password}
                placeholder="Password"
                className={`input-field pl-11! pr-11! ${errors.password ? "border-red-500/50" : ""}`} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-white transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <motion.button type="submit" disabled={isSubmitting || !!isLocked}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 bg-brand-amber text-white font-bold uppercase text-sm tracking-widest
              py-4 rounded-xl hover:bg-brand-gold transition-colors shadow-lg shadow-brand-amber/20
              cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? <><Loader2 size={18} className="animate-spin" />Signing in...</> : "Sign In"}
          </motion.button>
        </form>
      </motion.div>
    </main>
  )
}
