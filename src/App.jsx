import React from 'react';
import MainLayout from './components/layout/MainLayout';
import CinematicHero from './components/sections/CinematicHero';
import MissionSection from './components/sections/MissionSection';
import SystemSection from './components/sections/SystemSection';

function App() {
  return (
    <MainLayout>
      <CinematicHero />
      <MissionSection />
      <SystemSection />
    </MainLayout>
  );
}

export default App;
