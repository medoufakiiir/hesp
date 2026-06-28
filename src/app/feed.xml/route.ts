import { prisma } from "@/lib/db"

// Regenerate the feed at most once per minute so newly published posts
// are picked up quickly by automation tools (Make / Zapier / etc.).
export const revalidate = 60

// The live app is served from hesp.riyada-ventures.com — the apex domain
// still points at the old nginx site, so feed links MUST use this host or
// every shared link would 404. Override with NEXT_PUBLIC_SITE_URL if the
// apex is ever migrated to Vercel.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://hesp.riyada-ventures.com").replace(/\/$/, "")

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 50,
  })

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`
      const pubDate = (p.publishedAt || p.createdAt).toUTCString()
      const title = escapeXml(p.titleEn)
      const description = escapeXml(p.metaDescEn || p.excerptEn || p.titleEn)
      const image = p.coverImageUrl
        ? `${SITE_URL}${p.coverImageUrl.startsWith("/") ? "" : "/"}${p.coverImageUrl}`
        : ""
      const enclosure = image
        ? `\n      <enclosure url="${escapeXml(image)}" type="image/jpeg" length="0" />\n      <media:content url="${escapeXml(image)}" medium="image" />`
        : ""
      const categories = (p.keywords || [])
        .map((k) => `\n      <category>${escapeXml(k)}</category>`)
        .join("")

      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>${enclosure}${categories}
    </item>`
    })
    .join("\n")

  const lastBuild = posts[0]
    ? (posts[0].publishedAt || posts[0].createdAt).toUTCString()
    : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Riyada Ventures HESP — Heavy Equipment Spare Parts Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Expert articles on heavy equipment spare parts, maintenance, and fleet management in Saudi Arabia.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
    },
  })
}
