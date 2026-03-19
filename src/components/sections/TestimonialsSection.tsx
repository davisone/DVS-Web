import { Star } from 'lucide-react'
import { testimonials } from '@/data/testimonials'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              Avis clients
            </span>
            <h2 className="heading-2 mt-3 mb-4">Ce que disent mes clients</h2>
            <p className="text-body max-w-2xl mx-auto">
              Des entrepreneurs et TPE qui ont fait confiance à DVS Web pour leur présence en ligne.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={index * 0.1}>
              <div className="card h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6 flex-grow">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-neutral-500 text-xs">
                    {testimonial.role} — {testimonial.company}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
