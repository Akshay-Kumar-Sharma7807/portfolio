import { useState } from 'react';
import { motion } from 'framer-motion';

interface FallbackImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackIcon?: 'project' | 'gallery' | 'hero';
    onLoad?: () => void;
    onError?: () => void;
    loading?: 'lazy' | 'eager';
    showLoadingState?: boolean;
}

const FallbackImage = ({
    src,
    alt,
    className = '',
    fallbackIcon = 'project',
    onLoad,
    onError,
    loading = 'lazy',
    showLoadingState = true
}: FallbackImageProps) => {
    const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');

    const handleImageLoad = () => {
        setImageState('loaded');
        onLoad?.();
    };

    const handleImageError = () => {
        setImageState('error');
        onError?.();
    };

    const getFallbackContent = () => {
        const iconMap = {
            project: (
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            gallery: (
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            hero: (
                <svg className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        };

        const textMap = {
            project: 'Project Image',
            gallery: 'Image unavailable',
            hero: 'Project Preview'
        };

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center h-full text-gray-400 bg-gradient-to-br from-gray-800 to-gray-900"
            >
                <motion.div
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {iconMap[fallbackIcon]}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-center px-2 sm:px-4"
                >
                    {textMap[fallbackIcon]}
                </motion.div>
                {fallbackIcon === 'hero' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-1 sm:mt-2 text-xs text-gray-500 text-center px-2 sm:px-4"
                    >
                        Preview not available
                    </motion.div>
                )}
            </motion.div>
        );
    };

    const getLoadingContent = () => (
        <div className="flex items-center justify-center h-full bg-gray-800 animate-pulse">
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-600 border-t-orange-500 rounded-full"
            />
        </div>
    );

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Loading State */}
            {imageState === 'loading' && showLoadingState && getLoadingContent()}

            {/* Error State */}
            {imageState === 'error' && getFallbackContent()}

            {/* Actual Image */}
            <img
                src={src}
                alt={alt}
                className={`${className} ${imageState === 'loaded' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading={loading}
                style={{
                    position: imageState === 'loaded' ? 'static' : 'absolute',
                    top: imageState === 'loaded' ? 'auto' : 0,
                    left: imageState === 'loaded' ? 'auto' : 0,
                    width: imageState === 'loaded' ? 'auto' : '100%',
                    height: imageState === 'loaded' ? 'auto' : '100%'
                }}
            />
        </div>
    );
};

export default FallbackImage;