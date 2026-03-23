import { ImageResponse } from 'next/og'
import { getVilleBySlug } from '@/data/villes-france'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: { ville: string } }

export function generateAlt({ params }: Props) {
  const ville = getVilleBySlug(params.ville)
  return `Création site internet ${ville?.nom ?? 'Bretagne'} — DVS Web`
}

export default function OgImage({ params }: Props) {
  const ville = getVilleBySlug(params.ville)
  const nomVille = ville?.nom ?? 'Bretagne'
  const dept = ville?.departement ?? 'Bretagne'

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0D0D0D',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '8px',
            height: '100%',
            background: '#D4B44A',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              color: '#D4B44A',
              fontSize: '16px',
              fontWeight: 700,
              letterSpacing: '6px',
              textTransform: 'uppercase',
            }}
          >
            DVS WEB
          </span>
          <span
            style={{
              color: '#9CA3AF',
              fontSize: '14px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            {dept}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              color: '#D4B44A',
              fontSize: '22px',
              fontWeight: 600,
            }}
          >
            Création de site internet
          </div>
          <div
            style={{
              color: '#FFFFFF',
              fontSize: '64px',
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {nomVille}
          </div>
          <div
            style={{
              color: '#9CA3AF',
              fontSize: '20px',
              lineHeight: 1.4,
              maxWidth: '700px',
            }}
          >
            Développeur web freelance — sites vitrines, e-commerce et applications sur-mesure
          </div>
        </div>

        <div style={{ color: '#9CA3AF', fontSize: '16px' }}>dvs-web.fr</div>
      </div>
    ),
    { ...size }
  )
}
