'use client'

import { useState } from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { Check, ArrowRight, Globe, RefreshCw, Code, Smartphone, Settings, Shield, CreditCard, MessageSquare, FileCheck, ChevronDown } from 'lucide-react'

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
        price: '~600',
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
        price: '~1 500',
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
        price: '~800',
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
        price: '~1 500',
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
    price: '49',
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
      'Modifications mineures',
      'Rapport mensuel',
      'Support prioritaire',
      'Optimisation performances',
    ],
  },
  {
    name: 'Performance',
    price: '149',
    description: 'Accompagnement complet',
    features: [
      'Tout le pack Confort',
      'Évolutions mensuelles',
      'Conseils stratégiques',
      'Veille technologique',
      'Interlocuteur dédié',
    ],
  },
]

const faqItems = [
  {
    question: 'Combien coûte un site internet ?',
    answer: 'Le prix dépend de plusieurs facteurs : le nombre de pages, les fonctionnalités souhaitées (formulaire, blog, e-commerce…), le niveau de personnalisation du design et les délais. Un site vitrine se situe généralement entre 600€ et 1 500€ selon la complexité. Pour des projets plus ambitieux (e-commerce, application), le budget peut être plus conséquent. Le meilleur moyen d\'avoir un chiffre précis : me décrire votre projet pour recevoir un devis gratuit et détaillé.',
  },
  {
    question: 'Comment se passe le paiement ?',
    answer: 'Je m\'adapte à votre situation : paiement en 1 fois, en 2, 3 ou 4 fois sans frais, ou même en mensualités pour lisser votre investissement. Un acompte de 30% est demandé au démarrage du projet. On définit ensemble la formule qui vous convient le mieux. Vous recevez une facture à chaque échéance.',
  },
  {
    question: 'Que comprend le prix indiqué ?',
    answer: 'Les tarifs incluent la conception, le développement, l\'intégration du contenu que vous fournissez, l\'optimisation SEO de base, la mise en ligne et une formation à la prise en main. L\'hébergement première année est inclus pour les sites vitrine. Le nom de domaine, la rédaction de contenu et les photos professionnelles ne sont pas inclus mais peuvent être ajoutés sur devis.',
  },
  {
    question: 'Combien de temps dure un projet ?',
    answer: 'Un site vitrine essentiel est livré en 2 à 3 semaines. Un site plus complet (professionnel, e-commerce) demande 4 à 8 semaines. Pour les applications web ou mobiles, comptez 2 à 4 mois selon la complexité. Ces délais incluent les phases de validation avec vous.',
  },
  {
    question: 'Et si le projet évolue en cours de route ?',
    answer: 'C\'est tout à fait normal et ça arrive souvent. Si de nouveaux besoins apparaissent pendant le développement, on en discute et je vous propose un avenant au devis initial. Pas de surprise : tout est validé ensemble avant d\'avancer.',
  },
]

const guarantees = [
  {
    icon: MessageSquare,
    title: 'Devis détaillé gratuit',
    description: 'Réponse sous 24h avec estimation précise et sans engagement.',
  },
  {
    icon: FileCheck,
    title: 'Transparence totale',
    description: 'Aucun frais caché. Le prix annoncé est le prix final.',
  },
  {
    icon: CreditCard,
    title: 'Paiement flexible',
    description: 'En 1, 2, 3, 4 fois ou en mensualités. Acompte de 30% au démarrage.',
  },
  {
    icon: Shield,
    title: 'Satisfaction garantie',
    description: 'Corrections incluses jusqu\'à validation. Vous restez propriétaire du code.',
  },
]

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-neutral-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-800/30 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-white font-medium pr-4">{question}</span>
        <ChevronDown
          size={20}
          className={`text-accent flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-neutral-400 text-sm leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

const FAQSection = () => (
  <section className="section-padding bg-secondary">
    <div className="container-custom">
      <ScrollReveal>
        <div className="text-center mb-12">
          <span className="text-accent text-sm font-medium uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="heading-2 mt-3 mb-4">Questions fréquentes</h2>
          <p className="text-body max-w-2xl mx-auto">
            Les réponses aux questions que vous vous posez probablement.
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqItems.map((item, index) => (
          <ScrollReveal key={item.question} delay={index * 0.05}>
            <FAQItem question={item.question} answer={item.answer} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
)

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
                Des tarifs adaptés à chaque projet
              </h1>
              <p className="text-body">
                Des fourchettes de prix pour vous donner un premier repère.
                Chaque projet est unique : je vous fournis une estimation
                personnalisée et détaillée après un premier échange gratuit.
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
                            <span className="text-neutral-400">€ *</span>
                          </div>
                          <span className="text-xs text-neutral-500 mt-1 block">
                            * Prix indicatif, devis personnalisé gratuit
                          </span>
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

      {/* FAQ */}
      <FAQSection />

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