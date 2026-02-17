'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import CookieBanner from '@/components/CookieBanner'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const IntroAnimation = dynamic(
  () => import('@/components/animations/IntroAnimation').then((mod) => mod.IntroAnimation),
  { ssr: false }
)

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [showIntro, setShowIntro] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    // Respecter la préférence d'accessibilité
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setIntroComplete(true)
      return
    }

    // Vérifier si l'animation a déjà été jouée dans cette session
    const hasSeenIntro = sessionStorage.getItem('dd-intro-seen')

    if (!hasSeenIntro) {
      setShowIntro(true)
    } else {
      setIntroComplete(true)
    }
  }, [])

  const handleIntroComplete = () => {
    sessionStorage.setItem('dd-intro-seen', 'true')
    setIntroComplete(true)
  }

  return (
    <>
      <GoogleAnalytics />
      {showIntro && !introComplete && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      <div
        className={
          introComplete || !showIntro
            ? 'opacity-100'
            : 'opacity-0'
        }
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-accent focus:text-primary focus:rounded-lg focus:font-medium focus:text-sm"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieBanner />
      </div>
    </>
  )
}
