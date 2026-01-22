'use client'

import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { Check, ArrowRight, Globe, RefreshCw, Code, Smartphone, Settings, Shield, CreditCard, MessageSquare, FileCheck } from 'lucide-react'

const pricingCategories = [
  {
    id: 'sites-vitrine',
    title: 'Sites Vitrine',
    icon: Globe,
    description: 'Votre présence en ligne professionnelle',
    hasReference: true,
    plans: [
      {
        name: 'Essentiel',
        price: '990',
        popular: true,
        description: 'Idéal pour démarrer votre présence en ligne',
        features: [
          '1 à 5 pages',
          'Design responsive (mobile, tablette, desktop)',
          'Formulaire de contact',
          'Optimisation SEO de base',
          'Hébergement 1ère année inclus',
          'Formation à la prise en main',
        ],
      },
      {
        name: 'Professionnel',
        price: '1 790',
        description: 'Pour une image de marque renforcée',
        features: [
          '5 à 10 pages',
          'Design sur-mesure premium',
          'Animations et interactions',
          'Blog ou galerie intégré',
          'SEO avancé + Google Analytics',
          'Intégration réseaux sociaux',
          'Support 3 mois inclus',
        ],
      },
    ],
  },
  {
    id: 'refonte',
    title: 'Refonte de site',
    icon: RefreshCw,
    description: 'Donnez un nouveau souffle à votre site existant',
    plans: [
      {
        name: 'Refonte légère',
        price: '790',
        description: 'Modernisation visuelle de votre site',
        features: [
          'Nouveau design moderne',
          'Conservation de la structure existante',
          'Optimisation mobile',
          'Amélioration des performances',
          'Mise à jour du contenu',
        ],
      },
      {
        name: 'Refonte complète',
        price: '1 490',
        popular: true,
        description: 'Transformation totale de votre présence web',
        features: [
          'Audit complet de l\'existant',
          'Nouvelle architecture',
          'Design entièrement repensé',
          'Migration des contenus',
          'Redirections SEO',
          'Optimisation des performances',
          'Formation utilisateur',
        ],
      },
    ],
  },
  {
    id: 'applications',
    title: 'Applications sur-mesure',
    icon: Code,
    description: 'Solutions personnalisées pour vos besoins métier',
    hasReference: true,
    isCustomPricing: true,
    plans: [
      {
        name: 'Application Web',
        price: 'Sur mesure',
        popular: false,
        description: 'Outil métier, plateforme ou SaaS',
        features: [
          'Analyse des besoins approfondie',
          'Conception UX/UI personnalisée',
          'Développement sur-mesure',
          'Base de données',
          'Espace administration',
          'Tests et déploiement',
          'Documentation technique',
        ],
      },
      {
        name: 'Application Mobile',
        price: 'Sur mesure',
        popular: false,
        description: 'Application iOS et Android',
        features: [
          'Application hybride (iOS + Android)',
          'Design adapté mobile natif',
          'Fonctionnalités sur-mesure',
          'Notifications push',
          'Publication stores',
          'Maintenance 3 mois incluse',
        ],
      },
    ],
  },
]

const maintenancePlans = [
  {
    name: 'Sérénité',
    price: '59',
    description: 'L\'essentiel pour garder votre site à jour',
    features: [
      'Mises à jour de sécurité',
      'Sauvegardes hebdomadaires',
      'Monitoring disponibilité',
      'Support par email',
    ],
  },
  {
    name: 'Confort',
    price: '99',
    popular: true,
    description: 'Pour un site toujours performant',
    features: [
      'Tout le pack Sérénité',
      'Modifications mineures (2h/mois)',
      'Rapport mensuel',
      'Support prioritaire',
      'Optimisation performances',
    ],
  },
  {
    name: 'Performance',
    price: '199',
    description: 'Accompagnement complet',
    features: [
      'Tout le pack Confort',
      'Évolutions mensuelles (4h/mois)',
      'Conseils stratégiques',
      'Veille technologique',
      'Interlocuteur dédié',
    ],
  },
]

const guarantees = [
  {
    icon: MessageSquare,
    title: 'Devis détaillé gratuit',
    description: 'Réponse sous 48h avec estimation précise et sans engagement.',
  },
  {
    icon: FileCheck,
    title: 'Transparence totale',
    description: 'Aucun frais caché. Le prix annoncé est le prix final.',
  },
  {
    icon: CreditCard,
    title: 'Paiement flexible',
    description: 'Paiement en 2 ou 3 fois sans frais. Acompte de 30% au démarrage.',
  },
  {
    icon: Shield,
    title: 'Satisfaction garantie',
    description: 'Corrections incluses jusqu\'à validation. Vous restez propriétaire du code.',
  },
]

export function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Tarifs
              </span>
              <h1 className="heading-1 mt-3 mb-6">
                Des tarifs clairs et transparents
              </h1>
              <p className="text-body">
                Des prix indicatifs pour vous donner une première idée.
                Chaque projet est unique : après un premier échange,
                je vous fournis une estimation personnalisée et détaillée.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Guarantees */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => (
              <ScrollReveal key={guarantee.title} delay={index * 0.1}>
                <div className="card h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <guarantee.icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{guarantee.title}</h3>
                  <p className="text-neutral-400 text-sm">{guarantee.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Categories */}
      {pricingCategories.map((category, categoryIndex) => (
        <section
          key={category.id}
          id={category.id}
          className={`section-padding ${categoryIndex % 2 === 0 ? 'bg-secondary' : ''}`}
        >
          <div className="container-custom">
            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <category.icon className="text-accent" size={32} />
                </div>
                <h2 className="heading-2 mb-4">{category.title}</h2>
                <p className="text-body max-w-2xl mx-auto">{category.description}</p>
                {category.hasReference && (
                  <a
                    href="/realisations"
                    className="inline-flex items-center gap-2 mt-4 text-sm text-accent hover:text-accent-light transition-colors"
                  >
                    Voir mes réalisations dans cette catégorie
                    <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {category.plans.map((plan, index) => (
                <ScrollReveal key={plan.name} delay={index * 0.1}>
                  <div
                    className={`card relative h-full flex flex-col ${
                      plan.popular ? 'border-accent/50' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-accent text-primary text-xs font-semibold px-3 py-1 rounded-full">
                          Le plus demandé
                        </span>
                      </div>
                    )}
                    <div className="mb-6">
                      <h3 className="text-white font-semibold text-xl mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-neutral-400 text-sm">{plan.description}</p>
                    </div>
                    <div className="mb-6">
                      {plan.price === 'Sur mesure' ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold text-accent">
                            Sur mesure
                          </span>
                        </div>
                      ) : (
                        <>
                          <span className="text-sm text-neutral-400">À partir de</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold text-accent">
                              {plan.price}
                            </span>
                            <span className="text-neutral-400">€</span>
                          </div>
                        </>
                      )}
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                            <Check className="text-accent" size={12} />
                          </div>
                          <span className="text-neutral-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      href="/contact"
                      variant={plan.popular ? 'primary' : 'secondary'}
                      className="w-full"
                    >
                      Demander une estimation
                      <ArrowRight size={18} />
                    </Button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Maintenance */}
      <section className="section-padding">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Settings className="text-accent" size={32} />
              </div>
              <h2 className="heading-2 mb-4">Maintenance & Évolution</h2>
              <p className="text-body max-w-2xl mx-auto">
                Gardez votre site performant et sécurisé avec un accompagnement continu.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {maintenancePlans.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 0.1}>
                <div
                  className={`card relative h-full flex flex-col ${
                    plan.popular ? 'border-accent/50' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-accent text-primary text-xs font-semibold px-3 py-1 rounded-full">
                        Recommandé
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-white font-semibold text-xl mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-neutral-400 text-sm">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-accent">
                        {plan.price}
                      </span>
                      <span className="text-neutral-400">€/mois</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                          <Check className="text-accent" size={12} />
                        </div>
                        <span className="text-neutral-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="/contact"
                    variant={plan.popular ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    Souscrire
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="heading-2 mb-4">Une question sur les tarifs ?</h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Chaque projet est différent. Contactez-moi pour discuter
                de vos besoins et recevoir une estimation personnalisée.
              </p>
              <Button href="/contact" size="lg">
                Demander mon estimation gratuite
                <ArrowRight size={20} />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}