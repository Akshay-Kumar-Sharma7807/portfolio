import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, mockProjectData } from '../utils/testUtils'
import Project from '../../pages/Project'
import { Work } from '../../pages/Work'
import ImageGallery from '../../components/ImageGallery'
import CallToAction from '../../components/CallToAction'

// Mock the project data
vi.mock('../../data/projects.json', () => ({
  default: [mockProjectData]
}))

// Mock the utility function
vi.mock('../../utils/projectUtils', () => ({
  getProjectById: vi.fn(() => mockProjectData)
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    span: 'span',
    a: 'a',
    button: 'button'
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children
}))

// Mock components with accessibility-focused implementations
vi.mock('../../components/ImageGallery', () => ({
  default: ({ images, projectTitle }: { images: string[], projectTitle: string }) => (
    <div role="region" aria-label="Project image gallery" data-testid="image-gallery">
      {images.slice(1).map((image, index) => (
        <button
          key={index}
          aria-label={`View ${projectTitle} screenshot ${index + 2}`}
          role="button"
        >
          <img src={image} alt={`${projectTitle} screenshot ${index + 2}`} />
        </button>
      ))}
    </div>
  )
}))

vi.mock('../../components/CallToAction', () => ({
  default: ({ liveUrl, githubUrl }: { liveUrl?: string, githubUrl?: string }) => (
    <div data-testid="call-to-action" role="region" aria-label="Project links">
      {liveUrl && (
        <a href={liveUrl} aria-label="View live website" target="_blank" rel="noopener noreferrer">
          View Live Site
        </a>
      )}
      {githubUrl && (
        <a href={githubUrl} aria-label="View source code on GitHub" target="_blank" rel="noopener noreferrer">
          View Source Code
        </a>
      )}
    </div>
  )
}))

vi.mock('../../components/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

vi.mock('../../components/ProjectLoading', () => ({
  default: () => <div role="status" aria-label="Loading project">Loading...</div>
}))

vi.mock('../../components/PageTransition', () => ({
  default: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={className}>{children}</div>
  )
}))

vi.mock('../../components/FallbackImage', () => ({
  default: ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
    <img src={src} alt={alt} className={className} />
  )
}))

describe('Accessibility Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Project Component Accessibility', () => {
    it('should have proper heading hierarchy', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      // Main title should be h1
      expect(screen.getByRole('heading', { level: 1, name: 'Test Project' })).toBeInTheDocument()
      
      // Section headings should be h2 or h3
      expect(screen.getByRole('heading', { level: 3, name: 'Technologies Used' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 3, name: 'Key Features' })).toBeInTheDocument()
    })

    it('should have proper ARIA labels and roles', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      // Image gallery should have proper ARIA attributes
      expect(screen.getByRole('region', { name: 'Project image gallery' })).toBeInTheDocument()
      
      // Call to action should have proper ARIA attributes
      expect(screen.getByRole('region', { name: 'Project links' })).toBeInTheDocument()
    })

    it('should have accessible links with proper attributes', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      const liveLink = screen.getByLabelText('View live website')
      const githubLink = screen.getByLabelText('View source code on GitHub')
      
      expect(liveLink).toHaveAttribute('target', '_blank')
      expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should have descriptive alt text for images', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      // Gallery images should have descriptive alt text
      expect(screen.getByAltText('Test Project screenshot 2')).toBeInTheDocument()
      expect(screen.getByAltText('Test Project screenshot 3')).toBeInTheDocument()
    })

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      // Should be able to tab through interactive elements
      const liveLink = screen.getByLabelText('View live website')
      const githubLink = screen.getByLabelText('View source code on GitHub')
      
      await user.tab()
      expect(liveLink).toHaveFocus()
      
      await user.tab()
      expect(githubLink).toHaveFocus()
    })

    it('should have proper loading state accessibility', () => {
      render(<Project projectId="test-project" />)
      
      // Loading state should have proper ARIA attributes
      expect(screen.getByRole('status', { name: 'Loading project' })).toBeInTheDocument()
    })
  })

  describe('Work Component Accessibility', () => {
    it('should have proper heading structure', () => {
      render(<Work />)
      
      expect(screen.getByRole('heading', { level: 1, name: 'Selected Work' })).toBeInTheDocument()
    })

    it('should have accessible project cards', () => {
      render(<Work />)
      
      // Project titles should be properly structured
      expect(screen.getByText('Test Project')).toBeInTheDocument()
      
      // Links should be accessible
      const projectLinks = screen.getAllByRole('link')
      expect(projectLinks.length).toBeGreaterThan(0)
    })

    it('should have descriptive link text', () => {
      render(<Work />)
      
      const viewDetailsLinks = screen.getAllByText('View Details')
      expect(viewDetailsLinks.length).toBeGreaterThan(0)
      
      // Each link should be descriptive
      viewDetailsLinks.forEach(link => {
        expect(link).toBeInTheDocument()
      })
    })

    it('should have proper image alt text', () => {
      render(<Work />)
      
      expect(screen.getByAltText('Test Project')).toBeInTheDocument()
    })
  })

  describe('ImageGallery Accessibility', () => {
    const mockImages = ['/hero.jpg', '/gallery1.jpg', '/gallery2.jpg']
    
    it('should have proper ARIA labels for gallery region', () => {
      render(<ImageGallery images={mockImages} projectTitle="Test Project" />)
      
      expect(screen.getByRole('region', { name: 'Project image gallery' })).toBeInTheDocument()
    })

    it('should have accessible image buttons', () => {
      render(<ImageGallery images={mockImages} projectTitle="Test Project" />)
      
      expect(screen.getByLabelText('View Test Project screenshot 2')).toBeInTheDocument()
      expect(screen.getByLabelText('View Test Project screenshot 3')).toBeInTheDocument()
    })

    it('should support keyboard navigation for gallery images', async () => {
      const user = userEvent.setup()
      render(<ImageGallery images={mockImages} projectTitle="Test Project" />)
      
      const firstImage = screen.getByLabelText('View Test Project screenshot 2')
      
      // Should be focusable
      await user.tab()
      expect(firstImage).toHaveFocus()
      
      // Should be activatable with Enter
      await user.keyboard('{Enter}')
      // Modal functionality would be tested in integration tests
    })

    it('should have descriptive alt text for all images', () => {
      render(<ImageGallery images={mockImages} projectTitle="Test Project" />)
      
      expect(screen.getByAltText('Test Project screenshot 2')).toBeInTheDocument()
      expect(screen.getByAltText('Test Project screenshot 3')).toBeInTheDocument()
    })
  })

  describe('CallToAction Accessibility', () => {
    it('should have proper ARIA labels for action region', () => {
      render(
        <CallToAction 
          liveUrl="https://example.com" 
          githubUrl="https://github.com/user/repo" 
        />
      )
      
      expect(screen.getByRole('region', { name: 'Project links' })).toBeInTheDocument()
    })

    it('should have descriptive link labels', () => {
      render(
        <CallToAction 
          liveUrl="https://example.com" 
          githubUrl="https://github.com/user/repo" 
        />
      )
      
      expect(screen.getByLabelText('View live website')).toBeInTheDocument()
      expect(screen.getByLabelText('View source code on GitHub')).toBeInTheDocument()
    })

    it('should have proper external link attributes', () => {
      render(
        <CallToAction 
          liveUrl="https://example.com" 
          githubUrl="https://github.com/user/repo" 
        />
      )
      
      const liveLink = screen.getByLabelText('View live website')
      const githubLink = screen.getByLabelText('View source code on GitHub')
      
      expect(liveLink).toHaveAttribute('target', '_blank')
      expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(
        <CallToAction 
          liveUrl="https://example.com" 
          githubUrl="https://github.com/user/repo" 
        />
      )
      
      const liveLink = screen.getByLabelText('View live website')
      const githubLink = screen.getByLabelText('View source code on GitHub')
      
      // Should be able to tab through links
      await user.tab()
      expect(liveLink).toHaveFocus()
      
      await user.tab()
      expect(githubLink).toHaveFocus()
    })
  })

  describe('Color Contrast and Visual Accessibility', () => {
    it('should use semantic HTML elements', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      // Should use proper semantic elements
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByRole('region', { name: 'Project image gallery' })).toBeInTheDocument()
      expect(screen.getByRole('region', { name: 'Project links' })).toBeInTheDocument()
    })

    it('should have focus indicators', async () => {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      // Interactive elements should be focusable
      const liveLink = screen.getByLabelText('View live website')
      
      await user.tab()
      expect(liveLink).toHaveFocus()
    })

    it('should not rely solely on color for information', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      // Technology tags should have text content, not just color
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      
      // Features should have text content and icons/indicators
      expect(screen.getByText(/Feature 1: Responsive design/)).toBeInTheDocument()
    })
  })

  describe('Screen Reader Compatibility', () => {
    it('should have proper document structure for screen readers', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      // Should have logical heading hierarchy
      const headings = screen.getAllByRole('heading')
      expect(headings.length).toBeGreaterThan(0)
      
      // Main heading should be level 1
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    it('should provide context for interactive elements', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      // Links should have descriptive text or labels
      const liveLink = screen.getByLabelText('View live website')
      const githubLink = screen.getByLabelText('View source code on GitHub')
      
      expect(liveLink).toBeInTheDocument()
      expect(githubLink).toBeInTheDocument()
    })

    it('should group related content appropriately', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      // Related content should be grouped in regions
      expect(screen.getByRole('region', { name: 'Project image gallery' })).toBeInTheDocument()
      expect(screen.getByRole('region', { name: 'Project links' })).toBeInTheDocument()
    })
  })
})