import type { Metadata } from 'next'
import { RealisationsPage } from './RealisationsPage'

export const metadata: Metadata = {
  title: 'Réalisations — Portfolio de sites internet à Rennes',
  description:
    'Portfolio de sites internet et applications réalisés par Evan Davison, développeur web freelance à Rennes. Projets pour entrepreneurs et PME en Ille-et-Vilaine.',
  openGraph: {
    title: 'Réalisations — Portfolio de sites internet à Rennes',
    description:
      'Portfolio de sites internet et applications réalisés par Evan Davison, développeur web freelance à Rennes.',
    url: 'https://dvs-web.fr/realisations',
    type: 'website',
  },
}

export default function Page() {
  return <RealisationsPage />
}
