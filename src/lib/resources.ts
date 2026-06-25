// Central registry for admin Delete / Export actions.
// Adapted to the real HESP Prisma schema (no Order/Product/Customer/Report models):
//   - "products"  -> Part
//   - "customers" -> Company
//   - "quotes"    -> Quote (the closest thing to "orders")
//   - "invoices"  -> Invoice
//   - "contacts"  -> Contact
//   - "users"     -> User
// Deletes are HARD deletes (the schema has no deletedAt columns).

export type Resource =
  | "products"
  | "customers"
  | "quotes"
  | "invoices"
  | "contacts"
  | "users"
  | "messages"

export type Action = "delete" | "export"

// Map each logical resource to its Prisma delegate name.
export const PRISMA_DELEGATE: Record<Resource, string> = {
  products: "part",
  customers: "company",
  quotes: "quote",
  invoices: "invoice",
  contacts: "contact",
  users: "user",
  messages: "contactMessage",
}

// Fields included in CSV / JSON exports — only columns that exist on each model.
export const EXPORT_FIELDS: Record<Resource, string[]> = {
  products: ["id", "sku", "oemNumber", "nameEn", "nameAr", "listPrice", "stockQty", "isActive", "createdAt"],
  customers: ["id", "name", "crNumber", "vatNumber", "email", "phone", "city", "country", "createdAt"],
  quotes: ["id", "number", "status", "currency", "subtotal", "vatAmount", "total", "validUntil", "companyId", "createdAt"],
  invoices: ["id", "number", "status", "amountPaid", "issuedAt", "dueAt", "paidAt", "quoteId", "createdAt"],
  contacts: ["id", "name", "email", "phone", "position", "isPrimary", "companyId"],
  users: ["id", "name", "email", "role", "isActive", "createdAt"],
  messages: ["id", "name", "email", "phone", "company", "subject", "status", "locale", "createdAt"],
}

// Default ordering for exports. Contact has no createdAt column.
export const EXPORT_ORDER_BY: Record<Resource, Record<string, "asc" | "desc">> = {
  products: { createdAt: "desc" },
  customers: { createdAt: "desc" },
  quotes: { createdAt: "desc" },
  invoices: { createdAt: "desc" },
  contacts: { id: "desc" },
  users: { createdAt: "desc" },
  messages: { createdAt: "desc" },
}

export const RESOURCE_LABELS: Record<Resource, { en: string; ar: string }> = {
  products: { en: "Parts", ar: "المنتجات" },
  customers: { en: "Companies", ar: "الشركات" },
  quotes: { en: "Quotes", ar: "عروض الأسعار" },
  invoices: { en: "Invoices", ar: "الفواتير" },
  contacts: { en: "Contacts", ar: "جهات الاتصال" },
  users: { en: "Users", ar: "المستخدمون" },
  messages: { en: "Messages", ar: "الرسائل" },
}
