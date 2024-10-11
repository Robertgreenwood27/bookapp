import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, BookOpen, Eye } from 'lucide-react';

const Navigation = ({ chapters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isOpen]);

  return (
    <nav className="relative z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 p-3 bg-black text-red-600 rounded-full shadow-lg hover:bg-red-900 hover:text-white transition-all duration-300"
        aria-label="Toggle menu"
      >
        <Menu size={28} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 transition-opacity duration-300">
          <div 
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-gradient-to-br from-zinc-900 to-black text-red-500 p-6 overflow-y-auto shadow-lg transform transition-all duration-300 ease-in-out"
            style={{
              boxShadow: `-10px 0 15px rgba(255, 0, 0, 0.1)`,
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-3 text-red-600 hover:text-white transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <h2 className="text-3xl font-bold mb-8 mt-2 text-red-600">CLICK</h2>
            <ul className="space-y-6">
              <li>
                <Link
                  href="/"
                  className="flex items-center text-xl text-red-500 hover:text-white transition-colors duration-200 py-2 group"
                  onClick={() => setIsOpen(false)}
                >
                  <Home size={24} className="mr-4 group-hover:animate-pulse" />
                  HOME
                </Link>
              </li>
              <li className="pt-6 border-t border-red-900">
                <h3 className="text-xl font-semibold mb-4 text-red-600 flex items-center">
                  <BookOpen size={24} className="mr-4" />
                  CHAPTERS
                </h3>
                <ul className="space-y-4 ml-8">
                  {chapters.map((chapter) => (
                    <li key={chapter} className="relative">
                      <Link
                        href={`/${chapter}`}
                        className="text-lg text-red-400 hover:text-white transition-colors duration-200 block py-2 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="relative z-10">
                          {chapter.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase())}
                        </span>
                        <Eye 
                          size={16} 
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
          <div 
            className="fixed inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, transparent, rgba(0,0,0,0.7) 100%)`,
            }}
          />
        </div>
      )}
    </nav>
  );
};

export default Navigation;