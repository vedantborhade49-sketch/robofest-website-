import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import aerosarVideo from '../../assets/aerosar.mp4';

const CinematicHero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      
      tl.fromTo(".hero-title", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1.5, delay: 0.2 }
      )
      .fromTo(".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=0.8"
      )
      .fromTo(".hero-label",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.8"
      )
      .fromTo(".hero-scroll",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-aerosar-black"
    >
      {/* 1. Fullscreen Video Background */}
      <video
        src={aerosarVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: "brightness(1.15)" }}
      />

      {/* 2. Visual Treatment: Soft overlay for text readability */}
      {/* A dark overlay that prioritizes video visibility while maintaining text contrast */}
      <div className="absolute inset-0 z-10 bg-aerosar-black/20" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-aerosar-black/40 via-transparent to-aerosar-black/60" />

      {/* 3. Main Typography & Content Area */}
      <div className="relative z-30 w-full h-full flex flex-col items-center justify-center px-6 text-center">
        
        {/* Title */}
        <h1 className="hero-title font-space-grotesk text-5xl md:text-7xl lg:text-[7.5rem] font-medium leading-none tracking-tighter text-aerosar-white mb-4 md:mb-6">
          STALLION AEROSAR
        </h1>
        
        {/* Subtitle */}
        <h2 className="hero-subtitle font-space-grotesk text-xl md:text-3xl lg:text-4xl text-aerosar-white tracking-wide mb-6 font-light">
          AUTONOMOUS SEARCH & RESCUE
        </h2>
        
        {/* Technical Label */}
        <div className="hero-label font-technical text-aerosar-white/50 tracking-[0.2em] text-[10px] md:text-xs uppercase flex items-center gap-3 mt-4">
          <div className="w-1 h-1 rounded-full bg-aerosar-red/80 animate-pulse"></div>
          AUTONOMOUS UAV / SEARCH & RESCUE
        </div>
        
      </div>

      {/* 4. Scroll Indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3">
        <span className="font-technical text-[10px] md:text-xs text-aerosar-white/50 tracking-[0.2em] uppercase">
          Scroll to explore
        </span>
        <span className="font-technical text-aerosar-white/70 animate-bounce">
          ↓
        </span>
      </div>

    </section>
  );
};

export default CinematicHero;
