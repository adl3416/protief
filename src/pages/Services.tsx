import React from 'react'
import { 
  ClipboardDocumentListIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  WrenchScrewdriverIcon,
  CogIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

const Services: React.FC = () => {
  const services = [
    {
      icon: ClipboardDocumentListIcon,
      title: 'Entwurf & Planung',
      subtitle: 'Präzise Projektplanung von Anfang an',
      features: [
        'High Level Design (HLD)',
        'Low Level Design (LLD)',
        'Trassenplanung und -optimierung',
        'Materialbedarfsermittlung',
        'Genehmigungsplanung',
        'Kostenschätzung und Kalkulation'
      ],
      description: 'Unsere erfahrenen Planer erstellen detaillierte Projektunterlagen und optimieren Trassenverläufe für maximale Effizienz.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: UserGroupIcon,
      title: 'Projektleitung',
      subtitle: 'Professionelles Projektmanagement',
      features: [
        'Projektkoordination und -steuerung',
        'Nachweise und Dokumentation',
        'Behördenkommunikation',
        'Qualitätssicherung',
        'Terminplanung und -überwachung',
        'Stakeholder-Management'
      ],
      description: 'Unsere Projektleiter koordinieren alle Beteiligten und sorgen für reibungslose Abläufe vom ersten Spatenstich bis zur Abnahme.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: BuildingOffice2Icon,
      title: 'Netzbau',
      subtitle: 'Fachgerechte Bauausführung',
      features: [
        'Tiefbauarbeiten',
        'Rohrleitungsbau',
        'Glasfaser-Einblasung',
        'Installation passiver Technik',
        'Kabelverlegung',
        'Baustellenmanagement'
      ],
      description: 'Unser Bauteam führt alle Tiefbau- und Installationsarbeiten mit modernster Technik und höchsten Qualitätsstandards durch.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: WrenchScrewdriverIcon,
      title: 'Kundenanbindung',
      subtitle: 'Der letzte Meter zum Kunden',
      features: [
        'Hausanschlüsse (HÜP)',
        'Inhouse-Verkabelung',
        'Technische Abnahme',
        'Aktivierung der Verbindungen',
        'Endkundentermine',
        'Funktionsprüfungen'
      ],
      description: 'Wir sorgen für die finale Anbindung der Endkunden und stellen sicher, dass alle Verbindungen einwandfrei funktionieren.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: CogIcon,
      title: 'Wartung & Support',
      subtitle: 'Langfristige Betreuung',
      features: [
        'Präventive Wartung',
        'Störfallmanagement',
        '24/7 Bereitschaftsdienst',
        'Betriebsbegleitung',
        'Netzwerkmonitoring',
        'Reparatur und Instandhaltung'
      ],
      description: 'Unser Service-Team gewährleistet den langfristigen, störungsfreien Betrieb Ihrer Glasfaser-Infrastruktur.',
      color: 'from-red-500 to-red-600'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Unsere Leistungen
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Komplette Glasfaser-Infrastrukturlösungen aus einer Hand – 
            von der Planung bis zur Wartung
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Ihr Partner für jede Projektphase
            </h2>
            <p className="text-lg text-secondary-600 max-w-4xl mx-auto">
              Von der ersten Idee bis zum laufenden Betrieb begleiten wir Sie durch 
              alle Phasen Ihres Glasfaser-Projekts. Unsere integrierten Leistungen 
              gewährleisten optimale Ergebnisse bei minimalen Schnittstellen.
            </p>
          </div>

          <div className="space-y-20">
            {services.map((service, index) => (
              <div key={index} className={`${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} flex flex-col lg:flex-row items-center gap-12`}>
                <div className="lg:w-1/2">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} mb-6`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-secondary-900 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-xl text-primary-600 mb-6 font-medium">
                    {service.subtitle}
                  </p>
                  
                  <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-secondary-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <div className={`bg-gradient-to-r ${service.color} rounded-2xl p-8 shadow-xl`}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white">
                      <service.icon className="h-24 w-24 mx-auto mb-6 opacity-80" />
                      <h4 className="text-2xl font-bold text-center mb-4">
                        {service.title}
                      </h4>
                      <p className="text-center text-lg opacity-90">
                        Professionelle Umsetzung mit modernster Technik und 
                        jahrelanger Erfahrung im Glasfaserbereich.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Unser Projektablauf
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              So arbeiten wir - strukturiert, transparent und effizient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <service.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute top-10 left-full w-8 h-0.5 bg-gray-300 hidden lg:block">
                    {index < services.length - 1 && (
                      <div className="w-full h-full bg-primary-300"></div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                    {index + 1}. {service.title}
                  </h3>
                  <p className="text-sm text-secondary-600">
                    {service.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Bereit für Ihr Glasfaser-Projekt?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Lassen Sie uns über Ihre Anforderungen sprechen und eine 
            maßgeschneiderte Lösung entwickeln.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Beratungstermin vereinbaren
            </a>
            <a
              href="tel:+49211123456"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200"
            >
              +49 (0) 211 123 456
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
