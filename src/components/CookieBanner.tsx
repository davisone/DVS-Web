'use client'

import { useState, useEffect } from 'react'
import { Cookie, X, Check, Settings } from 'lucide-react'
import Link from 'next/link'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Petit délai pour une apparition plus naturelle
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    } else {
      // Charger l'état actuel des préférences
      setAnalyticsEnabled(consent === 'all')
    }

    // Écouter l'événement pour rouvrir la bannière
    const handleOpenCookieBanner = () => {
      const currentConsent = localStorage.getItem('cookie-consent')
      setAnalyticsEnabled(currentConsent === 'all')
      setIsVisible(true)
      setShowDetails(true)
    }
    window.addEventListener('open-cookie-banner', handleOpenCookieBanner)
    return () => {
      window.removeEventListener('open-cookie-banner', handleOpenCookieBanner)
    }
  }, [])

  const savePreferences = () => {
    const consent = analyticsEnabled ? 'all' : 'essential'
    localStorage.setItem('cookie-consent', consent)
    setIsVisible(false)
    // Recharger pour appliquer les changements GA
    window.location.reload()
  }

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    setIsVisible(false)
    window.location.reload()
  }

  const refuseAll = () => {
    localStorage.setItem('cookie-consent', 'essential')
    setIsVisible(false)
    window.location.reload()
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div
        className="max-w-2xl mx-auto bg-secondary border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
      >
        {/* Header avec cookie animé */}
        <div className="p-5 pb-0">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Cookie className="w-6 h-6 text-accent animate-bounce" style={{ animationDuration: '2s' }} />
              </div>
              {/* Miettes de cookie */}
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent/60 rounded-full" />
              <div className="absolute -bottom-2 right-1 w-1.5 h-1.5 bg-accent/40 rounded-full" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                Un cookie ? 🍪
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Pas ceux qu&apos;on mange malheureusement... Ce site utilise des cookies pour
                améliorer votre expérience. Promis, on ne fait rien de bizarre avec vos données.
              </p>
            </div>

            <button
              onClick={refuseAll}
              className="text-neutral-500 hover:text-neutral-300 transition-colors p-1"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Détails (si ouverts) */}
        {showDetails && (
          <div className="px-5 pt-4 space-y-3 animate-fade-in">
            {/* Cookies essentiels - toujours activés */}
            <div className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg">
              <div>
                <p className="text-white text-sm font-medium">Cookies essentiels</p>
                <p className="text-neutral-500 text-xs">Nécessaires au fonctionnement du site</p>
              </div>
              <div
                className="w-10 h-6 bg-accent/20 rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-70"
                title="Toujours activés"
              >
                <div className="w-4 h-4 bg-accent rounded-full" />
              </div>
            </div>

            {/* Cookies analytiques - toggle interactif */}
            <button
              onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
              className="w-full flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg hover:bg-neutral-800/70 transition-colors"
            >
              <div className="text-left">
                <p className="text-white text-sm font-medium">Cookies analytiques</p>
                <p className="text-neutral-500 text-xs">Pour comprendre comment vous utilisez le site</p>
              </div>
              <div
                className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                  analyticsEnabled ? 'bg-accent/20 justify-end' : 'bg-neutral-700 justify-start'
                }`}
              >
                <div className={`w-4 h-4 rounded-full transition-colors ${
                  analyticsEnabled ? 'bg-accent' : 'bg-neutral-500'
                }`} />
              </div>
            </button>

            <p className="text-neutral-500 text-xs">
              Plus d&apos;infos dans notre{' '}
              <Link href="/mentions-legales" className="text-accent hover:underline">
                politique de confidentialité
              </Link>
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="p-5 pt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-neutral-400 hover:text-white text-sm transition-colors"
          >
            <Settings className="w-4 h-4" />
            {showDetails ? 'Masquer' : 'Personnaliser'}
          </button>

          <div className="flex-1 flex gap-3 sm:justify-end">
            {showDetails ? (
              <button
                onClick={savePreferences}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-primary text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
              >
                <Check className="w-4 h-4" />
                Enregistrer
              </button>
            ) : (
              <>
                <button
                  onClick={refuseAll}
                  className="flex-1 sm:flex-initial px-4 py-2.5 border border-neutral-700 text-neutral-300 text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Refuser
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-primary text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Accepter
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}