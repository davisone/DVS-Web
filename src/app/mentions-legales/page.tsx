import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site Davison Développement - Développeur web freelance à Rennes.',
}

export default function MentionsLegalesPage() {
  return (
    <div className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-1 mb-8">Mentions légales</h1>

          <div className="prose prose-invert prose-neutral max-w-none space-y-8">

            <section>
              <h2 className="heading-3 mb-4">Éditeur du site</h2>
              <div className="card">
                <ul className="space-y-2 text-neutral-300">
                  <li><strong className="text-white">Nom :</strong> Evan Davison</li>
                  <li><strong className="text-white">Statut :</strong> Micro-entrepreneur</li>
                  <li><strong className="text-white">SIRET :</strong> 100 077 247 00011</li>
                  <li><strong className="text-white">Adresse :</strong> 22 Le Domaine, 35310 Mordelles, France</li>
                  <li><strong className="text-white">Email :</strong> contact@davison-developpement.fr</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Directeur de la publication</h2>
              <p className="text-neutral-300">
                Evan Davison, en qualité de micro-entrepreneur.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Hébergement</h2>
              <div className="card">
                <ul className="space-y-2 text-neutral-300">
                  <li><strong className="text-white">Hébergeur :</strong> Vercel Inc.</li>
                  <li><strong className="text-white">Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
                  <li><strong className="text-white">Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">vercel.com</a></li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Propriété intellectuelle</h2>
              <p className="text-neutral-300">
                L&apos;ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.)
                est la propriété exclusive de Davison Développement, à l&apos;exception des marques,
                logos ou contenus appartenant à d&apos;autres sociétés partenaires ou auteurs.
              </p>
              <p className="text-neutral-300 mt-4">
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication,
                même partielle, de ces différents éléments est strictement interdite sans l&apos;accord
                exprès par écrit de Davison Développement.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Protection des données personnelles</h2>
              <p className="text-neutral-300">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification,
                de suppression et d&apos;opposition aux données personnelles vous concernant.
              </p>
              <p className="text-neutral-300 mt-4">
                Les données collectées via le formulaire de contact sont uniquement utilisées pour
                répondre à vos demandes et ne sont jamais transmises à des tiers.
              </p>
              <p className="text-neutral-300 mt-4">
                Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@davison-developpement.fr" className="text-accent hover:underline">contact@davison-developpement.fr</a>
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Cookies</h2>
              <p className="text-neutral-300">
                Ce site utilise uniquement des cookies techniques essentiels à son fonctionnement.
                Aucun cookie publicitaire ou de tracking n&apos;est utilisé.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Limitation de responsabilité</h2>
              <p className="text-neutral-300">
                Davison Développement s&apos;efforce d&apos;assurer au mieux l&apos;exactitude et la mise
                à jour des informations diffusées sur ce site. Toutefois, Davison Développement ne peut
                garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à
                disposition sur ce site.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Droit applicable</h2>
              <p className="text-neutral-300">
                Les présentes mentions légales sont régies par le droit français. En cas de litige,
                les tribunaux français seront seuls compétents.
              </p>
            </section>

            <p className="text-neutral-500 text-sm mt-12">
              Dernière mise à jour : Janvier 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}