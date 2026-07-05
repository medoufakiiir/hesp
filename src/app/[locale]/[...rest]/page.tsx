import { notFound } from "next/navigation"

// Catch-all for unmatched paths inside a valid locale (/en/xyz, /ar/xyz) —
// routes them to the localized not-found.tsx with a real 404 status instead
// of Next's unstyled default 404.
export default function CatchAllPage() {
  notFound()
}
