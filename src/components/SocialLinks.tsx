import { Github, Linkedin, Mail } from 'lucide-react';

export function SocialLinks() {
  return (
    <div className="fixed bottom-8 left-8 z-50">
      <div className="flex items-center space-x-4 text-gray-400">
        <a
          href="mailto:sharmaakshaykumar7807@gmail.com"
          className="hover:text-white transition-colors"
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/akshay-kumar-sharma-618976257/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="https://github.com/Akshay-Kumar-Sharma7807"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
      </div>
    </div>
  );
}