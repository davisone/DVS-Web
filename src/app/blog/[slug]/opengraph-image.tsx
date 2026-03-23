import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/blog'

export const alt = 'Article DVS Web'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const categoryLabels: Record<string, string> = {
  prix: 'Prix & Budget',
  conseils: 'Conseils',
  seo: 'SEO',
  tendances: 'Tendances',
}

type Props = { params: { slug: string } }

export default function OgImage({ params }: Props) {
  let title = 'Blog DVS Web'
  let categoryLabel = 'Blog'

  try {
    const post = getPostBySlug(params.slug)
    title = post.title
    categoryLabel = categoryLabels[post.category] ?? 'Blog'
  } catch {
    // valeurs par défaut
  }

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
        {/* Barre accent gauche */}
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

        {/* En-tête : marque + catégorie */}
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
            {categoryLabel}
          </span>
        </div>

        {/* Titre article */}
        <div
          style={{
            color: '#FFFFFF',
            fontSize: title.length > 60 ? '40px' : '50px',
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>

        {/* Pied */}
        <div style={{ color: '#9CA3AF', fontSize: '16px' }}>dvs-web.fr/blog</div>
      </div>
    ),
    { ...size }
  )
}
