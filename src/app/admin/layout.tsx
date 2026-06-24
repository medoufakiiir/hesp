import AdminProviders from "./providers"
import AdminShell from "./AdminShell"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProviders>
      <AdminShell>{children}</AdminShell>
    </AdminProviders>
  )
}
