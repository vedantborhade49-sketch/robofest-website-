import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SystemSection = () => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);

  // Define themes
  const themes = {
    dark: {
      "--sys-bg": "#050505",
      "--sys-text": "#F5F5F5",
      "--sys-text-sec": "#D6D6D6",
      "--sys-text-muted": "#A3A3A3",
    },
    light: {
      "--sys-bg": "#ffffff",
      "--sys-text": "#050505",
      "--sys-text-sec": "#262626",
      "--sys-text-muted": "#666666",
    },
    lightGrey: {
      "--sys-bg": "#F0F0F0",
      "--sys-text": "#050505",
      "--sys-text-sec": "#262626",
      "--sys-text-muted": "#666666",
    },
    darkGrey: {
      "--sys-bg": "#1A1A1A",
      "--sys-text": "#F5F5F5",
      "--sys-text-sec": "#D6D6D6",
      "--sys-text-muted": "#A3A3A3",
    }
  };

  useEffect(() => {
    // Initial setup to ensure dark theme at the very start
    gsap.set(containerRef.current, themes.dark);

    let ctx = gsap.context(() => {
      
      // ==========================================
      // 1. OPENING COLOR TRANSITION (Dark -> Light)
      // ==========================================
      gsap.to(containerRef.current, {
        ...themes.light,
        scrollTrigger: {
          trigger: ".opening-phase",
          start: "top 70%",
          end: "bottom 90%",
          scrub: 1,
        }
      });

      // ==========================================
      // 2. AEROSAR IS NOT JUST A DRONE
      // ==========================================
      const njTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".not-just-phase",
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
        }
      });

      // Strict sequential timeline without overlap
      njTl.fromTo(".nj-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
          .to({}, { duration: 0.5 }) // Hold
          .to(".nj-1", { opacity: 0, y: -50, duration: 1 })
          
          .fromTo(".nj-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
          .to({}, { duration: 0.5 }) // Hold
          .to(".nj-2", { opacity: 0, y: -50, duration: 1 })
          
          .fromTo(".nj-3", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5 })
          .to({}, { duration: 1 }) // Hold longer for impact
          .to(".nj-3", { opacity: 0, y: -50, duration: 1 })
          
          .fromTo(".nj-4", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5 })
          .to({}, { duration: 1 });

      // ==========================================
      // 3. SYSTEM STORY PINNED SEQUENCE
      // ==========================================
      const stages = [
        { name: "FLY", theme: themes.light },
        { name: "SENSE", theme: themes.lightGrey },
        { name: "MAP", theme: themes.light },
        { name: "PERCEIVE", theme: themes.dark },
        { name: "LOCALIZE", theme: themes.dark },
        { name: "NAVIGATE", theme: themes.darkGrey },
        { name: "INFORM", theme: themes.light }
      ];
      
      const sysTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=7000", // Large scroll distance for readability
          scrub: 1,
          pin: true,
        }
      });

      stages.forEach((stage, index) => {
        const isFirst = index === 0;
        
        // Background theme transition
        if (!isFirst && stages[index - 1].theme !== stage.theme) {
          sysTl.to(containerRef.current, {
            ...stage.theme,
            duration: 1
          }, "<");
        }

        if (!isFirst) {
          // Transition OUT previous stage
          sysTl.to(`.stage-word-${index - 1}`, { 
                  opacity: 0.1, 
                  y: -150, 
                  scale: 0.6, 
                  color: "var(--sys-text-muted)",
                  duration: 1 
               })
               .to(`.stage-vis-${index - 1}`, { opacity: 0, y: -50, duration: 1 }, "<")
               .to(`.ind-${index - 1}`, { color: "var(--sys-text-muted)", fontWeight: 400, duration: 0.5 }, "<")
               .to(".ind-line", { top: `${(index / (stages.length - 1)) * 100}%`, duration: 1 }, "<");
        } else {
          sysTl.to(".ind-line", { top: "0%", duration: 0.1 });
        }

        // Transition IN current stage
        sysTl.fromTo(`.stage-word-${index}`, 
                { opacity: 0, y: 150, scale: 0.8 }, 
                { opacity: 1, y: 0, scale: 1, color: "var(--sys-text)", duration: 1 }, "<")
             .fromTo(`.stage-vis-${index}`,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1 }, "<")
             .to(`.ind-${index}`, { color: "#c91f2d", fontWeight: 700, duration: 0.5 }, "<") // Active indicator is Red
             .to(".ind-counter", { innerText: `0${index + 1}` }, "<");
             
        // Hold frame to read
        sysTl.to({}, { duration: 1.5 });
      });

      // Exit last stage smoothly
      sysTl.to(`.stage-word-6`, { opacity: 0, y: -150, scale: 0.6, duration: 1 })
           .to(`.stage-vis-6`, { opacity: 0, y: -50, duration: 1 }, "<");

      // ==========================================
      // 4. THE SYSTEM THINKS IN LAYERS
      // ==========================================
      const layerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".layers-phase",
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
        }
      });

      layerTl.fromTo(".layer-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
             .to({}, { duration: 0.5 })
             .to(".layer-title", { y: -100, scale: 0.8, opacity: 0.3, duration: 1 })
             
             .fromTo(".layer-1", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 }, "-=0.5")
             .fromTo(".layer-2", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 })
             .fromTo(".layer-3", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 })
             .fromTo(".layer-4", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 })
             
             .to({}, { duration: 1 })
             
             // Compress layers
             .to(".layer-item", { y: 0, opacity: 0, duration: 1.5, stagger: 0.1 })
             .fromTo(".layer-aerosar", { opacity: 0, scale: 0.8, letterSpacing: "0.2em" }, { opacity: 1, scale: 1, letterSpacing: "0em", duration: 2 }, "-=1")
             .to({}, { duration: 1 });

      // ==========================================
      // 5. TRANSITION TO TECHNOLOGY
      // ==========================================
      const finalTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".tech-transition",
          start: "top 70%",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      finalTl.to(containerRef.current, { ...themes.dark, duration: 1 })
             .fromTo(".tech-text-1", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "<")
             .to({}, { duration: 0.5 })
             .fromTo(".tech-text-2", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full z-20 overflow-hidden transition-colors duration-[0ms]"
      style={{ 
        backgroundColor: "var(--sys-bg)",
        color: "var(--sys-text)",
        "--sys-bg": "#050505",
        "--sys-text": "#F5F5F5",
        "--sys-text-sec": "#D6D6D6",
        "--sys-text-muted": "#A3A3A3"
      }}
    >
      {/* 1. Opening Phase */}
      <div className="opening-phase relative min-h-[120vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32">
        <div className="max-w-6xl w-full mx-auto">
          <h1 className="font-space-grotesk font-bold text-6xl md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tighter mb-12">
            AEROSAR
          </h1>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <h2 className="font-space-grotesk text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight max-w-3xl" style={{ color: "var(--sys-text-sec)" }}>
              AUTONOMOUS <br className="hidden md:block" />
              SEARCH & RESCUE <br className="hidden md:block" />
              SYSTEM
            </h2>
            <div className="font-technical text-xs md:text-sm tracking-[0.2em] uppercase flex flex-col gap-2 border-l-2 border-[#c91f2d] pl-6" style={{ color: "var(--sys-text-muted)" }}>
              <span>DESIGNED TO <span className="text-[#c91f2d]">PERCEIVE.</span></span>
              <span>DESIGNED TO <span className="text-[#c91f2d]">NAVIGATE.</span></span>
              <span>DESIGNED TO <span className="text-[#c91f2d]">INFORM.</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. AEROSAR IS NOT JUST A DRONE */}
      <div className="not-just-phase h-[100vh] flex flex-col items-center justify-center px-6 text-center relative">
        <div className="nj-1 absolute font-space-grotesk text-4xl md:text-6xl uppercase tracking-tight opacity-0">
          AEROSAR
        </div>
        <div className="nj-2 absolute font-space-grotesk text-5xl md:text-7xl uppercase tracking-tight opacity-0" style={{ color: "var(--sys-text-sec)" }}>
          IS NOT
        </div>
        <div className="nj-3 absolute font-space-grotesk font-bold text-6xl md:text-8xl lg:text-[10rem] uppercase tracking-tighter text-[#c91f2d] leading-none opacity-0">
          JUST A DRONE.
        </div>
        <div className="nj-4 absolute font-space-grotesk font-medium text-5xl md:text-7xl lg:text-[8rem] uppercase tracking-tight leading-none opacity-0">
          IT IS A SYSTEM.
        </div>
      </div>

      {/* 3. SYSTEM STORY PINNED SEQUENCE */}
      <div ref={pinRef} className="pinned-sequence relative w-full h-[100vh] flex items-center px-6 md:px-16 lg:px-24">
        
        {/* Indicator (Left) */}
        <div className="hidden md:flex w-48 flex-col justify-center h-full relative z-20">
          <div className="font-technical text-xs tracking-[0.2em] mb-8 uppercase opacity-60">
            SYSTEM FLOW <br/>
            <span className="ind-counter font-bold text-[#c91f2d]">01</span> / 07
          </div>
          <div className="relative flex">
            <div className="w-[2px] h-[300px] mr-6 relative" style={{ backgroundColor: "var(--sys-text-muted)", opacity: 0.2 }}>
              <div className="ind-line absolute top-0 left-0 w-full h-[15%] bg-[#c91f2d]" />
            </div>
            <div className="flex flex-col justify-between h-[300px] font-technical text-[10px] tracking-widest uppercase">
              {["FLY", "SENSE", "MAP", "PERCEIVE", "LOCALIZE", "NAVIGATE", "INFORM"].map((stage, i) => (
                <div key={stage} className={`ind-${i}`} style={{ color: i === 0 ? "#c91f2d" : "var(--sys-text-muted)" }}>
                  {stage}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Typography & Visualization Area */}
        <div className="flex-1 relative h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12">
          
          {/* Typography Stack */}
          <div className="relative w-full lg:w-1/2 h-[300px] flex items-center justify-center lg:justify-start">
             {["FLY", "SENSE", "MAP", "PERCEIVE", "LOCALIZE", "NAVIGATE", "INFORM"].map((stage, i) => (
                <div key={stage} className={`stage-word-${i} absolute font-space-grotesk font-bold text-[5rem] md:text-[8rem] lg:text-[10rem] uppercase tracking-tighter leading-none opacity-0 transform-origin-left`}>
                  {stage}
                </div>
             ))}
          </div>

          {/* Visualizations Foreground */}
          <div className="relative w-full lg:w-1/2 max-w-xl aspect-square md:aspect-video lg:aspect-square flex items-center justify-center">
            
            {/* FLY Vis */}
            <div className="stage-vis-0 absolute inset-0 flex items-center justify-center opacity-0 border border-current" style={{ borderColor: "var(--sys-text-muted)" }}>
               <div className="w-full h-[2px] bg-[#c91f2d] relative overflow-hidden opacity-50">
                 <div className="absolute top-0 left-0 h-full w-32 bg-white/50 blur-md animate-[slideRight_2s_ease-in-out_infinite]" />
               </div>
               <div className="absolute flex gap-8 md:gap-16 opacity-30">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-[1px] h-32 bg-current rotate-45" />)}
               </div>
            </div>

            {/* SENSE Vis */}
            <div className="stage-vis-1 absolute inset-0 border opacity-0 p-4 flex flex-col" style={{ borderColor: "var(--sys-text-muted)" }}>
               <div className="w-full flex justify-between font-technical text-[10px]" style={{ color: "var(--sys-text-muted)" }}>
                 <span>CAM_FEED_01</span>
                 <span className="text-[#c91f2d] animate-pulse">REC [•]</span>
               </div>
               <div className="flex-1 w-full mt-4 border relative overflow-hidden flex items-center justify-center" style={{ borderColor: "var(--sys-text-muted)" }}>
                 <div className="w-full h-[20%] bg-[#c91f2d]/20 absolute top-0 animate-[scanDown_3s_linear_infinite]" />
                 <div className="w-32 h-32 border rounded-full opacity-50" style={{ borderColor: "var(--sys-text)" }} />
                 <div className="w-48 h-48 border rounded-full absolute opacity-20" style={{ borderColor: "var(--sys-text)" }} />
               </div>
            </div>

            {/* MAP Vis */}
            <div className="stage-vis-2 absolute inset-0 opacity-0 flex items-center justify-center border" style={{ borderColor: "var(--sys-text-muted)" }}>
               <div className="grid grid-cols-8 grid-rows-8 w-full h-full gap-1 p-4">
                 {Array.from({length: 64}).map((_, i) => (
                   <div key={i} className="border transition-opacity duration-1000" style={{ borderColor: "var(--sys-text-muted)", opacity: Math.random() * 0.5 }} />
                 ))}
               </div>
               <div className="absolute w-32 h-32 border border-[#c91f2d] rounded-full animate-ping opacity-30" />
            </div>

            {/* PERCEIVE Vis */}
            <div className="stage-vis-3 absolute inset-0 opacity-0 flex items-center justify-center border" style={{ borderColor: "var(--sys-text-muted)" }}>
               <div className="relative w-full h-full">
                 <div className="absolute top-[20%] left-[20%] w-32 h-48 border-2 border-[#c91f2d] bg-[#c91f2d]/10 flex flex-col justify-end p-2">
                   <span className="font-technical text-[10px] text-[#050505] bg-[#c91f2d] px-1 w-fit">PERSON 98%</span>
                 </div>
                 <div className="absolute top-[50%] left-[50%] w-24 h-24 border-2 flex flex-col justify-end p-2 opacity-50" style={{ borderColor: "var(--sys-text-sec)" }}>
                   <span className="font-technical text-[10px] px-1 w-fit" style={{ backgroundColor: "var(--sys-text-sec)", color: "var(--sys-bg)" }}>OBSTACLE 85%</span>
                 </div>
               </div>
            </div>

            {/* LOCALIZE Vis */}
            <div className="stage-vis-4 absolute inset-0 opacity-0 flex items-center justify-center border" style={{ borderColor: "var(--sys-text-muted)" }}>
               <div className="w-full h-[1px] absolute opacity-30" style={{ backgroundColor: "var(--sys-text)" }} />
               <div className="h-full w-[1px] absolute opacity-30" style={{ backgroundColor: "var(--sys-text)" }} />
               <div className="w-16 h-16 border-2 border-[#c91f2d] rounded-full relative flex items-center justify-center">
                 <div className="w-2 h-2 bg-[#c91f2d] rounded-full animate-pulse" />
                 <div className="absolute -right-28 top-0 font-technical text-[10px] text-[#c91f2d]">
                   X: 45.231 <br/> Y: -12.441 <br/> Z: 2.100
                 </div>
               </div>
            </div>

            {/* NAVIGATE Vis */}
            <div className="stage-vis-5 absolute inset-0 opacity-0 flex items-center justify-center border" style={{ borderColor: "var(--sys-text-muted)" }}>
               <svg className="w-full h-full p-8" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M 0 50 Q 25 10 50 50 T 100 50" fill="none" stroke="var(--sys-text-muted)" strokeWidth="0.5" strokeDasharray="2 2" />
                 <path d="M 0 50 Q 25 10 50 50 T 100 50" fill="none" stroke="#c91f2d" strokeWidth="2" className="animate-[drawPath_3s_linear_infinite]" strokeDasharray="150" strokeDashoffset="150" />
                 <circle cx="50" cy="50" r="2" fill="#c91f2d" className="animate-pulse" />
               </svg>
            </div>

            {/* INFORM Vis */}
            <div className="stage-vis-6 absolute inset-0 opacity-0 flex items-center justify-center border" style={{ borderColor: "var(--sys-text-muted)" }}>
               <div className="border-l-2 border-[#c91f2d] pl-6 font-technical text-xs md:text-sm tracking-widest leading-loose flex flex-col w-3/4">
                 <span className="text-[#c91f2d] font-bold">INCIDENT REPORT</span>
                 <span><span style={{ color: "var(--sys-text-muted)" }}>STATUS:</span> LOCATED</span>
                 <span><span style={{ color: "var(--sys-text-muted)" }}>COORDS:</span> REQ-44-A</span>
                 <span><span style={{ color: "var(--sys-text-muted)" }}>ENV:</span> STABLE</span>
                 <div className="mt-4 w-full h-[1px]" style={{ backgroundColor: "var(--sys-text-muted)" }} />
                 <span className="mt-4 text-[10px]" style={{ color: "var(--sys-text-sec)" }}>AEROSAR COMMAND LINK ACTIVE</span>
               </div>
            </div>

          </div>

        </div>
      </div>

      {/* 4. THE SYSTEM THINKS IN LAYERS */}
      <div className="layers-phase h-[150vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <h2 className="layer-title font-space-grotesk text-3xl md:text-5xl uppercase tracking-tight mb-16">
          THE SYSTEM <br/>
          <span className="text-[#c91f2d]">THINKS IN LAYERS.</span>
        </h2>
        
        <div className="flex flex-col gap-4 font-space-grotesk text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight relative w-full items-center">
          <div className="layer-item layer-1">PERCEPTION</div>
          <div className="layer-item layer-2"><span className="text-[#c91f2d] opacity-50">+</span> SPATIAL UNDERSTANDING</div>
          <div className="layer-item layer-3"><span className="text-[#c91f2d] opacity-50">+</span> NAVIGATION</div>
          <div className="layer-item layer-4"><span className="text-[#c91f2d] opacity-50">+</span> INCIDENT INTELLIGENCE</div>
          
          <div className="layer-aerosar absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-6xl md:text-[8rem] lg:text-[10rem] text-[#c91f2d] opacity-0 tracking-tighter">
            AEROSAR
          </div>
        </div>
      </div>

      {/* 5. TRANSITION INTO TECHNOLOGY */}
      <div className="tech-transition min-h-[100vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="tech-text-1 font-technical text-[10px] md:text-sm tracking-[0.3em] uppercase mb-12 flex flex-col md:flex-row gap-4 md:gap-8" style={{ color: "var(--sys-text-muted)" }}>
          <span>ONE SYSTEM.</span>
          <span className="hidden md:block text-[#c91f2d]">/</span>
          <span>MULTIPLE LAYERS.</span>
          <span className="hidden md:block text-[#c91f2d]">/</span>
          <span>ONE MISSION.</span>
        </div>
        <h2 className="tech-text-2 font-space-grotesk text-5xl md:text-7xl lg:text-[8rem] uppercase tracking-tighter">
          MAP THE <span className="text-[#c91f2d]">UNKNOWN.</span>
        </h2>
      </div>

      {/* Custom Keyframes */}
      <style>{`
        @keyframes slideRight {
          0% { left: -100px; }
          100% { left: 100%; }
        }
        @keyframes scanDown {
          0% { top: 0; }
          50% { top: 80%; }
          100% { top: 0; }
        }
        @keyframes drawPath {
          0% { stroke-dashoffset: 150; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
};

export default SystemSection;
