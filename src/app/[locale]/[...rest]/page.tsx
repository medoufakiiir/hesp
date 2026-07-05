import { notFound } from "next/navigation"

// Catch-all for unmatched paths inside a valid locale (/en/xyz, /ar/xyz).
// dynamicParams=false with zero prerendered params makes every hit 404 at
// routing time — BEFORE the [locale]/loading.tsx Suspense shell starts
// streaming. Calling notFound() during render instead was verified (curl) to
// return the branded page with a 200 status, because the shell had already
// flushed by the time the error resolved.
export const dynamicParams = false

export function generateStaticParams(): { rest: string[] }[] {
  return []
}

export default function CatchAllPage() {
  notFound()
}
