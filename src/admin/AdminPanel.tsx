import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  TrashIcon, 
  PencilIcon,
  PhotoIcon,
  BriefcaseIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import ImageUploader from './ImageUploader';
import JobModal from './JobModal';
import {
  loadContent,
  saveContent,
  handleImageUpload,
  cleanupUnusedImages,
  exportAllData
} from './contentManager';
import type { HeroSlide, Project, Partner, Job, ContentData } from '../types';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hero');  const [content, setContent] = useState<ContentData>({
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

  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const tabs = [
    { id: 'hero', name: 'Hero Slider', icon: PhotoIcon },
    { id: 'about', name: 'Über uns', icon: PencilIcon },
    { id: 'projects', name: 'Projekte', icon: BriefcaseIcon },
    { id: 'partners', name: 'Partner', icon: UserGroupIcon },
    { id: 'jobs', name: 'Stellenanzeigen', icon: BuildingOfficeIcon }
  ];

  // Load content on mount
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

  // Save content function
  const handleSaveContent = async () => {
    setSaving(true);
    setSaveStatus({ show: false, success: false, message: '' });
    
    try {
      await saveContent(content);
      cleanupUnusedImages();
    } catch (error) {
      setSaving(false);
      setSaveStatus({
        show: true,
        success: false,
        message: `❌ Fehler beim Speichern: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`
      });
      
      setTimeout(() => {
        setSaveStatus(prev => ({ ...prev, show: false }));
      }, 5000);
    }
  };

  // Hero slide functions
  const handleAddHeroSlide = () => {
    if (content.heroSlides.length >= 4) {
      alert('Maximal 4 Slides erlaubt');
      return;
    }

    const newSlide: HeroSlide = {
      id: Date.now().toString(),
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&h=800&fit=crop&q=60',
      title: 'Neuer Slide',
      subtitle: 'Beschreibung',
      buttonText: 'Mehr erfahren',
      buttonLink: '/leistungen'
    };

    setContent(prev => ({
      ...prev,
      heroSlides: [...prev.heroSlides, newSlide]
    }));
  };

  const handleRemoveHeroSlide = (slideId: string) => {
    if (confirm('Slide wirklich löschen?')) {
      setContent(prev => ({
        ...prev,
        heroSlides: prev.heroSlides.filter(slide => slide.id !== slideId)
      }));
    }
  };
  const handleHeroImageUpload = async (slideId: string, file: File) => {
    try {
      setSaveStatus({ show: true, success: false, message: 'Bild wird hochgeladen...', method: 'upload' });
      
      const newImageUrl = await handleImageUpload(file, 'hero', slideId);
      setContent(prev => ({
        ...prev,
        heroSlides: prev.heroSlides.map(slide =>
          slide.id === slideId ? { ...slide, image: newImageUrl } : slide
        )
      }));
      
      setSaveStatus({ show: true, success: true, message: 'Bild erfolgreich hochgeladen!', method: 'upload' });
      setTimeout(() => setSaveStatus({ show: false, success: false, message: '' }), 3000);
    } catch (error) {
      console.error('Fehler beim Hochladen des Bildes:', error);
      setSaveStatus({ show: true, success: false, message: 'Fehler beim Hochladen des Bildes', method: 'upload' });
      setTimeout(() => setSaveStatus({ show: false, success: false, message: '' }), 5000);
    }
  };

  const updateSlideText = (slideId: string, field: keyof HeroSlide, value: string) => {
    setContent(prev => ({
      ...prev,
      heroSlides: prev.heroSlides.map(slide =>
        slide.id === slideId ? { ...slide, [field]: value } : slide
      )
    }));
  };
  // About image functions
  const handleAboutImageUpload = async (file: File) => {
    try {
      setSaveStatus({ show: true, success: false, message: 'Bild wird hochgeladen...', method: 'upload' });
      
      const newImageUrl = await handleImageUpload(file, 'about');
      setContent(prev => ({
        ...prev,
        aboutImage: newImageUrl
      }));
      
      setSaveStatus({ show: true, success: true, message: 'Bild erfolgreich hochgeladen!', method: 'upload' });
      setTimeout(() => setSaveStatus({ show: false, success: false, message: '' }), 3000);
    } catch (error) {
      console.error('Fehler beim Hochladen des Bildes:', error);
      setSaveStatus({ show: true, success: false, message: 'Fehler beim Hochladen des Bildes', method: 'upload' });
      setTimeout(() => setSaveStatus({ show: false, success: false, message: '' }), 5000);
    }
  };

  // Project functions
  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'Neues Projekt',
      description: 'Projektbeschreibung',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      category: 'Allgemein',
      year: new Date().getFullYear().toString(),
      status: 'Geplant'
    };

    setContent(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const handleRemoveProject = (projectId: string) => {
    if (confirm('Projekt wirklich löschen?')) {
      setContent(prev => ({
        ...prev,
        projects: prev.projects.filter(project => project.id !== projectId)
      }));
    }
  };

  // Partner functions
  const handleAddPartner = () => {
    const newPartner: Partner = {
      id: Date.now().toString(),
      name: 'Neuer Partner',
      logo: 'https://via.placeholder.com/200x100/1e40af/ffffff?text=Partner'
    };

    setContent(prev => ({
      ...prev,
      partners: [...prev.partners, newPartner]
    }));
  };

  const handleRemovePartner = (partnerId: string) => {
    if (confirm('Partner wirklich löschen?')) {
      setContent(prev => ({
        ...prev,
        partners: prev.partners.filter(partner => partner.id !== partnerId)
      }));
    }
  };

  // Job functions
  const handleAddJob = () => {
    setEditingJob(null);
    setIsJobModalOpen(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setIsJobModalOpen(true);
  };
  const handleSaveJob = (jobData: Omit<Job, 'id' | 'createdAt'>) => {
    if (editingJob) {
      // Update existing job
      setContent(prev => ({
        ...prev,
        jobs: prev.jobs.map(job =>
          job.id === editingJob.id ? { 
            ...jobData, 
            id: editingJob.id,
            createdAt: editingJob.createdAt 
          } : job
        )
      }));
    } else {
      // Add new job
      const newJob: Job = {
        ...jobData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      setContent(prev => ({
        ...prev,
        jobs: [...prev.jobs, newJob]
      }));
    }
    setIsJobModalOpen(false);
    setEditingJob(null);
  };

  const handleRemoveJob = (jobId: string) => {
    if (confirm('Stellenanzeige wirklich löschen?')) {
      setContent(prev => ({
        ...prev,
        jobs: prev.jobs.filter(job => job.id !== jobId)
      }));
    }
  };

  const toggleJobStatus = (jobId: string) => {
    setContent(prev => ({
      ...prev,
      jobs: prev.jobs.map(job =>
        job.id === jobId 
          ? { ...job, isActive: !job.isActive }
          : job
      )
    }));
  };

  // Export/Import functions
  const handleExport = () => {
    exportAllData();
  };
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const fileContent = await file.text();
        const importedData = JSON.parse(fileContent) as ContentData;
        setContent(importedData);
        alert('Daten erfolgreich importiert!');
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Fehler beim Importieren der Daten');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lade Inhalte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img src="/logo-compact.svg" alt="ProTief" className="h-8 w-auto" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Save Status */}
              {saveStatus.show && (
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  saveStatus.success 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {saveStatus.success ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <ExclamationTriangleIcon className="w-4 h-4" />
                  )}
                  <span>{saveStatus.message}</span>
                </div>
              )}

              {/* Import/Export Buttons */}
              <div className="flex space-x-2">
                <label className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Import
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
                
                <button
                  onClick={handleExport}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveContent}
                disabled={saving}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white ${
                  saving 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary-600 hover:bg-primary-700'
                } transition-colors`}
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Speichern...
                  </>
                ) : (
                  'Speichern'
                )}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Hero Slider ({content.heroSlides.length}/4)</h2>
              <button
                onClick={handleAddHeroSlide}
                disabled={content.heroSlides.length >= 4}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                  content.heroSlides.length >= 4
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Slide hinzufügen
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {content.heroSlides.map((slide) => (
                <div key={slide.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Slide {slide.id}</h3>
                    <button
                      onClick={() => handleRemoveHeroSlide(slide.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">                    <ImageUploader
                      currentImage={slide.image}
                      onImageUpload={(file) => handleHeroImageUpload(slide.id, file)}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titel
                      </label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => updateSlideText(slide.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={slide.buttonText}
                          onChange={(e) => updateSlideText(slide.id, 'buttonText', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Über uns Sektion</h2>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">              <ImageUploader
                currentImage={content.aboutImage}
                onImageUpload={handleAboutImageUpload}
              />
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Projekte</h2>
              <button
                onClick={handleAddProject}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Projekt hinzufügen
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Projekt</h3>
                    <button
                      onClick={() => handleRemoveProject(project.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titel
                      </label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => {
                          setContent(prev => ({
                            ...prev,
                            projects: prev.projects.map(p =>
                              p.id === project.id ? { ...p, title: e.target.value } : p
                            )
                          }));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Beschreibung
                      </label>
                      <textarea
                        value={project.description}
                        onChange={(e) => {
                          setContent(prev => ({
                            ...prev,
                            projects: prev.projects.map(p =>
                              p.id === project.id ? { ...p, description: e.target.value } : p
                            )
                          }));
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kategorie
                        </label>
                        <input
                          type="text"
                          value={project.category}
                          onChange={(e) => {
                            setContent(prev => ({
                              ...prev,
                              projects: prev.projects.map(p =>
                                p.id === project.id ? { ...p, category: e.target.value } : p
                              )
                            }));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          value={project.status}
                          onChange={(e) => {
                            setContent(prev => ({
                              ...prev,
                              projects: prev.projects.map(p =>
                                p.id === project.id ? { ...p, status: e.target.value } : p
                              )
                            }));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="Geplant">Geplant</option>
                          <option value="In Bearbeitung">In Bearbeitung</option>
                          <option value="Abgeschlossen">Abgeschlossen</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'partners' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Partner</h2>
              <button
                onClick={handleAddPartner}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Partner hinzufügen
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {content.partners.map((partner) => (
                <div key={partner.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Partner</h3>
                    <button
                      onClick={() => handleRemovePartner(partner.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-24 object-contain bg-gray-50 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={partner.name}
                        onChange={(e) => {
                          setContent(prev => ({
                            ...prev,
                            partners: prev.partners.map(p =>
                              p.id === partner.id ? { ...p, name: e.target.value } : p
                            )
                          }));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Stellenanzeigen</h2>
              <button
                onClick={handleAddJob}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Stellenanzeige hinzufügen
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stelle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ort
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Typ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aktionen
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {content.jobs.map((job) => (
                      <tr key={job.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500">{job.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {job.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {job.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            job.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {job.isActive ? 'Aktiv' : 'Inaktiv'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleEditJob(job)}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleJobStatus(job.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {job.isActive ? 'Deaktivieren' : 'Aktivieren'}
                          </button>
                          <button
                            onClick={() => handleRemoveJob(job.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>      {/* Job Modal */}
      {isJobModalOpen && (
        <JobModal
          job={editingJob || undefined}
          isOpen={isJobModalOpen}
          onSave={handleSaveJob}
          onClose={() => {
            setIsJobModalOpen(false);
            setEditingJob(null);
          }}        />
      )}
    </div>
  );
};

export default AdminPanel;
