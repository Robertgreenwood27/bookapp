import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      {/* Header with space for hamburger icon */}
      <header className="py-4 px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="w-10 h-10"></div> {/* Placeholder for hamburger icon */}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col px-4">
        <div className="max-w-4xl mx-auto w-full">
          {children}
        </div>
      </main>

    </div>
  );
}