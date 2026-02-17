'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { BlogPost, BlogCategory, categories } from '@/data/blog'
import { formatDate } from '@/lib/utils'

interface BlogPageProps {
  posts: BlogPost[]
}

const allCategories: (BlogCategory | 'all')[] = ['all', 'prix', 'conseils', 'seo', 'tendances']

export function BlogPage({ posts }: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all')

  const filteredPosts =
    activeCategory === 'all'
      ? posts
      : posts.filter((post) => post.category === activeCategory)

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Blog
              </span>
              <h1 className="heading-1 mt-4">
                Conseils & Ressources{' '}
                <span className="text-gradient-accent">Web</span>
              </h1>
              <p className="text-body mt-6 max-w-2xl">
                Guides pratiques, conseils SEO et actualités du développement web à
                Rennes. Tout pour réussir votre présence en ligne.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container-custom">
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-3" role="tablist" aria-label="Filtrer par catégorie">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-accent text-primary'
                      : 'bg-secondary border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
                  }`}
                >
                  {cat === 'all' ? 'Tous les articles' : categories[cat].label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-24 md:pb-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredPosts.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="card h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent">
                        {categories[post.category].label}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300 mb-3">
                      {post.title}
                    </h2>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                      <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                      <span className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        Lire
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-neutral-400">
                Aucun article dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
