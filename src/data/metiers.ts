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

export const metiers: Metier[] = [
  // Artisans du bâtiment
  {
    slug: "plombier",
    nom: "Plombier",
    nomPluriel: "Plombiers",
    secteur: "Artisanat du bâtiment",
    description:
      "Un plombier a besoin d'un site internet pour être trouvé localement lors des urgences et pour présenter ses certifications professionnelles qui rassurent les clients avant de les appeler.",
    besoinsSpecifiques: [
      "Formulaire de contact urgences 24h/7j",
      "Page certifications RGE et Qualibat",
      "Galerie avant/après des interventions",
      "Zone géographique d'intervention clairement indiquée",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "saint-malo", "vannes", "lorient"],
  },
  {
    slug: "menuisier",
    nom: "Menuisier",
    nomPluriel: "Menuisiers",
    secteur: "Artisanat du bâtiment",
    description:
      "Un menuisier a besoin d'un site internet pour exposer ses réalisations sur mesure et démontrer son savoir-faire à des clients qui comparent plusieurs artisans avant de prendre leur décision.",
    besoinsSpecifiques: [
      "Galerie photos haute qualité des réalisations sur mesure",
      "Page sur les essences de bois et matériaux utilisés",
      "Formulaire de demande de devis avec dimensions et spécifications",
      "Page certifications (Qualibois, label Artisan)",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "saint-brieuc", "quimper", "vannes"],
  },
  {
    slug: "electricien",
    nom: "Électricien",
    nomPluriel: "Électriciens",
    secteur: "Artisanat du bâtiment",
    description:
      "Un électricien a besoin d'un site internet pour rassurer les clients sur ses habilitations électriques et être référencé localement pour les travaux neufs comme les dépannages.",
    besoinsSpecifiques: [
      "Page habilitations et certifications (Qualifelec, RGE)",
      "Formulaire de demande d'intervention d'urgence",
      "Liste détaillée des prestations (installation, rénovation, domotique)",
      "Page dédiée aux aides financières (MaPrimeRénov, CEE)",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "laval", "saint-malo", "lorient"],
  },
  {
    slug: "macon",
    nom: "Maçon",
    nomPluriel: "Maçons",
    secteur: "Artisanat du bâtiment",
    description:
      "Un maçon a besoin d'un site internet pour présenter l'envergure de ses chantiers et rassurer les clients sur sa capacité à gérer des projets de construction ou rénovation importants.",
    besoinsSpecifiques: [
      "Portfolio de chantiers avec photos avant/pendant/après",
      "Page assurance décennale et garanties",
      "Formulaire de devis avec type de projet et surface",
      "Témoignages clients avec photos des réalisations",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "saint-brieuc", "vannes", "quimper"],
  },
  {
    slug: "peintre",
    nom: "Peintre",
    nomPluriel: "Peintres",
    secteur: "Artisanat du bâtiment",
    description:
      "Un peintre en bâtiment a besoin d'un site internet pour mettre en valeur ses réalisations visuellement et se démarquer dans un secteur où les clients choisissent souvent sur la qualité du travail visible.",
    besoinsSpecifiques: [
      "Galerie avant/après avec photos haute résolution",
      "Page dédiée aux techniques (enduits, stucco, peintures décoratives)",
      "Simulateur de couleurs ou palette de références",
      "Demande de devis en ligne avec photos du chantier",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "lorient", "saint-malo", "vannes"],
  },
  {
    slug: "couvreur",
    nom: "Couvreur",
    nomPluriel: "Couvreurs",
    secteur: "Artisanat du bâtiment",
    description:
      "Un couvreur a besoin d'un site internet pour être trouvé en urgence lors de sinistres et pour présenter ses compétences sur les différents types de toitures propres à la région.",
    besoinsSpecifiques: [
      "Numéro d'urgence bien visible pour les sinistres (tempête, fuite)",
      "Page sur les types de toitures traités (ardoise, tuile, zinc, chaume)",
      "Galerie de chantiers de rénovation et de neuf",
      "Page assurance décennale et certifications (Qualibat)",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "saint-malo", "quimper", "saint-brieuc"],
  },
  {
    slug: "carreleur",
    nom: "Carreleur",
    nomPluriel: "Carreleurs",
    secteur: "Artisanat du bâtiment",
    description:
      "Un carreleur a besoin d'un site internet pour présenter la diversité de ses réalisations et guider les clients dans le choix des matériaux avant même le premier rendez-vous.",
    besoinsSpecifiques: [
      "Galerie de réalisations par pièce (salle de bain, cuisine, terrasse)",
      "Page sur les matériaux proposés (carrelage, faïence, mosaïque, pierre naturelle)",
      "Formulaire de devis avec surface et type de pose",
      "Page sur les techniques spéciales (ragréage, chauffage au sol)",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "vannes", "lorient", "saint-brieuc"],
  },
  {
    slug: "chauffagiste",
    nom: "Chauffagiste",
    nomPluriel: "Chauffagistes",
    secteur: "Artisanat du bâtiment",
    description:
      "Un chauffagiste a besoin d'un site internet pour informer les clients sur les aides à la rénovation énergétique et se positionner comme expert local des solutions de chauffage économiques.",
    besoinsSpecifiques: [
      "Page dédiée aux aides financières (MaPrimeRénov, éco-PTZ, CEE)",
      "Comparatif des solutions de chauffage (PAC, chaudière gaz, poêle à pellets)",
      "Formulaire de demande de diagnostic énergétique",
      "Certification RGE mise en avant pour l'accès aux subventions",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "laval", "saint-malo", "quimper"],
  },

  // Beauté / bien-être
  {
    slug: "coiffeur",
    nom: "Coiffeur",
    nomPluriel: "Coiffeurs",
    secteur: "Beauté et bien-être",
    description:
      "Un coiffeur a besoin d'un site internet pour proposer la prise de rendez-vous en ligne à toute heure et présenter les créations de son salon pour attirer une clientèle fidèle.",
    besoinsSpecifiques: [
      "Système de prise de RDV en ligne intégré",
      "Galerie coiffures et colorations réalisées en salon",
      "Page tarifs détaillés par prestation",
      "Présentation de l'équipe et des spécialités (balayage, kératine, etc.)",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "saint-malo", "vannes", "lorient"],
  },
  {
    slug: "estheticienne",
    nom: "Esthéticienne",
    nomPluriel: "Esthéticiennes",
    secteur: "Beauté et bien-être",
    description:
      "Une esthéticienne a besoin d'un site internet pour présenter ses soins en détail et permettre la réservation en ligne, essentielle dans un secteur où les créneaux partent rapidement.",
    besoinsSpecifiques: [
      "Système de réservation en ligne avec choix du soin et de l'horaire",
      "Page prestations détaillées avec durée et tarifs",
      "Galerie avant/après des soins (épilation, soin du visage, maquillage)",
      "Page produits utilisés et marques partenaires",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "saint-malo", "vannes", "quimper"],
  },
  {
    slug: "naturopathe",
    nom: "Naturopathe",
    nomPluriel: "Naturopathes",
    secteur: "Santé et bien-être",
    description:
      "Un naturopathe a besoin d'un site internet pour expliquer sa démarche thérapeutique et rassurer des clients souvent néophytes sur cette pratique complémentaire de santé.",
    besoinsSpecifiques: [
      "Page explicative sur la naturopathie et la démarche de soin",
      "Système de prise de RDV pour consultations en cabinet ou en ligne",
      "Blog de conseils santé et bien-être pour attirer du trafic organique",
      "Page sur les techniques utilisées (phytothérapie, iridologie, réflexologie)",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "vannes", "lorient", "angers"],
  },
  {
    slug: "coach-sportif",
    nom: "Coach sportif",
    nomPluriel: "Coachs sportifs",
    secteur: "Sport et bien-être",
    description:
      "Un coach sportif a besoin d'un site internet pour présenter son approche et ses résultats clients, et proposer ses programmes en ligne pour toucher une clientèle au-delà de sa zone géographique.",
    besoinsSpecifiques: [
      "Page programmes d'entraînement (perte de poids, prise de masse, remise en forme)",
      "Témoignages clients avec photos de transformation",
      "Vente de programmes en ligne ou abonnements de suivi à distance",
      "Agenda de cours collectifs avec inscription en ligne",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "saint-malo", "lorient", "vannes"],
  },

  // Restauration
  {
    slug: "restaurant",
    nom: "Restaurateur",
    nomPluriel: "Restaurateurs",
    secteur: "Restauration",
    description:
      "Un restaurateur a besoin d'un site internet pour présenter sa carte et son univers, et permettre les réservations en ligne qui sont désormais le principal canal de réservation des clients.",
    besoinsSpecifiques: [
      "Menu en ligne avec photos des plats et prix à jour",
      "Système de réservation en ligne (intégration LaFourchette ou propre)",
      "Page événements et privatisation de salle",
      "Intégration Google Maps, horaires et accès parking",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "saint-malo", "vannes", "quimper"],
  },
  {
    slug: "boulanger",
    nom: "Boulanger",
    nomPluriel: "Boulangers",
    secteur: "Artisanat alimentaire",
    description:
      "Un boulanger artisan a besoin d'un site internet pour communiquer sur ses horaires, ses produits du jour et ses commandes spéciales, tout en mettant en avant son savoir-faire face aux grandes surfaces.",
    besoinsSpecifiques: [
      "Page produits avec description des recettes et ingrédients utilisés",
      "Formulaire de commande en ligne pour pains spéciaux et pièces montées",
      "Affichage clair des horaires d'ouverture et jours de fermeture",
      "Page sur les labels et engagements (farine locale, levain naturel, Label Rouge)",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "saint-malo", "lorient", "saint-brieuc"],
  },
  {
    slug: "traiteur",
    nom: "Traiteur",
    nomPluriel: "Traiteurs",
    secteur: "Restauration et événementiel",
    description:
      "Un traiteur a besoin d'un site internet pour présenter ses formules événementielles et être référencé au moment où les clients planifient mariages, séminaires et réceptions de famille.",
    besoinsSpecifiques: [
      "Page formules par type d'événement (mariage, séminaire, anniversaire)",
      "Galerie photos de buffets et présentations culinaires",
      "Formulaire de devis avec date, nombre de convives et type de prestation",
      "Témoignages de couples mariés et entreprises clientes",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "vannes", "saint-malo", "lorient"],
  },
  {
    slug: "food-truck",
    nom: "Food-truck",
    nomPluriel: "Food-trucks",
    secteur: "Restauration mobile",
    description:
      "Un food-truck a besoin d'un site internet pour communiquer sa localisation en temps réel et ses prochaines dates de présence sur les marchés et événements locaux.",
    besoinsSpecifiques: [
      "Agenda des emplacements et événements à venir mis à jour régulièrement",
      "Menu en ligne avec photos et prix",
      "Page pour privatisation et événements d'entreprise",
      "Intégration réseaux sociaux pour localisation en temps réel",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "saint-malo", "vannes", "quimper"],
  },

  // Services
  {
    slug: "photographe",
    nom: "Photographe",
    nomPluriel: "Photographes",
    secteur: "Services créatifs",
    description:
      "Un photographe professionnel a besoin d'un site internet pour exposer son portfolio et son style artistique, son principal argument de vente auprès de clients qui comparent avant de réserver.",
    besoinsSpecifiques: [
      "Portfolio organisé par type de reportage (mariage, entreprise, portrait, produit)",
      "Galerie haute résolution avec protection contre le téléchargement",
      "Page tarifs et formules avec ce qui est inclus",
      "Formulaire de contact avec date et type de prestation souhaitée",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "saint-malo", "vannes", "lorient"],
  },
  {
    slug: "auto-entrepreneur",
    nom: "Auto-entrepreneur",
    nomPluriel: "Auto-entrepreneurs",
    secteur: "Services indépendants",
    description:
      "Un auto-entrepreneur a besoin d'un site internet pour asseoir sa crédibilité professionnelle face aux entreprises établies et présenter clairement ses services et tarifs.",
    besoinsSpecifiques: [
      "Page services détaillés avec tarifs horaires ou forfaits clairs",
      "Section références et témoignages clients pour établir la crédibilité",
      "Page mentions légales avec numéro SIRET visible",
      "Formulaire de contact et disponibilités pour missions",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "laval", "angers", "le-mans"],
  },
  {
    slug: "agent-immobilier",
    nom: "Agent immobilier",
    nomPluriel: "Agents immobiliers",
    secteur: "Immobilier",
    description:
      "Un agent immobilier a besoin d'un site internet pour publier ses biens en vente ou en location et générer des leads vendeurs et acheteurs directement depuis sa zone géographique.",
    besoinsSpecifiques: [
      "Moteur de recherche de biens avec filtres (prix, surface, type, ville)",
      "Fiches biens détaillées avec photos haute qualité, plans et visite virtuelle",
      "Formulaire d'estimation de bien gratuite pour générer des leads vendeurs",
      "Page équipe avec profil des agents et leurs secteurs de spécialité",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "saint-malo", "vannes", "lorient"],
  },
  {
    slug: "kinesitherapeute",
    nom: "Kinésithérapeute",
    nomPluriel: "Kinésithérapeutes",
    secteur: "Santé",
    description:
      "Un kinésithérapeute a besoin d'un site internet pour informer les patients sur ses spécialités et ses modalités de prise en charge, et gérer les rendez-vous plus efficacement.",
    besoinsSpecifiques: [
      "Prise de rendez-vous en ligne intégrée (Doctolib ou propre)",
      "Page spécialités (sport, pédiatrie, neurologie, rééducation post-op)",
      "Informations pratiques sur le remboursement Sécurité sociale et mutuelles",
      "Page cabinet avec photos, adresse et accès pour les patients à mobilité réduite",
    ],
    villesPrincipales: ["rennes", "nantes", "brest", "saint-brieuc", "vannes", "lorient"],
  },
]
