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

const EQ = "/images/equipment" // bundled machine / scene photos (ultimate fallback)

// ── AI-generated imagery via Pollinations ──────────────────────────────────
// Each category and product gets its OWN distinct, on-brand image, generated
// from a text prompt and served as an external URL (no files to manage). The
// `seed` pins one specific render per item so the image is stable across
// rebuilds. Images are generated on first fetch and cached by Pollinations,
// then re-cached by Next/Image (see minimumCacheTTL in next.config.ts).
//
// Host is allow-listed in next.config.ts (images.remotePatterns + CSP img-src).
const AI = "https://image.pollinations.ai/prompt"
const STYLE =
  "professional industrial product photography, single isolated subject centered in frame, " +
  "dramatic studio lighting, dark seamless background, sharp focus, ultra detailed, photorealistic, 4k"

/** Build a stable Pollinations URL for a subject + numeric seed. */
function aiImg(subject: string, seed: number): string {
  const prompt = `${subject}, ${STYLE}`
  return `${AI}/${encodeURIComponent(prompt)}?width=800&height=600&nologo=true&model=flux&seed=${seed}`
}

/** Deterministic 0..999999 seed from any string (djb2-ish), so URLs are stable. */
function seedFrom(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h % 1_000_000
}

export const CATEGORY_FALLBACK = `${EQ}/gear-parts.jpg`

/**
 * Per-category subject prompts, keyed by Category.slug (matches prisma/seed.ts
 * plus the legacy top-level slugs). Each subject is distinct, so every category
 * renders its own unique image. Edit a subject string to change the artwork.
 */
const categorySubjects: Record<string, string> = {
  // Engine
  "engine-parts": "a complete heavy-duty diesel engine for a construction excavator, isolated",
  pistons: "a row of four shiny metal engine pistons with connecting rods and cylinder liners, isolated",
  gaskets: "a flat metal engine head gasket beside a set of rubber sealing rings, isolated",
  turbochargers: "a single chrome and cast-iron diesel turbocharger with snail housing, isolated",
  injectors: "a set of four diesel common-rail fuel injectors lined up in a row, isolated",

  // Hydraulics
  hydraulics: "an excavator hydraulic pump and control valve assembly with hoses, isolated",
  "hydraulic-pumps": "a single axial-piston hydraulic pump for an excavator, isolated",
  "hydraulic-cylinders": "a single polished chrome hydraulic ram cylinder lying horizontally, isolated",
  "hydraulic-valves": "a steel hydraulic directional control valve block with spools, isolated",
  "hydraulic-hoses": "coiled high-pressure black hydraulic hoses with crimped steel fittings, isolated",
  "seal-kits": "a hydraulic cylinder seal kit of o-rings and rubber seals laid out on a tray, isolated",

  // Undercarriage
  undercarriage: "a crawler excavator steel track undercarriage assembly, isolated",
  "track-chains": "a heavy steel bulldozer track chain link section, isolated",
  rollers: "a row of cylindrical steel track rollers for an excavator undercarriage, isolated",
  idlers: "a front idler wheel beside a drive sprocket for a crawler excavator, isolated",
  "track-shoes": "stacked steel track shoe pads with grouser bars for a bulldozer, isolated",

  // Transmission & drivetrain
  "transmission-drivetrain": "a heavy equipment transmission gearbox housing with exposed gears, isolated",
  "final-drives": "a single excavator final-drive travel motor with sprocket, isolated",
  "gears-clutches": "a stack of large steel transmission gears beside a clutch friction pack, isolated",

  // Electrical
  electrical: "an assortment of heavy equipment electrical parts: an ECU module, relays and connectors, isolated",
  "alternators-starters": "a 24 volt alternator beside a heavy-duty diesel starter motor, isolated",
  sensors: "several industrial pressure and temperature sensors for machinery, isolated",
  "wiring-harnesses": "a coiled engine wiring harness loom with many plug connectors, isolated",

  // Filters
  filters: "a group of heavy equipment filters: oil, air, fuel and hydraulic together, isolated",
  "oil-filters": "two spin-on cylindrical engine oil filters, isolated",
  "fuel-filters": "a diesel fuel filter water-separator cartridge, isolated",
  "air-filters": "a large cylindrical pleated engine air filter element, isolated",
  "hydraulic-filters": "a hydraulic return filter cartridge for an excavator, isolated",

  // Cooling
  "cooling-system": "an aluminium engine radiator paired with a cooling fan, isolated",
  radiators: "a single aluminium engine radiator core with side tanks, isolated",
  "water-pumps": "a cast-metal engine water pump with pulley and impeller, isolated",
  "cooling-fans": "a multi-blade engine cooling fan with fan clutch, isolated",

  // Ground Engaging Tools (GET)
  "ground-engaging-tools": "a set of excavator bucket teeth, adapters and a cutting edge, isolated",
  "bucket-teeth": "several pointed steel excavator bucket teeth digging tips, isolated",
  "cutting-edges": "a long bolt-on steel cutting-edge blade for a loader bucket, isolated",
  adapters: "a set of weld-on excavator bucket-tooth adapters, isolated",

  // Misc
  "seals-fasteners": "an assortment of industrial bolts, nuts, washers and rubber seals, isolated",
  "cabin-body": "an operator cabin and body panels for an excavator, isolated",

  // Legacy top-level slugs (src/data/categories.ts)
  "excavator-parts": "yellow hydraulic excavator on a construction site",
  "bulldozer-parts": "crawler bulldozer pushing earth on a site",
  "crane-parts": "mobile construction crane lifting on a site",
  "loader-parts": "wheel loader moving material on a construction site",
  "road-construction-parts": "road roller compactor paving a desert road",
  "engine-hydraulic-parts": "diesel engine and hydraulic parts for heavy equipment",
}

/**
 * Category slugs that have a real, named photo at /public/images/categories/<slug>.png.
 * These are preferred over AI generation. Keep in sync with the files on disk.
 */
const categoryPhotos = new Set<string>([
  "engine-parts", "pistons", "gaskets", "turbochargers", "injectors",
  "hydraulics", "hydraulic-pumps", "hydraulic-cylinders", "hydraulic-valves", "hydraulic-hoses", "seal-kits",
  "undercarriage", "track-chains", "rollers", "idlers", "track-shoes",
  "transmission-drivetrain", "final-drives", "gears-clutches",
  "electrical", "alternators-starters", "sensors", "wiring-harnesses",
  "filters", "oil-filters", "fuel-filters", "air-filters", "hydraulic-filters",
  "cooling-system", "radiators", "water-pumps", "cooling-fans",
  "ground-engaging-tools", "bucket-teeth", "cutting-edges", "adapters",
  "seals-fasteners", "cabin-body",
])

/** Resolve a category hero image by slug. Prefers a real named photo, then AI. */
export function getCategoryImage(slug?: string | null): string {
  if (!slug) return CATEGORY_FALLBACK
  if (categoryPhotos.has(slug)) return `/images/categories/${slug}.png`
  const subject = categorySubjects[slug]
  if (subject) return aiImg(subject, seedFrom(slug))
  // Unknown slug: still give it a unique, relevant-ish image from the slug text.
  return aiImg(`${slug.replace(/-/g, " ")} for heavy construction equipment`, seedFrom(slug))
}

/**
 * Real, named product photos at /public/images/parts/<file>.png, keyed by SKU.
 * SKUs not listed here have no dedicated photo and fall back to their category
 * image. Keep in sync with the files on disk.
 */
const productPhotos: Record<string, string> = {
  "SAMPLE-CAT-FINAL-DRIVE-320": "cat_final_drive_320",
  "SAMPLE-KOM-FINAL-DRIVE-PC200": "kom_final_drive_pc200",
  "SAMPLE-CAT-SWING-GEAR-320": "cat_swing_gear_320",
  "SAMPLE-VOLVO-CLUTCH-L120": "volvo_clutch_l120",
  "SAMPLE-CAT-ALTERNATOR-320": "cat_alternator_320",
  "SAMPLE-BOSCH-STARTER-24V": "bosch_starter_24v",
  "SAMPLE-KOM-PRESS-SENSOR": "kom_press_sensor",
  "SAMPLE-CAT-TEMP-SENSOR": "cat_temp_sensor",
  "SAMPLE-HIT-WIRING-ZX200": "hit_wiring_zx200",
  "SAMPLE-CAT-WIRING-320D": "cat_wiring_320d",
  "SAMPLE-DON-OIL-FILTER-P55": "don_oil_filter_p55",
  "SAMPLE-FLT-OIL-FILTER-LF9009": "flt_oil_filter_lf9009",
  "SAMPLE-BALD-OIL-FILTER-B7600": "bald_oil_filter_b7600",
  "SAMPLE-DON-FUEL-FILTER-P55": "don_fuel_filter_p55",
  "SAMPLE-FLT-FUEL-SEP-FS19732": "flt_fuel_sep_fs19732",
  "SAMPLE-DON-AIR-P82-PRIMARY": "don_air_p82_primary",
  "SAMPLE-DON-AIR-P82-SAFETY": "don_air_p82_safety",
  "SAMPLE-FLT-AIR-AF25708": "flt_air_af25708",
  "SAMPLE-DON-HYD-FILTER-P17": "don_hyd_filter_p17",
  "SAMPLE-KOM-HYD-FILTER-SUCT": "kom_hyd_filter_suct",
  "SAMPLE-CAT-RADIATOR-320D": "cat_radiator_320d",
  "SAMPLE-KOM-RADIATOR-PC200": "kom_radiator_pc200",
  "SAMPLE-CAT-WATER-PUMP-C7": "cat_water_pump_c7",
  "SAMPLE-KOM-WATER-PUMP-6D102": "komatsu_water_pump_6d102",
  "SAMPLE-CAT-FAN-CLUTCH-320": "cat_fan_clutch_320",
  "SAMPLE-KOM-TOOTH-PC200": "komatsu_tooth_pc200",
  "SAMPLE-CAT-EDGE-320": "cat_edge_320",
  "SAMPLE-CAT-ADAPTER-J350": "cat_adapter_j350",
  "SAMPLE-CAT-ORING-KIT": "cat_oring_kit",
  "SAMPLE-KOM-BOLT-TRACK": "komatsu_bolt_track",
  "SAMPLE-CAT-CABIN-GLASS-320": "cat_cabin_glass_320",
  "SAMPLE-KOM-SEAT-PC200": "komatsu_seat_pc200",
  "SAMPLE-CAT-MIRROR-320": "cat_mirror_320",
  "SAMPLE-JCB-HYD-PUMP-3CX": "jcb_hyd_pump_3cx",
  "SAMPLE-HYUNDAI-AIR-FILTER": "hyundai_air_filter",
  "SAMPLE-DOOSAN-TURBO-DX225": "doosan_turbo_dx225",
  "SAMPLE-LIEBHERR-SWING-R920": "liebherr_swing_r920",
  "SAMPLE-SANY-OIL-FILTER-215": "sany_oil_filter_215",
  "SAMPLE-XCMG-FUEL-FILTER-215": "xcmg_fuel_filter_215",
  "SAMPLE-KOBELCO-HYD-CYL-SK200": "kobelco_hyd_cyl_sk200",
  "SAMPLE-CASE-TRACK-CX210": "case_track_cx210",
  "SAMPLE-BOBCAT-HYD-PUMP-E85": "bobcat_hyd_pump_e85",
  "SAMPLE-JD-AIR-FILTER-210G": "jd_air_filter_210g",
  "SAMPLE-PERK-GASKET-1104": "perkins_gasket_1104",
  "SAMPLE-CUM-TURBO-HX35W": "cummins_turbo_hx35w",
  "SAMPLE-CAT-TRANS-FILTER": "cat_trans_filter",
  "SAMPLE-VOLVO-FUEL-FILTER-EC": "volvo_fuel_filter_ec",
  "SAMPLE-HIT-HYD-FILTER-ZX": "hitachi_hyd_filter_zx",
  "SAMPLE-VOLVO-RADIATOR-EC210": "volvo_radiator_ec210",
  "SAMPLE-HIT-WATER-PUMP-ZX200": "hitachi_water_pump_zx200",
  "SAMPLE-KOM-EDGE-PC200": "komatsu_edge_pc200",
  "SAMPLE-VOLVO-TOOTH-EC210": "volvo_tooth_ec210",
}

/**
 * Resolve a product image. Order of preference:
 *  1. A real uploaded image (PartImage.url) — admins can always override.
 *  2. A real named photo on disk, keyed by SKU (/images/parts/<file>.png).
 *  3. The category image (a named photo when available), then a bundled fallback.
 */
export function getProductImage(
  directUrl?: string | null,
  categorySlug?: string | null,
  sku?: string | null,
): string {
  if (directUrl) return directUrl
  if (sku && productPhotos[sku]) return `/images/parts/${productPhotos[sku]}.png`
  return getCategoryImage(categorySlug)
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
