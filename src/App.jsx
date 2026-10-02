import React from 'react';
import MainLayout from './components/layout/MainLayout';
import CinematicHero from './components/sections/CinematicHero';
import MissionSection from './components/sections/MissionSection';

function App() {
  return (
    <MainLayout>
      <CinematicHero />
      <MissionSection />
    </MainLayout>
  );
}

export default App;
