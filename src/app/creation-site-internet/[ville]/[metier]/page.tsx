import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MapPin, Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { villesFrance, getVilleBySlug } from '@/data/villes-france'
import { getMetierBySlug } from '@/data/metiers'

type Props = {
  params: Promise<{ ville: string; metier: string }>
}

export async function generateStaticParams() {
  return villesFrance.flatMap((v) =>
    v.metiersPresents.map((metierSlug) => ({ ville: v.slug, metier: metierSlug }))
  )
}

function villeHasMetier(villeSlug: string, metierSlug: string): boolean {
  const v = getVilleBySlug(villeSlug)
  return v ? v.metiersPresents.includes(metierSlug) : false
}

const inclus = [
  'Design sur-mesure adapté à votre secteur',
  'Optimisation SEO dès la conception',
  'Site responsive (mobile, tablette, desktop)',
  'Hébergement et nom de domaine configurés',
  'Formation à la prise en main',
  'Support après livraison',
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville: villeSlug, metier: metierSlug } = await params
  const ville = getVilleBySlug(villeSlug)
  const metier = getMetierBySlug(metierSlug)
  if (!ville || !metier) return {}

  const title = `Site internet pour ${metier.nom} à ${ville.nom} — DVS Web`
  const description = `Création de site internet pour ${metier.nomPluriel.toLowerCase()} à ${ville.nom} (${ville.departement}). ${metier.description} Devis gratuit.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://dvs-web.fr/creation-site-internet/${ville.slug}/${metier.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://dvs-web.fr/creation-site-internet/${ville.slug}/${metier.slug}`,
      type: 'website',
    },
  }
}

export default async function CreationSiteInternetVilleMetierPage({ params }: Props) {
  const { ville: villeSlug, metier: metierSlug } = await params
  const ville = getVilleBySlug(villeSlug)
  const metier = getMetierBySlug(metierSlug)

  if (!ville || !metier || !ville.metiersPresents.includes(metier.slug)) notFound()

  // JSON-LD: données statiques contrôlées, sans entrée utilisateur
  const serviceJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Site internet pour ${metier.nom} à ${ville.nom}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'DVS Web',
      url: 'https://dvs-web.fr',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Mordelles',
        postalCode: '35310',
        addressRegion: 'Ille-et-Vilaine',
        addressCountry: 'FR',
      },
    },
    areaServed: { '@type': 'City', name: ville.nom },
    description: `Création de site internet pour ${metier.nomPluriel.toLowerCase()} à ${ville.nom} (${ville.departement}). ${metier.description}`,
  })

  const breadcrumbJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://dvs-web.fr' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Création site internet',
        item: 'https://dvs-web.fr/creation-site-internet',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Création site internet ${ville.nom}`,
        item: `https://dvs-web.fr/creation-site-internet/${ville.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `${metier.nom} à ${ville.nom}`,
        item: `https://dvs-web.fr/creation-site-internet/${ville.slug}/${metier.slug}`,
      },
    ],
  })

  const faqJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Combien coûte un site internet pour un ${metier.nom.toLowerCase()} à ${ville.nom} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Un site internet professionnel pour un ${metier.nom.toLowerCase()} à ${ville.nom} démarre à partir de ~600€. Le tarif dépend de vos besoins spécifiques. Je fournis un devis gratuit après un premier échange.`,
        },
      },
      {
        '@type': 'Question',
        name: `Vous intervenez à ${ville.nom} pour les ${metier.nomPluriel.toLowerCase()} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Oui, j'accompagne les ${metier.nomPluriel.toLowerCase()} à ${ville.nom} (${ville.departement}). Je travaille principalement en visio pour plus d'efficacité${ville.distanceRennes ? `, et je peux me déplacer si nécessaire (${ville.distanceRennes} depuis ma base en Ille-et-Vilaine)` : ' partout en Bretagne'}.`,
        },
      },
      {
        '@type': 'Question',
        name: `En combien de temps mon site de ${metier.nom.toLowerCase()} à ${ville.nom} sera-t-il en ligne ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Un site vitrine pour un ${metier.nom.toLowerCase()} est livré en 2 à 4 semaines. Un site avec des fonctionnalités avancées demande 4 à 8 semaines. Le planning est défini clairement dans le devis avant de démarrer.`,
        },
      },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-accent mb-4">
                <MapPin size={20} />
                <span className="text-sm font-medium uppercase tracking-wider">
                  {ville.nom} — {metier.secteur}
                </span>
              </div>
              <h1 className="heading-1 mb-6">
                Site internet pour {metier.nom} à {ville.nom}
              </h1>
              <p className="text-body text-lg mb-8">
                {metier.description}{' '}
                {ville.description
                  ? `À ${ville.nom}, ${ville.description.charAt(0).toLowerCase()}${ville.description.slice(1)}`
                  : `Je vous accompagne dans votre projet de site internet à ${ville.nom} (${ville.departement}).`}
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

      {/* Contexte local */}
      {ville.secteurEco && (
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container-custom">
            <ScrollReveal>
              <div className="max-w-3xl">
                <h2 className="heading-3 mb-4">
                  Le marché des {metier.nomPluriel.toLowerCase()} à {ville.nom}
                </h2>
                <p className="text-body mb-4">
                  À {ville.nom}, l&apos;économie locale est portée par : {ville.secteurEco}.
                  {ville.entreprisesType && ` Parmi mes clients, on retrouve des ${ville.entreprisesType}.`}
                </p>
                <p className="text-body">
                  Dans cet environnement, un {metier.nom.toLowerCase()} a besoin d&apos;un site internet visible
                  et professionnel pour se démarquer de la concurrence et attirer de nouveaux clients localement.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Besoins spécifiques */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h2 className="heading-2 mb-4">Ce dont votre site a besoin</h2>
              <p className="text-body mb-8">
                Un site efficace pour un {metier.nom.toLowerCase()} à {ville.nom} doit répondre aux attentes
                concrètes de vos clients et les convaincre de vous contacter.
              </p>
              <ul className="space-y-4">
                {metier.besoinsSpecifiques.map((besoin) => (
                  <li key={besoin} className="flex items-start gap-3">
                    <Check className="text-accent flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-neutral-300">{besoin}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <h2 className="heading-2 mb-4">Ce qui est inclus dans chaque projet</h2>
            <p className="text-body mb-8 max-w-2xl">
              Pas de mauvaises surprises. Chaque site est livré avec tout ce qu&apos;il faut pour être en ligne et
              visible sur Google dès le départ.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {inclus.map((item, index) => (
              <ScrollReveal key={item} delay={index * 0.05}>
                <div className="flex items-start gap-3 p-4 rounded-lg border border-neutral-800">
                  <Check className="text-accent flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-neutral-300 text-sm">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-2 mb-10 text-center">Questions fréquentes</h2>
              <div className="space-y-8">
                {[
                  {
                    q: `Combien coûte un site internet pour un ${metier.nom.toLowerCase()} à ${ville.nom} ?`,
                    r: `Un site internet professionnel pour un ${metier.nom.toLowerCase()} à ${ville.nom} démarre à partir de ~600€. Le tarif dépend de vos besoins spécifiques. Je fournis un devis gratuit après un premier échange.`,
                  },
                  {
                    q: `Vous intervenez à ${ville.nom} pour les ${metier.nomPluriel.toLowerCase()} ?`,
                    r: `Oui, j'accompagne les ${metier.nomPluriel.toLowerCase()} à ${ville.nom} (${ville.departement}). Je travaille principalement en visio pour plus d'efficacité${ville.distanceRennes ? `, et je peux me déplacer si nécessaire (${ville.distanceRennes} depuis ma base en Ille-et-Vilaine)` : ' partout en Bretagne'}.`,
                  },
                  {
                    q: `En combien de temps mon site de ${metier.nom.toLowerCase()} à ${ville.nom} sera-t-il en ligne ?`,
                    r: `Un site vitrine pour un ${metier.nom.toLowerCase()} est livré en 2 à 4 semaines. Un site avec des fonctionnalités avancées demande 4 à 8 semaines. Le planning est défini clairement dans le devis avant de démarrer.`,
                  },
                ].map((item, index) => (
                  <div key={index} className="border-b border-neutral-800 pb-8 last:border-0 last:pb-0">
                    <h3 className="heading-3 mb-3">{item.q}</h3>
                    <p className="text-body">{item.r}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Maillage métier — autres villes où ce métier est présent */}
      {metier.villesPrincipales.filter((vs) => vs !== ville.slug).length > 0 && (
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container-custom">
            <ScrollReveal>
              <h2 className="heading-3 mb-4">
                Je crée des sites pour les {metier.nomPluriel.toLowerCase()} dans d&apos;autres villes
              </h2>
              <p className="text-body mb-6">
                Vous connaissez un {metier.nom.toLowerCase()} dans une autre ville ? Je l&apos;accompagne aussi.
              </p>
              <div className="flex flex-wrap gap-3">
                {metier.villesPrincipales
                  .filter((vs) => vs !== ville.slug)
                  .map((autreVilleSlug) => {
                    const autreVille = getVilleBySlug(autreVilleSlug)
                    if (!autreVille) return null
                    const href = villeHasMetier(autreVilleSlug, metier.slug)
                      ? `/creation-site-internet/${autreVilleSlug}/${metier.slug}`
                      : `/creation-site-internet/${autreVilleSlug}`
                    return (
                      <a
                        key={autreVilleSlug}
                        href={href}
                        className="inline-flex items-center px-4 py-2 rounded-full border border-neutral-700 text-neutral-300 text-sm hover:border-accent hover:text-accent transition-colors"
                      >
                        {metier.nom} à {autreVille.nom}
                      </a>
                    )
                  })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Maillage ville — autres métiers de cette ville */}
      {ville.metiersPresents.filter((ms) => ms !== metier.slug).length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <ScrollReveal>
              <h2 className="heading-3 mb-4">
                Autres activités que j&apos;accompagne à {ville.nom}
              </h2>
              <p className="text-body mb-6">
                Artisans, commerçants, professions libérales — je crée des sites adaptés à chaque activité à{' '}
                {ville.nom}.
              </p>
              <div className="flex flex-wrap gap-3">
                {ville.metiersPresents
                  .filter((ms) => ms !== metier.slug)
                  .map((autreMetierSlug) => {
                    const autreMetier = getMetierBySlug(autreMetierSlug)
                    if (!autreMetier) return null
                    return (
                      <a
                        key={autreMetierSlug}
                        href={`/creation-site-internet/${ville.slug}/${autreMetierSlug}`}
                        className="inline-flex items-center px-4 py-2 rounded-full border border-neutral-700 text-neutral-300 text-sm hover:border-accent hover:text-accent transition-colors"
                      >
                        {autreMetier.nom}
                      </a>
                    )
                  })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="heading-2 mb-4">
                Un projet de site internet pour votre activité à {ville.nom} ?
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Premier échange gratuit et sans engagement. Je vous réponds sous 24h.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg">
                  Demander un devis gratuit
                  <ArrowRight size={20} />
                </Button>
                <Button href="mailto:contact@dvs-web.fr" variant="ghost" size="lg">
                  contact@dvs-web.fr
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
