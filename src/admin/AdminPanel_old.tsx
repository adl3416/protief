import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  TrashIcon, 
  PencilIcon,
  PhotoIcon,
  BriefcaseIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import ImageUploader from './ImageUploader';
import {
  loadContent,
  saveContent,
  handleImageUpload,
  cleanupUnusedImages,
  exportAllData,
  importAllData
} from './contentManager';
import type { HeroSlide, ContentData } from '../types';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [content, setContent] = useState<ContentData>({
    heroSlides: [],
    aboutImage: '',
    projects: [],
    partners: [],
    jobs: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    show: boolean;
    success: boolean;
    message: string;
    method?: string;
  }>({ show: false, success: false, message: '' });

  const tabs = [
    { id: 'hero', name: 'Hero Slider', icon: PhotoIcon },
    { id: 'about', name: 'Über uns', icon: PencilIcon },
    { id: 'projects', name: 'Projekte', icon: BriefcaseIcon },
    { id: 'partners', name: 'Partner', icon: UserGroupIcon },
    { id: 'jobs', name: 'Stellenanzeigen', icon: BuildingOfficeIcon }
  ];

  // Load content on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedContent = await loadContent();
        setContent(loadedContent);
      } catch (error) {
        console.error('Failed to load content:', error);
        setSaveStatus({
          show: true,
          success: false,
          message: 'Fehler beim Laden der Inhalte'
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Listen for content save events
  useEffect(() => {
    const handleContentSaved = (event: CustomEvent) => {
      const { success, method, error, apiError } = event.detail;
      
      setSaving(false);
      
      if (success) {
        let message = '✅ Erfolgreich gespeichert';
        if (method === 'api') {
          message += ' (content.json aktualisiert)';
        } else if (method === 'localStorage' && apiError) {
          message += ' (nur lokal - Server nicht verfügbar)';
        }
        
        setSaveStatus({
          show: true,
          success: true,
          message,
          method
        });
      } else {
        setSaveStatus({
          show: true,
          success: false,
          message: `❌ Fehler beim Speichern: ${error?.message || 'Unbekannter Fehler'}`
        });
      }

      // Hide status after 5 seconds
      setTimeout(() => {
        setSaveStatus(prev => ({ ...prev, show: false }));
      }, 5000);
    };

    window.addEventListener('protief-content-saved', handleContentSaved as EventListener);
    
    return () => {
      window.removeEventListener('protief-content-saved', handleContentSaved as EventListener);
    };
  }, []);

  const handleSaveContent = async () => {
    setSaving(true);
    setSaveStatus({ show: false, success: false, message: '' });
    
    try {
      await saveContent(content);
      // Status will be updated by the event listener
    } catch (error) {
      setSaving(false);
      setSaveStatus({
        show: true,
        success: false,
        message: `❌ Fehler beim Speichern: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`
      });
      
      setTimeout(() => {
        setSaveStatus(prev => ({ ...prev, show: false }));      }, 5000);
    }
  };

  // Helper functions for updating content
  const updateContent = (updater: (content: ContentData) => ContentData) => {
    setContent(updater);
  };

  const handleHeroImageUpload = async (slideId: string, file: File) => {
    try {
      const newImageUrl = await handleImageUpload(file, 'hero', slideId);
      updateContent(prevContent => ({
        ...prevContent,
        heroSlides: prevContent.heroSlides.map(slide =>
          slide.id === slideId ? { ...slide, image: newImageUrl } : slide
        )
      }));
    } catch (error) {
      console.error('Fehler beim Hochladen des Bildes:', error);
      setSaveStatus({
        show: true,
        success: false,
        message: 'Fehler beim Hochladen des Bildes'
      });
    }
  };

  const handleAboutImageUpload = async (file: File) => {
    try {
      const newImageUrl = await handleImageUpload(file, 'about');
      updateContent(prevContent => ({
        ...prevContent,
        aboutImage: newImageUrl
      }));
    } catch (error) {
      console.error('Fehler beim Hochladen des Bildes:', error);
      setSaveStatus({
        show: true,
        success: false,
        message: 'Fehler beim Hochladen des Bildes'
      });
    }
  };
    try {
      const newImageUrl = await handleImageUpload(file, 'about');
      updateAboutImage(newImageUrl);
      setContent(loadContent());
    } catch (error) {
      console.error('Fehler beim Hochladen des Bildes:', error);
      alert('Fehler beim Hochladen des Bildes');
    }
  };

  const handleProjectImageUpload = async (projectId: string, file: File) => {
    try {
      const newImageUrl = await handleImageUpload(file, 'project', projectId);
      updateProjectImage(projectId, newImageUrl);
      setContent(loadContent());
    } catch (error) {
      console.error('Fehler beim Hochladen des Bildes:', error);
      alert('Fehler beim Hochladen des Bildes');
    }
  };

  const handlePartnerImageUpload = async (partnerId: string, file: File) => {
    try {
      const newImageUrl = await handleImageUpload(file, 'partner', partnerId);
      updatePartnerLogo(partnerId, newImageUrl);
      setContent(loadContent());
    } catch (error) {
      console.error('Fehler beim Hochladen des Bildes:', error);
      alert('Fehler beim Hochladen des Bildes');
    }
  };

  const updateSlideText = (slideId: string, field: keyof HeroSlide, value: string) => {
    const updatedContent = { ...content };
    const slideIndex = updatedContent.heroSlides.findIndex((slide: HeroSlide) => slide.id === slideId);
    
    if (slideIndex !== -1) {
      updatedContent.heroSlides[slideIndex] = {
        ...updatedContent.heroSlides[slideIndex],
        [field]: value
      };
      setContent(updatedContent);
    }
  };
  const handleAddHeroSlide = () => {
    // Maximum 4 slides allowed
    if (content.heroSlides.length >= 4) {
      alert('Maksimum 4 slide ekleyebilirsiniz. Önce mevcut bir slide\'ı silin.');
      return;
    }

    const newSlide = {
      title: "Neuer Slide Titel",
      subtitle: "Neuer Slide Untertitel",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&h=800&fit=crop",
      buttonText: "Mehr erfahren",
      buttonLink: "/leistungen"
    };
    
    addHeroSlide(newSlide);
    setContent(loadContent());
  };

  const handleRemoveHeroSlide = (slideId: string) => {
    removeHeroSlide(slideId);
    setContent(loadContent());
  };

  const handleAddProject = () => {
    const newProject = {
      title: "Neues Projekt",
      description: "Projektbeschreibung hier eingeben",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      category: "Glasfaser",
      year: new Date().getFullYear().toString(),
      status: "In Planung"
    };
    
    addProject(newProject);
    setContent(loadContent());
  };

  const handleRemoveProject = (projectId: string) => {
    removeProject(projectId);
    setContent(loadContent());
  };

  const handleAddPartner = () => {
    const newPartner = {
      name: "Neuer Partner",
      logo: "https://via.placeholder.com/200x100/0070ba/ffffff?text=Partner"
    };
    
    addPartner(newPartner);
    setContent(loadContent());
  };

  const handleRemovePartner = (partnerId: string) => {
    removePartner(partnerId);
    setContent(loadContent());
  };

  // Job management handlers
  const handleAddJob = () => {
    const newJob = {
      title: "Neue Stellenanzeige",
      department: "Verwaltung",
      location: "Düsseldorf",
      type: "Vollzeit" as const,
      description: "Beschreibung der Stelle hier eingeben...",
      requirements: [
        "Anforderung 1",
        "Anforderung 2", 
        "Anforderung 3"
      ],
      benefits: [
        "Benefit 1",
        "Benefit 2",
        "Benefit 3"
      ],
      salary: "Auf Anfrage",
      isActive: true
    };
    
    addJob(newJob);
    setContent(loadContent());
  };

  const handleEditJob = (jobId: string) => {
    // For now, just show an alert - in a full implementation, this would open an edit form
    const job = content.jobs.find(j => j.id === jobId);
    if (job) {
      const newTitle = prompt("Neuer Titel:", job.title);
      if (newTitle && newTitle !== job.title) {
        updateJob(jobId, { title: newTitle });
        setContent(loadContent());
      }
    }
  };

  const handleRemoveJob = (jobId: string) => {
    if (confirm("Möchten Sie diese Stellenanzeige wirklich löschen?")) {
      removeJob(jobId);
      setContent(loadContent());
    }
  };

  const handleToggleJobStatus = (jobId: string) => {
    toggleJobStatus(jobId);
    setContent(loadContent());
  };

  const handleExportData = () => {
    try {
      const exportedData = exportAllData();
      const blob = new Blob([exportedData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `protief-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('Daten erfolgreich exportiert!');
    } catch (error) {
      console.error('Export error:', error);
      alert('Export fehlgeschlagen!');
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        importAllData(jsonData);
        setContent(loadContent());
        alert('Daten erfolgreich importiert!');
      } catch (error) {
        console.error('Import error:', error);
        alert('Import fehlgeschlagen! Bitte überprüfen Sie die Datei.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-100">      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo-compact.svg" 
                alt="ProTief Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Panel
              </h1>
            </div>            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSaveContent}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                💾 Speichern
              </button>
              <button
                onClick={handleLoadContent}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                🔄 Neu laden
              </button>
              <button
                onClick={handleExportData}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                📤 Export
              </button>
              <label className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors cursor-pointer flex items-center">
                📥 Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleResetContent}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                🗑️ Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-md p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            {activeTab === 'hero' && (
              <div>                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Hero Slider Verwaltung</h2>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">
                      {content.heroSlides.length}/4 Slides
                    </span>
                    <button
                      onClick={handleAddHeroSlide}
                      disabled={content.heroSlides.length >= 4}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                        content.heroSlides.length >= 4
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Neuer Slide
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {content.heroSlides.map((slide, index) => (
                    <div key={slide.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-medium">Slide {index + 1}</h3>
                        <button
                          onClick={() => handleRemoveHeroSlide(slide.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Image Upload */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bild
                          </label>                          <ImageUploader
                            currentImage={slide.image}
                            onImageUpload={(file: File) => handleHeroImageUpload(slide.id, file)}
                          />
                        </div>

                        {/* Text Fields */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Titel
                            </label>
                            <input
                              type="text"
                              value={slide.title}
                              onChange={(e) => updateSlideText(slide.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Untertitel
                            </label>
                            <textarea
                              value={slide.subtitle}
                              onChange={(e) => updateSlideText(slide.id, 'subtitle', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Button Text
                            </label>
                            <input
                              type="text"
                              value={slide.buttonText}
                              onChange={(e) => updateSlideText(slide.id, 'buttonText', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Button Link
                            </label>
                            <input
                              type="text"
                              value={slide.buttonLink}
                              onChange={(e) => updateSlideText(slide.id, 'buttonLink', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Über uns Seite</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hauptbild
                  </label>                  <ImageUploader
                    currentImage={content.aboutImage}
                    onImageUpload={(file: File) => handleAboutImageUpload(file)}
                  />
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Projekt Galerie</h2>
                  <button
                    onClick={handleAddProject}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Neues Projekt
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {content.projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{project.title}</h3>
                        <button
                          onClick={() => handleRemoveProject(project.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>                      <ImageUploader
                        currentImage={project.image}
                        onImageUpload={(file: File) => handleProjectImageUpload(project.id, file)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'partners' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Partner Logos</h2>
                  <button
                    onClick={handleAddPartner}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Neuer Partner
                  </button>
                </div>                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {content.partners.map((partner) => (
                    <div key={partner.id} className="border rounded-lg p-4 relative">
                      <button
                        onClick={() => handleRemovePartner(partner.id)}
                        className="absolute top-2 right-2 text-red-600 hover:text-red-800 bg-white rounded-full p-1 shadow-sm"
                        title={`${partner.name} entfernen`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                      
                      <div className="mt-2">
                        <ImageUploader
                          currentImage={partner.logo}
                          onImageUpload={(file: File) => handlePartnerImageUpload(partner.id, file)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>            )}

            {activeTab === 'jobs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Stellenanzeigen verwalten</h2>
                  <button
                    onClick={handleAddJob}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Neue Stellenanzeige
                  </button>
                </div>

                <div className="space-y-4">
                  {content.jobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-6 bg-white">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              job.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {job.isActive ? 'Aktiv' : 'Inaktiv'}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {job.type}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            📍 {job.location} • 🏢 {job.department} {job.salary && `• 💰 ${job.salary}`}
                          </div>
                          <p className="text-gray-700 text-sm line-clamp-2">{job.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => handleToggleJobStatus(job.id)}
                            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                              job.isActive
                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {job.isActive ? 'Deaktivieren' : 'Aktivieren'}
                          </button>
                          <button
                            onClick={() => handleEditJob(job.id)}
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRemoveJob(job.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Anforderungen:</h4>
                          <ul className="space-y-1 text-gray-600">
                            {job.requirements.slice(0, 3).map((req, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-1">✓</span>
                                <span className="line-clamp-1">{req}</span>
                              </li>
                            ))}
                            {job.requirements.length > 3 && (
                              <li className="text-gray-400">+{job.requirements.length - 3} weitere...</li>
                            )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                          <ul className="space-y-1 text-gray-600">
                            {job.benefits.slice(0, 3).map((benefit, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-500 mr-1">★</span>
                                <span className="line-clamp-1">{benefit}</span>
                              </li>
                            ))}
                            {job.benefits.length > 3 && (
                              <li className="text-gray-400">+{job.benefits.length - 3} weitere...</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {content.jobs.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <BuildingOfficeIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Noch keine Stellenanzeigen vorhanden.</p>
                      <p className="text-sm">Klicken Sie auf "Neue Stellenanzeige" um zu beginnen.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
