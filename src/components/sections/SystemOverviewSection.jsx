import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SystemOverviewSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".system-step", 
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8, 
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { label: "SENSE", desc: "Camera + Sensors" },
    { label: "MAP", desc: "LiDAR + SLAM" },
    { label: "PERCEIVE", desc: "Computer Vision" },
    { label: "LOCALIZE", desc: "Spatial + Semantic Understanding" },
    { label: "INFORM", desc: "Incident Intelligence" }
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-24 bg-aerosar-black border-t border-white/5">
      <div className="max-w-6xl w-full mx-auto px-6 md:px-16 lg:px-24">
        <div className="mb-16 system-step">
          <h2 className="font-space-grotesk text-3xl md:text-5xl text-aerosar-white uppercase tracking-tight">
            THE <span className="text-aerosar-red">AEROSAR</span> SYSTEM
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 hidden md:block -z-10 transform -translate-y-1/2"></div>
          {steps.map((step, i) => (
            <div key={i} className="system-step flex flex-col items-center mb-8 md:mb-0 relative group md:w-1/5">
              <div className="w-3 h-3 rounded-full bg-aerosar-red mb-4 shadow-[0_0_15px_rgba(201,31,45,0.5)]"></div>
              <h3 className="font-space-grotesk text-lg text-aerosar-white mb-2 uppercase text-center">{step.label}</h3>
              <p className="font-technical text-[10px] text-aerosar-grey-light tracking-widest uppercase text-center max-w-[120px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemOverviewSection;
