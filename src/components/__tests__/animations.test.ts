import { prefersReducedMotion, getAnimationDuration, getHoverAnimation } from '../../utils/animations';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

describe('Animation utilities', () => {
    beforeEach(() => {
        // Reset matchMedia mock
        (window.matchMedia as jest.Mock).mockClear();
    });

    test('prefersReducedMotion returns false when user does not prefer reduced motion', () => {
        (window.matchMedia as jest.Mock).mockReturnValue({
            matches: false,
        });

        expect(prefersReducedMotion()).toBe(false);
    });

    test('prefersReducedMotion returns true when user prefers reduced motion', () => {
        (window.matchMedia as jest.Mock).mockReturnValue({
            matches: true,
        });

        expect(prefersReducedMotion()).toBe(true);
    });

    test('getAnimationDuration returns reduced duration when reduced motion is preferred', () => {
        (window.matchMedia as jest.Mock).mockReturnValue({
            matches: true,
        });

        expect(getAnimationDuration(1.0)).toBe(0.1);
    });

    test('getAnimationDuration returns normal duration when reduced motion is not preferred', () => {
        (window.matchMedia as jest.Mock).mockReturnValue({
            matches: false,
        });

        expect(getAnimationDuration(1.0)).toBe(1.0);
    });

    test('getHoverAnimation returns empty object when reduced motion is preferred', () => {
        (window.matchMedia as jest.Mock).mockReturnValue({
            matches: true,
        });

        const normalAnimation = { scale: 1.1, y: -2 };
        expect(getHoverAnimation(normalAnimation)).toEqual({});
    });

    test('getHoverAnimation returns normal animation when reduced motion is not preferred', () => {
        (window.matchMedia as jest.Mock).mockReturnValue({
            matches: false,
        });

        const normalAnimation = { scale: 1.1, y: -2 };
        expect(getHoverAnimation(normalAnimation)).toEqual(normalAnimation);
    });
});