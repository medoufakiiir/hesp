import type { BlogSeedPost } from "./types"
import { posts as core } from "./core"
import { posts as batch01 } from "./batch-01"
import { posts as batch02 } from "./batch-02"
import { posts as batch03 } from "./batch-03"
import { posts as batch04 } from "./batch-04"
import { posts as batch05 } from "./batch-05"
import { posts as batch06 } from "./batch-06"
import { posts as batch07 } from "./batch-07"
import { posts as batch08 } from "./batch-08"
import { posts as batch09 } from "./batch-09"
import { posts as batch10 } from "./batch-10"

export type { BlogSeedPost } from "./types"

const batches = [batch01, batch02, batch03, batch04, batch05, batch06, batch07, batch08, batch09, batch10].flat()

// The batch articles carry no dates of their own. Give each a stable,
// deterministic one (one per day starting after the last core article) so
// ordering, sitemaps and feeds don't shift between deploys.
const BATCH_START = Date.UTC(2026, 5, 20)
const DAY = 24 * 60 * 60 * 1000

/** Every blog post shipped with the codebase (20 core + 100 batch), all
 * published. Used when the database is missing/empty and to restore it. */
export const bundledBlogPosts: (Required<BlogSeedPost> & { publishedAt: Date })[] = [
  ...core,
  ...batches.map((p, i) => ({ ...p, publishedAt: new Date(BATCH_START + i * DAY) })),
].map((p) => ({
  excerptEn: null,
  excerptAr: null,
  coverImageUrl: null,
  metaTitleEn: null,
  metaTitleAr: null,
  metaDescEn: null,
  metaDescAr: null,
  primaryKeyword: null,
  ...p,
  published: true,
  publishedAt: p.publishedAt ?? new Date(BATCH_START),
}))
