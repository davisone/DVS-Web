import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, MapPin, ArrowRight, Clock, Euro, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

export const metadata: Metadata = {
  title: 'Développeur Web Freelance à Rennes et en Ille-et-Vilaine (35)',
  description:
    'Besoin d\'un développeur web en Ille-et-Vilaine ? Création de sites internet, applications web et mobiles à Rennes, Mordelles, Bruz, Cesson-Sévigné. Devis gratuit sous 24h.',
  keywords: [
    'développeur web Rennes',
    'développeur freelance Rennes',
    'création site internet Rennes',
    'développeur web Ille-et-Vilaine',
    'développeur web 35',
    'agence web Rennes',
    'site vitrine Rennes',
    'développeur web Mordelles',
    'développeur web Bruz',
    'création site web Bretagne',
  ],
  openGraph: {
    title: 'Développeur Web Freelance à Rennes et en Ille-et-Vilaine',
    description:
      'Création de sites internet et applications sur-mesure en Ille-et-Vilaine. Développeur freelance basé à Mordelles, près de Rennes.',
  },
}

const villes = [
  'Rennes',
  'Mordelles',
  'Bruz',
  'Cesson-Sévigné',
  'Saint-Grégoire',
  'Chantepie',
  'Pacé',
  'Betton',
  'Vezin-le-Coquet',
  'Le Rheu',
  'Chartres-de-Bretagne',
  'Saint-Jacques-de-la-Lande',
  'Montgermont',
  'Thorigné-Fouillard',
  'Acigné',
  'Vitré',
  'Fougères',
  'Saint-Malo',
  'Dinard',
  'Redon',
]

const avantages = [
  {
    icon: MapPin,
    titre: 'Proximité',
    description: 'Basé à Mordelles, je me déplace dans toute l\'Ille-et-Vilaine pour nos rendez-vous.',
  },
  {
    icon: MessageSquare,
    titre: 'Contact direct',
    description: 'Un seul interlocuteur du début à la fin. Pas d\'intermédiaire, communication fluide.',
  },
  {
    icon: Euro,
    titre: 'Tarifs freelance',
    description: 'Sans les frais de structure d\'une agence, des tarifs plus accessibles pour les TPE/PME.',
  },
  {
    icon: Clock,
    titre: 'Réactivité',
    description: 'Disponible et réactif. Réponse sous 24h et suivi personnalisé de votre projet.',
  },
]

const services = [
  {
    titre: 'Sites vitrines',
    description: 'Présentez votre activité avec un site moderne et optimisé pour Google.',
    prix: 'À partir de ~600€',
  },
  {
    titre: 'Sites e-commerce',
    description: 'Vendez en ligne avec une boutique performante et sécurisée.',
    prix: 'Sur devis',
  },
  {
    titre: 'Applications web',
    description: 'Outils métier, tableaux de bord, plateformes sur-mesure.',
    prix: 'Sur devis',
  },
  {
    titre: 'Applications mobiles',
    description: 'Apps iOS et Android pour toucher vos clients sur mobile.',
    prix: 'Sur devis',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Développeur Web Freelance Rennes',
  provider: {
    '@type': 'LocalBusiness',
    name: 'DVS Web',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mordelles',
      postalCode: '35310',
      addressRegion: 'Ille-et-Vilaine',
      addressCountry: 'FR',
    },
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Ille-et-Vilaine',
  },
  description: 'Création de sites internet et applications web/mobile sur-mesure en Ille-et-Vilaine.',
}

export default function DeveloppeurWebRennesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-accent mb-4">
                <MapPin size={20} />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Ille-et-Vilaine (35)
                </span>
              </div>
              <h1 className="heading-1 mb-6">
                Développeur web freelance à Rennes et en Ille-et-Vilaine
              </h1>
              <p className="text-body text-lg mb-8">
                Vous cherchez un développeur web local pour créer votre site internet
                ou votre application ? Basé à Mordelles, j&apos;accompagne les entreprises
                et indépendants de l&apos;Ille-et-Vilaine dans leurs projets digitaux.
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

      {/* Avantages */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">
                Pourquoi choisir un développeur freelance local ?
              </h2>
              <p className="text-body max-w-2xl mx-auto">
                Travailler avec un freelance de votre région, c&apos;est la garantie
                d&apos;un accompagnement personnalisé et d&apos;une vraie proximité.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {avantages.map((avantage, index) => (
              <ScrollReveal key={avantage.titre} delay={index * 0.1}>
                <div className="card h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <avantage.icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {avantage.titre}
                  </h3>
                  <p className="text-neutral-400 text-sm">{avantage.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">
                Mes services de développement web à Rennes
              </h2>
              <p className="text-body max-w-2xl mx-auto">
                Des solutions adaptées aux besoins des entreprises bretonnes,
                de la TPE à la PME.
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

      {/* Zone d'intervention */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">Zone d&apos;intervention</h2>
              <p className="text-body max-w-2xl mx-auto">
                J&apos;interviens dans toute l&apos;Ille-et-Vilaine et peux me déplacer
                pour nos rendez-vous. Je travaille également à distance pour les
                clients plus éloignés.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="card">
              <h3 className="text-white font-semibold mb-4">
                Villes et communes desservies :
              </h3>
              <div className="flex flex-wrap gap-2">
                {villes.map((ville) => (
                  <span
                    key={ville}
                    className="px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full text-sm"
                  >
                    {ville}
                  </span>
                ))}
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                  + tout le 35
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">Comment ça se passe ?</h2>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-primary font-bold flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Premier contact</h3>
                    <p className="text-neutral-400">
                      Vous me décrivez votre projet par email ou téléphone.
                      Je vous réponds sous 24h.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-primary font-bold flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Rendez-vous (visio ou sur place)</h3>
                    <p className="text-neutral-400">
                      On échange sur vos besoins, vos objectifs et votre budget.
                      Je me déplace à Rennes et alentours.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-primary font-bold flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Devis détaillé gratuit</h3>
                    <p className="text-neutral-400">
                      Vous recevez une proposition claire avec le périmètre,
                      le planning et le tarif.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-primary font-bold flex items-center justify-center">
                    4
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Réalisation & livraison</h3>
                    <p className="text-neutral-400">
                      Développement avec des points réguliers, puis mise en ligne
                      et formation à l&apos;utilisation.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="heading-2 mb-4">
                Un projet web en Ille-et-Vilaine ?
              </h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Discutons de votre projet. Premier échange gratuit et sans engagement.
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