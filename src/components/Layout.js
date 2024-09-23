import React from 'react';
import Image from 'next/image';

export default function Layout({ children, backgroundImage }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-[1024px] max-h-[1024px]">
          <Image
            src={backgroundImage}
            alt="Background"
            layout="fill"
            objectFit="contain"
            quality={100}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 max-w-4xl mx-auto w-full px-4">
        {children}
      </div>
    </div>
  );
}