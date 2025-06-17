import React from 'react'
import { Link } from 'react-router-dom'
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">ProTief</span>
              <span className="text-2xl font-light text-secondary-300 ml-1">
                Baumanagement
              </span>
            </div>
            <p className="text-secondary-300 mb-4 leading-relaxed">
              Ihr Partner für Glasfaser-Infrastruktur in Deutschland. 
              Wir bieten ganzheitliche Lösungen von der Planung bis zur Wartung.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-secondary-300">
                <MapPinIcon className="h-5 w-5 mr-3 text-primary-400" />
                <span>Düsseldorf, Deutschland</span>
              </div>
              <div className="flex items-center text-secondary-300">
                <PhoneIcon className="h-5 w-5 mr-3 text-primary-400" />
                <span>+49 (0) 211 123 456</span>
              </div>
              <div className="flex items-center text-secondary-300">
                <EnvelopeIcon className="h-5 w-5 mr-3 text-primary-400" />
                <span>info@protief-bau.de</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-white transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <Link to="/ueber-uns" className="text-secondary-300 hover:text-white transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link to="/leistungen" className="text-secondary-300 hover:text-white transition-colors">
                  Leistungen
                </Link>
              </li>
              <li>
                <Link to="/projekte" className="text-secondary-300 hover:text-white transition-colors">
                  Projekte
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Leistungen</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-secondary-300">Entwurf & Planung</span>
              </li>
              <li>
                <span className="text-secondary-300">Projektleitung</span>
              </li>
              <li>
                <span className="text-secondary-300">Netzbau</span>
              </li>
              <li>
                <span className="text-secondary-300">Kundenanbindung</span>
              </li>
              <li>
                <span className="text-secondary-300">Wartung & Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              © 2025 ProTief Baumanagement GmbH. Alle Rechte vorbehalten.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/datenschutz" className="text-secondary-400 hover:text-white text-sm transition-colors">
                Datenschutz
              </Link>
              <Link to="/impressum" className="text-secondary-400 hover:text-white text-sm transition-colors">
                Impressum
              </Link>
              <Link to="/agb" className="text-secondary-400 hover:text-white text-sm transition-colors">
                AGB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
