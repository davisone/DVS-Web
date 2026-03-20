import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSlugs, getPostBySlug, getPostContent } from '@/lib/blog'
import { BlogPostPage } from './BlogPostPage'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug)
    return {
      title: `${post.title} | DVS Web`,
      description: post.description,
      alternates: {
        canonical: `https://dvs-web.fr/blog/${post.slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.description,
        url: `https://dvs-web.fr/blog/${post.slug}`,
        type: 'article',
        publishedTime: post.date,
        images: [
          {
            url: '/images/og-image.png',
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
    }
  } catch {
    return {
      title: 'Article non trouvé | DVS Web',
    }
  }
}

export default async function Page({ params }: PageProps) {
  let post
  try {
    post = getPostBySlug(params.slug)
  } catch {
    notFound()
  }

  const contentHtml = await getPostContent(post.content)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Evan Davison',
      url: 'https://dvs-web.fr',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DVS Web',
      url: 'https://dvs-web.fr',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://dvs-web.fr/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  }

  // FAQ Schema générique pour les articles de blog
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "Combien coûte la création d'un site internet ?",
        acceptedAnswer: { '@type': 'Answer', text: 'Un site vitrine professionnel démarre à partir de ~600€. Devis gratuit sur demande.' },
      },
      {
        '@type': 'Question',
        name: 'Travaillez-vous avec des artisans ?',
        acceptedAnswer: { '@type': 'Answer', text: "Oui, j'accompagne des plombiers, électriciens, coiffeurs, restaurateurs et tout type d'artisan ou TPE en Bretagne et grand Ouest." },
      },
      {
        '@type': 'Question',
        name: 'Comment me contacter pour un projet ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Via le formulaire de contact sur dvs-web.fr/contact ou directement par email à contact@dvs-web.fr.' },
      },
    ],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://dvs-web.fr',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://dvs-web.fr/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://dvs-web.fr/blog/${post.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BlogPostPage post={post} contentHtml={contentHtml} />
    </>
  )
}
