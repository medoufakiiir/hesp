import Navbar from "@/components/Navbar"
import { HeroSection } from "@/components/blocks/hero-section-9"
import StatsBar from "@/components/StatsBar"
import ProductCategories from "@/components/ProductCategories"
import FeaturedEquipment from "@/components/FeaturedEquipment"
import WhyChooseUs from "@/components/WhyChooseUs"
import BrandsCarousel from "@/components/BrandsCarousel"
import Testimonials from "@/components/Testimonials"
import ContactCTA from "@/components/ContactCTA"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-iron">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <div className="section-divider" />
      <ProductCategories />
      <div className="section-divider" />
      <FeaturedEquipment />
      <div className="section-divider" />
      <WhyChooseUs />
      <div className="section-divider" />
      <BrandsCarousel />
      <div className="section-divider" />
      <Testimonials />
      <div className="section-divider" />
      <ContactCTA />
      <Footer />
    </main>
  )
}
