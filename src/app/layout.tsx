// Required by Next.js because a root not-found.tsx now exists. The real
// <html>/<body> shells live in src/app/[locale]/layout.tsx (public site) and
// src/app/admin/layout.tsx (dashboard) — see the comment in the locale layout
// for why they can't be hoisted here. This layout must only pass children
// through; rendering any markup would nest inside those <html> shells.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
