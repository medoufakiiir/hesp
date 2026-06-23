"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, MessageSquare, FileText, Settings, LogOut, Menu, X, ChevronRight } from "lucide-react"

const ADMIN_PASS = "hesp2024"

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false)
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const stored = typeof window !== "undefined" && sessionStorage.getItem("admin_authed")
    if (stored === "true") setAuthed(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pass === ADMIN_PASS) {
      setAuthed(true)
      sessionStorage.setItem("admin_authed", "true")
      setError("")
    } else {
      setError("Invalid password")
    }
  }

  const handleLogout = () => {
    setAuthed(false)
    sessionStorage.removeItem("admin_authed")
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-brand-iron flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Admin Panel</h1>
            <p className="text-brand-muted text-sm">Riyada Ventures - HESP</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter admin password"
              className="input-field text-center"
              autoFocus
            />
            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
            <button type="submit"
              className="w-full bg-brand-amber text-white font-bold uppercase text-sm tracking-widest
                py-4 rounded-xl hover:bg-brand-gold transition-all cursor-pointer">
              Login
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-brand-muted text-xs hover:text-brand-amber transition-colors">
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-iron flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-steel border-r border-brand-amber/10
        transform transition-transform duration-300 lg:translate-x-0 lg:static
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-brand-amber/10">
            <Link href="/admin/dashboard" className="block">
              <h2 className="text-brand-amber font-display font-extrabold uppercase text-lg">HESP Admin</h2>
              <p className="text-brand-muted text-[10px] uppercase tracking-widest mt-1">Riyada Ventures</p>
            </Link>
          </div>

          <nav className="flex-grow p-4 space-y-1">
            {sidebarLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${isActive
                      ? "bg-brand-amber/15 text-brand-amber border border-brand-amber/20"
                      : "text-brand-white/50 hover:text-brand-white hover:bg-brand-white/5"
                    }`}>
                  <Icon size={18} />
                  {label}
                  {isActive && <ChevronRight size={14} className="ml-auto" />}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-brand-amber/10">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-brand-muted text-sm hover:text-brand-white transition-colors">
              ← View Website
            </Link>
            <button onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-red-400 text-sm hover:text-red-300 transition-colors w-full cursor-pointer">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-grow min-h-screen">
        <header className="sticky top-0 z-30 bg-brand-iron/95 backdrop-blur-xl border-b border-brand-amber/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center text-brand-white/70
                rounded-full hover:bg-brand-white/10 transition-all cursor-pointer">
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 text-brand-white/40 text-xs">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Admin Panel
            </div>
          </div>
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
