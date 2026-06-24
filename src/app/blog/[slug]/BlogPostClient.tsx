"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Tag, ArrowLeft, ArrowUpRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/shared/Breadcrumb"
import { useLang } from "@/context/LangContext"
import type { BlogPost } from "@/data/blog"
import { fadeInUp, staggerContainer } from "@/lib/motion"

interface Props {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogPostClient({ post, relatedPosts }: Props) {
  const { isArabic } = useLang()
  const content = isArabic ? post.contentAR : post.contentEN

  return (
    <main className="min-h-screen bg-brand-iron">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-24 lg:pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={post.image} alt={isArabic ? post.titleAR : post.titleEN}
            fill className="object-cover opacity-15 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-iron/80 via-brand-iron/90 to-brand-iron" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumb items={[
            { labelEN: "Blog", labelAR: "المدونة", href: "/blog" },
            { labelEN: post.titleEN.slice(0, 40) + "...", labelAR: post.titleAR.slice(0, 40) + "..." },
          ]} />
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}
            className={`mt-8 ${isArabic ? "text-right" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
            <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-6 ${isArabic ? "flex-row-reverse" : ""}`}>
              <div className="flex items-center gap-1.5 text-brand-amber text-xs">
                <Calendar size={13} />
                <span>{new Date(post.date).toLocaleDateString(isArabic ? "ar-SA" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              <span className="w-px h-3 bg-brand-white/10" />
              <span className="text-brand-white/40 text-xs">{post.author}</span>
            </motion.div>
            <motion.h1 variants={fadeInUp}
              className={`text-brand-white leading-tight mb-6 ${
                isArabic ? "font-arabic font-bold text-4xl" : "font-display font-extrabold uppercase tracking-tight text-5xl"
              }`}>
              {isArabic ? post.titleAR : post.titleEN}
            </motion.h1>
            <motion.div variants={fadeInUp} className={`flex flex-wrap gap-2 ${isArabic ? "flex-row-reverse" : ""}`}>
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-brand-amber/20
                  text-brand-amber/60 text-[10px] font-bold uppercase tracking-widest">
                  <Tag size={9} /> {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`prose prose-invert prose-amber max-w-none
          ${isArabic
            ? "prose-headings:font-arabic prose-headings:font-bold"
            : "prose-headings:font-display prose-headings:font-extrabold prose-headings:uppercase prose-headings:tracking-tight"
          }
          prose-h2:text-brand-amber prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-brand-white prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-brand-muted prose-p:leading-relaxed prose-p:mb-6
          prose-li:text-brand-muted prose-li:leading-relaxed
          prose-strong:text-brand-white prose-strong:font-semibold
          prose-ul:my-6 prose-ol:my-6
          ${isArabic ? "font-arabic text-right" : ""}`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          {content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) return <h2 key={i}>{line.replace("## ", "")}</h2>
            if (line.startsWith("### ")) return <h3 key={i}>{line.replace("### ", "")}</h3>
            if (line.startsWith("- ")) return <li key={i}>{line.replace("- ", "")}</li>
            if (line.match(/^\d+\. /)) return <li key={i}>{line.replace(/^\d+\. /, "")}</li>
            if (line.trim() === "") return <br key={i} />
            return <p key={i}>{line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").split("<strong>").map((part, j) => {
              if (part.includes("</strong>")) {
                const [bold, rest] = part.split("</strong>")
                return <span key={j}><strong>{bold}</strong>{rest}</span>
              }
              return part
            })}</p>
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-brand-amber/10 border border-brand-amber/20 text-center">
          <h3 className={`text-brand-white font-bold text-xl mb-3 ${isArabic ? "font-arabic" : "font-display uppercase"}`}>
            {isArabic ? "هل تحتاج قطع غيار؟" : "Need Spare Parts?"}
          </h3>
          <p className={`text-brand-muted mb-6 ${isArabic ? "font-arabic" : ""}`}>
            {isArabic ? "تواصل مع فريقنا الهندسي للحصول على المشورة المتخصصة والأسعار التنافسية." : "Contact our engineering team for expert advice and competitive pricing."}
          </p>
          <Link href="/quote"
            className={`inline-flex items-center gap-2 bg-brand-amber text-white text-xs font-bold
              px-8 py-4 rounded-xl hover:bg-brand-gold transition-all ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
            {isArabic ? "طلب عرض سعر" : "Get a Quote"}
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h3 className={`text-brand-white font-bold text-xl mb-8 ${isArabic ? "font-arabic text-right" : "font-display uppercase"}`}>
              {isArabic ? "مقالات ذات صلة" : "Related Articles"}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`}>
                  <div className="group flex gap-4 p-4 rounded-2xl bg-brand-plate border border-brand-amber/10
                    hover:border-brand-amber/40 transition-all duration-300 cursor-pointer"
                    dir={isArabic ? "rtl" : "ltr"}>
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={rp.image} alt={isArabic ? rp.titleAR : rp.titleEN}
                        fill className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" sizes="96px" />
                    </div>
                    <div className="flex-grow">
                      <h4 className={`text-brand-white font-semibold text-sm group-hover:text-brand-amber
                        transition-colors line-clamp-2 ${isArabic ? "font-arabic text-right" : ""}`}>
                        {isArabic ? rp.titleAR : rp.titleEN}
                      </h4>
                      <p className="text-brand-amber/60 text-[10px] mt-2">
                        {new Date(rp.date).toLocaleDateString(isArabic ? "ar-SA" : "en-US", { year: "numeric", month: "short" })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <Link href="/blog" className={`inline-flex items-center gap-2 text-brand-amber text-xs font-semibold
            uppercase tracking-widest hover:text-brand-gold transition-colors ${isArabic ? "flex-row-reverse" : ""}`}>
            <ArrowLeft size={14} className={isArabic ? "rotate-180" : ""} />
            {isArabic ? "العودة للمدونة" : "Back to Blog"}
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  )
}
