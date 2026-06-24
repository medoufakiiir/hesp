export type Role = "super_admin" | "manager" | "marketing" | "sales"

const ROLE_HIERARCHY: Record<Role, number> = {
  super_admin: 4,
  manager: 3,
  marketing: 2,
  sales: 1,
}

export function hasRole(userRole: string | undefined, requiredRole: Role): boolean {
  if (!userRole) return false
  const userLevel = ROLE_HIERARCHY[userRole as Role] ?? 0
  const requiredLevel = ROLE_HIERARCHY[requiredRole] ?? 0
  return userLevel >= requiredLevel
}

export function isRole(userRole: string | undefined, role: Role): boolean {
  return userRole === role
}

export function canViewInquiries(role: string | undefined): boolean {
  return hasRole(role, "sales")
}

export function canViewAnalytics(role: string | undefined): boolean {
  return isRole(role, "marketing") || isRole(role, "super_admin")
}

export function canManageProducts(role: string | undefined): boolean {
  return isRole(role, "manager") || isRole(role, "super_admin")
}

export function canManageBlog(role: string | undefined): boolean {
  return isRole(role, "manager") || isRole(role, "super_admin")
}

export function canDeleteInquiry(role: string | undefined): boolean {
  return isRole(role, "manager") || isRole(role, "super_admin")
}

export function canResetSalesPassword(role: string | undefined): boolean {
  return isRole(role, "manager") || isRole(role, "super_admin")
}

export function canManageUsers(role: string | undefined): boolean {
  return isRole(role, "super_admin")
}

export function canDelete(role: string | undefined): boolean {
  return isRole(role, "manager") || isRole(role, "super_admin")
}

export function canManageSettings(role: string | undefined): boolean {
  return isRole(role, "super_admin")
}
