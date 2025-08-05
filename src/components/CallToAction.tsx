import { motion } from "framer-motion";
import { isValidUrl, getLinkAttributes } from "../utils/linkValidation";

interface CallToActionProps {
  liveUrl?: string | null;
  githubUrl?: string | null;
  className?: string;
  delay?: number;
}

const CallToAction = ({ liveUrl, githubUrl, className = "", delay = 0 }: CallToActionProps) => {
  const hasValidLiveUrl = isValidUrl(liveUrl);
  const hasValidGithubUrl = isValidUrl(githubUrl);
  
  // Don't render anything if no valid links are available
  if (!hasValidLiveUrl && !hasValidGithubUrl) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay, duration: 0.8 }}
        className={`flex justify-center ${className}`}
      >
        <div className="px-4 sm:px-6 py-3 bg-gray-800 bg-opacity-50 text-gray-400 rounded-lg font-semibold border border-gray-700 min-h-[44px] flex items-center justify-center text-sm sm:text-base">
          <span>Links not available</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      className={`flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 ${className}`}
    >
      {hasValidLiveUrl && (
        <motion.a
          href={liveUrl!}
          {...getLinkAttributes(liveUrl!)}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(249, 115, 22, 0.4)",
            y: -2
          }}
          whileTap={{ scale: 0.95 }}
          className="group px-4 sm:px-6 py-3 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/25 touch-manipulation min-h-[44px] text-sm sm:text-base"
        >
          <motion.span
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            View Live Site
          </motion.span>
          <motion.svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-label="External link"
            whileHover={{ 
              x: 3, 
              y: -3,
              rotate: 15
            }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </motion.svg>
        </motion.a>
      )}
      
      {hasValidGithubUrl && (
        <motion.a
          href={githubUrl!}
          {...getLinkAttributes(githubUrl!)}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(107, 114, 128, 0.4)",
            y: -2
          }}
          whileTap={{ scale: 0.95 }}
          className="group px-4 sm:px-6 py-3 sm:py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-gray-500/25 border border-gray-600 hover:border-gray-500 touch-manipulation min-h-[44px] text-sm sm:text-base"
        >
          <motion.span
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            View Source Code
          </motion.span>
          <motion.svg 
            className="w-4 h-4" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            aria-label="GitHub repository"
            whileHover={{ 
              scale: 1.2,
              rotate: 360
            }}
            transition={{ duration: 0.3 }}
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </motion.svg>
        </motion.a>
      )}
    </motion.div>
  );
};

export default CallToAction;