// Google tag (gtag.js) — GA4 property G-S3SJXK36HN. Must be rendered inside
// the <head> of every html shell: the public [locale] layout, the /admin
// layout, and the root not-found page each own their own <html>, so each one
// mounts this component individually.
export default function GoogleAnalytics() {
  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-S3SJXK36HN" />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-S3SJXK36HN');`,
        }}
      />
    </>
  )
}
