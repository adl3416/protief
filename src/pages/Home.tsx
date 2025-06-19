import React from 'react'
import Hero from '../components/Hero'
import { 
  WrenchScrewdriverIcon, 
  ClipboardDocumentListIcon, 
  BuildingOffice2Icon, 
  UserGroupIcon, 
  CogIcon,
  ArrowRightIcon,
  PhoneIcon 
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { loadContent } from '../admin/contentManager'
import type { Partner } from '../types'

const Home: React.FC = () => {
  const [partners, setPartners] = React.useState<Partner[]>([])
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const content = await loadContent()
        setPartners(content.partners)
      } catch (error) {
        console.error('Error loading content:', error)
      }
    }
    loadData()
  }, [])

  // Debug: Content güncellendikten sonra sayfa yenilenir
  React.useEffect(() => {
    const handleStorageChange = async () => {
      try {
        const content = await loadContent()
        setPartners(content.partners)
      } catch (error) {
        console.error('Error loading content:', error)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const services = [
    {
      icon: ClipboardDocumentListIcon,
      title: 'Entwurf & Planung',
      description: 'HLD, LLD, Trassenplanung und präzise Materialbedarfsermittlung für Ihr Glasfaserprojekt.',
      color: 'bg-blue-500'
    },
    {
      icon: UserGroupIcon,
      title: 'Projektleitung',
      description: 'Professionelle Nachweise, Behördenkommunikation und umfassende Projektbewertung.',
      color: 'bg-green-500'
    },
    {
      icon: BuildingOffice2Icon,
      title: 'Netzbau',
      description: 'Fachgerechter Tiefbau, Einblasen von Glasfasern und Installation passiver Technik.',
      color: 'bg-purple-500'
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'Kundenanbindung',
      description: 'Hausanschlüsse, technische Abnahme und professionelle Aktivierung der Verbindungen.',
      color: 'bg-orange-500'
    },
    {
      icon: CogIcon,
      title: 'Wartung & Support',
      description: 'Zuverlässiges Störfallmanagement und kontinuierliche Betriebsbegleitung.',
      color: 'bg-red-500'
    }
  ]

  return (    <div>
      {/* Hero Section */}
      <Hero />

      {/* Warum ProTief Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Warum ProTief Baumanagement?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Glasfaser-Infrastruktur aus einer Hand – 
              Vertrauen Sie auf unsere Expertise in Düsseldorf und Umgebung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-6">
                <ClipboardDocumentListIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Komplettlösung
              </h3>
              <p className="text-gray-600">
                Planung, Tiefbau, Installation und Wartung – alles aus einer Quelle für maximale Effizienz.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600 mb-6">
                <UserGroupIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Lokale Expertise
              </h3>
              <p className="text-gray-600">
                Spezialist für Düsseldorf und Umgebung mit jahrelanger Erfahrung in der Region.
              </p>
            </div>            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600 mb-6">
                <WrenchScrewdriverIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Modernste Technik
              </h3>
              <p className="text-gray-600">
                Neueste Glasfaser-Technologie und moderne Verlegeverfahren für optimale Ergebnisse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Unsere Leistungen
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Komplette Glasfaser-Infrastrukturlösungen aus einer Hand – 
              von der ersten Planung bis zur finalen Wartung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${service.color} mb-6`}>
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/leistungen"
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Alle Leistungen ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-secondary-900 mb-6">
                Wer wir sind
              </h2>
              <p className="text-xl text-secondary-600 mb-6 leading-relaxed">
                Als erfahrener Partner für Glasfaser-Infrastruktur bieten wir ganzheitliche 
                Lösungen für Glasfasernetze in ganz Deutschland.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-4 text-secondary-700">
                    <span className="font-semibold">Effizienz:</span> Optimierte Prozesse für termingerechte Projektabwicklung
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-4 text-secondary-700">
                    <span className="font-semibold">Qualität:</span> Höchste Standards bei Planung und Ausführung
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-4 text-secondary-700">
                    <span className="font-semibold">Vision:</span> Digitale Zukunft durch moderne Glasfaser-Infrastruktur
                  </p>
                </div>
              </div>
              <Link
                to="/ueber-uns"
                className="inline-flex items-center mt-8 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Mehr über uns erfahren
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Team bei der Arbeit"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>      {/* Partners Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unsere Partner
            </h2>
            <p className="text-lg text-gray-600">
              Vertrauen Sie auf bewährte Partnerschaften in der Glasfaser-Branche
            </p>
          </div>          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group-hover:border-blue-200">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} Logo`}
                    className="h-14 w-auto mx-auto grayscale group-hover:grayscale-0 transition-all duration-300 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Bereit für Ihr Glasfaser-Projekt?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Planung, Tiefbau, Installation und Wartung – 
            lassen Sie uns gemeinsam die digitale Infrastruktur der Zukunft aufbauen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/leistungen"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Unsere Leistungen
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/kontakt"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Kontakt aufnehmen
              <PhoneIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
