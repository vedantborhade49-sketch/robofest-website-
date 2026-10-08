import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IntelligenceSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".intel-element", 
        { opacity: 0, x: 20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5, 
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const pipeline = [
    { label: "DETECTION", desc: "Identifies anomalies" },
    { label: "LOCATION", desc: "Maps coordinates" },
    { label: "INCIDENT", desc: "Logs to engine" },
    { label: "CONTEXT", desc: "Retrieves mission history" },
    { label: "REPORT", desc: "AI-assisted briefing" }
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-20 bg-[#0f0f0f] border-t border-white/5">
      <div className="max-w-6xl w-full mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row gap-12 md:gap-16">
        <div className="md:w-1/3 intel-element">
          <span className="block font-technical text-aerosar-red text-[10px] md:text-xs tracking-[0.2em] mb-4">04 / PIPELINE</span>
          <h2 className="font-space-grotesk text-3xl md:text-4xl lg:text-5xl text-aerosar-white uppercase tracking-tight leading-[1.1] mb-6">
            FROM DETECTION<br/><span className="text-aerosar-red">TO INTELLIGENCE</span>
          </h2>
          <p className="font-inter text-aerosar-grey-light text-sm md:text-base leading-relaxed">
            Detections become localized incidents, are enriched with mission context, and output as human-readable intelligence.
          </p>
        </div>
        <div className="md:w-2/3 flex flex-col">
          {pipeline.map((item, i) => (
            <div key={i} className="intel-element flex items-center border-b border-white/10 py-4 hover:border-aerosar-red/50 transition-colors duration-300 group">
              <div className="font-technical text-aerosar-white/30 group-hover:text-aerosar-red transition-colors text-[10px] tracking-[0.2em] w-12">0{i + 1}</div>
              <div className="font-space-grotesk text-aerosar-white text-base md:text-lg w-32 uppercase tracking-wide">{item.label}</div>
              <div className="font-technical text-aerosar-red/50 text-sm hidden sm:block w-8">→</div>
              <div className="font-inter text-aerosar-grey-light text-sm md:text-base flex-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntelligenceSection;
