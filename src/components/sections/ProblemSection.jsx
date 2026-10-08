import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProblemSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".problem-element", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[70vh] bg-aerosar-black flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-5xl w-full mx-auto problem-element">
        <h2 className="font-space-grotesk text-4xl md:text-6xl text-aerosar-white leading-[1.1] uppercase tracking-tight mb-12">
          <span className="block text-aerosar-white/70 text-3xl md:text-5xl mb-2">THE PROBLEM</span>
          WHERE <span className="text-aerosar-red">ACCESS ENDS.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "COLLAPSED STRUCTURES", desc: "Unstable environments too dangerous for immediate human entry." },
            { title: "CONFINED SPACES", desc: "Areas too narrow or restricted for conventional rescue equipment." },
            { title: "GPS-DENIED", desc: "Subterranean or deep indoor zones where traditional navigation fails." }
          ].map((item, i) => (
            <div key={i} className="problem-element border-l border-aerosar-red/30 pl-6">
              <div className="font-technical text-aerosar-red text-[10px] tracking-[0.2em] uppercase mb-4">0{i + 1}</div>
              <h3 className="font-space-grotesk text-xl text-aerosar-white mb-2 uppercase">{item.title}</h3>
              <p className="font-inter text-aerosar-grey-light text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
