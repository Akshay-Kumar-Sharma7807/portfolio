import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ProjectData } from "../types/project";
import projectsData from "../data/projects.json";
import ErrorBoundary from "../components/ErrorBoundary";
import FallbackImage from "../components/FallbackImage";
import PageTransition from "../components/PageTransition";

const projects: ProjectData[] = projectsData as ProjectData[];

export function Work() {
  return (
    <ErrorBoundary>
      <PageTransition className="relative min-h-screen pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Selected Work<span className="text-orange-500">.</span>
          </h1>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-12 sm:mb-16"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { y: 40, opacity: 0 },
                show: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 80,
                    damping: 20
                  }
                }
              }}
              whileHover={{
                y: -10,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              className="group flex flex-col h-full bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-orange-500/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/10 transition-all duration-500"
            >
              <motion.div
                className="relative overflow-hidden bg-gray-800"
              >
                <FallbackImage
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full sm:h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  fallbackIcon="project"
                  loading="lazy"
                  showLoadingState={true}
                />
                {/* Overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Floating View Details Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Link to={`/project/${project.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-full font-medium shadow-[0_0_30px_rgba(249,115,22,0.4)]"
                    >
                      Explore Project
                    </motion.div>
                  </Link>
                </div>
              </motion.div>

              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl sm:text-3xl font-bold group-hover:text-orange-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  {project.category && (
                    <span className="px-3 py-1 bg-gray-800/80 rounded-full text-xs font-medium text-gray-400 border border-gray-700">
                      {project.category}
                    </span>
                  )}
                </div>

                <p className="text-gray-400 text-base sm:text-lg mb-6 leading-relaxed flex-grow font-light line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologiesUsed.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-gray-800/60 rounded-lg text-xs sm:text-sm font-medium text-gray-300 border border-gray-700/50 group-hover:border-gray-600 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </PageTransition>
    </ErrorBoundary>
  );
}
