import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// Rate limiting en mémoire (réinitialisé au redémarrage du serveur)
const rateLimit = new Map<string, { count: number; firstRequest: number }>()
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 heure

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now - entry.firstRequest > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, firstRequest: now })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

// Durée minimum entre le chargement de la page et la soumission (en ms)
const MIN_SUBMIT_TIME = 3000

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Échappement HTML pour éviter les injections XSS dans les emails
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  website?: string
  _loadedAt?: number
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting par IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Trop de messages envoyés. Veuillez réessayer plus tard.' },
        { status: 429 }
      )
    }

    const { name, email, subject, message, website, _loadedAt }: ContactFormData = await request.json()

    // Anti-spam : honeypot (si rempli, c'est un bot)
    if (website) {
      // On retourne un faux succès pour ne pas alerter le bot
      return NextResponse.json({ success: true, id: 'ok' })
    }

    // Anti-spam : vérification temporelle
    if (_loadedAt && Date.now() - _loadedAt < MIN_SUBMIT_TIME) {
      return NextResponse.json({ success: true, id: 'ok' })
    }

    // Validation des champs requis
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      )
    }

    // Validation du format email
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      )
    }

    // Mapping des sujets
    const subjectLabels: Record<string, string> = {
      'creation-site': 'Création de site internet',
      'refonte-site': 'Refonte de site existant',
      'application-web': 'Application web',
      'application-mobile': 'Application mobile',
      'seo': 'Référencement SEO',
      'autre': 'Autre',
    }

    const subjectLabel = subjectLabels[subject] || subject

    // Échappement des entrées utilisateur avant injection dans le HTML
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message)
    const safeSubjectLabel = escapeHtml(subjectLabel)

    // Template HTML professionnel
    const emailHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                Nouveau message
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                Reçu depuis le formulaire de contact DVS Web
              </p>
            </td>
          </tr>

          <!-- Badge sujet -->
          <tr>
            <td style="padding: 24px 40px 0 40px; text-align: center;">
              <span style="display: inline-block; background-color: #f0f9ff; color: #0369a1; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 500;">
                ${safeSubjectLabel}
              </span>
            </td>
          </tr>

          <!-- Infos contact -->
          <tr>
            <td style="padding: 24px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 12px 20px; border-bottom: 1px solid #e2e8f0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="80" style="color: #64748b; font-size: 13px; font-weight: 500; text-transform: uppercase;">Nom</td>
                        <td style="color: #1e293b; font-size: 15px; font-weight: 600;">${safeName}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="80" style="color: #64748b; font-size: 13px; font-weight: 500; text-transform: uppercase;">Email</td>
                        <td style="color: #6366f1; font-size: 15px;">
                          <a href="mailto:${safeEmail}" style="color: #6366f1; text-decoration: none;">${safeEmail}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 0 40px 24px 40px;">
              <h2 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Message</h2>
              <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; color: #475569; font-size: 15px; line-height: 1.6;">
                ${safeMessage.replace(/\n/g, '<br />')}
              </div>
            </td>
          </tr>

          <!-- Bouton répondre -->
          <tr>
            <td style="padding: 0 40px 32px 40px; text-align: center;">
              <a href="mailto:${safeEmail}?subject=Re: ${safeSubjectLabel}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 600;">
                Répondre à ${name.split(' ')[0]}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                Cet email a été envoyé automatiquement depuis <strong>dvs-web.fr</strong>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

    // Template email de confirmation pour le client
    const confirmationHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                Merci pour votre message !
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">
                Votre demande a bien été reçue
              </p>
            </td>
          </tr>

          <!-- Message de bienvenue -->
          <tr>
            <td style="padding: 32px 40px 24px 40px;">
              <p style="margin: 0; color: #1e293b; font-size: 16px; line-height: 1.6;">
                Bonjour <strong>${name.split(' ')[0]}</strong>,
              </p>
              <p style="margin: 16px 0 0 0; color: #475569; font-size: 15px; line-height: 1.6;">
                Je vous confirme la bonne réception de votre message. Je vous répondrai dans les plus brefs délais, généralement sous <strong>24 à 48 heures</strong>.
              </p>
            </td>
          </tr>

          <!-- Récapitulatif -->
          <tr>
            <td style="padding: 0 40px 24px 40px;">
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 24px; border-left: 4px solid #6366f1;">
                <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  Récapitulatif de votre demande
                </h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 100px;">Sujet :</td>
                    <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 500;">${safeSubjectLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px; vertical-align: top;">Message :</td>
                    <td style="padding: 8px 0; color: #1e293b; font-size: 14px; line-height: 1.5;">${safeMessage.length > 200 ? safeMessage.substring(0, 200).replace(/\n/g, '<br />') + '...' : safeMessage.replace(/\n/g, '<br />')}</td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Prochaines étapes -->
          <tr>
            <td style="padding: 0 40px 24px 40px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                Et maintenant ?
              </h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 32px; vertical-align: top;">
                          <div style="width: 24px; height: 24px; background-color: #f0fdf4; border-radius: 50%; text-align: center; line-height: 24px; color: #16a34a; font-size: 12px; font-weight: 600;">1</div>
                        </td>
                        <td style="color: #475569; font-size: 14px; line-height: 1.5;">
                          J'analyse votre demande et prépare une réponse personnalisée
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 32px; vertical-align: top;">
                          <div style="width: 24px; height: 24px; background-color: #f0fdf4; border-radius: 50%; text-align: center; line-height: 24px; color: #16a34a; font-size: 12px; font-weight: 600;">2</div>
                        </td>
                        <td style="color: #475569; font-size: 14px; line-height: 1.5;">
                          Je vous contacte pour échanger sur votre projet
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="width: 32px; vertical-align: top;">
                          <div style="width: 24px; height: 24px; background-color: #f0fdf4; border-radius: 50%; text-align: center; line-height: 24px; color: #16a34a; font-size: 12px; font-weight: 600;">3</div>
                        </td>
                        <td style="color: #475569; font-size: 14px; line-height: 1.5;">
                          Si nous travaillons ensemble, je vous envoie un devis détaillé
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact direct -->
          <tr>
            <td style="padding: 0 40px 32px 40px;">
              <div style="background-color: #faf5ff; border-radius: 8px; padding: 20px; text-align: center;">
                <p style="margin: 0 0 12px 0; color: #6b21a8; font-size: 14px; font-weight: 500;">
                  Une question urgente ?
                </p>
                <a href="tel:0651019506" style="display: inline-block; color: #7c3aed; font-size: 18px; font-weight: 600; text-decoration: none;">
                  06 51 01 95 06
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">
                Evan Davison
              </p>
              <p style="margin: 0 0 16px 0; color: #64748b; font-size: 13px;">
                Développeur Web Freelance · Rennes et alentours
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                <a href="https://dvs-web.fr" style="color: #6366f1; text-decoration: none;">dvs-web.fr</a>
                &nbsp;·&nbsp;
                <a href="mailto:contact@dvs-web.fr" style="color: #6366f1; text-decoration: none;">contact@dvs-web.fr</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

    // Envoi des deux emails en parallèle
    const [notificationResult, confirmationResult] = await Promise.all([
      // Email de notification pour vous
      resend.emails.send({
        from: 'DVS Web <contact@dvs-web.fr>',
        to: ['contact@dvs-web.fr'],
        replyTo: email,
        subject: `[DVS Web] ${subjectLabel} - ${name}`,
        html: emailHtml,
      }),
      // Email de confirmation pour le client
      resend.emails.send({
        from: 'DVS Web <contact@dvs-web.fr>',
        to: [email],
        subject: `Votre message a bien été reçu - DVS Web`,
        html: confirmationHtml,
      }),
    ])

    if (notificationResult.error || confirmationResult.error) {
      console.error('Erreur Resend:', notificationResult.error || confirmationResult.error)
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi du message' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: notificationResult.data?.id })
  } catch (error) {
    console.error('Erreur serveur:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
