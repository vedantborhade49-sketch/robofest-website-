import React from 'react';
import MainLayout from './components/layout/MainLayout';
import CinematicHero from './components/sections/CinematicHero';
import ProblemSection from './components/sections/ProblemSection';
import SystemOverviewSection from './components/sections/SystemOverviewSection';
import IntelligenceSection from './components/sections/IntelligenceSection';
import PlatformSection from './components/sections/PlatformSection';
import RescueMissionSection from './components/sections/RescueMissionSection';
import ClosingSection from './components/sections/ClosingSection';

function App() {
  return (
    <MainLayout>
      <CinematicHero />
      <ProblemSection />
      <SystemOverviewSection />
      <IntelligenceSection />
      <PlatformSection />
      <RescueMissionSection />
      <ClosingSection />
    </MainLayout>
  );
}

export default App;
