'use client'

import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { ContactForm } from '@/components/ui/ContactForm'
import { Mail, MapPin, Phone } from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@dvs-web.fr',
    href: 'mailto:contact@dvs-web.fr',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '06 51 01 95 06',
    href: 'tel:+33651019506',
  },
  {
    icon: MapPin,
    label: 'Localisation',
    value: 'Rennes et alentours, France',
  },
]

export function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Contact
              </span>
              <h1 className="heading-1 mt-3 mb-6">Parlons de votre projet</h1>
              <p className="text-body">
                Une idée, une question, un besoin ? Je vous réponds sous 24h.
                Décrivez-moi votre projet et voyons ensemble comment lui donner vie.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <ContactForm
                  idPrefix="contact"
                  submitLabel="Envoyer le message"
                />
              </ScrollReveal>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={0.2}>
                <div className="card">
                  <h2 className="text-white font-semibold text-lg mb-6">
                    Coordonnées
                  </h2>
                  <div className="space-y-6">
                    {contactInfo.map((item) => (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <item.icon className="text-accent" size={20} />
                        </div>
                        <div>
                          <p className="text-neutral-500 text-sm">{item.label}</p>
                          {item.href ? (
                            <a
                              href={item.href}
                              target={item.href.startsWith('http') ? '_blank' : undefined}
                              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-white hover:text-accent transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-white">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="border-neutral-800 my-6" />

                  <div>
                    <h3 className="text-white font-medium mb-2">Disponibilité</h3>
                    <p className="text-neutral-400 text-sm">
                      Je suis généralement disponible du lundi au vendredi,
                      de 9h à 18h. Je réponds à tous les messages sous 24h.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
