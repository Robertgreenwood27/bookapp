import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, BookOpen } from 'lucide-react';

const Navigation = ({ chapters }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 p-3 bg-zinc-800 text-zinc-100 rounded-full shadow-lg hover:bg-zinc-700 transition-colors duration-200"
        aria-label="Toggle menu"
      >
        <Menu size={28} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300">
          <div className="fixed inset-y-0 right-0 w-full sm:w-80 bg-zinc-900 text-zinc-100 p-6 overflow-y-auto shadow-lg transform transition-transform duration-300 ease-in-out">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-3 text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <h2 className="text-2xl font-bold mb-8 mt-2 text-zinc-100">Navigation</h2>
            <ul className="space-y-6">
              <li>
                <Link
                  href="/"
                  className="flex items-center text-xl text-zinc-100 hover:text-zinc-300 transition-colors duration-200 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Home size={24} className="mr-4" />
                  Home
                </Link>
              </li>
              <li className="pt-6 border-t border-zinc-700">
                <h3 className="text-xl font-semibold mb-4 text-zinc-300 flex items-center">
                  <BookOpen size={24} className="mr-4" />
                  Chapters
                </h3>
                <ul className="space-y-4 ml-8">
                  {chapters.map((chapter) => (
                    <li key={chapter}>
                      <Link
                        href={`/${chapter}`}
                        className="text-lg text-zinc-400 hover:text-zinc-100 transition-colors duration-200 block py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {chapter.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase())}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;