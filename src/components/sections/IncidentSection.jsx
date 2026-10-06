import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, MapPin, Database, Search, Layers, CheckCircle2, AlertTriangle, Activity, Crosshair } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const IncidentSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. ENTRY SEQUENCE
      const entryTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".incident-entry-trigger",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      });
      entryTimeline
        .fromTo(".entry-text-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0 })
        .to(".entry-text-1", { opacity: 0.3, y: -50 })
        .fromTo(".entry-text-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0 })
        .fromTo(".entry-label", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }, "-=0.5");

      // 2 & 3. DETECTION & EVENT FORMATION
      const formationTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".event-formation-trigger",
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        }
      });
      formationTimeline
        .fromTo(".raw-detection", { opacity: 0, x: -50 }, { opacity: 1, x: 0 })
        .fromTo(".conn-1", { scaleY: 0 }, { scaleY: 1 })
        .fromTo(".validation-step", { opacity: 0 }, { opacity: 1 })
        .fromTo(".conn-2", { scaleY: 0 }, { scaleY: 1 })
        .fromTo(".event-step", { opacity: 0, scale: 0.9, color: "#F5F5F5" }, { opacity: 1, scale: 1, color: "#E32636" });

      // 4. INCIDENT STRUCTURE
      const structureTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".incident-structure-trigger",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        }
      });
      structureTimeline
        .fromTo(".structure-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
        .fromTo(".incident-prop", { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1 });

      // 5 & 6. MAP + INCIDENT & EVIDENCE
      const mapTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".map-incident-trigger",
          start: "top 70%",
          end: "bottom 20%",
          scrub: 1,
        }
      });
      mapTimeline
        .fromTo(".map-container", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 })
        .fromTo(".incident-marker", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, ease: "back.out(1.7)" })
        .fromTo(".map-statement-1", { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
        .fromTo(".map-statement-2", { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
        .fromTo(".evidence-box", { opacity: 0, x: 50 }, { opacity: 1, x: 0 }, "+=0.5");

      // 7. LIFECYCLE
      const lifecycleTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".lifecycle-trigger",
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1,
        }
      });
      lifecycleTimeline
        .fromTo(".lifecycle-step", { opacity: 0.2 }, { opacity: 1, stagger: 0.5 })
        .to(".lifecycle-step.active-step", { color: "#E32636", textShadow: "0 0 10px rgba(227, 38, 54, 0.5)" }, "+=0.5");

      // 8. MULTIPLE INCIDENTS
      gsap.fromTo(".multi-marker", 
        { opacity: 0, scale: 0 },
        { 
          opacity: 1, 
          scale: 1, 
          stagger: 0.3,
          scrollTrigger: {
            trigger: ".multiple-incidents-trigger",
            start: "top 60%",
            end: "center center",
            scrub: 1,
          }
        }
      );

      // 9 & 10. MISSION MEMORY & WHY MATTERS
      const databaseTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".database-trigger",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        }
      });
      databaseTimeline
        .fromTo(".db-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
        .fromTo(".db-flow-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.2 })
        .fromTo(".db-tree", { opacity: 0, x: -30 }, { opacity: 1, x: 0 }, "+=0.5")
        .fromTo(".matter-statement-1", { opacity: 0 }, { opacity: 1 }, "+=0.5")
        .fromTo(".matter-statement-2", { opacity: 0 }, { opacity: 1 }, "+=0.5")
        .fromTo(".matter-statement-3", { opacity: 0, scale: 0.9, color: "#E32636" }, { opacity: 1, scale: 1 });

      // 11. PIPELINE
      const pipelineTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".pipeline-trigger",
          start: "top 80%",
          end: "bottom 40%",
          scrub: 1,
        }
      });
      pipelineTimeline
        .fromTo(".pipe-node", { opacity: 0, y: -20 }, { opacity: 1, y: 0, stagger: 0.2 })
        .fromTo(".human-supervised", { opacity: 0 }, { opacity: 1 }, "+=0.5");

      // 12 & 17. RAG TRANSITION
      const ragTransitionTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".rag-transition-trigger",
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1,
        }
      });
      ragTransitionTimeline
        .fromTo(".rag-q1", { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
        .fromTo(".rag-q2", { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, "+=0.2")
        .fromTo(".rag-q3", { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, "+=0.2")
        .fromTo(".rag-pulse-box", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 })
        .fromTo(".rag-pulse-ring", { scale: 0.8, opacity: 0 }, { scale: 1.5, opacity: 0, duration: 2, repeat: -1 }, "+=0.5")
        .fromTo(".rag-final-statement", { opacity: 0, y: 50 }, { opacity: 1, y: 0 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-aerosar-black text-aerosar-white relative z-10 overflow-hidden pt-32 pb-48">
      
      {/* 1. ENTRY */}
      <div className="incident-entry-trigger min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-5xl mx-auto">
        <h2 className="entry-text-1 font-space-grotesk text-4xl md:text-6xl lg:text-7xl mb-12 uppercase">
          A DETECTION IS <span className="text-aerosar-red">NOT</span> AN INCIDENT.
        </h2>
        <h3 className="entry-text-2 font-space-grotesk text-3xl md:text-5xl text-aerosar-white-secondary mb-16 uppercase">
          THE SYSTEM HAS TO UNDERSTAND THE EVENT.
        </h3>
        <div className="entry-label inline-flex items-center gap-3 px-6 py-3 border border-aerosar-grey-industrial bg-aerosar-black-secondary rounded-full">
          <Activity className="w-5 h-5 text-aerosar-red" />
          <span className="font-technical text-aerosar-grey-light tracking-[0.2em]">INCIDENT ENGINE / EVENT PROCESSING</span>
        </div>
      </div>

      {/* 2 & 3. EVENT FORMATION */}
      <div className="event-formation-trigger min-h-screen flex flex-col justify-center items-center px-6">
        <div className="flex flex-col items-center max-w-md w-full">
          {/* Raw Detection Stream */}
          <div className="raw-detection w-full border border-aerosar-grey-industrial bg-[#0a0a0a] p-6 text-left mb-8 rounded shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-aerosar-grey-mid"></div>
            <p className="font-technical text-aerosar-grey-mid mb-4">RAW STREAM ///</p>
            <pre className="font-technical text-sm text-aerosar-white-secondary leading-relaxed">
              VISION EVENT<br/>
              PERSON DETECTED<br/>
              CONFIDENCE 0.94<br/>
              LOCATION AVAILABLE<br/>
              TIMESTAMP: 14:02:44
            </pre>
          </div>

          {/* Transformation Pipeline */}
          <div className="flex flex-col items-center w-full font-technical text-center">
            <div className="py-4 px-8 border border-aerosar-grey-dark bg-aerosar-black-secondary tracking-widest text-aerosar-white-secondary">
              DETECTION
            </div>
            <div className="conn-1 w-px h-12 bg-aerosar-grey-industrial origin-top"></div>
            <div className="validation-step py-4 px-8 border border-aerosar-grey-dark bg-aerosar-black-secondary tracking-widest text-aerosar-grey-light">
              VALIDATION
            </div>
            <div className="conn-2 w-px h-12 bg-aerosar-grey-industrial origin-top"></div>
            <div className="event-step py-4 px-8 border border-aerosar-red bg-[#1a0507] tracking-[0.2em] font-bold">
              EVENT
            </div>
          </div>
        </div>
      </div>

      {/* 4. INCIDENT STRUCTURE */}
      <div className="incident-structure-trigger min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-6xl mx-auto">
        <h2 className="structure-title font-space-grotesk text-4xl md:text-6xl mb-24 uppercase">
          TURNING OBSERVATIONS INTO <span className="text-aerosar-red">INCIDENTS.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full items-center text-left">
          <div className="font-technical space-y-6 text-lg tracking-widest text-aerosar-grey-mid border-l border-aerosar-grey-industrial pl-8">
            {['INCIDENT ID', 'TYPE', 'LOCATION', 'CONFIDENCE', 'TIMESTAMP', 'EVIDENCE', 'STATUS'].map((prop, i) => (
              <div key={i} className="incident-prop">{prop}</div>
            ))}
          </div>
          
          <div className="incident-prop w-full border border-aerosar-grey-industrial bg-aerosar-black-secondary p-8 font-technical text-sm">
            <div className="text-aerosar-red mb-6 pb-4 border-b border-aerosar-grey-dark text-lg tracking-widest">
              INCIDENT-0042
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-aerosar-grey-mid block mb-1">TYPE</span>
                <span className="text-aerosar-white">PERSON DETECTED</span>
              </div>
              <div>
                <span className="text-aerosar-grey-mid block mb-1">LOCATION</span>
                <span className="text-aerosar-white">LOCAL FRAME / X: 04.82 / Y: 07.31</span>
              </div>
              <div>
                <span className="text-aerosar-grey-mid block mb-1">CONFIDENCE</span>
                <span className="text-aerosar-white">0.94</span>
              </div>
              <div>
                <span className="text-aerosar-grey-mid block mb-1">STATUS</span>
                <span className="text-aerosar-red animate-pulse">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 & 6. MAP + INCIDENT & EVIDENCE */}
      <div className="map-incident-trigger min-h-screen flex flex-col justify-center items-center px-6 max-w-7xl mx-auto relative">
        <div className="text-center mb-16 z-20">
          <h3 className="map-statement-1 font-space-grotesk text-3xl md:text-5xl mb-4">AN INCIDENT IS NOT JUST A LABEL.</h3>
          <h3 className="map-statement-2 font-space-grotesk text-3xl md:text-5xl text-aerosar-red">IT HAS A PLACE IN THE ENVIRONMENT.</h3>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* Abstract Map UI */}
          <div className="map-container relative w-full lg:w-1/2 aspect-square max-h-[600px] border border-aerosar-grey-industrial bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
            {/* Grid overlay */}
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#171717 1px, transparent 1px), linear-gradient(90deg, #171717 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }}></div>
            
            {/* UAV Position */}
            <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-50">
              <Crosshair className="w-8 h-8 text-aerosar-white" />
              <span className="font-technical text-xs text-aerosar-grey-mid">AEROSAR</span>
            </div>

            {/* Trajectory */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 33 50 Q 50 30 70 40" fill="none" stroke="#666666" strokeWidth="0.5" strokeDasharray="2 2" />
            </svg>

            {/* Incident Marker */}
            <div className="incident-marker absolute top-[40%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative">
                <MapPin className="w-10 h-10 text-aerosar-red relative z-10" />
                <div className="absolute inset-0 bg-aerosar-red rounded-full animate-ping opacity-20 z-0 scale-150"></div>
              </div>
              <span className="font-technical text-xs text-aerosar-red mt-2 bg-aerosar-black px-2 py-1 border border-aerosar-red">INC-0042</span>
            </div>
          </div>

          {/* Evidence Assembly */}
          <div className="evidence-box w-full lg:w-1/3 border border-aerosar-grey-dark bg-aerosar-black-secondary p-8 flex flex-col gap-6">
            <h4 className="font-technical text-aerosar-grey-mid tracking-widest border-b border-aerosar-grey-dark pb-4">EVIDENCE COMPILATION</h4>
            <div className="font-technical text-sm text-aerosar-white-secondary space-y-4">
              <div className="flex justify-between items-center"><span className="text-aerosar-grey-light">CAMERA FRAME</span> <CheckCircle2 className="w-4 h-4 text-aerosar-grey-mid"/></div>
              <div className="text-center text-aerosar-grey-dark">+</div>
              <div className="flex justify-between items-center"><span className="text-aerosar-grey-light">TARGET LOCATION</span> <CheckCircle2 className="w-4 h-4 text-aerosar-grey-mid"/></div>
              <div className="text-center text-aerosar-grey-dark">+</div>
              <div className="flex justify-between items-center"><span className="text-aerosar-grey-light">TIMESTAMP</span> <CheckCircle2 className="w-4 h-4 text-aerosar-grey-mid"/></div>
              <div className="text-center text-aerosar-grey-dark">+</div>
              <div className="flex justify-between items-center"><span className="text-aerosar-grey-light">CONFIDENCE</span> <CheckCircle2 className="w-4 h-4 text-aerosar-grey-mid"/></div>
              
              <div className="w-full h-px bg-aerosar-grey-industrial my-4"></div>
              
              <div className="flex items-center gap-3 text-aerosar-white tracking-widest font-bold">
                <Layers className="w-5 h-5 text-aerosar-red"/>
                INCIDENT EVIDENCE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7 & 8. LIFECYCLE & MULTIPLE INCIDENTS */}
      <div className="lifecycle-trigger min-h-screen flex flex-col justify-center items-center px-6 max-w-6xl mx-auto">
        
        <div className="w-full flex justify-between items-center font-technical tracking-[0.2em] text-sm md:text-lg mb-32 overflow-hidden border-y border-aerosar-grey-industrial py-8">
          <div className="lifecycle-step text-aerosar-grey-mid">DETECTED</div>
          <div className="text-aerosar-grey-dark">→</div>
          <div className="lifecycle-step text-aerosar-grey-mid">LOCALIZED</div>
          <div className="text-aerosar-grey-dark">→</div>
          <div className="lifecycle-step text-aerosar-grey-mid">RECORDED</div>
          <div className="text-aerosar-grey-dark">→</div>
          <div className="lifecycle-step active-step text-aerosar-white">ACTIVE</div>
          <div className="text-aerosar-grey-dark">→</div>
          <div className="lifecycle-step text-aerosar-grey-mid">REVIEWED</div>
        </div>

        <div className="multiple-incidents-trigger w-full relative h-[400px] border border-aerosar-grey-industrial bg-[#080808] flex items-center justify-center overflow-hidden">
           {/* Grid overlay */}
           <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#171717 1px, transparent 1px), linear-gradient(90deg, #171717 1px, transparent 1px)', backgroundSize: '60px 60px', opacity: 0.3 }}></div>
           
           <div className="multi-marker absolute top-1/4 left-1/4 flex items-center gap-3 bg-aerosar-black/80 px-4 py-2 border border-aerosar-grey-dark backdrop-blur-sm">
             <Target className="w-4 h-4 text-aerosar-grey-light" />
             <span className="font-technical text-xs text-aerosar-white">INC-01: PERSON</span>
           </div>

           <div className="multi-marker absolute bottom-1/3 left-1/2 flex items-center gap-3 bg-aerosar-black/80 px-4 py-2 border border-aerosar-red backdrop-blur-sm">
             <AlertTriangle className="w-4 h-4 text-aerosar-red" />
             <span className="font-technical text-xs text-aerosar-red">INC-02: OBSTRUCTION</span>
           </div>

           <div className="multi-marker absolute top-1/3 right-1/4 flex items-center gap-3 bg-aerosar-black/80 px-4 py-2 border border-aerosar-grey-dark backdrop-blur-sm">
             <Search className="w-4 h-4 text-aerosar-grey-light" />
             <span className="font-technical text-xs text-aerosar-grey-mid">INC-03: UNKNOWN</span>
           </div>
        </div>
      </div>

      {/* 9 & 10. MISSION MEMORY & WHY MATTERS */}
      <div className="database-trigger min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-5xl mx-auto">
        <h2 className="db-title font-space-grotesk text-4xl md:text-6xl mb-24 uppercase">
          EVERY OBSERVATION BECOMES <span className="text-aerosar-red">CONTEXT.</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-16 md:gap-32 w-full justify-center text-left mb-32">
          
          <div className="flex flex-col gap-6 font-technical tracking-widest">
            <div className="db-flow-item text-aerosar-grey-light">OBSERVATION</div>
            <div className="db-flow-item text-aerosar-grey-dark">↓</div>
            <div className="db-flow-item text-aerosar-white">INCIDENT</div>
            <div className="db-flow-item text-aerosar-grey-dark">↓</div>
            <div className="db-flow-item text-aerosar-red font-bold">DATABASE</div>
            <div className="db-flow-item text-aerosar-grey-dark">↓</div>
            <div className="db-flow-item text-aerosar-white">MISSION CONTEXT</div>
          </div>

          <div className="db-tree border-l border-aerosar-grey-industrial pl-8 font-technical text-sm text-aerosar-grey-mid space-y-4">
            <div className="text-aerosar-white mb-6 font-bold tracking-widest"><Database className="inline w-4 h-4 mr-2"/> MISSION 07</div>
            <div> ├─ INCIDENT 001 <span className="text-aerosar-grey-dark ml-2">[SAVED]</span></div>
            <div> ├─ INCIDENT 002 <span className="text-aerosar-grey-dark ml-2">[SAVED]</span></div>
            <div> ├─ INCIDENT 003 <span className="text-aerosar-grey-dark ml-2">[SAVED]</span></div>
            <div className="text-aerosar-red"> └─ INCIDENT 004 <span className="text-aerosar-red ml-2">[ACTIVE]</span></div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <h3 className="matter-statement-1 font-space-grotesk text-2xl md:text-4xl text-aerosar-grey-light">ONE DETECTION TELLS YOU WHAT HAPPENED.</h3>
          <h3 className="matter-statement-2 font-space-grotesk text-2xl md:text-4xl text-aerosar-white-secondary">A MISSION RECORD TELLS YOU WHAT HAS BEEN OBSERVED.</h3>
          <h2 className="matter-statement-3 font-space-grotesk text-4xl md:text-6xl text-aerosar-red mt-8 uppercase font-bold">CONTEXT CHANGES THE RESPONSE.</h2>
        </div>
      </div>

      {/* 11. PIPELINE */}
      <div className="pipeline-trigger min-h-screen flex flex-col justify-center items-center px-6 max-w-7xl mx-auto">
        <h3 className="font-technical text-aerosar-grey-mid tracking-widest mb-16 uppercase">INCIDENT INTELLIGENCE PIPELINE</h3>
        
        <div className="w-full flex flex-wrap justify-center items-center gap-4 font-technical text-xs md:text-sm tracking-widest">
          {['UAV', 'DETECTION', 'TARGET COORDINATES', 'INCIDENT DATABASE', 'RAG RETRIEVAL', 'CONTEXT', 'LLM', 'HUMAN-READABLE REPORT'].map((node, i, arr) => (
            <React.Fragment key={i}>
              <div className={`pipe-node py-3 px-4 border ${i === arr.length - 1 ? 'border-aerosar-red bg-[#1a0507] text-aerosar-red font-bold' : 'border-aerosar-grey-dark bg-aerosar-black-secondary text-aerosar-grey-light'}`}>
                {node}
              </div>
              {i < arr.length - 1 && (
                <div className="pipe-node text-aerosar-grey-dark">→</div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 16. HUMAN SUPERVISION */}
        <div className="human-supervised mt-32 text-center border-t border-aerosar-grey-industrial pt-12 w-full max-w-3xl">
          <h4 className="font-space-grotesk text-2xl md:text-3xl text-aerosar-white mb-4">INTELLIGENCE SUPPORTS THE OPERATOR.</h4>
          <p className="font-technical text-aerosar-grey-mid tracking-widest text-sm leading-relaxed">
            FINAL RESCUE DECISIONS REMAIN HUMAN-SUPERVISED.<br/>
            THE SYSTEM DOES NOT AUTONOMOUSLY DIRECT RESCUE TEAMS.
          </p>
        </div>
      </div>

      {/* 12 & 17. RAG TRANSITION */}
      <div className="rag-transition-trigger min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-5xl mx-auto pb-32">
        <div className="mb-24 space-y-6">
          <h3 className="rag-q1 font-space-grotesk text-3xl md:text-5xl text-aerosar-white uppercase">WHAT DOES THIS INCIDENT MEAN IN CONTEXT?</h3>
          <h4 className="rag-q2 font-space-grotesk text-2xl md:text-4xl text-aerosar-grey-light uppercase">THE SYSTEM ALREADY HAS THE OBSERVATION.</h4>
          <h4 className="rag-q3 font-space-grotesk text-2xl md:text-4xl text-aerosar-red uppercase">NOW IT NEEDS THE CONTEXT.</h4>
        </div>

        <div className="flex flex-col items-center gap-8 font-technical tracking-widest text-sm relative mb-32">
          <div className="py-4 px-8 border border-aerosar-grey-dark text-aerosar-white">INCIDENT</div>
          <div className="text-aerosar-grey-dark">↓</div>
          
          <div className="rag-pulse-box relative py-4 px-8 border border-aerosar-red text-aerosar-red bg-[#1a0507] z-10 flex items-center gap-3">
            <Search className="w-4 h-4" />
            RETRIEVE RELEVANT CONTEXT
            <div className="rag-pulse-ring absolute inset-0 border border-aerosar-red rounded"></div>
          </div>
          
          <div className="text-aerosar-grey-dark">↓</div>
          <div className="py-4 px-8 border border-aerosar-grey-dark text-aerosar-white">CONTEXT</div>
        </div>

        <h2 className="rag-final-statement font-space-grotesk text-4xl md:text-6xl text-aerosar-white uppercase max-w-4xl leading-tight">
          WHAT IF THE SYSTEM COULD <span className="text-aerosar-red border-b-2 border-aerosar-red pb-2">SEARCH</span> EVERYTHING IT HAS LEARNED?
        </h2>
      </div>

    </section>
  );
};

export default IncidentSection;
