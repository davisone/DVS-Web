import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { Linkedin, Github, Mail } from 'lucide-react'

const navigation = {
  main: [
    { name: 'Accueil', href: '/' },
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
  ],
  social: [
    { name: 'LinkedIn', href: 'https://linkedin.com/in/', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/', icon: Github },
    { name: 'Email', href: 'mailto:contact@davison-developpement.fr', icon: Mail },
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
              <span className="font-semibold text-white">Davison Développement</span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Développeur web freelance basé près de Rennes.
              Création de sites et applications sur-mesure.
            </p>
            <div className="flex gap-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-accent transition-colors"
                  aria-label={item.name}
                >
                  <item.icon size={20} />
                </a>
              ))}
            </div>
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
                  href="mailto:contact@davison-developpement.fr"
                  className="hover:text-white transition-colors"
                >
                  contact@davison-developpement.fr
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
              © {currentYear} Davison Développement. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/mentions-legales" className="text-neutral-500 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/cgv" className="text-neutral-500 hover:text-white transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
