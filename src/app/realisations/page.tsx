import type { Metadata } from 'next'
import { RealisationsPage } from './RealisationsPage'

export const metadata: Metadata = {
  title: 'Réalisations — Portfolio de sites internet à Rennes',
  description:
    'Portfolio de sites internet et applications réalisés par Evan Davison, développeur web freelance à Rennes. Projets pour entrepreneurs et PME en Ille-et-Vilaine.',
  alternates: {
    canonical: 'https://dvs-web.fr/realisations',
  },
  openGraph: {
    title: 'Réalisations — Portfolio de sites internet à Rennes',
    description:
      'Portfolio de sites internet et applications réalisés par Evan Davison, développeur web freelance à Rennes.',
    url: 'https://dvs-web.fr/realisations',
    type: 'website',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://dvs-web.fr' },
    { '@type': 'ListItem', position: 2, name: 'Réalisations', item: 'https://dvs-web.fr/realisations' },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <RealisationsPage />
    </>
  )
}
