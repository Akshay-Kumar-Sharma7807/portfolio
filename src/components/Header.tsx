import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="fixed top-8 left-8 z-50">
      <Link to="/" className="text-2xl font-bold tracking-tighter hover:text-orange-500 transition-colors">
        Akshay Kumar Sharma
        <span className="block text-sm font-normal text-gray-400 mt-1">
          Creative Developer
        </span>
      </Link>
    </header>
  );
}