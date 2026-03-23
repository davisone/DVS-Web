import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, MapPin, Check, Clock, Euro, MessageSquare, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { villesFrance, getVilleBySlug } from '@/data/villes-france'
import { getMetierBySlug } from '@/data/metiers'
import { getAllPosts } from '@/lib/blog'

type Props = {
  params: Promise<{ ville: string }>
}

export async function generateStaticParams() {
  return villesFrance.map((v) => ({ ville: v.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville: slug } = await params
  const ville = getVilleBySlug(slug)
  if (!ville) return {}

  const title = `Création site internet ${ville.nom} — Développeur web freelance`
  const description = ville.secteurEco
    ? `Création de site internet à ${ville.nom} (${ville.departement}). Evan Davison accompagne les professionnels du secteur ${ville.secteurEco}. Devis gratuit.`
    : `Création de site internet à ${ville.nom} (${ville.departement}). Sites vitrines, e-commerce et applications web sur-mesure. Devis gratuit.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://dvs-web.fr/creation-site-internet/${ville.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://dvs-web.fr/creation-site-internet/${ville.slug}`,
      type: 'website',
    },
  }
}

const services = [
  {
    titre: 'Site vitrine',
    description: 'Présentez votre activité avec un site moderne, rapide et optimisé pour Google.',
    prix: 'À partir de ~600€',
  },
  {
    titre: 'Site e-commerce',
    description: 'Vendez en ligne avec une boutique performante, sécurisée et facile à gérer.',
    prix: 'Sur devis',
  },
  {
    titre: 'Application web',
    description: 'Outil métier, tableau de bord, plateforme sur-mesure adaptée à votre activité.',
    prix: 'Sur devis',
  },
  {
    titre: 'Application mobile',
    description: 'Application iOS et Android pour toucher vos clients sur smartphone.',
    prix: 'Sur devis',
  },
]

const avantages = [
  {
    icon: MapPin,
    titre: 'Proximité régionale',
    description: "Basé en Bretagne, je travaille avec des entreprises de toute la région.",
  },
  {
    icon: MessageSquare,
    titre: 'Contact direct',
    description: "Un seul interlocuteur du début à la fin. Pas d'agence, pas d'intermédiaire.",
  },
  {
    icon: Euro,
    titre: 'Tarifs freelance',
    description: "Sans les frais de structure d'une agence, des tarifs accessibles pour les TPE/PME.",
  },
  {
    icon: Clock,
    titre: 'Réactivité',
    description: 'Réponse sous 24h, suivi régulier et respect des délais convenus.',
  },
]

const inclus = [
  'Design sur-mesure adapté à votre secteur',
  'Optimisation SEO dès la conception',
  'Site responsive (mobile, tablette, desktop)',
  'Hébergement et nom de domaine configurés',
  'Formation à la prise en main',
  'Support après livraison',
]

// Articles liés affichés en bas de chaque page ville
const ARTICLES_LIES = [
  { slug: 'pourquoi-artisan-besoin-site-internet', titre: 'Pourquoi un artisan a besoin d\'un site internet en 2025' },
  { slug: 'developpeur-web-freelance-vs-agence', titre: 'Freelance vs agence web : comment choisir ?' },
  { slug: 'seo-local-artisan-rennes', titre: 'SEO local : comment être trouvé par vos clients près de chez vous' },
]

export default async function CreationSiteInternetVillePage({ params }: Props) {
  const { ville: slug } = await params
  const ville = getVilleBySlug(slug)
  if (!ville) notFound()

  const serviceJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Création site internet ${ville.nom}`,
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
    description: `Création de site internet sur-mesure à ${ville.nom}. Sites vitrines, e-commerce et applications web pour les entreprises du ${ville.departement}.`,
  })

  const breadcrumbJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://dvs-web.fr' },
      { '@type': 'ListItem', position: 2, name: 'Création site internet', item: 'https://dvs-web.fr/creation-site-internet' },
      { '@type': 'ListItem', position: 3, name: `Création site internet ${ville.nom}`, item: `https://dvs-web.fr/creation-site-internet/${ville.slug}` },
    ],
  })

  const faqJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Combien coûte un site internet à ${ville.nom} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Le prix dépend de votre projet. Un site vitrine démarre à partir de ~600€, avec l'hébergement première année inclus. Contactez-moi pour un devis gratuit adapté à votre activité à ${ville.nom}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Vous déplacez-vous à ${ville.nom} pour les réunions ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Je travaille principalement en visio, ce qui me permet d'être efficace avec mes clients partout en Bretagne. Pour les projets plus importants, je peux me déplacer à ${ville.nom}${ville.distanceRennes ? ` (${ville.distanceRennes} depuis ma base en Ille-et-Vilaine)` : ' en Bretagne'}.`,
        },
      },
      {
        '@type': 'Question',
        name: 'En combien de temps mon site sera-t-il en ligne ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Un site vitrine est livré en 2 à 4 semaines selon la complexité. Un e-commerce ou une application web demande 4 à 8 semaines. Tout est défini clairement dans le devis avant de démarrer.',
        },
      },
      {
        '@type': 'Question',
        name: 'Mon site sera-t-il visible sur Google ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "L'optimisation SEO de base est incluse dans tous mes projets : structure technique, balises meta, données structurées, sitemap et performances. Je peux aussi vous accompagner sur une stratégie de contenu local.",
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
                  {ville.nom} — {ville.departement}
                </span>
              </div>
              <h1 className="heading-1 mb-6">
                Création de site internet à {ville.nom}
              </h1>
              <p className="text-body text-lg mb-8">
                {ville.description
                  ? `${ville.description} Vous cherchez un développeur web pour créer votre site internet ? Je conçois des sites vitrines, boutiques en ligne et applications web sur-mesure pour les entreprises et indépendants de ${ville.nom}.`
                  : `Vous cherchez un développeur web pour créer votre site internet à ${ville.nom} ? Je conçois des sites vitrines, boutiques en ligne et applications web sur-mesure pour les entreprises et indépendants${ville.distanceRennes ? ` — à ${ville.distanceRennes} de ma base en Ille-et-Vilaine` : ' en Bretagne'}.`
                }
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
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <ScrollReveal>
              <div className="max-w-3xl">
                <h2 className="heading-3 mb-4">
                  Un développeur web au service des entreprises de {ville.nom}
                </h2>
                <p className="text-body mb-4">
                  Je travaille avec des professionnels de tous les secteurs à {ville.nom} — {ville.secteurEco} — pour créer des sites internet qui génèrent de vrais résultats.
                </p>
                {ville.entreprisesType && (
                  <p className="text-body">
                    Mes clients sont souvent des {ville.entreprisesType} qui veulent développer leur visibilité en ligne et attirer de nouveaux clients dans leur zone de chalandise.
                  </p>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Services */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">
                Mes services de création web à {ville.nom}
              </h2>
              <p className="text-body max-w-2xl mx-auto">
                Des solutions adaptées à votre activité et à votre budget, livrées clé en main.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <ScrollReveal key={service.titre} delay={index * 0.1}>
                <div className="card h-full flex flex-col">
                  <h3 className="text-white font-semibold text-xl mb-2">
                    {service.titre}
                  </h3>
                  <p className="text-neutral-400 mb-4 flex-grow">
                    {service.description}
                  </p>
                  <p className="text-accent font-medium">{service.prix}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-8">
              <Button href="/tarifs" variant="secondary">
                Voir tous les tarifs
                <ArrowRight size={18} />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="heading-2 mb-6">
                Ce qui est inclus dans chaque projet
              </h2>
              <p className="text-body mb-8">
                Pas de mauvaises surprises. Chaque site est livré avec tout ce qu&apos;il faut
                pour être en ligne et visible sur Google dès le départ.
              </p>
              <ul className="space-y-3">
                {inclus.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="text-accent flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-neutral-300">{item}</span>
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
                  {avantages.map((avantage) => (
                    <div key={avantage.titre} className="flex gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <avantage.icon className="text-accent" size={20} />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm mb-1">{avantage.titre}</p>
                        <p className="text-neutral-400 text-sm">{avantage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">Comment ça se passe ?</h2>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="space-y-6">
                {[
                  { num: '1', titre: 'Premier contact', desc: 'Vous me décrivez votre projet par email ou téléphone. Je vous réponds sous 24h.' },
                  { num: '2', titre: 'Échange sur votre projet', desc: `On fait le point sur vos besoins, vos objectifs et votre budget. En visio ou sur place${ville.distanceRennes ? ` (${ville.distanceRennes} de ma base)` : ''}.` },
                  { num: '3', titre: 'Devis détaillé gratuit', desc: 'Vous recevez une proposition claire avec le périmètre, le planning et le tarif.' },
                  { num: '4', titre: 'Réalisation et mise en ligne', desc: 'Développement avec des points réguliers, puis mise en ligne et formation.' },
                ].map((step) => (
                  <div key={step.num} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-primary font-bold flex items-center justify-center">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{step.titre}</h3>
                      <p className="text-neutral-400">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Métiers locaux */}
      {ville.metiersPresents.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container-custom">
            <ScrollReveal>
              <h2 className="heading-3 mb-4">
                Métiers que j&apos;accompagne à {ville.nom}
              </h2>
              <p className="text-body mb-6">
                Artisans, commerçants, professions libérales — je crée des sites adaptés à chaque activité.
              </p>
              <div className="flex flex-wrap gap-3">
                {ville.metiersPresents.map((metierSlug) => {
                  const metier = getMetierBySlug(metierSlug)
                  if (!metier) return null
                  return (
                    <a
                      key={metierSlug}
                      href={`/creation-site-internet/${ville.slug}/${metierSlug}`}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-neutral-700 text-neutral-300 text-sm hover:border-accent hover:text-accent transition-colors"
                    >
                      {metier.nom}
                    </a>
                  )
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Villes proches */}
      {ville.villesProches.length > 0 && (
        <section className="py-12 border-t border-neutral-800">
          <div className="container-custom">
            <ScrollReveal>
              <h2 className="heading-3 mb-4">
                Je travaille aussi dans les villes proches de {ville.nom}
              </h2>
              <div className="flex flex-wrap gap-3">
                {ville.villesProches.map((villeSlug) => {
                  const villeProche = getVilleBySlug(villeSlug)
                  if (!villeProche) return null
                  return (
                    <a
                      key={villeSlug}
                      href={`/creation-site-internet/${villeSlug}`}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-neutral-700 text-neutral-300 text-sm hover:border-accent hover:text-accent transition-colors"
                    >
                      {villeProche.nom}
                    </a>
                  )
                })}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Développeur web freelance à {ville} — section keyword */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <h2 className="heading-2 mb-6">
                Développeur web freelance à {ville.nom}
              </h2>
              <p className="text-body mb-4">
                Vous cherchez un développeur web indépendant pour votre projet à {ville.nom} ?
                Je propose des tarifs freelance accessibles — sans les frais de structure d&apos;une agence —
                pour une qualité identique, voire supérieure, grâce à un suivi direct et personnalisé.
              </p>
              <p className="text-body mb-4">
                Basé en Ille-et-Vilaine, j&apos;interviens régulièrement avec des professionnels
                {ville.distanceRennes ? ` — ${ville.nom} se trouve à ${ville.distanceRennes} de ma base` : ' dans toute la région'}.
                La grande majorité des projets se déroulent en visio, ce qui me permet d&apos;être efficace
                quelle que soit votre localisation.
              </p>
              <p className="text-body">
                De la conception au lancement, vous avez un seul interlocuteur qui connaît votre projet
                dans son intégralité. Aucun chef de projet, aucune équipe dispersée — juste vous et moi.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-4">
                <h3 className="heading-3 mb-6">Pourquoi choisir un freelance à {ville.nom} ?</h3>
                {[
                  { titre: 'Réactivité garantie', desc: 'Je réponds sous 24h et vous tenez informé à chaque étape du projet.' },
                  { titre: 'Tarifs sans frais de structure', desc: 'Pas d\'agence, pas d\'intermédiaire. Votre budget va directement au développement.' },
                  { titre: 'Expertise technique complète', desc: 'Design, développement, SEO et mise en ligne — tout est géré par la même personne.' },
                  { titre: 'Accompagnement après livraison', desc: 'Vous n\'êtes pas seul après la mise en ligne. Support et évolutions disponibles.' },
                ].map((item) => (
                  <div key={item.titre} className="flex gap-3">
                    <Check className="text-accent flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-white font-medium text-sm mb-0.5">{item.titre}</p>
                      <p className="text-neutral-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Articles liés */}
      <section className="py-12 md:py-16 border-t border-neutral-800">
        <div className="container-custom">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="text-accent" size={20} />
              <h2 className="heading-3">Ressources utiles pour votre projet</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {ARTICLES_LIES.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="card group hover:border-accent/50 transition-colors"
                >
                  <p className="text-white text-sm font-medium group-hover:text-accent transition-colors leading-snug">
                    {article.titre}
                  </p>
                  <p className="text-accent text-xs flex items-center gap-1 mt-3">
                    Lire l&apos;article
                    <ArrowRight size={12} />
                  </p>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="heading-2 mb-4">
                Un projet de site internet à {ville.nom} ?
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
