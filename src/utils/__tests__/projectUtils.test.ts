import { validateProjectData, getProjectById, getProjectsByCategory } from '../projectUtils';
import { ProjectData } from '../../types/project';

const mockProject: ProjectData = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project',
  longDescription: 'A longer description',
  heroImage: '/test-hero.jpg',
  images: ['/test1.jpg', '/test2.jpg'],
  technologiesUsed: ['React', 'TypeScript'],
  liveUrl: 'https://test.com',
  githubUrl: 'https://github.com/test/test',
  features: ['Feature 1', 'Feature 2'],
  challenges: ['Challenge 1'],
  category: 'Web Application'
};

describe('projectUtils', () => {
  describe('validateProjectData', () => {
    it('should validate correct project data', () => {
      expect(validateProjectData(mockProject)).toBe(true);
    });

    it('should reject invalid project data', () => {
      const invalidProject = { ...mockProject, id: 123 };
      expect(validateProjectData(invalidProject)).toBe(false);
    });
  });

  describe('getProjectById', () => {
    const projects = [mockProject];

    it('should find project by id', () => {
      const result = getProjectById(projects, 'test-project');
      expect(result).toEqual(mockProject);
    });

    it('should return undefined for non-existent id', () => {
      const result = getProjectById(projects, 'non-existent');
      expect(result).toBeUndefined();
    });
  });

  describe('getProjectsByCategory', () => {
    const projects = [
      mockProject,
      { ...mockProject, id: 'test-2', category: 'Mobile App' }
    ];

    it('should filter projects by category', () => {
      const result = getProjectsByCategory(projects, 'Web Application');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('test-project');
    });
  });
});