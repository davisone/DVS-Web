'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

const GA_MEASUREMENT_ID = 'G-SJ3JK4GF4H'

export default function GoogleAnalytics() {
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent')
      setConsentGiven(consent === 'all')
    }

    // Vérifier au chargement
    checkConsent()

    // Écouter les changements de localStorage (si l'utilisateur change son choix)
    const handleStorageChange = () => checkConsent()
    window.addEventListener('storage', handleStorageChange)

    // Vérifier périodiquement (pour détecter les changements dans le même onglet)
    const interval = setInterval(checkConsent, 1000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  if (!consentGiven) return null

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