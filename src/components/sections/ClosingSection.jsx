import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ClosingSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".closing-word", 
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 1, 
          stagger: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
      gsap.fromTo(".closing-final", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1.5, 
          delay: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-black flex flex-col items-center justify-center text-center px-6 border-t border-white/5">
      <div className="max-w-4xl w-full">
        <h2 className="font-space-grotesk text-5xl md:text-7xl lg:text-8xl text-aerosar-white uppercase tracking-tighter mb-16 flex flex-col gap-4">
          <span className="closing-word text-aerosar-white/50">FIND.</span>
          <span className="closing-word text-aerosar-white/80">UNDERSTAND.</span>
          <span className="closing-word text-aerosar-red">INFORM.</span>
        </h2>
        
        <div className="closing-final mt-24">
          <h3 className="font-space-grotesk text-2xl md:text-3xl text-aerosar-white tracking-widest uppercase mb-6">
            STALLION AEROSAR
          </h3>
          <p className="font-technical text-aerosar-grey-light text-sm tracking-[0.2em] uppercase max-w-xl mx-auto leading-relaxed">
            Autonomous search and rescue intelligence<br/>for GPS-denied and confined environments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
