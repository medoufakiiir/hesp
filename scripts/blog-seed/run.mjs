// Seeds all blog batch files into the database as drafts (published: false).
// Usage: node --env-file=.env scripts/blog-seed/run.mjs [--count-only]
import { PrismaClient } from "@prisma/client";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const prisma = new PrismaClient();
const here = dirname(fileURLToPath(import.meta.url));

if (process.argv.includes("--count-only")) {
  const total = await prisma.blogPost.count();
  const drafts = await prisma.blogPost.count({ where: { published: false } });
  const slugs = await prisma.blogPost.findMany({
    select: { slug: true },
    orderBy: { createdAt: "asc" },
  });
  console.log(`total=${total} drafts=${drafts}`);
  console.log(slugs.map((s) => s.slug).join("\n"));
  await prisma.$disconnect();
  process.exit(0);
}

const batchFiles = readdirSync(here)
  .filter((f) => /^batch-\d+\.mjs$/.test(f))
  .sort();

let created = 0;
let updated = 0;
for (const file of batchFiles) {
  const { posts } = await import(join(here, file));
  for (const post of posts) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: post.slug },
      select: { id: true, published: true },
    });
    if (existing) {
      // Never touch published state on re-runs — admins control activation.
      await prisma.blogPost.update({ where: { slug: post.slug }, data: post });
      updated++;
    } else {
      await prisma.blogPost.create({ data: { ...post, published: false } });
      created++;
    }
  }
  console.log(`${file}: ${posts.length} posts processed`);
}

console.log(`Done. created=${created} updated=${updated}`);
await prisma.$disconnect();
