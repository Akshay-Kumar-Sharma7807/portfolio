import { motion } from "framer-motion";

const ProjectLoading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen bg-[#1a1a1a]"
    >

      {/* Hero Section Skeleton */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Hero Image Skeleton */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-gray-400 text-center"
            >
              <div className="w-16 h-16 border-4 border-gray-600 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-lg font-medium">Loading Project...</div>
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>

        {/* Hero Content Skeleton */}
        <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
          {/* Title Skeleton */}
          <div className="mb-6">
            <div className="h-16 md:h-20 bg-gray-700 rounded-lg animate-pulse mx-auto max-w-2xl mb-4"></div>
            <div className="h-8 bg-gray-700 rounded-lg animate-pulse mx-auto max-w-lg"></div>
          </div>

          {/* Description Skeleton */}
          <div className="mb-8 space-y-3">
            <div className="h-6 bg-gray-700 rounded animate-pulse mx-auto max-w-3xl"></div>
            <div className="h-6 bg-gray-700 rounded animate-pulse mx-auto max-w-2xl"></div>
          </div>

          {/* Metadata Skeleton */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-20 h-8 bg-gray-700 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-16 h-8 bg-gray-700 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="w-40 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="w-40 h-12 bg-gray-700 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Scroll Indicator Skeleton */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="text-center">
            <div className="w-20 h-4 bg-gray-700 rounded animate-pulse mx-auto mb-2"></div>
            <div className="w-6 h-6 bg-gray-700 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Content Sections Skeleton */}
      <section className="relative z-10 bg-[#1a1a1a] px-8 py-16 max-w-6xl mx-auto">
        {/* About Section Skeleton */}
        <div className="mb-16">
          <div className="border-l-4 border-gray-700 pl-6 mb-8">
            <div className="h-10 bg-gray-700 rounded animate-pulse max-w-xs mb-2"></div>
            <div className="h-6 bg-gray-700 rounded animate-pulse max-w-md"></div>
          </div>
          <div className="bg-gray-900 bg-opacity-50 rounded-xl p-8 border border-gray-800">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 bg-gray-700 rounded animate-pulse"></div>
              ))}
              <div className="h-5 bg-gray-700 rounded animate-pulse max-w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Technologies Section Skeleton */}
        <div className="mb-16">
          <div className="border-l-4 border-gray-700 pl-6 mb-8">
            <div className="h-8 bg-gray-700 rounded animate-pulse max-w-xs mb-2"></div>
            <div className="h-5 bg-gray-700 rounded animate-pulse max-w-md"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="text-center">
                  <div className="w-8 h-8 bg-gray-700 rounded-full mx-auto mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section Skeleton */}
        <div className="mb-16">
          <div className="border-l-4 border-gray-700 pl-6 mb-8">
            <div className="h-8 bg-gray-700 rounded animate-pulse max-w-xs mb-2"></div>
            <div className="h-5 bg-gray-700 rounded animate-pulse max-w-md"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded animate-pulse max-w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Section Skeleton */}
        <div className="mb-16">
          <div className="border-l-4 border-gray-700 pl-6 mb-8">
            <div className="h-8 bg-gray-700 rounded animate-pulse max-w-xs mb-2"></div>
            <div className="h-5 bg-gray-700 rounded animate-pulse max-w-md"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-video bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectLoading;