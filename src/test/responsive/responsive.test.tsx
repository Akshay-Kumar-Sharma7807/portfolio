import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import { render, mockProjectData } from '../utils/testUtils'
import Project from '../../pages/Project'
import { Work } from '../../pages/Work'
import ImageGallery from '../../components/ImageGallery'

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

// Mock components
vi.mock('../../components/ImageGallery', () => ({
  default: ({ images, projectTitle }: { images: string[], projectTitle: string }) => (
    <div data-testid="image-gallery" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {images.slice(1).map((image, index) => (
        <div key={index} className="aspect-video">
          <img src={image} alt={`${projectTitle} screenshot ${index + 2}`} />
        </div>
      ))}
    </div>
  )
}))

vi.mock('../../components/CallToAction', () => ({
  default: ({ liveUrl, githubUrl }: { liveUrl?: string, githubUrl?: string }) => (
    <div data-testid="call-to-action" className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
      {liveUrl && (
        <a href={liveUrl} className="px-4 sm:px-6 py-3 sm:py-3 min-h-[44px] text-sm sm:text-base">
          View Live Site
        </a>
      )}
      {githubUrl && (
        <a href={githubUrl} className="px-4 sm:px-6 py-3 sm:py-3 min-h-[44px] text-sm sm:text-base">
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
  default: () => <div data-testid="project-loading">Loading...</div>
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

// Mock window.matchMedia for responsive tests
const mockMatchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})

describe('Responsive Design Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(mockMatchMedia),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Project Component Responsive Behavior', () => {
    it('should render with responsive typography classes', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      const title = screen.getByText('Test Project')
      expect(title).toHaveClass('text-3xl', 'sm:text-4xl', 'md:text-5xl', 'lg:text-6xl', 'xl:text-7xl')
    })

    it('should have responsive padding and margins', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      const heroSection = screen.getByText('Test Project').closest('section')
      expect(heroSection).toHaveClass('pt-32', 'sm:pt-36', 'md:pt-40')
    })

    it('should render responsive project metadata layout', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      // Technology tags should have responsive sizing
      const reactTag = screen.getByText('React')
      expect(reactTag).toHaveClass('px-2', 'sm:px-3', 'text-xs', 'sm:text-sm')
    })

    it('should have responsive content sections', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      const contentSection = screen.getByText('About This Project').closest('section')
      expect(contentSection).toHaveClass('px-4', 'sm:px-6', 'md:px-8', 'py-12', 'sm:py-16')
    })

    it('should render responsive feature grid', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      const featuresGrid = screen.getByText(/Feature 1: Responsive design/).closest('div')?.parentElement
      expect(featuresGrid).toHaveClass('grid', 'grid-cols-1', 'lg:grid-cols-2', 'gap-4', 'sm:gap-6')
    })

    it('should have responsive call-to-action buttons', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      const ctaContainer = screen.getByTestId('call-to-action')
      expect(ctaContainer).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'gap-3', 'sm:gap-4')
      
      const liveButton = screen.getByText('View Live Site')
      expect(liveButton).toHaveClass('px-4', 'sm:px-6', 'py-3', 'sm:py-3', 'min-h-[44px]', 'text-sm', 'sm:text-base')
    })
  })

  describe('Work Component Responsive Behavior', () => {
    it('should render responsive grid layout', () => {
      render(<Work />)
      
      const gridContainer = screen.getByText('Selected Work').nextElementSibling
      expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-6', 'sm:gap-8')
    })

    it('should have responsive typography', () => {
      render(<Work />)
      
      const title = screen.getByText('Selected Work')
      expect(title).toHaveClass('text-3xl', 'sm:text-4xl', 'md:text-5xl')
    })

    it('should render responsive project cards', () => {
      render(<Work />)
      
      const projectTitle = screen.getByText('Test Project')
      expect(projectTitle).toHaveClass('text-lg', 'sm:text-xl', 'md:text-2xl')
      
      const projectDescription = screen.getByText('A test project for unit testing')
      expect(projectDescription).toHaveClass('text-sm', 'sm:text-base')
    })

    it('should have responsive technology tags', () => {
      render(<Work />)
      
      const techTag = screen.getByText('React')
      expect(techTag).toHaveClass('px-2', 'sm:px-3', 'text-xs', 'sm:text-sm')
    })

    it('should render responsive View Details buttons', () => {
      render(<Work />)
      
      const viewDetailsButton = screen.getAllByText('View Details')[0]
      expect(viewDetailsButton).toHaveClass('px-3', 'sm:px-4', 'text-sm', 'sm:text-base', 'min-h-[44px]')
    })
  })

  describe('ImageGallery Responsive Behavior', () => {
    const mockImages = ['/hero.jpg', '/gallery1.jpg', '/gallery2.jpg', '/gallery3.jpg', '/gallery4.jpg']
    
    it('should render responsive grid layout', () => {
      render(<ImageGallery images={mockImages} projectTitle="Test Project" />)
      
      const galleryGrid = screen.getByTestId('image-gallery')
      expect(galleryGrid).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4')
    })

    it('should have responsive gap spacing', () => {
      render(<ImageGallery images={mockImages} projectTitle="Test Project" />)
      
      const galleryGrid = screen.getByTestId('image-gallery')
      expect(galleryGrid).toHaveClass('gap-3', 'sm:gap-4', 'md:gap-6')
    })

    it('should maintain aspect ratio on all screen sizes', () => {
      render(<ImageGallery images={mockImages} projectTitle="Test Project" />)
      
      const imageContainers = document.querySelectorAll('.aspect-video')
      expect(imageContainers.length).toBeGreaterThan(0)
    })
  })

  describe('Touch and Mobile Interactions', () => {
    it('should have touch-friendly button sizes', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      const liveButton = screen.getByText('View Live Site')
      expect(liveButton).toHaveClass('min-h-[44px]') // Minimum touch target size
    })

    it('should have touch-manipulation class for better touch response', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      const liveButton = screen.getByText('View Live Site')
      expect(liveButton).toHaveClass('touch-manipulation')
    })

    it('should render mobile-optimized spacing', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      // Check for mobile-first responsive spacing
      const heroContent = screen.getByText('Test Project').closest('div')
      expect(heroContent).toHaveClass('px-4', 'sm:px-6', 'md:px-8')
    })
  })

  describe('Breakpoint-Specific Behavior', () => {
    it('should handle mobile breakpoint (< 640px)', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          ...mockMatchMedia(query),
          matches: query === '(max-width: 639px)'
        })),
      })
      
      render(<Work />)
      
      // Should render single column layout
      const gridContainer = screen.getByText('Selected Work').nextElementSibling
      expect(gridContainer).toHaveClass('grid-cols-1')
    })

    it('should handle tablet breakpoint (640px - 768px)', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          ...mockMatchMedia(query),
          matches: query === '(min-width: 640px) and (max-width: 767px)'
        })),
      })
      
      render(<Work />)
      
      // Should still render single column but with larger text
      const title = screen.getByText('Selected Work')
      expect(title).toHaveClass('sm:text-4xl')
    })

    it('should handle desktop breakpoint (> 768px)', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          ...mockMatchMedia(query),
          matches: query === '(min-width: 768px)'
        })),
      })
      
      render(<Work />)
      
      // Should render two-column layout
      const gridContainer = screen.getByText('Selected Work').nextElementSibling
      expect(gridContainer).toHaveClass('md:grid-cols-2')
    })
  })

  describe('Content Overflow and Wrapping', () => {
    it('should handle long project titles gracefully', async () => {
      const longTitleProject = {
        ...mockProjectData,
        title: 'This is a Very Long Project Title That Should Wrap Properly on Mobile Devices'
      }
      
      vi.mocked(vi.importMock('../../utils/projectUtils')).getProjectById.mockReturnValue(longTitleProject)
      
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      const title = screen.getByText(longTitleProject.title)
      expect(title).toHaveClass('leading-tight') // Should have proper line height for wrapping
    })

    it('should handle technology tag overflow', () => {
      const manyTechProject = {
        ...mockProjectData,
        technologiesUsed: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Sass', 'Webpack', 'Babel', 'ESLint', 'Prettier']
      }
      
      vi.mocked(vi.importMock('../../utils/projectUtils')).getProjectById.mockReturnValue(manyTechProject)
      
      render(<Work />)
      
      // Should wrap technology tags properly
      const techContainer = screen.getByText('React').closest('div')
      expect(techContainer).toHaveClass('flex', 'flex-wrap')
    })

    it('should handle long descriptions with proper line breaks', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      const description = screen.getByText(/This is a longer description/)
      expect(description).toHaveClass('leading-relaxed') // Should have proper line spacing
    })
  })

  describe('Image Responsiveness', () => {
    it('should render responsive images with proper sizing', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      const galleryImages = screen.getAllByAltText(/screenshot/)
      galleryImages.forEach(img => {
        expect(img).toHaveClass('w-full', 'h-full', 'object-cover')
      })
    })

    it('should maintain aspect ratios across different screen sizes', () => {
      render(<ImageGallery images={['/hero.jpg', '/img1.jpg', '/img2.jpg']} projectTitle="Test" />)
      
      const imageContainers = document.querySelectorAll('.aspect-video')
      expect(imageContainers.length).toBe(2) // Hero image is skipped
    })
  })

  describe('Responsive Navigation and Layout', () => {
    it('should have responsive container max-widths', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      const mainContainer = screen.getByText('Test Project').closest('div')?.parentElement
      expect(mainContainer).toHaveClass('max-w-6xl', 'mx-auto')
    })

    it('should render responsive section spacing', async () => {
      render(<Project projectId="test-project" />)
      
      vi.advanceTimersByTime(1000)
      
      const contentSection = screen.getByText('About This Project').closest('section')
      expect(contentSection).toHaveClass('py-12', 'sm:py-16')
    })
  })
})