import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/20 via-secondary to-secondary border border-accent/20 p-8 md:p-16 text-center">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <h2 className="heading-2 mb-4">
                Vous avez un projet en tête ?
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Discutons de vos besoins et voyons ensemble comment donner vie
                à votre projet. Premier échange sans engagement.
              </p>
              <Button href="/contact" size="lg">
                Discutons de votre projet
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
