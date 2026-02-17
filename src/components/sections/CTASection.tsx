'use client'

import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { ContactForm } from '@/components/ui/ContactForm'
import { Mail, Phone } from 'lucide-react'

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/20 via-secondary to-secondary border border-accent/20 p-8 md:p-12 lg:p-16">
            {/* Décoration de fond */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Colonne gauche : texte + coordonnées */}
              <div className="flex flex-col justify-center">
                <h2 className="heading-2 mb-4">Parlons de votre projet</h2>
                <p className="text-body mb-8">
                  Décrivez-moi votre besoin en quelques lignes. Je vous réponds
                  personnellement sous 24 à 48h avec des premières pistes concrètes.
                </p>

                <div className="space-y-4">
                  <a
                    href="mailto:contact@dvs-web.fr"
                    className="flex items-center gap-3 text-neutral-300 hover:text-accent transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-accent" size={18} />
                    </div>
                    <span>contact@dvs-web.fr</span>
                  </a>
                  <a
                    href="tel:+33651019506"
                    className="flex items-center gap-3 text-neutral-300 hover:text-accent transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-accent" size={18} />
                    </div>
                    <span>06 51 01 95 06</span>
                  </a>
                </div>
              </div>

              {/* Colonne droite : formulaire */}
              <div>
                <ContactForm idPrefix="cta" compact />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
