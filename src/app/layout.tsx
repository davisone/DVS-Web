import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://dvs-web.fr'),
  title: {
    default: 'Développeur Web Freelance Rennes & Ille-et-Vilaine | DVS Web',
    template: '%s | DVS Web',
  },
  description:
    'Evan Davison, développeur web freelance à Rennes. Création de sites internet, applications web et mobiles sur-mesure pour entrepreneurs, TPE et PME en Ille-et-Vilaine. Devis gratuit.',
  authors: [{ name: 'Evan Davison' }],
  creator: 'DVS Web',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/images/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://dvs-web.fr',
    siteName: 'DVS Web',
    title: 'Développeur Web Freelance Rennes & Ille-et-Vilaine | DVS Web',
    description:
      'Evan Davison, développeur web freelance à Rennes. Création de sites internet et applications sur-mesure pour entrepreneurs et PME en Ille-et-Vilaine.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Développeur Web Freelance Rennes | DVS Web',
    description:
      'Evan Davison, développeur web freelance à Rennes. Création de sites internet et applications sur-mesure pour entrepreneurs et PME en Ille-et-Vilaine.',
  },
  alternates: {
    canonical: 'https://dvs-web.fr',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://dvs-web.fr',
  name: 'DVS Web',
  description: 'Evan Davison, développeur web freelance à Rennes. Création de sites internet, applications web et mobiles sur-mesure pour entrepreneurs, TPE et PME en Ille-et-Vilaine.',
  url: 'https://dvs-web.fr',
  email: 'contact@dvs-web.fr',
  telephone: '+33651019506',
  sameAs: [
    'https://github.com/evmusic',
    'https://www.linkedin.com/in/evan-davison-music/',
  ],
  founder: {
    '@type': 'Person',
    name: 'Evan Davison',
    jobTitle: 'Développeur Web Freelance',
    sameAs: [
      'https://github.com/evmusic',
      'https://www.linkedin.com/in/evan-davison-music/',
    ],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '22 Le Domaine',
    addressLocality: 'Mordelles',
    postalCode: '35310',
    addressRegion: 'Bretagne',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 48.0714,
    longitude: -1.8436,
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Rennes',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Ille-et-Vilaine',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Bretagne',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Grand Ouest',
    },
  ],
  priceRange: '€€',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '5',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Marie Lebreton' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: "Evan a créé notre site vitrine en 3 semaines. Résultat impeccable, moderne et rapide. Depuis la mise en ligne, on reçoit des demandes régulières via le formulaire de contact. Je recommande sans hésiter.",
      datePublished: '2024-10-01',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Thomas Guérin' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: "J'avais besoin d'un site simple et efficace pour mon activité. Evan a été à l'écoute, les délais ont été respectés et le site est très bien référencé sur Google. Très professionnel.",
      datePublished: '2024-11-01',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Sophie Morvan' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Très professionnel, réactif et de bon conseil. Mon site reflète parfaitement mon activité et mes valeurs. La formation à la prise en main était claire et complète. Je recommande.',
      datePublished: '2024-12-01',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Julien Mahé' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: "La refonte de notre site a transformé notre image en ligne. Nos prospects arrivent désormais mieux informés et nos demandes de devis ont clairement augmenté depuis la mise en ligne.",
      datePublished: '2025-01-01',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Claire Duval' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: "Notre boutique en ligne fonctionne parfaitement depuis l'ouverture. Evan a géré toute la partie technique avec sérieux. L'accompagnement jusqu'à la mise en ligne était rassurant et efficace.",
      datePublished: '2025-02-01',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services de développement web',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Création de sites internet',
          description: 'Sites vitrines, e-commerce et sur-mesure',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Développement d\'applications web',
          description: 'Applications web sur-mesure, SaaS, tableaux de bord',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Développement d\'applications mobiles',
          description: 'Applications iOS et Android avec Flutter',
        },
      },
    ],
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://dvs-web.fr/#website',
  name: 'DVS Web',
  url: 'https://dvs-web.fr',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://dvs-web.fr/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://dvs-web.fr/#evan-davison',
  name: 'Evan Davison',
  jobTitle: 'Développeur Web Freelance',
  url: 'https://dvs-web.fr',
  email: 'contact@dvs-web.fr',
  telephone: '+33651019506',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mordelles',
    postalCode: '35310',
    addressRegion: 'Bretagne',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://github.com/evmusic',
    'https://www.linkedin.com/in/evan-davison-music/',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-primary text-neutral-200 antialiased">
        {children}
      </body>
    </html>
  )
}
