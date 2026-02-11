export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  features?: string[]
  category: 'site' | 'app-web' | 'app-mobile' | 'refonte'
  link?: string
  year: number
  client?: string
  location?: string
  isPersonalProject?: boolean
  isInternalProject?: boolean
}

export const projects: Project[] = [
  {
    id: 'haut-en-couleur',
    title: 'Haut en Couleur',
    description: 'Site vitrine complet et multilingue pour une entreprise de peinture en bâtiment. Design moderne avec mode sombre, galerie avant/après interactive et optimisation SEO locale.',
    longDescription: 'Création complète de la présence digitale pour cette entreprise de peinture basée près de Rennes : site web multilingue (FR/EN), fiche Google Business Profile, réseaux sociaux et configuration Analytics.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'SEO', 'Multilingue'],
    features: [
      'Mode dark/light avec persistance',
      'Multilingue FR/EN avec URLs localisées',
      'Slider avant/après interactif',
      'Galerie lightbox avec filtres',
      'Formulaire sécurisé (hCaptcha, rate limiting)',
      'Carrousel d\'avis Google',
      'Carte interactive zone d\'intervention',
      '10+ pages (mentions légales, RGPD, 404...)',
      'Images optimisées WebP/AVIF',
      'Schema.org LocalBusiness',
      'Accessibilité WCAG 2.1',
      'Fiche Google Business créée',
      'Google Analytics 4 configuré',
    ],
    category: 'site',
    link: 'https://www.haut-en-couleur.fr',
    year: 2025,
    client: 'Haut en Couleur',
  },
  {
    id: 'carnet-sante-animaux',
    title: 'Carnet de Santé Animaux',
    description: 'Application mobile multi-plateforme pour gérer la santé et l\'historique médical des animaux. Synchronisation cloud, notifications intelligentes et export PDF.',
    longDescription: 'Carnet de santé numérique complet pour animaux de compagnie et d\'élevage : suivi vaccins, traitements, consultations, généalogie et reproductions. Disponible sur iOS, Android, Web et Desktop.',
    tags: ['Flutter', 'Firebase', 'Dart', 'Multi-plateforme'],
    features: [
      'Fiches animaux complètes (photo, identification, généalogie)',
      'Suivi vaccins avec rappels automatiques',
      'Gestion traitements et dosages',
      'Historique consultations vétérinaires',
      'Suivi maladies aiguës/chroniques',
      'Graphiques évolution du poids',
      'Arbre généalogique interactif',
      'Suivi reproductions et naissances',
      'Export PDF des fiches complètes',
      'Notifications et rappels automatiques',
      'Recherche et filtres avancés',
      'Synchronisation cloud Firebase',
      'Multi-plateforme (iOS, Android, Web, Desktop)',
    ],
    category: 'app-mobile',
    year: 2026,
  },
  {
    id: 'cv-builder',
    title: 'CV Builder',
    description: 'Application SaaS de génération de CV avec IA. Intègre OpenAI (GPT-4o-mini) pour l\'optimisation de contenu, Stripe pour les paiements, et NextAuth avec 2FA.',
    longDescription: 'Application SaaS complète de génération de CV avec IA. Intègre OpenAI (GPT-4o-mini) pour l\'optimisation de contenu, Stripe pour les paiements, et NextAuth avec 2FA. 5 templates professionnels, analyse ATS et export PDF haute qualité.',
    tags: ['Next.js 16', 'TypeScript', 'OpenAI API', 'Stripe', 'Prisma', 'Supabase', 'NextAuth', 'Nodemailer'],
    features: [
      '5 templates de CV (Modern, Classic, ATS-Friendly, Minimal, Creative)',
      'Analyse ATS : Score 0-100 avec recommandations',
      'Suggestions IA pour amélioration du contenu',
      'Authentification OAuth (Google, GitHub) + 2FA avec QR code',
      'Paiement Stripe (1 template gratuit, premium à 4.99€)',
      'Export PDF haute qualité',
      'Emails transactionnels (bienvenue, reset password, confirmation paiement)',
    ],
    category: 'app-web',
    link: 'https://cv-builder.fr',
    year: 2026,
    client: 'DVS Web',
    isInternalProject: true,
  },
  {
    id: 'qraft',
    title: 'QRaft',
    description: 'Application web full-stack pour créer, personnaliser, gérer et partager des QR codes. Templates de style, export multi-format et partage public via lien unique.',
    longDescription: 'Plateforme complète de génération de QR codes avec personnalisation avancée (couleurs, logo, 8 templates prédéfinis), système d\'authentification, dashboard de gestion et export multi-format (PNG, JPEG, PDF, ZIP).',
    tags: ['Next.js 16', 'React 19', 'PostgreSQL', 'Prisma', 'NextAuth', 'TypeScript'],
    features: [
      'Personnalisation avancée (couleurs, logo, 8 templates)',
      'Aperçu en temps réel lors de l\'édition',
      'Export multi-format (PNG, JPEG, PDF, ZIP)',
      'Authentification complète (inscription, connexion, bcrypt)',
      'Dashboard avec recherche, filtres et sélection multiple',
      'Partage public via lien unique par token',
      'Duplication et suppression groupée',
      'Taille ajustable et correction d\'erreur configurable',
      'SEO (Open Graph, JSON-LD, sitemap)',
      'Google Analytics intégré',
      'Design responsive mobile-first',
      'Conformité RGPD (mentions légales, politique de confidentialité)',
    ],
    category: 'app-web',
    link: 'https://qr-aft.vercel.app',
    year: 2026,
    client: 'DVS Web',
    isInternalProject: true,
  },
]

export const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'site', label: 'Sites web' },
  { id: 'app-mobile', label: 'Applications mobiles' },
  { id: 'app-web', label: 'Applications web' },
  { id: 'refonte', label: 'Refontes' },
]