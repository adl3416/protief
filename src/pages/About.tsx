import React from 'react'

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Wer wir sind
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            ProTief bietet ganzheitliche und schlüsselfertige Lösungen für den Ausbau moderner Glasfasernetze in Deutschland.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Unsere Expertise
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Erfahrene Experten aus den Bereichen Telekommunikation und Tiefbau sorgen für höchste Qualität und Effizienz. 
                ProTief Baumanagement GmbH steht für professionelle Glasfaser-Infrastruktur in ganz Deutschland.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Unser Standort in Düsseldorf ermöglicht es uns, Projekte in ganz Deutschland 
                effizient zu betreuen. Wir verstehen die lokalen Gegebenheiten und arbeiten 
                eng mit Behörden, Partnern und Kunden zusammen.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-4 text-gray-700">
                    <span className="font-semibold">Ganzheitliche Lösungen:</span> Von der Planung bis zur Wartung
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-4 text-gray-700">
                    <span className="font-semibold">Schlüsselfertig:</span> Komplette Projektabwicklung aus einer Hand
                  </p>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Düsseldorf Skyline"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Unsere Vision</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Als zuverlässiger Partner ein stabiles, zukunftssicheres Breitbandnetz mitzugestalten.
              </p>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700 italic">
                  "Wir arbeiten daran, Deutschland flächendeckend mit modernster Glasfaser-Infrastruktur zu versorgen."
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Unsere Mission</h3>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Zugang zu moderner Technologie für alle – sicher, nachhaltig und kundenorientiert.
              </p>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-700 italic">
                  "Jeder Mensch in Deutschland soll Zugang zu schnellem, zuverlässigem Internet haben."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unsere Werte
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Diese Prinzipien leiten uns bei jedem Projekt und jeder Entscheidung für eine zukunftssichere Glasfaser-Infrastruktur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Qualität</h3>
              <p className="text-gray-600">
                Höchste Qualität durch erfahrene Experten aus Telekommunikation und Tiefbau 
                für langlebige Glasfaser-Infrastruktur.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Effizienz</h3>
              <p className="text-gray-600">
                Ganzheitliche und schlüsselfertige Lösungen für optimierte Prozesse 
                und termingerechte Projektabwicklung.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-8.5c-.01 0-.01 0 0 0h-1.5l-3-3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Kundenorientierung</h3>
              <p className="text-gray-600">
                Sicher, nachhaltig und kundenorientiert – jeder Auftrag wird 
                individuell und mit höchster Aufmerksamkeit betreut.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unser Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Erfahrene Experten mit Leidenschaft für Glasfaser-Technologie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Projektleitung</h3>
              <p className="text-blue-600 mb-4">Erfahrene Projektmanager</p>
              <p className="text-gray-600">
                Unsere Projektleiter koordinieren komplexe Bauvorhaben mit 
                jahrelanger Erfahrung im Glasfaserbereich.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-32 h-32 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Technische Planung</h3>
              <p className="text-green-600 mb-4">Ingenieurbüro</p>
              <p className="text-gray-600">
                Unser Planungsteam erstellt präzise HLD/LLD-Dokumentationen 
                und optimiert Trassenverläufe.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-32 h-32 bg-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bauausführung</h3>
              <p className="text-purple-600 mb-4">Fachkräfte vor Ort</p>
              <p className="text-gray-600">
                Qualifizierte Tiefbauexperten und Glasfaser-Techniker 
                sorgen für fachgerechte Ausführung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Bereit für Ihr Glasfaser-Projekt?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Lassen Sie uns gemeinsam die Grundlage für Ihre digitale Zukunft schaffen. 
            Kontaktieren Sie uns für eine unverbindliche Beratung.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/kontakt" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Jetzt Kontakt aufnehmen
            </a>
            <a 
              href="/leistungen" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Unsere Leistungen
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
