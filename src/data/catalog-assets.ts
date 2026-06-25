// ──────────────────────────────────────────────────────────────────────────
// Centralized catalog → image asset resolution.
//
// Categories and brands live in the DB (Prisma), but the schema has no image
// column for Category and brand logoUrl is usually empty. Rather than scatter
// `|| "/images/equipment/gear-parts.jpg"` fallbacks across every page (which is
// why every card showed the same gear photo), assets are resolved here by slug.
//
// To upgrade a single entry, drop a file into /public/images/categories/<slug>.jpg
// (or /public/images/brands/<slug>.svg) and point the map at it. The helpers
// degrade gracefully until then — no broken images, no repeated placeholder.
// ──────────────────────────────────────────────────────────────────────────

const CAT = "/images/categories" // real part close-ups
const EQ = "/images/equipment" // machine / scene photos

export const CATEGORY_FALLBACK = `${EQ}/gear-parts.jpg`

/**
 * Per-category hero image, keyed by Category.slug (matches prisma/seed.ts).
 * Several map to genuine part close-ups in /images/categories; the rest use the
 * most thematically relevant machine photo. Replace any value with a dedicated
 * /images/categories/<slug>.jpg as better art becomes available.
 */
export const categoryImages: Record<string, string> = {
  // Engine
  "engine-parts": `${EQ}/workshop.jpg`,
  pistons: `${EQ}/gear-parts.jpg`,
  gaskets: `${EQ}/gear-parts.jpg`,
  turbochargers: `${CAT}/turbocharger.jpg`,
  injectors: `${EQ}/hydraulic-parts.jpg`,

  // Hydraulics
  hydraulics: `${CAT}/hydraulic-pump.jpg`,
  "hydraulic-pumps": `${CAT}/hydraulic-pump.jpg`,
  "hydraulic-cylinders": `${EQ}/hydraulic-parts.jpg`,
  "hydraulic-valves": `${EQ}/hydraulic-parts.jpg`,
  "hydraulic-hoses": `${EQ}/hydraulic-parts.jpg`,
  "seal-kits": `${CAT}/bearing-grease.jpg`,

  // Undercarriage
  undercarriage: `${EQ}/bulldozer-1.jpg`,
  "track-chains": `${EQ}/bulldozer-1.jpg`,
  rollers: `${EQ}/bulldozer-1.jpg`,
  idlers: `${EQ}/bulldozer-1.jpg`,
  "track-shoes": `${EQ}/bulldozer-1.jpg`,

  // Transmission & drivetrain
  "transmission-drivetrain": `${EQ}/gear-parts.jpg`,
  "final-drives": `${EQ}/gear-parts.jpg`,
  "gears-clutches": `${EQ}/gear-parts.jpg`,

  // Electrical
  electrical: `${CAT}/ecu.jpg`,
  "alternators-starters": `${CAT}/ecu.jpg`,
  sensors: `${CAT}/ecu.jpg`,
  "wiring-harnesses": `${CAT}/ecu.jpg`,

  // Filters
  filters: `${CAT}/air-filter.jpg`,
  "oil-filters": `${CAT}/air-filter.jpg`,
  "fuel-filters": `${CAT}/air-filter.jpg`,
  "air-filters": `${CAT}/air-filter.jpg`,
  "hydraulic-filters": `${CAT}/air-filter.jpg`,

  // Cooling
  "cooling-system": `${CAT}/radiator.jpg`,
  radiators: `${CAT}/radiator.jpg`,
  "water-pumps": `${CAT}/radiator.jpg`,
  "cooling-fans": `${CAT}/radiator.jpg`,

  // Ground Engaging Tools (GET)
  "ground-engaging-tools": `${EQ}/excavator-1.jpg`,
  "bucket-teeth": `${EQ}/excavator-1.jpg`,
  "cutting-edges": `${EQ}/grader-1.jpg`,
  adapters: `${EQ}/excavator-1.jpg`,

  // Misc
  "seals-fasteners": `${CAT}/bearing-grease.jpg`,
  "cabin-body": `${EQ}/loader-1.jpg`,

  // Legacy top-level slugs (src/data/categories.ts) — kept as aliases
  "excavator-parts": `${EQ}/excavator-1.jpg`,
  "bulldozer-parts": `${EQ}/bulldozer-1.jpg`,
  "crane-parts": `${EQ}/crane-1.jpg`,
  "loader-parts": `${EQ}/loader-1.jpg`,
  "road-construction-parts": `${EQ}/compactor-1.jpg`,
  "engine-hydraulic-parts": `${EQ}/hydraulic-parts.jpg`,
}

/** Resolve a category hero image by slug, with a safe fallback. */
export function getCategoryImage(slug?: string | null): string {
  if (!slug) return CATEGORY_FALLBACK
  return categoryImages[slug] ?? CATEGORY_FALLBACK
}

/**
 * Resolve a product image. Prefers a real uploaded image (PartImage.url); when a
 * part has none, falls back to its *category* image instead of a single global
 * placeholder — so an air-filter part shows filter art, a pump shows pump art.
 */
export function getProductImage(directUrl?: string | null, categorySlug?: string | null): string {
  return directUrl || getCategoryImage(categorySlug)
}

/**
 * Curated parent categories shown on the homepage grid. Kept short (the full
 * taxonomy is ~39 categories) and ordered so every card shows a distinct image.
 * Clicking one opens the parent page, which aggregates all of its child parts.
 */
export const HOMEPAGE_CATEGORY_SLUGS = [
  "engine-parts", // workshop.jpg
  "hydraulics", // hydraulic-pump.jpg
  "undercarriage", // bulldozer-1.jpg
  "filters", // air-filter.jpg
  "cooling-system", // radiator.jpg
  "ground-engaging-tools", // excavator-1.jpg
] as const

/**
 * Categories backing the homepage "Top Selling Parts" grid — one part is shown
 * per category, in this order, so all eight cards display a different image.
 */
export const FEATURED_PRODUCT_CATEGORY_SLUGS = [
  "air-filters", // air-filter.jpg
  "hydraulic-pumps", // hydraulic-pump.jpg
  "turbochargers", // turbocharger.jpg
  "radiators", // radiator.jpg
  "alternators-starters", // ecu.jpg
  "seal-kits", // bearing-grease.jpg
  "hydraulic-cylinders", // hydraulic-parts.jpg
  "final-drives", // gear-parts.jpg
] as const

/**
 * Brand logos that physically exist in /public/images/brands. Only listed when
 * the file is present, so consumers can treat a missing entry as "no logo" and
 * render a wordmark fallback. Add a line here when you drop in a new SVG/PNG.
 * See SOURCING note at the bottom for where to obtain the remaining marks.
 */
export const brandLogos: Record<string, string> = {
  // Icon marks sourced from Simple Icons
  caterpillar: "/images/brands/caterpillar.svg",
  "volvo-ce": "/images/brands/volvo-ce.svg",
  jcb: "/images/brands/jcb.svg",
  "john-deere": "/images/brands/john-deere.svg",
  bosch: "/images/brands/bosch.svg",
  hitachi: "/images/brands/hitachi.svg",
  hyundai: "/images/brands/hyundai.svg",
  // Typographic wordmark logos (not on Simple Icons — generated to match)
  komatsu: "/images/brands/komatsu.svg",
  doosan: "/images/brands/doosan.svg",
  liebherr: "/images/brands/liebherr.svg",
  case: "/images/brands/case.svg",
  kobelco: "/images/brands/kobelco.svg",
  sany: "/images/brands/sany.svg",
  xcmg: "/images/brands/xcmg.svg",
  bobcat: "/images/brands/bobcat.svg",
  perkins: "/images/brands/perkins.svg",
  cummins: "/images/brands/cummins.svg",
  donaldson: "/images/brands/donaldson.svg",
  fleetguard: "/images/brands/fleetguard.svg",
  baldwin: "/images/brands/baldwin.svg",
  "itr-berco": "/images/brands/itr-berco.svg",
}

/**
 * Resolve a brand logo. Prefers the DB value (admin-uploaded logoUrl), then the
 * bundled asset map. Returns null when no logo exists so the UI can show a
 * styled wordmark instead of a broken image.
 */
export function getBrandLogo(slug?: string | null, dbLogoUrl?: string | null): string | null {
  if (dbLogoUrl) return dbLogoUrl
  if (!slug) return null
  return brandLogos[slug] ?? null
}

// ── SOURCING ──
// All 21 catalog brands now have a logo file. The 14 not on Simple Icons use
// generated typographic wordmarks (Arial-bold, textLength-locked so they render
// the same regardless of the viewer's fonts). To swap in an official mark: drop
// the real SVG/PNG at /public/images/brands/<slug>.<ext> and update the path
// above. Good free sources: Wikimedia Commons ("<brand> logo svg"), the brand's
// press/brand-asset page, or https://cdn.simpleicons.org/<slug> if later added.
