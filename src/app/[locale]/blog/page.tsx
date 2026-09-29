import type { Metadata } from "next"
import { getPublishedPosts, toBlogPostData } from "@/lib/blog"
import BlogPageClient from "./BlogPageClient"
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo"

// Re-query the database at most once per minute so newly published
// posts appear without needing a full redeploy (ISR).
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    title: locale === "ar"
      ? "مدونة المعدات الثقيلة | نصائح الصيانة | HESP"
      : "Heavy Equipment Blog | Maintenance Tips | HESP",
    description: locale === "ar"
      ? "مقالات متخصصة عن صيانة المعدات الثقيلة واختيار قطع الغيار وإدارة الأساطيل — نصائح عملية لقطاع الإنشاءات في السعودية."
      : "Expert articles on heavy equipment maintenance, spare parts selection, and fleet management. Tips for Saudi Arabia's construction industry. مقالات متخصصة عن صيانة المعدات الثقيلة.",
    path: "/blog",
    locale,
    keywords: [
      "heavy equipment maintenance tips",
      "heavy machinery parts Saudi Arabia",
      "construction equipment parts Riyadh",
      "fleet management Saudi Arabia",
      "spare parts selection guide",
      "مقالات صيانة المعدات الثقيلة",
      "قطع غيار المعدات الثقيلة",
    ],
  })
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const postsData = (await getPublishedPosts()).map(toBlogPostData)

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(locale, [
          { name: "Home", url: "/" }, { name: "Blog", url: "/blog" },
        ])) }}
      />
      <BlogPageClient postsData={postsData} />
    </>
  )
}
