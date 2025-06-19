const API_BASE_URL = 'http://localhost:3001/api';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ContentData {
  hero: {
    slides: Array<{
      id: number;
      title: string;
      subtitle: string;
      image: string;
      alt: string;
    }>;
  };
  about: {
    image: string;
    alt: string;
  };
  services: {
    mainImage: string;
  };
  projects: Array<{
    id: number;
    title: string;
    location: string;
    scope: string;
    duration: string;
    image: string;
    description: string;
    technologies: string[];
    status: string;
  }>;
  partners: Array<{
    id: number;
    name: string;
    logo: string;
  }>;
}

// Content API functions
export const contentApi = {
  // Load content from JSON file
  async loadContent(): Promise<ContentData> {
    try {
      const response = await fetch(`${API_BASE_URL}/content`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to load content:', error);
      throw error;
    }
  },

  // Save content to JSON file
  async saveContent(content: ContentData): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error('Failed to save content:', error);
      throw error;
    }
  },

  // Upload image to public/uploads
  async uploadImage(file: File): Promise<ApiResponse<string>> {
    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Generate unique filename
      const timestamp = Date.now();
      const extension = file.name.split('.').pop() || 'jpg';
      const filename = `${timestamp}.${extension}`;

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename,
          data: base64,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      return {
        success: true,
        data: result.path,
        message: result.message
      };
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw error;
    }
  }
};

// Helper function to check if API server is running
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/content`);
    return response.ok;
  } catch {
    return false;
  }
};
