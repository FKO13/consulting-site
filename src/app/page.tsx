// src/app/page.tsx
import Hero from '@/components/Hero'
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
{/* Hero c 3D внутри Hero-компонента */}
<section className="relative">
<Hero />
</section>


{/* Раздел "О компании" */}
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