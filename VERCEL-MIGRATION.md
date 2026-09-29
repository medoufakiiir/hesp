# Moving HESP to a new Vercel account

The database (users, blog posts, quotes, catalog) and the environment variables
stay with the **old** Vercel account. The code now degrades gracefully without
them, but to get everything back:

## 1. Environment variables (Project → Settings → Environment Variables)

| Variable | Needed for | Notes |
|---|---|---|
| `DATABASE_URL` | everything stored in the DB | Pooled Postgres URL (Neon: Storage → Connect). |
| `DATABASE_URL_UNPOOLED` | `prisma db push` | Direct (non-pooled) URL. The Neon integration adds it automatically. |
| `AUTH_SECRET` | admin login | Any long random string: `openssl rand -base64 32`. Without it every login fails. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | recovery login | Signing in with these creates/resets that user as `SUPER_ADMIN`. |
| `BLOB_READ_WRITE_TOKEN` | image uploads in admin | Added automatically when you connect a Vercel Blob store. |
| `RESEND_API_KEY`, `ADMIN_NOTIFICATION_EMAIL` | quote/contact emails | Copy from the old project. |
| `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER` | links / WhatsApp | Copy from the old project. |

Do **not** copy `AUTH_URL` / `NEXTAUTH_URL` if it points at the old
deployment's domain. That sends logins back to the old site. Leave it unset.

Redeploy after changing variables.

## 2. Create the tables and restore data

From your machine, with the new database's URLs in `.env`:

```bash
npx prisma db push                  # create tables
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='…' npm run db:restore
npm run db:seed                     # optional: catalog categories/brands/parts
```

`db:restore` recreates the admin user and inserts all 120 bundled blog posts
(`src/data/blog-posts`) as published. Posts already in the DB are left alone.

From the site instead: sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`, open
**Admin → Blog** and click **Restore as published**.

## What works before the DB is connected

- **Public blog, feed and sitemap:** serve the 120 bundled posts whenever the
  DB is unset, unreachable or has no posts yet.
- **Admin login:** works with `ADMIN_EMAIL` / `ADMIN_PASSWORD` (plus
  `AUTH_SECRET`). The admin blog page shows the posts read-only with a warning.
- **Quotes, invoices, users, contacts:** only the old database has these. To
  recover them, export that database from the old account (Neon console →
  branch → backup, or `pg_dump`) and restore it into the new one before running
  the steps above.
