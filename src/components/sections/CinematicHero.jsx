import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import aerosarVideo from '../../assets/aerosar.mp4';

const CinematicHero = () => {
  const containerRef = useRef(null);

  // Split text into words and characters for elegant cinematic animation
  const splitText = (text) => {
    return text.split(' ').map((word, wordIndex, array) => (
      <React.Fragment key={wordIndex}>
        <span className="inline-block whitespace-nowrap">
          {word.split('').map((char, i) => (
            <span key={i} className="inline-block hero-char" style={{ opacity: 0 }}>
              {char}
            </span>
          ))}
        </span>
        {wordIndex < array.length - 1 && ' '}
      </React.Fragment>
    ));
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      // 1. Letters gently slide in with blur and opacity
      tl.fromTo(".hero-char", 
        { 
          opacity: 0, 
          x: 25, 
          filter: "blur(10px)"
        },
        { 
          opacity: 1, 
          x: 0, 
          filter: "blur(0px)",
          duration: 1.4, 
          stagger: {
            each: 0.04,
            from: "start"
          }
        }, 
        0
      );

      // 2. Letter spacing subtly tightens
      tl.fromTo(".title-inner",
        { letterSpacing: "0.15em" },
        { letterSpacing: "0.02em", duration: 1.5, ease: "power2.out" },
        0.2
      );

      // 3. Very small red light sweep across the text
      tl.fromTo(".title-glow", 
        { left: "-20%", opacity: 0 }, 
        { left: "100%", opacity: 0.5, duration: 1.5, ease: "power2.inOut" },
        0.5
      );

      // 4. Subtitle and Scroll reveal
      tl.fromTo(".hero-subtitle",
        { opacity: 0, y: 10, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2 },
        0.8
      )
      .fromTo(".hero-scroll",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1 },
        1.2
      );

      // 5. Very subtle breathing/parallax effect (almost completely still)
      gsap.to(".title-wrapper", {
        x: 6,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-aerosar-black flex items-center"
    >
      {/* Video Background */}
      <video
        src={aerosarVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: "brightness(1.2)" }} 
      />

      {/* Localized dark gradient behind the text (left, lower-middle) */}
      <div className="absolute inset-0 z-10 pointer-events-none" 
           style={{ background: "radial-gradient(circle at 25% 60%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 45%)" }} />

      {/* Main Typography & Content Area */}
      <div className="relative z-30 w-full px-6 md:px-12 lg:px-[15%] xl:px-[20%] flex flex-col items-start pt-[20vh] md:pt-[15vh]">
        
        {/* Tiny Technical Identifier */}
        <div className="hero-subtitle font-technical text-aerosar-white/70 tracking-[0.25em] text-[9px] md:text-[10px] leading-relaxed uppercase mb-4 pl-1">
          <span className="block mb-1">01 / AEROSAR</span>
          <span className="block text-aerosar-white/50">AUTONOMOUS SEARCH & RESCUE</span>
        </div>

        {/* Title Container */}
        <div className="title-wrapper relative inline-block">
          
          <div className="title-glow absolute top-0 bottom-0 w-[30%] bg-gradient-to-r from-transparent via-[#E32636] to-transparent blur-xl pointer-events-none z-50 mix-blend-screen opacity-0" />

          {/* MAIN TITLE */}
          <h1 className="title-inner font-space-grotesk text-4xl md:text-5xl lg:text-[5.5rem] font-bold leading-[1.05] text-[#E32636] uppercase max-w-4xl"
              style={{
                transform: "scaleY(1.1) scaleX(0.98)",
                transformOrigin: "left center",
              }}>
            {splitText("STALLION AEROSAR")}
          </h1>
        </div>
        
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3">
        <span className="font-technical text-[9px] md:text-[10px] text-aerosar-white/50 tracking-[0.2em] uppercase">
          Scroll to explore
        </span>
        <span className="font-technical text-aerosar-white/70 animate-bounce text-xs">
          ↓
        </span>
      </div>

    </section>
  );
};

export default CinematicHero;
