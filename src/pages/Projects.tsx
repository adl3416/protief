import React from 'react'

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Glasfaser-Ausbau Düsseldorf Nord',
      location: 'Düsseldorf, NRW',
      scope: '2.500 Hausanschlüsse',
      duration: '8 Monate',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Kompletter Glasfaser-Ausbau für einen Neubaubereich mit 2.500 Wohneinheiten.',
      technologies: ['FTTH', 'GPON', 'Tiefbau'],
      status: 'Abgeschlossen'
    },
    {
      title: 'Gewerbegebiet Glasfaser-Backbone',
      location: 'Köln, NRW',
      scope: '15 km Haupttrasse',
      duration: '6 Monate',
      image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Aufbau einer Hochleistungs-Glasfaser-Infrastruktur für ein Industriegebiet.',
      technologies: ['FTTB', 'Dark Fiber', 'Microtrenching'],
      status: 'In Bearbeitung'
    },
    {
      title: 'Landkreis Glasfaser-Initiative',
      location: 'Münster, NRW',
      scope: '50 km Überlandtrasse',
      duration: '12 Monate',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Anbindung ländlicher Gemeinden an das Hochgeschwindigkeits-Glasfasernetz.',
      technologies: ['FTTC', 'Aerial Installation', 'Underground'],
      status: 'Geplant'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Unsere Projekte
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Erfolgreiche Glasfaser-Projekte in ganz Deutschland
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Abgeschlossen' ? 'bg-green-100 text-green-800' :
                      project.status === 'In Bearbeitung' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary-900 mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-secondary-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-secondary-500">Standort:</span>
                      <span className="text-sm font-medium text-secondary-700">{project.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-secondary-500">Umfang:</span>
                      <span className="text-sm font-medium text-secondary-700">{project.scope}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-secondary-500">Dauer:</span>
                      <span className="text-sm font-medium text-secondary-700">{project.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Unsere Erfolge in Zahlen
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">150+</div>
              <div className="text-secondary-600">Abgeschlossene Projekte</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">500km</div>
              <div className="text-secondary-600">Verlegte Glasfaser</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">25.000</div>
              <div className="text-secondary-600">Hausanschlüsse</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-secondary-600">Kundenzufriedenheit</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects
