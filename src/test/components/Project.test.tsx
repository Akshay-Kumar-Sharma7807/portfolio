import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { render, mockProjectData, mockProjectDataMinimal, mockProjectDataNoLinks } from '../utils/testUtils'
import Project from '../../pages/Project'

// Mock the project data
vi.mock('../../data/projects.json', () => ({
  default: [mockProjectData, mockProjectDataMinimal, mockProjectDataNoLinks]
}))

// Mock the utility function
vi.mock('../../utils/projectUtils', () => ({
  getProjectById: vi.fn((projects, id) => {
    return projects.find((p: any) => p.id === id)
  })
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
    <div data-testid="image-gallery">
      <span>Gallery for {projectTitle}</span>
      <span>Images: {images.length}</span>
    </div>
  )
}))

vi.mock('../../components/CallToAction', () => ({
  default: ({ liveUrl, githubUrl }: { liveUrl?: string, githubUrl?: string }) => (
    <div data-testid="call-to-action">
      {liveUrl && <a href={liveUrl} data-testid="live-url">Live Site</a>}
      {githubUrl && <a href={githubUrl} data-testid="github-url">GitHub</a>}
    </div>
  )
}))

vi.mock('../../components/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

vi.mock('../../components/ProjectNotFound', () => ({
  default: ({ projectId }: { projectId: string }) => (
    <div data-testid="project-not-found">Project {projectId} not found</div>
  )
}))

vi.mock('../../components/ProjectLoading', () => ({
  default: () => <div data-testid="project-loading">Loading...</div>
}))

vi.mock('../../components/PageTransition', () => ({
  default: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={className}>{children}</div>
  )
}))

describe('Project Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock setTimeout to avoid waiting in tests
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should show loading state initially', () => {
    render(<Project projectId="test-project" />)
    
    expect(screen.getByTestId('project-loading')).toBeInTheDocument()
  })

  it('should render project details after loading', async () => {
    render(<Project projectId="test-project" />)
    
    // Fast-forward timers to skip loading
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument()
    })
    
    expect(screen.getByText('A test project for unit testing')).toBeInTheDocument()
    expect(screen.getByText('Web Application')).toBeInTheDocument()
  })

  it('should display long description when available', async () => {
    render(<Project projectId="test-project" />)
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByText(/This is a longer description/)).toBeInTheDocument()
    })
  })

  it('should render technologies used', async () => {
    render(<Project projectId="test-project" />)
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getByText('Vitest')).toBeInTheDocument()
    })
  })

  it('should render features when available', async () => {
    render(<Project projectId="test-project" />)
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByText(/Feature 1: Responsive design/)).toBeInTheDocument()
      expect(screen.getByText(/Feature 2: Dark mode support/)).toBeInTheDocument()
      expect(screen.getByText(/Feature 3: Accessibility compliant/)).toBeInTheDocument()
    })
  })

  it('should render challenges when available', async () => {
    render(<Project projectId="test-project" />)
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByText(/Challenge 1: Implementing complex state management/)).toBeInTheDocument()
      expect(screen.getByText(/Challenge 2: Optimizing performance/)).toBeInTheDocument()
    })
  })

  it('should render image gallery', async () => {
    render(<Project projectId="test-project" />)
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      const gallery = screen.getByTestId('image-gallery')
      expect(gallery).toBeInTheDocument()
      expect(gallery).toHaveTextContent('Gallery for Test Project')
      expect(gallery).toHaveTextContent('Images: 3')
    })
  })

  it('should render call to action with links', async () => {
    render(<Project projectId="test-project" />)
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      const cta = screen.getByTestId('call-to-action')
      expect(cta).toBeInTheDocument()
      
      const liveLink = screen.getByTestId('live-url')
      expect(liveLink).toHaveAttribute('href', 'https://test-project.com')
      
      const githubLink = screen.getByTestId('github-url')
      expect(githubLink).toHaveAttribute('href', 'https://github.com/user/test-project')
    })
  })

  it('should handle project with minimal data', async () => {
    render(<Project projectId="minimal-project" />)
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByText('Minimal Project')).toBeInTheDocument()
      expect(screen.getByText('A minimal project with only required fields')).toBeInTheDocument()
    })
    
    // Should not render long description section
    expect(screen.queryByText('About This Project')).not.toBeInTheDocument()
    
    // Should not render features section (empty array)
    expect(screen.queryByText('Key Features')).not.toBeInTheDocument()
    
    // Should not render challenges section (undefined)
    expect(screen.queryByText('Challenges & Solutions')).not.toBeInTheDocument()
  })

  it('should handle project without links', async () => {
    render(<Project projectId="no-links-project" />)
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByText('No Links Project')).toBeInTheDocument()
    })
    
    // CallToAction should still render but handle no links
    expect(screen.getByTestId('call-to-action')).toBeInTheDocument()
  })

  it('should show project not found for non-existent project', async () => {
    render(<Project projectId="non-existent-project" />)
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByTestId('project-not-found')).toBeInTheDocument()
      expect(screen.getByText('Project non-existent-project not found')).toBeInTheDocument()
    })
  })

  it('should display technology count when more than 3 technologies', async () => {
    const projectWithManyTechs = {
      ...mockProjectData,
      technologiesUsed: ['React', 'TypeScript', 'Vitest', 'Jest', 'Cypress', 'Webpack']
    }
    
    // Mock the project data to return our custom project
    vi.mocked(vi.importMock('../../utils/projectUtils')).getProjectById.mockReturnValue(projectWithManyTechs)
    
    render(<Project projectId="test-project" />)
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByText('+3 more')).toBeInTheDocument()
    })
  })

  it('should render project metadata correctly', async () => {
    render(<Project projectId="test-project" />)
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByText('Category:')).toBeInTheDocument()
      expect(screen.getByText('Technologies:')).toBeInTheDocument()
    })
  })

  it('should render scroll indicator', async () => {
    render(<Project projectId="test-project" />)
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByText('Scroll to explore')).toBeInTheDocument()
    })
  })
})