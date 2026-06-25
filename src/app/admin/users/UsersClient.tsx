"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus, X, UserCheck, UserX } from "lucide-react"
import { createUser, updateUser, deactivateUser } from "@/actions/users"

interface User {
  id: string; name: string; email: string; role: string
  isActive: boolean; createdAt: string
}

const roleBadge: Record<string, string> = {
  SUPER_ADMIN: "bg-brand-amber/20 text-brand-amber",
  MANAGER: "bg-blue-500/20 text-blue-400",
  MARKETING: "bg-purple-500/20 text-purple-400",
  SALES: "bg-emerald-500/20 text-emerald-400",
}

const roleLabel: Record<string, string> = {
  SUPER_ADMIN: "Super Admin", MANAGER: "Manager", MARKETING: "Marketing", SALES: "Sales",
}

const emptyForm = { name: "", email: "", password: "", role: "SALES" as const }

export default function UsersClient({ users, currentUserId }: { users: User[]; currentUserId: string }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    startTransition(async () => {
      try {
        await createUser(form)
        setShowForm(false)
        setForm(emptyForm)
        router.refresh()
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to create user")
      }
    })
  }

  const handleRoleChange = (id: string, role: string) => {
    startTransition(async () => {
      await updateUser(id, { role: role as any })
      router.refresh()
    })
  }

  const handleDeactivate = (id: string) => {
    if (!confirm("Deactivate this user? They won't be able to login.")) return
    startTransition(async () => {
      try {
        await deactivateUser(id)
        router.refresh()
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : "Error")
      }
    })
  }

  const handleReactivate = (id: string) => {
    startTransition(async () => {
      await updateUser(id, { isActive: true })
      router.refresh()
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Users</h1>
          <p className="text-brand-muted text-sm">{users.length} admin users</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setShowForm(true) }}
          className="flex items-center gap-2 bg-brand-amber text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer">
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className={`flex items-center gap-4 p-5 rounded-2xl border transition-colors
            ${user.isActive
              ? "bg-gradient-to-br from-white/[0.06] to-transparent border-white/[0.06]"
              : "bg-red-500/[0.03] border-red-500/10 opacity-60"
            }`}>
            <div className="w-10 h-10 rounded-full bg-brand-amber/10 flex items-center justify-center flex-shrink-0">
              <span className="text-brand-amber text-sm font-bold">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-brand-white font-semibold text-sm truncate">{user.name}</p>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${roleBadge[user.role] || "bg-white/10 text-brand-muted"}`}>
                  {roleLabel[user.role] || user.role}
                </span>
                {!user.isActive && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-red-500/15 text-red-400">Inactive</span>
                )}
                {user.id === currentUserId && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-brand-amber/10 text-brand-amber">You</span>
                )}
              </div>
              <p className="text-brand-muted text-xs truncate">{user.email}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {user.id !== currentUserId && (
                <>
                  <select value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    disabled={isPending}
                    className="bg-white/[0.04] border border-white/[0.08] rounded-lg text-brand-white text-xs px-2 py-1.5 cursor-pointer">
                    <option value="SUPER_ADMIN">Super Admin</option>
                    <option value="MANAGER">Manager</option>
                    <option value="MARKETING">Marketing</option>
                    <option value="SALES">Sales</option>
                  </select>
                  {user.isActive ? (
                    <button onClick={() => handleDeactivate(user.id)} disabled={isPending}
                      className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center transition-colors cursor-pointer"
                      title="Deactivate">
                      <UserX size={14} className="text-brand-muted" />
                    </button>
                  ) : (
                    <button onClick={() => handleReactivate(user.id)} disabled={isPending}
                      className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-emerald-500/20 flex items-center justify-center transition-colors cursor-pointer"
                      title="Reactivate">
                      <UserCheck size={14} className="text-brand-muted" />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-brand-steel to-brand-iron border border-white/[0.08] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-brand-white font-display font-extrabold uppercase text-xl">New User</h2>
              <button onClick={() => setShowForm(false)} className="text-brand-muted hover:text-brand-white cursor-pointer"><X size={20} /></button>
            </div>
            {error && (
              <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
            )}
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Name *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Email *</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Password * (min 8 chars)</label>
                <input type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Role *</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as any })} className="input-field">
                  <option value="SALES">Sales</option>
                  <option value="MARKETING">Marketing</option>
                  <option value="MANAGER">Manager</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={isPending}
                  className="flex-1 bg-brand-amber text-white font-bold uppercase text-sm tracking-widest py-4 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer disabled:opacity-50">
                  {isPending ? "Creating..." : "Create User"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-6 border border-white/[0.1] text-brand-muted font-bold uppercase text-sm tracking-widest py-4 rounded-xl hover:border-white/[0.2] transition-colors cursor-pointer">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
