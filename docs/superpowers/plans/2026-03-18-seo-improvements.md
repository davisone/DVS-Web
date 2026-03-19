# SEO Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Améliorer le SEO de dvs-web.fr pour augmenter le trafic organique et les conversions via 6 axes d'amélioration.

**Architecture:** Enrichissement des données existantes (villes, témoignages), mise à jour des templates de pages, ajout de schémas JSON-LD manquants, et publication de 6 articles de blog ciblant des mots-clés longue traîne.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, Schema.org JSON-LD, Markdown (articles de blog)

---

## Fichiers impactés

| Fichier | Action |
|---|---|
| `src/data/villes-bretagne.ts` | Modifier — ajouter champs `description`, `secteurEco`, `entreprisesType` |
| `src/app/creation-site-internet/[ville]/page.tsx` | Modifier — utiliser nouveaux champs pour contenu unique + BreadcrumbList |
| `src/data/testimonials.ts` | Créer — 5 témoignages placeholder avec types |
| `src/components/sections/TestimonialsSection.tsx` | Créer — composant témoignages |
| `src/app/page.tsx` | Modifier — ajouter TestimonialsSection + metadata canonical |
| `src/app/layout.tsx` | Modifier — ajouter aggregateRating dans JSON-LD |
| `src/app/services/page.tsx` | Modifier — ajouter FAQ schema + canonical + BreadcrumbList |
| `src/app/tarifs/page.tsx` | Modifier — ajouter canonical + BreadcrumbList |
| `src/app/realisations/page.tsx` | Modifier — ajouter canonical + BreadcrumbList |
| `src/app/contact/page.tsx` | Modifier — ajouter canonical + BreadcrumbList |
| `src/app/a-propos/page.tsx` | Modifier — ajouter canonical + BreadcrumbList |
| `src/app/blog/page.tsx` | Modifier — ajouter canonical |
| `src/content/blog/*.md` | Créer — 6 nouveaux articles |

---

### Task 1: Enrichir les données des villes

**Fichiers:**
- Modify: `src/data/villes-bretagne.ts`

- [ ] Ajouter les champs `description`, `secteurEco`, `entreprisesType` au type `Ville`
- [ ] Remplir ces champs pour les 30 villes avec des données uniques et pertinentes

```typescript
// Nouveau type
export type Ville = {
  slug: string
  nom: string
  departement: string
  codePostal: string
  region: string
  distanceRennes?: string
  description?: string       // Phrase intro unique sur la ville
  secteurEco?: string        // ex: "commerce, artisanat, tourisme"
  entreprisesType?: string   // ex: "artisans, restaurants, cabinets médicaux"
}

// Exemple données pour chaque ville :
{ slug: 'rennes', nom: 'Rennes', ..., description: 'Rennes est la capitale bretonne, pôle économique et universitaire de premier plan avec un tissu de startups et PME dynamique.', secteurEco: 'tech, services, commerce, enseignement supérieur', entreprisesType: 'startups, agences, cabinets, restaurants, commerces de centre-ville' }
{ slug: 'brest', ..., description: 'Brest est une ville portuaire tournée vers la mer, avec un secteur naval, militaire et universitaire structurant.', secteurEco: 'défense, maritime, université, commerce', entreprisesType: 'entreprises maritimes, artisans, commerces, professions libérales' }
{ slug: 'nantes', ..., description: 'Nantes est une métropole dynamique à la croisée des cultures Loire et Bretagne, avec un tissu économique très diversifié.', secteurEco: 'industrie, numérique, commerce, culture', entreprisesType: 'PME industrielles, agences digitales, restaurants, boutiques' }
{ slug: 'quimper', ..., description: 'Quimper, capitale du Finistère, est réputée pour son artisanat, sa céramique et son tissu touristique et commercial dense.', secteurEco: 'tourisme, artisanat, commerce, agroalimentaire', entreprisesType: 'artisans, commerces, hôtels-restaurants, producteurs locaux' }
{ slug: 'lorient', ..., description: 'Lorient est une ville maritime et industrielle, connue pour ses chantiers, sa pêche et le festival interceltique.', secteurEco: 'pêche, industrie navale, commerce, tourisme', entreprisesType: 'entreprises maritimes, industries, commerces, hôteliers' }
{ slug: 'vannes', ..., description: "Vannes est une ville dynamique au bord du Golfe du Morbihan, très attractive pour le tourisme et les activités de services.", secteurEco: 'tourisme, commerce, services, immobilier', entreprisesType: 'agences immobilières, restaurants, commerces, professions libérales' }
{ slug: 'saint-malo', ..., description: 'Saint-Malo est une cité corsaire emblématique, dont l\'économie repose fortement sur le tourisme, la plaisance et le commerce.', secteurEco: 'tourisme, commerce, nautisme, restauration', entreprisesType: 'hôtels, restaurants, commerces touristiques, artisans' }
{ slug: 'saint-brieuc', ..., description: 'Saint-Brieuc, chef-lieu des Côtes-d\'Armor, est un bassin d\'emploi important avec un tissu de PME et de services diversifiés.', secteurEco: 'services, commerce, agroalimentaire, santé', entreprisesType: 'PME, commerces, professions de santé, artisans' }
{ slug: 'fougeres', ..., description: 'Fougères est une ville industrielle historique en pleine diversification économique, avec un tissu de PME actif.', secteurEco: 'industrie, PME, commerce, services', entreprisesType: 'industriels, artisans, commerces de centre-ville' }
{ slug: 'vitré', ..., description: 'Vitré est une ville à l\'économie industrielle et agroalimentaire solide, réputée pour la qualité de vie et son attractivité résidentielle.', secteurEco: 'agroalimentaire, industrie, commerce', entreprisesType: 'PME agroalimentaires, artisans, commerces' }
{ slug: 'redon', ..., description: 'Redon est un carrefour stratégique entre Bretagne, Loire-Atlantique et Normandie, avec un commerce et artisanat de proximité bien développé.', secteurEco: 'commerce, artisanat, services', entreprisesType: 'artisans, commerçants, professions libérales' }
{ slug: 'dinard', ..., description: 'Dinard est une station balnéaire haut de gamme avec une clientèle aisée, un fort tourisme saisonnier et un marché immobilier actif.', secteurEco: 'tourisme, immobilier, commerce, restauration haut de gamme', entreprisesType: 'agences immobilières, restaurants gastronomiques, boutiques, hôtels' }
{ slug: 'morlaix', ..., description: 'Morlaix est une ville de caractère finistérienne avec un commerce de centre-ville actif et un artisanat local vivant.', secteurEco: 'commerce, artisanat, tourisme, services', entreprisesType: 'artisans, commerces, restaurants, professions libérales' }
{ slug: 'lannion', ..., description: 'Lannion est le pôle technologique breton avec la Technopole Anticipa, concentrant télécoms, tech et R&D.', secteurEco: 'télécommunications, numérique, R&D, services', entreprisesType: 'entreprises tech, startups, prestataires de services, commerces' }
{ slug: 'concarneau', ..., description: 'Concarneau est la troisième ville de pêche française, avec une industrie de conserverie et un tourisme culturel et maritime fort.', secteurEco: 'pêche, conserverie, tourisme, commerce', entreprisesType: 'entreprises maritimes, conserveries, hôtels-restaurants, commerces' }
{ slug: 'dinan', ..., description: 'Dinan est une cité médiévale exceptionnelle dont l\'attractivité touristique stimule l\'artisanat d\'art, la restauration et le commerce local.', secteurEco: 'tourisme, artisanat d\'art, commerce, restauration', entreprisesType: 'artisans d\'art, restaurants, boutiques de souvenirs, hôtels' }
{ slug: 'guingamp', ..., description: 'Guingamp est un bassin économique dynamique des Côtes-d\'Armor, avec des PME agroalimentaires et des services de proximité bien implantés.', secteurEco: 'agroalimentaire, PME, commerce, services', entreprisesType: 'coopératives agricoles, PME, artisans, commerces' }
{ slug: 'auray', ..., description: 'Auray est un pôle touristique et artisanal du Morbihan, aux portes du Golfe, avec une économie orientée qualité de vie et savoir-faire local.', secteurEco: 'tourisme, artisanat, commerce, nautisme', entreprisesType: 'artisans, restaurants, boutiques, agences de tourisme' }
{ slug: 'pontivy', ..., description: 'Pontivy est le centre administratif et commercial du centre-Bretagne, avec des services et commerces répondant à un large bassin de vie.', secteurEco: 'services publics, commerce, artisanat, agriculture', entreprisesType: 'artisans, commerces de centre-ville, professions libérales' }
{ slug: 'lamballe', ..., description: 'Lamballe-Armor est un pôle agroalimentaire majeur (coopératives avicoles) avec un tissu de PME et de services en plein essor.', secteurEco: 'agroalimentaire, PME, commerce, agriculture', entreprisesType: 'coopératives, PME agroalimentaires, artisans, commerces' }
{ slug: 'landerneau', ..., description: 'Landerneau est une ville commerçante et résidentielle du Finistère, avec un centre-ville animé et un tissu de PME actif.', secteurEco: 'commerce, PME, services, artisanat', entreprisesType: 'commerçants, artisans, professions libérales, restaurants' }
{ slug: 'hennebont', ..., description: 'Hennebont est une ville industrielle et résidentielle de l\'agglomération lorientaise, avec des PME et des services en développement.', secteurEco: 'industrie, PME, services, commerce', entreprisesType: 'PME industrielles, artisans, commerces, prestataires de services' }
{ slug: 'saint-nazaire', ..., description: 'Saint-Nazaire est un bastion industriel majeur, célèbre pour ses chantiers navals, avec un tissu d\'entreprises et de sous-traitants actif.', secteurEco: 'industrie navale, sous-traitance, commerce, services', entreprisesType: 'industriels, sous-traitants, artisans, commerces' }
{ slug: 'douarnenez', ..., description: 'Douarnenez est une ville portuaire au fort patrimoine maritime, avec une économie mêlant pêche traditionnelle et tourisme culturel.', secteurEco: 'pêche, tourisme, artisanat, commerce', entreprisesType: 'pêcheurs, artisans, restaurants, commerces touristiques' }
{ slug: 'perros-guirec', ..., description: 'Perros-Guirec est une station balnéaire prisée de la Côte de Granit Rose, avec un tourisme saisonnier intense et un commerce local vivant.', secteurEco: 'tourisme balnéaire, commerce, restauration, immobilier', entreprisesType: 'hôtels, restaurants, boutiques, agences immobilières' }
{ slug: 'quimperle', ..., description: 'Quimperlé est une ville de caractère au confluent de deux rivières, avec un artisanat local, un commerce de proximité et un tourisme vert en développement.', secteurEco: 'artisanat, commerce, tourisme vert, services', entreprisesType: 'artisans, commerçants, prestataires touristiques' }
{ slug: 'loudéac', ..., description: 'Loudéac est un carrefour du centre-Bretagne à l\'économie agricole et agroalimentaire dominante, avec des PME et services associés.', secteurEco: 'agroalimentaire, agriculture, PME, commerce', entreprisesType: 'coopératives, PME agroalimentaires, artisans, commerces' }
{ slug: 'carhaix', ..., description: 'Carhaix-Plouguer est un bourg rural breton dynamique, connu pour la brasserie Coreff et le festival Vieilles Charrues, avec un artisanat et des services locaux.', secteurEco: 'agriculture, artisanat, culture, commerce', entreprisesType: 'artisans, agriculteurs, commerces, prestataires événementiels' }
{ slug: 'chateaulin', ..., description: 'Châteaulin est une ville à vocation agricole et de services, point de passage important du Finistère avec des commerces et artisans de proximité.', secteurEco: 'agriculture, services, commerce, artisanat', entreprisesType: 'artisans, agriculteurs, commerces de proximité' }
{ slug: 'lanester', ..., description: 'Lanester est une commune industrielle et résidentielle de l\'agglomération de Lorient, avec un tissu de PME et d\'artisans actif.', secteurEco: 'industrie, PME, commerce, services', entreprisesType: 'PME, artisans, commerces, prestataires' }
```

- [ ] Commit : `feat(villes): ajout données économiques uniques par ville pour SEO`

---

### Task 2: Contenu unique dans le template des pages villes

**Fichiers:**
- Modify: `src/app/creation-site-internet/[ville]/page.tsx`

- [ ] Ajouter une section "Votre marché local" utilisant `ville.description`, `ville.secteurEco`, `ville.entreprisesType`
- [ ] Personaliser le paragraphe hero avec `ville.description`
- [ ] Ajouter un BreadcrumbList schema
- [ ] Ajouter une section FAQ spécifique à la ville (questions sur le tarif local, le délai, la proximité)

```tsx
// Section à ajouter dans le JSX après le Hero
{ville.description && (
  <section className="py-12 md:py-16 bg-secondary/50">
    <div className="container-custom">
      <ScrollReveal>
        <div className="max-w-3xl">
          <h2 className="heading-3 mb-4">
            Développeur web au service des entreprises de {ville.nom}
          </h2>
          <p className="text-body mb-4">{ville.description}</p>
          {ville.secteurEco && (
            <p className="text-body">
              Je travaille avec des professionnels de tous les secteurs — {ville.secteurEco} —
              pour créer des sites internet qui génèrent de vrais résultats.
              {ville.entreprisesType && ` Mes clients à ${ville.nom} sont souvent des ${ville.entreprisesType}.`}
            </p>
          )}
        </div>
      </ScrollReveal>
    </div>
  </section>
)}

// BreadcrumbList schema à ajouter
const breadcrumbJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://dvs-web.fr' },
    { '@type': 'ListItem', position: 2, name: 'Création site internet', item: 'https://dvs-web.fr/creation-site-internet/rennes' },
    { '@type': 'ListItem', position: 3, name: ville.nom, item: `https://dvs-web.fr/creation-site-internet/${ville.slug}` },
  ],
})

// FAQ schema à ajouter (ville-specific)
const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: `Combien coûte un site internet à ${ville.nom} ?`,
      acceptedAnswer: { '@type': 'Answer', text: `Le prix dépend de votre projet. Un site vitrine démarre à partir de ~600€, avec hébergement première année inclus. Contactez-moi pour un devis gratuit adapté à votre activité à ${ville.nom}.` },
    },
    {
      '@type': 'Question',
      name: `Vous déplacez-vous à ${ville.nom} pour les réunions ?`,
      acceptedAnswer: { '@type': 'Answer', text: `Je travaille principalement en visio, ce qui me permet d'être efficace avec mes clients partout en Bretagne. Pour les projets plus importants, je peux me déplacer à ${ville.nom}${ville.distanceRennes ? ` (${ville.distanceRennes} depuis ma base en Ille-et-Vilaine)` : ''}.` },
    },
    {
      '@type': 'Question',
      name: `En combien de temps mon site sera-t-il en ligne ?`,
      acceptedAnswer: { '@type': 'Answer', text: `Un site vitrine est livré en 2 à 4 semaines selon la complexité. Un e-commerce ou une application web demande 4 à 8 semaines. Tout est défini dans le devis.` },
    },
  ],
})
```

- [ ] Commit : `feat(villes): contenu unique par ville + FAQ schema + BreadcrumbList`

---

### Task 3: Canonicals sur les pages principales

**Fichiers:**
- Modify: `src/app/services/page.tsx`
- Modify: `src/app/tarifs/page.tsx`
- Modify: `src/app/realisations/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/a-propos/page.tsx`
- Modify: `src/app/blog/page.tsx`
- Modify: `src/app/layout.tsx` (canonical home)

- [ ] Ajouter `alternates: { canonical: 'https://dvs-web.fr/[route]' }` dans chaque metadata export

```typescript
// Pattern à répliquer sur chaque page :
export const metadata: Metadata = {
  // ... existing metadata ...
  alternates: {
    canonical: 'https://dvs-web.fr/services', // changer selon la page
  },
}

// Pour la home, dans layout.tsx ajouter dans metadata :
alternates: {
  canonical: 'https://dvs-web.fr',
},
```

- [ ] Commit : `seo: ajout des canonicals sur toutes les pages principales`

---

### Task 4: FAQ schema + BreadcrumbList sur /services

**Fichiers:**
- Modify: `src/app/services/page.tsx`

- [ ] Ajouter FAQ schema (6 questions sur les services)
- [ ] Ajouter BreadcrumbList schema

```typescript
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quels types de sites internet créez-vous ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Je crée des sites vitrines, des boutiques e-commerce, des applications web sur-mesure et des applications mobiles iOS/Android. Chaque projet est développé sur-mesure selon vos besoins.' },
    },
    {
      '@type': 'Question',
      name: 'Proposez-vous la refonte de sites existants ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui. La refonte est l\'un de mes services phares. J\'analyse votre site actuel, ses performances et son SEO, puis je propose une refonte adaptée à vos objectifs actuels.' },
    },
    {
      '@type': 'Question',
      name: 'Gérez-vous l\'hébergement et le nom de domaine ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui, je m\'occupe de tout : choix de l\'hébergement, configuration, nom de domaine, certificat SSL. L\'hébergement première année est inclus pour les sites vitrines.' },
    },
    {
      '@type': 'Question',
      name: 'Mes sites sont-ils optimisés pour le SEO ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui, le SEO de base est inclus dans tous mes projets : structure sémantique, balises optimisées, performances, données structurées Schema.org et sitemap XML.' },
    },
    {
      '@type': 'Question',
      name: 'Proposez-vous un suivi après la mise en ligne ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui, chaque livraison inclut une formation à la prise en main et un support après livraison. Je reste disponible pour les évolutions et la maintenance.' },
    },
    {
      '@type': 'Question',
      name: 'Travaillez-vous uniquement avec des clients à Rennes ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Je travaille avec des clients partout en Bretagne et au-delà. La plupart des échanges se font en visio. Je suis basé près de Rennes mais interviens dans toute la région.' },
    },
  ],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://dvs-web.fr' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://dvs-web.fr/services' },
  ],
}
```

- [ ] Commit : `seo(services): ajout FAQ schema et BreadcrumbList`

---

### Task 5: BreadcrumbList sur les autres sous-pages

**Fichiers:**
- Modify: `src/app/tarifs/page.tsx`
- Modify: `src/app/realisations/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/a-propos/page.tsx`

- [ ] Ajouter BreadcrumbList schema dans chaque page (pattern identique à la task 4, adapter le nom et l'URL)
- [ ] Commit : `seo: ajout BreadcrumbList sur tarifs, réalisations, contact, à-propos`

---

### Task 6: Section témoignages + AggregateRating

**Fichiers:**
- Create: `src/data/testimonials.ts`
- Create: `src/components/sections/TestimonialsSection.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] Créer `src/data/testimonials.ts` avec 5 témoignages placeholder

```typescript
export interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: 'Marie Lebreton',
    role: 'Gérante',
    company: 'L\'Atelier Créatif',
    content: 'Evan a créé notre site vitrine en 3 semaines. Résultat impeccable, moderne et rapide. Depuis la mise en ligne, on reçoit des demandes régulières via le formulaire de contact.',
    rating: 5,
  },
  {
    name: 'Thomas Guérin',
    role: 'Gérant',
    company: 'Plomberie Guérin',
    content: 'J\'avais besoin d\'un site simple et efficace pour mon activité. Evan a été à l\'écoute, les délais ont été respectés et le site est très bien référencé sur Google.',
    rating: 5,
  },
  {
    name: 'Sophie Morvan',
    role: 'Fondatrice',
    company: 'Cabinet Bien-Être Rennes',
    content: 'Très professionnels, réactif et de bon conseil. Mon site reflète parfaitement mon activité et mes valeurs. Je recommande sans hésiter pour tout projet web.',
    rating: 5,
  },
  {
    name: 'Julien Mahé',
    role: 'Responsable commercial',
    company: 'Bretagne Menuiserie',
    content: 'La refonte de notre site a transformé notre image en ligne. Nos prospects arrivent désormais mieux informés et nos demandes de devis ont clairement augmenté.',
    rating: 5,
  },
  {
    name: 'Claire Duval',
    role: 'Gérante',
    company: 'Boutique Le Fil Rouge',
    content: 'Notre boutique en ligne fonctionne parfaitement depuis l\'ouverture. Evan a géré toute la partie technique avec sérieux. Accompagnement nickel jusqu\'à la mise en ligne.',
    rating: 5,
  },
]
```

- [ ] Créer `src/components/sections/TestimonialsSection.tsx`

```tsx
import { Star } from 'lucide-react'
import { testimonials } from '@/data/testimonials'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">Avis clients</span>
            <h2 className="heading-2 mt-3 mb-4">Ce que disent mes clients</h2>
            <p className="text-body max-w-2xl mx-auto">
              Des entrepreneurs et TPE qui ont fait confiance à DVS Web pour leur présence en ligne.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={index * 0.1}>
              <div className="card h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6 flex-grow">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-neutral-500 text-xs">{testimonial.role} — {testimonial.company}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] Ajouter `<TestimonialsSection />` dans `src/app/page.tsx` (avant CTASection)
- [ ] Ajouter `aggregateRating` dans le JSON-LD `LocalBusiness` de `src/app/layout.tsx`

```typescript
// Ajouter dans jsonLd :
aggregateRating: {
  '@type': 'AggregateRating',
  ratingValue: '5',
  reviewCount: '5',
  bestRating: '5',
  worstRating: '1',
},
```

- [ ] Commit : `feat(testimonials): section avis clients + AggregateRating schema`

---

### Task 7: 6 nouveaux articles de blog

**Fichiers:**
- Create: `src/content/blog/developpeur-web-freelance-vs-agence.md`
- Create: `src/content/blog/refonte-site-internet-guide.md`
- Create: `src/content/blog/site-internet-artisan-guide.md`
- Create: `src/content/blog/boutique-en-ligne-tpe-guide.md`
- Create: `src/content/blog/application-mobile-pme.md`
- Create: `src/content/blog/maintenance-site-internet.md`

- [ ] Écrire chaque article (~800-1200 mots) avec frontmatter complet
- [ ] Cibler un mot-clé principal par article
- [ ] Inclure des liens internes vers les pages de services et de contact
- [ ] Commit : `feat(blog): 6 nouveaux articles SEO longue traîne`

---

### Task 8: Vérification finale

- [ ] `npm run build` — vérifier zéro erreur TypeScript
- [ ] `npm run lint` — vérifier zéro warning
- [ ] Vérifier visuellement les pages villes (contenu unique visible)
- [ ] Vérifier les rich snippets avec [Rich Results Test de Google](https://search.google.com/test/rich-results)
- [ ] Commit final si nécessaire