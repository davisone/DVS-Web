import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { villesFrance } from '@/data/villes-france'

export const metadata: Metadata = {
  title: 'Création de site internet en Bretagne et Grand Ouest — DVS Web',
  description:
    "Création de sites internet sur-mesure pour les professionnels de Bretagne et du Grand Ouest. Développeur web freelance basé à Rennes, j'interviens dans toutes les villes de la région. Devis gratuit.",
  alternates: {
    canonical: 'https://dvs-web.fr/creation-site-internet',
  },
  openGraph: {
    title: 'Création de site internet en Bretagne et Grand Ouest — DVS Web',
    description:
      "Sites vitrines, e-commerce et applications web sur-mesure pour les professionnels de Bretagne et du Grand Ouest.",
    url: 'https://dvs-web.fr/creation-site-internet',
    type: 'website',
  },
}

const breadcrumbJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://dvs-web.fr' },
    { '@type': 'ListItem', position: 2, name: 'Création site internet', item: 'https://dvs-web.fr/creation-site-internet' },
  ],
})

// Regrouper les villes par région
function groupByRegion(villes: typeof villesFrance) {
  return villes.reduce<Record<string, typeof villesFrance>>((acc, ville) => {
    const region = ville.region
    if (!acc[region]) acc[region] = []
    acc[region].push(ville)
    return acc
  }, {})
}

export default function CreationSiteInternetPage() {
  const grouped = groupByRegion(villesFrance)
  const regions = Object.keys(grouped).sort()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-accent mb-4">
                <MapPin size={20} />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Bretagne & Grand Ouest
                </span>
              </div>
              <h1 className="heading-1 mb-6">
                Création de site internet en Bretagne et Grand Ouest
              </h1>
              <p className="text-body text-lg mb-8">
                Développeur web freelance basé à Mordelles (35), j&apos;accompagne les entrepreneurs,
                artisans, TPE et PME de toute la région dans la création de leur site internet.
                Sites vitrines, boutiques en ligne et applications web sur-mesure, livrés clé en main.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/contact" size="lg">
                  Demander un devis gratuit
                  <ArrowRight size={20} />
                </Button>
                <Button href="/realisations" variant="secondary" size="lg">
                  Voir mes réalisations
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Villes par région */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">Ma zone d&apos;intervention</h2>
              <p className="text-body max-w-2xl mx-auto">
                Je travaille à distance ou en présentiel avec des clients dans toute la région.
                Retrouvez ci-dessous toutes les villes où j&apos;interviens.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            {regions.map((region) => (
              <ScrollReveal key={region}>
                <div>
                  <h2 className="heading-3 mb-6 pb-3 border-b border-neutral-800">
                    {region}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {grouped[region].map((ville) => (
                      <Link
                        key={ville.slug}
                        href={`/creation-site-internet/${ville.slug}`}
                        className="flex items-center gap-2 px-4 py-3 rounded-lg border border-neutral-800 text-neutral-300 text-sm hover:border-accent hover:text-accent transition-colors group"
                      >
                        <MapPin size={14} className="flex-shrink-0 group-hover:text-accent" />
                        <span>{ville.nom}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="heading-2 mb-4">
                Votre ville ne figure pas dans la liste ?
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Je travaille principalement en visio et peux intervenir partout en France.
                Contactez-moi pour en discuter.
              </p>
              <Button href="/contact" size="lg">
                Me contacter
                <ArrowRight size={20} />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
