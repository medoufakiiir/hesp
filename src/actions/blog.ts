"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { canManageProducts, canDelete } from "@/lib/rbac"

// Blog is not part of the B2B Quote/RFQ admin rebuild scope.
// Keep these actions as no-ops for now so the app compiles after the Prisma schema swap.

const BlogSchema = z.object({
  titleEN: z.string().min(1).max(300),
  titleAR: z.string().min(1).max(300),
})

async function requireRole(minRole: "manager" | "super_admin") {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  const role = (session.user as any).role
  if (minRole === "manager" && !canManageProducts(role)) throw new Error("Forbidden")
  if (minRole === "super_admin" && !canDelete(role)) throw new Error("Forbidden")
  return session
}

export async function createPost(_data: z.infer<typeof BlogSchema>) {
  await requireRole("manager")
  // no-op
}

export async function updatePost(_id: string, _data: z.infer<typeof BlogSchema>) {
  await requireRole("manager")
  // no-op
}

export async function deletePost(_id: string) {
  await requireRole("super_admin")
  // no-op
}

