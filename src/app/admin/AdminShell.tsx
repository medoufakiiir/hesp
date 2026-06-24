"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import {
  LayoutDashboard, FileText, LogOut, Menu, ChevronRight, Users,
  BarChart3, Package, Layers, Tag, Truck, Building2, Receipt, Settings, ClipboardList,
} from "lucide-react"
import type { Role } from "@/lib/rbac"

interface SidebarLink {
  href: string
  label: string
  icon: React.ComponentType<{ size?: number }>
  roles: Role[]
}

const allSidebarLinks: SidebarLink[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["SUPER_ADMIN", "MANAGER", "SALES", "MARKETING"] },
  { href: "/admin/quotes", label: "Quotes / RFQ", icon: ClipboardList, roles: ["SUPER_ADMIN", "MANAGER", "SALES"] },
  { href: "/admin/invoices", label: "Invoices", icon: Receipt, roles: ["SUPER_ADMIN", "MANAGER", "SALES"] },
  { href: "/admin/companies", label: "Companies", icon: Building2, roles: ["SUPER_ADMIN", "MANAGER", "SALES", "MARKETING"] },
  { href: "/admin/parts", label: "Parts Catalog", icon: Package, roles: ["SUPER_ADMIN", "MANAGER", "SALES", "MARKETING"] },
  { href: "/admin/categories", label: "Categories", icon: Layers, roles: ["SUPER_ADMIN", "MANAGER", "MARKETING"] },
  { href: "/admin/brands", label: "Brands", icon: Tag, roles: ["SUPER_ADMIN", "MANAGER", "MARKETING"] },
  { href: "/admin/equipment-models", label: "Equipment Models", icon: Truck, roles: ["SUPER_ADMIN", "MANAGER", "MARKETING"] },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3, roles: ["SUPER_ADMIN", "MANAGER", "MARKETING"] },
  { href: "/admin/users", label: "Users", icon: Users, roles: ["SUPER_ADMIN"] },
  { href: "/admin/settings", label: "Settings", icon: Settings, roles: ["SUPER_ADMIN", "MANAGER"] },
]

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  MANAGER: "Manager",
  MARKETING: "Marketing",
  SALES: "Sales",
}
const roleBadgeColors: Record<string, string> = {
  SUPER_ADMIN: "bg-brand-amber/20 text-brand-amber",
  MANAGER: "bg-blue-500/20 text-blue-400",
  MARKETING: "bg-purple-500/20 text-purple-400",
  SALES: "bg-emerald-500/20 text-emerald-400",
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  const userRole = (session?.user as any)?.role || "SALES"
  const visibleLinks = allSidebarLinks.filter(link => link.roles.includes(userRole as Role))

  return (
    <div className="min-h-screen bg-brand-iron flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-steel border-r border-brand-amber/10
        transform transition-transform duration-300 lg:translate-x-0 lg:static
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-brand-amber/10">
            <Link href="/admin/dashboard" className="block">
              <Image src="/images/logo.png" alt="HESP" width={140} height={40} className="h-10 w-auto brightness-0 invert" />
              <p className="text-brand-muted text-[10px] uppercase tracking-widest mt-2">Admin Panel</p>
            </Link>
          </div>

          <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
            {visibleLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href + "/"))
              return (
                <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
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
            {session?.user && (
              <div className="px-4 py-3 mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-brand-amber/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-amber text-xs font-bold">
                      {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "A"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-brand-white text-xs font-medium truncate">{session.user.name || session.user.email}</p>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${roleBadgeColors[userRole] || "bg-white/10 text-brand-muted"}`}>
                      {roleLabels[userRole] || userRole}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-brand-muted text-sm hover:text-brand-white transition-colors">
              ← View Website
            </Link>
            <button onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-3 px-4 py-3 text-red-400 text-sm hover:text-red-300 transition-colors w-full cursor-pointer">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

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
