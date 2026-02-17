'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Send, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContactFormProps {
  idPrefix?: string
  submitLabel?: string
  compact?: boolean
}

export function ContactForm({ idPrefix = 'contact', submitLabel = 'Envoyer le message', compact = false }: ContactFormProps) {
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

  if (isSubmitted) {
    return (
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
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={cn('grid gap-4', compact ? 'sm:grid-cols-2' : 'md:grid-cols-2')}>
        <div>
          <label htmlFor={`${idPrefix}-name`} className="block text-sm font-medium text-neutral-300 mb-1.5">
            Nom
          </label>
          <input
            type="text"
            id={`${idPrefix}-name`}
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            className={inputClasses}
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className="block text-sm font-medium text-neutral-300 mb-1.5">
            Email
          </label>
          <input
            type="email"
            id={`${idPrefix}-email`}
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
        <label htmlFor={`${idPrefix}-subject`} className="block text-sm font-medium text-neutral-300 mb-1.5">
          Sujet
        </label>
        <select
          id={`${idPrefix}-subject`}
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
        <label htmlFor={`${idPrefix}-message`} className="block text-sm font-medium text-neutral-300 mb-1.5">
          Message
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          rows={compact ? 4 : 6}
          className={cn(inputClasses, 'resize-none')}
          placeholder="Décrivez brièvement votre projet..."
        />
      </div>

      {/* Honeypot anti-spam */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input
          type="text"
          id={`${idPrefix}-website`}
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
            {submitLabel}
            <Send size={16} />
          </>
        )}
      </Button>
    </form>
  )
}
