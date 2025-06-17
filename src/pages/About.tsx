import React from 'react'

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Über ProTief Baumanagement
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Ihr vertrauensvoller Partner für Glasfaser-Infrastruktur in Deutschland
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">
                Unsere Geschichte
              </h2>
              <p className="text-lg text-secondary-600 mb-6 leading-relaxed">
                ProTief Baumanagement GmbH wurde mit der Vision gegründet, Deutschland 
                mit modernster Glasfaser-Infrastruktur zu versorgen. Seit unserer Gründung 
                haben wir uns als zuverlässiger Partner für komplexe Telekommunikations- 
                und Tiefbauprojekte etabliert.
              </p>
              <p className="text-lg text-secondary-600 mb-6 leading-relaxed">
                Unser Standort in Düsseldorf ermöglicht es uns, Projekte in ganz Deutschland 
                effizient zu betreuen. Wir verstehen die lokalen Gegebenheiten und arbeiten 
                eng mit Behörden, Partnern und Kunden zusammen.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Düsseldorf Skyline"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Unsere Werte
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              Diese Prinzipien leiten uns bei jedem Projekt und jeder Entscheidung
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Effizienz</h3>
              <p className="text-secondary-600">
                Optimierte Prozesse und modernste Technologien für termingerechte 
                und kosteneffiziente Projektabwicklung.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Qualität</h3>
              <p className="text-secondary-600">
                Höchste Standards bei Planung, Ausführung und Dokumentation. 
                Qualität ist unser Markenzeichen.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Vision</h3>
              <p className="text-secondary-600">
                Wir gestalten die digitale Zukunft Deutschlands durch moderne 
                Glasfaser-Infrastruktur aktiv mit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8">
            Unsere Mission
          </h2>
          <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
            Wir schaffen die Grundlage für eine vernetzte Zukunft. Durch den Bau 
            zuverlässiger Glasfaser-Infrastruktur ermöglichen wir Unternehmen und 
            Privatkunden den Zugang zu schnellem Internet und modernen digitalen Services.
          </p>
          <div className="bg-primary-50 rounded-lg p-8">
            <blockquote className="text-2xl font-medium text-primary-800 italic">
              "Jede Glasfaser, die wir verlegen, ist ein Schritt in Richtung 
              einer digital vernetzten Gesellschaft."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Unser Team
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              Erfahrene Experten mit Leidenschaft für Glasfaser-Technologie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-32 h-32 bg-primary-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Projektleitung</h3>
              <p className="text-primary-600 mb-4">Erfahrene Projektmanager</p>
              <p className="text-secondary-600">
                Unsere Projektleiter koordinieren komplexe Bauvorhaben mit 
                jahrelanger Erfahrung im Glasfaserbereich.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-32 h-32 bg-primary-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Technische Planung</h3>
              <p className="text-primary-600 mb-4">Ingenieurbüro</p>
              <p className="text-secondary-600">
                Unser Planungsteam erstellt präzise HLD/LLD-Dokumentationen 
                und optimiert Trassenverläufe.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-32 h-32 bg-primary-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Bauausführung</h3>
              <p className="text-primary-600 mb-4">Fachkräfte vor Ort</p>
              <p className="text-secondary-600">
                Qualifizierte Tiefbauexperten und Glasfaser-Techniker 
                sorgen für fachgerechte Ausführung.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
