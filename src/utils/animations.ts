// Animation utilities for performance and accessibility

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get animation duration based on user preference
export const getAnimationDuration = (normalDuration: number) => {
  return prefersReducedMotion() ? 0.1 : normalDuration;
};

// Get spring config based on user preference
export const getSpringConfig = (normalConfig: any) => {
  if (prefersReducedMotion()) {
    return {
      type: "tween",
      duration: 0.1
    };
  }
  return normalConfig;
};

// Common animation variants that respect reduced motion
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: prefersReducedMotion() ? 0 : 20 
  },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: getAnimationDuration(0.6),
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.1,
      delayChildren: prefersReducedMotion() ? 0 : 0.1
    }
  }
};

export const scaleIn = {
  hidden: { 
    scale: prefersReducedMotion() ? 1 : 0.8, 
    opacity: 0 
  },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: getSpringConfig({
      type: "spring",
      stiffness: 100,
      damping: 15
    })
  }
};

// Hover animations that respect reduced motion
export const getHoverAnimation = (normalAnimation: any) => {
  if (prefersReducedMotion()) {
    return {};
  }
  return normalAnimation;
};