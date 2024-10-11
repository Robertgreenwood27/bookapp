import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

const ChapterLayout = ({ content, title, prevChapter, nextChapter, chapterId }) => {
  const audioSrc = `/Chapter${chapterId}.mp3`;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="py-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
        <div className="max-w-xl mx-auto">
          <AudioPlayer audioSrc={audioSrc} />
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="chapter-content mb-12">
          <div 
            className="prose prose-invert prose-sm sm:prose-base lg:prose-lg mx-auto"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
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