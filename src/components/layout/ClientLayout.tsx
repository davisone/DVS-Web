'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { IntroAnimation } from '@/components/animations/IntroAnimation'
import CookieBanner from '@/components/CookieBanner'
import GoogleAnalytics from '@/components/GoogleAnalytics'

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [showIntro, setShowIntro] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
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
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </div>
    </>
  )
}
