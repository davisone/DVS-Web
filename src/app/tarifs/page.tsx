import type { Metadata } from 'next'
import { PricingPage } from './PricingPage'

export const metadata: Metadata = {
  title: 'Offres & Devis — Création de site internet à Rennes | Freelance',
  description:
    'Découvrez mes offres pour la création de sites internet, refonte, applications web et mobiles à Rennes. Développeur freelance, devis gratuit et personnalisé.',
  alternates: {
    canonical: 'https://dvs-web.fr/tarifs',
  },
  openGraph: {
    title: 'Offres & Devis — Création de site internet à Rennes | Freelance',
    description:
      'Découvrez mes offres pour la création de sites internet et applications à Rennes. Développeur freelance, devis gratuit.',
    url: 'https://dvs-web.fr/tarifs',
    type: 'website',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Combien coûte un site internet ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le prix dépend de plusieurs facteurs : le nombre de pages, les fonctionnalités souhaitées (formulaire, blog, e-commerce…), le niveau de personnalisation du design et les délais. Chaque projet étant unique, le meilleur moyen d\'avoir un chiffre précis est de demander un devis gratuit et personnalisé.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment se passe le paiement ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paiement en 1 fois, en 2, 3 ou 4 fois sans frais, ou en mensualités pour lisser votre investissement. Un acompte de 30% est demandé au démarrage du projet.',
      },
    },
    {
      '@type': 'Question',
      name: 'Que comprend le prix d\'un site internet ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les tarifs incluent la conception, le développement, l\'intégration du contenu, l\'optimisation SEO de base, la mise en ligne et une formation à la prise en main. L\'hébergement première année est inclus pour les sites vitrine.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps dure la création d\'un site internet ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un site vitrine essentiel est livré en 2 à 3 semaines. Un site plus complet demande 4 à 8 semaines. Pour les applications web ou mobiles, comptez 2 à 4 mois selon la complexité.',
      },
    },
    {
      '@type': 'Question',
      name: 'Et si le projet évolue en cours de route ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Si de nouveaux besoins apparaissent pendant le développement, un avenant au devis initial est proposé. Tout est validé ensemble avant d\'avancer, pas de surprise.',
      },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://dvs-web.fr' },
    { '@type': 'ListItem', position: 2, name: 'Tarifs', item: 'https://dvs-web.fr/tarifs' },
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
      <PricingPage />
    </>
  )
}