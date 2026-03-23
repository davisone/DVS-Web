import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { villesFrance } from '@/data/villes-france'
import { metiers } from '@/data/metiers'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dvs-web.fr'

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2026-02-24'),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date('2026-02-24'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tarifs`,
      lastModified: new Date('2026-02-24'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/realisations`,
      lastModified: new Date('2026-01-15'),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2025-06-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date('2026-02-24'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/developpeur-web-rennes`,
      lastModified: new Date('2026-02-24'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/creation-site-internet`,
      lastModified: new Date('2026-03-22'),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/site-internet-pour`,
      lastModified: new Date('2026-03-22'),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date('2026-02-24'),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date('2025-06-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cgv`,
      lastModified: new Date('2025-06-01'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  const posts = getAllPosts()
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const villesRoutes: MetadataRoute.Sitemap = villesFrance.map((ville) => ({
    url: `${baseUrl}/creation-site-internet/${ville.slug}`,
    lastModified: new Date('2026-03-16'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const metiersRoutes: MetadataRoute.Sitemap = metiers.map((metier) => ({
    url: `${baseUrl}/site-internet-pour/${metier.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const villeMetierRoutes: MetadataRoute.Sitemap = villesFrance.flatMap((ville) =>
    ville.metiersPresents.map((metierSlug) => ({
      url: `${baseUrl}/creation-site-internet/${ville.slug}/${metierSlug}`,
      lastModified: new Date('2026-03-23'),
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    }))
  )

  return [...routes, ...villesRoutes, ...blogRoutes, ...metiersRoutes, ...villeMetierRoutes]
}
