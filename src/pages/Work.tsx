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
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12"
        >
          Selected Work
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10"
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
                hidden: { y: 30, opacity: 0 },
                show: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }
                }
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="group"
            >
              <motion.div
                className="relative overflow-hidden rounded-lg mb-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <FallbackImage
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                  fallbackIcon="project"
                  loading="lazy"
                  showLoadingState={true}
                />
                {/* Overlay that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              <motion.h3
                className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 group-hover:text-orange-400 transition-colors duration-300"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {project.title}
              </motion.h3>
              <motion.p
                className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2, delay: 0.05 }}
              >
                {project.description}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-2 mb-3 sm:mb-4"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {project.technologiesUsed.map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      show: {
                        scale: 1,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 15
                        }
                      }
                    }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgb(249, 115, 22)",
                      transition: { duration: 0.2 }
                    }}
                    className="px-2 sm:px-3 py-1 bg-gray-800 hover:bg-orange-500 rounded-full text-xs sm:text-sm transition-colors duration-200 cursor-pointer"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
              <Link to={`/project/${project.id}`}>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(249, 115, 22, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-3 sm:px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-300 font-medium text-sm sm:text-base touch-manipulation min-h-[44px] group/button"
                >
                  <span className="group-hover/button:translate-x-1 transition-transform duration-200">
                    View Details
                  </span>
                  <motion.svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </PageTransition>
    </ErrorBoundary>
  );
}
