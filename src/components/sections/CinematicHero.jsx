import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CinematicHero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pin the entire hero section and create a scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%", // Pin for 200% of viewport height
          scrub: 1,
          pin: true,
        }
      });
      
      // Step 1: Fade out first text, fade out arrow
      tl.to(".text-1", { opacity: 0, y: -50, duration: 1 })
        .to(".hero-scroll-indicator", { opacity: 0, duration: 0.5 }, "<");
      
      // Step 2: Fade in second text
      tl.fromTo(".text-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        // Add a slight pause
        .to(".text-2", { opacity: 1, duration: 0.5 })
        // Step 3: Fade out second text
        .to(".text-2", { opacity: 0, y: -50, duration: 1 });

      // Video dimming effect
      gsap.to(".hero-video", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
        },
        filter: "brightness(0.2)",
        ease: "none"
      });

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
        ref={videoRef}
        src="/videos/aerosar-hero.mp4"
        poster="/videos/aerosar-hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        className="hero-video absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 2. Visual Treatment: Layered Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b md:bg-gradient-to-r from-aerosar-black/95 via-aerosar-black/70 to-aerosar-black/20" />
      <div className="absolute inset-0 z-10 bg-gradient-to-tr from-aerosar-red-deep/20 to-transparent pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 z-10 opacity-20 mix-blend-overlay pointer-events-none"
           style={{
             backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
           }}
      />

      {/* 3. Technical UI Details */}
      <div className="absolute top-8 left-6 md:top-12 md:left-12 z-40 font-technical text-aerosar-white/50 tracking-widest text-xs flex flex-col gap-1">
        <span>STALLION</span>
        <span>AEROSAR</span>
      </div>

      <div className="absolute top-8 right-6 md:top-12 md:right-12 z-40 font-technical text-aerosar-red tracking-widest text-[10px] md:text-xs flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-aerosar-red animate-pulse"></div>
        <span>SYSTEM ONLINE</span>
      </div>

      {/* 4. Main Typography & Content Area */}
      <div className="relative z-30 w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
        
        {/* TEXT 1: STALLION AEROSAR */}
        <div className="text-1 absolute left-0 w-full flex flex-col items-center justify-center text-center">
          <p className="font-technical text-aerosar-red mb-4 tracking-[0.3em] text-xs md:text-sm uppercase">System Initialization</p>
          <h1 className="font-space-grotesk text-6xl md:text-8xl lg:text-[7rem] font-medium leading-[1.05] tracking-tighter text-aerosar-white">
            STALLION
            <br />
            <span className="text-aerosar-white/50">AEROSAR</span>
          </h1>
        </div>

        {/* TEXT 2: AUTONOMOUS SEARCH & RESCUE DRONE */}
        <div className="text-2 absolute max-w-4xl flex gap-5 md:gap-8 opacity-0 translate-y-[50px]">
          {/* Animated Red Accent Line */}
          <div className="hidden md:block w-[2px] bg-aerosar-red mt-3 opacity-80" />
          
          <div className="flex flex-col">
            <h2 className="font-technical text-aerosar-grey-light tracking-[0.3em] mb-4 text-xs md:text-sm uppercase">
              Mission Profile
            </h2>
            
            <h1 className="font-space-grotesk text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight text-aerosar-white mb-8">
              <span className="block">AUTONOMOUS</span>
              <span className="block text-aerosar-red">SEARCH <span className="text-aerosar-white">&</span> RESCUE</span>
              <span className="block text-aerosar-white/50 text-3xl md:text-5xl mt-2">DRONE</span>
            </h1>

            <div className="font-technical text-aerosar-white/70 text-[10px] md:text-xs tracking-widest flex flex-col md:flex-row gap-2 md:gap-4 mb-10">
              <span>GPS-DENIED</span>
              <span className="hidden md:inline text-aerosar-red/50">/</span>
              <span>CONFINED ENVIRONMENTS</span>
              <span className="hidden md:inline text-aerosar-red/50">/</span>
              <span>AUTONOMOUS UAV</span>
            </div>

            <p className="font-inter text-aerosar-grey-light text-xs md:text-sm lg:text-base max-w-xl leading-relaxed uppercase tracking-[0.1em] border-l border-aerosar-grey-mid pl-4 md:pl-5">
              When access becomes the problem,<br/>
              <span className="text-aerosar-white font-medium">Aerosar goes in.</span>
            </p>
          </div>
        </div>

      </div>

      {/* 5. Scroll Indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3">
        <span className="font-technical text-[10px] tracking-[0.2em] text-aerosar-white/40 uppercase">
          Scroll to explore
        </span>
        <ArrowDown className="text-aerosar-red/80 w-4 h-4 animate-bounce" />
      </div>

    </section>
  );
};

export default CinematicHero;
