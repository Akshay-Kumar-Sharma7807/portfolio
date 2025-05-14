import { motion } from "framer-motion";

export function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen pt-20 px-8 max-w-3xl mx-auto"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-bold mb-8"
      >
        About Me
      </motion.h1>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6 text-lg text-gray-300"
      >
        <p>
          I'm a Creative Developer with over 4 years of experience in building
          digital experiences that combine technical excellence with stunning
          design.
        </p>
        <p>
          My work focuses on creating immersive web applications that push the
          boundaries of what's possible in the browser, while maintaining
          performance and accessibility.
        </p>
        <p>
          When I'm not coding, you can find me editing photos, writing, or
          composing some art in my home.
        </p>
        <div className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Python",
              "JavaScript",
              "Node.js",
              "Django",
              "React",
              "React Native",
              "Tailwind CSS",
              "TypeScript",
              "Firebase",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gray-800 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
