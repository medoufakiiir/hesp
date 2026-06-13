# CLAUDE.md — HESP Full Redesign & Enhancement

> **Project:** Riyada Ventures HESP — Heavy Equipment Spare Parts  
> **Stack:** React + Tailwind CSS + Next.js (bilingual AR/EN, RTL/LTR)  
> **Mission:** Complete visual redesign, install 21st.dev hero, source real heavy equipment images, apply motion system.

---

## PHASE 0 — AUDIT FIRST

Before writing a single line of code:

1. Run `find . -type f \( -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" \) | grep -v node_modules | grep -v .next` to list all source files.
2. Read every file under `src/` (or `app/`, `components/`, `pages/`) — understand current structure.
3. List all current routes, components, sections.
4. Check `package.json` for existing dependencies (shadcn, framer-motion, next-intl, etc.).
5. Read `tailwind.config.*` to understand the current color/font setup.
6. Only start redesigning AFTER you have a clear picture of everything that exists.

---

## PHASE 1 — INSTALL 21ST.DEV HERO SECTION

Run this command exactly:

```bash
npx shadcn@latest add https://21st.dev/r/meschacirung/hero-section-9
```

After installation:

- The component lands at `src/components/blocks/hero-section-9.tsx` (or similar path — confirm after install).
- Use it with:

```tsx
import { HeroSection } from "@/components/blocks/hero-section-9";

export function Demo() {
  return <HeroSection />;
}
```

- **Customize it** for HESP context:
  - Headline: `"القطع التي تُحرك عالم الإنشاء"` (AR) / `"Parts That Move the World"` (EN)
  - Subheadline: Heavy equipment spare parts — delivered fast across Saudi Arabia
  - CTA buttons: `"اطلب الآن / Order Now"` + `"تصفح الكتالوج / Browse Catalog"`
  - Background: dark industrial — use a real heavy equipment image (see Phase 2)
  - Integrate `HeroSection` as the first section on the homepage, replacing whatever hero currently exists.

---

## PHASE 2 — SOURCE HEAVY EQUIPMENT IMAGES

Download high-quality, free-to-use images using `curl` or fetch directly from Unsplash Source API. Save to `public/images/equipment/`.

```bash
mkdir -p public/images/equipment
```

Download at least **12 images** covering these categories:

| Filename | Subject |
|---|---|
| `excavator-1.jpg` | Large yellow excavator on site |
| `bulldozer-1.jpg` | Caterpillar bulldozer pushing earth |
| `crane-1.jpg` | Tower crane on construction site |
| `loader-1.jpg` | Wheel loader / front loader |
| `grader-1.jpg` | Motor grader on desert road |
| `compactor-1.jpg` | Road roller / compactor |
| `forklift-1.jpg` | Industrial forklift in warehouse |
| `dump-truck-1.jpg` | Heavy dump truck mining |
| `concrete-mixer-1.jpg` | Concrete mixer truck |
| `hydraulic-parts.jpg` | Hydraulic cylinders / spare parts close-up |
| `gear-parts.jpg` | Industrial gears and mechanical parts |
| `workshop.jpg` | Heavy equipment repair workshop |

Use Unsplash Source (no API key needed):

```bash
# Example: download excavator image
curl -L "https://source.unsplash.com/1600x900/?excavator,construction" \
  -o public/images/equipment/excavator-1.jpg

curl -L "https://source.unsplash.com/1600x900/?bulldozer,caterpillar" \
  -o public/images/equipment/bulldozer-1.jpg

curl -L "https://source.unsplash.com/1600x900/?tower+crane,construction" \
  -o public/images/equipment/crane-1.jpg

curl -L "https://source.unsplash.com/1600x900/?wheel+loader,heavy+equipment" \
  -o public/images/equipment/loader-1.jpg

curl -L "https://source.unsplash.com/1600x900/?motor+grader,road+construction" \
  -o public/images/equipment/grader-1.jpg

curl -L "https://source.unsplash.com/1600x900/?road+roller,compactor" \
  -o public/images/equipment/compactor-1.jpg

curl -L "https://source.unsplash.com/1600x900/?forklift,warehouse,industrial" \
  -o public/images/equipment/forklift-1.jpg

curl -L "https://source.unsplash.com/1600x900/?dump+truck,mining" \
  -o public/images/equipment/dump-truck-1.jpg

curl -L "https://source.unsplash.com/1600x900/?concrete+mixer,truck" \
  -o public/images/equipment/concrete-mixer-1.jpg

curl -L "https://source.unsplash.com/1600x900/?hydraulic+parts,machinery" \
  -o public/images/equipment/hydraulic-parts.jpg

curl -L "https://source.unsplash.com/1600x900/?industrial+gears,spare+parts" \
  -o public/images/equipment/gear-parts.jpg

curl -L "https://source.unsplash.com/1600x900/?heavy+equipment+workshop,repair" \
  -o public/images/equipment/workshop.jpg
```

After downloading, verify each file is a real JPEG (not a redirect HTML):
```bash
file public/images/equipment/*.jpg
```

If any file is HTML, re-download it with a slightly different query keyword.

---

## PHASE 3 — INSTALL MOTION LIBRARY

Check if `framer-motion` is already installed. If not:

```bash
npm install framer-motion
```

Also install if not present:
```bash
npm install @radix-ui/react-scroll-area
npm install clsx tailwind-merge
npm install lucide-react
```

---

## PHASE 4 — DESIGN SYSTEM TOKENS

Update `tailwind.config.ts` (or `.js`) with the HESP brand system:

```ts
// In theme.extend:
colors: {
  brand: {
    iron:    "#1A1A1A",   // Near-black — structural base
    steel:   "#2D3748",   // Dark steel grey — sections
    amber:   "#D97706",   // Construction amber — primary accent
    gold:    "#F59E0B",   // Warm gold — hover states
    dust:    "#92400E",   // Earth tone — borders
    sand:    "#FEF3C7",   // Light sand — text on dark
    white:   "#F9FAFB",   // Off-white — body text
    muted:   "#6B7280",   // Grey — captions/labels
  }
},
fontFamily: {
  arabic: ["'Noto Sans Arabic'", "sans-serif"],
  display: ["'Barlow Condensed'", "sans-serif"],
  body: ["'Inter'", "sans-serif"],
},
```

Add Google Fonts to your root layout or `_document.tsx`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600&family=Noto+Sans+Arabic:wght@400;600;700&display=swap" rel="stylesheet" />
```

---

## PHASE 5 — FULL PAGE REDESIGN

### 5A. Homepage (`page.tsx` or `index.tsx`)

Structure it exactly in this order:

```
1. <Navbar />               — sticky, glass-morphism on scroll
2. <HeroSection />          — from 21st.dev (Phase 1), full viewport, dark bg + equipment image
3. <StatsBar />             — 4 animated counters: years, brands, categories, countries served
4. <ProductCategories />    — 6-grid of equipment categories with hover zoom
5. <FeaturedEquipment />    — masonry/grid of heavy equipment images (from Phase 2)
6. <WhyChooseUs />          — 4 USPs with icon + short paragraph
7. <BrandsCarousel />       — logo scroll of CAT, Komatsu, Volvo, JCB, Hitachi, John Deere, Liebherr
8. <Testimonials />         — 3 client cards (Saudi construction companies)
9. <ContactCTA />           — Full-width dark section with contact form + map
10. <Footer />              — bilingual, links, social, location (Riyadh, Saudi Arabia)
```

### 5B. Design Principles for HESP

Apply these rules to EVERY component you create or update:

**Color usage:**
- Background of main sections: `brand-iron` (#1A1A1A) alternating with `brand-steel` (#2D3748)
- Primary accent on CTAs, borders, highlights: `brand-amber` (#D97706)
- Body text: `brand-white` (#F9FAFB)
- Muted/captions: `brand-muted` (#6B7280)
- Never use pure white `#FFFFFF` as a background — it feels sterile for industrial brand

**Typography:**
- Hero headlines: `font-display` (Barlow Condensed), `font-extrabold`, `uppercase`, `tracking-tight`
- Arabic headlines: `font-arabic` (Noto Sans Arabic), `font-bold`
- Body: `font-body` (Inter), `font-normal`, line-height `1.7`
- Section eyebrows: `text-brand-amber text-xs uppercase tracking-widest font-semibold`

**Imagery:**
- Every equipment image: `object-cover` with a dark overlay gradient
- Use `grayscale hover:grayscale-0 transition-all duration-500` on grid images for dramatic hover effect
- Images should breathe — never cram them; minimum 16:9 ratio

**Cards and containers:**
- Border: `border border-brand-amber/20`
- Rounded: `rounded-2xl` only; no sharp corners anywhere
- Shadows: `shadow-2xl shadow-black/40`
- Glass: `bg-white/5 backdrop-blur-md` for floating cards on dark backgrounds

---

## PHASE 6 — MOTION SYSTEM

Create a shared motion config file: `src/lib/motion.ts`

```ts
export const fadeInUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export const fadeInLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export const slideInFromRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};
```

Apply motion to sections using `whileInView` + `viewport={{ once: true, margin: "-80px" }}`:

```tsx
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

<motion.section
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
  <motion.h2 variants={fadeInUp}>...</motion.h2>
  <motion.p variants={fadeInUp}>...</motion.p>
</motion.section>
```

**Specific motion moments to implement:**
- `StatsBar`: counter animation using `useInView` + `useMotionValue` (count up from 0)
- `ProductCategories`: stagger grid reveal, each card `scaleIn`
- `FeaturedEquipment`: `fadeInUp` per image, staggered
- `Navbar`: `y: -80` to `y: 0` on mount, glass opacity transition on scroll
- `HeroSection`: text slides in from left, image fades in — 0.3s delay between elements
- `BrandsCarousel`: CSS infinite scroll marquee (no JS needed): `animate-marquee` utility class

---

## PHASE 7 — COMPONENTS TO BUILD / REBUILD

### `<Navbar />`

```tsx
// Features:
// - Sticky, z-50
// - Transparent on hero, dark glass on scroll
// - Logo (Riyada Ventures SVG/PNG — import from /public)
// - Nav links: Home, Products, About, Contact (bilingual)
// - Language switcher AR/EN (use next-intl or a simple toggle)
// - CTA button: "تواصل معنا / Contact Us" in brand-amber
// - Mobile: hamburger → slide-down drawer
// - RTL-aware: flex-row-reverse when Arabic
```

### `<StatsBar />`

4 animated counters, dark background, full width:
```
+15 سنة خبرة     |   +500 ماركة     |   +10,000 قطعة غيار    |   +30 دولة نخدمها
15+ Years Exp.   |  500+ Brands    |  10,000+ Parts           |  30+ Countries
```

### `<ProductCategories />`

6-grid (3×2 desktop, 2×3 tablet, 1 mobile):
- Excavator Parts
- Bulldozer & Dozer Parts
- Crane & Lifting Parts
- Loader Parts
- Road Construction Parts
- Engine & Hydraulic Parts

Each card: equipment image background + amber gradient overlay + Arabic/English title + arrow icon

### `<FeaturedEquipment />`

Masonry grid (or Bento grid) of the 12 images downloaded in Phase 2.
- Mix of landscape + portrait crops
- Hover: scale 1.04, grayscale lifts
- Light box on click (use `@radix-ui/react-dialog`)

### `<BrandsCarousel />`

CSS marquee — infinite horizontal scroll, no library needed:
```css
/* In globals.css */
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee { animation: marquee 20s linear infinite; }
```

Brand logos: CAT, Komatsu, Volvo CE, JCB, Hitachi, John Deere, Liebherr, Doosan, Hyundai CE

### `<ContactCTA />`

Full-width dark section:
- Left: Form (Name, Company, Phone, Part Request)
- Right: Map embed of Riyadh + contact details (WhatsApp, phone, email)
- Form validation client-side
- Submit → WhatsApp deep link: `https://wa.me/966XXXXXXXXX?text=...`

---

## PHASE 8 — BILINGUAL RTL/LTR

Apply RTL direction switching to **every** new component:

```tsx
// Layout wrapper pattern
const { locale } = useLocale(); // or from context/props
const isArabic = locale === "ar";

<div dir={isArabic ? "rtl" : "ltr"} className={isArabic ? "font-arabic" : "font-body"}>
  ...
</div>
```

**Arabic text to use (double-check with the client):**

| EN | AR |
|---|---|
| Heavy Equipment Spare Parts | قطع غيار المعدات الثقيلة |
| Browse Catalog | تصفح الكتالوج |
| Request a Quote | طلب عرض سعر |
| About Us | عن الشركة |
| Our Products | منتجاتنا |
| Contact Us | تواصل معنا |
| Years of Experience | سنوات الخبرة |
| Trusted Brands | علامات تجارية موثوقة |
| Spare Parts Available | قطعة غيار متاحة |

---

## PHASE 9 — RESPONSIVE CHECK

After building each section, verify:
- `sm:` (640px) — single column, stacked
- `md:` (768px) — 2 columns
- `lg:` (1024px) — full desktop layout
- RTL layout doesn't break on mobile

---

## PHASE 10 — FINAL QUALITY PASS

1. Run `npm run build` — fix ALL TypeScript and import errors.
2. Run `npm run lint` — fix all warnings.
3. Screenshots of desktop + mobile using `puppeteer` or `playwright` if available.
4. Check that ALL 12 images load correctly in the browser.
5. Verify the 21st.dev `HeroSection` renders with the custom HESP content.
6. Test language switch (AR ↔ EN).
7. Test all animations with `prefers-reduced-motion` — wrap motion components with:

```tsx
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

---

## IMPORTANT CONSTRAINTS

- **Do NOT delete** any existing data/API connections, form handlers, or backend integrations.
- **Do NOT break** the routing structure — redesign in place.
- **Commit** after each phase: `git add . && git commit -m "HESP: Phase X — description"`
- If `shadcn` is not initialized, run: `npx shadcn@latest init` first, selecting dark theme + CSS variables.
- If the project does not use Next.js (pure React/Vite), adapt imports accordingly — do NOT assume Next.js features.
- **Language of all new UI copy:** provide both Arabic and English strings in all components.
- **Image optimization:** use `<Image />` from `next/image` if Next.js, else regular `<img loading="lazy" />`.

---

## START SEQUENCE

Execute phases in this exact order:

```
Phase 0 → Audit
Phase 1 → Install HeroSection from 21st.dev
Phase 2 → Download equipment images
Phase 3 → Install missing npm packages
Phase 4 → Update Tailwind tokens
Phase 5 → Redesign all sections
Phase 6 → Apply motion system
Phase 7 → Build/rebuild each component
Phase 8 → Bilingual RTL/LTR polish
Phase 9 → Responsive check
Phase 10 → Build, lint, final QA
```

Good luck. This redesign should make HESP feel like the premium industrial supplier it is — dark, confident, heavy, and unmistakably Saudi.
