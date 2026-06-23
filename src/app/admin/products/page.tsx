"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Package, Search, X } from "lucide-react"
import { products as initialProducts, type Product } from "@/data/products"
import { categories } from "@/data/categories"
import { brands } from "@/data/brands"

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts)
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<Product>>({
    nameEN: "", nameAR: "", descriptionEN: "", descriptionAR: "",
    category: "", brand: "", image: "", partNumber: "", inStock: true, featured: false,
  })

  useEffect(() => {
    const stored = localStorage.getItem("hesp_products")
    if (stored) setProductList(JSON.parse(stored))
  }, [])

  const save = (list: Product[]) => {
    setProductList(list)
    localStorage.setItem("hesp_products", JSON.stringify(list))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      save(productList.map((p) => p.id === editingId ? { ...p, ...form } as Product : p))
    } else {
      const newProduct: Product = {
        ...form as Product,
        id: Date.now().toString(),
        slug: form.nameEN?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "",
      }
      save([...productList, newProduct])
    }
    setShowForm(false)
    setEditingId(null)
    setForm({ nameEN: "", nameAR: "", descriptionEN: "", descriptionAR: "", category: "", brand: "", image: "", partNumber: "", inStock: true, featured: false })
  }

  const handleEdit = (product: Product) => {
    setForm(product)
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      save(productList.filter((p) => p.id !== id))
    }
  }

  const filtered = productList.filter((p) =>
    p.nameEN.toLowerCase().includes(search.toLowerCase()) ||
    p.partNumber.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Products</h1>
          <p className="text-brand-muted text-sm">{productList.length} total products</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ nameEN: "", nameAR: "", descriptionEN: "", descriptionAR: "", category: "", brand: "", image: "", partNumber: "", inStock: true, featured: false }) }}
          className="flex items-center gap-2 bg-brand-amber text-white text-xs font-bold uppercase tracking-widest
            px-5 py-3 rounded-xl hover:bg-brand-gold transition-all cursor-pointer">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-8">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="input-field pl-11 text-sm" />
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-20 px-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-brand-steel rounded-2xl border border-brand-amber/20 p-8 mb-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-brand-white font-display font-extrabold uppercase text-xl">
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-brand-white/40 hover:text-brand-white cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Name (EN) *</label>
                  <input type="text" required value={form.nameEN || ""} onChange={(e) => setForm({ ...form, nameEN: e.target.value })} className="input-field text-sm" />
                </div>
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Name (AR) *</label>
                  <input type="text" required value={form.nameAR || ""} onChange={(e) => setForm({ ...form, nameAR: e.target.value })} className="input-field text-sm font-arabic text-right" dir="rtl" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Part Number *</label>
                  <input type="text" required value={form.partNumber || ""} onChange={(e) => setForm({ ...form, partNumber: e.target.value })} className="input-field text-sm" />
                </div>
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Image Path</label>
                  <input type="text" value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field text-sm" placeholder="/images/equipment/..." />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Category *</label>
                  <select required value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field text-sm">
                    <option value="">Select category</option>
                    {categories.map((c) => <option key={c.id} value={c.slug}>{c.nameEN}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Brand *</label>
                  <select required value={form.brand || ""} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="input-field text-sm">
                    <option value="">Select brand</option>
                    {brands.map((b) => <option key={b.id} value={b.slug}>{b.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Description (EN)</label>
                <textarea rows={3} value={form.descriptionEN || ""} onChange={(e) => setForm({ ...form, descriptionEN: e.target.value })} className="input-field text-sm" />
              </div>
              <div>
                <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Description (AR)</label>
                <textarea rows={3} value={form.descriptionAR || ""} onChange={(e) => setForm({ ...form, descriptionAR: e.target.value })} className="input-field text-sm font-arabic text-right" dir="rtl" />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.inStock ?? true} onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                    className="w-4 h-4 accent-brand-amber" />
                  <span className="text-brand-white text-sm">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured ?? false} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 accent-brand-amber" />
                  <span className="text-brand-white text-sm">Featured</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit"
                  className="flex-grow bg-brand-amber text-white font-bold uppercase text-xs tracking-widest
                    py-4 rounded-xl hover:bg-brand-gold transition-all cursor-pointer">
                  {editingId ? "Update Product" : "Add Product"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-6 border border-brand-white/15 text-brand-white/60 font-bold uppercase text-xs tracking-widest
                    py-4 rounded-xl hover:border-brand-amber hover:text-brand-amber transition-all cursor-pointer">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="rounded-2xl overflow-hidden border border-brand-amber/10">
        <table className="w-full">
          <thead>
            <tr className="bg-brand-plate">
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Product</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Part #</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden lg:table-cell">Category</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden lg:table-cell">Brand</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Status</th>
              <th className="text-right text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr key={product.id} className="border-t border-brand-white/5 hover:bg-brand-white/3">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-brand-plate">
                      {product.image && (
                        <Image src={product.image} alt={product.nameEN} fill className="object-cover" sizes="40px" />
                      )}
                    </div>
                    <div>
                      <p className="text-brand-white text-sm font-medium">{product.nameEN}</p>
                      <p className="text-brand-muted text-xs font-arabic">{product.nameAR}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-brand-amber/60 text-xs font-mono hidden md:table-cell">{product.partNumber}</td>
                <td className="px-4 py-3 text-brand-muted text-xs hidden lg:table-cell">{product.category}</td>
                <td className="px-4 py-3 text-brand-muted text-xs hidden lg:table-cell">{product.brand}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {product.inStock && (
                      <span className="px-2 py-0.5 rounded-full bg-green-600/20 text-green-400 text-[9px] font-bold uppercase">In Stock</span>
                    )}
                    {product.featured && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-600/20 text-amber-400 text-[9px] font-bold uppercase">Featured</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => handleEdit(product)}
                      className="w-8 h-8 rounded-lg bg-brand-white/5 flex items-center justify-center
                        text-brand-white/40 hover:text-brand-amber hover:bg-brand-amber/10 transition-all cursor-pointer">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => handleDelete(product.id)}
                      className="w-8 h-8 rounded-lg bg-brand-white/5 flex items-center justify-center
                        text-brand-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
