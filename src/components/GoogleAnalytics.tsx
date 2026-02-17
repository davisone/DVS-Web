'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

export default function GoogleAnalytics() {
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent')
      setConsentGiven(consent === 'all')
    }

    // Vérifier au chargement
    checkConsent()

    // Écouter les changements de localStorage (depuis un autre onglet)
    const handleStorageChange = () => checkConsent()
    window.addEventListener('storage', handleStorageChange)

    // Écouter l'événement custom (depuis le même onglet, déclenché par CookieBanner)
    window.addEventListener('cookie-consent-changed', checkConsent)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cookie-consent-changed', checkConsent)
    }
  }, [])

  if (!consentGiven || !GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  )
}