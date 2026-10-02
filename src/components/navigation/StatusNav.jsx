import React from 'react';

const StatusNav = () => {
  return (
    <nav className="fixed top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-between items-start pointer-events-none mix-blend-difference">
      <div className="font-technical text-aerosar-white flex items-center gap-4">
        STALLION AEROSAR 
        <span className="text-aerosar-red tracking-[0.2em]">///</span>
      </div>
      <div className="font-technical text-aerosar-grey-mid">
        SYS.ONLINE
      </div>
    </nav>
  );
};

export default StatusNav;
