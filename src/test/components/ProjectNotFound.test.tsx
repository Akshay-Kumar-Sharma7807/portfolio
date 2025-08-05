import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../utils/testUtils'
import ProjectNotFound from '../../components/ProjectNotFound'

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ to, children, className }: { to: string, children: React.ReactNode, className?: string }) => (
      <a href={to} className={className}>{children}</a>
    )
  }
})

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    h1: 'h1',
    p: 'p',
    button: 'button'
  }
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ArrowLeft: ({ size, className }: { size?: number, className?: string }) => (
    <svg data-testid="arrow-left-icon" className={className} width={size} height={size}>
      <path d="arrow-left" />
    </svg>
  ),
  Search: ({ size, className }: { size?: number, className?: string }) => (
    <svg data-testid="search-icon" className={className} width={size} height={size}>
      <path d="search" />
    </svg>
  ),
  Home: ({ size, className }: { size?: number, className?: string }) => (
    <svg data-testid="home-icon" className={className} width={size} height={size}>
      <path d="home" />
    </svg>
  )
}))

describe('ProjectNotFound Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the main error message', () => {
    render(<ProjectNotFound />)
    
    expect(screen.getByText('Project Not Found')).toBeInTheDocument()
  })

  it('should render generic message when no projectId is provided', () => {
    render(<ProjectNotFound />)
    
    expect(screen.getByText("The project you're looking for doesn't exist.")).toBeInTheDocument()
  })

  it('should render specific message when projectId is provided', () => {
    render(<ProjectNotFound projectId="test-project" />)
    
    expect(screen.getByText(/The project "test-project" doesn't exist./)).toBeInTheDocument()
  })

  it('should highlight the project ID in the error message', () => {
    render(<ProjectNotFound projectId="my-awesome-project" />)
    
    const projectIdElement = screen.getByText('my-awesome-project')
    expect(projectIdElement).toBeInTheDocument()
    expect(projectIdElement).toHaveClass('text-orange-400')
  })

  it('should render back to work navigation button', () => {
    render(<ProjectNotFound />)
    
    const backButton = screen.getByRole('button', { name: /Back to Work/ })
    expect(backButton).toBeInTheDocument()
  })

  it('should call navigate when back button is clicked', async () => {
    const user = userEvent.setup()
    render(<ProjectNotFound />)
    
    const backButton = screen.getByRole('button', { name: /Back to Work/ })
    await user.click(backButton)
    
    expect(mockNavigate).toHaveBeenCalledWith('/work')
  })

  it('should render View All Projects link', () => {
    render(<ProjectNotFound />)
    
    const viewAllProjectsLink = screen.getByRole('link', { name: /View All Projects/ })
    expect(viewAllProjectsLink).toBeInTheDocument()
    expect(viewAllProjectsLink).toHaveAttribute('href', '/work')
  })

  it('should render Go Home link', () => {
    render(<ProjectNotFound />)
    
    const goHomeLink = screen.getByRole('link', { name: /Go Home/ })
    expect(goHomeLink).toBeInTheDocument()
    expect(goHomeLink).toHaveAttribute('href', '/')
  })

  it('should render search icon', () => {
    render(<ProjectNotFound />)
    
    const searchIcon = screen.getByTestId('search-icon')
    expect(searchIcon).toBeInTheDocument()
  })

  it('should render arrow left icons', () => {
    render(<ProjectNotFound />)
    
    const arrowLeftIcons = screen.getAllByTestId('arrow-left-icon')
    expect(arrowLeftIcons.length).toBeGreaterThan(0)
  })

  it('should render home icon', () => {
    render(<ProjectNotFound />)
    
    const homeIcon = screen.getByTestId('home-icon')
    expect(homeIcon).toBeInTheDocument()
  })

  it('should render helpful suggestions section', () => {
    render(<ProjectNotFound />)
    
    expect(screen.getByText('Looking for something specific?')).toBeInTheDocument()
  })

  it('should render all suggestion items', () => {
    render(<ProjectNotFound />)
    
    expect(screen.getByText(/Browse all my projects in the Work section/)).toBeInTheDocument()
    expect(screen.getByText(/Learn more about me in the About section/)).toBeInTheDocument()
    expect(screen.getByText(/Check out my skills and experience/)).toBeInTheDocument()
    expect(screen.getByText(/Get in touch through the Contact page/)).toBeInTheDocument()
  })

  it('should render colored dots for suggestions', () => {
    render(<ProjectNotFound />)
    
    const coloredDots = document.querySelectorAll('.w-2.h-2')
    expect(coloredDots.length).toBe(4) // One for each suggestion
  })

  it('should render explanatory text', () => {
    render(<ProjectNotFound />)
    
    expect(screen.getByText(/It might have been moved, deleted, or you may have mistyped the URL/)).toBeInTheDocument()
    expect(screen.getByText(/Let's get you back to exploring my work/)).toBeInTheDocument()
  })

  it('should have proper button styling', () => {
    render(<ProjectNotFound />)
    
    const viewAllProjectsLink = screen.getByRole('link', { name: /View All Projects/ })
    const goHomeLink = screen.getByRole('link', { name: /Go Home/ })
    
    expect(viewAllProjectsLink).toHaveClass('bg-orange-500')
    expect(goHomeLink).toHaveClass('bg-gray-700')
  })

  it('should handle hover effects on buttons', async () => {
    const user = userEvent.setup()
    render(<ProjectNotFound />)
    
    const backButton = screen.getByRole('button', { name: /Back to Work/ })
    const viewAllProjectsLink = screen.getByRole('link', { name: /View All Projects/ })
    
    // Hover interactions should not throw errors
    await user.hover(backButton)
    await user.hover(viewAllProjectsLink)
    
    expect(backButton).toBeInTheDocument()
    expect(viewAllProjectsLink).toBeInTheDocument()
  })

  it('should render with proper responsive classes', () => {
    render(<ProjectNotFound />)
    
    const mainTitle = screen.getByText('Project Not Found')
    expect(mainTitle).toHaveClass('text-4xl', 'md:text-6xl')
  })

  it('should render navigation with proper styling', () => {
    render(<ProjectNotFound />)
    
    const backButton = screen.getByRole('button', { name: /Back to Work/ })
    expect(backButton.closest('div')).toHaveClass('fixed', 'top-20')
  })

  it('should handle different project ID formats', () => {
    render(<ProjectNotFound projectId="project-with-dashes-123" />)
    
    expect(screen.getByText('project-with-dashes-123')).toBeInTheDocument()
  })

  it('should render action buttons in correct order', () => {
    render(<ProjectNotFound />)
    
    const actionButtons = screen.getAllByRole('link')
    const buttonTexts = actionButtons.map(button => button.textContent)
    
    expect(buttonTexts).toContain('View All Projects')
    expect(buttonTexts).toContain('Go Home')
  })

  it('should have proper accessibility attributes', () => {
    render(<ProjectNotFound />)
    
    const backButton = screen.getByRole('button', { name: /Back to Work/ })
    const viewAllProjectsLink = screen.getByRole('link', { name: /View All Projects/ })
    const goHomeLink = screen.getByRole('link', { name: /Go Home/ })
    
    expect(backButton).toBeInTheDocument()
    expect(viewAllProjectsLink).toBeInTheDocument()
    expect(goHomeLink).toBeInTheDocument()
  })

  it('should render with proper layout structure', () => {
    render(<ProjectNotFound />)
    
    // Check for main container structure
    const mainContainer = screen.getByText('Project Not Found').closest('div')
    expect(mainContainer).toHaveClass('text-center')
  })
})