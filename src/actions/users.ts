"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { canManageUsers } from "@/lib/rbac"

const CreateUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  password: z.string().min(8).max(100),
  role: z.enum(["super_admin", "manager", "sales"]),
})

const UpdateUserSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  role: z.enum(["super_admin", "manager", "sales"]).optional(),
  isActive: z.boolean().optional(),
})

async function requireSuperAdmin() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  if (!canManageUsers((session.user as any).role)) throw new Error("Forbidden")
  return session
}

export async function createUser(data: z.infer<typeof CreateUserSchema>) {
  await requireSuperAdmin()
  const validated = CreateUserSchema.parse(data)

  const existing = await prisma.user.findUnique({ where: { email: validated.email } })
  if (existing) throw new Error("User with this email already exists")

  const hashedPassword = await bcrypt.hash(validated.password, 12)
  await prisma.user.create({
    data: {
      name: validated.name,
      email: validated.email,
      password: hashedPassword,
      role: validated.role,
    },
  })
  revalidatePath("/admin/users")
}

export async function updateUser(id: string, data: z.infer<typeof UpdateUserSchema>) {
  await requireSuperAdmin()
  const validated = UpdateUserSchema.parse(data)
  await prisma.user.update({ where: { id }, data: validated })
  revalidatePath("/admin/users")
}

export async function resetUserPassword(id: string, newPassword: string) {
  await requireSuperAdmin()
  if (newPassword.length < 8) throw new Error("Password must be at least 8 characters")
  const hashedPassword = await bcrypt.hash(newPassword, 12)
  await prisma.user.update({ where: { id }, data: { password: hashedPassword } })
}

export async function deactivateUser(id: string) {
  const session = await requireSuperAdmin()
  if ((session.user as any).id === id) throw new Error("Cannot deactivate yourself")
  await prisma.user.update({ where: { id }, data: { isActive: false } })
  revalidatePath("/admin/users")
}
