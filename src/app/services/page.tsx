import type { Metadata } from 'next'
import { ServicesPage } from './ServicesPage'

export const metadata: Metadata = {
  title: 'Services — Création de sites internet et applications à Rennes',
  description:
    'Création de sites internet, sites vitrines, e-commerce, applications web et mobiles à Rennes. Développeur freelance pour entrepreneurs et PME en Ille-et-Vilaine. Refonte, SEO et maintenance.',
  alternates: {
    canonical: 'https://dvs-web.fr/services',
  },
  openGraph: {
    title: 'Services — Création de sites internet et applications à Rennes',
    description:
      'Création de sites internet, applications web et mobiles à Rennes. Développeur freelance pour entrepreneurs et PME en Ille-et-Vilaine.',
    url: 'https://dvs-web.fr/services',
    type: 'website',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quels types de sites internet créez-vous ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Je crée des sites vitrines, des boutiques e-commerce, des applications web sur-mesure et des applications mobiles iOS/Android. Chaque projet est développé sur-mesure selon vos besoins et votre budget.' },
    },
    {
      '@type': 'Question',
      name: "Proposez-vous la refonte de sites existants ?",
      acceptedAnswer: { '@type': 'Answer', text: "Oui. La refonte est l'un de mes services phares. J'analyse votre site actuel, ses performances et son SEO, puis je propose une refonte adaptée à vos objectifs actuels." },
    },
    {
      '@type': 'Question',
      name: "Gérez-vous l'hébergement et le nom de domaine ?",
      acceptedAnswer: { '@type': 'Answer', text: "Oui, je m'occupe de tout : choix de l'hébergement, configuration, nom de domaine, certificat SSL. L'hébergement première année est inclus pour les sites vitrines." },
    },
    {
      '@type': 'Question',
      name: 'Mes sites sont-ils optimisés pour le SEO ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui, le SEO de base est inclus dans tous mes projets : structure sémantique, balises optimisées, performances, données structurées Schema.org et sitemap XML.' },
    },
    {
      '@type': 'Question',
      name: 'Proposez-vous un suivi après la mise en ligne ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui, chaque livraison inclut une formation à la prise en main et un support après livraison. Je reste disponible pour les évolutions et la maintenance.' },
    },
    {
      '@type': 'Question',
      name: 'Travaillez-vous uniquement avec des clients à Rennes ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Je travaille avec des clients partout en Bretagne et au-delà. La plupart des échanges se font en visio. Je suis basé près de Rennes mais interviens dans toute la région.' },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://dvs-web.fr' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://dvs-web.fr/services' },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServicesPage />
    </>
  )
}
