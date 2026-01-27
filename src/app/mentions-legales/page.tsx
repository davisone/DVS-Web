import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site DVS Web - Développeur web freelance à Rennes.',
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
                  <li><strong className="text-white">Email :</strong> contact@dvs-web.fr</li>
                  <li><strong className="text-white">Téléphone :</strong> 06 51 01 95 06</li>
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
                est la propriété exclusive de DVS Web, à l&apos;exception des marques,
                logos ou contenus appartenant à d&apos;autres sociétés partenaires ou auteurs.
              </p>
              <p className="text-neutral-300 mt-4">
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication,
                même partielle, de ces différents éléments est strictement interdite sans l&apos;accord
                exprès par écrit de DVS Web.
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
                Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@dvs-web.fr" className="text-accent hover:underline">contact@dvs-web.fr</a>
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Cookies et mesure d&apos;audience</h2>
              <p className="text-neutral-300">
                Ce site utilise des cookies techniques essentiels à son fonctionnement.
              </p>
              <div className="card mt-4">
                <h3 className="text-white font-semibold mb-3">Google Analytics (GA4)</h3>
                <p className="text-neutral-300">
                  Ce site utilise Google Analytics (GA4), un service d&apos;analyse d&apos;audience fourni par Google,
                  afin de mesurer la fréquentation et l&apos;utilisation du site.
                </p>
                <p className="text-neutral-300 mt-3">
                  <strong className="text-white">Données collectées :</strong> pages consultées, durée des visites,
                  interactions avec le site (défilement, clics sortants, téléchargements), provenance du trafic,
                  type d&apos;appareil, navigateur, système d&apos;exploitation, langue et localisation approximative
                  (pays et ville).
                </p>
                <p className="text-neutral-300 mt-3">
                  <strong className="text-white">Données NON collectées :</strong> nom, adresse e-mail, numéro de téléphone,
                  données bancaires ou contenu des formulaires. Les adresses IP sont anonymisées conformément
                  à la réglementation européenne.
                </p>
                <p className="text-neutral-300 mt-3">
                  Ces données sont collectées via des cookies de mesure d&apos;audience et des identifiants pseudonymisés,
                  sans permettre l&apos;identification directe des utilisateurs.
                </p>
                <p className="text-neutral-400 text-sm mt-4">
                  L&apos;utilisation de ces cookies est soumise au consentement préalable de l&apos;utilisateur,
                  qui peut les accepter ou les refuser à tout moment via la bannière de gestion des cookies.
                </p>
              </div>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Limitation de responsabilité</h2>
              <p className="text-neutral-300">
                DVS Web s&apos;efforce d&apos;assurer au mieux l&apos;exactitude et la mise
                à jour des informations diffusées sur ce site. Toutefois, DVS Web ne peut
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