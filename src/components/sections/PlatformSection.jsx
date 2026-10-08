import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PlatformSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".platform-item", 
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const components = [
    { name: "ARDUPILOT", desc: "Flight Controller" },
    { name: "RASPBERRY PI 5", desc: "Compute Core" },
    { name: "CAMERA", desc: "Visual Perception" },
    { name: "LIDAR", desc: "Depth & Mapping" },
    { name: "MAVLINK", desc: "Telemetry" }
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-6xl w-full mx-auto px-6 md:px-16 lg:px-24">
        <div className="text-center mb-16 platform-item">
          <h2 className="font-space-grotesk text-3xl md:text-5xl text-aerosar-white uppercase tracking-tight">
            PHYSICAL <span className="text-aerosar-red">PLATFORM</span>
          </h2>
          <p className="font-technical text-aerosar-grey-light text-xs tracking-widest mt-4 uppercase">Caged Quadcopter Architecture</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          {components.map((comp, i) => (
            <div key={i} className="platform-item bg-black border border-white/10 p-6 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] flex flex-col items-center justify-center text-center group hover:border-aerosar-red/50 transition-colors">
              <h3 className="font-space-grotesk text-xl text-aerosar-white mb-2 uppercase group-hover:text-aerosar-red transition-colors">{comp.name}</h3>
              <p className="font-inter text-aerosar-grey-light text-xs">{comp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
