"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, FileText, X, Eye } from "lucide-react"
import { blogPosts as initialPosts, type BlogPost } from "@/data/blog"
import Link from "next/link"

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<BlogPost>>({
    titleEN: "", titleAR: "", excerptEN: "", excerptAR: "",
    contentEN: "", contentAR: "", image: "", author: "Riyada Engineering Team",
    tags: [], date: new Date().toISOString().split("T")[0],
    metaTitleEN: "", metaTitleAR: "", metaDescEN: "", metaDescAR: "",
  })
  const [tagInput, setTagInput] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("hesp_blog")
    if (stored) setPosts(JSON.parse(stored))
  }, [])

  const save = (list: BlogPost[]) => {
    setPosts(list)
    localStorage.setItem("hesp_blog", JSON.stringify(list))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      save(posts.map((p) => p.id === editingId ? { ...p, ...form } as BlogPost : p))
    } else {
      const newPost: BlogPost = {
        ...form as BlogPost,
        id: Date.now().toString(),
        slug: form.titleEN?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "",
      }
      save([newPost, ...posts])
    }
    setShowForm(false)
    setEditingId(null)
  }

  const handleEdit = (post: BlogPost) => {
    setForm(post)
    setEditingId(post.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Delete this blog post?")) {
      save(posts.filter((p) => p.id !== id))
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !form.tags?.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...(form.tags || []), tagInput.trim()] })
      setTagInput("")
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Blog Posts</h1>
          <p className="text-brand-muted text-sm">{posts.length} total posts</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ titleEN: "", titleAR: "", excerptEN: "", excerptAR: "", contentEN: "", contentAR: "", image: "", author: "Riyada Engineering Team", tags: [], date: new Date().toISOString().split("T")[0], metaTitleEN: "", metaTitleAR: "", metaDescEN: "", metaDescAR: "" }) }}
          className="flex items-center gap-2 bg-brand-amber text-white text-xs font-bold uppercase tracking-widest
            px-5 py-3 rounded-xl hover:bg-brand-gold transition-all cursor-pointer">
          <Plus size={16} /> New Post
        </button>
      </div>

      {/* Blog Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-10 px-4 overflow-y-auto">
          <div className="w-full max-w-3xl bg-brand-steel rounded-2xl border border-brand-amber/20 p-8 mb-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-brand-white font-display font-extrabold uppercase text-xl">
                {editingId ? "Edit Post" : "New Blog Post"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-brand-white/40 hover:text-brand-white cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Title (EN) *</label>
                  <input type="text" required value={form.titleEN || ""} onChange={(e) => setForm({ ...form, titleEN: e.target.value })} className="input-field text-sm" />
                </div>
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Title (AR) *</label>
                  <input type="text" required value={form.titleAR || ""} onChange={(e) => setForm({ ...form, titleAR: e.target.value })} className="input-field text-sm font-arabic text-right" dir="rtl" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Excerpt (EN)</label>
                  <textarea rows={2} value={form.excerptEN || ""} onChange={(e) => setForm({ ...form, excerptEN: e.target.value })} className="input-field text-sm" />
                </div>
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Excerpt (AR)</label>
                  <textarea rows={2} value={form.excerptAR || ""} onChange={(e) => setForm({ ...form, excerptAR: e.target.value })} className="input-field text-sm font-arabic text-right" dir="rtl" />
                </div>
              </div>
              <div>
                <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Content (EN) *</label>
                <textarea rows={8} required value={form.contentEN || ""} onChange={(e) => setForm({ ...form, contentEN: e.target.value })} className="input-field text-sm font-mono" placeholder="Supports markdown: ## Heading, ### Subheading, - list items, **bold**" />
              </div>
              <div>
                <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Content (AR)</label>
                <textarea rows={8} value={form.contentAR || ""} onChange={(e) => setForm({ ...form, contentAR: e.target.value })} className="input-field text-sm font-arabic text-right" dir="rtl" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Image Path</label>
                  <input type="text" value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field text-sm" placeholder="/images/..." />
                </div>
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Author</label>
                  <input type="text" value={form.author || ""} onChange={(e) => setForm({ ...form, author: e.target.value })} className="input-field text-sm" />
                </div>
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Date</label>
                  <input type="date" value={form.date || ""} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">Tags</label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {form.tags?.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-amber/15 text-brand-amber text-xs">
                      {tag}
                      <button type="button" onClick={() => setForm({ ...form, tags: form.tags?.filter((_, j) => j !== i) })}
                        className="hover:text-red-400 cursor-pointer"><X size={10} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag() } }}
                    className="input-field text-sm flex-grow" placeholder="Add a tag..." />
                  <button type="button" onClick={addTag}
                    className="px-4 bg-brand-white/10 text-brand-white text-xs rounded-xl hover:bg-brand-amber/20 cursor-pointer">Add</button>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">SEO Title (EN)</label>
                  <input type="text" value={form.metaTitleEN || ""} onChange={(e) => setForm({ ...form, metaTitleEN: e.target.value })} className="input-field text-sm" />
                </div>
                <div>
                  <label className="block text-brand-white/50 text-xs font-semibold uppercase tracking-widest mb-2">SEO Description (EN)</label>
                  <input type="text" value={form.metaDescEN || ""} onChange={(e) => setForm({ ...form, metaDescEN: e.target.value })} className="input-field text-sm" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit"
                  className="flex-grow bg-brand-amber text-white font-bold uppercase text-xs tracking-widest
                    py-4 rounded-xl hover:bg-brand-gold transition-all cursor-pointer">
                  {editingId ? "Update Post" : "Publish Post"}
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

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id}
            className="rounded-2xl bg-brand-plate border border-brand-amber/10 p-6
              hover:border-brand-amber/30 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-grow">
                <h3 className="text-brand-white font-semibold text-lg mb-1">{post.titleEN}</h3>
                <p className="text-brand-muted text-xs font-arabic mb-2">{post.titleAR}</p>
                <p className="text-brand-muted text-sm line-clamp-2 mb-3">{post.excerptEN}</p>
                <div className="flex items-center gap-3 text-brand-white/30 text-xs">
                  <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                  <span className="w-px h-3 bg-brand-white/10" />
                  <span>{post.author}</span>
                  <span className="w-px h-3 bg-brand-white/10" />
                  <div className="flex gap-1">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-brand-amber/10 text-brand-amber/60 text-[9px] font-bold uppercase">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Link href={`/blog/${post.slug}`} target="_blank"
                  className="w-8 h-8 rounded-lg bg-brand-white/5 flex items-center justify-center
                    text-brand-white/40 hover:text-brand-amber hover:bg-brand-amber/10 transition-all">
                  <Eye size={14} />
                </Link>
                <button onClick={() => handleEdit(post)}
                  className="w-8 h-8 rounded-lg bg-brand-white/5 flex items-center justify-center
                    text-brand-white/40 hover:text-brand-amber hover:bg-brand-amber/10 transition-all cursor-pointer">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(post.id)}
                  className="w-8 h-8 rounded-lg bg-brand-white/5 flex items-center justify-center
                    text-brand-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
