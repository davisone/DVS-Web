# SEO Full Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Maximiser le trafic organique de dvs-web.fr en corrigeant les problèmes techniques SEO, enrichissant les pages locales, créant ~20 pages métiers et ~8 articles blog ciblés artisans.

**Architecture:** Next.js 14 App Router avec génération statique (SSG) via `generateStaticParams`. Toutes les nouvelles pages sont alimentées par des fichiers de données TypeScript (`villes-france.ts`, `metiers.ts`). Le maillage interne ville×métier est bidirectionnel et porté par les données (champs `metiersPresents` et `villesPrincipales`).

**Tech Stack:** Next.js 14, TypeScript strict, Tailwind CSS, JSON-LD Schema.org (injecté via script tags — pattern standard Next.js, contenu issu de nos propres objets TS), Markdown (articles blog)

**Spec:** `docs/superpowers/specs/2026-03-19-seo-design.md`

---

## Carte des fichiers

### Fichiers modifiés
- `src/app/layout.tsx` — Supprimer fausses reviews, ajouter WebSite + Person Schema
- `src/app/page.tsx` — Ajouter FAQ Schema (services/page.tsx et tarifs/page.tsx ont déjà le FAQ Schema)
- `src/app/blog/[slug]/page.tsx` — Ajouter `alternates.canonical` + FAQ Schema dynamique
- `src/app/creation-site-internet/[ville]/page.tsx` — Enrichir avec sections métiers + villes proches, améliorer generateMetadata, mettre à jour l'import
- `src/app/sitemap.ts` — Ajouter pages métiers (en Task 8, pas avant)

### Fichiers renommés
- `src/data/villes-bretagne.ts` → `src/data/villes-france.ts` (type Ville étendu + 20 nouvelles villes)

### Fichiers créés
- `src/data/metiers.ts` — ~20 métiers avec type Metier
- `src/app/site-internet-pour/[metier]/page.tsx` — Page métier avec generateMetadata, generateStaticParams, FAQ Schema, BreadcrumbList, maillage villes
- 8 fichiers Markdown dans `src/content/blog/`

---

## Ordre d'implémentation recommandé

1. Task 1 — corrections JSON-LD (critique)
2. Task 2 — canonical blog (rapide)
3. Task 4 — migration villes-france.ts (base pour tout)
4. Task 7 — metiers.ts (base pour les pages métiers)
5. Task 5 — nouvelles villes
6. Task 6 — enrichissement page ville (maillage)
7. Task 8 — pages métiers
8. Task 3 — FAQ Schema pages statiques
9. Task 9 — nouveaux articles blog
10. Task 10 — màj articles existants
11. Task 11 — vérification finale + déploiement

---

## Task 1 : Corrections JSON-LD dans layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1 : Supprimer le bloc `aggregateRating` du JSON-LD**

Dans `src/app/layout.tsx`, supprimer entièrement ce bloc du `jsonLd` :
```
aggregateRating: {
  '@type': 'AggregateRating',
  ratingValue: '5',
  reviewCount: '5',
  bestRating: '5',
  worstRating: '1',
},
```

- [ ] **Step 2 : Ajouter `websiteJsonLd` et `personJsonLd`**

Après `const jsonLd = {...}`, ajouter deux nouvelles constantes :

```typescript
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://dvs-web.fr/#website',
  name: 'DVS Web',
  url: 'https://dvs-web.fr',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://dvs-web.fr/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://dvs-web.fr/#evan-davison',
  name: 'Evan Davison',
  jobTitle: 'Développeur Web Freelance',
  url: 'https://dvs-web.fr',
  email: 'contact@dvs-web.fr',
  telephone: '+33651019506',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mordelles',
    postalCode: '35310',
    addressRegion: 'Bretagne',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://github.com/evmusic',
    'https://www.linkedin.com/in/evan-davison-music/',
  ],
}
```

- [ ] **Step 3 : Injecter les deux nouveaux schemas dans le head**

Dans `RootLayout`, après le script `jsonLd` existant, ajouter deux nouveaux scripts JSON-LD pour `websiteJsonLd` et `personJsonLd` — même pattern que l'existant.

- [ ] **Step 4 : Build**
```bash
npm run build
```

- [ ] **Step 5 : Commit**
```bash
git add src/app/layout.tsx
git commit -m "fix(seo): suppression fausses reviews + ajout WebSite et Person Schema"
```

---

## Task 2 : Canonical sur les articles de blog

**Files:**
- Modify: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1 : Ajouter `alternates.canonical` dans `generateMetadata`**

Dans la fonction `generateMetadata`, ajouter dans l'objet retourné :
```typescript
alternates: {
  canonical: `https://dvs-web.fr/blog/${post.slug}`,
},
```

- [ ] **Step 2 : Build**
```bash
npm run build
```

- [ ] **Step 3 : Commit**
```bash
git add src/app/blog/[slug]/page.tsx
git commit -m "fix(seo): ajout canonical sur les articles de blog"
```

---

## Task 3 : FAQ Schema sur la page d'accueil

**Note préalable :** `src/app/services/page.tsx` et `src/app/tarifs/page.tsx` ont **déjà** un FAQ Schema complet. Ne pas les modifier.

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1 : Vérifier le contenu actuel de page.tsx**

Le fichier retourne actuellement `<><HeroSection /><AboutSection />...</>`. Il faut ajouter le script JSON-LD comme **premier enfant** du Fragment existant, sans changer la structure.

- [ ] **Step 2 : Ajouter la constante `faqJsonLd` avant le `return`**

```typescript
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
```

- [ ] **Step 3 : Ajouter le script JSON-LD en premier enfant du return**

Le return devient :
```tsx
return (
  <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    <HeroSection />
    <AboutSection />
    <ServicesPreview />
    <ProjectsPreview />
    <TestimonialsSection />
    <CTASection />
  </>
)
```

- [ ] **Step 4 : Build**
```bash
npm run build
```

- [ ] **Step 5 : Commit**
```bash
git add src/app/page.tsx
git commit -m "feat(seo): ajout FAQ Schema sur la page d'accueil"
```

---

## Task 4 : Migration villes-bretagne.ts → villes-france.ts

**Files:**
- Rename/Modify: `src/data/villes-bretagne.ts` → `src/data/villes-france.ts`
- Modify: tous les fichiers qui importent depuis `villes-bretagne`

- [ ] **Step 1 : Identifier tous les fichiers avec l'ancien import**
```bash
grep -r "villes-bretagne" src/
```

- [ ] **Step 2 : Étendre le type `Ville`**

Dans le fichier de données, modifier le type pour ajouter :
```typescript
villesProches: string[]      // slugs des 3-4 villes géographiquement proches
metiersPresents: string[]    // slugs des 5-6 métiers dominants dans cette ville
```

- [ ] **Step 3 : Remplir `villesProches` et `metiersPresents` pour les 30 villes**

Règles :
- `villesProches` : villes du même département ou région, ou avec `distanceRennes` proche
- `metiersPresents` : déduire depuis `secteurEco` et `entreprisesType` existants

Exemples :
```typescript
// rennes
villesProches: ['saint-malo', 'vitré', 'fougeres', 'redon'],
metiersPresents: ['restaurant', 'coiffeur', 'photographe', 'auto-entrepreneur', 'agent-immobilier'],

// brest
villesProches: ['morlaix', 'landerneau', 'quimper', 'lannion'],
metiersPresents: ['restaurant', 'electricien', 'plombier', 'coiffeur', 'macon'],

// nantes
villesProches: ['saint-nazaire', 'angers', 'la-roche-sur-yon', 'cholet'],
metiersPresents: ['restaurant', 'coiffeur', 'photographe', 'plombier', 'auto-entrepreneur'],

// vannes
villesProches: ['lorient', 'auray', 'pontivy', 'rennes'],
metiersPresents: ['restaurant', 'agent-immobilier', 'coiffeur', 'boulanger', 'naturopathe'],

// saint-malo
villesProches: ['dinard', 'rennes', 'dinan', 'granville'],
metiersPresents: ['restaurant', 'boulanger', 'agent-immobilier', 'traiteur', 'photographe'],

// quimper
villesProches: ['brest', 'lorient', 'concarneau', 'douarnenez'],
metiersPresents: ['restaurant', 'boulanger', 'coiffeur', 'artisan', 'traiteur'],

// lorient
villesProches: ['vannes', 'quimper', 'hennebont', 'lanester'],
metiersPresents: ['restaurant', 'electricien', 'plombier', 'macon', 'coiffeur'],

// saint-brieuc
villesProches: ['dinan', 'guingamp', 'lamballe', 'lannion'],
metiersPresents: ['restaurant', 'plombier', 'electricien', 'coiffeur', 'boulanger'],

// lannion
villesProches: ['saint-brieuc', 'guingamp', 'morlaix', 'perros-guirec'],
metiersPresents: ['restaurant', 'auto-entrepreneur', 'photographe', 'electricien', 'coiffeur'],

// dinan
villesProches: ['saint-malo', 'saint-brieuc', 'rennes', 'dinard'],
metiersPresents: ['restaurant', 'boulanger', 'traiteur', 'photographe', 'agent-immobilier'],

// Pour les autres villes, appliquer la même logique en se basant sur secteurEco et entreprisesType
```

- [ ] **Step 4 : Renommer le fichier**
```bash
mv src/data/villes-bretagne.ts src/data/villes-france.ts
```

- [ ] **Step 5 : Mettre à jour tous les imports**

Dans chaque fichier trouvé à l'étape 1, remplacer `@/data/villes-bretagne` par `@/data/villes-france`.

- [ ] **Step 6 : Build**
```bash
npm run build
```

- [ ] **Step 7 : Renommer le tableau exporté `villesBretagne` → `villesFrance` dans le fichier**

Dans `src/data/villes-france.ts`, renommer `export const villesBretagne` en `export const villesFrance`.
Mettre à jour tous les fichiers qui utilisent le nom `villesBretagne` (notamment `sitemap.ts` qui l'importe nommément).

- [ ] **Step 8 : Build**
```bash
npm run build
```

- [ ] **Step 9 : Commit**
```bash
git add src/data/villes-france.ts src/app/creation-site-internet/[ville]/page.tsx src/app/sitemap.ts
git commit -m "refactor(data): migration villes-bretagne vers villes-france + champs villesProches et metiersPresents"
```

---

## Task 5 : Ajout des ~20 nouvelles villes dans villes-france.ts

**Files:**
- Modify: `src/data/villes-france.ts`

- [ ] **Step 1 : Ajouter les 8 villes Normandie**

Dans le tableau `villesBretagne` (renommer en `villesFrance`), ajouter :

```typescript
// Normandie
{ slug: 'caen', nom: 'Caen', departement: 'Calvados', codePostal: '14000', region: 'Normandie', distanceRennes: '172 km', description: 'Caen est la capitale normande, ville universitaire et économique dynamique avec un tissu de PME, services et commerces structurant tout le Calvados.', secteurEco: 'services, commerce, numérique, enseignement supérieur, santé', entreprisesType: 'PME, agences, commerces, professions libérales, startups', villesProches: ['rouen', 'alencon', 'granville', 'le-havre'], metiersPresents: ['restaurant', 'coiffeur', 'electricien', 'plombier', 'photographe'] },
{ slug: 'rouen', nom: 'Rouen', departement: 'Seine-Maritime', codePostal: '76000', region: 'Normandie', distanceRennes: '289 km', description: 'Rouen est la métropole normande, grand centre économique et culturel avec un port actif, un tissu industriel dense et une vie commerciale animée.', secteurEco: 'industrie, logistique, commerce, services, numérique', entreprisesType: 'industriels, commerçants, artisans, PME, prestataires logistiques', villesProches: ['caen', 'le-havre', 'evreux'], metiersPresents: ['restaurant', 'electricien', 'macon', 'plombier', 'coiffeur'] },
{ slug: 'le-havre', nom: 'Le Havre', departement: 'Seine-Maritime', codePostal: '76600', region: 'Normandie', distanceRennes: '289 km', description: "Le Havre est le premier port français de marchandises, avec un tissu industriel et logistique majeur et une vie commerciale et culturelle en pleine renaissance.", secteurEco: 'logistique, industrie portuaire, commerce, services, numérique', entreprisesType: 'transporteurs, industriels, commerçants, artisans, prestataires portuaires', villesProches: ['rouen', 'caen', 'evreux'], metiersPresents: ['restaurant', 'electricien', 'macon', 'plombier', 'couvreur'] },
{ slug: 'cherbourg', nom: 'Cherbourg-en-Cotentin', departement: 'Manche', codePostal: '50100', region: 'Normandie', distanceRennes: '198 km', description: 'Cherbourg est une ville portuaire et industrielle de la Manche, avec un secteur naval et militaire structurant, un commerce de proximité et un tissu de PME actif.', secteurEco: 'défense, industrie navale, commerce, services, numérique', entreprisesType: 'industriels, sous-traitants navals, artisans, commerces, professions libérales', villesProches: ['caen', 'granville', 'alencon'], metiersPresents: ['electricien', 'plombier', 'macon', 'restaurant', 'coiffeur'] },
{ slug: 'evreux', nom: 'Évreux', departement: 'Eure', codePostal: '27000', region: 'Normandie', distanceRennes: '289 km', description: "Évreux, chef-lieu de l'Eure, est un bassin d'emploi industriel et de services avec un tissu de PME, artisans et commerces bien établis.", secteurEco: 'industrie, services, commerce, agroalimentaire, PME', entreprisesType: 'PME industrielles, artisans, commerces, prestataires de services', villesProches: ['rouen', 'caen', 'alencon'], metiersPresents: ['plombier', 'electricien', 'macon', 'coiffeur', 'restaurant'] },
{ slug: 'alencon', nom: 'Alençon', departement: 'Orne', codePostal: '61000', region: 'Normandie', distanceRennes: '155 km', description: "Alençon est une ville à l'économie industrielle et artisanale diversifiée, connue pour sa dentelle et son tissu de PME et services au cœur de l'Orne.", secteurEco: 'industrie, artisanat, services, commerce, PME', entreprisesType: 'PME, artisans, commerçants, professions libérales', villesProches: ['caen', 'evreux', 'le-mans', 'fougeres'], metiersPresents: ['plombier', 'electricien', 'menuisier', 'coiffeur', 'boulanger'] },
{ slug: 'granville', nom: 'Granville', departement: 'Manche', codePostal: '50400', region: 'Normandie', distanceRennes: '100 km', description: "Granville est une station balnéaire et port de pêche normand, avec un tourisme actif, un commerce local vivant et une économie maritime bien implantée.", secteurEco: 'tourisme, pêche, commerce, nautisme, restauration', entreprisesType: 'hôtels, restaurants, commerces touristiques, artisans, prestataires nautiques', villesProches: ['saint-malo', 'cherbourg', 'caen', 'rennes'], metiersPresents: ['restaurant', 'boulanger', 'coiffeur', 'agent-immobilier', 'plombier'] },
{ slug: 'lisieux', nom: 'Lisieux', departement: 'Calvados', codePostal: '14100', region: 'Normandie', distanceRennes: '242 km', description: "Lisieux est une ville de pèlerinage et un bassin commercial du Pays d'Auge, avec un artisanat local, des commerces de proximité et un tourisme religieux important.", secteurEco: 'tourisme, commerce, artisanat, services, agriculture', entreprisesType: 'artisans, commerces, hôtels, restaurateurs, prestataires de services', villesProches: ['caen', 'rouen', 'evreux'], metiersPresents: ['restaurant', 'boulanger', 'coiffeur', 'plombier', 'electricien'] },
// Pays de la Loire (complément)
{ slug: 'angers', nom: 'Angers', departement: 'Maine-et-Loire', codePostal: '49000', region: 'Pays de la Loire', distanceRennes: '127 km', description: "Angers est une métropole dynamique du Maine-et-Loire, pôle universitaire, viticole et numérique, avec un tissu entrepreneurial en fort développement.", secteurEco: 'numérique, viticulture, commerce, services, enseignement supérieur', entreprisesType: 'startups, vignerons, commerçants, artisans, PME de services', villesProches: ['nantes', 'le-mans', 'laval', 'saumur'], metiersPresents: ['restaurant', 'coiffeur', 'photographe', 'auto-entrepreneur', 'traiteur'] },
{ slug: 'le-mans', nom: 'Le Mans', departement: 'Sarthe', codePostal: '72000', region: 'Pays de la Loire', distanceRennes: '155 km', description: "Le Mans est une ville industrielle et automobile de renom, avec un tissu de sous-traitants, PME et services bien structuré autour de la course et de l'industrie.", secteurEco: 'automobile, industrie, services, commerce, logistique', entreprisesType: "sous-traitants auto, PME, artisans, commerçants, prestataires industriels", villesProches: ['angers', 'laval', 'alencon', 'tours'], metiersPresents: ['electricien', 'plombier', 'macon', 'restaurant', 'coiffeur'] },
{ slug: 'la-roche-sur-yon', nom: 'La Roche-sur-Yon', departement: 'Vendée', codePostal: '85000', region: 'Pays de la Loire', distanceRennes: '171 km', description: "La Roche-sur-Yon est la préfecture vendéenne, ville administrative et commerciale avec un tissu de PME, artisans et services en plein développement.", secteurEco: 'services, commerce, PME, artisanat, agriculture', entreprisesType: 'PME, artisans, commerces, professions libérales, prestataires de services', villesProches: ['nantes', 'cholet', 'les-sables-dolonne'], metiersPresents: ['plombier', 'electricien', 'coiffeur', 'restaurant', 'macon'] },
{ slug: 'laval', nom: 'Laval', departement: 'Mayenne', codePostal: '53000', region: 'Pays de la Loire', distanceRennes: '76 km', description: "Laval est un bassin économique mayennais avec un tissu industriel agroalimentaire solide, des PME actives et une filière numérique en développement.", secteurEco: 'agroalimentaire, industrie, numérique, services, PME', entreprisesType: 'PME agroalimentaires, industriels, artisans, commerçants', villesProches: ['rennes', 'le-mans', 'angers', 'fougeres'], metiersPresents: ['electricien', 'plombier', 'macon', 'boulanger', 'restaurant'] },
{ slug: 'cholet', nom: 'Cholet', departement: 'Maine-et-Loire', codePostal: '49300', region: 'Pays de la Loire', distanceRennes: '162 km', description: "Cholet est une ville industrielle et commerciale dynamique, connue pour son textile et son tissu de PME et commerces bien développé.", secteurEco: 'industrie, commerce, PME, textile, logistique', entreprisesType: 'PME industrielles, commerçants, artisans, prestataires logistiques', villesProches: ['nantes', 'angers', 'la-roche-sur-yon'], metiersPresents: ['electricien', 'plombier', 'couvreur', 'restaurant', 'coiffeur'] },
{ slug: 'les-sables-dolonne', nom: "Les Sables-d'Olonne", departement: 'Vendée', codePostal: '85100', region: 'Pays de la Loire', distanceRennes: '190 km', description: "Les Sables-d'Olonne est une station balnéaire prisée et port de pêche vendéen, avec un tourisme saisonnier intense et une économie maritime vivante.", secteurEco: 'tourisme balnéaire, pêche, restauration, commerce, nautisme', entreprisesType: 'hôtels, restaurants, commerces touristiques, artisans, prestataires nautiques', villesProches: ['la-roche-sur-yon', 'nantes', 'cholet'], metiersPresents: ['restaurant', 'boulanger', 'coiffeur', 'agent-immobilier', 'traiteur'] },
{ slug: 'saumur', nom: 'Saumur', departement: 'Maine-et-Loire', codePostal: '49400', region: 'Pays de la Loire', distanceRennes: '166 km', description: "Saumur est une ville viticole et touristique du Val de Loire, avec un artisanat local, un tourisme œnotouristique actif et un commerce de proximité bien établi.", secteurEco: 'viticulture, tourisme, artisanat, commerce, équitation', entreprisesType: 'vignerons, artisans, restaurateurs, hôteliers, commerces', villesProches: ['angers', 'tours', 'le-mans'], metiersPresents: ['restaurant', 'boulanger', 'traiteur', 'coiffeur', 'agent-immobilier'] },
{ slug: 'mayenne', nom: 'Mayenne', departement: 'Mayenne', codePostal: '53100', region: 'Pays de la Loire', distanceRennes: '91 km', description: "Mayenne est une ville industrielle et agricole mayennaise avec un tissu de PME agroalimentaires, d'artisans et de services locaux bien développés.", secteurEco: 'agroalimentaire, industrie, agriculture, services, artisanat', entreprisesType: 'PME agroalimentaires, artisans, agriculteurs, commerces', villesProches: ['laval', 'fougeres', 'alencon'], metiersPresents: ['plombier', 'electricien', 'macon', 'boulanger', 'couvreur'] },
// Val de Loire
{ slug: 'tours', nom: 'Tours', departement: 'Indre-et-Loire', codePostal: '37000', region: 'Centre-Val de Loire', distanceRennes: '234 km', description: "Tours est la métropole tourangelle, ville universitaire et touristique au cœur des châteaux de la Loire, avec un tissu de services, commerces et PME très dynamique.", secteurEco: 'tourisme, services, numérique, commerce, enseignement supérieur', entreprisesType: 'agences, commerçants, artisans, PME, prestataires touristiques', villesProches: ['le-mans', 'angers', 'saumur', 'blois'], metiersPresents: ['restaurant', 'coiffeur', 'photographe', 'traiteur', 'auto-entrepreneur'] },
{ slug: 'orleans', nom: 'Orléans', departement: 'Loiret', codePostal: '45000', region: 'Centre-Val de Loire', distanceRennes: '310 km', description: "Orléans est une métropole dynamique du Val de Loire, centre logistique et économique majeur avec un tissu de PME, services et commerces bien structuré.", secteurEco: 'logistique, services, commerce, numérique, cosmétique', entreprisesType: 'PME, industriels, commerçants, artisans, startups', villesProches: ['tours', 'blois', 'chartres'], metiersPresents: ['electricien', 'plombier', 'restaurant', 'coiffeur', 'photographe'] },
{ slug: 'blois', nom: 'Blois', departement: 'Loir-et-Cher', codePostal: '41000', region: 'Centre-Val de Loire', distanceRennes: '268 km', description: "Blois est une ville touristique et résidentielle du Val de Loire, avec un tissu d'artisans locaux, de commerces et de prestataires touristiques actifs.", secteurEco: 'tourisme, commerce, artisanat, services, agriculture', entreprisesType: 'artisans, restaurateurs, hôteliers, commerçants, professions libérales', villesProches: ['tours', 'orleans', 'le-mans'], metiersPresents: ['restaurant', 'boulanger', 'coiffeur', 'plombier', 'agent-immobilier'] },
{ slug: 'chartres', nom: 'Chartres', departement: 'Eure-et-Loir', codePostal: '28000', region: 'Centre-Val de Loire', distanceRennes: '298 km', description: "Chartres est une ville industrielle et touristique à la cathédrale mondialement connue, avec un tissu de PME et de services structurant tout l'Eure-et-Loir.", secteurEco: 'industrie, services, tourisme, cosmétique, commerce', entreprisesType: 'PME industrielles, artisans, commerçants, restaurateurs, prestataires', villesProches: ['orleans', 'le-mans', 'evreux'], metiersPresents: ['electricien', 'plombier', 'macon', 'restaurant', 'coiffeur'] },
```

- [ ] **Step 2 : Vérifier que le renommage `villesBretagne` → `villesFrance` est déjà fait (Task 4 Step 7)**

Le renommage du tableau exporté a été effectué en Task 4. Vérifier que les imports dans `sitemap.ts` et `creation-site-internet/[ville]/page.tsx` pointent bien vers `villesFrance`.

- [ ] **Step 3 : Build**
```bash
npm run build
```
Vérifier dans l'output que ~50 routes `/creation-site-internet/...` sont générées.

- [ ] **Step 4 : Commit**
```bash
git add src/data/villes-france.ts
git commit -m "feat(seo): ajout de 20 nouvelles villes du grand Ouest (Normandie, Pays de la Loire, Val de Loire)"
```

---

## Task 6 : Enrichissement page ville — maillage métiers + villes proches

**Files:**
- Modify: `src/app/creation-site-internet/[ville]/page.tsx`

Note : cette task dépend de Task 4 (villes-france.ts avec nouveaux champs) et Task 7 (metiers.ts). Implémenter après ces deux tasks.

- [ ] **Step 1 : Mettre à jour les imports et améliorer `generateMetadata`**

En haut du fichier, mettre à jour l'import existant et ajouter le nouveau :
```typescript
// Remplacer l'import depuis villes-bretagne :
import { villesFrance, getVilleBySlug } from '@/data/villes-france'
// Ajouter :
import { getMetierBySlug } from '@/data/metiers'
```

Dans `generateMetadata`, améliorer le `description` pour inclure `secteurEco` :
```typescript
const description = ville.secteurEco
  ? `Création de site internet à ${ville.nom} (${ville.departement}). Evan Davison accompagne les professionnels du secteur ${ville.secteurEco}. Devis gratuit.`
  : `Création de site internet à ${ville.nom} (${ville.departement}). Sites vitrines, e-commerce et applications web sur-mesure. Devis gratuit.`
```

- [ ] **Step 2 : Ajouter la section "Métiers locaux" après la section Process**

```tsx
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
                href={`/site-internet-pour/${metierSlug}`}
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
```

- [ ] **Step 3 : Ajouter la section "Villes proches" juste avant le CTA**

```tsx
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
```

- [ ] **Step 4 : Build**
```bash
npm run build
```

- [ ] **Step 5 : Commit**
```bash
git add src/app/creation-site-internet/[ville]/page.tsx
git commit -m "feat(seo): maillage interne villes proches et métiers sur les pages villes"
```

---

## Task 7 : Créer src/data/metiers.ts

**Files:**
- Create: `src/data/metiers.ts`

- [ ] **Step 1 : Créer le fichier avec le type Metier**

```typescript
export type Metier = {
  slug: string
  nom: string
  nomPluriel: string
  secteur: string
  description: string
  besoinsSpecifiques: string[]
  villesPrincipales: string[]
}

export function getMetierBySlug(slug: string): Metier | undefined {
  return metiers.find((m) => m.slug === slug)
}
```

- [ ] **Step 2 : Remplir le tableau `metiers` avec les 20 métiers**

Artisans du bâtiment (8) : plombier, electricien, macon, peintre, menuisier, couvreur, carreleur, chauffagiste

Pour chaque métier, remplir :
- `besoinsSpecifiques` : 4 points spécifiques au métier (formulaire urgences, certifications, galerie, etc.)
- `villesPrincipales` : 6 slugs parmi les grandes villes — toujours inclure : `rennes`, `nantes`, `brest`, puis 3 villes pertinentes

Beauté/bien-être (4) : coiffeur, estheticienne, naturopathe, coach-sportif

Restauration (4) : restaurant, boulanger, traiteur, food-truck

Services (4) : photographe, auto-entrepreneur, agent-immobilier, et un quatrième au choix (ex: kinesitherapeute)

- [ ] **Step 3 : Build**
```bash
npm run build
```

- [ ] **Step 4 : Commit**
```bash
git add src/data/metiers.ts
git commit -m "feat(data): création du fichier de données métiers avec 20 métiers artisans"
```

---

## Task 8 : Créer la route /site-internet-pour/[metier]

**Files:**
- Create: `src/app/site-internet-pour/[metier]/page.tsx`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1 : Créer le fichier de la page**

Structure complète à implémenter :
```typescript
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { metiers, getMetierBySlug } from '@/data/metiers'
import { getVilleBySlug } from '@/data/villes-france'

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
    openGraph: { title, description, url: `https://dvs-web.fr/site-internet-pour/${metier.slug}`, type: 'website' },
  }
}
```

- [ ] **Step 2 : Ajouter les 3 schemas JSON-LD (Service, BreadcrumbList, FAQPage)**

Dans le composant page, avant le return, construire :
- `serviceJsonLd` : Service Schema avec le nom du métier
- `breadcrumbJsonLd` : Accueil > Site internet pour > [Métier]
- `faqJsonLd` : 4 questions localisées sur le métier (coût, pages, visibilité Google, délai)

- [ ] **Step 3 : Implémenter le JSX**

Sections dans l'ordre :
1. Hero avec H1 "Site internet pour [Métier]" + CTA
2. Section "Ce qu'un bon site de [métier] doit avoir" (liste `metier.besoinsSpecifiques` avec icônes Check)
3. Section "Ce qu'Evan propose" : 3 points génériques (design sur-mesure, SEO inclus, support après livraison)
4. Section FAQ (afficher les questions/réponses du faqJsonLd avec H3)
5. Section maillage villes (tags cliquables depuis `metier.villesPrincipales`)
6. CTA final

- [ ] **Step 4 : Ajouter les pages métiers au sitemap**

Dans `src/app/sitemap.ts`, importer `metiers` et ajouter les routes `/site-internet-pour/[slug]` avec priority 0.7.

- [ ] **Step 5 : Build**
```bash
npm run build
```
Vérifier dans l'output que ~20 routes `/site-internet-pour/...` sont générées.

- [ ] **Step 6 : Commit**
```bash
git add src/app/site-internet-pour/ src/app/sitemap.ts
git commit -m "feat(seo): ajout des pages métiers /site-internet-pour/[metier] avec maillage villes"
```

---

## Task 9 : Nouveaux articles de blog (8 articles)

**Files:**
- Create: `src/content/blog/combien-coute-site-internet-plombier.md`
- Create: `src/content/blog/pourquoi-artisan-besoin-site-internet.md`
- Create: `src/content/blog/site-internet-artisan-vs-google-my-business.md`
- Create: `src/content/blog/comment-attirer-clients-site-artisan.md`
- Create: `src/content/blog/site-internet-restaurant-guide.md`
- Create: `src/content/blog/erreurs-site-internet-artisan.md`
- Create: `src/content/blog/site-internet-coiffeur-guide.md`
- Create: `src/content/blog/delai-creation-site-internet.md`

- [ ] **Step 1 : Lire un article existant pour comprendre le format frontmatter exact**
```bash
# Lire src/content/blog/combien-coute-site-vitrine-rennes.md
# et src/lib/blog.ts pour comprendre les champs utilisés
```

- [ ] **Step 2 : Créer les 8 articles**

Pour chaque article, respecter le frontmatter exact du projet et cette structure de contenu :
- H1 = titre exact avec le mot-clé cible
- Introduction 150 mots max, mot-clé dans les 100 premiers mots
- Sommaire ancré (liens vers les H2)
- 4-5 sections H2 bien hiérarchisées
- Section "FAQ" avec 3+ questions (H3 pour chaque question)
- CTA vers `/contact`
- 2-3 liens internes vers `/site-internet-pour/[metier]` ou `/creation-site-internet/[ville]`

Articles à créer avec leurs mots-clés cibles :
- `combien-coute-site-internet-plombier.md` → "Combien coûte un site internet pour un plombier ?"
- `pourquoi-artisan-besoin-site-internet.md` → "Pourquoi un artisan a besoin d'un site internet en 2026"
- `site-internet-artisan-vs-google-my-business.md` → "Site internet ou fiche Google My Business : que choisir ?"
- `comment-attirer-clients-site-artisan.md` → "Comment attirer plus de clients avec son site artisan"
- `site-internet-restaurant-guide.md` → "Créer un site internet pour son restaurant : le guide complet"
- `erreurs-site-internet-artisan.md` → "Les 7 erreurs à éviter sur le site internet d'un artisan"
- `site-internet-coiffeur-guide.md` → "Site internet pour coiffeur : tout ce qu'il faut savoir"
- `delai-creation-site-internet.md` → "Quel délai pour créer un site internet professionnel ?"

- [ ] **Step 3 : Build**
```bash
npm run build
```

- [ ] **Step 4 : Commit**
```bash
git add src/content/blog/
git commit -m "feat(blog): ajout de 8 articles ciblés artisans et TPE"
```

---

## Task 10 : Mise à jour des articles existants

**Files:**
- Modify: `src/content/blog/*.md` (10 fichiers existants)
- Modify: `src/app/blog/[slug]/page.tsx` — ajouter FAQ Schema dynamique

- [ ] **Step 1 : Lister les 10 articles existants**
```bash
ls src/content/blog/
```

- [ ] **Step 2 : Ajouter FAQ Schema dynamique dans blog/[slug]/page.tsx**

Le `alternates.canonical` est déjà ajouté en Task 2. Ajouter maintenant le FAQ Schema dynamique.

Lire `src/lib/blog.ts` pour voir si les posts ont un champ `faq`. Si non, ajouter à la fin de chaque article Markdown (existant et nouveau) une section `## FAQ` parsée manuellement, ou simplement injecter 3 questions génériques sur tous les articles :

```typescript
// Dans src/app/blog/[slug]/page.tsx, après breadcrumbJsonLd :
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Combien coûte la création d\'un site internet ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Un site vitrine professionnel démarre à partir de ~600€. Devis gratuit sur demande.' },
    },
    {
      '@type': 'Question',
      name: 'Travaillez-vous avec des artisans ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui, j\'accompagne des plombiers, électriciens, coiffeurs, restaurateurs et tout type d\'artisan ou TPE en Bretagne et grand Ouest.' },
    },
    {
      '@type': 'Question',
      name: 'Comment me contacter pour un projet ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Via le formulaire de contact sur dvs-web.fr/contact ou directement par email à contact@dvs-web.fr.' },
    },
  ],
}
```

Injecter un troisième `<script type="application/ld+json">` pour `faqJsonLd` dans le return.

- [ ] **Step 3 : Ajouter 2-3 liens internes pertinents dans chaque article existant**

Pour chaque article, identifier le métier ou la ville pertinente et ajouter des liens Markdown :
- `seo-local-artisan-rennes.md` → lien vers `/creation-site-internet/rennes` et `/site-internet-pour/restaurant`
- `site-internet-artisan-guide.md` → lien vers `/site-internet-pour/plombier` et `/site-internet-pour/electricien`
- `application-mobile-pme.md` → lien vers `/services`
- `boutique-en-ligne-tpe-guide.md` → lien vers `/services`
- Adapter pour les autres articles selon le contenu

- [ ] **Step 4 : Build**
```bash
npm run build
```

- [ ] **Step 5 : Commit**
```bash
git add src/content/blog/ src/app/blog/[slug]/page.tsx
git commit -m "feat(seo): FAQ Schema et maillage interne ajoutés aux articles de blog existants"
```

---

## Task 11 : Vérification finale et déploiement

- [ ] **Step 1 : Build et lint complets**
```bash
npm run build && npm run lint
```
Résultat attendu : 0 erreur.

- [ ] **Step 2 : Vérifier le sitemap**

Lancer le serveur de dev, ouvrir `http://localhost:3000/sitemap.xml` et vérifier la présence de :
- ~50 URLs `/creation-site-internet/...`
- ~20 URLs `/site-internet-pour/...`
- ~18 URLs `/blog/...`
- Les pages statiques

```bash
npm run dev
```

- [ ] **Step 3 : Valider les schemas JSON-LD sur 4 pages**

Via [Google Rich Results Test](https://search.google.com/test/rich-results) (ou outil local), tester :
- Page d'accueil : FAQPage attendu
- `/creation-site-internet/rennes` : FAQPage + BreadcrumbList attendus
- `/site-internet-pour/plombier` : FAQPage + BreadcrumbList attendus
- `/blog/[un-article]` : BlogPosting + BreadcrumbList attendus

- [ ] **Step 4 : Vérifier Core Web Vitals**

Tester via [PageSpeed Insights](https://pagespeed.web.dev/) sur la page d'accueil en mobile.
Cibles : LCP < 2.5s, CLS < 0.1.

- [ ] **Step 5 : Documenter la baseline SEO**

Créer `docs/seo-baseline.md` avec :
- Date de déploiement
- Sessions organiques actuelles (depuis GA4)
- Impressions et clics GSC actuels
- Positions actuelles sur "création site internet rennes", "création site internet nantes", etc.

- [ ] **Step 6 : Déployer**
```bash
git push origin main
```

- [ ] **Step 7 : Soumettre le sitemap dans Google Search Console**

Dans GSC > Sitemaps > Ajouter un sitemap : `https://dvs-web.fr/sitemap.xml`

- [ ] **Step 8 : Actions hors-code (tâches manuelles)**
- [ ] Créer/optimiser la fiche Google Business Profile (catégorie "Développeur de logiciels", zone Bretagne + grand Ouest, lien vers dvs-web.fr)
- [ ] Vérifier que le profil LinkedIn pointe vers dvs-web.fr
- [ ] S'inscrire sur Malt avec lien vers dvs-web.fr
- [ ] S'inscrire sur Codeur.com avec lien vers dvs-web.fr
- [ ] S'inscrire sur Pages Jaunes avec lien vers dvs-web.fr
