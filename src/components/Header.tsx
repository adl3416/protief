import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Startseite', href: '/' },
    { name: 'Über uns', href: '/ueber-uns' },
    { name: 'Leistungen', href: '/leistungen' },
    { name: 'Projekte', href: '/projekte' },
    { name: 'Karriere', href: '/karriere' },
    { name: 'Kontakt', href: '/kontakt' },  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50' 
        : 'bg-white shadow-lg border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'py-3' : 'py-4'
        }`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <img 
                src="/logo-compact.svg" 
                alt="ProTief Baumanagement Logo" 
                className={`w-auto transition-all duration-300 group-hover:scale-105 ${
                  isScrolled ? 'h-8' : 'h-10'
                }`}
              />            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  location.pathname === item.href
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
                {/* Active indicator */}
                {location.pathname === item.href && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary-600 rounded-full"></span>
                )}
              </Link>            ))}
          </nav>

          {/* CTA Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Phone Number */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <PhoneIcon className="w-4 h-4" />
              <a 
                href="tel:+49211123456" 
                className="font-medium hover:text-primary-600 transition-colors duration-300"
              >
                +49 211 123 456
              </a>
            </div>
            
            {/* CTA Button */}
            <Link
              to="/kontakt"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-primary-700 transition-all duration-300 hover:shadow-lg"
            >
              Beratung anfragen            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 focus:outline-none transition-colors duration-300"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 text-base font-medium transition-colors duration-300 rounded-lg ${
                    location.pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Contact Section */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <a 
                  href="tel:+49211123456"
                  className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-primary-600 transition-colors duration-300"
                >
                  <PhoneIcon className="w-5 h-5" />
                  <span className="font-medium">+49 211 123 456</span>
                </a>
                
                <Link
                  to="/kontakt"
                  className="block w-full text-center bg-primary-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Beratung anfragen
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
