/**
 * Utility functions for link validation and handling
 */

/**
 * Validates if a URL is properly formatted
 * @param url - The URL to validate
 * @returns boolean indicating if the URL is valid
 */
export const isValidUrl = (url: string | null | undefined): boolean => {
  if (!url || url.trim() === '') return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Checks if a URL is external (not relative or same origin)
 * @param url - The URL to check
 * @returns boolean indicating if the URL is external
 */
export const isExternalUrl = (url: string): boolean => {
  if (!isValidUrl(url)) return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.origin !== window.location.origin;
  } catch {
    return false;
  }
};

/**
 * Gets the appropriate target and rel attributes for a link
 * @param url - The URL to get attributes for
 * @returns object with target and rel attributes
 */
export const getLinkAttributes = (url: string) => {
  if (isExternalUrl(url)) {
    return {
      target: '_blank',
      rel: 'noopener noreferrer'
    };
  }
  
  return {};
};