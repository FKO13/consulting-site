// src/app/page.tsx
import Hero from '@/components/Hero'
import Hero3D from '@/components/Hero3D'
import LossCalculator from '@/components/LossCalculator'
import ServicesSection from '@/components/ServicesSection'
import CasesSection from '@/components/CasesSection'
import ProcessSection from '@/components/ProcessSection'
import BlogSection from '@/components/BlogSection'
import ContactSection from '@/components/ContactSection'
import AboutSection from '@/components/AboutSection'

export default function Home() {
  return (
    <>
      {/* Блок Hero с 3D фигурой */}
      <section className="relative">
        <Hero3D />
        <Hero />
      </section>

      {/* Раздел "О компании" (только статика) */}
      <section className="relative">
        <AboutSection />
      </section>

      <LossCalculator />
      <ServicesSection />
      <CasesSection />
      <ProcessSection />
      <BlogSection />
      <ContactSection />
    </>
  )
}
