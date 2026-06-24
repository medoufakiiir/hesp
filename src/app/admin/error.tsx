"use client"

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-red-400 text-xl font-bold">!</span>
        </div>
        <h2 className="text-brand-white font-display font-extrabold uppercase text-xl mb-2">Error</h2>
        <p className="text-brand-muted text-sm mb-6">{error.message || "Something went wrong in the admin panel."}</p>
        <button onClick={reset}
          className="bg-brand-amber text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer">
          Try Again
        </button>
      </div>
    </div>
  )
}
