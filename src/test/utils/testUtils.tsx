import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ProjectData } from '../../types/project'

// Custom render function that includes router
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock project data for testing
export const mockProjectData: ProjectData = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project for unit testing',
  longDescription: 'This is a longer description of the test project that provides more details about its purpose and implementation.',
  heroImage: '/test-hero.jpg',
  images: ['/test-hero.jpg', '/test-image-1.jpg', '/test-image-2.jpg'],
  technologiesUsed: ['React', 'TypeScript', 'Vitest'],
  liveUrl: 'https://test-project.com',
  githubUrl: 'https://github.com/user/test-project',
  features: [
    'Feature 1: Responsive design',
    'Feature 2: Dark mode support',
    'Feature 3: Accessibility compliant'
  ],
  challenges: [
    'Challenge 1: Implementing complex state management',
    'Challenge 2: Optimizing performance for large datasets'
  ],
  category: 'Web Application'
}

export const mockProjectDataMinimal: ProjectData = {
  id: 'minimal-project',
  title: 'Minimal Project',
  description: 'A minimal project with only required fields',
  heroImage: '/minimal-hero.jpg',
  images: ['/minimal-hero.jpg'],
  technologiesUsed: ['React'],
  features: [],
  category: 'Web Application'
}

export const mockProjectDataNoLinks: ProjectData = {
  id: 'no-links-project',
  title: 'No Links Project',
  description: 'A project without live URL or GitHub URL',
  heroImage: '/no-links-hero.jpg',
  images: ['/no-links-hero.jpg'],
  technologiesUsed: ['React'],
  features: ['Basic feature'],
  category: 'Web Application'
}

export const mockProjectsArray: ProjectData[] = [
  mockProjectData,
  mockProjectDataMinimal,
  mockProjectDataNoLinks,
  {
    id: 'mobile-project',
    title: 'Mobile Project',
    description: 'A mobile application project',
    heroImage: '/mobile-hero.jpg',
    images: ['/mobile-hero.jpg', '/mobile-screen-1.jpg'],
    technologiesUsed: ['React Native', 'Expo'],
    liveUrl: 'https://mobile-project.com',
    features: ['Mobile-first design', 'Offline support'],
    category: 'Mobile Application'
  }
]

// Mock framer-motion to avoid animation issues in tests
export const mockFramerMotion = {
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    span: 'span',
    a: 'a',
    button: 'button',
    img: 'img'
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children
}

// Helper function to wait for animations
export const waitForAnimation = () => new Promise(resolve => setTimeout(resolve, 100))