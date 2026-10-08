import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IntelligenceSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".intel-element", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
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
    { label: "CONTEXT", desc: "Retrieves mission history (RAG)" },
    { label: "REPORT", desc: "AI-assisted briefing (LLM)" }
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-24 bg-aerosar-black border-t border-white/5">
      <div className="max-w-6xl w-full mx-auto px-6 md:px-16 lg:px-24 flex flex-col md:flex-row gap-16">
        <div className="md:w-1/3 intel-element">
          <h2 className="font-space-grotesk text-3xl md:text-4xl text-aerosar-white uppercase tracking-tight mb-4">
            FROM DETECTION<br/><span className="text-aerosar-red">TO INTELLIGENCE</span>
          </h2>
          <p className="font-inter text-aerosar-grey-light text-sm leading-relaxed">
            AEROSAR combines raw detection with spatial information, historical mission context, and AI-assisted reporting to deliver immediate incident intelligence.
          </p>
        </div>
        <div className="md:w-2/3 flex flex-col gap-4">
          {pipeline.map((item, i) => (
            <div key={i} className="intel-element flex items-center bg-white/5 p-4 rounded-sm border border-white/10 hover:border-aerosar-red/50 transition-colors">
              <div className="font-technical text-aerosar-red text-[10px] tracking-[0.2em] w-12">0{i + 1}</div>
              <div className="font-space-grotesk text-aerosar-white text-lg w-32 uppercase">{item.label}</div>
              <div className="font-inter text-aerosar-grey-light text-sm hidden sm:block">→</div>
              <div className="font-inter text-aerosar-grey-light text-sm ml-4">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntelligenceSection;
