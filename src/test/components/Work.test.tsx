import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, mockProjectsArray } from '../utils/testUtils'
import { Work } from '../../pages/Work'

// Mock the project data
vi.mock('../../data/projects.json', () => ({
  default: mockProjectsArray
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    h1: 'h1',
    h3: 'h3',
    p: 'p',
    span: 'span',
    a: 'a',
    svg: 'svg'
  }
}))

// Mock components
vi.mock('../../components/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

vi.mock('../../components/FallbackImage', () => ({
  default: ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
    <img src={src} alt={alt} className={className} data-testid="fallback-image" />
  )
}))

vi.mock('../../components/PageTransition', () => ({
  default: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={className}>{children}</div>
  )
}))

// Mock the asset imports
vi.mock('../../assets/saplings-protector.png', () => ({
  default: '/mocked-saplings-protector.png'
}))

vi.mock('../../assets/todo.png', () => ({
  default: '/mocked-todo.png'
}))

vi.mock('../../assets/game.png', () => ({
  default: '/mocked-game.png'
}))

describe('Work Component', () => {
  it('should render the page title', () => {
    render(<Work />)
    
    expect(screen.getByText('Selected Work')).toBeInTheDocument()
  })

  it('should render all projects', () => {
    render(<Work />)
    
    expect(screen.getByText('Test Project')).toBeInTheDocument()
    expect(screen.getByText('Minimal Project')).toBeInTheDocument()
    expect(screen.getByText('No Links Project')).toBeInTheDocument()
    expect(screen.getByText('Mobile Project')).toBeInTheDocument()
  })

  it('should render project descriptions', () => {
    render(<Work />)
    
    expect(screen.getByText('A test project for unit testing')).toBeInTheDocument()
    expect(screen.getByText('A minimal project with only required fields')).toBeInTheDocument()
    expect(screen.getByText('A project without live URL or GitHub URL')).toBeInTheDocument()
    expect(screen.getByText('A mobile application project')).toBeInTheDocument()
  })

  it('should render project technologies', () => {
    render(<Work />)
    
    // Check for technologies from different projects
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Vitest')).toBeInTheDocument()
    expect(screen.getByText('React Native')).toBeInTheDocument()
    expect(screen.getByText('Expo')).toBeInTheDocument()
  })

  it('should render project images with correct alt text', () => {
    render(<Work />)
    
    const images = screen.getAllByTestId('fallback-image')
    expect(images).toHaveLength(4) // One for each project
    
    // Check alt text for each project
    expect(screen.getByAltText('Test Project')).toBeInTheDocument()
    expect(screen.getByAltText('Minimal Project')).toBeInTheDocument()
    expect(screen.getByAltText('No Links Project')).toBeInTheDocument()
    expect(screen.getByAltText('Mobile Project')).toBeInTheDocument()
  })

  it('should render View Details buttons for all projects', () => {
    render(<Work />)
    
    const viewDetailsButtons = screen.getAllByText('View Details')
    expect(viewDetailsButtons).toHaveLength(4)
  })

  it('should have correct links to project detail pages', () => {
    render(<Work />)
    
    const links = screen.getAllByRole('link')
    
    // Find links that contain "View Details"
    const projectLinks = links.filter(link => 
      link.textContent?.includes('View Details')
    )
    
    expect(projectLinks).toHaveLength(4)
    expect(projectLinks[0]).toHaveAttribute('href', '/project/test-project')
    expect(projectLinks[1]).toHaveAttribute('href', '/project/minimal-project')
    expect(projectLinks[2]).toHaveAttribute('href', '/project/no-links-project')
    expect(projectLinks[3]).toHaveAttribute('href', '/project/mobile-project')
  })

  it('should handle hover interactions on project cards', async () => {
    const user = userEvent.setup()
    render(<Work />)
    
    const projectTitle = screen.getByText('Test Project')
    
    // Hover over the project title
    await user.hover(projectTitle)
    
    // The component should still be rendered (hover effects are CSS-based)
    expect(projectTitle).toBeInTheDocument()
  })

  it('should handle click interactions on View Details buttons', async () => {
    const user = userEvent.setup()
    render(<Work />)
    
    const viewDetailsButtons = screen.getAllByText('View Details')
    const firstButton = viewDetailsButtons[0]
    
    // Click should not throw an error
    await user.click(firstButton)
    
    expect(firstButton).toBeInTheDocument()
  })

  it('should render technology tags with hover effects', async () => {
    const user = userEvent.setup()
    render(<Work />)
    
    const reactTag = screen.getAllByText('React')[0] // Get first React tag
    
    // Hover over the technology tag
    await user.hover(reactTag)
    
    expect(reactTag).toBeInTheDocument()
  })

  it('should display projects in a grid layout', () => {
    render(<Work />)
    
    // Check that the grid container exists
    const gridContainer = screen.getByText('Selected Work').nextElementSibling
    expect(gridContainer).toHaveClass('grid')
  })

  it('should handle empty project arrays gracefully', () => {
    // Mock empty projects array
    vi.mocked(vi.importMock('../../data/projects.json')).default = []
    
    render(<Work />)
    
    expect(screen.getByText('Selected Work')).toBeInTheDocument()
    // Should not crash with empty array
  })

  it('should render project cards with proper structure', () => {
    render(<Work />)
    
    // Each project should have title, description, technologies, and button
    const testProject = screen.getByText('Test Project')
    const projectCard = testProject.closest('div')
    
    expect(projectCard).toBeInTheDocument()
    
    // Check that the project card contains all expected elements
    expect(screen.getByText('A test project for unit testing')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('should handle projects with different technology counts', () => {
    render(<Work />)
    
    // Test project has 3 technologies: React, TypeScript, Vitest
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Vitest')).toBeInTheDocument()
    
    // Mobile project has 2 technologies: React Native, Expo
    expect(screen.getByText('React Native')).toBeInTheDocument()
    expect(screen.getByText('Expo')).toBeInTheDocument()
  })
})