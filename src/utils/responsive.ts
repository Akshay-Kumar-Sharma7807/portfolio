/**
 * Responsive design utilities and breakpoint management
 */

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Check if current viewport matches a breakpoint
 */
export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints[breakpoint];
};

/**
 * Get current breakpoint
 */
export const getCurrentBreakpoint = (): Breakpoint => {
  if (typeof window === 'undefined') return 'sm';
  
  const width = window.innerWidth;
  
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  return 'sm';
};

/**
 * Check if device is mobile
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < breakpoints.md;
};

/**
 * Check if device is tablet
 */
export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg;
};

/**
 * Check if device is desktop
 */
export const isDesktop = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints.lg;
};

/**
 * Check if device supports touch
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Get optimal grid columns based on screen size
 */
export const getOptimalGridColumns = (
  items: number,
  maxColumns: { sm: number; md: number; lg: number; xl: number } = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4
  }
): number => {
  const currentBreakpoint = getCurrentBreakpoint();
  
  let maxCols: number;
  if (currentBreakpoint === '2xl' || currentBreakpoint === 'xl') {
    maxCols = maxColumns.xl;
  } else if (currentBreakpoint === 'lg') {
    maxCols = maxColumns.lg;
  } else if (currentBreakpoint === 'md') {
    maxCols = maxColumns.md;
  } else {
    maxCols = maxColumns.sm;
  }
  
  return Math.min(items, maxCols);
};

/**
 * Responsive font size calculator
 */
export const getResponsiveFontSize = (
  baseSizes: { sm: string; md: string; lg: string }
): string => {
  const currentBreakpoint = getCurrentBreakpoint();
  
  if (currentBreakpoint === 'sm') return baseSizes.sm;
  if (currentBreakpoint === 'md') return baseSizes.md;
  return baseSizes.lg;
};