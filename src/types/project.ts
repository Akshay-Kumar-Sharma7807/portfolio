export interface ProjectData {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  heroImage: string;
  images: string[];
  technologiesUsed: string[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  challenges?: string[];
  category: string;
}

// Legacy interface for backward compatibility
export interface LegacyProject {
  heroImage: string;
  title: string;
  description: string;
  technologiesUsed: string[];
  screenshot: string;
  link: string;
}

// Work page project interface (currently used in Work.tsx)
export interface WorkProject {
  title: string;
  description: string;
  image: string;
  tags: string[];
}