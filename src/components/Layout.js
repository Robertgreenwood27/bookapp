// src/components/Layout.js

import React from 'react';

// src/components/Layout.js

export default function Layout({ children, backgroundImage }) {
    return (
      <div className="relative min-h-screen flex flex-col bg-background text-foreground">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover object-center"
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
  
