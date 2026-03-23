import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { metiers, getMetierBySlug } from '@/data/metiers'
import { getVilleBySlug } from '@/data/villes-france'

function villeHasMetier(villeSlug: string, metierSlug: string): boolean {
  const ville = getVilleBySlug(villeSlug)
  return ville ? ville.metiersPresents.includes(metierSlug) : false
}

type Props = { params: Promise<{ metier: string }> }

export async function generateStaticParams() {
  return metiers.map((m) => ({ metier: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { metier: slug } = await params
  const metier = getMetierBySlug(slug)
  if (!metier) return {}
  const title = `Site internet pour ${metier.nom} — DVS Web`
  const description = `Création de site internet pour ${metier.nomPluriel} en Bretagne et grand Ouest. ${metier.description} Devis gratuit.`
  return {
    title,
    description,
    alternates: { canonical: `https://dvs-web.fr/site-internet-pour/${metier.slug}` },
    openGraph: {
      title,
      description,
      url: `https://dvs-web.fr/site-internet-pour/${metier.slug}`,
      type: 'website',
    },
  }
}

// Points fixes "Ce que je propose"
const propositions = [
  "Design sur-mesure adapté à votre secteur d'activité",
  'SEO local inclus : balises meta, données structurées, Google My Business',
  'Support après livraison et maintenance disponible',
]

export default async function SiteInternetPourMetierPage({ params }: Props) {
  const { metier: slug } = await params
  const metier = getMetierBySlug(slug)
  if (!metier) notFound()

  // Schéma Service
  const serviceJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Site internet pour ${metier.nom}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'DVS Web',
      url: 'https://dvs-web.fr',
    },
    description: metier.description,
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Bretagne' },
      { '@type': 'AdministrativeArea', name: 'Grand Ouest' },
      { '@type': 'Country', name: 'France' },
    ],
  })

  // Fil d'Ariane
  const breadcrumbJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://dvs-web.fr' },
      { '@type': 'ListItem', position: 2, name: 'Site internet pour', item: 'https://dvs-web.fr/site-internet-pour' },
      {
        '@type': 'ListItem',
        position: 3,
        name: metier.nom,
        item: `https://dvs-web.fr/site-internet-pour/${metier.slug}`,
      },
    ],
  })

  // FAQ spécifique au métier
  const faqItems = [
    {
      question: `Combien coûte un site internet pour un ${metier.nom.toLowerCase()} ?`,
      answer: `Un site internet professionnel pour un ${metier.nom.toLowerCase()} démarre à partir de ~600€. Le tarif dépend de vos besoins spécifiques. Je fournis un devis gratuit après un premier échange.`,
    },
    {
      question: `Quelles pages doit avoir le site d'un ${metier.nom.toLowerCase()} ?`,
      answer: `Un site de ${metier.nom.toLowerCase()} efficace inclut généralement : une page d'accueil claire, une présentation de vos services, une galerie, une page contact avec formulaire et votre localisation.`,
    },
    {
      question: `Mon site de ${metier.nom.toLowerCase()} sera-t-il visible sur Google ?`,
      answer: "L'optimisation SEO locale est incluse dans tous mes projets : structure technique, balises meta, données structurées, Google My Business et performances. Votre site sera optimisé pour apparaître sur les recherches locales.",
    },
    {
      question: `Quel délai pour créer un site internet de ${metier.nom.toLowerCase()} ?`,
      answer: 'Un site vitrine est livré en 2 à 4 semaines. Un site avec fonctionnalités avancées (réservation, boutique) demande 4 à 8 semaines. Le planning est défini dans le devis.',
    },
  ]

  const faqJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  })

  return (
    <>
      {/* Données structurées JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serviceJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-accent mb-4">
                <span className="text-sm font-medium uppercase tracking-wider">
                  {metier.secteur}
                </span>
              </div>
              <h1 className="heading-1 mb-6">
                Site internet pour {metier.nom} — DVS Web
              </h1>
              <p className="text-body text-lg mb-8">
                {metier.description}
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

      {/* Ce dont votre site a besoin */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl">
              <h2 className="heading-2 mb-4">
                Ce dont votre site a besoin
              </h2>
              <p className="text-body mb-8">
                Un site efficace pour un {metier.nom.toLowerCase()} doit répondre aux attentes concrètes de vos clients et les convaincre de vous contacter.
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

      {/* Ce que je propose */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="heading-2 mb-6">
                Ce que je propose
              </h2>
              <p className="text-body mb-8">
                Un site professionnel livré clé en main, pensé pour votre activité de {metier.nom.toLowerCase()} et optimisé pour attirer des clients dès la mise en ligne.
              </p>
              <ul className="space-y-4">
                {propositions.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check className="text-accent flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-neutral-300">{point}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="card">
                <h3 className="text-white font-semibold text-xl mb-4">
                  Pourquoi un freelance plutôt qu&apos;une agence ?
                </h3>
                <div className="space-y-4">
                  {[
                    { titre: 'Contact direct', desc: "Un seul interlocuteur du début à la fin. Pas d'agence, pas d'intermédiaire." },
                    { titre: 'Tarifs accessibles', desc: "Sans frais de structure, des tarifs adaptés aux indépendants et TPE/PME." },
                    { titre: 'Réactivité', desc: 'Réponse sous 24h, suivi régulier et respect des délais convenus.' },
                  ].map((item) => (
                    <div key={item.titre} className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Check className="text-accent" size={18} />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm mb-1">{item.titre}</p>
                        <p className="text-neutral-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-2 mb-10 text-center">
                Questions fréquentes
              </h2>
              <div className="space-y-8">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-neutral-800 pb-8 last:border-0 last:pb-0">
                    <h3 className="heading-3 mb-3">{item.question}</h3>
                    <p className="text-body">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Maillage villes */}
      {metier.villesPrincipales.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <ScrollReveal>
              <h2 className="heading-3 mb-4">
                Secteurs d&apos;intervention
              </h2>
              <p className="text-body mb-6">
                Je crée des sites internet pour les {metier.nomPluriel.toLowerCase()} dans toute la région — Bretagne, Grand Ouest et au-delà.
              </p>
              <div className="flex flex-wrap gap-3">
                {metier.villesPrincipales.map((villeSlug) => {
                  const ville = getVilleBySlug(villeSlug)
                  if (!ville) return null
                  const href = villeHasMetier(villeSlug, metier.slug)
                    ? `/creation-site-internet/${villeSlug}/${metier.slug}`
                    : `/creation-site-internet/${villeSlug}`
                  return (
                    <a
                      key={villeSlug}
                      href={href}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-neutral-700 text-neutral-300 text-sm hover:border-accent hover:text-accent transition-colors"
                    >
                      {ville.nom}
                    </a>
                  )
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="heading-2 mb-4">
                Prêt à lancer votre site de {metier.nom.toLowerCase()} ?
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Premier échange gratuit et sans engagement. Décrivez-moi votre projet et je vous réponds sous 24h.
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
