import React from 'react';
import StatusNav from '../navigation/StatusNav';

const MainLayout = ({ children }) => {
  return (
    <div className="bg-aerosar-black min-h-screen w-full overflow-x-hidden relative selection:bg-aerosar-red selection:text-aerosar-white">
      <StatusNav />
      <main className="relative z-10 w-full h-full">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
