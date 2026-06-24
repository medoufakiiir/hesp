"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus, X, Pencil, Trash2, Package, Search } from "lucide-react"
import { createPart, updatePart, deletePart } from "@/actions/parts"

interface Part {
  id: string; sku: string; oemNumber: string | null
  nameEn: string; nameAr: string
  categoryName: string; brandName: string
  categoryId: string; brandId: string | null
  listPrice: number | null; stockQty: number; isActive: boolean
  image: string | null
}

interface FormData {
  sku: string; oemNumber: string | null; nameEn: string; nameAr: string
  descriptionEn: string | null; descriptionAr: string | null
  categoryId: string; brandId: string | null
  listPrice: number | null; stockQty: number; isActive: boolean
}

const emptyForm: FormData = {
  sku: "", oemNumber: null, nameEn: "", nameAr: "",
  descriptionEn: null, descriptionAr: null,
  categoryId: "", brandId: null,
  listPrice: null, stockQty: 0, isActive: true,
}

export default function PartsClient({ parts, categories, brands, canEdit }: {
  parts: Part[]
  categories: { id: string; nameEn: string }[]
  brands: { id: string; nameEn: string }[]
  canEdit: boolean
}) {
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [search, setSearch] = useState("")
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const filtered = parts.filter((p) =>
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.nameEn.toLowerCase().includes(search.toLowerCase()) ||
    p.nameAr.includes(search)
  )

  const openCreate = () => { setForm(emptyForm); setEditId(null); setError(""); setShowForm(true) }
  const openEdit = (p: Part) => {
    setForm({
      sku: p.sku, oemNumber: p.oemNumber, nameEn: p.nameEn, nameAr: p.nameAr,
      descriptionEn: null, descriptionAr: null,
      categoryId: p.categoryId, brandId: p.brandId,
      listPrice: p.listPrice, stockQty: p.stockQty, isActive: p.isActive,
    })
    setEditId(p.id); setError(""); setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setError("")
    startTransition(async () => {
      try {
        if (editId) await updatePart(editId, form)
        else await createPart(form)
        setShowForm(false); router.refresh()
      } catch (err: any) { setError(err.message) }
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this part?")) return
    startTransition(async () => {
      try { await deletePart(id); router.refresh() }
      catch (err: any) { alert(err.message) }
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Parts Catalog</h1>
          <p className="text-brand-muted text-sm">{parts.length} parts</p>
        </div>
        {canEdit && (
          <button onClick={openCreate}
            className="flex items-center gap-2 bg-brand-amber text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer">
            <Plus size={16} /> Add Part
          </button>
        )}
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input type="text" placeholder="Search by SKU, name..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-brand-white text-sm placeholder-brand-muted focus:border-brand-amber/30 outline-none" />
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
        <table className="w-full">
          <thead>
            <tr className="bg-white/[0.03]">
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">SKU</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Name</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Category</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Brand</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden lg:table-cell">Price (SAR)</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Stock</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Status</th>
              {canEdit && <th className="text-right text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-brand-amber text-xs font-mono">{p.sku}</td>
                <td className="px-4 py-3 text-brand-white text-sm">{p.nameEn}</td>
                <td className="px-4 py-3 text-brand-muted text-sm hidden md:table-cell">{p.categoryName}</td>
                <td className="px-4 py-3 text-brand-muted text-sm hidden md:table-cell">{p.brandName}</td>
                <td className="px-4 py-3 text-brand-white text-sm hidden lg:table-cell">{p.listPrice?.toLocaleString() || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-medium ${p.stockQty <= 5 ? "text-red-400" : "text-brand-white"}`}>{p.stockQty}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${p.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {p.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                {canEdit && (
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-blue-500/20 flex items-center justify-center cursor-pointer">
                        <Pencil size={14} className="text-brand-muted" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} disabled={isPending}
                        className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center cursor-pointer">
                        <Trash2 size={14} className="text-brand-muted" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={canEdit ? 8 : 7} className="px-4 py-12 text-center text-brand-muted text-sm">
                <Package size={32} className="mx-auto mb-3 text-brand-white/10" />{search ? "No matching parts." : "No parts yet."}
              </td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-gradient-to-br from-brand-steel to-brand-iron border border-white/[0.08] p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-brand-white font-display font-extrabold uppercase text-xl">{editId ? "Edit" : "New"} Part</h2>
              <button onClick={() => setShowForm(false)} className="text-brand-muted hover:text-brand-white cursor-pointer"><X size={20} /></button>
            </div>
            {error && <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">SKU *</label>
                  <input type="text" required value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">OEM Number</label>
                  <input type="text" value={form.oemNumber || ""} onChange={(e) => setForm({ ...form, oemNumber: e.target.value || null })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Name (English) *</label>
                <input type="text" required value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Name (Arabic) *</label>
                <input type="text" required value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} className="input-field font-arabic" dir="rtl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Category *</label>
                  <select required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="input-field">
                    <option value="">Select...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.nameEn}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Brand</label>
                  <select value={form.brandId || ""} onChange={(e) => setForm({ ...form, brandId: e.target.value || null })} className="input-field">
                    <option value="">None</option>
                    {brands.map(b => <option key={b.id} value={b.id}>{b.nameEn}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">List Price (SAR)</label>
                  <input type="number" step="0.01" min="0" value={form.listPrice ?? ""} onChange={(e) => setForm({ ...form, listPrice: e.target.value ? Number(e.target.value) : null })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Stock Qty *</label>
                  <input type="number" min="0" required value={form.stockQty} onChange={(e) => setForm({ ...form, stockQty: Number(e.target.value) })} className="input-field" />
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-brand-amber" />
                <span className="text-brand-white text-sm">Active (visible in catalog)</span>
              </label>
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
