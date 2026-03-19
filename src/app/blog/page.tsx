import { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { BlogPage } from './BlogPage'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Conseils, guides et actualités sur la création de sites web, le SEO local et le développement web à Rennes. Par DVS Web, développeur freelance.',
  alternates: {
    canonical: 'https://dvs-web.fr/blog',
  },
  openGraph: {
    title: 'Blog — DVS Web',
    description:
      'Conseils, guides et actualités sur la création de sites web, le SEO local et le développement web à Rennes.',
    url: 'https://dvs-web.fr/blog',
    type: 'website',
  },
}

export default function Page() {
  const posts = getAllPosts()

  return <BlogPage posts={posts} />
}
