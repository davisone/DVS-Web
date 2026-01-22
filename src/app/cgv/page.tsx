import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description: 'Conditions générales de vente des prestations de développement web - Davison Développement.',
}

export default function CGVPage() {
  return (
    <div className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-1 mb-4">Conditions Générales de Vente</h1>
          <p className="text-neutral-400 mb-8">
            Applicables aux prestations de développement web et mobile
          </p>

          <div className="prose prose-invert prose-neutral max-w-none space-y-8">

            <section>
              <h2 className="heading-3 mb-4">Article 1 - Identification du prestataire</h2>
              <div className="card">
                <ul className="space-y-2 text-neutral-300">
                  <li><strong className="text-white">Nom :</strong> Evan Davison</li>
                  <li><strong className="text-white">Nom commercial :</strong> Davison Développement</li>
                  <li><strong className="text-white">Statut :</strong> Micro-entrepreneur</li>
                  <li><strong className="text-white">SIRET :</strong> 100 077 247 00011</li>
                  <li><strong className="text-white">Adresse :</strong> 22 Le Domaine, 35310 Mordelles, France</li>
                  <li><strong className="text-white">Email :</strong> contact@davison-developpement.fr</li>
                </ul>
                <p className="text-neutral-400 text-sm mt-4">
                  TVA non applicable, article 293 B du Code Général des Impôts.
                </p>
              </div>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Article 2 - Champ d&apos;application</h2>
              <p className="text-neutral-300">
                Les présentes Conditions Générales de Vente (CGV) s&apos;appliquent à toutes les prestations
                de services conclues entre Davison Développement et ses clients professionnels ou particuliers.
              </p>
              <p className="text-neutral-300 mt-4">
                Toute commande implique l&apos;acceptation sans réserve des présentes CGV.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Article 3 - Prestations proposées</h2>
              <p className="text-neutral-300">Davison Développement propose les services suivants :</p>
              <ul className="list-disc list-inside text-neutral-300 mt-4 space-y-2">
                <li>Création de sites internet (vitrines, e-commerce, sur-mesure)</li>
                <li>Refonte de sites existants</li>
                <li>Développement d&apos;applications web</li>
                <li>Développement d&apos;applications mobiles (iOS et Android)</li>
                <li>Référencement naturel (SEO)</li>
                <li>Maintenance et hébergement</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Article 4 - Devis et commande</h2>
              <p className="text-neutral-300">
                Chaque prestation fait l&apos;objet d&apos;un devis gratuit et personnalisé, valable 30 jours
                à compter de sa date d&apos;émission.
              </p>
              <p className="text-neutral-300 mt-4">
                La commande est considérée comme ferme et définitive après :
              </p>
              <ul className="list-disc list-inside text-neutral-300 mt-2 space-y-1">
                <li>Acceptation du devis (signature ou accord écrit par email)</li>
                <li>Versement de l&apos;acompte prévu au devis</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Article 5 - Tarifs et paiement</h2>
              <p className="text-neutral-300">
                Les prix sont indiqués en euros et nets de taxe (TVA non applicable).
              </p>
              <div className="card mt-4">
                <h3 className="text-white font-semibold mb-3">Modalités de paiement</h3>
                <ul className="space-y-2 text-neutral-300">
                  <li><strong className="text-white">Acompte :</strong> 30% à la commande</li>
                  <li><strong className="text-white">Solde :</strong> 70% à la livraison</li>
                </ul>
                <p className="text-neutral-400 text-sm mt-4">
                  Paiement par virement bancaire. Les coordonnées sont communiquées sur la facture.
                </p>
              </div>
              <p className="text-neutral-300 mt-4">
                En cas de retard de paiement, des pénalités de retard seront appliquées au taux
                de 3 fois le taux d&apos;intérêt légal, ainsi qu&apos;une indemnité forfaitaire de 40€
                pour frais de recouvrement.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Article 6 - Délais de réalisation</h2>
              <p className="text-neutral-300">
                Les délais de réalisation sont indiqués à titre indicatif dans le devis.
                Ils courent à compter de la réception de l&apos;acompte et de l&apos;ensemble
                des éléments nécessaires à la réalisation (textes, images, accès, etc.).
              </p>
              <p className="text-neutral-300 mt-4">
                Tout retard imputable au client (validation tardive, fourniture des contenus)
                reporte d&apos;autant le délai de livraison.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Article 7 - Validation et livraison</h2>
              <p className="text-neutral-300">
                Le projet est présenté au client pour validation à chaque étape clé.
                Le client dispose de 7 jours pour formuler ses demandes de modifications.
              </p>
              <p className="text-neutral-300 mt-4">
                Les modifications majeures sortant du périmètre initial défini dans le devis
                feront l&apos;objet d&apos;un avenant tarifé.
              </p>
              <p className="text-neutral-300 mt-4">
                La livraison est effective après validation finale et paiement du solde.
                Un procès-verbal de livraison pourra être établi.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Article 8 - Droit de rétractation</h2>
              <p className="text-neutral-300">
                <strong className="text-white">Pour les clients particuliers :</strong> Conformément à
                l&apos;article L221-28 du Code de la consommation, le droit de rétractation ne peut
                être exercé pour les prestations de services pleinement exécutées avant la fin
                du délai de rétractation avec l&apos;accord du consommateur.
              </p>
              <p className="text-neutral-300 mt-4">
                <strong className="text-white">Pour les clients professionnels :</strong> Aucun droit
                de rétractation n&apos;est applicable.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Article 9 - Propriété intellectuelle</h2>
              <p className="text-neutral-300">
                Le transfert de propriété des créations réalisées (code source, design, contenus)
                est effectif après paiement intégral de la prestation.
              </p>
              <p className="text-neutral-300 mt-4">
                Davison Développement se réserve le droit de mentionner la réalisation dans
                son portfolio et ses références, sauf accord contraire du client.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Article 10 - Responsabilité</h2>
              <p className="text-neutral-300">
                Davison Développement s&apos;engage à mettre en œuvre tous les moyens nécessaires
                à la bonne exécution de ses prestations (obligation de moyens).
              </p>
              <p className="text-neutral-300 mt-4">
                La responsabilité de Davison Développement ne saurait être engagée en cas de :
              </p>
              <ul className="list-disc list-inside text-neutral-300 mt-2 space-y-1">
                <li>Mauvaise utilisation du site ou de l&apos;application par le client</li>
                <li>Non-respect des préconisations techniques</li>
                <li>Défaillance de l&apos;hébergeur ou de services tiers</li>
                <li>Force majeure</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Article 11 - Confidentialité</h2>
              <p className="text-neutral-300">
                Davison Développement s&apos;engage à traiter de manière confidentielle toutes
                les informations communiquées par le client dans le cadre de la prestation.
              </p>
            </section>

            <section>
              <h2 className="heading-3 mb-4">Article 12 - Litiges</h2>
              <p className="text-neutral-300">
                Les présentes CGV sont soumises au droit français. En cas de litige, une solution
                amiable sera recherchée en priorité.
              </p>
              <p className="text-neutral-300 mt-4">
                À défaut d&apos;accord amiable, les tribunaux de Rennes seront seuls compétents.
              </p>
              <p className="text-neutral-300 mt-4">
                <strong className="text-white">Médiation :</strong> Conformément à l&apos;article L612-1
                du Code de la consommation, le client consommateur peut recourir gratuitement
                à un médiateur de la consommation en cas de litige.
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