import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canManageSettings } from "@/lib/rbac"

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  if (!canManageSettings((session.user as Record<string, unknown>).role as string)) redirect("/admin/dashboard")

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Settings</h1>
        <p className="text-brand-muted text-sm">Company and invoice defaults</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06] p-6">
          <h2 className="text-brand-white font-display font-extrabold uppercase text-lg mb-4">Company Info</h2>
          <div className="space-y-3 text-sm">
            <div><span className="text-brand-muted text-xs">Company:</span><br /><span className="text-brand-white">Riyada Ventures</span></div>
            <div><span className="text-brand-muted text-xs">Location:</span><br /><span className="text-brand-white">Riyadh, Saudi Arabia</span></div>
            <div><span className="text-brand-muted text-xs">Phone:</span><br /><span className="text-brand-white">+966 55 228 2868</span></div>
            <div><span className="text-brand-muted text-xs">Email:</span><br /><span className="text-brand-white">info@riyada-ventures.com</span></div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06] p-6">
          <h2 className="text-brand-white font-display font-extrabold uppercase text-lg mb-4">Invoice Defaults</h2>
          <div className="space-y-3 text-sm">
            <div><span className="text-brand-muted text-xs">Currency:</span><br /><span className="text-brand-white">SAR (Saudi Riyal)</span></div>
            <div><span className="text-brand-muted text-xs">VAT Rate:</span><br /><span className="text-brand-white">15%</span></div>
            <div><span className="text-brand-muted text-xs">Payment Terms:</span><br /><span className="text-brand-white">Net 30 days</span></div>
            <div><span className="text-brand-muted text-xs">Quote Numbering:</span><br /><span className="text-brand-white font-mono">RFQ-YYYY-####</span></div>
            <div><span className="text-brand-muted text-xs">Invoice Numbering:</span><br /><span className="text-brand-white font-mono">INV-YYYY-####</span></div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06] p-6">
          <h2 className="text-brand-white font-display font-extrabold uppercase text-lg mb-4">RFQ Workflow</h2>
          <div className="space-y-2 text-sm text-brand-muted">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500/40" />
              <span>SUBMITTED → REVIEWING → QUOTED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500/40" />
              <span>→ CONFIRMED → INVOICED → COMPLETED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/40" />
              <span>Side exits: REJECTED, CANCELLED, EXPIRED</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06] p-6">
          <h2 className="text-brand-white font-display font-extrabold uppercase text-lg mb-4">RBAC Roles</h2>
          <div className="space-y-2 text-sm">
            <div><span className="text-brand-amber font-bold">SUPER_ADMIN</span> <span className="text-brand-muted">— Full access</span></div>
            <div><span className="text-blue-400 font-bold">MANAGER</span> <span className="text-brand-muted">— Quotes, catalog, companies, settings</span></div>
            <div><span className="text-emerald-400 font-bold">SALES</span> <span className="text-brand-muted">— Quotes, companies, catalog (read)</span></div>
            <div><span className="text-purple-400 font-bold">MARKETING</span> <span className="text-brand-muted">— Catalog, analytics, companies (read)</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
