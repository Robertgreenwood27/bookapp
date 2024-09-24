import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ChapterLayout = ({ pages, images, title, prevChapter, nextChapter }) => {
  const contentRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sections = contentRef.current.querySelectorAll('.chapter-section');
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          if (images[index]) {
            document.body.style.backgroundImage = `url(${images[index]})`;
          } else {
            document.body.style.backgroundImage = 'none';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [images]);

  if (!isClient) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="py-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{title}</h1>
      </header>

      <main ref={contentRef} className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {pages.map((content, index) => (
          <section key={index} className="chapter-section mb-12">
            {images[index] && (
              <div className="relative w-full h-64 sm:h-96 mb-6">
                <Image
                  src={images[index]}
                  alt={`Image for section ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
            )}
            <div 
              className="prose prose-invert prose-sm sm:prose-base lg:prose-lg mx-auto"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </section>
        ))}
      </main>

      <footer className="py-4 flex justify-between items-center max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {prevChapter ? (
          <Link href={`/${prevChapter}`} className="flex items-center hover:underline">
            <ChevronLeft size={20} />
            <span className="ml-1">Previous Chapter</span>
          </Link>
        ) : <div />}
        
        {nextChapter ? (
          <Link href={`/${nextChapter}`} className="flex items-center hover:underline">
            <span className="mr-1">Next Chapter</span>
            <ChevronRight size={20} />
          </Link>
        ) : <div />}
      </footer>
    </div>
  );
};

export default ChapterLayout;