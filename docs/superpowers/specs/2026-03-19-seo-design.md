# Stratégie SEO Full Stack — DVS Web

**Date :** 2026-03-19
**Objectif :** Maximiser le trafic organique qualifié pour attirer des clients TPE/artisans locaux, entrepreneurs et PME via dvs-web.fr.

---

## Contexte

Site existant : Next.js 14 App Router, déjà indexé avec trafic organique faible.
Acquis SEO actuels : 30 pages locales Bretagne, 10 articles blog, JSON-LD LocalBusiness, sitemap dynamique, OG tags.

Cible prioritaire : artisans et TPE locaux (plombier, coiffeur, boulanger, restaurateur...) qui cherchent leur premier site internet.

---

## Axe 1 — Corrections techniques urgentes

### 1.1 Supprimer les fausses reviews du JSON-LD
Le layout racine déclare `aggregateRating` avec `reviewCount: 5` sans avis réels vérifiables.
Google peut pénaliser les fausses reviews structurées. Supprimer le bloc `aggregateRating` jusqu'à obtenir de vrais avis.

### 1.2 Compléter le JSON-LD racine
Ajouter au `layout.tsx` :
- `WebSite` Schema avec `SearchAction` (sitelinks searchbox)
- `Person` Schema pour Evan Davison en complément du `LocalBusiness`

### 1.3 `generateMetadata` sur les pages villes
Chaque page `/creation-site-internet/[ville]` génère dynamiquement :
- `title` : `"Création site internet [Ville] | DVS Web"`
- `description` : texte unique intégrant `description` + `secteurEco` depuis les données de la ville
- `alternates.canonical` : URL propre sans trailing slash
- `openGraph` avec titre et description localisés

### 1.4 Canonical explicite sur tous les types de pages
- Pages villes : via `generateMetadata`
- Pages métiers : via `generateMetadata`
- Articles de blog : le `generateMetadata` existant doit être complété avec `alternates.canonical`
- Pages statiques : vérifier que toutes ont un canonical

### 1.5 FAQ Schema (`FAQPage`) sur les pages stratégiques
Injecter un bloc `FAQPage` JSON-LD sur :
- Page d'accueil (4 questions générales)
- Page services, page tarifs
- Chaque page ville (4 questions localisées)
- Chaque page métier (4 questions spécifiques)
- Chaque article de blog (questions de la section FAQ de l'article)

### 1.6 BreadcrumbList Schema
Ajouter sur les pages villes et métiers :
```
Accueil > Création site internet > [Ville]
Accueil > Site internet pour > [Métier]
```

---

## Axe 2 — Enrichissement + Extension des pages locales

### 2.1 Structure de données étendue

Renommer `villes-bretagne.ts` en `villes-france.ts` et mettre à jour tous les imports.
Ajouter les champs suivants au type `Ville` :
```typescript
villesProches: string[]        // slugs des 3-4 villes géographiquement proches
metiersPresents: string[]      // slugs des 5-6 métiers dominants dans cette ville
```

Ces champs alimentent le maillage interne automatique entre pages villes et pages métiers.

### 2.2 Enrichissement des 30 pages villes existantes

Structure cible de chaque page ville — ratio cible : 50%+ de contenu unique par page.

1. **Hero** : H1 `"Création site internet à [Ville] — DVS Web"`, sous-titre localisé
2. **Intro locale** : paragraphe unique basé sur `description` + `secteurEco` de la ville (unique)
3. **Section métiers locaux** : liste basée sur `metiersPresents` de la ville, avec liens vers pages métiers (unique par ville)
4. **Section services** : fonctionnalités proposées (identique — section partagée acceptable si les sections 2, 3, 5, 6 sont uniques)
5. **FAQ locale** : 4 questions avec le nom de la ville dans l'énoncé (unique)
   - "Combien coûte un site internet à [Ville] ?"
   - "Quel délai pour créer un site à [Ville] ?"
   - "Vous intervenez à [Ville] ?"
   - "Quels types d'entreprises accompagnez-vous à [Ville] ?"
6. **Maillage villes proches** : liens vers les pages des `villesProches` (unique par ville)

Le ratio contenu unique / contenu partagé doit être d'au moins 50% du contenu visible.

### 2.3 Extension géographique — Grand Ouest uniquement

L'extension est limitée au grand Ouest (rayon ~300 km de Rennes) pour maintenir la crédibilité géographique d'un freelance solo. Paris, Lyon, Bordeaux, Lille sont exclus — trop concurrentiels et pas crédibles sans présence physique.

**Normandie (~8 villes) :**
Caen, Rouen, Le Havre, Cherbourg-en-Cotentin, Évreux, Alençon, Lisieux, Granville

**Pays de la Loire — compléter (~8 villes) :**
Angers, Le Mans, La Roche-sur-Yon, Laval, Cholet, Les Sables-d'Olonne, Saumur, Mayenne

**Val de Loire (~4 villes) :**
Tours, Orléans, Blois, Chartres

Total extension : ~20 nouvelles villes → ~50 pages locales au total.

---

## Axe 3 — Pages par métier (nouvelle route)

### 3.1 Structure de données

Créer `src/data/metiers.ts` avec le type :
```typescript
type Metier = {
  slug: string
  nom: string            // "Plombier"
  nomPluriel: string     // "Plombiers"
  secteur: string        // "Artisanat du bâtiment"
  description: string    // Pourquoi ce métier a besoin d'un site
  besoinsSpecifiques: string[]   // Points clés pour ce métier
  villesPrincipales: string[]    // slugs des 5-6 villes principales (Rennes, Nantes, Brest...)
}
```

Liste des ~20 métiers :
- Bâtiment : plombier, electricien, macon, peintre, menuisier, couvreur, carreleur, chauffagiste
- Beauté/bien-être : coiffeur, estheticienne, naturopathe, coach-sportif
- Restauration : restaurant, boulanger, traiteur, food-truck
- Services : photographe, auto-entrepreneur, agent-immobilier

### 3.2 Route `/site-internet-pour/[metier]`

Structure de chaque page métier :
1. **Hero** : H1 `"Site internet pour [Métier] — DVS Web"`, promesse spécifique
2. **Pourquoi ce métier a besoin d'un site** : 3-4 points issus de `besoinsSpecifiques`
3. **Ce qu'Evan propose** : fonctionnalités adaptées à ce métier
4. **FAQ métier** : 4 questions
   - "Combien coûte un site internet pour un [Métier] ?"
   - "Quelles pages doit avoir le site d'un [Métier] ?"
   - "Mon site de [Métier] sera-t-il visible sur Google ?"
   - "Quel délai pour créer un site [Métier] ?"
5. **Maillage géographique** : liens vers les `villesPrincipales` de ce métier

### 3.3 Graphe de maillage interne ville × métier

Règles précises :
- **Page ville → pages métiers** : afficher les métiers listés dans `metiersPresents` de la ville, chacun lié vers `/site-internet-pour/[metier]`
- **Page métier → pages villes** : afficher les villes listées dans `villesPrincipales` du métier, chacune liée vers `/creation-site-internet/[ville]`
- **Pas de page hybride** `/site-internet-pour/[metier]-[ville]` — éviter la création de doorway pages
- Les liens croisés s'affichent sous forme de grilles de tags en bas de chaque page

---

## Axe 4 — Stratégie blog artisans

### 4.1 Mise à jour des 10 articles existants
- Ajouter `alternates.canonical` dans `generateMetadata`
- Ajouter FAQ Schema JSON-LD
- Ajouter des liens internes vers les pages villes et métiers pertinentes
- Vérifier title/description uniques et optimisés

### 4.2 Nouveaux articles (~8 articles)

| Slug | Titre cible |
|---|---|
| `combien-coute-site-internet-plombier` | Combien coûte un site internet pour un plombier ? |
| `pourquoi-artisan-besoin-site-internet` | Pourquoi un artisan a besoin d'un site internet en 2026 |
| `site-internet-artisan-vs-google-my-business` | Site internet ou fiche Google My Business : que choisir ? |
| `comment-attirer-clients-site-artisan` | Comment attirer plus de clients avec son site artisan |
| `site-internet-restaurant-guide` | Créer un site internet pour son restaurant : le guide complet |
| `erreurs-site-internet-artisan` | Les 7 erreurs à éviter sur le site internet d'un artisan |
| `site-internet-coiffeur-guide` | Site internet pour coiffeur : tout ce qu'il faut savoir |
| `delai-creation-site-internet` | Quel délai pour créer un site internet professionnel ? |

### 4.3 Structure type d'un article
- H1 avec le mot-clé exact, mot-clé dans les 100 premiers mots
- Introduction courte (150 mots max)
- Sommaire ancré
- Sections H2/H3 hiérarchisées
- FAQ en fin d'article (3+ questions) → FAQ Schema
- CTA vers formulaire de contact
- Liens internes : 2-3 liens vers pages métiers/villes concernées

---

## Axe 5 — SEO local et performance

### 5.1 Google Business Profile
Créer ou optimiser la fiche Google Business Profile d'Evan Davison :
- Catégorie principale : "Développeur de logiciels"
- Zone de service : Bretagne + grand Ouest
- Lien vers dvs-web.fr
- Demander des avis clients aux premiers clients satisfaits

### 5.2 Google Search Console
Vérifier que GSC est configuré et les sitemap soumis. Outils à mettre en place :
- Soumettre sitemap.xml dans GSC
- Surveiller Coverage et Core Web Vitals dans GSC
- Identifier les requêtes avec impressions mais faible CTR pour optimiser les titles/descriptions

### 5.3 Core Web Vitals
Objectifs cibles (mesurables via PageSpeed Insights / GSC) :
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms

Points à vérifier :
- `IntroAnimation` et `ScrollReveal` — s'assurer que les animations ne causent pas de CLS
- Toutes les images via `next/image` avec dimensions explicites
- `generateStaticParams` sur toutes les routes dynamiques pour le SSG

### 5.4 Backlinks minimaux
Actions à prioriser pour l'autorité de domaine :
- Inscription sur Malt et Codeur.com avec lien vers dvs-web.fr
- Profil LinkedIn pointant vers dvs-web.fr
- Annuaires locaux : Pages Jaunes, Kompass, annuaires bretons
- Partenariats éventuels avec graphistes/imprimeurs locaux (échanges de liens)

---

## Volume de pages SEO à terme

| Type | Actuel | Cible |
|---|---|---|
| Pages locales villes | 30 | ~50 |
| Pages métiers | 0 | ~20 |
| Articles blog | 10 | ~18 |
| Pages statiques | ~8 | ~8 |
| **Total** | **~48** | **~96** |

---

## Critères de succès

### Métriques techniques (vérifiables dès le déploiement)
- 0 fausse review dans le JSON-LD
- 100% des pages villes avec `generateMetadata` unique
- 100% des pages stratégiques avec FAQ Schema valide (Google Rich Results Test)
- LCP < 2.5s sur mobile (PageSpeed Insights)
- Sitemap soumis dans GSC, 0 erreur de crawl critique

### Métriques SEO (à mesurer 3 et 6 mois après déploiement via GSC + GA4)
- Baseline actuelle à documenter avant déploiement : sessions organiques/mois, impressions GSC, positions moyennes
- Objectif 3 mois : +50% d'impressions GSC par rapport à la baseline
- Objectif 6 mois : top 10 sur au moins 5 requêtes "création site internet [ville bretagne]"
- Objectif 6 mois : au moins 1 article blog en position 1-3 sur sa requête cible

---

## Contraintes techniques

- `generateStaticParams` sur toutes les routes dynamiques (villes, métiers, blog)
- Contenu des pages villes et métiers généré à partir des fichiers TypeScript — pas de hardcode dans les composants
- FAQ Schema injectée via `<script type="application/ld+json">` dans les composants page ou via `generateMetadata`
- Ratio minimum 50% contenu unique sur les pages villes
- Pas de pages hybrides `/[metier]-[ville]` (risque doorway pages)
- Renommer `villes-bretagne.ts` → `villes-france.ts` + mettre à jour tous les imports
