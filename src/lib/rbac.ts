export type Role = "super_admin" | "manager" | "sales"

const ROLE_HIERARCHY: Record<Role, number> = {
  super_admin: 3,
  manager: 2,
  sales: 1,
}

export function hasRole(userRole: string | undefined, requiredRole: Role): boolean {
  if (!userRole) return false
  const userLevel = ROLE_HIERARCHY[userRole as Role] ?? 0
  const requiredLevel = ROLE_HIERARCHY[requiredRole] ?? 0
  return userLevel >= requiredLevel
}

export function canManageProducts(role: string | undefined): boolean {
  return hasRole(role, "manager")
}

export function canManageUsers(role: string | undefined): boolean {
  return hasRole(role, "super_admin")
}

export function canDelete(role: string | undefined): boolean {
  return hasRole(role, "super_admin")
}

export function canManageSettings(role: string | undefined): boolean {
  return hasRole(role, "super_admin")
}
