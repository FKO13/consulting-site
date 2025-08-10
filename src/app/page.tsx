import Hero from '@/components/Hero'
import LossCalculator from '@/components/LossCalculator'
import ServicesSection from '@/components/ServicesSection'
import CasesSection from '@/components/CasesSection'
import ProcessSection from '@/components/ProcessSection'
import BlogSection from '@/components/BlogSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <>
      <Hero />
      <LossCalculator />
      <ServicesSection />
      <CasesSection />
      <ProcessSection />
      <BlogSection />
      <ContactSection />
    </>
  )
}