import type { Metadata } from 'next'
import { AboutPage } from './AboutPage'

export const metadata: Metadata = {
  title: 'À propos — Evan Davison, développeur web freelance à Rennes',
  description:
    'Evan Davison, développeur web freelance basé près de Rennes. Parcours, compétences et valeurs. Création de sites internet et applications sur-mesure pour les entreprises en Ille-et-Vilaine.',
  alternates: {
    canonical: 'https://dvs-web.fr/a-propos',
  },
  openGraph: {
    title: 'À propos — Evan Davison, développeur web freelance à Rennes',
    description:
      'Evan Davison, développeur web freelance basé près de Rennes. Création de sites internet et applications sur-mesure en Ille-et-Vilaine.',
    url: 'https://dvs-web.fr/a-propos',
    type: 'website',
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Evan Davison',
  jobTitle: 'Développeur Web Freelance',
  url: 'https://dvs-web.fr',
  sameAs: [
    'https://github.com/evmusic',
    'https://www.linkedin.com/in/evan-davison-music/',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mordelles',
    postalCode: '35310',
    addressRegion: 'Bretagne',
    addressCountry: 'FR',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'DVS Web',
    url: 'https://dvs-web.fr',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://dvs-web.fr' },
    { '@type': 'ListItem', position: 2, name: 'À propos', item: 'https://dvs-web.fr/a-propos' },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutPage />
    </>
  )
}