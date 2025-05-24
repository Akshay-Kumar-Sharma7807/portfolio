import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppRoutes } from './AppRoutes';
import { Navigation } from './components/Navigation';
import { ParticleBackground } from './components/ParticleBackground';
import { SocialLinks } from './components/SocialLinks';
import { Header } from './components/Header';
import { useState, useEffect } from 'react';

export function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#1a1a1a] text-white relative overflow-hidden">
        <ParticleBackground />
        <Header isMobile={isMobile} toggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isMenuOpen={isMobileMenuOpen} />
        <div className="flex flex-col md:flex-row">
          <Navigation isMobile={isMobile} isMenuOpen={isMobileMenuOpen} closeMenu={() => setIsMobileMenuOpen(false)} />
          <main className="flex-1 md:ml-48 px-4 md:px-0">
            <AnimatePresence mode="wait">
              <AppRoutes />
            </AnimatePresence>
          </main>
        </div>
        <SocialLinks isMobile={isMobile} />
      </div>
    </BrowserRouter>
  );
}