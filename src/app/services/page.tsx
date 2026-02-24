import type { Metadata } from 'next'
import { ServicesPage } from './ServicesPage'

export const metadata: Metadata = {
  title: 'Services — Création de sites internet et applications à Rennes',
  description:
    'Création de sites internet, sites vitrines, e-commerce, applications web et mobiles à Rennes. Développeur freelance pour entrepreneurs et PME en Ille-et-Vilaine. Refonte, SEO et maintenance.',
  openGraph: {
    title: 'Services — Création de sites internet et applications à Rennes',
    description:
      'Création de sites internet, applications web et mobiles à Rennes. Développeur freelance pour entrepreneurs et PME en Ille-et-Vilaine.',
    url: 'https://dvs-web.fr/services',
    type: 'website',
  },
}

export default function Page() {
  return <ServicesPage />
}
