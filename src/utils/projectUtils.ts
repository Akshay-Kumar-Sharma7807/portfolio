import { ProjectData, LegacyProject } from '../types/project';

/**
 * Utility function to migrate legacy project data to the new enhanced format
 */
export function migrateLegacyProject(legacyProject: LegacyProject): ProjectData {
  return {
    id: legacyProject.title.toLowerCase().replace(/\s+/g, '-'),
    title: legacyProject.title,
    description: legacyProject.description,
    longDescription: undefined,
    heroImage: legacyProject.heroImage,
    images: [legacyProject.screenshot],
    technologiesUsed: legacyProject.technologiesUsed,
    liveUrl: legacyProject.link,
    githubUrl: undefined,
    features: [],
    challenges: undefined,
    category: 'Web Application'
  };
}

/**
 * Utility function to validate project data structure
 */
export function validateProjectData(project: any): project is ProjectData {
  return (
    typeof project.id === 'string' &&
    typeof project.title === 'string' &&
    typeof project.description === 'string' &&
    typeof project.heroImage === 'string' &&
    Array.isArray(project.images) &&
    Array.isArray(project.technologiesUsed) &&
    Array.isArray(project.features) &&
    typeof project.category === 'string'
  );
}

/**
 * Utility function to get project by ID with type safety
 */
export function getProjectById(projects: ProjectData[], id: string): ProjectData | undefined {
  return projects.find(project => project.id === id);
}

/**
 * Utility function to get projects by category
 */
export function getProjectsByCategory(projects: ProjectData[], category: string): ProjectData[] {
  return projects.filter(project => project.category === category);
}