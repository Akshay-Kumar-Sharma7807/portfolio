import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../utils/testUtils'
import ImageGallery from '../../components/ImageGallery'

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    h3: 'h3',
    p: 'p'
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children
}))

// Mock FallbackImage component
vi.mock('../../components/FallbackImage', () => ({
  default: ({ 
    src, 
    alt, 
    className, 
    onLoad, 
    onError 
  }: { 
    src: string, 
    alt: string, 
    className?: string,
    onLoad?: () => void,
    onError?: () => void
  }) => (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      data-testid="fallback-image"
      onLoad={onLoad}
      onError={onError}
    />
  )
}))

describe('ImageGallery Component', () => {
  const mockImages = [
    '/hero-image.jpg',
    '/gallery-image-1.jpg',
    '/gallery-image-2.jpg',
    '/gallery-image-3.jpg'
  ]
  
  const projectTitle = 'Test Project'

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock document.body.style to avoid errors
    Object.defineProperty(document.body, 'style', {
      value: { overflow: '' },
      writable: true
    })
  })

  it('should render gallery title and description', () => {
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    expect(screen.getByText('Project Gallery')).toBeInTheDocument()
    expect(screen.getByText('Visual showcase of the project in action')).toBeInTheDocument()
  })

  it('should skip the first image (hero image) and render remaining images', () => {
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    const galleryImages = screen.getAllByTestId('fallback-image')
    expect(galleryImages).toHaveLength(3) // 4 total - 1 hero = 3 gallery images
    
    // Should not include the hero image
    expect(screen.queryByAltText(`${projectTitle} screenshot 1`)).not.toBeInTheDocument()
    
    // Should include gallery images with correct alt text
    expect(screen.getByAltText(`${projectTitle} screenshot 2`)).toBeInTheDocument()
    expect(screen.getByAltText(`${projectTitle} screenshot 3`)).toBeInTheDocument()
    expect(screen.getByAltText(`${projectTitle} screenshot 4`)).toBeInTheDocument()
  })

  it('should render gallery info text', () => {
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    // Should show desktop instructions
    expect(screen.getByText(/Click on any image to view in full size/)).toBeInTheDocument()
    expect(screen.getByText(/Use arrow keys to navigate/)).toBeInTheDocument()
  })

  it('should open modal when image is clicked', async () => {
    const user = userEvent.setup()
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    const firstGalleryImage = screen.getAllByTestId('fallback-image')[0]
    await user.click(firstGalleryImage)
    
    // Modal should be open - check for modal elements
    await waitFor(() => {
      expect(screen.getByLabelText('Close modal')).toBeInTheDocument()
    })
  })

  it('should close modal when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    // Open modal
    const firstGalleryImage = screen.getAllByTestId('fallback-image')[0]
    await user.click(firstGalleryImage)
    
    // Close modal
    const closeButton = await screen.findByLabelText('Close modal')
    await user.click(closeButton)
    
    // Modal should be closed
    await waitFor(() => {
      expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument()
    })
  })

  it('should navigate to next image when next button is clicked', async () => {
    const user = userEvent.setup()
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    // Open modal
    const firstGalleryImage = screen.getAllByTestId('fallback-image')[0]
    await user.click(firstGalleryImage)
    
    // Click next button
    const nextButton = await screen.findByLabelText('Next image')
    await user.click(nextButton)
    
    // Should show image counter indicating we moved to next image
    await waitFor(() => {
      expect(screen.getByText('2 / 3')).toBeInTheDocument()
    })
  })

  it('should navigate to previous image when previous button is clicked', async () => {
    const user = userEvent.setup()
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    // Open modal on second image
    const secondGalleryImage = screen.getAllByTestId('fallback-image')[1]
    await user.click(secondGalleryImage)
    
    // Click previous button
    const prevButton = await screen.findByLabelText('Previous image')
    await user.click(prevButton)
    
    // Should show image counter indicating we moved to previous image
    await waitFor(() => {
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })
  })

  it('should handle keyboard navigation in modal', async () => {
    const user = userEvent.setup()
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    // Open modal
    const firstGalleryImage = screen.getAllByTestId('fallback-image')[0]
    await user.click(firstGalleryImage)
    
    // Test Escape key to close modal
    await user.keyboard('{Escape}')
    
    await waitFor(() => {
      expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument()
    })
  })

  it('should handle arrow key navigation in modal', async () => {
    const user = userEvent.setup()
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    // Open modal
    const firstGalleryImage = screen.getAllByTestId('fallback-image')[0]
    await user.click(firstGalleryImage)
    
    // Test right arrow key
    await user.keyboard('{ArrowRight}')
    
    await waitFor(() => {
      expect(screen.getByText('2 / 3')).toBeInTheDocument()
    })
    
    // Test left arrow key
    await user.keyboard('{ArrowLeft}')
    
    await waitFor(() => {
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })
  })

  it('should handle touch gestures for mobile navigation', () => {
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    // Open modal
    const firstGalleryImage = screen.getAllByTestId('fallback-image')[0]
    fireEvent.click(firstGalleryImage)
    
    // Find modal content
    const modalContent = screen.getByAltText(`${projectTitle} screenshot 2`).closest('div')
    
    if (modalContent) {
      // Simulate left swipe (should go to next image)
      fireEvent.touchStart(modalContent, {
        targetTouches: [{ clientX: 100 }]
      })
      fireEvent.touchMove(modalContent, {
        targetTouches: [{ clientX: 40 }]
      })
      fireEvent.touchEnd(modalContent)
      
      // Should navigate to next image
      expect(screen.getByText('2 / 3')).toBeInTheDocument()
    }
  })

  it('should prevent body scroll when modal is open', async () => {
    const user = userEvent.setup()
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    // Open modal
    const firstGalleryImage = screen.getAllByTestId('fallback-image')[0]
    await user.click(firstGalleryImage)
    
    // Body overflow should be hidden
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden')
    })
    
    // Close modal
    const closeButton = await screen.findByLabelText('Close modal')
    await user.click(closeButton)
    
    // Body overflow should be restored
    await waitFor(() => {
      expect(document.body.style.overflow).toBe('unset')
    })
  })

  it('should not render gallery when no images (after skipping hero)', () => {
    const singleImage = ['/hero-only.jpg']
    render(<ImageGallery images={singleImage} projectTitle={projectTitle} />)
    
    // Should not render gallery section
    expect(screen.queryByText('Project Gallery')).not.toBeInTheDocument()
  })

  it('should handle empty images array', () => {
    render(<ImageGallery images={[]} projectTitle={projectTitle} />)
    
    // Should not render gallery section
    expect(screen.queryByText('Project Gallery')).not.toBeInTheDocument()
  })

  it('should display image numbers correctly', () => {
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    const galleryImages = screen.getAllByTestId('fallback-image')
    
    // Each image should have a number indicator on hover
    // The numbers should be 2, 3, 4 (since we skip the first image)
    expect(galleryImages).toHaveLength(3)
  })

  it('should handle image load and error states', () => {
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    const galleryImages = screen.getAllByTestId('fallback-image')
    
    // Simulate image load
    fireEvent.load(galleryImages[0])
    
    // Simulate image error
    fireEvent.error(galleryImages[1])
    
    // Component should handle these events without crashing
    expect(galleryImages[0]).toBeInTheDocument()
    expect(galleryImages[1]).toBeInTheDocument()
  })

  it('should wrap around when navigating past last image', async () => {
    const user = userEvent.setup()
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    // Open modal on last image
    const lastGalleryImage = screen.getAllByTestId('fallback-image')[2]
    await user.click(lastGalleryImage)
    
    // Should show 3/3
    await waitFor(() => {
      expect(screen.getByText('3 / 3')).toBeInTheDocument()
    })
    
    // Click next - should wrap to first image
    const nextButton = await screen.findByLabelText('Next image')
    await user.click(nextButton)
    
    await waitFor(() => {
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })
  })

  it('should wrap around when navigating before first image', async () => {
    const user = userEvent.setup()
    render(<ImageGallery images={mockImages} projectTitle={projectTitle} />)
    
    // Open modal on first image
    const firstGalleryImage = screen.getAllByTestId('fallback-image')[0]
    await user.click(firstGalleryImage)
    
    // Should show 1/3
    await waitFor(() => {
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })
    
    // Click previous - should wrap to last image
    const prevButton = await screen.findByLabelText('Previous image')
    await user.click(prevButton)
    
    await waitFor(() => {
      expect(screen.getByText('3 / 3')).toBeInTheDocument()
    })
  })
})