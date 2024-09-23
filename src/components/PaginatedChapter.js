import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaginatedChapter = ({ pages, images, title, prevChapter, nextChapter }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleNextPage = useCallback(() => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, pages.length]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowRight') {
      handleNextPage();
    } else if (event.key === 'ArrowLeft') {
      handlePrevPage();
    }
  }, [handleNextPage, handlePrevPage]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNextPage();
    } else if (isRightSwipe) {
      handlePrevPage();
    }
  };

  return (
    <div 
      className="relative min-h-screen flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-[1024px] max-h-[1024px]">
          <Image
            src={images[currentPage]}
            alt="Background"
            layout="fill"
            objectFit="contain"
            quality={100}
            priority
          />
        </div>
      </div>
      <div className="fixed inset-0 bg-black opacity-50" />
      
      <div className="relative z-10 flex flex-col min-h-screen w-full px-2 sm:px-4">
        <header className="py-4 text-white text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{title}</h1>
        </header>

        <main className="flex-1 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 p-4 sm:p-6 rounded-lg w-full max-w-4xl mx-auto">
            <div className="prose prose-invert prose-sm sm:prose-base lg:prose-lg mx-auto text-center" dangerouslySetInnerHTML={{ __html: pages[currentPage] }} />
          </div>
        </main>

        <footer className="py-4 text-white flex justify-between items-center max-w-4xl mx-auto w-full">
          {currentPage > 0 ? (
            <button onClick={handlePrevPage} className="flex items-center hover:underline">
              <ChevronLeft size={20} />
              <span className="ml-1 hidden sm:inline">Previous Page</span>
            </button>
          ) : prevChapter ? (
            <Link href={`/${prevChapter}`} className="flex items-center hover:underline">
              <ChevronLeft size={20} />
              <span className="ml-1 hidden sm:inline">Previous Chapter</span>
            </Link>
          ) : <div />}
          
          <div className="flex items-center space-x-2">
            {pages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentPage ? 'bg-white' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
          
          {currentPage < pages.length - 1 ? (
            <button onClick={handleNextPage} className="flex items-center hover:underline">
              <span className="mr-1 hidden sm:inline">Next Page</span>
              <ChevronRight size={20} />
            </button>
          ) : nextChapter ? (
            <Link href={`/${nextChapter}`} className="flex items-center hover:underline">
              <span className="mr-1 hidden sm:inline">Next Chapter</span>
              <ChevronRight size={20} />
            </Link>
          ) : <div />}
        </footer>
      </div>
    </div>
  );
};

export default PaginatedChapter;