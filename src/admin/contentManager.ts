import type { HeroSlide, Project, Partner, Job } from '../types';

// Types for content management
export interface ContentData {
  heroSlides: HeroSlide[];
  aboutImage: string;
  projects: Project[];
  partners: Partner[];
  jobs: Job[];
}

// Utility to load content from localStorage or default
export const loadContent = (): ContentData => {
  const saved = localStorage.getItem('protief-content');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error('Error parsing saved content:', error);
    }
  }
  
  // Load from content.json if no localStorage data
  try {
    // In production, you would fetch this from your API
    // For now, we'll return default content and let the component handle JSON loading
    return getDefaultContent();
  } catch (error) {
    console.error('Error loading content:', error);
    return getDefaultContent();
  }
};

// Default content function
const getDefaultContent = (): ContentData => {
  return {    heroSlides: [
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
    ],
    aboutImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
    projects: [
      {
        id: '1',
        title: 'Glasfaser-Ausbau Stadtmitte',
        description: 'Verlegung von 15 km Glasfaserkabel im Düsseldorfer Stadtzentrum',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        category: 'Glasfaser',
        year: '2023',
        status: 'Abgeschlossen'
      },
      {
        id: '2',
        title: 'Telekom-Infrastruktur Neubaugebiet',
        description: 'Komplette Telekommunikationsinfrastruktur für 200 Wohneinheiten',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
        category: 'Telekommunikation',
        year: '2023',
        status: 'In Bearbeitung'
      }
    ],    partners: [
      {
        id: '1',
        name: 'BEW',
        logo: 'https://via.placeholder.com/200x100/1e40af/ffffff?text=BEW'
      },
      {
        id: '2',
        name: 'Deutsche Glasfaser',
        logo: 'https://via.placeholder.com/200x100/059669/ffffff?text=Deutsche+Glasfaser'
      },
      {
        id: '3',
        name: '1&1 Versatel',
        logo: 'https://via.placeholder.com/200x100/0066cc/ffffff?text=1%261+Versatel'
      },
      {
        id: '4',        name: 'NetCologne',
        logo: 'https://via.placeholder.com/200x100/ff6600/ffffff?text=NetCologne'
      }
    ],    jobs: [
      {
        id: '1',
        title: 'Tiefbau-Ingenieur (m/w/d)',
        department: 'Tiefbau',
        location: 'Düsseldorf',
        type: 'Vollzeit',
        description: 'Wir suchen einen erfahrenen Tiefbau-Ingenieur für die Planung und Überwachung von Glasfaser-Infrastrukturprojekten in NRW. Sie arbeiten an innovativen Projekten und tragen zur Digitalisierung Deutschlands bei.',
        requirements: [
          'Abgeschlossenes Studium im Bauingenieurwesen oder vergleichbare Qualifikation',
          'Mindestens 3 Jahre Berufserfahrung im Tiefbau, idealerweise mit Telekommunikationsinfrastruktur',
          'Kenntnisse in CAD-Software (AutoCAD, Civil 3D)',
          'Erfahrung mit Projektmanagement und Bauüberwachung',
          'Führerschein Klasse B',
          'Teamfähigkeit und strukturierte Arbeitsweise',
          'Bereitschaft zu gelegentlichen Dienstreisen'
        ],
        benefits: [
          'Attraktive Vergütung (55.000 - 75.000 €) mit leistungsbezogenen Boni',
          'Firmenwagen auch zur privaten Nutzung',
          'Flexible Arbeitszeiten und Homeoffice-Möglichkeiten',
          'Fort- und Weiterbildungsmöglichkeiten',
          'Betriebliche Altersvorsorge und Krankenversicherung',
          '30 Tage Urlaub + Sonderurlaub',
          'Moderne Arbeitsausrüstung (Laptop, Tablet, Smartphone)'
        ],
        salary: '55.000 - 75.000 €',
        createdAt: new Date().toISOString(),
        isActive: true
      },
      {
        id: '2',
        title: 'Glasfaser-Techniker (m/w/d)',
        department: 'Telekommunikation',
        location: 'Düsseldorf',
        type: 'Vollzeit',
        description: 'Für unser wachsendes Team suchen wir einen erfahrenen Glasfaser-Techniker für Installation, Wartung und Reparatur von Glasfaser-Netzwerken. Sie sind direkt an der digitalen Infrastruktur der Zukunft beteiligt.',
        requirements: [
          'Abgeschlossene Ausbildung als Elektroniker für Telekommunikationstechnik oder IT-Systemelektroniker',
          'Mindestens 2 Jahre Erfahrung mit Glasfaser-Technik (Spleißen, OTDR-Messungen)',
          'Kenntnisse in Netzwerktechnik (FTTH, FTTB, GPON)',
          'Erfahrung mit Messgeräten und Spleißtechnik',
          'Bereitschaft zu Außendiensttätigkeit und flexiblen Arbeitszeiten',
          'Zuverlässigkeit und Kundenorientierung',
          'Höhentauglichkeit und körperliche Belastbarkeit'
        ],
        benefits: [
          'Unbefristeter Arbeitsvertrag mit attraktiver Vergütung (45.000 - 60.000 €)',
          'Moderne Arbeitsausrüstung und Firmenwagen',
          'Regelmäßige Schulungen und Zertifizierungen',
          'Gute Aufstiegschancen in einem wachsenden Unternehmen',
          '30 Tage Urlaub + Weihnachtsgeld',
          'Betriebliche Gesundheitsförderung',
          'Team-Events und Firmenausflüge'
        ],
        salary: '45.000 - 60.000 €',
        createdAt: new Date().toISOString(),
        isActive: true
      },
      {
        id: '3',
        title: 'Projektleiter Telekommunikation (m/w/d)',
        department: 'Projektmanagement',
        location: 'Düsseldorf',
        type: 'Vollzeit',
        description: 'Wir suchen einen erfahrenen Projektleiter für die Leitung komplexer Glasfaser-Ausbau-Projekte. Sie koordinieren Teams, überwachen Budgets und sorgen für die termingerechte Umsetzung unserer Infrastrukturprojekte.',
        requirements: [
          'Studium im Bereich Bauingenieurwesen, Elektrotechnik oder Wirtschaftsingenieurwesen',
          'Mindestens 5 Jahre Erfahrung im Projektmanagement, idealerweise im Telekommunikationsbereich',
          'Zertifizierung im Projektmanagement (PMP, PRINCE2) von Vorteil',
          'Erfahrung mit MS Project, SAP oder ähnlichen PM-Tools',
          'Sehr gute Kommunikations- und Führungsfähigkeiten',
          'Betriebswirtschaftliches Verständnis und Kostenbewusstsein',
          'Bereitschaft zu Dienstreisen'
        ],
        benefits: [
          'Überdurchschnittliche Vergütung (65.000 - 85.000 €) + Erfolgsbeteiligung',
          'Vollzeit oder Teilzeit (ab 32h) möglich',
          'Umfassende Homeoffice-Möglichkeiten',
          'Verantwortungsvolle Position mit Gestaltungsspielraum',
          'Intensive Einarbeitung und Mentoring',
          'Firmenwagen oder Mobilitätsbudget',
          'Sabbatical-Möglichkeiten nach 3 Jahren'
        ],
        salary: '65.000 - 85.000 €',
        createdAt: new Date().toISOString(),
        isActive: true
      },
      {
        id: '4',
        title: 'Auszubildender Elektroniker für Telekommunikationstechnik (m/w/d)',
        department: 'Ausbildung',
        location: 'Düsseldorf',
        type: 'Ausbildung',
        description: 'Starte deine Karriere in der Zukunftstechnologie Glasfaser! In unserer 3,5-jährigen Ausbildung lernst du alles über moderne Telekommunikationstechnik und wirst Teil eines innovativen Teams.',
        requirements: [
          'Mittlere Reife oder (Fach-)Abitur',
          'Interesse an Technik und Elektronik',
          'Gute Noten in Mathematik und Physik',
          'Handwerkliches Geschick und technisches Verständnis',
          'Teamfähigkeit und Lernbereitschaft',
          'Körperliche Fitness für Außeneinsätze',
          'Führerschein Klasse B (kann während der Ausbildung erworben werden)'
        ],
        benefits: [
          'Ausbildungsvergütung: 1. Jahr 700€, 2. Jahr 800€, 3. Jahr 900€, 4. Jahr 1000€',
          'Übernahmegarantie bei guten Leistungen',
          'Moderne Ausbildungswerkstätten und Geräte',
          'Berufsschule in Düsseldorf mit guter Anbindung',
          'Azubi-Events und Teambuilding-Maßnahmen',
          'Möglichkeit zur Weiterbildung (Techniker, Studium)',
          'Faire und familiäre Arbeitsatmosphäre'
        ],
        salary: '700 - 1.000 € (je Ausbildungsjahr)',
        createdAt: new Date().toISOString(),
        isActive: true
      },
      {
        id: '5',
        title: 'Praktikum Projektmanagement (m/w/d)',
        department: 'Projektmanagement',
        location: 'Düsseldorf',
        type: 'Praktikum',
        description: 'Sammle praktische Erfahrungen im Projektmanagement von Glasfaser-Infrastrukturprojekten. Du unterstützt unser Team bei der Planung und Durchführung von Großprojekten und lernst alle Aspekte des Projektmanagements kennen.',
        requirements: [
          'Studium im Bereich Bauingenieurwesen, Wirtschaftsingenieurwesen, BWL oder ähnlich',
          'Mindestens im 4. Semester',
          'Interesse an Telekommunikation und Infrastruktur',
          'Grundkenntnisse in MS Office (Excel, PowerPoint)',
          'Engagement und Lernbereitschaft',
          'Praktikumsdauer: 3-6 Monate',
          'Deutschkenntnisse auf muttersprachlichem Niveau'
        ],
        benefits: [
          'Faire Praktikumsvergütung (800 € bei Vollzeit)',
          'Einblick in spannende Großprojekte',
          'Mentoring durch erfahrene Projektleiter',
          'Möglichkeit zur Bachelorarbeit im Unternehmen',
          'Übernahmechancen nach erfolgreichem Abschluss',
          'Flexible Arbeitszeiten während der Vorlesungszeit',
          'Networking in der Telekommunikationsbranche'
        ],
        salary: '800 € (bei Vollzeit)',
        createdAt: new Date().toISOString(),
        isActive: true
      },
      {
        id: '6',
        title: 'Baustellenleiter Tiefbau (m/w/d)',
        department: 'Tiefbau',
        location: 'Düsseldorf + Außeneinsatz NRW',
        type: 'Vollzeit',
        description: 'Als Baustellenleiter koordinieren Sie den Tiefbau für Glasfaser-Projekte vor Ort. Sie leiten Teams von Subunternehmern und sorgen für die fachgerechte und termingerechte Ausführung der Bauarbeiten.',
        requirements: [
          'Meister im Tiefbau oder vergleichbare Qualifikation',
          'Mindestens 5 Jahre Erfahrung in der Bauleitung',
          'Kenntnisse im Leitungsbau und Kabelleitungstiefbau',
          'Erfahrung mit Subunternehmer-Management',
          'Sicherheitstechnische Kenntnisse (SiGe-Koordinator von Vorteil)',
          'Führungsqualitäten und Durchsetzungsvermögen',
          'Bereitschaft zu häufigen Außeneinsätzen'
        ],
        benefits: [
          'Attraktive Vergütung (50.000 - 70.000 €) + Baustellen-Zulagen',
          'Firmenwagen mit Vollausstattung',
          'Moderne technische Ausrüstung (Tablet, Smartphone)',
          'Flexible Arbeitszeiten mit Gleitzeit',
          'Weiterbildung zum SiGe-Koordinator möglich',
          'Langfristige Projektperspektiven',
          'Familiäres Arbeitsklima trotz Außendienst'
        ],
        salary: '50.000 - 70.000 €',
        createdAt: new Date().toISOString(),
        isActive: true
      }
    ]
  };
};

// Utility to save content to localStorage
export const saveContent = (content: ContentData): void => {
  try {
    localStorage.setItem('protief-content', JSON.stringify(content));
    
    // Dispatch custom event to notify components of content update
    window.dispatchEvent(new CustomEvent('protief-content-updated'));
  } catch (error) {
    console.error('Error saving content:', error);
  }
};

// Utility to handle file upload and update content
export const handleImageUpload = async (
  file: File,
  type: 'hero' | 'about' | 'project' | 'partner',
  itemId?: string
): Promise<string> => {
  // Generate unique filename
  const timestamp = Date.now();
  const extension = file.name.split('.').pop();
  const fileName = `${type}-${itemId || 'main'}-${timestamp}.${extension}`;

  try {
    // Convert file to base64 for permanent storage
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file as base64'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

    // Store the base64 image data in localStorage with a unique key
    const imageKey = `protief-image-${fileName}`;
    localStorage.setItem(imageKey, base64Data);
    
    // Store file metadata
    const fileInfo = {
      fileName,
      imageKey,
      type,
      itemId,
      uploadDate: new Date().toISOString(),
      originalName: file.name,
      size: file.size
    };

    // Store metadata in a separate localStorage entry
    const storedFiles = JSON.parse(localStorage.getItem('protief-uploaded-files') || '[]');
    storedFiles.push(fileInfo);
    localStorage.setItem('protief-uploaded-files', JSON.stringify(storedFiles));

    // Return a custom URL that our image loader can handle
    return `local://${imageKey}`;
  } catch (error) {
    console.error('Error handling file upload:', error);
    throw new Error('Fehler beim Hochladen der Datei');
  }
};

// Utility to update hero slide image
export const updateHeroSlideImage = (slideId: string, imageUrl: string): void => {
  const content = loadContent();
  const slideIndex = content.heroSlides.findIndex(slide => slide.id === slideId);
  
  if (slideIndex !== -1) {
    content.heroSlides[slideIndex].image = imageUrl;
    saveContent(content);
  }
};

// Utility to update about image
export const updateAboutImage = (imageUrl: string): void => {
  const content = loadContent();
  content.aboutImage = imageUrl;
  saveContent(content);
};

// Utility to update project image
export const updateProjectImage = (projectId: string, imageUrl: string): void => {
  const content = loadContent();
  const projectIndex = content.projects.findIndex(project => project.id === projectId);
  
  if (projectIndex !== -1) {
    content.projects[projectIndex].image = imageUrl;
    saveContent(content);
  }
};

// Utility to update partner logo
export const updatePartnerLogo = (partnerId: string, logoUrl: string): void => {
  const content = loadContent();
  const partnerIndex = content.partners.findIndex(partner => partner.id === partnerId);
  
  if (partnerIndex !== -1) {
    content.partners[partnerIndex].logo = logoUrl;
    saveContent(content);
  }
};

// Utility to add new hero slide
export const addHeroSlide = (slide: Omit<HeroSlide, 'id'>): void => {
  const content = loadContent();
  const newSlide: HeroSlide = {
    ...slide,
    id: Date.now().toString()
  };
  content.heroSlides.push(newSlide);
  saveContent(content);
};

// Utility to remove hero slide
export const removeHeroSlide = (slideId: string): void => {
  const content = loadContent();
  content.heroSlides = content.heroSlides.filter(slide => slide.id !== slideId);
  saveContent(content);
};

// Utility to add new project
export const addProject = (project: Omit<Project, 'id'>): void => {
  const content = loadContent();
  const newProject: Project = {
    ...project,
    id: Date.now().toString()
  };
  content.projects.push(newProject);
  saveContent(content);
};

// Utility to remove project
export const removeProject = (projectId: string): void => {
  const content = loadContent();
  content.projects = content.projects.filter(project => project.id !== projectId);
  saveContent(content);
};

// Utility to add new partner
export const addPartner = (partner: Omit<Partner, 'id'>): void => {
  const content = loadContent();
  const newPartner: Partner = {
    ...partner,
    id: Date.now().toString()
  };
  content.partners.push(newPartner);
  saveContent(content);
};

// Utility to remove partner
export const removePartner = (partnerId: string): void => {
  const content = loadContent();
  content.partners = content.partners.filter(partner => partner.id !== partnerId);
  saveContent(content);
};

// Job management utilities
export const addJob = (job: Omit<Job, 'id' | 'createdAt'>): void => {
  const content = loadContent();
  const newJob: Job = {
    ...job,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  content.jobs.push(newJob);
  saveContent(content);
};

export const updateJob = (jobId: string, updatedJob: Partial<Job>): void => {
  const content = loadContent();
  const jobIndex = content.jobs.findIndex(job => job.id === jobId);
  
  if (jobIndex !== -1) {
    content.jobs[jobIndex] = { ...content.jobs[jobIndex], ...updatedJob };
    saveContent(content);
  }
};

export const removeJob = (jobId: string): void => {
  const content = loadContent();
  content.jobs = content.jobs.filter(job => job.id !== jobId);
  saveContent(content);
};

export const toggleJobStatus = (jobId: string): void => {
  const content = loadContent();
  const jobIndex = content.jobs.findIndex(job => job.id === jobId);
  
  if (jobIndex !== -1) {
    content.jobs[jobIndex].isActive = !content.jobs[jobIndex].isActive;
    saveContent(content);
  }
};

export const getActiveJobs = (): Job[] => {
  const content = loadContent();
  return content.jobs.filter(job => job.isActive);
};

export const getJobById = (jobId: string): Job | undefined => {
  const content = loadContent();
  return content.jobs.find(job => job.id === jobId);
};

// Utility to get image URL from localStorage or return original URL
export const getImageUrl = (imageUrl: string): string => {
  if (imageUrl.startsWith('local://')) {
    const imageKey = imageUrl.replace('local://', '');
    const base64Data = localStorage.getItem(imageKey);
    return base64Data || imageUrl; // Return base64 data or fallback to original URL
  }
  return imageUrl; // Return external URLs as-is
};

// Utility to clean up unused images from localStorage
export const cleanupUnusedImages = (): void => {
  try {
    const content = loadContent();
    const usedImageKeys = new Set<string>();
    
    // Collect all used image keys
    content.heroSlides.forEach(slide => {
      if (slide.image.startsWith('local://')) {
        usedImageKeys.add(slide.image.replace('local://', ''));
      }
    });
    
    if (content.aboutImage.startsWith('local://')) {
      usedImageKeys.add(content.aboutImage.replace('local://', ''));
    }
    
    content.projects.forEach(project => {
      if (project.image.startsWith('local://')) {
        usedImageKeys.add(project.image.replace('local://', ''));
      }
    });
    
    content.partners.forEach(partner => {
      if (partner.logo && partner.logo.startsWith('local://')) {
        usedImageKeys.add(partner.logo.replace('local://', ''));
      }
    });
    
    // Remove unused images from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('protief-image-') && !usedImageKeys.has(key)) {
        localStorage.removeItem(key);
      }
    }
      // Update file metadata
    const storedFiles = JSON.parse(localStorage.getItem('protief-uploaded-files') || '[]');
    const activeFiles = storedFiles.filter((file: {imageKey: string}) => usedImageKeys.has(file.imageKey));
    localStorage.setItem('protief-uploaded-files', JSON.stringify(activeFiles));
  } catch (error) {
    console.error('Error cleaning up images:', error);
  }
};
