import { describe, it, expect, beforeEach, vi } from 'vitest'
import { isValidUrl, isExternalUrl, getLinkAttributes } from '../../utils/linkValidation'

// Mock window.location
const mockLocation = {
  origin: 'https://example.com'
}

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true
})

describe('linkValidation', () => {
  describe('isValidUrl', () => {
    it('should return true for valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true)
      expect(isValidUrl('http://example.com')).toBe(true)
      expect(isValidUrl('https://example.com/path')).toBe(true)
      expect(isValidUrl('https://example.com/path?query=value')).toBe(true)
      expect(isValidUrl('https://subdomain.example.com')).toBe(true)
    })

    it('should return false for invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false)
      expect(isValidUrl('http://')).toBe(false)
      expect(isValidUrl('://example.com')).toBe(false)
      expect(isValidUrl('example.com')).toBe(false)
    })

    it('should return false for null, undefined, or empty strings', () => {
      expect(isValidUrl(null)).toBe(false)
      expect(isValidUrl(undefined)).toBe(false)
      expect(isValidUrl('')).toBe(false)
      expect(isValidUrl('   ')).toBe(false)
    })
  })

  describe('isExternalUrl', () => {
    beforeEach(() => {
      // Reset window.location.origin for each test
      Object.defineProperty(window, 'location', {
        value: { origin: 'https://example.com' },
        writable: true
      })
    })

    it('should return true for external URLs', () => {
      expect(isExternalUrl('https://external.com')).toBe(true)
      expect(isExternalUrl('https://another-domain.com')).toBe(true)
      expect(isExternalUrl('http://different-protocol.com')).toBe(true)
    })

    it('should return false for same-origin URLs', () => {
      expect(isExternalUrl('https://example.com')).toBe(false)
      expect(isExternalUrl('https://example.com/path')).toBe(false)
      expect(isExternalUrl('https://example.com/path?query=value')).toBe(false)
    })

    it('should return false for invalid URLs', () => {
      expect(isExternalUrl('not-a-url')).toBe(false)
      expect(isExternalUrl('')).toBe(false)
    })

    it('should handle different subdomains as external', () => {
      expect(isExternalUrl('https://subdomain.example.com')).toBe(true)
    })
  })

  describe('getLinkAttributes', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: { origin: 'https://example.com' },
        writable: true
      })
    })

    it('should return target and rel attributes for external URLs', () => {
      const result = getLinkAttributes('https://external.com')
      expect(result).toEqual({
        target: '_blank',
        rel: 'noopener noreferrer'
      })
    })

    it('should return empty object for same-origin URLs', () => {
      const result = getLinkAttributes('https://example.com/path')
      expect(result).toEqual({})
    })

    it('should return empty object for invalid URLs', () => {
      const result = getLinkAttributes('not-a-url')
      expect(result).toEqual({})
    })

    it('should handle GitHub URLs as external', () => {
      const result = getLinkAttributes('https://github.com/user/repo')
      expect(result).toEqual({
        target: '_blank',
        rel: 'noopener noreferrer'
      })
    })

    it('should handle Netlify URLs as external', () => {
      const result = getLinkAttributes('https://app.netlify.com')
      expect(result).toEqual({
        target: '_blank',
        rel: 'noopener noreferrer'
      })
    })
  })
})