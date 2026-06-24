"use client"

import { useState, useTransition } from "react"
import { Plus, Pencil, Trash2, FileText, X, Eye, Globe, EyeOff } from "lucide-react"
import { createPost, updatePost, deletePost, togglePublish } from "@/actions/blog"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface BlogPost {
  id: string; slug: string; titleEn: string; titleAr: string
  excerptEn: string; excerptAr: string; bodyEn: string; bodyAr: string
  coverImageUrl: string; metaTitleEn: string; metaTitleAr: string
  metaDescEn: string; metaDescAr: string; primaryKeyword: string
  keywords: string[]; published: boolean; publishedAt: string | null; createdAt: string
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

const emptyForm = {
  slug: "", titleEn: "", titleAr: "", excerptEn: "", excerptAr: "",
  bodyEn: "", bodyAr: "", coverImageUrl: "", metaTitleEn: "", metaTitleAr: "",
  metaDescEn: "", metaDescAr: "", primaryKeyword: "", keywords: [] as string[],
  published: false,
}

export default function AdminBlogClient({ posts }: { posts: BlogPost[] }) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [tagInput, setTagInput] = useState("")
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    startTransition(async () => {
      try {
        if (editingId) {
          await updatePost(editingId, form)
        } else {
          await createPost(form)
        }
        setShowForm(false)
        setEditingId(null)
        setForm(emptyForm)
        router.refresh()
      } catch (err: any) {
        setError(err?.message || "Failed to save post")
      }
    })
  }

  const handleEdit = (p: BlogPost) => {
    setForm({
      slug: p.slug, titleEn: p.titleEn, titleAr: p.titleAr,
      excerptEn: p.excerptEn, excerptAr: p.excerptAr,
      bodyEn: p.bodyEn, bodyAr: p.bodyAr,
      coverImageUrl: p.coverImageUrl, metaTitleEn: p.metaTitleEn,
      metaTitleAr: p.metaTitleAr, metaDescEn: p.metaDescEn,
      metaDescAr: p.metaDescAr, primaryKeyword: p.primaryKeyword,
      keywords: p.keywords, published: p.published,
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

  const handleTogglePublish = (id: string) => {
    startTransition(async () => {
      await togglePublish(id)
      router.refresh()
    })
  }

  const addTag = () => {
    if (tagInput.trim() && !form.keywords.includes(tagInput.trim())) {
      setForm({ ...form, keywords: [...form.keywords, tagInput.trim()] })
      setTagInput("")
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Blog Posts</h1>
          <p className="text-brand-muted text-sm">
            {posts.filter((p) => p.published).length} published · {posts.filter((p) => !p.published).length} drafts
          </p>
        </div>
        <button onClick={() => { setForm(emptyForm); setEditingId(null); setError(""); setShowForm(true) }}
          className="flex items-center gap-2 bg-brand-amber text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer">
          <Plus size={16} /> New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="p-16 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] text-center">
          <FileText size={40} className="text-brand-white/10 mx-auto mb-4" />
          <p className="text-brand-muted">No blog posts yet. Create your first post to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06] hover:border-brand-amber/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-amber/10 flex items-center justify-center flex-shrink-0">
                <FileText size={18} className="text-brand-amber" />
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-brand-white font-semibold text-sm truncate">{post.titleEn}</p>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex-shrink-0
                    ${post.published ? "bg-green-500/20 text-green-400" : "bg-white/10 text-brand-muted"}`}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="text-brand-muted text-xs">
                  {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  {post.primaryKeyword && <> · <span className="text-brand-amber/50">{post.primaryKeyword}</span></>}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => handleTogglePublish(post.id)} disabled={isPending}
                  title={post.published ? "Unpublish" : "Publish"}
                  className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors cursor-pointer">
                  {post.published ? <EyeOff size={14} className="text-brand-muted" /> : <Globe size={14} className="text-green-400" />}
                </button>
                {post.published && (
                  <Link href={`/blog/${post.slug}`} target="_blank"
                    className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors">
                    <Eye size={14} className="text-brand-muted" />
                  </Link>
                )}
                <button onClick={() => handleEdit(post)}
                  className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-brand-amber/20 flex items-center justify-center transition-colors cursor-pointer">
                  <Pencil size={14} className="text-brand-muted" />
                </button>
                <button onClick={() => handleDelete(post.id)} disabled={isPending}
                  className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center transition-colors cursor-pointer">
                  <Trash2 size={14} className="text-brand-muted" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-br from-brand-steel to-brand-iron border border-white/[0.08] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-brand-white font-display font-extrabold uppercase text-xl">
                {editingId ? "Edit Post" : "New Post"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-brand-muted hover:text-brand-white cursor-pointer"><X size={20} /></button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Title (EN) *</label>
                  <input type="text" required value={form.titleEn}
                    onChange={(e) => {
                      const titleEn = e.target.value
                      setForm({ ...form, titleEn, slug: editingId ? form.slug : slugify(titleEn) })
                    }} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Title (AR) *</label>
                  <input type="text" required value={form.titleAr}
                    onChange={(e) => setForm({ ...form, titleAr: e.target.value })} className="input-field text-right font-arabic" dir="rtl" />
                </div>
              </div>

              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Slug *</label>
                <input type="text" required value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })} className="input-field font-mono text-xs" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Excerpt (EN)</label>
                  <textarea rows={2} value={form.excerptEn} onChange={(e) => setForm({ ...form, excerptEn: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Excerpt (AR)</label>
                  <textarea rows={2} value={form.excerptAr} onChange={(e) => setForm({ ...form, excerptAr: e.target.value })} className="input-field text-right font-arabic" dir="rtl" />
                </div>
              </div>

              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Body (EN) * — Markdown supported</label>
                <textarea rows={10} required value={form.bodyEn} onChange={(e) => setForm({ ...form, bodyEn: e.target.value })} className="input-field font-mono text-xs" />
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Body (AR) *</label>
                <textarea rows={10} required value={form.bodyAr} onChange={(e) => setForm({ ...form, bodyAr: e.target.value })} className="input-field text-right font-arabic" dir="rtl" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Cover Image URL</label>
                  <input type="text" value={form.coverImageUrl} onChange={(e) => setForm({ ...form, coverImageUrl: e.target.value })} className="input-field" placeholder="/images/..." />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Primary Keyword</label>
                  <input type="text" value={form.primaryKeyword} onChange={(e) => setForm({ ...form, primaryKeyword: e.target.value })} className="input-field" />
                </div>
              </div>

              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Keywords / Tags</label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {form.keywords.map((kw) => (
                    <span key={kw} className="px-2.5 py-1 rounded-lg bg-brand-amber/15 text-brand-amber text-xs flex items-center gap-1">
                      {kw}
                      <button type="button" onClick={() => setForm({ ...form, keywords: form.keywords.filter((k) => k !== kw) })} className="hover:text-red-400 cursor-pointer"><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    className="input-field flex-1" placeholder="Add keyword..." />
                  <button type="button" onClick={addTag} className="px-4 bg-white/[0.05] border border-white/[0.08] rounded-xl text-brand-muted text-xs hover:text-brand-white transition-colors cursor-pointer">Add</button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Meta Title (EN)</label>
                  <input type="text" value={form.metaTitleEn} onChange={(e) => setForm({ ...form, metaTitleEn: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Meta Title (AR)</label>
                  <input type="text" value={form.metaTitleAr} onChange={(e) => setForm({ ...form, metaTitleAr: e.target.value })} className="input-field text-right font-arabic" dir="rtl" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Meta Description (EN)</label>
                  <textarea rows={2} value={form.metaDescEn} onChange={(e) => setForm({ ...form, metaDescEn: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Meta Description (AR)</label>
                  <textarea rows={2} value={form.metaDescAr} onChange={(e) => setForm({ ...form, metaDescAr: e.target.value })} className="input-field text-right font-arabic" dir="rtl" />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <input type="checkbox" id="published" checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4 rounded border-brand-amber/30 text-brand-amber focus:ring-brand-amber cursor-pointer" />
                <label htmlFor="published" className="text-brand-white text-sm font-medium cursor-pointer">
                  Publish immediately
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={isPending}
                  className="flex-1 bg-brand-amber text-white font-bold uppercase text-sm tracking-widest py-4 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer disabled:opacity-50">
                  {isPending ? "Saving..." : editingId ? "Update Post" : "Create Post"}
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
