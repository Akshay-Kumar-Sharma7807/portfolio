/**
 * Touch interaction utilities for mobile optimization
 */

export interface TouchGesture {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  deltaX: number;
  deltaY: number;
  duration: number;
}

/**
 * Detect swipe gestures
 */
export const detectSwipe = (
  startTouch: Touch,
  endTouch: Touch,
  startTime: number,
  endTime: number
): {
  direction: 'left' | 'right' | 'up' | 'down' | null;
  distance: number;
  velocity: number;
} => {
  const deltaX = endTouch.clientX - startTouch.clientX;
  const deltaY = endTouch.clientY - startTouch.clientY;
  const duration = endTime - startTime;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const velocity = distance / duration;

  // Minimum swipe distance and velocity thresholds
  const minDistance = 50;
  const minVelocity = 0.3;

  if (distance < minDistance || velocity < minVelocity) {
    return { direction: null, distance, velocity };
  }

  // Determine primary direction
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);

  if (absDeltaX > absDeltaY) {
    // Horizontal swipe
    return {
      direction: deltaX > 0 ? 'right' : 'left',
      distance,
      velocity
    };
  } else {
    // Vertical swipe
    return {
      direction: deltaY > 0 ? 'down' : 'up',
      distance,
      velocity
    };
  }
};

/**
 * Enhanced touch event handler for better mobile interactions
 */
export class TouchHandler {
  private startTouch: Touch | null = null;
  private startTime: number = 0;
  private element: HTMLElement;
  private callbacks: {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    onTap?: () => void;
    onLongPress?: () => void;
  };

  constructor(
    element: HTMLElement,
    callbacks: {
      onSwipeLeft?: () => void;
      onSwipeRight?: () => void;
      onSwipeUp?: () => void;
      onSwipeDown?: () => void;
      onTap?: () => void;
      onLongPress?: () => void;
    }
  ) {
    this.element = element;
    this.callbacks = callbacks;
    this.attachListeners();
  }

  private attachListeners() {
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
  }

  private handleTouchStart(event: TouchEvent) {
    if (event.touches.length === 1) {
      this.startTouch = event.touches[0];
      this.startTime = Date.now();
    }
  }

  private handleTouchEnd(event: TouchEvent) {
    if (!this.startTouch || event.changedTouches.length !== 1) return;

    const endTouch = event.changedTouches[0];
    const endTime = Date.now();
    const duration = endTime - this.startTime;

    const swipe = detectSwipe(this.startTouch, endTouch, this.startTime, endTime);

    if (swipe.direction) {
      // Handle swipe gestures
      switch (swipe.direction) {
        case 'left':
          this.callbacks.onSwipeLeft?.();
          break;
        case 'right':
          this.callbacks.onSwipeRight?.();
          break;
        case 'up':
          this.callbacks.onSwipeUp?.();
          break;
        case 'down':
          this.callbacks.onSwipeDown?.();
          break;
      }
    } else if (duration < 300 && swipe.distance < 10) {
      // Handle tap
      this.callbacks.onTap?.();
    } else if (duration > 500 && swipe.distance < 10) {
      // Handle long press
      this.callbacks.onLongPress?.();
    }

    this.startTouch = null;
  }

  public destroy() {
    this.element.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.element.removeEventListener('touchend', this.handleTouchEnd.bind(this));
  }
}

/**
 * Prevent default touch behaviors that might interfere with custom gestures
 */
export const preventDefaultTouch = (element: HTMLElement) => {
  element.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
  element.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
};

/**
 * Enable smooth scrolling with momentum on iOS
 */
export const enableMomentumScrolling = (element: HTMLElement) => {
  element.style.webkitOverflowScrolling = 'touch';
  element.style.overflowScrolling = 'touch';
};

/**
 * Optimize button/link touch targets for accessibility
 */
export const optimizeTouchTarget = (element: HTMLElement) => {
  const computedStyle = window.getComputedStyle(element);
  const minSize = 44; // Apple's recommended minimum touch target size

  if (parseInt(computedStyle.height) < minSize) {
    element.style.minHeight = `${minSize}px`;
  }
  if (parseInt(computedStyle.width) < minSize) {
    element.style.minWidth = `${minSize}px`;
  }

  // Add touch-action for better performance
  element.style.touchAction = 'manipulation';
};