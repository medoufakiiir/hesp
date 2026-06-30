export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-iron flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-brand-amber/30 border-t-brand-amber rounded-full animate-spin" />
        <span className="text-brand-muted text-xs uppercase tracking-widest">Loading...</span>
      </div>
    </div>
  )
}
