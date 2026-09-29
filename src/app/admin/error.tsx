"use client"

import { useEffect, useState } from "react"

type DbStatus = "missing" | "no-tables" | "unreachable" | "ok" | "unknown"

// Shown instead of the generic error when the cause is the database — the
// usual case right after moving the project to a new Vercel account.
const dbHelp: Partial<Record<DbStatus, { title: string; steps: string[] }>> = {
  missing: {
    title: "Database not connected",
    steps: [
      "In Vercel, open the project → Storage → Create Database → Neon, and connect it to this project (this adds DATABASE_URL).",
      "Deployments → ⋯ on the latest deployment → Redeploy.",
      "Create the tables: run `npx prisma db push` with the new DATABASE_URL.",
    ],
  },
  "no-tables": {
    title: "Database is empty — tables not created",
    steps: [
      "Run `npx prisma db push` with this project's DATABASE_URL to create the tables.",
      "Then sign out and back in, and use Blog → Restore as published to bring back the articles.",
    ],
  },
  unreachable: {
    title: "Can't reach the database",
    steps: [
      "Check DATABASE_URL in Vercel → Settings → Environment Variables — it may still point at the old account's database.",
      "Redeploy after fixing it.",
    ],
  },
}

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  const [dbStatus, setDbStatus] = useState<DbStatus>("unknown")

  useEffect(() => {
    fetch("/api/admin/db-status")
      .then((r) => r.json())
      .then((d: { status: DbStatus }) => setDbStatus(d.status))
      .catch(() => {})
  }, [error])

  const help = dbHelp[dbStatus]

  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center max-w-lg">
        <div className="w-14 h-14 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-red-400 text-xl font-bold">!</span>
        </div>
        <h2 className="text-brand-white font-display font-extrabold uppercase text-xl mb-2">
          {help ? help.title : "Error"}
        </h2>
        {help ? (
          <ol className="text-brand-muted text-sm mb-6 text-left list-decimal pl-5 space-y-2">
            {help.steps.map((s) => <li key={s}>{s}</li>)}
          </ol>
        ) : (
          <p className="text-brand-muted text-sm mb-6">{error.message || "Something went wrong in the admin panel."}</p>
        )}
        <button onClick={reset}
          className="bg-brand-amber text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer">
          Try Again
        </button>
      </div>
    </div>
  )
}
