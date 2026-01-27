'use client'

import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { Cookie } from 'lucide-react'

const navigation = {
  main: [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/a-propos' },
    { name: 'Services', href: '/services' },
    { name: 'Tarifs', href: '/tarifs' },
    { name: 'Réalisations', href: '/realisations' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Création de sites', href: '/services#creation-site' },
    { name: 'Refonte de sites', href: '/services#refonte-site' },
    { name: 'Référencement SEO', href: '/services#seo' },
    { name: 'Applications web', href: '/services#application-web' },
    { name: 'Applications mobiles', href: '/services#application-mobile' },
    { name: 'Développeur web Rennes', href: '/developpeur-web-rennes' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary border-t border-neutral-800">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Logo size="sm" />
              <span className="font-semibold text-white">DVS Web</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Développeur web freelance basé près de Rennes.
              Création de sites et applications sur-mesure.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <a
                  href="mailto:contact@dvs-web.fr"
                  className="hover:text-white transition-colors"
                >
                  contact@dvs-web.fr
                </a>
              </li>
              <li>
                <a href="tel:+33651019506" className="hover:text-white transition-colors">
                  06 51 01 95 06
                </a>
              </li>
              <li>Rennes et alentours, France</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              © {currentYear} DVS Web. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm">
              <Link href="/mentions-legales" className="text-neutral-500 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/cgv" className="text-neutral-500 hover:text-white transition-colors">
                CGV
              </Link>
              <button
                onClick={() => window.dispatchEvent(new Event('open-cookie-banner'))}
                className="text-neutral-500 hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <Cookie className="w-3.5 h-3.5" />
                Gérer les cookies
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
