"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Phone, Building2, Package, Trash2, CheckCircle } from "lucide-react"

interface Inquiry {
  id: string
  name: string
  company: string
  phone: string
  email: string
  part: string
  date: string
  status: "new" | "contacted" | "quoted" | "closed"
}

const statusColors = {
  new: "bg-amber-500/20 text-amber-400",
  contacted: "bg-blue-500/20 text-blue-400",
  quoted: "bg-purple-500/20 text-purple-400",
  closed: "bg-green-500/20 text-green-400",
}

const sampleInquiries: Inquiry[] = [
  { id: "1", name: "Ahmed Al-Rashidi", company: "Saudi Aramco Contractors", phone: "+966 55 123 4567", email: "ahmed@contractor.sa", part: "CAT 320D Hydraulic Pump - P/N 272-6955", date: "2024-12-20", status: "new" },
  { id: "2", name: "Mohammed Al-Otaibi", company: "SARC Construction", phone: "+966 50 987 6543", email: "mohammed@sarc.sa", part: "Komatsu PC200-8 Track Chain Assembly", date: "2024-12-19", status: "contacted" },
  { id: "3", name: "Omar Al-Ghamdi", company: "Al-Muhaidib Group", phone: "+966 55 456 7890", email: "omar@muhaidib.sa", part: "Volvo EC240 Boom Cylinder Seal Kit", date: "2024-12-18", status: "quoted" },
]

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("hesp_inquiries")
    if (stored) {
      setInquiries(JSON.parse(stored))
    } else {
      setInquiries(sampleInquiries)
      localStorage.setItem("hesp_inquiries", JSON.stringify(sampleInquiries))
    }
  }, [])

  const updateStatus = (id: string, status: Inquiry["status"]) => {
    const updated = inquiries.map((i) => i.id === id ? { ...i, status } : i)
    setInquiries(updated)
    localStorage.setItem("hesp_inquiries", JSON.stringify(updated))
  }

  const deleteInquiry = (id: string) => {
    if (confirm("Delete this inquiry?")) {
      const updated = inquiries.filter((i) => i.id !== id)
      setInquiries(updated)
      localStorage.setItem("hesp_inquiries", JSON.stringify(updated))
    }
  }

  const newCount = inquiries.filter((i) => i.status === "new").length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Inquiries</h1>
        <p className="text-brand-muted text-sm">
          {inquiries.length} total inquiries · {newCount} new
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {(["new", "contacted", "quoted", "closed"] as const).map((status) => (
          <div key={status} className="p-4 rounded-2xl bg-brand-plate border border-brand-amber/10">
            <p className="text-brand-white font-display font-extrabold text-2xl">
              {inquiries.filter((i) => i.status === status).length}
            </p>
            <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${statusColors[status].split(" ")[1]}`}>{status}</p>
          </div>
        ))}
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {inquiries.map((inq) => (
          <div key={inq.id}
            className="rounded-2xl bg-brand-plate border border-brand-amber/10 p-6
              hover:border-brand-amber/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-brand-white font-semibold text-lg">{inq.name}</h3>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusColors[inq.status]}`}>
                    {inq.status}
                  </span>
                </div>
                <p className="text-brand-muted text-xs">
                  {new Date(inq.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </p>
              </div>
              <button onClick={() => deleteInquiry(inq.id)}
                className="w-8 h-8 rounded-lg bg-brand-white/5 flex items-center justify-center
                  text-brand-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all cursor-pointer">
                <Trash2 size={14} />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <div className="flex items-center gap-2 text-brand-muted text-sm">
                <Building2 size={14} className="text-brand-amber/40" />
                {inq.company || "—"}
              </div>
              <div className="flex items-center gap-2 text-brand-muted text-sm">
                <Phone size={14} className="text-brand-amber/40" />
                <a href={`tel:${inq.phone}`} className="hover:text-brand-amber transition-colors">{inq.phone}</a>
              </div>
              <div className="flex items-center gap-2 text-brand-muted text-sm">
                <MessageSquare size={14} className="text-brand-amber/40" />
                {inq.email}
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-xl bg-brand-iron/50 mb-4">
              <Package size={14} className="text-brand-amber mt-0.5 flex-shrink-0" />
              <p className="text-brand-white/80 text-sm">{inq.part}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-brand-white/30 text-xs mr-2">Set status:</span>
              {(["new", "contacted", "quoted", "closed"] as const).map((status) => (
                <button key={status}
                  onClick={() => updateStatus(inq.id, status)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer
                    ${inq.status === status
                      ? statusColors[status]
                      : "border border-brand-white/10 text-brand-white/30 hover:border-brand-amber/30"
                    }`}>
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}

        {inquiries.length === 0 && (
          <div className="p-12 rounded-2xl bg-brand-plate border border-brand-amber/10 text-center">
            <CheckCircle size={32} className="text-brand-white/10 mx-auto mb-3" />
            <p className="text-brand-muted text-sm">No inquiries yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
