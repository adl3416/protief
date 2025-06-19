import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon, XMarkIcon, PhoneIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Startseite', href: '/', icon: '🏠' },
    { name: 'Über uns', href: '/ueber-uns', icon: '👥' },
    { name: 'Leistungen', href: '/leistungen', icon: '⚡' },
    { name: 'Projekte', href: '/projekte', icon: '🏗️' },
    { name: 'Karriere', href: '/karriere', icon: '💼' },
    { name: 'Kontakt', href: '/kontakt', icon: '📞' },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50' 
        : 'bg-white shadow-lg border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <img 
                  src="/logo-compact.svg" 
                  alt="ProTief Baumanagement Logo" 
                  className={`w-auto transition-all duration-300 group-hover:scale-105 ${
                    isScrolled ? 'h-10' : 'h-14'
                  }`}
                />
                {/* Enhanced glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-500 blur-lg transform group-hover:scale-110"></div>
              </div>
            </Link>
          </div>          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-3 text-base font-semibold transition-all duration-300 group rounded-xl ${
                  location.pathname === item.href
                    ? 'text-primary-600 bg-gradient-to-r from-primary-50 to-blue-50'
                    : 'text-secondary-700 hover:text-primary-600 hover:bg-secondary-50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </span>
                
                {/* Modern floating underline */}
                <span className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 transition-all duration-300 rounded-full ${
                  location.pathname === item.href ? 'w-3/4 opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-60'
                }`}></span>
                
                {/* Hover glow effect */}
                {location.pathname === item.href && (
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-100/40 via-blue-100/40 to-primary-100/40 rounded-xl"></span>
                )}
              </Link>
            ))}
          </nav>          {/* Enhanced CTA Section */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Phone Number with animation */}
            <div className="flex items-center space-x-2 text-sm text-secondary-600 group">
              <div className="relative">
                <PhoneIcon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              </div>
              <a 
                href="tel:+49211123456" 
                className="font-medium hover:text-primary-600 transition-colors duration-300"
              >
                +49 211 123 456
              </a>
            </div>
            
            {/* Enhanced CTA Button */}
            <Link
              to="/kontakt"
              className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 text-white px-6 py-3 rounded-2xl font-semibold text-base hover:from-primary-700 hover:via-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>💬</span>
                <span>Beratung anfragen</span>
              </span>
              
              {/* Animated background waves */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-blue-400 to-primary-400 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-110"></div>
              
              {/* Moving shine effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
              
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 animate-pulse"></div>
            </Link>
          </div>          {/* Enhanced Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-3 text-secondary-600 hover:text-primary-600 focus:outline-none transition-all duration-300 rounded-xl hover:bg-primary-50"
            >
              <div className="w-6 h-6 relative">
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6 transform transition-all duration-300 rotate-180 scale-110" />
                ) : (
                  <Bars3Icon className="h-6 w-6 transform transition-all duration-300 hover:scale-110" />
                )}
              </div>
              {/* Button glow effect */}
              <div className={`absolute inset-0 rounded-xl bg-primary-100 opacity-0 transition-opacity duration-300 ${isMenuOpen ? 'opacity-30' : ''}`}></div>
            </button>
          </div>
        </div>        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg">
            <div className="px-4 py-6 space-y-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-4 text-lg font-semibold transition-all duration-300 rounded-2xl transform hover:scale-105 ${
                    location.pathname === item.href
                      ? 'text-primary-600 bg-gradient-to-r from-primary-50 via-blue-50 to-primary-50 border-l-4 border-primary-500 shadow-lg'
                      : 'text-secondary-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-secondary-50 hover:to-primary-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.name}</span>
                  {location.pathname === item.href && (
                    <ChevronDownIcon className="w-4 h-4 ml-auto transform rotate-180 animate-bounce" />
                  )}
                </Link>
              ))}
              
              {/* Enhanced Mobile Contact Section */}
              <div className="pt-6 border-t border-gray-200 space-y-4">
                <a 
                  href="tel:+49211123456"
                  className="flex items-center space-x-3 px-4 py-3 text-secondary-600 hover:text-primary-600 transition-colors duration-300 rounded-xl hover:bg-primary-50"
                >
                  <PhoneIcon className="w-5 h-5" />
                  <span className="font-medium">+49 211 123 456</span>
                </a>
                
                <Link
                  to="/kontakt"
                  className="block w-full text-center bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:from-primary-700 hover:via-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>💬</span>
                    <span>Beratung anfragen</span>
                  </span>
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
