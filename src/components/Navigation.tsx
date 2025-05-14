import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const links = [
  { path: "/work", label: "Work" },
  // { path: "/music", label: "Music" },
  { path: "/certificates", label: "Certificates" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" }, // Added contact
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 w-32">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ul className="space-y-4">
          {links.map((link) => (
            <motion.li
              key={link.path}
              whileHover={{ x: 10 }}
              className="relative"
            >
              <Link
                to={link.path}
                className={`text-xl ${
                  location.pathname === link.path
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                } transition-colors`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full"
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
}
