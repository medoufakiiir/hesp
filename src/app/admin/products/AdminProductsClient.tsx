"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Package, Search, X } from "lucide-react"
import { createProduct, updateProduct, deleteProduct } from "@/actions/products"
import { useRouter } from "next/navigation"

interface Product {
  id: string; slug: string; nameEN: string; nameAR: string; descriptionEN: string; descriptionAR: string
  category: string; brand: string; image: string; partNumber: string; inStock: boolean; featured: boolean
}

interface Props {
  products: Product[]
  categories: { id: string; slug: string; nameEN: string; nameAR: string }[]
  brands: { id: string; slug: string; name: string; nameAR: string }[]
}

const emptyForm = {
  nameEN: "", nameAR: "", descriptionEN: "", descriptionAR: "",
  category: "", brand: "", image: "", partNumber: "", inStock: true, featured: false,
}

export default function AdminProductsClient({ products, categories, brands }: Props) {
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const filtered = products.filter((p) =>
    p.nameEN.toLowerCase().includes(search.toLowerCase()) ||
    p.partNumber.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      if (editingId) {
        await updateProduct(editingId, form)
      } else {
        await createProduct(form)
      }
      setShowForm(false)
      setEditingId(null)
      setForm(emptyForm)
      router.refresh()
    })
  }

  const handleEdit = (p: Product) => {
    setForm({
      nameEN: p.nameEN, nameAR: p.nameAR, descriptionEN: p.descriptionEN, descriptionAR: p.descriptionAR,
      category: p.category, brand: p.brand, image: p.image, partNumber: p.partNumber, inStock: p.inStock, featured: p.featured,
    })
    setEditingId(p.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    startTransition(async () => {
      await deleteProduct(id)
      router.refresh()
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Products</h1>
          <p className="text-brand-muted text-sm">{products.length} products in database</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true) }}
          className="flex items-center gap-2 bg-brand-amber text-white text-xs font-bold uppercase tracking-widest
            px-5 py-3 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-8">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="input-field pl-11"
        />
      </div>

      {/* Product List */}
      <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
        <table className="w-full">
          <thead>
            <tr className="bg-white/[0.03]">
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Product</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Part #</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden lg:table-cell">Category</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Stock</th>
              <th className="text-right text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-brand-plate flex-shrink-0 relative">
                      <Image src={p.image} alt={p.nameEN} fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <p className="text-brand-white text-sm font-medium">{p.nameEN}</p>
                      <p className="text-brand-muted text-xs">{p.nameAR}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-brand-amber/60 text-xs font-mono hidden md:table-cell">{p.partNumber}</td>
                <td className="px-4 py-3 text-brand-muted text-xs hidden lg:table-cell">{p.category}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    p.inStock ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
                  }`}>
                    {p.inStock ? "In Stock" : "Out"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(p)}
                      className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-brand-amber/20 flex items-center justify-center transition-colors cursor-pointer">
                      <Pencil size={14} className="text-brand-muted" />
                    </button>
                    <button onClick={() => handleDelete(p.id)}
                      className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center transition-colors cursor-pointer">
                      <Trash2 size={14} className="text-brand-muted" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl
            bg-gradient-to-br from-brand-steel to-brand-iron border border-white/[0.08] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-brand-white font-display font-extrabold uppercase text-xl">
                {editingId ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-brand-muted hover:text-brand-white cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Name (EN) *</label>
                  <input type="text" required value={form.nameEN} onChange={(e) => setForm({ ...form, nameEN: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Name (AR) *</label>
                  <input type="text" required value={form.nameAR} onChange={(e) => setForm({ ...form, nameAR: e.target.value })} className="input-field text-right font-arabic" dir="rtl" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Description (EN)</label>
                  <textarea rows={3} value={form.descriptionEN} onChange={(e) => setForm({ ...form, descriptionEN: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Description (AR)</label>
                  <textarea rows={3} value={form.descriptionAR} onChange={(e) => setForm({ ...form, descriptionAR: e.target.value })} className="input-field text-right font-arabic" dir="rtl" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Category *</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required className="input-field">
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c.id} value={c.slug}>{c.nameEN}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Brand *</label>
                  <select value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required className="input-field">
                    <option value="">Select brand</option>
                    {brands.map((b) => <option key={b.id} value={b.slug}>{b.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Part Number *</label>
                  <input type="text" required value={form.partNumber} onChange={(e) => setForm({ ...form, partNumber: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Image Path</label>
                  <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/images/..." className="input-field" />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-brand-white text-sm cursor-pointer">
                  <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="accent-brand-amber" />
                  In Stock
                </label>
                <label className="flex items-center gap-2 text-brand-white text-sm cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-brand-amber" />
                  Featured
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={isPending}
                  className="flex-1 bg-brand-amber text-white font-bold uppercase text-sm tracking-widest py-4 rounded-xl
                    hover:bg-brand-gold transition-colors cursor-pointer disabled:opacity-50">
                  {isPending ? "Saving..." : editingId ? "Update Product" : "Create Product"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-6 border border-white/[0.1] text-brand-muted font-bold uppercase text-sm tracking-widest
                    py-4 rounded-xl hover:border-white/[0.2] transition-colors cursor-pointer">
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
