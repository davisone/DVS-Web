import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { metiers } from '@/data/metiers'

export const metadata: Metadata = {
  title: 'Site internet pour artisans et TPE — DVS Web',
  description:
    "Création de site internet pour artisans, commerçants et professions libérales en Bretagne. Plombier, électricien, coiffeur, restaurant… Un site professionnel adapté à votre métier. Devis gratuit.",
  alternates: {
    canonical: 'https://dvs-web.fr/site-internet-pour',
  },
  openGraph: {
    title: 'Site internet pour artisans et TPE — DVS Web',
    description:
      "Création de site internet pour artisans, commerçants et professions libérales en Bretagne et Grand Ouest.",
    url: 'https://dvs-web.fr/site-internet-pour',
    type: 'website',
  },
}

const breadcrumbJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://dvs-web.fr' },
    { '@type': 'ListItem', position: 2, name: 'Site internet pour', item: 'https://dvs-web.fr/site-internet-pour' },
  ],
})

// Regrouper les métiers par secteur
function groupBySecteur(liste: typeof metiers) {
  return liste.reduce<Record<string, typeof metiers>>((acc, metier) => {
    const secteur = metier.secteur
    if (!acc[secteur]) acc[secteur] = []
    acc[secteur].push(metier)
    return acc
  }, {})
}

export default function SiteInternetPourPage() {
  const grouped = groupBySecteur(metiers)
  const secteurs = Object.keys(grouped).sort()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-accent mb-4">
                <span className="text-sm font-medium uppercase tracking-wider">
                  Artisans · Commerçants · TPE
                </span>
              </div>
              <h1 className="heading-1 mb-6">
                Site internet pour artisans et professionnels
              </h1>
              <p className="text-body text-lg mb-8">
                Je crée des sites internet adaptés à chaque métier — avec les fonctionnalités
                dont vous avez vraiment besoin, pas plus, pas moins. Design professionnel,
                SEO local inclus, livré clé en main.
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

      {/* Métiers par secteur */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">Votre métier, votre site</h2>
              <p className="text-body max-w-2xl mx-auto">
                Chaque secteur a ses spécificités. Découvrez comment j&apos;adapte chaque site
                aux besoins concrets de votre activité.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-12">
            {secteurs.map((secteur) => (
              <ScrollReveal key={secteur}>
                <div>
                  <h2 className="heading-3 mb-6 pb-3 border-b border-neutral-800">
                    {secteur}
                  </h2>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {grouped[secteur].map((metier) => (
                      <Link
                        key={metier.slug}
                        href={`/site-internet-pour/${metier.slug}`}
                        className="card group flex flex-col gap-2 hover:border-accent/50 transition-colors"
                      >
                        <span className="text-white font-semibold group-hover:text-accent transition-colors">
                          {metier.nom}
                        </span>
                        <span className="text-neutral-400 text-sm line-clamp-2">
                          {metier.description}
                        </span>
                        <span className="text-accent text-sm flex items-center gap-1 mt-auto">
                          Voir la page
                          <ArrowRight size={14} />
                        </span>
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
                Votre métier ne figure pas dans la liste ?
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Je travaille avec tous types d&apos;indépendants et d&apos;entreprises.
                Décrivez-moi votre activité, je vous proposerai une solution adaptée.
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
