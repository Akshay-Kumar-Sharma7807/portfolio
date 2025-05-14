import { motion } from "framer-motion";
import sapro from "../assets/saplings-protector.png";
import todo from "../assets/todo.png";
import game from "../assets/game.png";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const projects: Project[] = [
  // {
  //   title: "Digital Experience Platform",
  //   description: "A cutting-edge web platform built with React and Three.js",
  //   image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  //   tags: ["React", "Three.js", "TypeScript"]
  // },
  // {
  //   title: "E-commerce Solution",
  //   description: "Modern e-commerce platform with real-time inventory",
  //   image: "https://images.unsplash.com/photo-1532910404247-7ee9488d7292?q=80&w=2426&auto=format&fit=crop",
  //   tags: ["Next.js", "Stripe", "Tailwind"]
  // },
  {
    title: "Saplings Protector",
    description:
      "A Progressive Web App (PWA) to protect trees and promote green spaces",
    image: sapro,
    tags: ["PWA", "React", "Leaflet"],
  },
  {
    title: "Modern Todo App",
    description:
      "A feature-rich todo application with dark mode and priority based task management",
    image: todo,
    tags: ["React", "Redux", "Styled-components"],
  },
  {
    title: "Geolocation Attendance Tracking App",
    description:
      "A mobile application for tracking attendance using geolocation data",
    image:
      "https://images.unsplash.com/photo-1480694313141-fce5e697ee25?q=80&w=2426&auto=format&fit=crop",
    tags: ["React Native", "Geolocation", "Firebase"],
  },
  {
    title: "Game App",
    description: "An immersive and engaging mobile game application",
    image: game,
    tags: ["React", "HTML", "CSS"],
  },
];

export function Work() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen pt-20 px-8 max-w-6xl mx-auto"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-bold mb-12"
      >
        Selected Work
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
