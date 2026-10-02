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
      // Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.to(".hero-overlay-dark", { opacity: 1, duration: 2 })
        .fromTo(".hero-tech-label", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1.5")
        .fromTo(".hero-red-accent", { scaleY: 0 }, { scaleY: 1, duration: 0.8, transformOrigin: "top" }, "-=1")
        .fromTo(".hero-title-small", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8")
        .fromTo(".hero-title-main span", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.15 }, "-=0.8")
        .fromTo(".hero-metadata", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8")
        .fromTo(".hero-statement", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.6")
        .fromTo(".hero-scroll-indicator", { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 1 }, "-=0.2");

      // Continuous pulse for red accent
      gsap.to(".hero-red-pulse", {
        opacity: 0.3,
        yoyo: true,
        repeat: -1,
        duration: 2,
        ease: "sine.inOut"
      });

      // Arrow continuous bounce
      gsap.to(".hero-arrow", {
        y: 6,
        yoyo: true,
        repeat: -1,
        duration: 1.5,
        ease: "sine.inOut"
      });

      // Scroll Exit Animation Foundation
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
        scale: 0.95,
        ease: "none"
      });

      gsap.to(".hero-video", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        filter: "brightness(0.1)",
        ease: "none"
      });

    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP context on unmount
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
      
      {/* Layer 2.1: Dark Cinematic Overlay (Responsive Gradient) */}
      <div className="hero-overlay-dark absolute inset-0 z-10 opacity-0 bg-gradient-to-b md:bg-gradient-to-r from-aerosar-black/95 via-aerosar-black/70 to-aerosar-black/20" />

      {/* Layer 2.2: Subtle Red/Black Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-tr from-aerosar-red-deep/20 to-transparent pointer-events-none mix-blend-overlay" />

      {/* Layer 2.3: Subtle Grain / Atmospheric Layer */}
      <div className="absolute inset-0 z-10 opacity-20 mix-blend-overlay pointer-events-none"
           style={{
             backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
           }}
      />

      {/* 3. Technical UI Details */}
      
      {/* UI: Top Left */}
      <div className="hero-tech-label absolute top-8 left-6 md:top-12 md:left-12 z-40 font-technical text-aerosar-white/50 tracking-widest text-xs flex flex-col gap-1">
        <span>STALLION</span>
        <span>AEROSAR</span>
      </div>

      {/* UI: Top Right */}
      <div className="hero-tech-label absolute top-8 right-6 md:top-12 md:right-12 z-40 font-technical text-aerosar-red tracking-widest text-[10px] md:text-xs flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-aerosar-red hero-red-pulse"></div>
        <span>AEROSAR SYSTEM INITIALIZING</span>
      </div>

      {/* 4. Main Typography & Content Area */}
      <div className="relative z-30 w-full h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
        
        <div className="max-w-4xl flex gap-5 md:gap-8">
          
          {/* Animated Red Accent Line */}
          <div className="hidden md:block w-[2px] bg-aerosar-red hero-red-accent mt-3 opacity-80" />
          
          <div className="flex flex-col">
            <h2 className="hero-title-small font-technical text-aerosar-grey-light tracking-[0.3em] mb-4 text-xs md:text-sm uppercase">
              Stallion Aerosar
            </h2>
            
            <h1 className="hero-title-main font-space-grotesk text-5xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight text-aerosar-white mb-8">
              <span className="block">AUTONOMOUS</span>
              <span className="block text-aerosar-red">SEARCH <span className="text-aerosar-white">&</span> RESCUE</span>
            </h1>

            <div className="hero-metadata font-technical text-aerosar-white/70 text-[10px] md:text-xs tracking-widest flex flex-col md:flex-row gap-2 md:gap-4 mb-10">
              <span>GPS-DENIED</span>
              <span className="hidden md:inline text-aerosar-red/50">/</span>
              <span>CONFINED ENVIRONMENTS</span>
              <span className="hidden md:inline text-aerosar-red/50">/</span>
              <span>AUTONOMOUS UAV</span>
            </div>

            <p className="hero-statement font-inter text-aerosar-grey-light text-xs md:text-sm lg:text-base max-w-xl leading-relaxed uppercase tracking-[0.1em] border-l border-aerosar-grey-mid pl-4 md:pl-5">
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
        <ArrowDown className="hero-arrow text-aerosar-red/80 w-4 h-4" />
      </div>

    </section>
  );
};

export default CinematicHero;
