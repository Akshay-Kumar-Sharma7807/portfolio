import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../utils/testUtils'
import CallToAction from '../../components/CallToAction'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    a: 'a',
    span: 'span',
    svg: 'svg'
  }
}))

// Mock link validation utilities
vi.mock('../../utils/linkValidation', () => ({
  isValidUrl: vi.fn((url) => {
    if (!url) return false
    return url.startsWith('http://') || url.startsWith('https://')
  }),
  getLinkAttributes: vi.fn((url) => {
    if (url && (url.includes('github.com') || url.includes('external'))) {
      return {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    }
    return {}
  })
}))

describe('CallToAction Component', () => {
  it('should render both live site and GitHub links when both are valid', () => {
    render(
      <CallToAction 
        liveUrl="https://example.com" 
        githubUrl="https://github.com/user/repo" 
      />
    )
    
    expect(screen.getByText('View Live Site')).toBeInTheDocument()
    expect(screen.getByText('View Source Code')).toBeInTheDocument()
    
    const liveLink = screen.getByRole('link', { name: /View Live Site/ })
    const githubLink = screen.getByRole('link', { name: /View Source Code/ })
    
    expect(liveLink).toHaveAttribute('href', 'https://example.com')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/user/repo')
  })

  it('should render only live site link when GitHub URL is invalid', () => {
    render(
      <CallToAction 
        liveUrl="https://example.com" 
        githubUrl="invalid-url" 
      />
    )
    
    expect(screen.getByText('View Live Site')).toBeInTheDocument()
    expect(screen.queryByText('View Source Code')).not.toBeInTheDocument()
  })

  it('should render only GitHub link when live URL is invalid', () => {
    render(
      <CallToAction 
        liveUrl="invalid-url" 
        githubUrl="https://github.com/user/repo" 
      />
    )
    
    expect(screen.queryByText('View Live Site')).not.toBeInTheDocument()
    expect(screen.getByText('View Source Code')).toBeInTheDocument()
  })

  it('should render "Links not available" message when both URLs are invalid', () => {
    render(
      <CallToAction 
        liveUrl="invalid-url" 
        githubUrl="also-invalid" 
      />
    )
    
    expect(screen.getByText('Links not available')).toBeInTheDocument()
    expect(screen.queryByText('View Live Site')).not.toBeInTheDocument()
    expect(screen.queryByText('View Source Code')).not.toBeInTheDocument()
  })

  it('should render "Links not available" message when both URLs are null', () => {
    render(
      <CallToAction 
        liveUrl={null} 
        githubUrl={null} 
      />
    )
    
    expect(screen.getByText('Links not available')).toBeInTheDocument()
  })

  it('should render "Links not available" message when both URLs are undefined', () => {
    render(
      <CallToAction 
        liveUrl={undefined} 
        githubUrl={undefined} 
      />
    )
    
    expect(screen.getByText('Links not available')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <CallToAction 
        liveUrl="https://example.com" 
        githubUrl="https://github.com/user/repo"
        className="custom-class"
      />
    )
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('should handle external link attributes correctly', () => {
    render(
      <CallToAction 
        liveUrl="https://external-site.com" 
        githubUrl="https://github.com/user/repo" 
      />
    )
    
    const liveLink = screen.getByRole('link', { name: /View Live Site/ })
    const githubLink = screen.getByRole('link', { name: /View Source Code/ })
    
    // GitHub links should have external attributes
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    
    // External live site should also have external attributes
    expect(liveLink).toHaveAttribute('target', '_blank')
    expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should handle hover interactions', async () => {
    const user = userEvent.setup()
    render(
      <CallToAction 
        liveUrl="https://example.com" 
        githubUrl="https://github.com/user/repo" 
      />
    )
    
    const liveLink = screen.getByRole('link', { name: /View Live Site/ })
    const githubLink = screen.getByRole('link', { name: /View Source Code/ })
    
    // Hover interactions should not throw errors
    await user.hover(liveLink)
    await user.hover(githubLink)
    
    expect(liveLink).toBeInTheDocument()
    expect(githubLink).toBeInTheDocument()
  })

  it('should handle click interactions', async () => {
    const user = userEvent.setup()
    render(
      <CallToAction 
        liveUrl="https://example.com" 
        githubUrl="https://github.com/user/repo" 
      />
    )
    
    const liveLink = screen.getByRole('link', { name: /View Live Site/ })
    const githubLink = screen.getByRole('link', { name: /View Source Code/ })
    
    // Click interactions should not throw errors
    await user.click(liveLink)
    await user.click(githubLink)
    
    expect(liveLink).toBeInTheDocument()
    expect(githubLink).toBeInTheDocument()
  })

  it('should render with default delay when not specified', () => {
    render(
      <CallToAction 
        liveUrl="https://example.com" 
        githubUrl="https://github.com/user/repo" 
      />
    )
    
    expect(screen.getByText('View Live Site')).toBeInTheDocument()
    expect(screen.getByText('View Source Code')).toBeInTheDocument()
  })

  it('should render with custom delay', () => {
    render(
      <CallToAction 
        liveUrl="https://example.com" 
        githubUrl="https://github.com/user/repo"
        delay={1.5}
      />
    )
    
    expect(screen.getByText('View Live Site')).toBeInTheDocument()
    expect(screen.getByText('View Source Code')).toBeInTheDocument()
  })

  it('should render SVG icons for both buttons', () => {
    render(
      <CallToAction 
        liveUrl="https://example.com" 
        githubUrl="https://github.com/user/repo" 
      />
    )
    
    const svgElements = screen.getAllByRole('img', { hidden: true })
    expect(svgElements.length).toBeGreaterThanOrEqual(2) // At least one for each button
  })

  it('should handle empty string URLs as invalid', () => {
    render(
      <CallToAction 
        liveUrl="" 
        githubUrl="" 
      />
    )
    
    expect(screen.getByText('Links not available')).toBeInTheDocument()
  })

  it('should handle whitespace-only URLs as invalid', () => {
    render(
      <CallToAction 
        liveUrl="   " 
        githubUrl="   " 
      />
    )
    
    expect(screen.getByText('Links not available')).toBeInTheDocument()
  })

  it('should render proper button styling classes', () => {
    render(
      <CallToAction 
        liveUrl="https://example.com" 
        githubUrl="https://github.com/user/repo" 
      />
    )
    
    const liveLink = screen.getByRole('link', { name: /View Live Site/ })
    const githubLink = screen.getByRole('link', { name: /View Source Code/ })
    
    // Check for key styling classes
    expect(liveLink).toHaveClass('bg-orange-500')
    expect(githubLink).toHaveClass('bg-gray-800')
  })

  it('should render accessibility attributes', () => {
    render(
      <CallToAction 
        liveUrl="https://example.com" 
        githubUrl="https://github.com/user/repo" 
      />
    )
    
    // Check for aria-label attributes on SVG icons
    const externalLinkIcon = screen.getByLabelText('External link')
    const githubIcon = screen.getByLabelText('GitHub repository')
    
    expect(externalLinkIcon).toBeInTheDocument()
    expect(githubIcon).toBeInTheDocument()
  })
})