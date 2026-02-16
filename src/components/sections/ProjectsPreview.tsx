import Link from 'next/link'
import { ArrowRight, ExternalLink, User, Briefcase, Building2 } from 'lucide-react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { projects } from '@/data/projects'

export function ProjectsPreview() {
  const featuredProjects = projects.slice(0, 3)

  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <ScrollReveal>
          <div className="text-center mb-12 md:mb-16">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              Réalisations
            </span>
            <h2 className="heading-2 mt-3 mb-4">
              Mes projets récents
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Projets clients et personnels qui illustrent mon savoir-faire
              en développement web et mobile.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <article className="card group overflow-hidden p-0 h-full">
                {/* Header avec badge */}
                <div className="p-6 pb-0">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {project.isPersonalProject ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
                        <User size={12} />
                        Projet personnel
                      </span>
                    ) : project.isInternalProject ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-purple-500/20 text-purple-400 rounded-full">
                        <Building2 size={12} />
                        Projet interne
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
                        <Briefcase size={12} />
                        Projet client
                      </span>
                    )}
                    <span className="text-neutral-500 text-xs">{project.year}</span>
                  </div>
                  <h3 className="text-xl text-white font-semibold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="px-6 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-neutral-800 text-neutral-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer avec lien */}
                {project.link && (
                  <div className="px-6 pb-6 pt-2 border-t border-neutral-800 mt-auto">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors"
                    >
                      Voir le site
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors font-medium"
            >
              Voir tous les projets
              <ArrowRight size={18} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}