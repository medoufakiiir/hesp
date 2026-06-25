"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function AdminPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const role = (session?.user as Record<string, unknown>)?.role as string

  useEffect(() => {
    if (!role) return
    if (role === "sales") {
      router.replace("/admin/inquiries")
    } else {
      router.replace("/admin/dashboard")
    }
  }, [router, role])

  return null
}
