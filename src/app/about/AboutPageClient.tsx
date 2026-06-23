"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Target, Eye, Shield, Truck, Users, Globe, ArrowRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/shared/Breadcrumb"
import { useLang } from "@/context/LangContext"

const values = [
  { icon: Shield, titleEN: "Quality First", titleAR: "الجودة أولاً", descEN: "Every part we supply meets or exceeds OEM specifications. We never compromise on quality.", descAR: "كل قطعة نوفرها تلبي أو تتجاوز مواصفات OEM. لا نتنازل أبداً عن الجودة." },
  { icon: Truck, titleEN: "Fast Delivery", titleAR: "توصيل سريع", descEN: "Same-day pickup in Riyadh, express air freight in 3-5 days across the Kingdom.", descAR: "استلام في نفس اليوم بالرياض، شحن جوي سريع في 3-5 أيام في المملكة." },
  { icon: Users, titleEN: "Expert Support", titleAR: "دعم متخصص", descEN: "Our engineering team provides technical consultation for every procurement decision.", descAR: "يقدم فريقنا الهندسي استشارات فنية لكل قرار شراء." },
  { icon: Globe, titleEN: "Global Sourcing", titleAR: "مصادر عالمية", descEN: "Direct relationships with manufacturers in USA, Europe, Japan, and South Korea.", descAR: "علاقات مباشرة مع المصنعين في أمريكا وأوروبا واليابان وكوريا الجنوبية." },
]

export default function AboutPageClient() {
  const { isArabic } = useLang()

  return (
    <main className="min-h-screen bg-brand-iron">
      <Navbar />

      {/* Cinematic Header */}
      <section className="relative pt-32 lg:pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-brand-amber/[0.04] blur-[150px]" />
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: "linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-amber/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ labelEN: "About", labelAR: "عن الشركة" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-8 ${isArabic ? "text-right" : ""}`}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <p className="text-brand-amber text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              {isArabic ? "عن الشركة" : "About Us"}
            </p>
            <h1 className={`text-brand-white leading-[0.95] mb-4 ${
              isArabic
                ? "font-arabic font-bold text-[clamp(2.5rem,7vw,5rem)]"
                : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,8vw,6rem)]"
            }`}>
              {isArabic ? "بُنيت للصناعة\nالسعودية" : "Built for Saudi\nIndustry"}
            </h1>
            <p className={`text-brand-muted text-lg max-w-2xl ${isArabic ? "font-arabic" : ""}`}>
              {isArabic
                ? "ريادة فنتشرز هي العمود الفقري للصيانة الصناعية ودعم المعدات الثقيلة في السعودية."
                : "Riyada Ventures is the backbone of Saudi industrial maintenance and heavy equipment support."}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Story Section — 3D Glass */}
        <div className={`mt-8 grid lg:grid-cols-2 gap-12 items-center ${isArabic ? "lg:grid-flow-dense" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={isArabic ? "lg:col-start-2 text-right" : ""}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-brand-amber/40" />
              <span className="text-brand-amber text-xs font-semibold uppercase tracking-[0.25em]">
                {isArabic ? "قصتنا" : "Our Story"}
              </span>
            </div>
            <h2 className={`text-brand-white leading-tight mb-6 ${
              isArabic ? "font-arabic font-bold text-4xl" : "font-display font-extrabold uppercase tracking-tight text-5xl"
            }`}>
              {isArabic ? "15+ سنة من التميز" : "15+ Years of\nExcellence"}
            </h2>
            <div className="space-y-4">
              <p className={`text-brand-muted leading-relaxed ${isArabic ? "font-arabic" : ""}`}>
                {isArabic
                  ? "تأسست ريادة فنتشرز لحل مشكلة سوقية متكررة: يحتاج المشغلون إلى القطعة الصحيحة بسرعة من مصدر موثوق — بدون تخمين. منذ تأسيسنا، خدمنا مئات الشركات في قطاعات البناء والتعدين والنفط والغاز."
                  : "Riyada Ventures was established to solve a persistent market problem: operators need the right part, fast, from a reliable source — without guesswork. Since our founding, we have served hundreds of companies across construction, mining, and oil & gas sectors."}
              </p>
              <p className={`text-brand-muted leading-relaxed ${isArabic ? "font-arabic" : ""}`}>
                {isArabic
                  ? "نحن نعمل مع أكثر من 500 علامة تجارية عالمية ونوفر أكثر من 10,000 قطعة غيار مختلفة. يمتد عملنا إلى أكثر من 30 دولة عبر الشرق الأوسط وأفريقيا وآسيا."
                  : "We work with over 500 global brands and supply more than 10,000 different spare parts. Our operations extend to over 30 countries across the Middle East, Africa, and Asia."}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotateY: -6 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`relative rounded-2xl overflow-hidden h-[420px] shadow-2xl shadow-black/50 ${isArabic ? "lg:col-start-1" : ""}`}
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <Image src="/images/ourstory.jpeg" alt="Riyada Ventures — construction leadership" fill className="object-cover" sizes="50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-iron/70 via-brand-iron/20 to-transparent" />
            {/* Glass overlay badge */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/[0.08]">
              <div className={`flex items-center gap-3 ${isArabic ? "flex-row-reverse" : ""}`}>
                <div className="w-10 h-10 rounded-lg bg-brand-amber/20 flex items-center justify-center flex-shrink-0">
                  <Globe size={18} className="text-brand-amber" />
                </div>
                <div className={isArabic ? "text-right" : ""}>
                  <p className={`text-brand-white font-semibold text-sm ${isArabic ? "font-arabic" : ""}`}>
                    {isArabic ? "٣٠+ دولة" : "30+ Countries"}
                  </p>
                  <p className={`text-brand-muted text-xs ${isArabic ? "font-arabic" : ""}`}>
                    {isArabic ? "شبكة توزيع عالمية" : "Global distribution network"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission — 3D Glass Cards */}
        <div className="mt-24 grid md:grid-cols-2 gap-6" style={{ perspective: "1000px" }}>
          {[
            { icon: Eye, titleEN: "Our Vision", titleAR: "رؤيتنا",
              descEN: "To be the most trusted heavy equipment partner in the Middle East — the first call for every fleet manager, every time.",
              descAR: "أن نكون الشريك الأكثر ثقةً في قطاع المعدات الثقيلة بالشرق الأوسط — الاتصال الأول لكل مدير أسطول، في كل مرة." },
            { icon: Target, titleEN: "Our Mission", titleAR: "مهمتنا",
              descEN: "Delivering engineering excellence through precision global sourcing, fast logistics, and unwavering commitment to quality.",
              descAR: "تقديم التميز الهندسي من خلال المصادر العالمية الدقيقة والخدمات اللوجستية السريعة والالتزام الراسخ بالجودة." },
          ].map(({ icon: Icon, titleEN, titleAR, descEN, descAR }, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, rotateY: 2, scale: 1.01 }}
              className="group relative p-10 rounded-2xl overflow-hidden
                bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent
                backdrop-blur-sm border border-white/[0.06]
                hover:border-brand-amber/25 hover:shadow-2xl hover:shadow-brand-amber/10
                transition-[border,box-shadow] duration-500 cursor-default"
              style={{ transformStyle: "preserve-3d" }}
              dir={isArabic ? "rtl" : "ltr"}
            >
              {/* Top glass line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700
                bg-gradient-to-br from-brand-amber/5 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                <div className="relative w-14 h-14 rounded-xl bg-brand-amber/10 group-hover:bg-brand-amber/20 flex items-center justify-center mb-6 transition-colors">
                  <Icon size={28} className="text-brand-amber" />
                  <div className="absolute inset-0 rounded-xl bg-brand-amber/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                </div>
                <h3 className={`text-brand-white font-bold text-2xl mb-4 ${isArabic ? "font-arabic" : "font-display uppercase tracking-tight"}`}>
                  {isArabic ? titleAR : titleEN}
                </h3>
                <p className={`text-brand-muted leading-relaxed ${isArabic ? "font-arabic" : ""}`}>
                  {isArabic ? descAR : descEN}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values — 3D Glass Grid */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-center mb-14 ${isArabic ? "font-arabic" : ""}`}
          >
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-brand-amber/40" />
              <span className="text-brand-amber text-xs font-semibold uppercase tracking-[0.25em]">
                {isArabic ? "قيمنا" : "Our Values"}
              </span>
              <span className="h-px w-8 bg-brand-amber/40" />
            </div>
            <h2 className={`text-brand-white ${
              isArabic ? "font-arabic font-bold text-4xl" : "font-display font-extrabold uppercase tracking-tight text-5xl"
            }`}>
              {isArabic ? "ما يميزنا" : "What Sets Us Apart"}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ perspective: "1000px" }}>
            {values.map(({ icon: Icon, titleEN, titleAR, descEN, descAR }, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 40, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10, rotateY: 3, scale: 1.02 }}
                className="group relative p-8 rounded-2xl overflow-hidden cursor-default
                  bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent
                  backdrop-blur-sm border border-white/[0.06]
                  hover:border-brand-amber/25 hover:shadow-xl hover:shadow-brand-amber/10
                  transition-[border,box-shadow] duration-500"
                style={{ transformStyle: "preserve-3d" }}
                dir={isArabic ? "rtl" : "ltr"}
              >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-brand-amber/10 group-hover:bg-brand-amber/20 flex items-center justify-center mb-6 transition-colors">
                    <Icon size={24} className="text-brand-amber" />
                  </div>
                  <h3 className={`text-brand-white font-bold text-lg mb-3 ${isArabic ? "font-arabic" : "font-display uppercase tracking-tight"}`}>
                    {isArabic ? titleAR : titleEN}
                  </h3>
                  <p className={`text-brand-muted text-sm leading-relaxed ${isArabic ? "font-arabic" : ""}`}>
                    {isArabic ? descAR : descEN}
                  </p>
                </div>
                <span className="absolute top-3 right-4 text-brand-white/[0.02] group-hover:text-brand-amber/[0.06]
                  font-display font-extrabold text-6xl transition-colors duration-500 pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA — Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center py-20 px-8 rounded-2xl relative overflow-hidden
            bg-gradient-to-br from-brand-amber/10 via-brand-amber/5 to-transparent
            border border-brand-amber/15"
        >
          <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
            backgroundImage: "radial-gradient(rgba(217,119,6,0.5) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }} />
          <div className="relative z-10">
            <h2 className={`text-brand-white mb-4 ${
              isArabic ? "font-arabic font-bold text-3xl" : "font-display font-extrabold uppercase tracking-tight text-4xl"
            }`}>
              {isArabic ? "مستعد للعمل معنا؟" : "Ready to Work With Us?"}
            </h2>
            <p className={`text-brand-muted mb-10 max-w-xl mx-auto ${isArabic ? "font-arabic" : ""}`}>
              {isArabic
                ? "تواصل معنا اليوم وسيقوم فريقنا بمساعدتك في العثور على القطعة التي تحتاجها."
                : "Contact us today and our team will help you find the exact part you need."}
            </p>
            <div className={`flex items-center justify-center gap-4 ${isArabic ? "flex-row-reverse" : ""}`}>
              <Link href="/quote">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={`group inline-flex items-center gap-2 bg-brand-amber text-white text-xs font-bold uppercase tracking-widest
                    px-8 py-4 rounded-xl hover:bg-brand-gold transition-colors shadow-lg shadow-brand-amber/20 cursor-pointer ${isArabic ? "flex-row-reverse" : ""}`}
                >
                  {isArabic ? "طلب عرض سعر" : "Get a Quote"}
                  <ArrowRight size={14} className={isArabic ? "rotate-180" : ""} />
                </motion.span>
              </Link>
              <Link href="/contact"
                className="border border-white/[0.1] bg-white/[0.03] backdrop-blur-sm text-brand-white text-xs font-bold uppercase tracking-widest
                  px-8 py-4 rounded-xl hover:border-brand-amber/30 hover:text-brand-amber transition-all">
                {isArabic ? "تواصل معنا" : "Contact Us"}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
