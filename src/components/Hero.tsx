import React from 'react'
import { ArrowRightIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import type { HeroSlide } from '../types'
import { getImageUrl } from '../admin/contentManager'

const Hero: React.FC = () => {
  const [slides, setSlides] = React.useState<HeroSlide[]>([])
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [imagesLoaded, setImagesLoaded] = React.useState<boolean[]>([])
  const [isInitialLoad, setIsInitialLoad] = React.useState(true)

  React.useEffect(() => {
    const loadSlides = async () => {
      try {
        // First try to load from localStorage (admin changes)
        const saved = localStorage.getItem('protief-content')
        if (saved) {
          const content = JSON.parse(saved)
          if (content.heroSlides && content.heroSlides.length > 0) {
            setSlides(content.heroSlides)
            setImagesLoaded(new Array(content.heroSlides.length).fill(false))
            return
          }
        }

        // If no localStorage, load from content.json
        const response = await fetch('/src/data/content.json')
        const contentData = await response.json()
          // Transform content.json format to expected format
        const heroSlides = contentData.hero.slides.map((slide: {id: number, title: string, subtitle: string, image: string, alt: string}) => ({
          id: slide.id.toString(),
          image: slide.image,
          title: slide.title,
          subtitle: slide.subtitle,
          buttonText: 'Unsere Leistungen',
          buttonLink: '/leistungen'
        }))
        
        setSlides(heroSlides)
        setImagesLoaded(new Array(heroSlides.length).fill(false))
      } catch (error) {
        console.error('Error loading slides:', error)
        // Fallback to default slides
        const defaultSlides = [
          {
            id: '1',
            image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&h=800&fit=crop&q=60',
            title: 'Glasfaser-Infrastruktur aus einer Hand',
            subtitle: 'Planung, Tiefbau, Installation und Wartung – alles aus einer Quelle.',
            buttonText: 'Unsere Leistungen',
            buttonLink: '/leistungen'
          },
          {
            id: '2',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=800&fit=crop&q=60',
            title: 'Moderne Glasfaser-Technologie',
            subtitle: 'Zuverlässige Internetverbindungen für Düsseldorf und Umgebung.',
            buttonText: 'Kontakt aufnehmen',
            buttonLink: '/kontakt'
          },
          {
            id: '3',
            image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=800&fit=crop&q=60',
            title: 'Professioneller Tiefbau',
            subtitle: 'Erfahrene Spezialisten für komplexe Infrastrukturprojekte.',
            buttonText: 'Projekte ansehen',
            buttonLink: '/projekte'
          },
          {
            id: '4',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=800&fit=crop&q=60',
            title: 'Digitale Zukunft gestalten',
            subtitle: 'Innovative Lösungen für nachhaltige Netzinfrastruktur.',
            buttonText: 'Mehr erfahren',
            buttonLink: '/ueber-uns'
          }
        ]
        setSlides(defaultSlides)
        setImagesLoaded(new Array(defaultSlides.length).fill(false))
      }    }
    
    loadSlides()

    // Listen for localStorage changes (when admin updates content)
    const handleStorageChange = () => {
      loadSlides()
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom events (for same-tab updates)
    const handleContentUpdate = () => {
      loadSlides()
    }
    
    window.addEventListener('protief-content-updated', handleContentUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('protief-content-updated', handleContentUpdate)
    }
  }, [])

  // Preload images
  React.useEffect(() => {
    if (slides.length > 0) {
      slides.forEach((slide, index) => {
        const img = new Image()
        img.onload = () => {
          setImagesLoaded(prev => {
            const newState = [...prev]
            newState[index] = true
            return newState
          })
          if (index === 0) setIsInitialLoad(false)
        }
        img.onerror = () => {
          setImagesLoaded(prev => {
            const newState = [...prev]
            newState[index] = true // Mark as loaded even on error to avoid infinite loading
            return newState
          })
          if (index === 0) setIsInitialLoad(false)
        }
        img.src = getImageUrl(slide.image)
      })
    }
  }, [slides])

  React.useEffect(() => {
    if (slides.length > 0 && !isInitialLoad) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 4000) // Reduced from 5000ms to 4000ms
      return () => clearInterval(timer)
    }
  }, [slides.length, isInitialLoad])
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }
  if (slides.length === 0 || isInitialLoad) {
    return (
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-semibold">ProTief Baumanagement</div>
          <div className="text-blue-200 mt-2">Lade Inhalte...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          {/* Background Image with better loading */}
          <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
              imagesLoaded[index] ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${getImageUrl(slide.image)})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          </div>

          {/* Fallback background while image loads */}
          {!imagesLoaded[index] && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
                {slide.subtitle}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={slide.buttonLink}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  {slide.buttonText}
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  <PhoneIcon className="mr-2 h-5 w-5" />
                  Kontakt aufnehmen
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        aria-label="Vorheriger Slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        aria-label="Nächster Slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentSlide 
                ? 'bg-white shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero
