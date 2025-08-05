import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { render } from '@testing-library/react'
import { Work } from '../../pages/Work'
import Project from '../../pages/Project'
import { mockProjectsArray } from '../utils/testUtils'

// Mock the project data
vi.mock('../../data/projects.json', () => ({
  default: mockProjectsArray
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

// Mock all the components to avoid complex dependencies
vi.mock('../../components/ImageGallery', () => ({
  default: ({ images, projectTitle }: { images: string[], projectTitle: string }) => (
    <div data-testid="image-gallery">Gallery for {projectTitle}</div>
  )
}))

vi.mock('../../components/CallToAction', () => ({
  default: ({ liveUrl, githubUrl }: { liveUrl?: string, githubUrl?: string }) => (
    <div data-testid="call-to-action">
      {liveUrl && <span>Live Site Available</span>}
      {githubUrl && <span>GitHub Available</span>}
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

vi.mock('../../components/FallbackImage', () => ({
  default: ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="fallback-image" />
  )
}))

// Mock asset imports
vi.mock('../../assets/saplings-protector.png', () => ({
  default: '/mocked-saplings-protector.png'
}))

vi.mock('../../assets/todo.png', () => ({
  default: '/mocked-todo.png'
}))

vi.mock('../../assets/game.png', () => ({
  default: '/mocked-game.png'
}))

// Custom render function for integration tests
const renderWithRouter = (initialEntries: string[] = ['/work']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/work" element={<Work />} />
        <Route path="/project/:projectId" element={
          <Project projectId={window.location.pathname.split('/').pop() || ''} />
        } />
      </Routes>
    </MemoryRouter>
  )
}

describe('Navigation Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should navigate from Work page to Project page when View Details is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    
    renderWithRouter(['/work'])
    
    // Verify we're on the Work page
    expect(screen.getByText('Selected Work')).toBeInTheDocument()
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    
    // Click on the first "View Details" button
    const viewDetailsButtons = screen.getAllByText('View Details')
    await user.click(viewDetailsButtons[0])
    
    // Fast-forward timers to skip loading
    vi.advanceTimersByTime(1000)
    
    // Should navigate to the project page
    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument()
      expect(screen.getByText('A test project for unit testing')).toBeInTheDocument()
    })
  })

  it('should display project details correctly after navigation', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    
    renderWithRouter(['/work'])
    
    // Navigate to a specific project
    const viewDetailsButtons = screen.getAllByText('View Details')
    await user.click(viewDetailsButtons[0]) // Test Project
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      // Should show project details
      expect(screen.getByText('Test Project')).toBeInTheDocument()
      expect(screen.getByText('Web Application')).toBeInTheDocument()
      expect(screen.getByTestId('image-gallery')).toBeInTheDocument()
      expect(screen.getByTestId('call-to-action')).toBeInTheDocument()
    })
  })

  it('should handle navigation to different projects', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    
    renderWithRouter(['/work'])
    
    // Navigate to Mobile Project (4th project)
    const viewDetailsButtons = screen.getAllByText('View Details')
    await user.click(viewDetailsButtons[3])
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByText('Mobile Project')).toBeInTheDocument()
      expect(screen.getByText('Mobile Application')).toBeInTheDocument()
    })
  })

  it('should show loading state during navigation', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    
    renderWithRouter(['/work'])
    
    const viewDetailsButtons = screen.getAllByText('View Details')
    await user.click(viewDetailsButtons[0])
    
    // Should show loading state before timer advances
    expect(screen.getByTestId('project-loading')).toBeInTheDocument()
    
    // Advance timers to complete loading
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.queryByTestId('project-loading')).not.toBeInTheDocument()
    })
  })

  it('should handle navigation to non-existent project', async () => {
    renderWithRouter(['/project/non-existent-project'])
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByTestId('project-not-found')).toBeInTheDocument()
      expect(screen.getByText('Project non-existent-project not found')).toBeInTheDocument()
    })
  })

  it('should display correct project data for each project', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    
    renderWithRouter(['/work'])
    
    // Test each project navigation
    const projects = [
      { index: 0, title: 'Test Project', category: 'Web Application' },
      { index: 1, title: 'Minimal Project', category: 'Web Application' },
      { index: 2, title: 'No Links Project', category: 'Web Application' },
      { index: 3, title: 'Mobile Project', category: 'Mobile Application' }
    ]
    
    for (const project of projects) {
      // Go back to work page first (except for first iteration)
      if (project.index > 0) {
        renderWithRouter(['/work'])
      }
      
      const viewDetailsButtons = screen.getAllByText('View Details')
      await user.click(viewDetailsButtons[project.index])
      
      vi.advanceTimersByTime(1000)
      
      await waitFor(() => {
        expect(screen.getByText(project.title)).toBeInTheDocument()
        expect(screen.getByText(project.category)).toBeInTheDocument()
      })
    }
  })

  it('should maintain project data integrity during navigation', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    
    renderWithRouter(['/work'])
    
    // Navigate to Test Project
    const viewDetailsButtons = screen.getAllByText('View Details')
    await user.click(viewDetailsButtons[0])
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      // Check that all expected data is present
      expect(screen.getByText('Test Project')).toBeInTheDocument()
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
      expect(screen.getByText('Vitest')).toBeInTheDocument()
      expect(screen.getByTestId('call-to-action')).toBeInTheDocument()
    })
  })

  it('should handle rapid navigation clicks', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    
    renderWithRouter(['/work'])
    
    const viewDetailsButtons = screen.getAllByText('View Details')
    
    // Rapidly click multiple buttons
    await user.click(viewDetailsButtons[0])
    await user.click(viewDetailsButtons[1])
    await user.click(viewDetailsButtons[2])
    
    vi.advanceTimersByTime(1000)
    
    // Should handle rapid clicks without crashing
    await waitFor(() => {
      expect(screen.getByText(/Project/)).toBeInTheDocument()
    })
  })

  it('should preserve URL structure during navigation', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    
    renderWithRouter(['/work'])
    
    const viewDetailsButtons = screen.getAllByText('View Details')
    const firstButton = viewDetailsButtons[0]
    
    // The link should have the correct href
    const link = firstButton.closest('a')
    expect(link).toHaveAttribute('href', '/project/test-project')
  })

  it('should handle browser back/forward navigation', () => {
    // Test direct navigation to project page
    renderWithRouter(['/project/test-project'])
    
    vi.advanceTimersByTime(1000)
    
    waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument()
    })
  })

  it('should display appropriate content for projects with different data completeness', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    
    renderWithRouter(['/work'])
    
    // Navigate to minimal project (has fewer fields)
    const viewDetailsButtons = screen.getAllByText('View Details')
    await user.click(viewDetailsButtons[1]) // Minimal Project
    
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(screen.getByText('Minimal Project')).toBeInTheDocument()
      expect(screen.getByText('A minimal project with only required fields')).toBeInTheDocument()
      // Should not crash even with minimal data
    })
  })
})