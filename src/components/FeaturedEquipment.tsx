"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import * as Dialog from "@radix-ui/react-dialog"
import { X, ZoomIn } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { staggerFast, fadeInUp, scaleIn } from "@/lib/motion"

const equipmentItems = [
  { src: "/images/equipment/excavator-1.jpg",    labelEN: "Excavator",       labelAR: "حفارة",         span: "col-span-2 row-span-2" },
  { src: "/images/equipment/bulldozer-1.jpg",    labelEN: "Bulldozer",       labelAR: "جرافة" },
  { src: "/images/equipment/crane-1.jpg",        labelEN: "Tower Crane",     labelAR: "رافعة برجية" },
  { src: "/images/equipment/dump-truck-1.jpg",   labelEN: "Dump Truck",      labelAR: "شاحنة قلاب",    span: "col-span-2" },
  { src: "/images/equipment/grader-1.jpg",       labelEN: "Motor Grader",    labelAR: "مسوية" },
  { src: "/images/equipment/forklift-1.jpg",     labelEN: "Forklift",        labelAR: "رافعة شوكية" },
  { src: "/images/equipment/compactor-1.jpg",    labelEN: "Compactor",       labelAR: "هراس الطرق" },
  { src: "/images/equipment/concrete-mixer-1.jpg", labelEN: "Concrete Mixer", labelAR: "خلاطة خرسانة", span: "col-span-2" },
  { src: "/images/equipment/hydraulic-parts.jpg", labelEN: "Hydraulic Parts", labelAR: "قطع هيدروليك" },
  { src: "/images/equipment/gear-parts.jpg",     labelEN: "Gear Parts",      labelAR: "قطع تروس" },
  { src: "/images/equipment/workshop.jpg",       labelEN: "Workshop",        labelAR: "الورشة",        span: "col-span-2" },
  { src: "/images/equipment/loader-1.jpg",       labelEN: "Wheel Loader",    labelAR: "لودر" },
]

export default function FeaturedEquipment() {
  const { t, isArabic } = useLang()
  const [selected, setSelected] = useState<(typeof equipmentItems)[0] | null>(null)

  return (
    <section className="py-20 lg:py-28 bg-brand-steel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerFast}
          className={`mb-12 ${isArabic ? "text-right" : ""}`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <motion.p variants={fadeInUp} className={`text-brand-amber text-xs font-semibold mb-3 ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
            {t.equipment.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className={`text-brand-white leading-none mb-4 ${
              isArabic
                ? "font-arabic font-bold text-[clamp(2.5rem,6vw,5rem)]"
                : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,7vw,6rem)]"
            }`}
          >
            {t.equipment.title}
          </motion.h2>
          <motion.p variants={fadeInUp} className={`text-brand-muted max-w-xl ${isArabic ? "font-arabic" : ""}`}>
            {t.equipment.sub}
          </motion.p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerFast}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px]"
        >
          {equipmentItems.map((item, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(item)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer
                border border-brand-amber/10 hover:border-brand-amber/50
                transition-all duration-300 ${item.span ?? ""}`}
            >
              <Image
                src={item.src}
                alt={item.labelEN}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover grayscale-[50%] group-hover:grayscale-0
                  group-hover:scale-105 transition-all duration-500"
                loading={i < 4 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
                opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Label */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <span className={`text-brand-white font-semibold text-sm ${isArabic ? "font-arabic" : ""}`}>
                  {isArabic ? item.labelAR : item.labelEN}
                </span>
                <div className="w-7 h-7 rounded-full bg-brand-amber/0 group-hover:bg-brand-amber
                  flex items-center justify-center transition-all duration-300">
                  <ZoomIn size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox dialog */}
      <Dialog.Root open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <AnimatePresence>
          {selected && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  className="fixed inset-4 md:inset-12 lg:inset-20 z-50 rounded-2xl overflow-hidden
                    border border-brand-amber/20 shadow-2xl shadow-black"
                >
                  <Image
                    src={selected.src}
                    alt={selected.labelEN}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                    <Dialog.Title className={`text-brand-white font-extrabold text-4xl ${isArabic ? "font-arabic" : "font-display uppercase"}`}>
                      {isArabic ? selected.labelAR : selected.labelEN}
                    </Dialog.Title>
                  </div>
                  <Dialog.Close className="absolute top-4 end-4 w-10 h-10 rounded-full bg-black/60
                    border border-brand-white/10 flex items-center justify-center text-brand-white
                    hover:bg-brand-amber hover:border-brand-amber transition-all cursor-pointer">
                    <X size={18} />
                  </Dialog.Close>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  )
}
