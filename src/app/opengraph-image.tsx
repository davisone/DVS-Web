import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'DVS Web — Développeur Web Freelance Rennes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Cercle décoratif en haut à droite */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,180,74,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Cercle décoratif en bas à gauche */}
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,180,74,0.1) 0%, transparent 70%)',
          }}
        />

        {/* Ligne dorée en haut */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, transparent, #D4B44A, transparent)',
          }}
        />

        {/* Contenu principal */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            zIndex: 1,
          }}
        >
          {/* Logo texte */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}
            >
              DVS
            </span>
            <span
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: '#D4B44A',
                letterSpacing: '-0.02em',
              }}
            >
              Web
            </span>
          </div>

          {/* Séparateur */}
          <div
            style={{
              width: 80,
              height: 3,
              background: '#D4B44A',
              borderRadius: 2,
            }}
          />

          {/* Titre */}
          <span
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: '#E5E5E5',
              textAlign: 'center',
            }}
          >
            Développeur Web Freelance
          </span>

          {/* Sous-titre */}
          <span
            style={{
              fontSize: 22,
              color: '#A3A3A3',
              textAlign: 'center',
            }}
          >
            Sites internet · Applications · SEO — Rennes & Ille-et-Vilaine
          </span>
        </div>

        {/* URL en bas */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 18, color: '#D4B44A', fontWeight: 600 }}>
            dvs-web.fr
          </span>
        </div>
      </div>
    ),
    { ...size },
  )
}
