// Type definitions for the ProTief website

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  year: string;
  status: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface ContentData {
  heroSlides: HeroSlide[];
  aboutImage: string;
  projects: Project[];
  partners: Partner[];
  jobs: Job[];
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
}

export interface CompanyInfo {
  name: string;
  slogan: string;
  description: string;
  founded: string;
  employees: string;
  location: string;
}

// Admin panel types
export interface UploadedFile {
  file: File;
  fileName: string;
  imageUrl: string;
  blobUrl: string;
  type: 'hero' | 'about' | 'project' | 'partner';
  itemId?: string;
  uploadDate: string;
}

export interface AdminUser {
  id: string;
  username: string;
  role: 'admin' | 'editor';
  lastLogin: string;
}

// Form types
export interface HeroSlideFormData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image?: File;
}

export interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  year: string;
  status: string;
  image?: File;
}

export interface PartnerFormData {
  name: string;
  logo?: File;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  published: boolean;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Vollzeit' | 'Teilzeit' | 'Ausbildung' | 'Praktikum';
  description: string;
  requirements: string[];
  benefits: string[];
  datePosted: string;
  applicationDeadline?: string;
  active: boolean;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Vollzeit' | 'Teilzeit' | 'Praktikum' | 'Ausbildung';
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: string;
  createdAt: string;
  isActive: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantName: string;
  email: string;
  phone?: string;
  coverLetter: string;
  resumeUrl?: string;
  appliedAt: string;
  status: 'Neu' | 'In Bearbeitung' | 'Eingeladen' | 'Abgelehnt' | 'Eingestellt';
}
