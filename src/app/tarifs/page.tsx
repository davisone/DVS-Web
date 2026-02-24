import type { Metadata } from 'next'
import { PricingPage } from './PricingPage'

export const metadata: Metadata = {
  title: 'Tarifs — Création de site internet à Rennes | Prix freelance',
  description:
    'Tarifs pour la création de sites internet, refonte, applications web et mobiles à Rennes. Développeur freelance, devis gratuit, paiement en plusieurs fois. FAQ incluse.',
  openGraph: {
    title: 'Tarifs — Création de site internet à Rennes | Prix freelance',
    description:
      'Tarifs pour la création de sites internet et applications à Rennes. Développeur freelance, devis gratuit.',
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
        text: 'Le prix dépend de plusieurs facteurs : le nombre de pages, les fonctionnalités souhaitées (formulaire, blog, e-commerce…), le niveau de personnalisation du design et les délais. Un site vitrine se situe généralement entre 600€ et 1 500€ selon la complexité. Pour des projets plus ambitieux (e-commerce, application), le budget peut être plus conséquent.',
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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PricingPage />
    </>
  )
}