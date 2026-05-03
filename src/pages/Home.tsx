import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15
      }
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex items-center pt-20 md:pt-0"
    >
      <div className="fixed left-0 top-0 h-full w-1">
        <div className="h-full w-full bg-gradient-to-b from-orange-500 via-purple-500 to-blue-500" />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 md:pl-8 md:pr-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* Availability Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
              Available for new projects
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold leading-none tracking-tighter"
          >
            Hello.
          </motion.h1>

          <motion.div variants={itemVariants} className="mt-6 md:mt-10">
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
              I'm Akshay, a student and a full stack developer crafting digital experiences.
              Currently honing my skills and always building something new.{" "}
              Learning AI/ML to become a 10x Engineer.
              {/* <a
                href="https://saplings-protector.netlify.app/home"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-orange-500 transition-colors underline decoration-orange-500/30 underline-offset-4 font-medium"
              >
                Saplings Protector
              </a>{" "}
              is my latest project. */}
            </p>

            <motion.div variants={itemVariants} className="mt-10 md:mt-12 flex gap-4">
              <Link
                to="/work"
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all group overflow-hidden relative shadow-lg hover:shadow-orange-500/25"
              >
                <span className="relative z-10 flex items-center">
                  View Selected Work{" "}
                  <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform w-5 h-5" />
                </span>
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-transparent text-white border border-gray-700 rounded-lg font-medium hover:border-gray-500 hover:bg-gray-800 transition-all"
              >
                About Me
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
