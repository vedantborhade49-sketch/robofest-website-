import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PerceptionSection = () => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);

  // Inherit the theme variables approach
  const themes = {
    dark: {
      "--sys-bg": "#050505",
      "--sys-text": "#F5F5F5",
      "--sys-text-sec": "#D6D6D6",
      "--sys-text-muted": "#A3A3A3",
    }
  };

  useEffect(() => {
    gsap.set(containerRef.current, themes.dark);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=15000", // Extremely tall for pacing
          scrub: 1,
          pin: true,
        }
      });

      // ==========================================
      // PHASE 1: SECTION ENTRY
      // ==========================================
      tl.fromTo(".entry-text-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(".entry-label-1", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.5")
        .to({}, { duration: 1 })
        .to([".entry-text-1", ".entry-label-1"], { opacity: 0, y: -50, duration: 1 })
        
        .fromTo(".entry-text-2", { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1 })
        .to({}, { duration: 1 })
        .to(".entry-text-2", { opacity: 0, scale: 1.1, duration: 1 });

      // ==========================================
      // PHASE 2 & 3: CAMERA VIEW & DETECTION
      // ==========================================
      tl.fromTo(".camera-container", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 })
        .fromTo(".cam-label-raw", { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .to({}, { duration: 1 })
        
        // Scan effect
        .to(".cam-scan-line", { top: "100%", duration: 2, ease: "linear" })
        .to(".cam-label-raw", { opacity: 0, duration: 0.5 }, "-=1.5")
        
        // Detection appears
        .fromTo(".cam-bbox-person", { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.5 })
        .fromTo(".cam-label-detection", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "<")
        .to({}, { duration: 1 })
        
        .to(".cam-label-detection", { opacity: 0, duration: 0.5 })
        .fromTo(".cam-label-understanding", { opacity: 0 }, { opacity: 1, duration: 0.5 })
        .to({}, { duration: 1 });

      // ==========================================
      // PHASE 5: YOLO INTRO
      // ==========================================
      tl.to([".camera-container"], { opacity: 0.2, scale: 0.9, duration: 1 })
        .fromTo(".yolo-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to({}, { duration: 1 })
        
        // Pipeline flow
        .fromTo(".yolo-flow-1", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 })
        .fromTo(".yolo-flow-2", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 })
        .fromTo(".yolo-flow-3", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 })
        .to({}, { duration: 1.5 })
        
        .to([".yolo-title", ".yolo-flow-group"], { opacity: 0, y: -50, duration: 1 });

      // ==========================================
      // PHASE 6: MULTIPLE OBJECTS (Current vs Future)
      // ==========================================
      tl.to(".camera-container", { opacity: 1, scale: 1, duration: 1 })
        .fromTo(".extensions-panel", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1 })
        .to({}, { duration: 2 })
        .to(".extensions-panel", { opacity: 0, x: 50, duration: 1 });

      // ==========================================
      // PHASE 8 & 10: CONNECT VISION TO MAP
      // ==========================================
      // Camera shrinks to top left
      tl.to(".camera-container", { 
          width: "30%", 
          height: "30%", 
          top: "10%", 
          left: "10%", 
          x: 0, 
          y: 0, 
          transform: "none", 
          duration: 1.5 
        })
        .fromTo(".map-container", { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1.5 }, "<")
        .fromTo(".connect-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .to({}, { duration: 1 })
        
        // Animate line from camera detection to map coordinate
        .to(".connect-line", { strokeDashoffset: 0, duration: 1 })
        .fromTo(".map-target-marker", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5 })
        .fromTo(".target-coords", { opacity: 0 }, { opacity: 1, duration: 0.5 })
        
        .to({}, { duration: 2 })
        .to([".connect-title", ".connect-line", ".target-coords", ".camera-container"], { opacity: 0, duration: 1 });

      // ==========================================
      // PHASE 9: SPATIAL + SEMANTIC SPLIT
      // ==========================================
      tl.to(".map-container", { opacity: 0.2, duration: 1 })
        .fromTo(".split-spatial", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 })
        .fromTo(".split-semantic", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1 }, "<")
        .to({}, { duration: 1 })
        
        // Merge
        .to([".split-spatial", ".split-semantic"], { opacity: 0, scale: 0.8, duration: 1 })
        .fromTo(".split-merge", { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 1 })
        .to({}, { duration: 1 })
        .to(".split-merge", { opacity: 0, y: -50, duration: 1 });

      // ==========================================
      // PHASE 11: CAMERA + SLAM + DEPTH ARCHITECTURE
      // ==========================================
      tl.fromTo(".arch-group", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to({}, { duration: 1.5 })
        .to(".arch-group", { opacity: 0, scale: 0.8, duration: 1 })
        .to(".map-container", { opacity: 0.8, duration: 1 }, "<");

      // ==========================================
      // PHASE 12: THE IMPORTANT TRANSFORMATION
      // ==========================================
      const thoughts = [".thought-1", ".thought-2", ".thought-3", ".thought-4"];
      thoughts.forEach((thought, i) => {
        tl.fromTo(thought, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
          .to({}, { duration: 1 });
        if (i < thoughts.length - 1) {
          tl.to(thought, { opacity: 0.2, y: -20, duration: 1 });
        }
      });
      tl.to(thoughts, { opacity: 0, duration: 1 });

      // ==========================================
      // PHASE 13 & 14: FINAL TRANSITION
      // ==========================================
      tl.fromTo(".final-1", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 })
        .to({}, { duration: 1 })
        .fromTo(".final-2", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
        .to({}, { duration: 1 })
        .to([".final-1", ".final-2"], { opacity: 0, duration: 1 })
        
        .fromTo(".final-3", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .to(".final-4", { opacity: 1, duration: 1 }) // "TO INCIDENT INTELLIGENCE"
        .to({}, { duration: 1 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full z-20 overflow-hidden"
      style={{ 
        backgroundColor: "var(--sys-bg)",
        color: "var(--sys-text)"
      }}
    >
      <div ref={pinRef} className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden">
        
        {/* =========================================
            BACKGROUND MAP & CAMERA VISUALIZATIONS
        ========================================= */}
        
        {/* 1. Camera Frame Container */}
        <div className="camera-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-5xl aspect-video border border-[var(--sys-text-muted)] border-opacity-30 flex items-center justify-center bg-[#111] opacity-0 overflow-hidden z-20">
          
          <div className="absolute top-4 left-4 font-technical text-[10px] text-aerosar-red flex flex-col">
            <span>AEROSAR / VISION FEED</span>
            <span className="text-[var(--sys-text-sec)]">FRAME 004821</span>
          </div>

          {/* Simulated Raw Image (SVG Scene) */}
          <svg className="w-full h-full opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
             {/* Floor/walls perspective lines */}
             <path d="M 0,100 L 40,60 L 60,60 L 100,100 M 40,60 L 40,0 M 60,60 L 60,0" fill="none" stroke="var(--sys-text-muted)" strokeWidth="0.5" opacity="0.3" />
             {/* Abstract Person Silhouette */}
             <path d="M 48,50 C 48,47 52,47 52,50 L 52,60 L 48,60 Z M 49,43 A 1.5 1.5 0 1 1 51,43 A 1.5 1.5 0 1 1 49,43" fill="var(--sys-text-muted)" opacity="0.5" />
          </svg>

          {/* Scanning Effect */}
          <div className="cam-scan-line absolute top-0 left-0 w-full h-[2px] bg-aerosar-red shadow-[0_0_15px_rgba(201,31,45,0.8)]" />

          {/* Detection Bounding Box */}
          <div className="cam-bbox-person absolute w-[8%] h-[25%] border-2 border-aerosar-red opacity-0" style={{ top: "40%", left: "46%" }}>
             <div className="absolute -top-5 left-[-2px] bg-aerosar-red text-[#050505] font-technical text-[8px] px-1 whitespace-nowrap">
               PERSON 94%
             </div>
          </div>

          {/* Central Transform Labels */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h3 className="cam-label-raw font-space-grotesk text-3xl md:text-5xl tracking-widest uppercase opacity-0 text-[var(--sys-text-sec)]">RAW FRAME</h3>
            <h3 className="cam-label-detection font-space-grotesk text-3xl md:text-5xl tracking-widest uppercase opacity-0 text-aerosar-red font-bold">DETECTION</h3>
            <h3 className="cam-label-understanding font-space-grotesk text-3xl md:text-5xl tracking-widest uppercase opacity-0 text-[var(--sys-text)] font-bold">UNDERSTANDING</h3>
          </div>
        </div>

        {/* 2. Future Extensions Panel (Phase 6) */}
        <div className="extensions-panel absolute right-8 top-1/2 -translate-y-1/2 border border-[var(--sys-text-muted)] bg-[var(--sys-bg)] p-6 z-30 opacity-0 flex flex-col gap-6">
          <div>
            <div className="font-technical text-[10px] text-[var(--sys-text-muted)] mb-2">CURRENT DEMONSTRATION</div>
            <div className="text-aerosar-red font-bold font-technical text-xs flex items-center gap-2">
              <div className="w-2 h-2 bg-aerosar-red rounded-full animate-pulse" /> PERSON DETECTION
            </div>
          </div>
          <div className="w-full h-[1px] bg-[var(--sys-text-muted)] opacity-30" />
          <div>
            <div className="font-technical text-[10px] text-[var(--sys-text-muted)] mb-2">FUTURE EXTENSIONS</div>
            <div className="flex flex-col gap-2 font-technical text-xs text-[var(--sys-text-sec)] opacity-50">
              <span>FIRE</span>
              <span>SMOKE</span>
              <span>BLOCKED AREA</span>
            </div>
          </div>
        </div>

        {/* 3. Local Map Container (Brought back from Step 5) */}
        <div className="map-container absolute inset-0 opacity-0 pointer-events-none flex items-center justify-center p-4 md:p-12 z-10">
          <div className="relative w-full h-full max-w-6xl mx-auto border border-[var(--sys-text-muted)] border-opacity-20 flex items-center justify-center">
            
            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
              <path className="map-explored opacity-20" d="M 150,850 L 250,850 L 250,550 L 550,550 L 550,250 L 850,250 L 850,350 L 750,350 L 750,650 L 450,650 L 450,850 Z" fill="var(--sys-text-muted)" />
              <path className="map-geometry" d="M 150,850 L 150,700 L 250,700 L 250,550 L 550,550 L 550,250 L 850,250 L 850,350 L 750,350 L 750,650 L 450,650 L 450,850 Z" fill="none" stroke="var(--sys-text-sec)" strokeWidth="2" opacity="0.5" />
              <path className="map-trajectory" d="M 200,800 L 200,600 L 500,600 L 500,300 L 800,300" fill="none" stroke="var(--sys-text-muted)" strokeWidth="1" strokeDasharray="5 5" />
              
              {/* Drone Pose */}
              <circle cx="800" cy="300" r="4" fill="var(--sys-text-muted)" />

              {/* Target Localization Marker */}
              <g className="map-target-marker opacity-0" transform="translate(650, 250)">
                 <circle cx="0" cy="0" r="15" fill="none" stroke="aerosar-red" strokeWidth="2" className="animate-ping" />
                 <circle cx="0" cy="0" r="4" fill="#c91f2d" />
                 <path d="M 0,-20 L 0,-8 M 0,20 L 0,8 M -20,0 L -8,0 M 20,0 L 8,0" stroke="#c91f2d" strokeWidth="2" />
              </g>

              {/* Connection Line from Camera (Top Left 10%) to Map Marker */}
              <path className="connect-line" d="M 250,250 L 650,250" fill="none" stroke="#c91f2d" strokeWidth="1" strokeDasharray="10 5" strokeDashoffset="400" />
            </svg>

            {/* Target Coordinates Overlay */}
            <div className="target-coords absolute opacity-0 font-technical text-[10px] md:text-xs text-aerosar-red" style={{ top: "26%", left: "67%" }}>
              TARGET COORDINATES <br/>
              <span className="text-[var(--sys-text-sec)]">LOCAL FRAME</span><br/>
              X: 04.82 <br/>
              Y: 07.31 <br/>
              Z: 02.14
            </div>
          </div>
        </div>


        {/* =========================================
            TYPOGRAPHY & STORY LAYERS
        ========================================= */}
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center px-6 text-center">
          
          {/* Phase 1: Entry */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="entry-text-1 font-space-grotesk font-bold text-5xl md:text-7xl lg:text-[8rem] uppercase tracking-tighter absolute">
              WHAT IS <span className="text-aerosar-red">THERE?</span>
            </h2>
            <div className="entry-label-1 font-technical text-xs md:text-sm tracking-[0.2em] uppercase absolute mt-32 md:mt-48 text-[var(--sys-text-muted)]">
              COMPUTER VISION / PERCEPTION
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="entry-text-2 font-space-grotesk font-bold text-4xl md:text-6xl lg:text-[7rem] uppercase tracking-tighter absolute">
              SEE. <span className="text-[var(--sys-text-sec)]">DETECT.</span> <span className="text-aerosar-red">UNDERSTAND.</span>
            </h2>
          </div>

          {/* Phase 5: YOLO */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="yolo-title font-space-grotesk font-bold text-6xl md:text-8xl lg:text-[10rem] uppercase tracking-tighter absolute -mt-32">
              YOLO
            </div>
            <div className="yolo-flow-group absolute mt-32 flex flex-col items-center gap-4 font-technical text-xs md:text-sm tracking-widest uppercase">
              <div className="yolo-flow-1 border border-[var(--sys-text-muted)] px-4 py-2">INPUT <span className="text-[var(--sys-text-muted)] ml-2">CAMERA FRAME</span></div>
              <div className="yolo-flow-2 text-aerosar-red">↓</div>
              <div className="yolo-flow-2 border border-aerosar-red px-4 py-2 bg-aerosar-red/10">INFERENCE <span className="text-[var(--sys-text-muted)] ml-2">DETECTION MODEL</span></div>
              <div className="yolo-flow-3 text-aerosar-red">↓</div>
              <div className="yolo-flow-3 border border-[var(--sys-text-muted)] px-4 py-2">OUTPUT <span className="text-[var(--sys-text-muted)] ml-2">DETECTED OBJECTS</span></div>
            </div>
          </div>

          {/* Phase 8/10 Title */}
          <div className="absolute inset-0 flex flex-col items-start justify-end pb-24 pl-12">
             <div className="connect-title font-space-grotesk font-bold text-4xl md:text-6xl uppercase tracking-tighter opacity-0 text-left">
               FROM DETECTION <br/> <span className="text-aerosar-red">TO LOCATION.</span>
             </div>
          </div>

          {/* Phase 9: Split Semantic/Spatial */}
          <div className="absolute inset-0 flex flex-row items-center justify-center w-full max-w-5xl mx-auto">
            <div className="split-spatial flex-1 text-right pr-8 md:pr-16 border-r border-aerosar-red opacity-0">
               <div className="font-space-grotesk text-3xl md:text-5xl font-bold uppercase mb-4 text-[var(--sys-text)]">SPATIAL</div>
               <div className="font-technical text-xs md:text-sm tracking-widest text-[var(--sys-text-sec)] flex flex-col gap-2">
                 <span>SLAM</span>
                 <span>LOCAL MAP</span>
                 <span>POSE</span>
               </div>
            </div>
            <div className="split-semantic flex-1 text-left pl-8 md:pl-16 opacity-0">
               <div className="font-space-grotesk text-3xl md:text-5xl font-bold uppercase mb-4 text-aerosar-red">SEMANTIC</div>
               <div className="font-technical text-xs md:text-sm tracking-widest text-[var(--sys-text-sec)] flex flex-col gap-2">
                 <span>COMPUTER VISION</span>
                 <span>OBJECT</span>
                 <span>CONFIDENCE</span>
               </div>
            </div>
            
            <div className="split-merge absolute font-space-grotesk text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter opacity-0">
              <span className="text-[var(--sys-text)]">SPATIAL</span> <span className="text-[var(--sys-text-muted)]">+</span> <span className="text-aerosar-red">SEMANTIC</span> <br/>
              <span className="text-3xl md:text-5xl text-[var(--sys-text-sec)]">↓</span> <br/>
              ACTIONABLE INFORMATION
            </div>
          </div>

          {/* Phase 11: Convergence Architecture */}
          <div className="arch-group absolute inset-0 flex flex-col items-center justify-center opacity-0 font-space-grotesk text-3xl md:text-5xl uppercase font-bold tracking-tight">
             <div>CAMERA</div>
             <div className="text-aerosar-red my-2">*</div>
             <div>SLAM POSE</div>
             <div className="text-aerosar-red my-2">*</div>
             <div>LIDAR / DEPTH</div>
             <div className="w-12 h-[2px] bg-aerosar-red my-6" />
             <div className="text-aerosar-red">TARGET LOCALIZATION</div>
          </div>

          {/* Phase 12: The Transformation Thoughts */}
          <div className="absolute inset-0 flex flex-col items-center justify-center font-space-grotesk font-bold text-5xl md:text-7xl lg:text-[8rem] uppercase tracking-tighter leading-none">
             <div className="thought-1 absolute opacity-0">I SEE <span className="text-[var(--sys-text-muted)]">SOMETHING.</span></div>
             <div className="thought-2 absolute opacity-0 mt-32 md:mt-48">I KNOW <span className="text-[var(--sys-text-muted)]">WHAT IT IS.</span></div>
             <div className="thought-3 absolute opacity-0 mt-64 md:mt-96">I KNOW <span className="text-aerosar-red">WHERE IT IS.</span></div>
             <div className="thought-4 absolute opacity-0 mt-96 md:mt-[32rem]">I CAN <span className="text-[var(--sys-text-sec)]">REPORT IT.</span></div>
          </div>

          {/* Phase 14: Final Transition */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <h2 className="final-1 font-space-grotesk font-bold text-5xl md:text-7xl uppercase tracking-tighter absolute text-[var(--sys-text)] opacity-0">
               SEEING IS NOT ENOUGH.
             </h2>
             <h2 className="final-2 font-space-grotesk font-bold text-4xl md:text-6xl uppercase tracking-tighter absolute mt-32 md:mt-48 text-aerosar-red opacity-0">
               THE SYSTEM MUST KNOW <br/> WHERE IT SAW IT.
             </h2>
             
             <div className="final-3 font-space-grotesk text-3xl md:text-5xl uppercase tracking-tight absolute opacity-0 text-[var(--sys-text-sec)]">
               FROM PERCEPTION
             </div>
             <div className="final-4 font-space-grotesk text-4xl md:text-6xl uppercase tracking-tight absolute mt-24 opacity-0 font-bold text-aerosar-white">
               TO <span className="text-aerosar-red">INCIDENT INTELLIGENCE.</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PerceptionSection;
