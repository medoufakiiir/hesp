"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus, X, Pencil, Trash2, Layers } from "lucide-react"
import { createCategory, updateCategory, deleteCategory } from "@/actions/categories"

interface Category {
  id: string; slug: string; nameEn: string; nameAr: string
  parentId: string | null; parentName: string | null
  partCount: number; childCount: number
}

const emptyForm = { slug: "", nameEn: "", nameAr: "", parentId: null as string | null }

export default function CategoriesClient({ categories, allCategories }: {
  categories: Category[]
  allCategories: { id: string; nameEn: string }[]
}) {
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const openCreate = () => { setForm(emptyForm); setEditId(null); setError(""); setShowForm(true) }
  const openEdit = (c: Category) => {
    setForm({ slug: c.slug, nameEn: c.nameEn, nameAr: c.nameAr, parentId: c.parentId })
    setEditId(c.id); setError(""); setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    startTransition(async () => {
      try {
        if (editId) await updateCategory(editId, form)
        else await createCategory(form)
        setShowForm(false); router.refresh()
      } catch (err: any) { setError(err.message) }
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this category?")) return
    startTransition(async () => {
      try { await deleteCategory(id); router.refresh() }
      catch (err: any) { alert(err.message) }
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Categories</h1>
          <p className="text-brand-muted text-sm">{categories.length} categories</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-brand-amber text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
        <table className="w-full">
          <thead>
            <tr className="bg-white/[0.03]">
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Name (EN)</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Name (AR)</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Slug</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden lg:table-cell">Parent</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Parts</th>
              <th className="text-right text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-brand-white text-sm font-medium">{c.nameEn}</td>
                <td className="px-4 py-3 text-brand-muted text-sm hidden md:table-cell font-arabic">{c.nameAr}</td>
                <td className="px-4 py-3 text-brand-muted text-xs hidden md:table-cell font-mono">{c.slug}</td>
                <td className="px-4 py-3 text-brand-muted text-sm hidden lg:table-cell">{c.parentName || "—"}</td>
                <td className="px-4 py-3 text-brand-white text-sm">{c.partCount}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => openEdit(c)} className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-blue-500/20 flex items-center justify-center cursor-pointer">
                      <Pencil size={14} className="text-brand-muted" />
                    </button>
                    <button onClick={() => handleDelete(c.id)} disabled={isPending}
                      className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center cursor-pointer">
                      <Trash2 size={14} className="text-brand-muted" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-12 text-center text-brand-muted text-sm">
                <Layers size={32} className="mx-auto mb-3 text-brand-white/10" />No categories yet.
              </td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-brand-steel to-brand-iron border border-white/[0.08] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-brand-white font-display font-extrabold uppercase text-xl">{editId ? "Edit" : "New"} Category</h2>
              <button onClick={() => setShowForm(false)} className="text-brand-muted hover:text-brand-white cursor-pointer"><X size={20} /></button>
            </div>
            {error && <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Slug *</label>
                <input type="text" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input-field" placeholder="engine-parts" />
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
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Parent Category</label>
                <select value={form.parentId || ""} onChange={(e) => setForm({ ...form, parentId: e.target.value || null })} className="input-field">
                  <option value="">None (root)</option>
                  {allCategories.filter(c => c.id !== editId).map(c => (
                    <option key={c.id} value={c.id}>{c.nameEn}</option>
                  ))}
                </select>
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
