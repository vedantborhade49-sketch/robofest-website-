import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
  const sectionRef = useRef(null);
  const problemRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Mission Intro Text Reveal
      gsap.fromTo(".mission-text span", 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mission-text",
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1
          }
        }
      );

      // 2. Supporting Statement Reveal
      gsap.fromTo(".support-text",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".support-text",
            start: "top 80%",
          }
        }
      );

      // 3. Problem Environment Sequence
      const problemTl = gsap.timeline({
        scrollTrigger: {
          trigger: problemRef.current,
          start: "top top",
          end: "+=400%", // Pin for 4 screens of scrolling
          pin: true,
          scrub: 1,
        }
      });

      // We have 5 states. 
      // State 1 is default visible.
      const envs = [".env-1", ".env-2", ".env-3", ".env-4", ".env-5"];
      
      envs.forEach((env, index) => {
        if (index === 0) return; // Skip first, it's already visible
        
        // Move line
        const progress = (index / (envs.length - 1)) * 80; // 0 to 80% top/left

        // Fade out previous
        problemTl.to(envs[index - 1], { opacity: 0, y: -40, duration: 1 })
                 // Update counter text directly
                 .set(".env-counter", { innerText: `0${index + 1}` }, "<")
                 // Move indicator
                 .to(".active-line-y", { top: `${progress}%`, duration: 1 }, "<")
                 .to(".active-line-x", { left: `${progress}%`, duration: 1 }, "<")
                 // Fade in next
                 .fromTo(env, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
                 // Slight pause for reading
                 .to({}, { duration: 0.5 }); 
      });

      // Subtly increase background intensity throughout the sequence
      problemTl.to(".problem-bg", { opacity: 0.3, duration: 4 }, 0);

      // 4. Final Transition
      gsap.fromTo(".transition-text",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          scrollTrigger: {
            trigger: ".transition-final",
            start: "top 50%",
            end: "bottom 80%",
            scrub: 1
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-aerosar-black z-20">
      
      {/* Optional Environmental Effect: subtle noise/grain */}
      <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-screen pointer-events-none"
           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
      />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none opacity-20 mask-image:linear-gradient(to_bottom,black,transparent)]" />

      {/* 1. Mission Intro */}
      <div className="relative z-10 w-full min-h-[80vh] flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 pt-32">
        <div className="max-w-5xl w-full">
          <h2 className="mission-text font-space-grotesk text-4xl md:text-6xl lg:text-[5.5rem] text-aerosar-white leading-[1.1] uppercase tracking-tight">
            <span className="block text-aerosar-white/70 text-3xl md:text-5xl lg:text-[4.5rem] mb-2 md:mb-4">THE MISSION BEGINS</span>
            <span className="block">WHERE <span className="text-aerosar-red">ACCESS ENDS.</span></span>
          </h2>
        </div>
      </div>

      {/* 2. Supporting Statement */}
      <div className="relative z-10 w-full min-h-[50vh] flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 mb-32">
        <div className="support-text max-w-3xl w-full md:ml-auto md:mr-16 lg:mr-32 border-l border-aerosar-red/30 pl-6 md:pl-10">
          <div className="font-technical text-aerosar-grey-light text-[10px] md:text-xs tracking-[0.2em] uppercase mb-6 flex gap-4">
            <span>01</span>
            <span className="text-aerosar-red/50">/</span>
            <span>MISSION CONTEXT</span>
          </div>
          <p className="font-inter text-aerosar-grey-light text-base md:text-lg lg:text-xl leading-relaxed mb-6">
            Search and rescue operations can force people into environments that are unstable, confined, hazardous, or difficult to access.
          </p>
          <p className="font-inter text-aerosar-white font-medium text-base md:text-lg lg:text-xl leading-relaxed">
            AEROSAR is designed to extend situational awareness into those spaces before humans have to enter them.
          </p>
        </div>
      </div>

      {/* 3. Problem Environment Sequence */}
      <div ref={problemRef} className="relative z-10 w-full h-screen">
        <div className="absolute inset-0 w-full h-full flex items-center justify-center px-6 md:px-16 lg:px-24 overflow-hidden">
          
          {/* Subtle background shift during problem sequence */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,31,45,0.05)_0%,rgba(10,10,10,1)_70%)] problem-bg opacity-0" />

          <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24 relative z-10">
            
            {/* Left Indicator */}
            <div className="hidden md:flex w-12 flex-shrink-0 flex-col items-center relative py-4">
              <div className="w-[1px] h-full absolute left-1/2 -translate-x-1/2 bg-aerosar-grey-dark/30" />
              {/* Active Red Line */}
              <div className="active-line-y w-[3px] h-[20%] absolute left-1/2 -translate-x-1/2 bg-aerosar-red top-0" />
            </div>

            {/* Dynamic Text Container */}
            <div className="flex-1 relative h-[300px] md:h-[400px]">
              
              <div className="font-technical text-aerosar-grey-mid text-[10px] md:text-xs tracking-[0.2em] uppercase mb-8 md:mb-12">
                SEARCH ENVIRONMENT <span className="text-aerosar-red/50 mx-2">/</span> <span className="env-counter text-aerosar-white">01</span> <span className="text-aerosar-grey-mid/50">/ 05</span>
              </div>
              
              {/* Text Layers */}
              <div className="relative">
                <h3 className="env-1 font-space-grotesk text-4xl md:text-6xl lg:text-[5.5rem] uppercase leading-[1.05] tracking-tight text-aerosar-white absolute top-0 left-0 w-full">
                  <span className="block text-aerosar-white/50">COLLAPSED</span>
                  <span className="block">STRUCTURES</span>
                </h3>
                <h3 className="env-2 font-space-grotesk text-4xl md:text-6xl lg:text-[5.5rem] uppercase leading-[1.05] tracking-tight text-aerosar-white absolute top-0 left-0 w-full opacity-0 translate-y-10">
                  <span className="block text-aerosar-white/50">CONFINED</span>
                  <span className="block">SPACES</span>
                </h3>
                <h3 className="env-3 font-space-grotesk text-4xl md:text-6xl lg:text-[5.5rem] uppercase leading-[1.05] tracking-tight text-aerosar-white absolute top-0 left-0 w-full opacity-0 translate-y-10">
                  <span className="block text-aerosar-white/50">HAZARDOUS</span>
                  <span className="block">ENVIRONMENTS</span>
                </h3>
                <h3 className="env-4 font-space-grotesk text-4xl md:text-6xl lg:text-[5.5rem] uppercase leading-[1.05] tracking-tight text-aerosar-white absolute top-0 left-0 w-full opacity-0 translate-y-10">
                  <span className="block text-aerosar-white/50">LIMITED</span>
                  <span className="block">VISIBILITY</span>
                </h3>
                <h3 className="env-5 font-space-grotesk text-4xl md:text-6xl lg:text-[5.5rem] uppercase leading-[1.05] tracking-tight text-aerosar-white absolute top-0 left-0 w-full opacity-0 translate-y-10">
                  <span className="block text-aerosar-white/50">GPS-DENIED</span>
                  <span className="block text-aerosar-red">CONDITIONS</span>
                </h3>
              </div>
            </div>

            {/* Mobile Indicator (Bottom) */}
            <div className="md:hidden w-full h-[2px] bg-aerosar-grey-dark/30 relative mt-24">
              <div className="active-line-x h-[2px] w-[20%] absolute top-0 left-0 bg-aerosar-red" />
            </div>

          </div>
        </div>
      </div>

      {/* 4. Final Transition to next section */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center bg-[#050505] transition-final">
        <p className="font-technical text-aerosar-white/80 text-xs md:text-sm tracking-[0.3em] text-center uppercase opacity-0 transition-text border border-aerosar-red/20 px-8 py-6 bg-aerosar-red/5">
          SO WHAT IF THE SYSTEM
          <br/>
          <span className="text-aerosar-red mt-2 block">COULD GO INSTEAD?</span>
        </p>
      </div>
    </section>
  );
};

export default MissionSection;
