import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Home } from "lucide-react";
import { ProjectData } from "../types/project";
import { useEffect } from "react";

interface ProjectNavigationProps {
  currentProject: ProjectData;
  allProjects: ProjectData[];
}

const ProjectNavigation = ({ currentProject, allProjects }: ProjectNavigationProps) => {
  const navigate = useNavigate();
  
  // Find current project index
  const currentIndex = allProjects.findIndex(project => project.id === currentProject.id);
  
  // Get previous and next projects
  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const handleBackClick = () => {
    navigate('/work');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle keyboard navigation if no input is focused
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          if (previousProject) {
            event.preventDefault();
            navigate(`/project/${previousProject.id}`);
          }
          break;
        case 'ArrowRight':
          if (nextProject) {
            event.preventDefault();
            navigate(`/project/${nextProject.id}`);
          }
          break;
        case 'Escape':
          event.preventDefault();
          navigate('/work');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, previousProject, nextProject]);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-16 sm:top-20 left-0 right-0 z-50 bg-[#1a1a1a] bg-opacity-95 backdrop-blur-sm border-b border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4">
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            {/* Back button */}
            <motion.button
              onClick={handleBackClick}
              whileHover={{ 
                scale: 1.05,
                x: -3
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
            >
              <motion.div
                whileHover={{ x: -2 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowLeft size={18} />
              </motion.div>
              <span className="text-sm font-medium">Back</span>
            </motion.button>

            {/* Project counter */}
            <div className="px-2 py-1 bg-gray-900 rounded text-xs text-gray-500">
              {currentIndex + 1} of {allProjects.length}
            </div>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center space-x-1 text-xs mb-2">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors">
              <Home size={14} />
            </Link>
            <ChevronRight size={12} className="text-gray-600" />
            <Link to="/work" className="text-gray-400 hover:text-white transition-colors">
              Work
            </Link>
            <ChevronRight size={12} className="text-gray-600" />
            <span className="text-white font-medium truncate">
              {currentProject.title}
            </span>
          </nav>

          {/* Project navigation */}
          <div className="flex items-center justify-between">
            {previousProject ? (
              <Link to={`/project/${previousProject.id}`} className="flex-1 mr-2">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 touch-manipulation min-h-[44px]"
                >
                  <ChevronLeft size={14} className="text-gray-400" />
                  <div className="text-left flex-1">
                    <div className="text-xs text-gray-500">Previous</div>
                    <div className="text-sm text-gray-300 truncate">
                      {previousProject.title}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ) : (
              <div className="flex-1 mr-2"></div>
            )}

            {nextProject ? (
              <Link to={`/project/${nextProject.id}`} className="flex-1 ml-2">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 touch-manipulation min-h-[44px]"
                >
                  <div className="text-right flex-1">
                    <div className="text-xs text-gray-500">Next</div>
                    <div className="text-sm text-gray-300 truncate">
                      {nextProject.title}
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-400" />
                </motion.div>
              </Link>
            ) : (
              <div className="flex-1 ml-2"></div>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left side - Back button and breadcrumb */}
          <div className="flex items-center space-x-4">
            {/* Back to Work button */}
            <motion.button
              onClick={handleBackClick}
              whileHover={{ 
                scale: 1.05,
                x: -3
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
            >
              <motion.div
                whileHover={{ x: -3 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowLeft size={20} />
              </motion.div>
              <span className="text-sm font-medium">Back to Work</span>
            </motion.button>

            {/* Breadcrumb separator */}
            <div className="text-gray-600">/</div>

            {/* Breadcrumb navigation */}
            <nav className="flex items-center space-x-2 text-sm">
              <Link 
                to="/" 
                className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-1"
              >
                <Home size={16} />
                <span>Home</span>
              </Link>
              
              <ChevronRight size={16} className="text-gray-600" />
              
              <Link 
                to="/work" 
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Work
              </Link>
              
              <ChevronRight size={16} className="text-gray-600" />
              
              <span className="text-white font-medium truncate max-w-xs">
                {currentProject.title}
              </span>
            </nav>
          </div>

          {/* Right side - Project navigation */}
          <div className="flex items-center space-x-2">
            {/* Previous project */}
            {previousProject ? (
              <Link to={`/project/${previousProject.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 group touch-manipulation min-h-[44px]"
                >
                  <ChevronLeft size={16} className="text-gray-400 group-hover:text-white" />
                  <div className="text-left">
                    <div className="text-xs text-gray-500">Previous</div>
                    <div className="text-sm text-gray-300 group-hover:text-white truncate max-w-24">
                      {previousProject.title}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ) : (
              <div className="w-20"></div>
            )}

            {/* Project counter */}
            <div className="px-3 py-2 bg-gray-900 rounded-lg">
              <div className="text-xs text-gray-500 text-center">
                {currentIndex + 1} of {allProjects.length}
              </div>
            </div>

            {/* Next project */}
            {nextProject ? (
              <Link to={`/project/${nextProject.id}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 group touch-manipulation min-h-[44px]"
                >
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Next</div>
                    <div className="text-sm text-gray-300 group-hover:text-white truncate max-w-24">
                      {nextProject.title}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-white" />
                </motion.div>
              </Link>
            ) : (
              <div className="w-20"></div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectNavigation;