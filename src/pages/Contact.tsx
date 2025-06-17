import React, { useState } from 'react'
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen.')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Kontakt
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Sprechen Sie mit unseren Experten über Ihr Glasfaser-Projekt
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-8">
                Nachricht senden
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Ihr vollständiger Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="ihre.email@beispiel.de"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="+49 211 123 456"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-secondary-700 mb-2">
                      Unternehmen
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Ihr Unternehmen"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                    Betreff *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Bitte wählen Sie einen Betreff</option>
                    <option value="beratung">Allgemeine Beratung</option>
                    <option value="angebot">Angebot anfordern</option>
                    <option value="planung">Projektplanung</option>
                    <option value="wartung">Wartung & Support</option>
                    <option value="karriere">Karriere / Bewerbung</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                    Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-vertical"
                    placeholder="Beschreiben Sie Ihr Anliegen oder Projekt..."
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="mt-1 mr-3 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="text-sm text-secondary-600">
                    Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                    <a href="/datenschutz" className="text-primary-600 hover:underline">
                      Datenschutzerklärung
                    </a>{' '}
                    zu. *
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 transform hover:scale-105"
                >
                  Nachricht senden
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-8">
                Kontaktinformationen
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-primary-600 mt-1" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      Adresse
                    </h3>
                    <p className="text-secondary-600">
                      ProTief Baumanagement GmbH<br />
                      Musterstraße 123<br />
                      40212 Düsseldorf<br />
                      Deutschland
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-primary-600 mt-1" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      Telefon
                    </h3>
                    <p className="text-secondary-600">
                      <a href="tel:+49211123456" className="hover:text-primary-600 transition-colors">
                        +49 (0) 211 123 456
                      </a>
                    </p>
                    <p className="text-secondary-600 mt-1">
                      <a href="tel:+49211123457" className="hover:text-primary-600 transition-colors">
                        +49 (0) 211 123 457 (Notfall)
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <EnvelopeIcon className="h-6 w-6 text-primary-600 mt-1" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      E-Mail
                    </h3>
                    <p className="text-secondary-600">
                      <a href="mailto:info@protief-bau.de" className="hover:text-primary-600 transition-colors">
                        info@protief-bau.de
                      </a>
                    </p>
                    <p className="text-secondary-600 mt-1">
                      <a href="mailto:karriere@protief-bau.de" className="hover:text-primary-600 transition-colors">
                        karriere@protief-bau.de
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <ClockIcon className="h-6 w-6 text-primary-600 mt-1" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                      Geschäftszeiten
                    </h3>
                    <div className="text-secondary-600 space-y-1">
                      <p>Montag - Freitag: 8:00 - 17:00 Uhr</p>
                      <p>Samstag: 9:00 - 12:00 Uhr</p>
                      <p>Sonntag: Geschlossen</p>
                      <p className="text-primary-600 font-medium mt-2">
                        24/7 Notfall-Hotline verfügbar
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">
                  Standort
                </h3>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center text-secondary-500">
                    <MapPinIcon className="h-12 w-12 mx-auto mb-2" />
                    <p>Interaktive Karte</p>
                    <p className="text-sm">(Google Maps Integration)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-lg text-secondary-600">
              Antworten auf die wichtigsten Fragen zu unseren Leistungen
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                Wie lange dauert ein typisches Glasfaser-Projekt?
              </h3>
              <p className="text-secondary-600">
                Die Projektdauer hängt vom Umfang ab. Kleinere Projekte (100-500 Hausanschlüsse) 
                dauern 3-6 Monate, größere Projekte können 12-18 Monate in Anspruch nehmen.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                Bieten Sie auch Wartung nach Projektabschluss an?
              </h3>
              <p className="text-secondary-600">
                Ja, wir bieten umfassende Wartungs- und Support-Leistungen an, 
                einschließlich 24/7 Störfallmanagement und präventiver Wartung.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                Können Sie auch bestehende Infrastruktur erweitern?
              </h3>
              <p className="text-secondary-600">
                Absolut. Wir analysieren bestehende Netze und entwickeln 
                Konzepte für Erweiterungen und Modernisierungen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
