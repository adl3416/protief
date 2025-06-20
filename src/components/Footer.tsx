import React from 'react'
import { Link } from 'react-router-dom'
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/logo-compact.svg" 
                alt="ProTief Logo" 
                className="h-8 w-auto mr-3"
              />
              <span className="text-2xl font-bold text-white">ProTief</span>
              <span className="text-2xl font-light text-secondary-300 ml-1">
                Baumanagement
              </span>
            </div>
            <p className="text-secondary-300 mb-6 leading-relaxed">
              Ihr zuverlässiger Partner für Glasfaser-Infrastruktur in Deutschland. 
              Wir bieten ganzheitliche Lösungen von der Planung bis zur Wartung mit 
              modernster Technik und jahrelanger Erfahrung.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-secondary-300">
                <MapPinIcon className="h-5 w-5 mr-3 text-primary-400 flex-shrink-0" />
                <span>
                  ProTief Baumanagement GmbH<br />
                  Musterstraße 123, 40211 Düsseldorf
                </span>
              </div>
              <div className="flex items-center text-secondary-300">
                <PhoneIcon className="h-5 w-5 mr-3 text-primary-400 flex-shrink-0" />
                <span>+49 (0) 211 123 456</span>
              </div>
              <div className="flex items-center text-secondary-300">
                <EnvelopeIcon className="h-5 w-5 mr-3 text-primary-400 flex-shrink-0" />
                <span>info@protief-bau.de</span>
              </div>
              <div className="flex items-center text-secondary-300">
                <ClockIcon className="h-5 w-5 mr-3 text-primary-400 flex-shrink-0" />
                <span>Mo-Fr: 08:00-18:00 Uhr</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  Startseite
                </Link>
              </li>
              <li>
                <Link to="/ueber-uns" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  Über uns
                </Link>
              </li>
              <li>
                <Link to="/leistungen" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  Leistungen
                </Link>
              </li>
              <li>
                <Link to="/projekte" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  Projekte
                </Link>
              </li>
              <li>
                <Link to="/karriere" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  Karriere
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="text-secondary-300 hover:text-primary-400 transition-colors duration-200">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Leistungen</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-secondary-300">Glasfaser-Planung</span>
              </li>
              <li>
                <span className="text-secondary-300">Tiefbau & Verlegung</span>
              </li>
              <li>
                <span className="text-secondary-300">Projektleitung</span>
              </li>
              <li>
                <span className="text-secondary-300">Hausanschlüsse</span>
              </li>
              <li>
                <span className="text-secondary-300">Wartung & Service</span>
              </li>
              <li>
                <span className="text-secondary-300">Consulting</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-secondary-400 text-sm mb-4 md:mb-0">
              <p>© 2025 ProTief Baumanagement GmbH. Alle Rechte vorbehalten.</p>
              <p className="mt-1">HRB 12345 | Amtsgericht Düsseldorf | USt-IdNr.: DE123456789</p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <Link 
                to="/impressum" 
                className="text-secondary-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
                Impressum
              </Link>
              <Link 
                to="/datenschutz" 
                className="text-secondary-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
                Datenschutz
              </Link>
              <Link 
                to="/agb" 
                className="text-secondary-400 hover:text-primary-400 text-sm transition-colors duration-200"
              >
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
