'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { projects, categories } from '@/data/projects'
import { ExternalLink, ArrowRight, Check, MapPin, User, Briefcase, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function RealisationsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  const getCategoryLabel = (category: string) => {
    const cat = categories.find((c) => c.id === category)
    return cat?.label || category
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Réalisations
              </span>
              <h1 className="heading-1 mt-3 mb-6">Mes projets</h1>
              <p className="text-body">
                Projets clients et personnels qui démontrent mon savoir-faire
                en développement web et mobile.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filtres */}
      <section className="pb-8">
        <div className="container-custom">
          <ScrollReveal>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par catégorie">
              {categories.map((category) => (
                <button
                  key={category.id}
                  role="tab"
                  aria-selected={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    activeCategory === category.id
                      ? 'bg-accent text-primary'
                      : 'bg-secondary text-neutral-400 hover:text-white hover:bg-secondary-light'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Projets */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <AnimatePresence mode="popLayout">
            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScrollReveal>
                    <div className="card p-0 overflow-hidden">
                      {/* Header du projet */}
                      <div
                        className="bg-gradient-to-r from-accent/10 to-transparent p-6 md:p-8 border-b border-neutral-800 cursor-pointer"
                        onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h2 className="text-2xl md:text-3xl font-bold text-white">
                                {project.title}
                              </h2>
                              <span className="px-3 py-1 text-xs font-medium bg-accent/20 text-accent rounded-full">
                                {getCategoryLabel(project.category)}
                              </span>
                              {project.isPersonalProject ? (
                                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full">
                                  <User size={12} />
                                  Projet personnel
                                </span>
                              ) : project.isInternalProject ? (
                                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-400 rounded-full">
                                  <Building2 size={12} />
                                  Projet interne
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full">
                                  <Briefcase size={12} />
                                  Projet client
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-neutral-400 text-sm">
                              {project.location && (
                                <>
                                  <MapPin size={14} />
                                  <span>{project.location}</span>
                                  <span className="text-neutral-600">•</span>
                                </>
                              )}
                              <span>{project.year}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-primary font-medium rounded-lg hover:bg-accent-light transition-colors"
                              >
                                Voir le site
                                <ExternalLink size={18} />
                              </a>
                            )}
                            <button
                              aria-label={expandedProject === project.id ? 'Fermer les détails' : 'Voir les détails'}
                              aria-expanded={expandedProject === project.id}
                              className={cn(
                                'p-2 rounded-lg transition-all',
                                expandedProject === project.id
                                  ? 'bg-neutral-700 rotate-180'
                                  : 'bg-neutral-800 hover:bg-neutral-700'
                              )}
                            >
                              <ArrowRight size={20} className="rotate-90 text-neutral-400" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Contenu expandable */}
                      <AnimatePresence>
                        {expandedProject === project.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 md:p-8">
                              {/* Description */}
                              <div className="mb-8">
                                <p className="text-lg text-neutral-300 mb-4">
                                  {project.description}
                                </p>
                                {project.longDescription && (
                                  <p className="text-neutral-400">
                                    {project.longDescription}
                                  </p>
                                )}
                              </div>

                              {/* Technologies */}
                              <div className="mb-8">
                                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
                                  Technologies utilisées
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                  {project.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-3 py-1.5 text-sm bg-neutral-800 text-neutral-300 rounded-lg"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Fonctionnalités */}
                              {project.features && project.features.length > 0 && (
                                <div>
                                  <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-4">
                                    Fonctionnalités réalisées
                                  </h3>
                                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {project.features.map((feature, index) => (
                                      <motion.div
                                        key={feature}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                        className="flex items-start gap-3 p-3 bg-neutral-800/50 rounded-lg"
                                      >
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                                          <Check size={12} className="text-accent" />
                                        </div>
                                        <span className="text-sm text-neutral-300">{feature}</span>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </ScrollReveal>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-neutral-400">
                Aucun projet dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section "D'autres projets à venir" */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center py-12 border border-dashed border-neutral-700 rounded-2xl bg-neutral-900/30">
              <p className="text-neutral-400 mb-2">
                D&apos;autres projets seront ajoutés ici au fil de mes collaborations.
              </p>
              <p className="text-sm text-neutral-500">
                Votre projet pourrait être le prochain.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="heading-2 mb-4">Votre projet ici ?</h2>
              <p className="text-body max-w-xl mx-auto mb-8">
                Vous avez un projet en tête ? Discutons-en et voyons comment
                je peux vous aider à le concrétiser.
              </p>
              <Button href="/contact" size="lg">
                Discuter de mon projet
                <ArrowRight size={20} />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}