#!/usr/bin/env node
// Submits every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam,
// and everything that feeds Copilot/ChatGPT search). Google ignores IndexNow;
// use Search Console for Google. Run after each production deploy:
//
//   npm run seo:indexnow
//
// The key must match the file served at https://<host>/<key>.txt (in /public).

const HOST = "hesp.riyada-ventures.com"
const KEY = "1b459c144b544aa14bcc7b8d1dbfeb52"
const SITEMAP = `https://${HOST}/sitemap.xml`

const xml = await (await fetch(SITEMAP)).text()
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (urls.length === 0) {
  console.error(`No <loc> URLs found in ${SITEMAP}`)
  process.exit(1)
}

// IndexNow accepts up to 10,000 URLs per POST — one request is plenty here.
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
})

// 200 = processed, 202 = accepted (key not yet verified) — both are success.
console.log(`IndexNow: submitted ${urls.length} URLs — HTTP ${res.status} ${res.statusText}`)
if (res.status >= 400) process.exit(1)
