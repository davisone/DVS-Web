'use client'

import { useState } from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { Send, CheckCircle, Mail, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CTASection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  })
  const [formLoadedAt] = useState(() => Date.now())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          _loadedAt: formLoadedAt,
        }),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi')
      }

      setIsSubmitted(true)
      setFormState({ name: '', email: '', subject: '', message: '', website: '' })
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const inputClasses = cn(
    'w-full px-4 py-3 bg-secondary border border-neutral-800 rounded-lg',
    'text-white placeholder:text-neutral-500',
    'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent',
    'transition-colors text-sm'
  )

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
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="text-green-500" size={32} />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">Message envoyé !</h3>
                    <p className="text-neutral-400 text-sm">
                      Merci ! Je vous répondrai dans les plus brefs délais.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 text-accent hover:text-accent-light transition-colors text-sm"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="cta-name" className="block text-sm font-medium text-neutral-300 mb-1.5">
                          Nom
                        </label>
                        <input
                          type="text"
                          id="cta-name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className={inputClasses}
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label htmlFor="cta-email" className="block text-sm font-medium text-neutral-300 mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          id="cta-email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className={inputClasses}
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cta-subject" className="block text-sm font-medium text-neutral-300 mb-1.5">
                        Sujet
                      </label>
                      <select
                        id="cta-subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="creation-site">Création de site internet</option>
                        <option value="refonte-site">Refonte de site existant</option>
                        <option value="application-web">Application web</option>
                        <option value="application-mobile">Application mobile</option>
                        <option value="seo">Référencement SEO</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="cta-message" className="block text-sm font-medium text-neutral-300 mb-1.5">
                        Message
                      </label>
                      <textarea
                        id="cta-message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className={cn(inputClasses, 'resize-none')}
                        placeholder="Décrivez brièvement votre projet..."
                      />
                    </div>

                    {/* Honeypot anti-spam */}
                    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                      <label htmlFor="cta-website">Website</label>
                      <input
                        type="text"
                        id="cta-website"
                        name="website"
                        value={formState.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {error && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <Button type="submit" size="md" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? (
                        'Envoi en cours...'
                      ) : (
                        <>
                          Envoyer le message
                          <Send size={16} />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
