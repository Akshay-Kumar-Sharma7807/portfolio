import { describe, it, expect } from 'vitest'
import { 
  migrateLegacyProject, 
  validateProjectData, 
  getProjectById, 
  getProjectsByCategory 
} from '../../utils/projectUtils'
import { ProjectData, LegacyProject } from '../../types/project'

describe('projectUtils', () => {
  describe('migrateLegacyProject', () => {
    it('should migrate legacy project to new format', () => {
      const legacyProject: LegacyProject = {
        title: 'Test Project',
        description: 'A test project',
        heroImage: '/test-hero.jpg',
        screenshot: '/test-screenshot.jpg',
        technologiesUsed: ['React', 'TypeScript'],
        link: 'https://test.com'
      }

      const result = migrateLegacyProject(legacyProject)

      expect(result).toEqual({
        id: 'test-project',
        title: 'Test Project',
        description: 'A test project',
        longDescription: undefined,
        heroImage: '/test-hero.jpg',
        images: ['/test-screenshot.jpg'],
        technologiesUsed: ['React', 'TypeScript'],
        liveUrl: 'https://test.com',
        githubUrl: undefined,
        features: [],
        challenges: undefined,
        category: 'Web Application'
      })
    })

    it('should handle project titles with special characters', () => {
      const legacyProject: LegacyProject = {
        title: 'My Awesome Project!!! @#$',
        description: 'Test',
        heroImage: '/test.jpg',
        screenshot: '/test.jpg',
        technologiesUsed: ['React'],
        link: 'https://test.com'
      }

      const result = migrateLegacyProject(legacyProject)
      expect(result.id).toBe('my-awesome-project!!!-@#$')
    })
  })

  describe('validateProjectData', () => {
    const validProject: ProjectData = {
      id: 'test-project',
      title: 'Test Project',
      description: 'A test project',
      heroImage: '/test.jpg',
      images: ['/test1.jpg', '/test2.jpg'],
      technologiesUsed: ['React', 'TypeScript'],
      features: ['Feature 1', 'Feature 2'],
      category: 'Web Application'
    }

    it('should validate correct project data', () => {
      expect(validateProjectData(validProject)).toBe(true)
    })

    it('should reject project with missing required fields', () => {
      const invalidProject = { ...validProject }
      delete (invalidProject as any).id
      expect(validateProjectData(invalidProject)).toBe(false)
    })

    it('should reject project with wrong field types', () => {
      const invalidProject = { ...validProject, images: 'not-an-array' }
      expect(validateProjectData(invalidProject)).toBe(false)
    })

    it('should reject project with non-array technologiesUsed', () => {
      const invalidProject = { ...validProject, technologiesUsed: 'React, TypeScript' }
      expect(validateProjectData(invalidProject)).toBe(false)
    })

    it('should reject project with non-array features', () => {
      const invalidProject = { ...validProject, features: 'Feature 1, Feature 2' }
      expect(validateProjectData(invalidProject)).toBe(false)
    })
  })

  describe('getProjectById', () => {
    const projects: ProjectData[] = [
      {
        id: 'project-1',
        title: 'Project 1',
        description: 'First project',
        heroImage: '/test1.jpg',
        images: ['/test1.jpg'],
        technologiesUsed: ['React'],
        features: ['Feature 1'],
        category: 'Web Application'
      },
      {
        id: 'project-2',
        title: 'Project 2',
        description: 'Second project',
        heroImage: '/test2.jpg',
        images: ['/test2.jpg'],
        technologiesUsed: ['Vue'],
        features: ['Feature 2'],
        category: 'Mobile Application'
      }
    ]

    it('should find project by id', () => {
      const result = getProjectById(projects, 'project-1')
      expect(result).toEqual(projects[0])
    })

    it('should return undefined for non-existent project', () => {
      const result = getProjectById(projects, 'non-existent')
      expect(result).toBeUndefined()
    })

    it('should handle empty projects array', () => {
      const result = getProjectById([], 'project-1')
      expect(result).toBeUndefined()
    })
  })

  describe('getProjectsByCategory', () => {
    const projects: ProjectData[] = [
      {
        id: 'web-project',
        title: 'Web Project',
        description: 'A web project',
        heroImage: '/web.jpg',
        images: ['/web.jpg'],
        technologiesUsed: ['React'],
        features: ['Web Feature'],
        category: 'Web Application'
      },
      {
        id: 'mobile-project',
        title: 'Mobile Project',
        description: 'A mobile project',
        heroImage: '/mobile.jpg',
        images: ['/mobile.jpg'],
        technologiesUsed: ['React Native'],
        features: ['Mobile Feature'],
        category: 'Mobile Application'
      },
      {
        id: 'another-web-project',
        title: 'Another Web Project',
        description: 'Another web project',
        heroImage: '/web2.jpg',
        images: ['/web2.jpg'],
        technologiesUsed: ['Vue'],
        features: ['Another Web Feature'],
        category: 'Web Application'
      }
    ]

    it('should return projects by category', () => {
      const webProjects = getProjectsByCategory(projects, 'Web Application')
      expect(webProjects).toHaveLength(2)
      expect(webProjects[0].id).toBe('web-project')
      expect(webProjects[1].id).toBe('another-web-project')
    })

    it('should return empty array for non-existent category', () => {
      const result = getProjectsByCategory(projects, 'Non-existent Category')
      expect(result).toEqual([])
    })

    it('should handle empty projects array', () => {
      const result = getProjectsByCategory([], 'Web Application')
      expect(result).toEqual([])
    })
  })
})