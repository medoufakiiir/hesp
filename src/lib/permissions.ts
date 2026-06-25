import { auth } from "@/lib/auth"
import { canDelete } from "@/lib/rbac"
import type { Action, Resource } from "@/lib/resources"

export interface PermissionSet {
  canDelete: boolean
  canExport: boolean
}

// Reuses the existing enum-based RBAC (lib/rbac.ts). No DB Permission table.
//
//   SUPER_ADMIN / MANAGER : delete + export on every resource
//   MARKETING             : export only on customers + contacts
//   SALES                 : nothing
export function canExportResource(role: string | undefined, resource: Resource): boolean {
  if (role === "SUPER_ADMIN" || role === "MANAGER") return true
  if (role === "MARKETING") return resource === "customers" || resource === "contacts"
  return false
}

export function permissionsFor(role: string | undefined, resource: Resource): PermissionSet {
  return {
    canDelete: canDelete(role),
    canExport: canExportResource(role, resource),
  }
}

// Server-side guard for use inside server actions / pages.
export async function resolvePermissions(resource: Resource): Promise<PermissionSet> {
  const session = await auth()
  const role = (session?.user as Record<string, unknown> | undefined)?.role as string | undefined
  return permissionsFor(role, resource)
}

export async function can(action: Action, resource: Resource): Promise<boolean> {
  const perms = await resolvePermissions(resource)
  return action === "delete" ? perms.canDelete : perms.canExport
}
