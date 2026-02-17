'use client'

import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { BlogPost, categories } from '@/data/blog'
import { formatDate } from '@/lib/utils'

interface BlogPostPageProps {
  post: BlogPost
  contentHtml: string
}

export function BlogPostPage({ post, contentHtml }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-custom max-w-4xl">
          <ScrollReveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent">
                {categories[post.category].label}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <h1 className="heading-2 mb-6">{post.title}</h1>
            <p className="text-body text-neutral-400 max-w-3xl">
              {post.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom max-w-4xl">
          <ScrollReveal delay={0.1}>
            <article
              className="prose-blog"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Tags */}
      {post.tags.length > 0 && (
        <section className="pb-12">
          <div className="container-custom max-w-4xl">
            <ScrollReveal delay={0.2}>
              <div className="flex items-center gap-3 flex-wrap pt-8 border-t border-neutral-800">
                <Tag className="w-4 h-4 text-neutral-500" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary border border-neutral-800 text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* CTA Contact */}
      <section className="pb-24 md:pb-32">
        <div className="container-custom max-w-4xl">
          <ScrollReveal delay={0.3}>
            <div className="bg-secondary rounded-2xl p-8 md:p-12 border border-neutral-800 text-center">
              <h2 className="heading-3 mb-4">
                Un projet web en tête ?
              </h2>
              <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
                Développeur web freelance à Rennes, je vous accompagne dans la
                création de votre site internet, application web ou stratégie SEO.
              </p>
              <Link href="/contact" className="btn-primary">
                Discutons de votre projet
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
