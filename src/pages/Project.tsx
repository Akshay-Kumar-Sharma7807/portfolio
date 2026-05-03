import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import projects from "../data/projects.json";
import { ProjectData } from "../types/project";
import { getProjectById } from "../utils/projectUtils";
import ImageGallery from "../components/ImageGallery";
import CallToAction from "../components/CallToAction";
import ErrorBoundary from "../components/ErrorBoundary";
import ProjectNotFound from "../components/ProjectNotFound";
import ProjectLoading from "../components/ProjectLoading";
import PageTransition from "../components/PageTransition";

interface ProjectProps {
  projectId: string;
}

const Project = ({ projectId }: ProjectProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const projectsData = projects as ProjectData[];
  const project = getProjectById(projectsData, projectId);

  // Simulate loading time for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Show loading state
  if (isLoading) {
    return <ProjectLoading />;
  }

  // Show 404 if project not found
  if (!project) {
    return <ProjectNotFound projectId={projectId} />;
  }



  return (
    <ErrorBoundary>
      <PageTransition className="relative min-h-screen bg-transparent">
        {/* Hero Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-36 md:pt-40 bg-transparent"
        >
          {/* Hero Image with transparent overlay */}
          {/* <div className="absolute inset-0 z-0">
            <FallbackImage
              src={project.heroImage}
              alt={`${project.title} hero image`}
              className="w-full h-full object-cover opacity-20"
              fallbackIcon="hero"
              loading="eager"
              showLoadingState={true}
            /> */}
          {/* Subtle overlay to maintain readability */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
          </div> */}

          {/* Hero Content */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto"
          >
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 text-white leading-tight tracking-tight"
            >
              {project.title}
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto font-light"
            >
              {project.description}
            </motion.p>

            {/* Project Metadata */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-300"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <span className="font-semibold">Category:</span>
                <span className="px-2 sm:px-3 py-1 bg-gray-800/80 rounded-lg text-gray-300 text-xs sm:text-sm border border-gray-700/50">
                  {project.category}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2">
                <span className="font-semibold">Technologies:</span>
                <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                  {project.technologiesUsed.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-gray-800/80 rounded-lg text-gray-300 text-xs sm:text-sm border border-gray-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologiesUsed.length > 3 && (
                    <span className="px-2 sm:px-3 py-1 bg-gray-800/80 rounded-lg text-gray-300 text-xs sm:text-sm border border-gray-700/50">
                      +{project.technologiesUsed.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Call to Action Buttons */}
            <CallToAction
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              className="mt-6 sm:mt-8"
              delay={1.1}
            />
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white text-center"
            >
              <div className="text-sm mb-2">Scroll to explore</div>
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Project Information and Description Sections */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 bg-gray-900/20 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-12 sm:py-16 max-w-6xl mx-auto rounded-t-3xl border-t border-orange-500/30"
        >
          {/* Project Description Section */}
          {project.longDescription && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-16"
            >
              <div className="border-l-4 border-orange-500 pl-4 sm:pl-6 mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">About This Project</h2>
                <p className="text-orange-400 text-sm sm:text-base md:text-lg">Detailed project overview and objectives</p>
              </div>
              <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-gray-700/50">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light">
                  {project.longDescription}
                </p>
              </div>
            </motion.div>
          )}

          {/* Technologies Used Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mb-16"
          >
            <div className="border-l-4 border-orange-500 pl-4 sm:pl-6 mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Technologies Used</h3>
              <p className="text-orange-400 text-sm sm:text-base md:text-lg">Tools and frameworks that powered this project</p>
            </div>
            <motion.div
              className="flex flex-wrap gap-2 sm:gap-3"
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
              {project.technologiesUsed.map((tech, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { scale: 0, opacity: 0, y: 20 },
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
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-800/80 backdrop-blur-sm rounded-lg text-gray-300 text-sm font-medium border border-gray-700/50 hover:border-gray-600 hover:bg-gray-700/80 transition-all duration-300 cursor-pointer"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Key Features Section */}
          {project.features.length > 0 && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="mb-16"
            >
              <div className="border-l-4 border-orange-500 pl-4 sm:pl-6 mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Key Features</h3>
                <p className="text-orange-400 text-sm sm:text-base md:text-lg">Core functionality and capabilities</p>
              </div>
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { x: -20, opacity: 0 },
                      show: {
                        x: 0,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 80,
                          damping: 20
                        }
                      }
                    }}
                    whileHover={{
                      x: 5,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-700/50 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group touch-manipulation cursor-pointer"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-orange-500/20 rounded-full flex items-center justify-center mt-1 group-hover:bg-orange-500/30 transition-colors duration-300">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">{feature}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Challenges & Solutions Section */}
          {project.challenges && project.challenges.length > 0 && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="mb-16"
            >
              <div className="border-l-4 border-orange-500 pl-4 sm:pl-6 mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Challenges & Solutions</h3>
                <p className="text-orange-400 text-sm sm:text-base md:text-lg">Problem-solving approach and technical hurdles overcome</p>
              </div>
              <motion.div
                className="space-y-4 sm:space-y-6"
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
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                {project.challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { x: -20, opacity: 0 },
                      show: {
                        x: 0,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 80,
                          damping: 20
                        }
                      }
                    }}
                    whileHover={{
                      x: 5,
                      scale: 1.01,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-700/50 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group touch-manipulation cursor-pointer"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-orange-500/20 rounded-full flex items-center justify-center mt-1 group-hover:bg-orange-500/30 transition-colors duration-300">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">{challenge}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Enhanced Image Gallery Component */}
          <ImageGallery images={project.images} projectTitle={project.title} />

          {/* Dedicated Call-to-Action Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-orange-500/30"
          >
            <div className="mb-6 sm:mb-8">
              <div className="border-l-4 border-orange-500 pl-4 sm:pl-6 mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Explore This Project</h3>
                <p className="text-orange-400 text-sm sm:text-base md:text-lg">Check out the live demo or view the source code</p>
              </div>
            </div>

            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-700/50 shadow-2xl">
              <div className="mb-4 sm:mb-6">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">Ready to see {project.title} in action?</h4>
                <p className="text-gray-300 text-sm sm:text-base">
                  Experience the project firsthand or dive into the code to see how it was built.
                </p>
              </div>

              <CallToAction
                liveUrl={project.liveUrl}
                githubUrl={project.githubUrl}
                delay={1.9}
              />

              {/* Additional project info */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700/50">
                <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>{project.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <span>{project.technologiesUsed.length} Technologies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{project.features.length} Key Features</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </PageTransition>
    </ErrorBoundary>
  );
};

export default Project;
