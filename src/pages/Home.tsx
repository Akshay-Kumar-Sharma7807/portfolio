import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex items-center"
    >
      <div className="fixed left-0 top-0 h-full w-1">
        <div className="h-full w-full bg-gradient-to-b from-orange-500 via-purple-500 to-blue-500" />
      </div>

      <div className="w-full max-w-6xl mx-auto pl-8 pr-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[12rem] font-bold leading-none tracking-tighter"
        >
          Hello!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 max-w-2xl"
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            I'm a student and a full stack developer, currently honing my skills
            and building projects. I'm always building something new.{" "}
            <a
              href="https://saplings-protector.netlify.app/home"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-orange-500 transition-colors underline decoration-orange-500/30 underline-offset-4"
            >
              Sapro
            </a>
            , is my latest project.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <Link
              to="/work"
              className="inline-flex items-center text-white hover:text-orange-500 transition-colors group"
            >
              View Work{" "}
              <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
