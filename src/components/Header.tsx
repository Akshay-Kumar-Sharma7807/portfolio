import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  isMobile: boolean;
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

export function Header({ isMobile, toggleMenu, isMenuOpen }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full p-4 md:p-0 md:top-8 md:left-8 z-50 flex justify-between items-center md:block bg-black/30 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
      <Link to="/" className="text-xl md:text-2xl font-bold tracking-tighter hover:text-orange-500 transition-colors">
        Akshay Kumar Sharma
        <span className="block text-xs md:text-sm font-normal text-gray-400 mt-1">
          Creative Developer
        </span>
      </Link>
      {isMobile && (
        <button 
          onClick={toggleMenu} 
          className="text-white focus:outline-none"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}
    </header>
  );
}