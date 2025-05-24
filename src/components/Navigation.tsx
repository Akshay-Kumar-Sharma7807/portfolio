import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const links = [
  { path: "/work", label: "Work" },
  // { path: "/music", label: "Music" },
  { path: "/certificates", label: "Certificates" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" }, // Added contact
];

interface NavigationProps {
  isMobile: boolean;
  isMenuOpen: boolean;
  closeMenu: () => void;
}

export function Navigation({ isMobile, isMenuOpen, closeMenu }: NavigationProps) {
  const location = useLocation();

  // Mobile menu
  if (isMobile) {
    return (
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#1a1a1a] z-40 pt-20 px-6 flex flex-col items-center"
          >
            <ul className="space-y-6 text-center w-full pt-4">
              {links.map((link) => (
                <motion.li
                  key={link.path}
                  whileTap={{ scale: 0.95 }}
                  className="text-center"
                >
                  <Link
                    to={link.path}
                    className={`text-2xl inline-block py-2 ${location.pathname === link.path ? "text-white" : "text-gray-400"} transition-colors`}
                    onClick={closeMenu}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="active-nav-mobile"
                        className="w-2 h-2 bg-orange-500 rounded-full inline-block ml-2"
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    );
  }

  // Desktop navigation
  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 w-32 hidden md:block">
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
                className={`text-xl ${location.pathname === link.path ? "text-white" : "text-gray-400 hover:text-white"} transition-colors`}
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
