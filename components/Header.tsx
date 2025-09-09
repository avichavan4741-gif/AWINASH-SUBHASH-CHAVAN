
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto max-w-2xl p-4 flex items-center justify-center">
        <h1 className="text-xl font-bold tracking-wider">
          Banjara ST Arakshan Guide
        </h1>
      </div>
    </header>
  );
};
