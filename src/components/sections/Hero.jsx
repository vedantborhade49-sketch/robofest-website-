import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup fade-in animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
      
      // Setup simple scroll trigger
      gsap.to(textRef.current, {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[120vh] flex flex-col justify-center items-center z-10 px-6">
      <div ref={textRef} className="text-center max-w-4xl">
        <p className="font-technical text-aerosar-red mb-4 tracking-[0.3em]">SYSTEM INITIALIZATION</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight leading-tight">
          STALLION <br/><span className="text-aerosar-white-secondary">AEROSAR</span>
        </h1>
        <p className="text-aerosar-grey-light font-inter max-w-xl mx-auto text-lg md:text-xl">
          Advanced autonomous spatial awareness and rescue intelligence.
        </p>
      </div>
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 font-technical text-aerosar-grey-mid animate-pulse text-xs tracking-[0.2em]">
        SCROLL TO INITIATE ///
      </div>
    </section>
  );
};

export default Hero;
