import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SpatialSection = () => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);

  // Re-use theme definitions
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
    darkGrey: {
      "--sys-bg": "#151515",
      "--sys-text": "#F5F5F5",
      "--sys-text-sec": "#D6D6D6",
      "--sys-text-muted": "#A3A3A3",
    }
  };

  useEffect(() => {
    // Start with light theme from previous section
    gsap.set(containerRef.current, themes.light);

    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=12000",
          scrub: 1,
          pin: true,
        }
      });

      // ==========================================
      // PHASE 1: SECTION ENTRY
      // ==========================================
      tl.fromTo(".spatial-title-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(".spatial-label-1", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.5")
        .to({}, { duration: 1 })
        .to([".spatial-title-1", ".spatial-label-1"], { opacity: 0, y: -50, duration: 1 })
        
        .fromTo(".spatial-q1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to({}, { duration: 0.5 })
        .fromTo(".spatial-q2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to({}, { duration: 1 })
        .to([".spatial-q1", ".spatial-q2"], { opacity: 0, y: -50, duration: 1 });

      // ==========================================
      // PHASE 2 & 3: EMPTY ENV & LIDAR SCANNING
      // ==========================================
      tl.to(".map-container", { opacity: 1, duration: 1 })
        .fromTo(".drone-group", { x: 200, y: 800, opacity: 0 }, { opacity: 1, duration: 0.5 })
        .to(".drone-scan-cone", { opacity: 0.5, scale: 2, duration: 1 })
        
        // Drone moves up while scanning
        .to(".drone-group", { y: 600, duration: 2 }, "scan1")
        .to(".raw-points-1", { opacity: 1, duration: 1 }, "scan1")
        .to(".telemetry-data", { opacity: 1, duration: 0.5 }, "scan1")
        
        .to(".drone-group", { x: 500, duration: 2 }, "scan2")
        .to(".raw-points-2", { opacity: 1, duration: 1 }, "scan2")
        
        .to(".drone-group", { y: 300, duration: 2 }, "scan3")
        .to(".raw-points-3", { opacity: 1, duration: 1 }, "scan3");

      // ==========================================
      // PHASE 4: POINT CLOUD BUILD-UP
      // ==========================================
      tl.to(".map-geometry", { strokeDashoffset: 0, duration: 3 }, "buildMap")
        .to(".raw-points-all", { opacity: 0, duration: 2 }, "buildMap+=1")
        .to(".map-explored", { opacity: 0.1, duration: 2 }, "buildMap+=1");

      // ==========================================
      // PHASE 5: INTRODUCE SLAM
      // ==========================================
      tl.to(".telemetry-data", { opacity: 0, duration: 0.5 })
        .fromTo(".slam-title", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 })
        .fromTo(".slam-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
        .to({}, { duration: 1.5 })
        .to([".slam-title", ".slam-desc"], { opacity: 0, y: -50, duration: 1 });

      // Drone continues moving, drawing trajectory
      tl.to(".drone-group", { x: 800, y: 300, duration: 2 }, "slamMove")
        .to(".map-trajectory", { strokeDashoffset: 0, duration: 2 }, "slamMove")
        .fromTo(".map-labels", { opacity: 0 }, { opacity: 1, duration: 1 }, "slamMove+=1")
        .to({}, { duration: 1 });

      // ==========================================
      // PHASE 7: TWO-LAYER EXPLANATION (SPLIT SCREEN)
      // ==========================================
      tl.to(".split-line", { height: "100%", duration: 1 }, "split")
        .to(".split-text-left", { opacity: 1, x: 0, duration: 1 }, "split")
        .to(".split-text-right", { opacity: 1, x: 0, duration: 1 }, "split")
        .to(".raw-points-all", { opacity: 1, duration: 1 }, "split") // Show points on left
        // Simulate split visually by shifting the map container slightly or using clip paths
        .to(".map-svg", { x: "-10%", duration: 2 }, "split")
        .to(".drone-scan-cone", { opacity: 1, duration: 1 }, "split")
        
        .fromTo(".split-connector", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 })
        .to({}, { duration: 2 })
        
        .to([".split-line", ".split-text-left", ".split-text-right", ".split-connector"], { opacity: 0, duration: 1 })
        .to(".map-svg", { x: "0%", duration: 1 }, "unsplit")
        .to(".raw-points-all", { opacity: 0, duration: 1 }, "unsplit");

      // ==========================================
      // PHASE 8: IMU CONNECTION & ARCHITECTURE
      // ==========================================
      tl.fromTo(".flow-diagram", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to({}, { duration: 2 })
        .to(".flow-diagram", { opacity: 0, y: -50, duration: 1 });

      // ==========================================
      // PHASE 9: GPS-DENIED CONTEXT
      // ==========================================
      tl.to(containerRef.current, { ...themes.darkGrey, duration: 1.5 }, "gpsDenied")
        .to(".map-geometry", { stroke: "#333", duration: 1.5 }, "gpsDenied") // Dim the map
        
        .fromTo(".gps-1", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 })
        .to({}, { duration: 1 })
        .fromTo(".gps-2", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(".gps-3", { opacity: 0 }, { opacity: 1, duration: 1 })
        .to({}, { duration: 2 })
        .to([".gps-1", ".gps-2", ".gps-3"], { opacity: 0, y: -50, duration: 1 });

      // ==========================================
      // PHASE 10: MAP + POSE
      // ==========================================
      tl.fromTo(".equation-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        // Drone moves one last time in the dark
        .to(".drone-group", { y: 150, x: 700, duration: 2 }, "finalMove")
        .to(".drone-scan-cone", { rotation: -45, transformOrigin: "center", duration: 2 }, "finalMove")
        .to({}, { duration: 1.5 })
        .to(".equation-text", { opacity: 0, duration: 1 });

      // ==========================================
      // PHASE 11: PREPARE FOR NEXT SECTION
      // ==========================================
      tl.fromTo(".final-q1", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
        .to({}, { duration: 0.5 })
        .to(".final-q1", { opacity: 0, y: -20, duration: 1 })
        
        .fromTo(".final-q2", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
        
        // Detection box appears over drone
        .fromTo(".detection-box", { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 1 }, "detection")
        
        .to(".final-q2", { opacity: 0, y: -20, duration: 1 })
        
        .fromTo(".final-state-1", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
        .to({}, { duration: 0.5 })
        .fromTo(".final-state-2", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
        
        .to({}, { duration: 1.5 });

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
        "--sys-bg": "#ffffff",
        "--sys-text": "#050505",
        "--sys-text-sec": "#262626",
        "--sys-text-muted": "#666666"
      }}
    >
      <div ref={pinRef} className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden">
        
        {/* =========================================
            BACKGROUND MAP VISUALIZATION
        ========================================= */}
        <div className="map-container absolute inset-0 opacity-0 pointer-events-none flex items-center justify-center p-4 md:p-12">
          <div className="relative w-full h-full max-w-6xl mx-auto border border-[var(--sys-text-muted)] border-opacity-20 flex items-center justify-center">
            
            {/* The SVG Technical Map */}
            <svg className="map-svg w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet">
              
              {/* Very faint background grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--sys-text-muted)" strokeWidth="0.5" opacity="0.2" />
                </pattern>
                
                {/* Drone Scan Cone Gradient */}
                <radialGradient id="scanGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#c91f2d" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#c91f2d" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="1000" height="1000" fill="url(#grid)" />

              {/* Explored Region Fill (appears later) */}
              <path className="map-explored opacity-0" d="M 150,850 L 250,850 L 250,550 L 550,550 L 550,250 L 850,250 L 850,350 L 750,350 L 750,650 L 450,650 L 450,850 Z" fill="var(--sys-text)" />

              {/* Raw Points (Scattered) */}
              <g fill="#c91f2d" opacity="0.5">
                {/* Cluster 1 */}
                <g className="raw-points-1 raw-points-all opacity-0">
                  {Array.from({length: 50}).map((_, i) => <circle key={`p1-${i}`} cx={150 + Math.random()*150} cy={700 + Math.random()*150} r="1.5" />)}
                </g>
                {/* Cluster 2 */}
                <g className="raw-points-2 raw-points-all opacity-0">
                  {Array.from({length: 50}).map((_, i) => <circle key={`p2-${i}`} cx={350 + Math.random()*200} cy={500 + Math.random()*150} r="1.5" />)}
                </g>
                {/* Cluster 3 */}
                <g className="raw-points-3 raw-points-all opacity-0">
                  {Array.from({length: 50}).map((_, i) => <circle key={`p3-${i}`} cx={550 + Math.random()*300} cy={200 + Math.random()*200} r="1.5" />)}
                </g>
              </g>

              {/* Structural Geometry (Walls) - Drawn with dashoffset */}
              <path className="map-geometry" d="M 150,850 L 150,700 L 250,700 L 250,550 L 550,550 L 550,250 L 850,250 L 850,350 L 750,350 L 750,650 L 450,650 L 450,850 Z M 200,800 L 250,800 M 350,600 L 450,600" fill="none" stroke="var(--sys-text)" strokeWidth="2" strokeDasharray="4000" strokeDashoffset="4000" />

              {/* Trajectory */}
              <path className="map-trajectory" d="M 200,800 L 200,600 L 500,600 L 500,300 L 800,300" fill="none" stroke="#c91f2d" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" />

              {/* Drone Marker */}
              <g className="drone-group">
                <circle cx="0" cy="0" r="100" fill="url(#scanGradient)" className="drone-scan-cone opacity-0" />
                <circle cx="0" cy="0" r="6" fill="#c91f2d" />
                <circle cx="0" cy="0" r="12" fill="none" stroke="#c91f2d" strokeWidth="1" className="animate-ping" />
              </g>
              
              {/* Labels on Map */}
              <g className="map-labels opacity-0 font-technical text-[12px]" fill="var(--sys-text-sec)">
                <text x="160" y="840">LOCAL MAP</text>
                <text x="215" y="805" fill="#c91f2d">POSE</text>
                <text x="210" y="700">TRAJECTORY</text>
                <text x="600" y="400" fill="var(--sys-text-muted)">EXPLORED</text>
                <text x="800" y="700" fill="var(--sys-text-muted)">UNKNOWN</text>
              </g>

            </svg>
            
            {/* Telemetry UI Overlay */}
            <div className="telemetry-data absolute bottom-6 left-6 font-technical text-[10px] md:text-xs opacity-0 flex flex-col gap-1" style={{ color: "var(--sys-text-sec)" }}>
              <span className="text-[#c91f2d] font-bold">LIDAR / DEPTH SENSOR</span>
              <span className="animate-pulse">SCAN ACTIVE [•]</span>
              <span>RANGE: LOCAL</span>
              <span>POINTS: <span className="text-[var(--sys-text)]">02481</span></span>
            </div>

            {/* Detection Box (Final Transition) */}
            <div className="detection-box absolute w-32 h-32 border-2 border-[#c91f2d] opacity-0 pointer-events-none" style={{ top: '15%', right: '25%' }}>
               <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#c91f2d]" />
               <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#c91f2d]" />
               <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#c91f2d]" />
               <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#c91f2d]" />
               <span className="absolute -bottom-6 left-0 font-technical text-[10px] text-[#050505] bg-[#c91f2d] px-1">OBJECT DETECTED</span>
            </div>

          </div>
        </div>


        {/* =========================================
            FOREGROUND TYPOGRAPHY & STORYTELLING
        ========================================= */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center px-6 text-center">
          
          {/* Phase 1: Entry */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="spatial-title-1 font-space-grotesk font-bold text-5xl md:text-7xl lg:text-[8rem] uppercase tracking-tighter absolute">
              MAP THE <span className="text-[#c91f2d]">UNKNOWN.</span>
            </h2>
            <div className="spatial-label-1 font-technical text-xs md:text-sm tracking-[0.2em] uppercase absolute mt-32 md:mt-48" style={{ color: "var(--sys-text-muted)" }}>
              SPATIAL UNDERSTANDING / 02
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="spatial-q1 font-space-grotesk text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight absolute">
              WHERE AM I?
            </h3>
            <h3 className="spatial-q2 font-space-grotesk text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight absolute mt-24 md:mt-32" style={{ color: "var(--sys-text-sec)" }}>
              WHAT DOES THE SPACE LOOK LIKE?
            </h3>
          </div>

          {/* Phase 5: SLAM Intro */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="slam-title font-space-grotesk font-bold text-[6rem] md:text-[10rem] lg:text-[14rem] uppercase tracking-tighter absolute opacity-0">
              SLAM
            </h2>
            <div className="slam-desc font-space-grotesk text-xl md:text-3xl tracking-wide uppercase absolute mt-40 md:mt-56 opacity-0" style={{ color: "var(--sys-text-sec)" }}>
              SIMULTANEOUS LOCALIZATION AND MAPPING
            </div>
          </div>

          {/* Phase 7: Split Screen Explanation */}
          <div className="absolute inset-0 flex items-center justify-center w-full max-w-6xl mx-auto">
            <div className="split-line absolute w-[1px] h-0 bg-[#c91f2d]" />
            <div className="split-text-left absolute left-4 md:left-12 text-left opacity-0 -translate-x-10">
               <div className="font-space-grotesk text-2xl md:text-4xl uppercase mb-2">WHAT THE SENSORS SEE</div>
               <div className="font-technical text-[10px] md:text-xs tracking-widest uppercase" style={{ color: "var(--sys-text-muted)" }}>
                 RAW SPATIAL INFORMATION <br/> LIDAR POINTS
               </div>
            </div>
            <div className="split-text-right absolute right-4 md:right-12 text-right opacity-0 translate-x-10">
               <div className="font-space-grotesk text-2xl md:text-4xl uppercase mb-2">WHAT AEROSAR UNDERSTANDS</div>
               <div className="font-technical text-[10px] md:text-xs tracking-widest uppercase" style={{ color: "var(--sys-text-muted)" }}>
                 LOCAL MAP <br/> ESTIMATED POSE
               </div>
            </div>
            <div className="split-connector absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--sys-bg)] px-4 py-2 font-technical text-xs tracking-[0.2em] uppercase border border-[#c91f2d] opacity-0 text-[#c91f2d] font-bold">
              SENSE → UNDERSTAND
            </div>
          </div>

          {/* Phase 8: IMU Diagram */}
          <div className="flow-diagram absolute inset-0 flex flex-col items-center justify-center font-technical text-sm md:text-lg tracking-[0.2em] uppercase opacity-0 gap-4">
             <div className="flex gap-8 items-center border border-[var(--sys-text-muted)] p-4 bg-[var(--sys-bg)]">
                <span>LIDAR / DEPTH</span>
                <span className="text-[#c91f2d]">+</span>
                <span>IMU</span>
             </div>
             <div className="h-8 w-[1px] bg-[var(--sys-text-muted)]" />
             <div className="border border-[#c91f2d] p-4 font-bold bg-[var(--sys-bg)]">SLAM</div>
             <div className="h-8 w-[1px] bg-[var(--sys-text-muted)]" />
             <div className="border border-[var(--sys-text-muted)] p-4 bg-[var(--sys-bg)]">
                LOCAL MAP <span className="text-[#c91f2d]">+</span> POSE
             </div>
          </div>

          {/* Phase 9: GPS Denied */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="gps-1 font-space-grotesk font-bold text-6xl md:text-[8rem] uppercase tracking-tighter absolute text-aerosar-white opacity-0">
              NO GPS.
            </h2>
            <h2 className="gps-2 font-space-grotesk font-bold text-6xl md:text-[8rem] uppercase tracking-tighter absolute text-aerosar-white mt-32 md:mt-48 opacity-0">
              STILL A MAP.
            </h2>
            <div className="gps-3 font-technical text-xs tracking-widest uppercase absolute mt-64 md:mt-80 opacity-0" style={{ color: "var(--sys-text-muted)" }}>
              LOCALIZATION IS BUILT FROM THE ENVIRONMENT ITSELF.
            </div>
          </div>

          {/* Phase 10: Map + Pose */}
          <div className="equation-text absolute inset-0 flex flex-col items-center justify-center font-space-grotesk text-3xl md:text-5xl uppercase tracking-tight opacity-0">
            <div>LOCAL MAP</div>
            <div className="text-[#c91f2d] my-2">*</div>
            <div>AEROSAR POSE</div>
            <div className="text-[#c91f2d] my-2">*</div>
            <div>SENSOR DATA</div>
            <div className="w-12 h-[2px] bg-current my-6" />
            <div className="font-bold">SPATIAL UNDERSTANDING</div>
          </div>

          {/* Phase 11: Final Transition */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <div className="final-q1 font-space-grotesk text-4xl md:text-6xl uppercase tracking-tight absolute opacity-0" style={{ color: "var(--sys-text-muted)" }}>
               WHERE AM I?
             </div>
             <div className="final-q2 font-space-grotesk text-4xl md:text-6xl uppercase tracking-tight absolute opacity-0 text-[#c91f2d] font-bold">
               WHAT IS THERE?
             </div>
          </div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
             <div className="final-state-1 font-space-grotesk text-2xl md:text-4xl uppercase tracking-tight absolute opacity-0 -mt-12" style={{ color: "var(--sys-text-sec)" }}>
               FIRST, AEROSAR UNDERSTANDS THE SPACE.
             </div>
             <div className="final-state-2 font-space-grotesk text-3xl md:text-5xl uppercase tracking-tight absolute opacity-0 mt-12 font-bold">
               NEXT, IT UNDERSTANDS <span className="text-[#c91f2d]">WHAT IS INSIDE IT.</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SpatialSection;
