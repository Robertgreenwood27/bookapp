import React from 'react';
import Image from 'next/image';

export default function Layout({ children, backgroundImage }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
        {children}
      </div>
    </div>
  );
}