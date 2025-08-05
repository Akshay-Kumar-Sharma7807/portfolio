/**
 * Image optimization utilities for responsive design
 */

export interface ImageSizes {
  mobile: string;
  tablet: string;
  desktop: string;
}

/**
 * Generate responsive image sizes based on screen width
 */
export const getResponsiveImageSizes = (baseWidth: number): ImageSizes => {
  return {
    mobile: `${Math.min(baseWidth, 640)}w`,
    tablet: `${Math.min(baseWidth, 1024)}w`,
    desktop: `${baseWidth}w`
  };
};

/**
 * Generate srcSet for responsive images
 */
export const generateSrcSet = (imagePath: string, sizes: number[]): string => {
  return sizes
    .map(size => `${imagePath}?w=${size} ${size}w`)
    .join(', ');
};

/**
 * Get optimal image size based on device pixel ratio and viewport
 */
export const getOptimalImageSize = (containerWidth: number): number => {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const optimalWidth = containerWidth * devicePixelRatio;
  
  // Round to nearest common size for better caching
  const commonSizes = [320, 640, 768, 1024, 1280, 1536, 1920];
  return commonSizes.find(size => size >= optimalWidth) || commonSizes[commonSizes.length - 1];
};

/**
 * Check if device supports WebP format
 */
export const supportsWebP = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Preload critical images for better performance
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Get responsive image attributes for img elements
 */
export const getResponsiveImageProps = (
  src: string,
  alt: string,
  sizes: string = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
) => {
  const commonSizes = [320, 640, 768, 1024, 1280, 1536];
  const srcSet = generateSrcSet(src, commonSizes);
  
  return {
    src,
    alt,
    sizes,
    srcSet,
    loading: 'lazy' as const,
    decoding: 'async' as const
  };
};