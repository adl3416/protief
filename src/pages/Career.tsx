import React from 'react'
import type { Job } from '../types'

const Career: React.FC = () => {
  const [jobs, setJobs] = React.useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = React.useState<Job[]>([])
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>('all')
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true)
        
        // First try to load from localStorage (admin changes)
        const saved = localStorage.getItem('protief-content')
        if (saved) {
          const content = JSON.parse(saved)
          if (content.jobs && content.jobs.length > 0) {
            const activeJobs = content.jobs.filter((job: Job) => job.isActive)
            setJobs(activeJobs)
            setFilteredJobs(activeJobs)
            setIsLoading(false)
            return
          }
        }

        // If no localStorage, try to load from API
        try {
          const response = await fetch('http://localhost:3001/api/content')
          if (response.ok) {
            const contentData = await response.json()
            const activeJobs = contentData.jobs.filter((job: Job) => job.isActive)
            setJobs(activeJobs)
            setFilteredJobs(activeJobs)
            setIsLoading(false)
            return
          }
        } catch (apiError) {
          console.warn('API not available, trying direct file load:', apiError)
        }

        // If no API, load from content.json file directly
        const response = await fetch('/src/data/content.json')
        const contentData = await response.json()
        const activeJobs = contentData.jobs.filter((job: Job) => job.isActive)
        setJobs(activeJobs)
        setFilteredJobs(activeJobs)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading jobs:', error)
        setIsLoading(false)
        // Keep empty jobs array as fallback
      }
    }    
    loadJobs()

    // Listen for content updates from admin panel
    const handleContentUpdate = () => {
      loadJobs()
    }
    
    window.addEventListener('protief-content-updated', handleContentUpdate)

    return () => {
      window.removeEventListener('protief-content-updated', handleContentUpdate)
    }
  }, [])

  // Filter jobs by department
  React.useEffect(() => {
    if (selectedDepartment === 'all') {
      setFilteredJobs(jobs)
    } else {
      setFilteredJobs(jobs.filter(job => job.department === selectedDepartment))
    }
  }, [jobs, selectedDepartment])

  // Get unique departments
  const departments = ['all', ...Array.from(new Set(jobs.map(job => job.department)))]

  const handleApply = (jobTitle: string) => {
    const subject = `Bewerbung: ${jobTitle}`
    const body = `Sehr geehrte Damen und Herren,\n\nhiermit bewerbe ich mich auf die ausgeschriebene Stelle "${jobTitle}".\n\nIm Anhang finden Sie meine vollständigen Bewerbungsunterlagen.\n\nMit freundlichen Grüßen`
    window.location.href = `mailto:karriere@protief-bau.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const benefits = [
    {
      title: 'Attraktive Vergütung',
      description: 'Wettbewerbsfähige Gehälter mit leistungsbezogenen Boni',
      icon: '💰'
    },
    {
      title: 'Flexible Arbeitszeiten',
      description: 'Work-Life-Balance durch flexible Arbeitszeit-Modelle',
      icon: '⏰'
    },
    {
      title: 'Weiterbildung',
      description: 'Regelmäßige Schulungen und Zertifizierungen',
      icon: '📚'
    },
    {
      title: 'Firmenwagen',
      description: 'Firmenwagen für Außendienst-Mitarbeiter',
      icon: '🚗'
    },
    {
      title: 'Teamevents',
      description: 'Regelmäßige Team-Events und Firmenausflüge',
      icon: '🎉'
    },
    {
      title: 'Zukunftssicherheit',
      description: 'Arbeitsplatz in einer zukunftsorientierten Branche',
      icon: '🚀'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Karriere bei ProTief
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Gestalten Sie mit uns die digitale Zukunft Deutschlands
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Warum ProTief Baumanagement?
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              Bei uns arbeiten Sie an spannenden Projekten in einer zukunftsorientierten 
              Branche mit einem erfahrenen und motivierten Team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-secondary-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Aktuelle Stellenausschreibungen
            </h2>
            <p className="text-lg text-secondary-600 mb-8">
              Finden Sie Ihre neue Herausforderung in unserem Team
            </p>
            
            {/* Department Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedDepartment === dept
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {dept === 'all' ? 'Alle Bereiche' : dept}
                </button>
              ))}
            </div>
          </div>          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <div className="text-xl font-semibold text-gray-900">Lade Stellenausschreibungen...</div>
                <div className="text-gray-600 mt-2">Bitte einen Moment Geduld</div>
              </div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <span className="flex items-center">
                          📍 {job.location}
                        </span>
                        <span className="flex items-center">
                          💼 {job.type}
                        </span>
                        <span className="flex items-center">
                          � {job.department}
                        </span>
                        {job.salary && (
                          <span className="flex items-center text-green-600 font-semibold">
                            💰 {job.salary}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-6">
                        {job.description}
                      </p>
                    </div>
                      <div className="lg:ml-8 flex-shrink-0">
                      <button 
                        onClick={() => handleApply(job.title)}
                        className="w-full lg:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Jetzt bewerben
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Anforderungen:
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">✓</span>
                            <span className="text-gray-600">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Wir bieten:
                      </h4>
                      <ul className="space-y-2">
                        {job.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start">
                            <span className="text-blue-500 mr-2 mt-1">★</span>
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">💼</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedDepartment === 'all' 
                    ? 'Derzeit keine offenen Stellen' 
                    : `Keine offenen Stellen im Bereich ${selectedDepartment}`
                  }
                </h3>
                <p className="text-gray-600">
                  {selectedDepartment === 'all' 
                    ? 'Schauen Sie bald wieder vorbei oder senden Sie uns eine Initiativbewerbung.'
                    : 'Versuchen Sie es mit einem anderen Bereich oder senden Sie uns eine Initiativbewerbung.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Bewerbungsprozess
            </h2>
            <p className="text-lg text-secondary-600">
              So einfach können Sie Teil unseres Teams werden
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Online bewerben
              </h3>
              <p className="text-secondary-600">
                Senden Sie uns Ihre Bewerbungsunterlagen per E-Mail
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Erstgespräch
              </h3>
              <p className="text-secondary-600">
                Telefonisches oder persönliches Kennenlernen
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Fachgespräch
              </h3>
              <p className="text-secondary-600">
                Detailliertes Gespräch mit dem Fachbereich
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                Willkommen
              </h3>
              <p className="text-secondary-600">
                Onboarding und Integration ins Team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Bereit für eine neue Herausforderung?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Senden Sie uns Ihre Bewerbung oder nehmen Sie Kontakt für weitere Informationen auf.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:karriere@protief-bau.de"
              className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              E-Mail senden
            </a>
            <a
              href="tel:+49211123456"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200"
            >
              Anrufen
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Career
