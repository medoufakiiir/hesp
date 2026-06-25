"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus, X, Pencil, Trash2, Truck } from "lucide-react"
import { createEquipmentModel, updateEquipmentModel, deleteEquipmentModel } from "@/actions/equipment-models"

interface Model { id: string; make: string; model: string; year: string | null; partCount: number }
const emptyForm = { make: "", model: "", year: null as string | null }

export default function EquipmentModelsClient({ models }: { models: Model[] }) {
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const openCreate = () => { setForm(emptyForm); setEditId(null); setError(""); setShowForm(true) }
  const openEdit = (m: Model) => {
    setForm({ make: m.make, model: m.model, year: m.year })
    setEditId(m.id); setError(""); setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setError("")
    startTransition(async () => {
      try {
        if (editId) await updateEquipmentModel(editId, form)
        else await createEquipmentModel(form)
        setShowForm(false); router.refresh()
      } catch (err: unknown) { setError(err instanceof Error ? err.message : "Error") }
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this equipment model?")) return
    startTransition(async () => {
      try { await deleteEquipmentModel(id); router.refresh() }
      catch (err: unknown) { alert(err instanceof Error ? err.message : "Error") }
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Equipment Models</h1>
          <p className="text-brand-muted text-sm">{models.length} models</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-brand-amber text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer">
          <Plus size={16} /> Add Model
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
        <table className="w-full">
          <thead>
            <tr className="bg-white/[0.03]">
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Make</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Model</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Year</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Parts</th>
              <th className="text-right text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => (
              <tr key={m.id} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-brand-white text-sm font-medium">{m.make}</td>
                <td className="px-4 py-3 text-brand-white text-sm">{m.model}</td>
                <td className="px-4 py-3 text-brand-muted text-sm hidden md:table-cell">{m.year || "—"}</td>
                <td className="px-4 py-3 text-brand-white text-sm">{m.partCount}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(m)} className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-blue-500/20 flex items-center justify-center cursor-pointer">
                      <Pencil size={14} className="text-brand-muted" />
                    </button>
                    <button onClick={() => handleDelete(m.id)} disabled={isPending}
                      className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center cursor-pointer">
                      <Trash2 size={14} className="text-brand-muted" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {models.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-brand-muted text-sm">
                <Truck size={32} className="mx-auto mb-3 text-brand-white/10" />No equipment models yet.
              </td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-brand-steel to-brand-iron border border-white/[0.08] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-brand-white font-display font-extrabold uppercase text-xl">{editId ? "Edit" : "New"} Equipment Model</h2>
              <button onClick={() => setShowForm(false)} className="text-brand-muted hover:text-brand-white cursor-pointer"><X size={20} /></button>
            </div>
            {error && <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Make *</label>
                <input type="text" required value={form.make} onChange={(e) => setForm({ ...form, make: e.target.value })} className="input-field" placeholder="Caterpillar" />
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Model *</label>
                <input type="text" required value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="input-field" placeholder="320D" />
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Year</label>
                <input type="text" value={form.year || ""} onChange={(e) => setForm({ ...form, year: e.target.value || null })} className="input-field" placeholder="2018" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={isPending}
                  className="flex-1 bg-brand-amber text-white font-bold uppercase text-sm tracking-widest py-4 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer disabled:opacity-50">
                  {isPending ? "Saving..." : editId ? "Update" : "Create"}
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
