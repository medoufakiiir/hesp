"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus, X, Pencil, Trash2, Tag } from "lucide-react"
import { createBrand, updateBrand, deleteBrand } from "@/actions/brands"

interface Brand {
  id: string; slug: string; nameEn: string; nameAr: string
  logoUrl: string | null; partCount: number
}

const emptyForm = { slug: "", nameEn: "", nameAr: "", logoUrl: null as string | null }

export default function BrandsClient({ brands }: { brands: Brand[] }) {
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const openCreate = () => { setForm(emptyForm); setEditId(null); setError(""); setShowForm(true) }
  const openEdit = (b: Brand) => {
    setForm({ slug: b.slug, nameEn: b.nameEn, nameAr: b.nameAr, logoUrl: b.logoUrl })
    setEditId(b.id); setError(""); setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setError("")
    startTransition(async () => {
      try {
        if (editId) await updateBrand(editId, form)
        else await createBrand(form)
        setShowForm(false); router.refresh()
      } catch (err: any) { setError(err.message) }
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this brand?")) return
    startTransition(async () => {
      try { await deleteBrand(id); router.refresh() }
      catch (err: any) { alert(err.message) }
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Brands</h1>
          <p className="text-brand-muted text-sm">{brands.length} brands</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-brand-amber text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer">
          <Plus size={16} /> Add Brand
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
        <table className="w-full">
          <thead>
            <tr className="bg-white/[0.03]">
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Name (EN)</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Name (AR)</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Slug</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Parts</th>
              <th className="text-right text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((b) => (
              <tr key={b.id} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-brand-white text-sm font-medium">{b.nameEn}</td>
                <td className="px-4 py-3 text-brand-muted text-sm hidden md:table-cell font-arabic">{b.nameAr}</td>
                <td className="px-4 py-3 text-brand-muted text-xs hidden md:table-cell font-mono">{b.slug}</td>
                <td className="px-4 py-3 text-brand-white text-sm">{b.partCount}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(b)} className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-blue-500/20 flex items-center justify-center cursor-pointer">
                      <Pencil size={14} className="text-brand-muted" />
                    </button>
                    <button onClick={() => handleDelete(b.id)} disabled={isPending}
                      className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center cursor-pointer">
                      <Trash2 size={14} className="text-brand-muted" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-brand-muted text-sm">
                <Tag size={32} className="mx-auto mb-3 text-brand-white/10" />No brands yet.
              </td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-brand-steel to-brand-iron border border-white/[0.08] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-brand-white font-display font-extrabold uppercase text-xl">{editId ? "Edit" : "New"} Brand</h2>
              <button onClick={() => setShowForm(false)} className="text-brand-muted hover:text-brand-white cursor-pointer"><X size={20} /></button>
            </div>
            {error && <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Slug *</label>
                <input type="text" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input-field" placeholder="caterpillar" />
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Name (English) *</label>
                <input type="text" required value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Name (Arabic) *</label>
                <input type="text" required value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} className="input-field font-arabic" dir="rtl" />
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Logo URL</label>
                <input type="text" value={form.logoUrl || ""} onChange={(e) => setForm({ ...form, logoUrl: e.target.value || null })} className="input-field" />
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
