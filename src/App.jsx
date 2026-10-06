import React from 'react';
import MainLayout from './components/layout/MainLayout';
import CinematicHero from './components/sections/CinematicHero';
import MissionSection from './components/sections/MissionSection';
import SystemSection from './components/sections/SystemSection';
import SpatialSection from './components/sections/SpatialSection';
import PerceptionSection from './components/sections/PerceptionSection';
import IncidentSection from './components/sections/IncidentSection';
import RagSection from './components/sections/RagSection';
import LlmReportSection from './components/sections/LlmReportSection';

function App() {
  return (
    <MainLayout>
      <CinematicHero />
      <MissionSection />
      <SystemSection />
      <SpatialSection />
      <PerceptionSection />
      <IncidentSection />
      <RagSection />
      <LlmReportSection />
    </MainLayout>
  );
}

export default App;
