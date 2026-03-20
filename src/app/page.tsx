import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ServicesPreview } from '@/components/sections/ServicesPreview'
import { ProjectsPreview } from '@/components/sections/ProjectsPreview'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection } from '@/components/sections/CTASection'

export default function HomePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "Combien coûte la création d'un site internet ?",
        acceptedAnswer: { '@type': 'Answer', text: "Un site vitrine professionnel démarre à partir de ~600€. Le tarif dépend de vos besoins : nombre de pages, fonctionnalités, intégrations. Je fournis un devis gratuit et détaillé après un premier échange." },
      },
      {
        '@type': 'Question',
        name: 'Travaillez-vous avec des artisans et TPE ?',
        acceptedAnswer: { '@type': 'Answer', text: "Oui, c'est ma cible principale. Je crée des sites internet pour plombiers, électriciens, coiffeurs, restaurateurs, boulangers et tout type d'artisan ou TPE en Bretagne et dans le grand Ouest." },
      },
      {
        '@type': 'Question',
        name: 'Quel délai pour créer un site internet ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Un site vitrine est livré en 2 à 4 semaines. Un e-commerce ou une application web demande 4 à 8 semaines. Le planning est défini clairement dans le devis.' },
      },
      {
        '@type': 'Question',
        name: 'Mon site sera-t-il bien référencé sur Google ?',
        acceptedAnswer: { '@type': 'Answer', text: "L'optimisation SEO technique est incluse dans tous mes projets : structure, balises meta, données structurées, performances et sitemap. Je peux aussi vous accompagner sur une stratégie de contenu." },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <AboutSection />
      <ServicesPreview />
      <ProjectsPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
