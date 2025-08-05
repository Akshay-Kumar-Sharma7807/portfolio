import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { render } from '../utils/testUtils'
import FallbackImage from '../../components/FallbackImage'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div'
  }
}))

describe('FallbackImage Component', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
    className: 'test-class'
  }

  it('should render image with correct attributes', () => {
    render(<FallbackImage {...defaultProps} />)
    
    const image = screen.getByAltText('Test image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
    expect(image).toHaveClass('test-class')
  })

  it('should show loading state initially when showLoadingState is true', () => {
    render(<FallbackImage {...defaultProps} showLoadingState={true} />)
    
    // Should show loading spinner
    const loadingSpinner = document.querySelector('.animate-pulse')
    expect(loadingSpinner).toBeInTheDocument()
  })

  it('should not show loading state when showLoadingState is false', () => {
    render(<FallbackImage {...defaultProps} showLoadingState={false} />)
    
    // Should not show loading spinner
    const loadingSpinner = document.querySelector('.animate-pulse')
    expect(loadingSpinner).not.toBeInTheDocument()
  })

  it('should call onLoad callback when image loads successfully', () => {
    const onLoad = vi.fn()
    render(<FallbackImage {...defaultProps} onLoad={onLoad} />)
    
    const image = screen.getByAltText('Test image')
    fireEvent.load(image)
    
    expect(onLoad).toHaveBeenCalledTimes(1)
  })

  it('should call onError callback when image fails to load', () => {
    const onError = vi.fn()
    render(<FallbackImage {...defaultProps} onError={onError} />)
    
    const image = screen.getByAltText('Test image')
    fireEvent.error(image)
    
    expect(onError).toHaveBeenCalledTimes(1)
  })

  it('should show fallback content when image fails to load', async () => {
    render(<FallbackImage {...defaultProps} fallbackIcon="project" />)
    
    const image = screen.getByAltText('Test image')
    fireEvent.error(image)
    
    await waitFor(() => {
      expect(screen.getByText('Project Image')).toBeInTheDocument()
    })
  })

  it('should render correct fallback content for project icon', async () => {
    render(<FallbackImage {...defaultProps} fallbackIcon="project" />)
    
    const image = screen.getByAltText('Test image')
    fireEvent.error(image)
    
    await waitFor(() => {
      expect(screen.getByText('Project Image')).toBeInTheDocument()
    })
  })

  it('should render correct fallback content for gallery icon', async () => {
    render(<FallbackImage {...defaultProps} fallbackIcon="gallery" />)
    
    const image = screen.getByAltText('Test image')
    fireEvent.error(image)
    
    await waitFor(() => {
      expect(screen.getByText('Image unavailable')).toBeInTheDocument()
    })
  })

  it('should render correct fallback content for hero icon', async () => {
    render(<FallbackImage {...defaultProps} fallbackIcon="hero" />)
    
    const image = screen.getByAltText('Test image')
    fireEvent.error(image)
    
    await waitFor(() => {
      expect(screen.getByText('Project Preview')).toBeInTheDocument()
      expect(screen.getByText('Preview not available')).toBeInTheDocument()
    })
  })

  it('should use lazy loading by default', () => {
    render(<FallbackImage {...defaultProps} />)
    
    const image = screen.getByAltText('Test image')
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('should use eager loading when specified', () => {
    render(<FallbackImage {...defaultProps} loading="eager" />)
    
    const image = screen.getByAltText('Test image')
    expect(image).toHaveAttribute('loading', 'eager')
  })

  it('should show image with full opacity when loaded', async () => {
    render(<FallbackImage {...defaultProps} />)
    
    const image = screen.getByAltText('Test image')
    fireEvent.load(image)
    
    await waitFor(() => {
      expect(image).toHaveClass('opacity-100')
    })
  })

  it('should hide image when in loading or error state', () => {
    render(<FallbackImage {...defaultProps} />)
    
    const image = screen.getByAltText('Test image')
    expect(image).toHaveClass('opacity-0')
  })

  it('should handle missing onLoad and onError callbacks gracefully', () => {
    render(<FallbackImage {...defaultProps} />)
    
    const image = screen.getByAltText('Test image')
    
    // Should not throw errors when callbacks are not provided
    expect(() => {
      fireEvent.load(image)
      fireEvent.error(image)
    }).not.toThrow()
  })

  it('should apply correct positioning styles based on image state', async () => {
    render(<FallbackImage {...defaultProps} />)
    
    const image = screen.getByAltText('Test image')
    
    // Initially should have absolute positioning
    expect(image.style.position).toBe('absolute')
    
    // After loading, should have static positioning
    fireEvent.load(image)
    
    await waitFor(() => {
      expect(image.style.position).toBe('static')
    })
  })

  it('should render SVG icons in fallback content', async () => {
    render(<FallbackImage {...defaultProps} fallbackIcon="project" />)
    
    const image = screen.getByAltText('Test image')
    fireEvent.error(image)
    
    await waitFor(() => {
      const svgIcon = document.querySelector('svg')
      expect(svgIcon).toBeInTheDocument()
    })
  })

  it('should handle different fallback icon sizes correctly', async () => {
    render(<FallbackImage {...defaultProps} fallbackIcon="hero" />)
    
    const image = screen.getByAltText('Test image')
    fireEvent.error(image)
    
    await waitFor(() => {
      const svgIcon = document.querySelector('svg')
      expect(svgIcon).toHaveClass('w-16', 'h-16') // Hero icons are larger
    })
  })

  it('should apply gradient background to fallback content', async () => {
    render(<FallbackImage {...defaultProps} fallbackIcon="project" />)
    
    const image = screen.getByAltText('Test image')
    fireEvent.error(image)
    
    await waitFor(() => {
      const fallbackContainer = screen.getByText('Project Image').closest('div')
      expect(fallbackContainer).toHaveClass('bg-gradient-to-br', 'from-gray-800', 'to-gray-900')
    })
  })

  it('should handle className prop correctly', () => {
    const customClass = 'custom-image-class'
    render(<FallbackImage {...defaultProps} className={customClass} />)
    
    const image = screen.getByAltText('Test image')
    expect(image).toHaveClass(customClass)
  })

  it('should handle empty className prop', () => {
    render(<FallbackImage {...defaultProps} className="" />)
    
    const image = screen.getByAltText('Test image')
    expect(image).toBeInTheDocument()
  })

  it('should handle undefined className prop', () => {
    const { className, ...propsWithoutClassName } = defaultProps
    render(<FallbackImage {...propsWithoutClassName} />)
    
    const image = screen.getByAltText('Test image')
    expect(image).toBeInTheDocument()
  })

  it('should maintain aspect ratio in fallback content', async () => {
    render(<FallbackImage {...defaultProps} fallbackIcon="gallery" />)
    
    const image = screen.getByAltText('Test image')
    fireEvent.error(image)
    
    await waitFor(() => {
      const fallbackContainer = screen.getByText('Image unavailable').closest('div')
      expect(fallbackContainer).toHaveClass('h-full')
    })
  })

  it('should handle rapid state changes correctly', async () => {
    render(<FallbackImage {...defaultProps} />)
    
    const image = screen.getByAltText('Test image')
    
    // Rapidly trigger load and error
    fireEvent.load(image)
    fireEvent.error(image)
    fireEvent.load(image)
    
    // Should handle state changes without crashing
    expect(image).toBeInTheDocument()
  })
})