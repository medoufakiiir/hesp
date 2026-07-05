export type Role = "SUPER_ADMIN" | "MANAGER" | "MARKETING" | "SALES"

// Where page-level role guards send an authenticated user whose role can't
// view a section. The branded 403 lives under the public [locale] segment;
// admin is English-only, so the English variant is used. Unauthenticated
// users never reach these guards — the middleware bounces them to
// /admin/login first.
export const FORBIDDEN_ROUTE = "/en/forbidden"

const ROLE_HIERARCHY: Record<Role, number> = {
  SUPER_ADMIN: 4,
  MANAGER: 3,
  MARKETING: 2,
  SALES: 1,
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

// --- Quotes / Invoices: SUPER_ADMIN, MANAGER, SALES ---
export function canManageQuotes(role: string | undefined): boolean {
  return isRole(role, "SUPER_ADMIN") || isRole(role, "MANAGER") || isRole(role, "SALES")
}

// --- Companies: SUPER_ADMIN, MANAGER, SALES write; MARKETING read ---
export function canManageCompanies(role: string | undefined): boolean {
  return isRole(role, "SUPER_ADMIN") || isRole(role, "MANAGER") || isRole(role, "SALES")
}
export function canViewCompanies(role: string | undefined): boolean {
  return canManageCompanies(role) || isRole(role, "MARKETING")
}

// --- Catalog (parts/categories/brands/equipment): SUPER_ADMIN, MANAGER, MARKETING write; SALES read ---
export function canManageCatalog(role: string | undefined): boolean {
  return isRole(role, "SUPER_ADMIN") || isRole(role, "MANAGER") || isRole(role, "MARKETING")
}
export function canViewCatalog(role: string | undefined): boolean {
  return canManageCatalog(role) || isRole(role, "SALES")
}

// --- Analytics: SUPER_ADMIN, MANAGER, MARKETING ---
export function canViewAnalytics(role: string | undefined): boolean {
  return isRole(role, "SUPER_ADMIN") || isRole(role, "MANAGER") || isRole(role, "MARKETING")
}

// --- Users: SUPER_ADMIN only ---
export function canManageUsers(role: string | undefined): boolean {
  return isRole(role, "SUPER_ADMIN")
}

// --- Settings: SUPER_ADMIN, MANAGER ---
export function canManageSettings(role: string | undefined): boolean {
  return isRole(role, "SUPER_ADMIN") || isRole(role, "MANAGER")
}

// --- Dashboard: everyone ---
export function canViewDashboard(role: string | undefined): boolean {
  return hasRole(role, "SALES")
}

// --- Delete: SUPER_ADMIN, MANAGER ---
export function canDelete(role: string | undefined): boolean {
  return isRole(role, "SUPER_ADMIN") || isRole(role, "MANAGER")
}

export function canResetSalesPassword(role: string | undefined): boolean {
  return isRole(role, "MANAGER") || isRole(role, "SUPER_ADMIN")
}

// Legacy aliases
export function canManageProducts(role: string | undefined): boolean {
  return canManageCatalog(role)
}
export function canDeleteInquiry(role: string | undefined): boolean {
  return canDelete(role)
}
export function canManageBlog(role: string | undefined): boolean {
  return canManageCatalog(role)
}
export function canViewInquiries(role: string | undefined): boolean {
  return canManageQuotes(role)
}
