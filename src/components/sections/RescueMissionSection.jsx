import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RescueMissionSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".mission-step", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const steps = ["ENTER", "SENSE", "MAP", "DETECT", "LOCALIZE", "REPORT"];

  return (
    <section ref={sectionRef} className="relative w-full py-32 bg-aerosar-black border-t border-white/5">
      <div className="max-w-6xl w-full mx-auto px-6 md:px-16 lg:px-24">
        <h2 className="font-space-grotesk text-2xl md:text-4xl text-aerosar-white uppercase tracking-tight mb-16 text-center mission-step">
          INTEGRATED <span className="text-aerosar-red">RESCUE MISSION</span>
        </h2>
        
        <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-8">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="mission-step flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-aerosar-red/30 flex items-center justify-center bg-black/50 backdrop-blur-sm shadow-[0_0_20px_rgba(201,31,45,0.1)] hover:border-aerosar-red transition-colors">
                  <span className="font-space-grotesk text-sm md:text-base text-aerosar-white">{step}</span>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="mission-step hidden md:block text-aerosar-red/50 text-2xl">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RescueMissionSection;
