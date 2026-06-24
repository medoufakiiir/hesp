export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canManageCatalog } from "@/lib/rbac"
import EquipmentModelsClient from "./EquipmentModelsClient"

export default async function EquipmentModelsPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  if (!canManageCatalog((session.user as any).role)) redirect("/admin/dashboard")

  const models = await prisma.equipmentModel.findMany({
    orderBy: [{ make: "asc" }, { model: "asc" }],
    include: { _count: { select: { parts: true } } },
  })

  return (
    <EquipmentModelsClient
      models={models.map((m) => ({
        id: m.id, make: m.make, model: m.model, year: m.year,
        partCount: m._count.parts,
      }))}
    />
  )
}
