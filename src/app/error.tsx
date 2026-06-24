"use client"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-brand-iron flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <span className="text-red-400 text-2xl font-bold">!</span>
        </div>
        <h2 className="text-brand-white font-display font-extrabold uppercase text-2xl mb-3">Something went wrong</h2>
        <p className="text-brand-muted text-sm mb-6">{error.message || "An unexpected error occurred."}</p>
        <button onClick={reset}
          className="bg-brand-amber text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer">
          Try Again
        </button>
      </div>
    </div>
  )
}
