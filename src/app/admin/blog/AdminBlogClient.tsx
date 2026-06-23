"use client"

import { useState, useTransition } from "react"
import { Plus, Pencil, Trash2, FileText, X, Eye } from "lucide-react"
import { createPost, updatePost, deletePost } from "@/actions/blog"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface BlogPost {
  id: string; slug: string; titleEN: string; titleAR: string; excerptEN: string; excerptAR: string
  contentEN: string; contentAR: string; image: string; date: string; author: string; tags: string[]
  metaTitleEN: string; metaTitleAR: string; metaDescEN: string; metaDescAR: string
}

const emptyForm = {
  titleEN: "", titleAR: "", excerptEN: "", excerptAR: "", contentEN: "", contentAR: "",
  image: "", date: new Date().toISOString().split("T")[0], author: "Riyada Team",
  tags: [] as string[], metaTitleEN: "", metaTitleAR: "", metaDescEN: "", metaDescAR: "",
}

export default function AdminBlogClient({ posts }: { posts: BlogPost[] }) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [tagInput, setTagInput] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      if (editingId) {
        await updatePost(editingId, form)
      } else {
        await createPost(form)
      }
      setShowForm(false)
      setEditingId(null)
      setForm(emptyForm)
      router.refresh()
    })
  }

  const handleEdit = (p: BlogPost) => {
    setForm({
      titleEN: p.titleEN, titleAR: p.titleAR, excerptEN: p.excerptEN, excerptAR: p.excerptAR,
      contentEN: p.contentEN, contentAR: p.contentAR, image: p.image, date: p.date, author: p.author,
      tags: p.tags, metaTitleEN: p.metaTitleEN, metaTitleAR: p.metaTitleAR, metaDescEN: p.metaDescEN, metaDescAR: p.metaDescAR,
    })
    setEditingId(p.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this blog post?")) return
    startTransition(async () => {
      await deletePost(id)
      router.refresh()
    })
  }

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] })
      setTagInput("")
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Blog Posts</h1>
          <p className="text-brand-muted text-sm">{posts.length} posts in database</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true) }}
          className="flex items-center gap-2 bg-brand-amber text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer">
          <Plus size={16} /> New Post
        </button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06] hover:border-brand-amber/20 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-brand-amber/10 flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-brand-amber" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-brand-white font-semibold text-sm truncate">{post.titleEN}</p>
              <p className="text-brand-muted text-xs">{post.date} · {post.author} · {post.tags.length} tags</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link href={`/blog/${post.slug}`} target="_blank"
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors">
                <Eye size={14} className="text-brand-muted" />
              </Link>
              <button onClick={() => handleEdit(post)}
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-brand-amber/20 flex items-center justify-center transition-colors cursor-pointer">
                <Pencil size={14} className="text-brand-muted" />
              </button>
              <button onClick={() => handleDelete(post.id)}
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center transition-colors cursor-pointer">
                <Trash2 size={14} className="text-brand-muted" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-brand-steel to-brand-iron border border-white/[0.08] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-brand-white font-display font-extrabold uppercase text-xl">
                {editingId ? "Edit Post" : "New Post"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-brand-muted hover:text-brand-white cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Title (EN) *</label>
                  <input type="text" required value={form.titleEN} onChange={(e) => setForm({ ...form, titleEN: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Title (AR) *</label>
                  <input type="text" required value={form.titleAR} onChange={(e) => setForm({ ...form, titleAR: e.target.value })} className="input-field text-right font-arabic" dir="rtl" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Excerpt (EN)</label>
                  <textarea rows={2} value={form.excerptEN} onChange={(e) => setForm({ ...form, excerptEN: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Excerpt (AR)</label>
                  <textarea rows={2} value={form.excerptAR} onChange={(e) => setForm({ ...form, excerptAR: e.target.value })} className="input-field text-right font-arabic" dir="rtl" />
                </div>
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Content (EN) *</label>
                <textarea rows={8} required value={form.contentEN} onChange={(e) => setForm({ ...form, contentEN: e.target.value })} className="input-field font-mono text-xs" />
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Content (AR)</label>
                <textarea rows={8} value={form.contentAR} onChange={(e) => setForm({ ...form, contentAR: e.target.value })} className="input-field text-right font-arabic" dir="rtl" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Image Path</label>
                  <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field" placeholder="/images/..." />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Date</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Author</label>
                  <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Tags</label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {form.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-brand-amber/15 text-brand-amber text-xs flex items-center gap-1">
                      {tag}
                      <button type="button" onClick={() => setForm({ ...form, tags: form.tags.filter((t) => t !== tag) })} className="hover:text-red-400 cursor-pointer"><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    className="input-field flex-1" placeholder="Add tag..." />
                  <button type="button" onClick={addTag} className="px-4 bg-white/[0.05] border border-white/[0.08] rounded-xl text-brand-muted text-xs hover:text-brand-white transition-colors cursor-pointer">Add</button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Meta Title (EN)</label>
                  <input type="text" value={form.metaTitleEN} onChange={(e) => setForm({ ...form, metaTitleEN: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Meta Title (AR)</label>
                  <input type="text" value={form.metaTitleAR} onChange={(e) => setForm({ ...form, metaTitleAR: e.target.value })} className="input-field text-right font-arabic" dir="rtl" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Meta Description (EN)</label>
                  <textarea rows={2} value={form.metaDescEN} onChange={(e) => setForm({ ...form, metaDescEN: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Meta Description (AR)</label>
                  <textarea rows={2} value={form.metaDescAR} onChange={(e) => setForm({ ...form, metaDescAR: e.target.value })} className="input-field text-right font-arabic" dir="rtl" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={isPending}
                  className="flex-1 bg-brand-amber text-white font-bold uppercase text-sm tracking-widest py-4 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer disabled:opacity-50">
                  {isPending ? "Saving..." : editingId ? "Update Post" : "Publish Post"}
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
