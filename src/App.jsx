import React from 'react';
import MainLayout from './components/layout/MainLayout';
import CinematicHero from './components/sections/CinematicHero';

function App() {
  return (
    <MainLayout>
      <CinematicHero />
      
      {/* Spacer to show what happens after the pinned section */}
      <section className="w-full min-h-screen bg-aerosar-black-secondary flex flex-col items-center justify-center relative z-10 border-t border-aerosar-grey-industrial/30">
        <p className="font-technical text-aerosar-red mb-4 tracking-[0.2em]">02</p>
        <h2 className="font-space-grotesk text-3xl md:text-5xl text-aerosar-white text-center">
          SYSTEM SPECIFICATIONS
        </h2>
      </section>
    </MainLayout>
  );
}

export default App;
