"use client"

import { useState, useTransition } from "react"
import { MessageSquare, Trash2, Mail, Phone, Building2, Eye, Archive, Reply, Filter } from "lucide-react"
import { updateMessageStatus, deleteMessage } from "@/actions/inquiries"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  subject: string | null
  body: string
  status: string
  locale: string
  createdAt: string
  readAt: string | null
}

const STATUS_OPTIONS = ["ALL", "NEW", "READ", "REPLIED", "ARCHIVED"] as const
const statusColors: Record<string, string> = {
  NEW: "bg-amber-500/20 text-amber-400",
  READ: "bg-blue-500/20 text-blue-400",
  REPLIED: "bg-green-500/20 text-green-400",
  ARCHIVED: "bg-white/10 text-brand-muted",
}

export default function AdminMessagesClient({ messages }: { messages: Message[] }) {
  const [filter, setFilter] = useState<string>("ALL")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const filtered = filter === "ALL" ? messages : messages.filter((m) => m.status === filter)

  const counts = {
    ALL: messages.length,
    NEW: messages.filter((m) => m.status === "NEW").length,
    READ: messages.filter((m) => m.status === "READ").length,
    REPLIED: messages.filter((m) => m.status === "REPLIED").length,
    ARCHIVED: messages.filter((m) => m.status === "ARCHIVED").length,
  }

  const handleStatus = (id: string, status: "NEW" | "READ" | "REPLIED" | "ARCHIVED") => {
    startTransition(async () => {
      await updateMessageStatus(id, status)
      router.refresh()
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this message permanently?")) return
    startTransition(async () => {
      await deleteMessage(id)
      router.refresh()
    })
  }

  const handleExpand = (msg: Message) => {
    setExpandedId(expandedId === msg.id ? null : msg.id)
    if (msg.status === "NEW") {
      handleStatus(msg.id, "READ")
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Messages</h1>
        <p className="text-brand-muted text-sm">
          {counts.NEW > 0 ? `${counts.NEW} unread · ` : ""}{messages.length} total messages from contact form
        </p>
      </div>

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {STATUS_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer
              ${filter === s
                ? "bg-brand-amber/15 text-brand-amber border border-brand-amber/20"
                : "bg-white/[0.03] text-brand-muted border border-white/[0.06] hover:border-white/[0.12]"
              }`}
          >
            {s} {counts[s] > 0 && <span className="ml-1.5 opacity-60">({counts[s]})</span>}
          </button>
        ))}
      </div>

      {/* Pipeline summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {(["NEW", "READ", "REPLIED", "ARCHIVED"] as const).map((s) => (
          <div key={s} className="p-4 rounded-xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.06] text-center">
            <p className="text-brand-white font-display font-extrabold text-2xl">{counts[s]}</p>
            <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${statusColors[s]?.split(" ")[1] || "text-brand-muted"}`}>{s}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="p-16 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] text-center">
          <MessageSquare size={40} className="text-brand-white/10 mx-auto mb-4" />
          <p className="text-brand-muted">
            {filter === "ALL"
              ? "No messages yet. They will appear here when visitors submit the contact form."
              : `No ${filter.toLowerCase()} messages.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg) => {
            const isExpanded = expandedId === msg.id
            return (
              <div
                key={msg.id}
                className={`rounded-2xl border transition-colors
                  ${msg.status === "NEW"
                    ? "bg-gradient-to-br from-brand-amber/[0.06] via-white/[0.04] to-transparent border-brand-amber/15"
                    : "bg-gradient-to-br from-white/[0.06] to-transparent border-white/[0.06] hover:border-white/[0.1]"
                  }`}
              >
                {/* Header row — clickable */}
                <button
                  onClick={() => handleExpand(msg)}
                  className="w-full text-left p-5 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className={`text-brand-white font-semibold truncate ${msg.status === "NEW" ? "" : "opacity-80"}`}>
                          {msg.name}
                        </h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex-shrink-0 ${statusColors[msg.status] || "bg-white/10 text-brand-muted"}`}>
                          {msg.status}
                        </span>
                        {msg.status === "NEW" && (
                          <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse flex-shrink-0" />
                        )}
                      </div>
                      {msg.subject && (
                        <p className="text-brand-white/60 text-sm truncate">{msg.subject}</p>
                      )}
                      <p className="text-brand-muted text-xs mt-1">
                        {new Date(msg.createdAt).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-white/[0.06] pt-4 space-y-4">
                    {/* Contact info */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="flex items-center gap-2 text-brand-muted text-sm">
                        <Mail size={14} className="text-brand-amber/50 flex-shrink-0" />
                        <a href={`mailto:${msg.email}`} className="hover:text-brand-amber transition-colors truncate">{msg.email}</a>
                      </div>
                      {msg.phone && (
                        <div className="flex items-center gap-2 text-brand-muted text-sm">
                          <Phone size={14} className="text-brand-amber/50 flex-shrink-0" />
                          <a href={`tel:${msg.phone}`} className="hover:text-brand-amber transition-colors">{msg.phone}</a>
                        </div>
                      )}
                      {msg.company && (
                        <div className="flex items-center gap-2 text-brand-muted text-sm">
                          <Building2 size={14} className="text-brand-amber/50 flex-shrink-0" />
                          {msg.company}
                        </div>
                      )}
                    </div>

                    {/* Message body */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <p className="text-brand-white/70 text-sm whitespace-pre-wrap leading-relaxed">{msg.body}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {msg.status !== "READ" && (
                        <button onClick={() => handleStatus(msg.id, "READ")} disabled={isPending}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest
                            bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-pointer disabled:opacity-50">
                          <Eye size={12} /> Mark Read
                        </button>
                      )}
                      {msg.status !== "REPLIED" && (
                        <button onClick={() => handleStatus(msg.id, "REPLIED")} disabled={isPending}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest
                            bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors cursor-pointer disabled:opacity-50">
                          <Reply size={12} /> Mark Replied
                        </button>
                      )}
                      {msg.status !== "ARCHIVED" && (
                        <button onClick={() => handleStatus(msg.id, "ARCHIVED")} disabled={isPending}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest
                            bg-white/[0.05] text-brand-muted border border-white/[0.06] hover:border-white/[0.12] transition-colors cursor-pointer disabled:opacity-50">
                          <Archive size={12} /> Archive
                        </button>
                      )}
                      <button onClick={() => handleDelete(msg.id)} disabled={isPending}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest
                          bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors cursor-pointer disabled:opacity-50 ml-auto">
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
