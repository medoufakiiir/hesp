import { revalidatePath } from "next/cache"

// Public-facing routes that surface admin-managed catalog data
// (categories, parts, brands). Several of these pages are statically
// cached (e.g. `export const revalidate = 3600`), so without an explicit
// revalidation an edit in the admin panel would not appear on the public
// site until the cache expired. Call this after ANY catalog mutation so
// changes show up on the interface immediately.
//
// `revalidatePath(route, "page")` with the bracketed route pattern
// invalidates every dynamic instance of that route (all category / brand
// slugs), not just one.
export function revalidateCatalog() {
  revalidatePath("/")                       // homepage: categories, featured parts, brands
  revalidatePath("/products")               // catalog list
  revalidatePath("/products/[slug]", "page") // every category page
  revalidatePath("/brands")                 // brand wall
  revalidatePath("/brands/[slug]", "page")  // every brand page
}
