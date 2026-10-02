import React from 'react';
import MainLayout from './components/layout/MainLayout';
import CinematicHero from './components/sections/CinematicHero';
import Hero from './components/sections/Hero';
import Scene from './components/three/Scene';

function App() {
  return (
    <MainLayout>
      {/* Step 2: New Cinematic Hero */}
      <CinematicHero />
      
      {/* Step 1: Restored Previous Scene & Hero */}
      <Scene />
      <Hero />
      
      {/* Spacer for scrolling */}
      <section className="w-full h-[150vh] bg-aerosar-black-secondary flex flex-col items-center justify-start pt-32 z-10 relative border-t border-aerosar-grey-industrial/30">
        <p className="font-technical text-aerosar-red mb-4 tracking-[0.2em]">02</p>
        <h2 className="font-space-grotesk text-2xl md:text-4xl text-aerosar-white/50 text-center">
          THE MISSION BEGINS<br/>WHERE ACCESS ENDS.
        </h2>
      </section>
    </MainLayout>
  );
}

export default App;
