"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, Tag } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PageHeader from "@/components/shared/PageHeader"
import Breadcrumb from "@/components/shared/Breadcrumb"
import { useLang } from "@/context/LangContext"
import { staggerContainer, scaleIn } from "@/lib/motion"
import type { BlogPostData } from "@/types/db"

export default function BlogPageClient({ postsData }: { postsData: BlogPostData[] }) {
  const blogPosts = postsData
  const { isArabic } = useLang()

  return (
    <main className="min-h-screen bg-brand-iron">
      <Navbar />
      <PageHeader
        eyebrowEN="Our Blog"
        eyebrowAR="مدونتنا"
        titleEN="Expert Insights"
        titleAR="رؤى متخصصة"
        subtitleEN="Maintenance tips, parts guides, and industry insights from our engineering team."
        subtitleAR="نصائح صيانة، أدلة قطع غيار، ورؤى صناعية من فريقنا الهندسي."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumb items={[{ labelEN: "Blog", labelAR: "المدونة" }]} />

        <motion.div
          variants={staggerContainer} initial="hidden" animate="visible"
          className="mt-10 grid md:grid-cols-2 gap-8"
        >
          {blogPosts.map((post, i) => (
            <motion.div key={post.id} variants={scaleIn}>
              <Link href={`/blog/${post.slug}`}>
                <article className="group rounded-2xl overflow-hidden border border-brand-amber/10
                  hover:border-brand-amber/40 bg-brand-plate shadow-xl shadow-black/30
                  transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={post.image} alt={isArabic ? post.titleAR : post.titleEN}
                      fill sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover grayscale-[30%] group-hover:grayscale-0
                        group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-plate via-transparent to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow" dir={isArabic ? "rtl" : "ltr"}>
                    <div className={`flex items-center gap-3 mb-3 ${isArabic ? "flex-row-reverse" : ""}`}>
                      <div className="flex items-center gap-1.5 text-brand-amber/60 text-[10px]">
                        <Calendar size={11} />
                        <span>{new Date(post.date).toLocaleDateString(isArabic ? "ar-SA" : "en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                      </div>
                      <span className="w-px h-3 bg-brand-white/10" />
                      <div className="flex items-center gap-1 text-brand-amber/60 text-[10px]">
                        <Tag size={10} />
                        <span>{post.tags[0]}</span>
                      </div>
                    </div>
                    <h2 className={`text-brand-white font-bold text-lg mb-3 group-hover:text-brand-amber transition-colors line-clamp-2
                      ${isArabic ? "font-arabic text-right" : ""}`}>
                      {isArabic ? post.titleAR : post.titleEN}
                    </h2>
                    <p className={`text-brand-muted text-sm leading-relaxed line-clamp-3 flex-grow
                      ${isArabic ? "font-arabic text-right" : ""}`}>
                      {isArabic ? post.excerptAR : post.excerptEN}
                    </p>
                    <div className={`mt-4 flex items-center gap-2 text-brand-amber text-xs font-semibold
                      ${isArabic ? "font-arabic flex-row-reverse" : "uppercase tracking-widest"}`}>
                      {isArabic ? "اقرأ المزيد" : "Read More"}
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
