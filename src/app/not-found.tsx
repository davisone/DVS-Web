import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, ArrowLeft, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page introuvable',
  description:
    'La page que vous recherchez n\'existe pas ou a été déplacée. Retournez à l\'accueil de DVS Web.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <span className="text-[150px] md:text-[200px] font-bold text-neutral-800 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl md:text-8xl font-bold text-gradient-accent">
              Oops !
            </span>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-semibold text-neutral-100 mb-4">
          Page introuvable
        </h1>
        <p className="text-neutral-400 mb-8 max-w-md mx-auto">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Pas d&apos;inquiétude, je peux vous aider à trouver ce que vous cherchez.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-primary font-medium rounded-lg hover:bg-accent/90 transition-colors"
          >
            <Home className="w-5 h-5" />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-neutral-700 text-neutral-200 font-medium rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Me contacter
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <p className="text-neutral-500 text-sm mb-4">Pages populaires</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/services"
              className="text-neutral-400 hover:text-accent transition-colors text-sm"
            >
              Services
            </Link>
            <Link
              href="/tarifs"
              className="text-neutral-400 hover:text-accent transition-colors text-sm"
            >
              Tarifs
            </Link>
            <Link
              href="/realisations"
              className="text-neutral-400 hover:text-accent transition-colors text-sm"
            >
              Réalisations
            </Link>
            <Link
              href="/a-propos"
              className="text-neutral-400 hover:text-accent transition-colors text-sm"
            >
              À propos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}