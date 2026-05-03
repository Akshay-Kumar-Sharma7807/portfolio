import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const links = [
  { path: "/work", label: "Work" },
  { path: "/certificates", label: "Certificates" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
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
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-[#111111]/90 z-40 pt-20 px-6 flex flex-col items-center justify-center border-l border-white/5 shadow-2xl"
          >
            <ul className="space-y-8 text-center w-full">
              {links.map((link) => (
                <motion.li
                  key={link.path}
                  whileTap={{ scale: 0.95 }}
                  className="text-center"
                >
                  <Link
                    to={link.path}
                    className={`text-3xl font-medium tracking-wide inline-block py-2 ${location.pathname === link.path ? "text-orange-400" : "text-gray-400"} transition-colors`}
                    onClick={closeMenu}
                  >
                    {link.label}
                    {location.pathname === link.path && (
                      <motion.div
                        layoutId="active-nav-mobile"
                        className="w-full h-1 mt-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
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
    <nav className="fixed left-8 xl:left-12 top-1/2 -translate-y-1/2 z-50 w-32 hidden md:block">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      >
        <ul className="space-y-6">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.li
                key={link.path}
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
              >
                <Link
                  to={link.path}
                  className={`text-lg font-medium tracking-wide flex items-center gap-3 transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500 hover:text-white"}`}
                >
                  {/* Subtle hover indicator line */}
                  <div className={`h-px transition-all duration-300 ${isActive ? "w-6 bg-orange-500" : "w-0 bg-gray-500 group-hover:w-4"}`}></div>

                  <span>{link.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.6)]"
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </nav>
  );
}
