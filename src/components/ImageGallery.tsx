import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import FallbackImage from "./FallbackImage";

interface ImageGalleryProps {
  images: string[];
  projectTitle: string;
}

interface ImageModalProps {
  image: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalImages: number;
}

const ImageModal = ({
  image,
  alt,
  isOpen,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalImages
}: ImageModalProps) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  // Handle touch gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && totalImages > 1) {
      onNext();
    }
    if (isRightSwipe && totalImages > 1) {
      onPrev();
    }
  };

  // Prevent body scroll when modal is open while preserving scroll position
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;

      // Prevent scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      // Store scroll position for restoration
      document.body.setAttribute('data-scroll-y', scrollY.toString());
    } else {
      // Restore scroll position
      const scrollY = document.body.getAttribute('data-scroll-y');

      // Reset body styles
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        document.body.removeAttribute('data-scroll-y');
      }
    }

    return () => {
      // Cleanup on unmount
      const scrollY = document.body.getAttribute('data-scroll-y');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        document.body.removeAttribute('data-scroll-y');
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10000,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '50%',
            padding: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation buttons */}
        {totalImages > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10000,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '50%',
                padding: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10000,
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '50%',
                padding: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
              aria-label="Next image"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image counter */}
        {totalImages > 1 && (
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10000,
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '14px'
            }}
          >
            {currentIndex + 1} / {totalImages}
          </div>
        )}

        {/* Modal content */}
        <div
          style={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            margin: '16px'
          }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <FallbackImage
            src={image}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            fallbackIcon="gallery"
            loading="eager"
            showLoadingState={true}
          />
        </div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

const ImageGallery = ({ images, projectTitle }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Include all images in the gallery
  const galleryImages = images;

  const openModal = useCallback((index: number) => {
    console.log('Opening modal for image index:', index);
    setSelectedImageIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const nextImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  }, [selectedImageIndex, galleryImages.length]);

  const prevImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? galleryImages.length - 1 : selectedImageIndex - 1
      );
    }
  }, [selectedImageIndex, galleryImages.length]);

  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mb-16"
      >
        <div className="border-l-4 border-orange-500 pl-6 mb-8">
          <h3 className="text-3xl font-bold mb-2 text-white">Project Gallery</h3>
          <p className="text-orange-400 text-lg">Visual showcase of the project in action</p>
        </div>

        {/* Responsive Grid Layout */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {galleryImages.map((image, index) => (
            <motion.button
              key={index}
              type="button"
              variants={{
                hidden: { scale: 0.8, opacity: 0, y: 20 },
                show: {
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }
                }
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-800 touch-manipulation shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full border-none p-0"
              style={{
                aspectRatio: '16/9',
                display: 'block',
                lineHeight: 0,
                fontSize: 0
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Image clicked, opening modal for index:', index);
                openModal(index);
              }}
            >
              <img
                src={image}
                alt={`${projectTitle} screenshot ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                loading="lazy"
                style={{
                  display: 'block',
                  margin: 0,
                  padding: 0,
                  border: 'none',
                  verticalAlign: 'top'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -90 }}
                  whileHover={{
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }
                  }}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full p-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </motion.div>
              </div>

              {/* Image number indicator */}
              <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-black bg-opacity-50 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-opacity duration-300">
                {index + 1}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="mt-4 sm:mt-6 text-center text-gray-400 text-xs sm:text-sm"
        >
          <span className="hidden sm:inline">Click on any image to view in full size • Use arrow keys to navigate</span>
          <span className="sm:hidden">Tap any image to view in full size • Swipe to navigate</span>
        </motion.div>
      </motion.div>

      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <ImageModal
          image={galleryImages[selectedImageIndex]}
          alt={`${projectTitle} screenshot ${selectedImageIndex + 1}`}
          isOpen={selectedImageIndex !== null}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
          currentIndex={selectedImageIndex}
          totalImages={galleryImages.length}
        />
      )}
    </>
  );
};

export default ImageGallery;