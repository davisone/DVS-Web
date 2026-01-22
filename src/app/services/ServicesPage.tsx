'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { services } from '@/data/services'
import { ArrowRight, Check, ExternalLink } from 'lucide-react'

const process = [
  {
    step: '01',
    title: 'Échange',
    description: 'Discussion pour comprendre vos besoins, vos objectifs et votre budget.',
  },
  {
    step: '02',
    title: 'Proposition',
    description: 'Devis détaillé avec planning, fonctionnalités et tarif transparent.',
  },
  {
    step: '03',
    title: 'Développement',
    description: 'Réalisation technique avec des points réguliers pour validation.',
  },
  {
    step: '04',
    title: 'Livraison',
    description: 'Mise en ligne, formation et accompagnement pour la suite.',
  },
]

export function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Services
              </span>
              <h1 className="heading-1 mt-3 mb-6">
                Ce que je peux faire pour vous
              </h1>
              <p className="text-body">
                Du site vitrine à l&apos;application mobile, je vous accompagne
                dans la création de solutions digitales adaptées à votre activité
                et à votre budget.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="space-y-16 md:space-y-24">
            {services.map((service, index) => (
              <ScrollReveal key={service.id}>
                <div
                  id={service.id}
                  className="scroll-mt-24 grid lg:grid-cols-2 gap-8 lg:gap-16 items-start"
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                      <service.icon className="text-accent" size={32} />
                    </div>
                    <h2 className="heading-3 mb-4">{service.title}</h2>
                    <p className="text-body whitespace-pre-line mb-6">
                      {service.fullDescription}
                    </p>

                    {/* Reference badge */}
                    {service.hasReference && service.referenceProject && (
                      <Link
                        href="/realisations"
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                      >
                        <Check size={16} />
                        Référence : {service.referenceProject}
                        <ExternalLink size={14} />
                      </Link>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <Button href="/contact" variant="secondary">
                        Demander un devis
                        <ArrowRight size={18} />
                      </Button>
                      <Button href="/tarifs" variant="ghost">
                        Voir les tarifs
                      </Button>
                    </div>
                  </div>

                  <div className={`card ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3 className="text-white font-semibold mb-4">Ce que ça inclut</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                            <Check className="text-accent" size={12} />
                          </div>
                          <span className="text-neutral-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Processus
              </span>
              <h2 className="heading-2 mt-3 mb-4">Comment ça fonctionne</h2>
              <p className="text-body max-w-2xl mx-auto">
                Une méthodologie simple et transparente pour mener votre projet
                de A à Z, avec vous.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <ScrollReveal key={item.step} delay={index * 0.1}>
                <div className="relative">
                  <span className="text-6xl font-bold text-accent/10">
                    {item.step}
                  </span>
                  <h3 className="text-white font-semibold text-lg mt-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="heading-2 mb-4">Prêt à démarrer ?</h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Discutons de votre projet et trouvons ensemble la solution
                la plus adaptée à vos besoins et votre budget.
              </p>
              <Button href="/contact" size="lg">
                Discuter de mon projet
                <ArrowRight size={20} />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}