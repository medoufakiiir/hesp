import type { Metadata } from "next"

// The apex domain (riyada-ventures.com) still points at an old nginx site —
// the Next.js app is only reachable at the hesp. subdomain. Every canonical,
// sitemap, and JSON-LD URL MUST use this host or Google indexes (and crawlers
// follow) a domain that isn't serving this app. Override via NEXT_PUBLIC_SITE_URL
// if the apex is ever migrated to point at Vercel. Mirrors src/app/feed.xml/route.ts.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://hesp.riyada-ventures.com").replace(/\/$/, "")
export const SITE_NAME = "Riyada Ventures - HESP"
export const DEFAULT_OG_IMAGE = "/images/equipment/excavator-1.jpg"

/**
 * Shared per-page metadata builder: title (template-bypassing so it never gets
 * the root layout's " | Riyada Ventures - HESP" suffix appended twice),
 * canonical/hreflang, openGraph, and twitter. There's no locale-prefixed
 * routing (AR/EN render at the same URL via client-side toggle — see
 * src/context/LangContext.tsx), so `languages` intentionally points both
 * "en" and "ar" at the same canonical URL rather than fabricating URLs that
 * don't exist.
 */
export function buildMetadata(opts: {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogImage?: string
}): Metadata {
  const url = `${SITE_URL}${opts.path}`
  const image = opts.ogImage || DEFAULT_OG_IMAGE
  return {
    title: { absolute: opts.title },
    description: opts.description,
    ...(opts.keywords ? { keywords: opts.keywords } : {}),
    alternates: {
      canonical: url,
      languages: { en: url, ar: url },
    },
    openGraph: {
      type: "website",
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      alternateLocale: "ar_SA",
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Riyada Ventures - HESP",
    alternateName: "ريادة فنتشرز",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: "Saudi Arabia's premier heavy equipment spare parts supplier. OEM and aftermarket parts for CAT, Komatsu, Volvo, JCB, Hitachi and more.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Faisaliyyah",
      addressLocality: "Riyadh",
      postalCode: "12882",
      addressCountry: "SA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+966-55-228-2868",
      contactType: "sales",
      areaServed: ["SA", "AE", "KW", "QA", "BH", "OM"],
      availableLanguage: ["Arabic", "English"],
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61585739796353",
      "https://www.instagram.com/rv_hesp/",
    ],
  }
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Riyada Ventures - Heavy Equipment Spare Parts",
    alternateName: "ريادة فنتشرز - قطع غيار المعدات الثقيلة",
    image: `${SITE_URL}/images/logo.png`,
    url: SITE_URL,
    telephone: "+966552282868",
    email: "info@riyada-ventures.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Al Faisaliyyah",
      addressLocality: "Riyadh",
      addressRegion: "Riyadh Region",
      postalCode: "12882",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.7420,
      longitude: 46.6740,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "SAR",
    paymentAccepted: "Cash, Bank Transfer, Credit Card",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 24.7136, longitude: 46.6753 },
      geoRadius: "2000",
    },
  }
}

export function productJsonLd(product: {
  name: string
  description: string
  image: string
  partNumber: string
  brand: string
  inStock: boolean
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image.startsWith("http") ? product.image : `${SITE_URL}${product.image}`,
    sku: product.partNumber,
    mpn: product.partNumber,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: "SAR",
      seller: { "@type": "Organization", name: "Riyada Ventures" },
    },
  }
}

export function articleJsonLd(post: {
  title: string
  description: string
  image: string
  date: string
  author: string
  slug: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Riyada Ventures",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  }
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

/**
 * ItemList of real, Prisma-sourced products for catalog/category/brand pages
 * (no individual product detail route exists, so each item links to the
 * listing page it actually appears on). Caps to keep the JSON-LD payload sane.
 */
export function productListJsonLd(
  products: { name: string; url: string; image?: string; sku?: string; brand?: string; inStock?: boolean }[],
  limit = 30,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.slice(0, limit).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        url: `${SITE_URL}${p.url}`,
        ...(p.image ? { image: p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}` } : {}),
        ...(p.sku ? { sku: p.sku } : {}),
        ...(p.brand ? { brand: { "@type": "Brand", name: p.brand } } : {}),
        ...(p.inStock !== undefined
          ? {
              offers: {
                "@type": "Offer",
                availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                priceCurrency: "SAR",
              },
            }
          : {}),
      },
    })),
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }
}
