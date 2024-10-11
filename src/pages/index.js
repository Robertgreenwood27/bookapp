import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home({ chapters }) {
  const [shadowOffset, setShadowOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      setShadowOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Layout>
      <Navigation chapters={chapters} />
      <div className="flex flex-col items-center text-center py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0"></div>
        <h1 
          className="text-6xl font-bold mb-8 text-white relative z-10 tracking-wider"
          style={{
            textShadow: `${shadowOffset.x}px ${shadowOffset.y}px 8px rgba(0, 0, 0, 0.5)`,
            transition: 'text-shadow 0.1s ease-out'
          }}
        >
          CHIRP
        </h1>
        <div className="relative w-full max-w-lg aspect-[3/4] mb-8 z-10">
          <Image
            src="/images/arris1.jpg"
            alt="Chirp Cover"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-2xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
        </div>
        
        <Link 
          href={`/${chapters[0]}`} 
          className="relative z-10 bg-transparent border-2 border-red-700 text-red-500 hover:bg-red-700 hover:text-white font-bold py-3 px-6 rounded-full transition-all duration-300 text-lg mt-4 group overflow-hidden"
        >
          <span className="relative z-10">Read</span>
          <div className="absolute inset-0 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Fetch chapters logic here
  const chapters = ['chapter-1', 'chapter-2', 'chapter-3']; // Replace with actual chapter fetching logic
  return {
    props: {
      chapters,
    },
  };
}