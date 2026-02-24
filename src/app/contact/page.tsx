import type { Metadata } from 'next'
import { ContactPage } from './ContactPage'

export const metadata: Metadata = {
  title: 'Contact — Développeur web freelance Rennes',
  description:
    'Contactez Evan Davison pour votre projet de site internet ou application web à Rennes. Devis gratuit sous 24h, développeur freelance disponible en Ille-et-Vilaine.',
  openGraph: {
    title: 'Contact — Développeur web freelance Rennes',
    description:
      'Contactez Evan Davison pour votre projet de site internet ou application web à Rennes. Devis gratuit sous 24h.',
    url: 'https://dvs-web.fr/contact',
    type: 'website',
  },
}

export default function Page() {
  return <ContactPage />
}
