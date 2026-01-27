import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Développeur Web Freelance Rennes & Ille-et-Vilaine | DVS Web',
    template: '%s | DVS Web',
  },
  description:
    'Développeur web freelance en Ille-et-Vilaine (35). Création de sites internet, applications web et mobiles sur-mesure à Rennes, Mordelles, Bruz et alentours. Devis gratuit.',
  keywords: [
    'développeur web Rennes',
    'développeur web Ille-et-Vilaine',
    'freelance Rennes',
    'création site internet Rennes',
    'création site web 35',
    'développeur freelance Bretagne',
    'application web Rennes',
    'application mobile Rennes',
    'agence web Rennes',
    'site vitrine Rennes',
    'refonte site internet',
    'SEO Rennes',
  ],
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
      'Développeur web freelance en Ille-et-Vilaine. Création de sites internet et applications sur-mesure à Rennes et alentours.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Développeur Web Freelance Rennes | DVS Web',
    description:
      'Développeur web freelance en Ille-et-Vilaine. Création de sites internet et applications sur-mesure à Rennes et alentours.',
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
  description: 'Développeur web freelance spécialisé dans la création de sites internet et applications sur-mesure en Ille-et-Vilaine.',
  url: 'https://dvs-web.fr',
  email: 'contact@dvs-web.fr',
  telephone: '+33651019506',
  founder: {
    '@type': 'Person',
    name: 'Evan Davison',
    jobTitle: 'Développeur Web Freelance',
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
  ],
  priceRange: '€€',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
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
      </head>
      <body className="min-h-screen bg-primary text-neutral-200 antialiased">
        {children}
      </body>
    </html>
  )
}
