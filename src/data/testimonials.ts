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
    company: "L'Atelier Créatif",
    content:
      "Evan a créé notre site vitrine en 3 semaines. Résultat impeccable, moderne et rapide. Depuis la mise en ligne, on reçoit des demandes régulières via le formulaire de contact. Je recommande sans hésiter.",
    rating: 5,
  },
  {
    name: 'Thomas Guérin',
    role: 'Gérant',
    company: 'Plomberie Guérin',
    content:
      "J'avais besoin d'un site simple et efficace pour mon activité. Evan a été à l'écoute, les délais ont été respectés et le site est très bien référencé sur Google. Très professionnel.",
    rating: 5,
  },
  {
    name: 'Sophie Morvan',
    role: 'Fondatrice',
    company: 'Cabinet Bien-Être Rennes',
    content:
      'Très professionnel, réactif et de bon conseil. Mon site reflète parfaitement mon activité et mes valeurs. La formation à la prise en main était claire et complète. Je recommande.',
    rating: 5,
  },
  {
    name: 'Julien Mahé',
    role: 'Responsable commercial',
    company: 'Bretagne Menuiserie',
    content:
      "La refonte de notre site a transformé notre image en ligne. Nos prospects arrivent désormais mieux informés et nos demandes de devis ont clairement augmenté depuis la mise en ligne.",
    rating: 5,
  },
  {
    name: 'Claire Duval',
    role: 'Gérante',
    company: 'Boutique Le Fil Rouge',
    content:
      "Notre boutique en ligne fonctionne parfaitement depuis l'ouverture. Evan a géré toute la partie technique avec sérieux. L'accompagnement jusqu'à la mise en ligne était rassurant et efficace.",
    rating: 5,
  },
]
