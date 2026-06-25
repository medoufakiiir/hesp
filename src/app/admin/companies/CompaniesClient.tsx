"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus, X, Pencil, Trash2, Building2, ChevronDown, ChevronUp, UserPlus, Phone } from "lucide-react"
import { createCompany, updateCompany, deleteCompany, addContact, deleteContact } from "@/actions/companies"
import { exportCompanyContacts } from "@/actions/admin-actions"
import { downloadFile } from "@/components/admin/download"
import { ExportToolbar } from "@/components/admin/ExportToolbar"
import { BulkActionBar } from "@/components/admin/BulkActionBar"
import { useSelection } from "@/components/admin/useSelection"
import type { PermissionSet } from "@/lib/permissions"

interface Contact {
  id: string; name: string; email: string | null; phone: string | null
  position: string | null; isPrimary: boolean
}
interface Company {
  id: string; name: string; crNumber: string | null; vatNumber: string | null
  email: string | null; phone: string | null; city: string | null; country: string
  addressLine: string | null; notes: string | null; quoteCount: number; contacts: Contact[]
}

const emptyCompany = {
  name: "", crNumber: null as string | null, vatNumber: null as string | null,
  email: null as string | null, phone: null as string | null,
  addressLine: null as string | null, city: null as string | null, country: "SA",
  notes: null as string | null,
}
const emptyContact = {
  name: "", email: null as string | null, phone: null as string | null,
  position: null as string | null, isPrimary: false,
}

export default function CompaniesClient({ companies, canEdit, permissions }: { companies: Company[]; canEdit: boolean; permissions: PermissionSet }) {
  const canExport = permissions.canExport
  const { selected, toggle, toggleAll, clear, isAllSelected } = useSelection()
  const allIds = companies.map((c) => c.id)
  const showSelect = permissions.canDelete || permissions.canExport
  const [showForm, setShowForm] = useState(false)
  const [showContactForm, setShowContactForm] = useState<string | null>(null)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyCompany)
  const [contactForm, setContactForm] = useState(emptyContact)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const openCreate = () => { setForm(emptyCompany); setEditId(null); setError(""); setShowForm(true) }
  const openEdit = (c: Company) => {
    setForm({
      name: c.name, crNumber: c.crNumber, vatNumber: c.vatNumber,
      email: c.email, phone: c.phone, addressLine: c.addressLine,
      city: c.city, country: c.country, notes: c.notes,
    })
    setEditId(c.id); setError(""); setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setError("")
    startTransition(async () => {
      try {
        if (editId) await updateCompany(editId, form)
        else await createCompany(form)
        setShowForm(false); router.refresh()
      } catch (err: unknown) { setError(err instanceof Error ? err.message : "Error") }
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this company?")) return
    startTransition(async () => {
      try { await deleteCompany(id); router.refresh() }
      catch (err: unknown) { alert(err instanceof Error ? err.message : "Error") }
    })
  }

  const handleAddContact = (companyId: string) => {
    startTransition(async () => {
      try {
        await addContact(companyId, contactForm)
        setShowContactForm(null); setContactForm(emptyContact); router.refresh()
      } catch (err: unknown) { alert(err instanceof Error ? err.message : "Error") }
    })
  }

  const handleDeleteContact = (id: string) => {
    if (!confirm("Remove this contact?")) return
    startTransition(async () => {
      try { await deleteContact(id); router.refresh() }
      catch (err: unknown) { alert(err instanceof Error ? err.message : "Error") }
    })
  }

  const handleExportContacts = (companyId: string) => {
    startTransition(async () => {
      try {
        const res = await exportCompanyContacts(companyId)
        downloadFile(res.data, res.filename, res.mime)
      } catch (err: unknown) { alert(err instanceof Error ? err.message : "Error") }
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Companies</h1>
          <p className="text-brand-muted text-sm">{companies.length} B2B customers</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <ExportToolbar resource="customers" canExport={canExport} />
          {canEdit && (
            <button onClick={openCreate}
              className="flex items-center gap-2 bg-brand-amber text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer">
              <Plus size={16} /> Add Company
            </button>
          )}
        </div>
      </div>

      {showSelect && companies.length > 0 && (
        <label className="flex items-center gap-2 mb-3 text-brand-muted text-xs font-bold uppercase tracking-widest cursor-pointer w-fit">
          <input type="checkbox" checked={isAllSelected(allIds)} onChange={() => toggleAll(allIds)}
            className="accent-brand-amber cursor-pointer" />
          Select all ({companies.length})
        </label>
      )}

      <div className="space-y-3">
        {companies.map((c) => (
          <div key={c.id} className={`rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border ${selected.has(c.id) ? "border-brand-amber/30" : "border-white/[0.06]"}`}>
            <div className="flex items-center gap-4 p-5 cursor-pointer" onClick={() => setExpanded(expanded === c.id ? null : c.id)}>
              {showSelect && (
                <input type="checkbox" aria-label={`Select ${c.name}`}
                  checked={selected.has(c.id)}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => toggle(c.id)}
                  className="accent-brand-amber cursor-pointer flex-shrink-0" />
              )}
              <div className="w-10 h-10 rounded-xl bg-brand-amber/10 flex items-center justify-center flex-shrink-0">
                <Building2 size={20} className="text-brand-amber" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-brand-white font-semibold text-sm">{c.name}</p>
                <p className="text-brand-muted text-xs">{c.city || c.country} · {c.quoteCount} quotes</p>
              </div>
              <div className="flex items-center gap-2">
                {c.crNumber && <span className="text-brand-muted text-[10px] hidden lg:block">CR: {c.crNumber}</span>}
                {canEdit && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); openEdit(c) }}
                      className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-blue-500/20 flex items-center justify-center cursor-pointer">
                      <Pencil size={14} className="text-brand-muted" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(c.id) }} disabled={isPending}
                      className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center cursor-pointer">
                      <Trash2 size={14} className="text-brand-muted" />
                    </button>
                  </>
                )}
                {expanded === c.id ? <ChevronUp size={16} className="text-brand-muted" /> : <ChevronDown size={16} className="text-brand-muted" />}
              </div>
            </div>

            {expanded === c.id && (
              <div className="px-5 pb-5 border-t border-white/[0.04]">
                <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                  <div><span className="text-brand-muted text-xs">Email:</span> <span className="text-brand-white">{c.email || "—"}</span></div>
                  <div><span className="text-brand-muted text-xs">Phone:</span> <span className="text-brand-white">{c.phone || "—"}</span></div>
                  <div><span className="text-brand-muted text-xs">VAT:</span> <span className="text-brand-white">{c.vatNumber || "—"}</span></div>
                  <div><span className="text-brand-muted text-xs">Address:</span> <span className="text-brand-white">{c.addressLine || "—"}</span></div>
                </div>
                {c.notes && <p className="text-brand-muted text-xs mt-3 italic">{c.notes}</p>}

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-brand-white/40 text-[10px] font-bold uppercase tracking-widest">Contacts</span>
                    <div className="flex items-center gap-3">
                      {canExport && c.contacts.length > 0 && (
                        <button onClick={() => handleExportContacts(c.id)} disabled={isPending}
                          className="text-brand-muted text-xs flex items-center gap-1 hover:text-brand-white cursor-pointer disabled:opacity-50">
                          <Phone size={12} /> Export
                        </button>
                      )}
                      {canEdit && (
                        <button onClick={() => { setShowContactForm(c.id); setContactForm(emptyContact) }}
                          className="text-brand-amber text-xs flex items-center gap-1 hover:text-brand-gold cursor-pointer">
                          <UserPlus size={12} /> Add
                        </button>
                      )}
                    </div>
                  </div>
                  {c.contacts.length > 0 ? (
                    <div className="space-y-2">
                      {c.contacts.map((ct) => (
                        <div key={ct.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03]">
                          <div>
                            <span className="text-brand-white text-sm">{ct.name}</span>
                            {ct.isPrimary && <span className="ml-2 text-[9px] text-brand-amber bg-brand-amber/10 px-1.5 py-0.5 rounded-full">Primary</span>}
                            <p className="text-brand-muted text-xs">{ct.position || ""} {ct.email ? `· ${ct.email}` : ""} {ct.phone ? `· ${ct.phone}` : ""}</p>
                          </div>
                          {canEdit && (
                            <button onClick={() => handleDeleteContact(ct.id)} className="w-6 h-6 rounded bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center cursor-pointer">
                              <X size={12} className="text-brand-muted" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-brand-muted text-xs">No contacts</p>}

                  {showContactForm === c.id && (
                    <div className="mt-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-3">
                      <input type="text" placeholder="Name *" required value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="input-field text-sm" />
                      <div className="grid grid-cols-2 gap-2">
                        <input type="email" placeholder="Email" value={contactForm.email || ""}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value || null })} className="input-field text-sm" />
                        <input type="text" placeholder="Phone" value={contactForm.phone || ""}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value || null })} className="input-field text-sm" />
                      </div>
                      <input type="text" placeholder="Position" value={contactForm.position || ""}
                        onChange={(e) => setContactForm({ ...contactForm, position: e.target.value || null })} className="input-field text-sm" />
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={contactForm.isPrimary} onChange={(e) => setContactForm({ ...contactForm, isPrimary: e.target.checked })} />
                        <span className="text-brand-white text-xs">Primary contact</span>
                      </label>
                      <div className="flex gap-2">
                        <button onClick={() => handleAddContact(c.id)} disabled={isPending || !contactForm.name}
                          className="bg-brand-amber text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-brand-gold cursor-pointer disabled:opacity-50">
                          Save
                        </button>
                        <button onClick={() => setShowContactForm(null)}
                          className="text-brand-muted text-xs px-4 py-2 cursor-pointer">Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        {companies.length === 0 && (
          <div className="p-12 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] text-center">
            <Building2 size={32} className="text-brand-white/10 mx-auto mb-3" />
            <p className="text-brand-muted text-sm">No companies yet.</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-gradient-to-br from-brand-steel to-brand-iron border border-white/[0.08] p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-brand-white font-display font-extrabold uppercase text-xl">{editId ? "Edit" : "New"} Company</h2>
              <button onClick={() => setShowForm(false)} className="text-brand-muted hover:text-brand-white cursor-pointer"><X size={20} /></button>
            </div>
            {error && <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Company Name *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">CR Number</label>
                  <input type="text" value={form.crNumber || ""} onChange={(e) => setForm({ ...form, crNumber: e.target.value || null })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">VAT Number</label>
                  <input type="text" value={form.vatNumber || ""} onChange={(e) => setForm({ ...form, vatNumber: e.target.value || null })} className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Email</label>
                  <input type="email" value={form.email || ""} onChange={(e) => setForm({ ...form, email: e.target.value || null })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Phone</label>
                  <input type="text" value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value || null })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Address</label>
                <input type="text" value={form.addressLine || ""} onChange={(e) => setForm({ ...form, addressLine: e.target.value || null })} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">City</label>
                  <input type="text" value={form.city || ""} onChange={(e) => setForm({ ...form, city: e.target.value || null })} className="input-field" />
                </div>
                <div>
                  <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Country</label>
                  <input type="text" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Notes</label>
                <textarea value={form.notes || ""} onChange={(e) => setForm({ ...form, notes: e.target.value || null })} className="input-field" rows={3} />
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

      <BulkActionBar
        resource="customers"
        selectedIds={[...selected]}
        onClear={clear}
        onDeleted={() => router.refresh()}
        permissions={permissions}
      />
    </div>
  )
}
