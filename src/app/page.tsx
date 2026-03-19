import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { ProjectsPreview } from '@/components/sections/ProjectsPreview'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection } from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesPreview />
      <ProjectsPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
