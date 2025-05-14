import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppRoutes } from './AppRoutes';
import { Navigation } from './components/Navigation';
import { ParticleBackground } from './components/ParticleBackground';
import { SocialLinks } from './components/SocialLinks';
import { Header } from './components/Header';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#1a1a1a] text-white relative overflow-hidden">
        <ParticleBackground />
        <Header />
        <div className="flex">
          <Navigation />
          <main className="flex-1 ml-48">
            <AnimatePresence mode="wait">
              <AppRoutes />
            </AnimatePresence>
          </main>
        </div>
        <SocialLinks />
      </div>
    </BrowserRouter>
  );
}