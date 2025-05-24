import { Github, Linkedin, Mail } from 'lucide-react';

interface SocialLinksProps {
  isMobile: boolean;
}

export function SocialLinks({ isMobile }: SocialLinksProps) {
  const positionClass = isMobile 
    ? "fixed bottom-4 left-0 w-full flex justify-center z-50" 
    : "fixed bottom-8 left-8 z-50";
    
  return (
    <div className={positionClass}>
      <div className="flex items-center space-x-6 text-gray-400 backdrop-blur-sm bg-transparent rounded-2xl p-2">
        <a
          href="mailto:sharmaakshaykumar7807@gmail.com"
          className="hover:text-white transition-colors"
          aria-label="Email"
        >
          <Mail size={isMobile ? 18 : 20} />
        </a>
        <a
          href="https://www.linkedin.com/in/akshay-kumar-sharma-618976257/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin size={isMobile ? 18 : 20} />
        </a>
        <a
          href="https://github.com/Akshay-Kumar-Sharma7807"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <Github size={isMobile ? 18 : 20} />
        </a>
      </div>
    </div>
  );
}