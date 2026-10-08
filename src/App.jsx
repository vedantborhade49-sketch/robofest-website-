import React from 'react';
import MainLayout from './components/layout/MainLayout';
import CinematicOpening from './components/sections/CinematicOpening';
import IntelligenceSection from './components/sections/IntelligenceSection';
import RescueMissionSection from './components/sections/RescueMissionSection';
import ClosingSection from './components/sections/ClosingSection';

function App() {
  return (
    <MainLayout>
      <CinematicOpening />
      <IntelligenceSection />
      <RescueMissionSection />
      <ClosingSection />
    </MainLayout>
  );
}

export default App;
