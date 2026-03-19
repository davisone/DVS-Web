import type { Metadata } from 'next'
import { ContactPage } from './ContactPage'

export const metadata: Metadata = {
  title: 'Contact — Développeur web freelance Rennes',
  description:
    'Contactez Evan Davison pour votre projet de site internet ou application web à Rennes. Devis gratuit sous 24h, développeur freelance disponible en Ille-et-Vilaine.',
  alternates: {
    canonical: 'https://dvs-web.fr/contact',
  },
  openGraph: {
    title: 'Contact — Développeur web freelance Rennes',
    description:
      'Contactez Evan Davison pour votre projet de site internet ou application web à Rennes. Devis gratuit sous 24h.',
    url: 'https://dvs-web.fr/contact',
    type: 'website',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://dvs-web.fr' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://dvs-web.fr/contact' },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContactPage />
    </>
  )
}
