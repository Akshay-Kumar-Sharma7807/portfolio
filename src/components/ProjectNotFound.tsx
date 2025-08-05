import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Home } from "lucide-react";

interface ProjectNotFoundProps {
  projectId?: string;
}

const ProjectNotFound = ({ projectId }: ProjectNotFoundProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen"
    >
      {/* Navigation */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-20 left-0 right-0 z-50 bg-[#1a1a1a] bg-opacity-95 backdrop-blur-sm border-b border-gray-800"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 md:py-4">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => navigate('/work')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Back to Work</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* 404 Content */}
      <div className="pt-32 px-8 max-w-6xl mx-auto flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl">
          {/* 404 Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-32 h-32 bg-orange-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Search size={64} className="text-orange-400" />
          </motion.div>

          {/* Error Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
          >
            Project Not Found
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 mb-2"
          >
            {projectId ? (
              <>The project "<span className="text-orange-400 font-medium">{projectId}</span>" doesn't exist.</>
            ) : (
              "The project you're looking for doesn't exist."
            )}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 mb-12 leading-relaxed"
          >
            It might have been moved, deleted, or you may have mistyped the URL. 
            Let's get you back to exploring my work.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/work"
              className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-200 group font-medium"
            >
              <ArrowLeft size={20} className="mr-3 group-hover:-translate-x-1 transition-transform duration-200" />
              View All Projects
            </Link>

            <Link 
              to="/"
              className="inline-flex items-center px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              <Home size={20} className="mr-3" />
              Go Home
            </Link>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 p-6 bg-gray-900 bg-opacity-50 rounded-xl border border-gray-800"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Looking for something specific?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Browse all my projects in the Work section</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Learn more about me in the About section</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Check out my skills and experience</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Get in touch through the Contact page</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectNotFound;