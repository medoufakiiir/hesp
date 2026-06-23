export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Riyada Ventures - HESP",
    alternateName: "ريادة فنتشرز",
    url: "https://riyada-ventures.com",
    logo: "https://riyada-ventures.com/images/logo.png",
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
    image: "https://riyada-ventures.com/images/logo.png",
    url: "https://riyada-ventures.com",
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
    image: `https://riyada-ventures.com${product.image}`,
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
    image: `https://riyada-ventures.com${post.image}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Riyada Ventures",
      logo: { "@type": "ImageObject", url: "https://riyada-ventures.com/images/logo.png" },
    },
    mainEntityOfPage: `https://riyada-ventures.com/blog/${post.slug}`,
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
      item: `https://riyada-ventures.com${item.url}`,
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
