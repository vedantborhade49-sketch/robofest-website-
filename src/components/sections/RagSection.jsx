import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Database, FileText, Cpu, Network, MapPin, Eye, FileBox, ShieldAlert, Crosshair, ArrowRight, Activity, HardDrive, Layers, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const RagSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1 & 2. ENTRY & QUESTION
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".rag-entry-trigger",
          start: "top 60%",
          end: "bottom 30%",
          scrub: 1,
        }
      });
      entryTl
        .fromTo(".entry-statement-1", { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
        .to(".entry-statement-1", { opacity: 0.3, y: -20 }, "+=0.5")
        .fromTo(".entry-statement-2", { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
        .fromTo(".rag-label", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }, "+=0.2")
        .fromTo(".entry-statement-3", { opacity: 0, y: 30, color: "#F5F5F5" }, { opacity: 1, y: 0, color: "#E32636" }, "+=0.5")
        .fromTo(".incident-card", { opacity: 0, x: -30 }, { opacity: 1, x: 0 }, "+=0.5")
        .fromTo(".question-statement", { opacity: 0, x: 30 }, { opacity: 1, x: 0 });

      // 3. INCIDENT -> QUERY
      const queryTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".query-trigger",
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1,
        }
      });
      queryTl
        .fromTo(".incident-block", { opacity: 0, y: -20 }, { opacity: 1, y: 0 })
        .fromTo(".q-arrow-1", { opacity: 0, height: 0 }, { opacity: 1, height: 40 })
        .fromTo(".query-block", { opacity: 0, scale: 0.9, borderColor: "#666666" }, { opacity: 1, scale: 1, borderColor: "#E32636" })
        .fromTo(".q-arrow-2", { opacity: 0, height: 0 }, { opacity: 1, height: 40 })
        .fromTo(".retrieve-block", { opacity: 0, y: 20 }, { opacity: 1, y: 0 });

      // 4, 5, 6. KNOWLEDGE BASE & RETRIEVAL
      const kbTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".kb-trigger",
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1,
        }
      });
      
      // Reveal nodes
      kbTl.fromTo(".kb-node", { opacity: 0, scale: 0 }, { opacity: 0.3, scale: 1, stagger: 0.1 });
      
      // Query enters
      kbTl.fromTo(".kb-query", { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, "+=0.5");
      
      // Highlight relevant, fade irrelevant
      kbTl.to(".kb-node.relevant", { opacity: 1, borderColor: "#E32636", color: "#F5F5F5", scale: 1.1, stagger: 0.2 }, "+=0.5");
      kbTl.to(".kb-node.irrelevant", { opacity: 0.1, scale: 0.9 }, "<");
      
      // Assembly lines
      kbTl.fromTo(".assembly-line", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, stagger: 0.1 }, "+=0.5");
      kbTl.fromTo(".retrieved-context-center", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, ease: "back.out(1.5)" });

      // 7. CONTEXT ASSEMBLY
      const assemblyTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".assembly-trigger",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        }
      });
      assemblyTl
        .fromTo(".assembly-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.2 })
        .fromTo(".assembly-arrow", { opacity: 0 }, { opacity: 1, stagger: 0.2 }, "<0.1")
        .fromTo(".final-context", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, borderColor: "#E32636", boxShadow: "0 0 20px rgba(227,38,54,0.2)" }, "+=0.5");

      // 8. EDITORIAL SEQUENCE
      const editorialTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".editorial-trigger",
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        }
      });
      editorialTl
        .fromTo(".ed-1", { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
        .fromTo(".ed-1", { opacity: 1 }, { opacity: 0.3 }, "+=0.5")
        .fromTo(".ed-2", { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
        .fromTo(".ed-2", { opacity: 1 }, { opacity: 0.3 }, "+=0.5")
        .fromTo(".ed-3", { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
        .fromTo(".ed-3", { opacity: 1 }, { opacity: 0.3 }, "+=0.5")
        .fromTo(".ed-4", { opacity: 0, y: 20, color: "#F5F5F5" }, { opacity: 1, y: 0, color: "#E32636" });

      // 9. SPATIAL CONTEXT
      const spatialTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".spatial-trigger",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        }
      });
      spatialTl
        .fromTo(".spatial-map", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 })
        .fromTo(".spatial-step", { opacity: 0, x: 30 }, { opacity: 1, x: 0, stagger: 0.3 });

      // 10. MISSION MEMORY
      const memoryTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".memory-trigger",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        }
      });
      memoryTl
        .fromTo(".memory-title", { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
        .fromTo(".obs-item", { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1 })
        .fromTo(".mem-arrow-1", { opacity: 0 }, { opacity: 1 })
        .fromTo(".mem-knowledge", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 })
        .fromTo(".mem-current", { opacity: 0, x: 20 }, { opacity: 1, x: 0 }, "+=0.5")
        .fromTo(".mem-arrow-2", { opacity: 0 }, { opacity: 1 })
        .fromTo(".mem-retrieve", { opacity: 0, backgroundColor: "#171717" }, { opacity: 1, backgroundColor: "#1a0507", borderColor: "#E32636" })
        .fromTo(".mem-arrow-3", { opacity: 0 }, { opacity: 1 })
        .fromTo(".mem-history", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 });

      // 12 & 13. COMPRESSION & GROUNDING
      const compressTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".compress-trigger",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        }
      });
      compressTl
        .fromTo(".compress-wide", { opacity: 0, width: "0%" }, { opacity: 1, width: "100%" })
        .fromTo(".compress-arrow-1", { opacity: 0 }, { opacity: 1 })
        .fromTo(".compress-narrow", { opacity: 0, width: "0%" }, { opacity: 1, width: "30%", backgroundColor: "#E32636" })
        .fromTo(".compress-arrow-2", { opacity: 0 }, { opacity: 1 })
        .fromTo(".compress-llm", { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
        .fromTo(".grounding-1", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, "+=0.5")
        .fromTo(".grounding-2", { opacity: 0, y: 20 }, { opacity: 1, y: 0 });

      // 15. FULL PIPELINE
      const pipeFullTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".pipe-full-trigger",
          start: "top 60%",
          end: "bottom 10%",
          scrub: 1,
        }
      });
      pipeFullTl
        .fromTo(".full-pipe-node", { opacity: 0.2 }, { opacity: 1, color: "#E32636", borderColor: "#E32636", stagger: 0.2 })
        .to(".full-pipe-node", { color: "#A3A3A3", borderColor: "#262626", stagger: 0.2 }, 0.2); // Reset previously active

      // 16 & 17. FINAL RAG STATEMENT & LLM TRANSITION
      const finalTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".rag-final-trigger",
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1,
        }
      });
      finalTl
        .fromTo(".final-1", { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
        .to(".final-1", { opacity: 0.3 }, "+=0.5")
        .fromTo(".final-2", { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
        .fromTo(".final-3", { opacity: 0, y: 30, color: "#F5F5F5" }, { opacity: 1, y: 0, color: "#E32636" }, "+=0.5")
        .fromTo(".report-preview", { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, "+=0.5")
        .fromTo(".final-4", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 }, "+=0.5");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-aerosar-black text-aerosar-white relative z-10 overflow-hidden pt-32 pb-48">
      
      {/* 1 & 2. ENTRY & QUESTION */}
      <div className="rag-entry-trigger min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-6xl mx-auto">
        <div className="mb-24">
          <h3 className="entry-statement-1 font-space-grotesk text-3xl md:text-5xl text-aerosar-grey-light uppercase mb-6">
            THE SYSTEM HAS THE INCIDENT.
          </h3>
          <h3 className="entry-statement-2 font-space-grotesk text-3xl md:text-5xl text-aerosar-white uppercase mb-12">
            NOW IT NEEDS CONTEXT.
          </h3>
          <div className="rag-label inline-flex items-center gap-3 px-6 py-3 border border-aerosar-red bg-[#1a0507] rounded-full mb-12">
            <Search className="w-5 h-5 text-aerosar-red" />
            <span className="font-technical text-aerosar-red tracking-[0.2em]">RAG / CONTEXTUAL INCIDENT INTELLIGENCE</span>
          </div>
          <h2 className="entry-statement-3 font-space-grotesk text-5xl md:text-7xl uppercase font-bold tracking-tight">
            RETRIEVE WHAT MATTERS.
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 w-full justify-center text-left">
          <div className="incident-card w-full lg:w-1/3 border border-aerosar-grey-industrial bg-aerosar-black-secondary p-8 font-technical text-sm text-aerosar-grey-light space-y-4">
            <div className="text-aerosar-white pb-4 border-b border-aerosar-grey-dark text-lg tracking-widest">INCIDENT-0042</div>
            <div>PERSON DETECTED</div>
            <div>LOCATION<br/><span className="text-aerosar-white">LOCAL FRAME</span></div>
            <div>CONFIDENCE<br/><span className="text-aerosar-white">0.94</span></div>
            <div>TIME<br/><span className="text-aerosar-white">14:32:18</span></div>
          </div>
          
          <h2 className="question-statement font-space-grotesk text-4xl md:text-6xl text-aerosar-white uppercase leading-tight lg:w-1/2">
            WHAT DO WE <br/><span className="text-aerosar-red">KNOW</span> ABOUT THIS INCIDENT?
          </h2>
        </div>
      </div>

      {/* 3. INCIDENT -> QUERY */}
      <div className="query-trigger min-h-screen flex flex-col justify-center items-center px-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center font-technical tracking-widest">
          <div className="incident-block py-4 px-8 border border-aerosar-grey-dark bg-aerosar-black-secondary text-aerosar-white">
            INCIDENT
          </div>
          <div className="q-arrow-1 w-px bg-aerosar-grey-industrial"></div>
          
          <div className="query-block p-6 border border-aerosar-grey-industrial bg-[#0a0a0a] text-left min-w-[300px]">
            <div className="text-aerosar-red mb-4 border-b border-aerosar-grey-dark pb-2 font-bold">QUERY</div>
            <div className="text-xs text-aerosar-white-secondary space-y-2">
              <div><span className="text-aerosar-grey-mid">TARGET:</span> PERSON</div>
              <div><span className="text-aerosar-grey-mid">LOCATION:</span> LOCAL MAP</div>
              <div><span className="text-aerosar-grey-mid">MISSION:</span> 07</div>
              <div><span className="text-aerosar-grey-mid">EVENT:</span> 0042</div>
            </div>
          </div>
          
          <div className="q-arrow-2 w-px bg-aerosar-grey-industrial"></div>
          <div className="retrieve-block py-4 px-8 border border-aerosar-red bg-[#1a0507] text-aerosar-red font-bold animate-pulse">
            RETRIEVE RELEVANT INFORMATION
          </div>
        </div>
      </div>

      {/* 4, 5, 6. KNOWLEDGE BASE & RETRIEVAL */}
      <div className="kb-trigger min-h-[120vh] flex flex-col justify-center items-center px-6 max-w-7xl mx-auto relative">
        <h3 className="font-space-grotesk text-2xl md:text-4xl text-aerosar-grey-mid mb-24 text-center uppercase">
          THE SYSTEM HAS MORE INFORMATION THAN THE CURRENT INCIDENT ALONE.
        </h3>

        <div className="relative w-full h-[600px] border border-aerosar-grey-industrial bg-[#050505] overflow-hidden flex items-center justify-center">
          {/* Conceptual nodes */}
          <div className="absolute inset-0">
             {/* Irrelevant Nodes */}
             <div className="kb-node irrelevant absolute top-[10%] left-[10%] p-4 border border-aerosar-grey-dark font-technical text-xs text-aerosar-grey-mid bg-aerosar-black-secondary flex items-center gap-2">
               <Database className="w-4 h-4"/> OTHER MISSION DATA
             </div>
             <div className="kb-node irrelevant absolute bottom-[20%] right-[15%] p-4 border border-aerosar-grey-dark font-technical text-xs text-aerosar-grey-mid bg-aerosar-black-secondary flex items-center gap-2">
               <ShieldAlert className="w-4 h-4"/> UNRELATED EVENT
             </div>
             <div className="kb-node irrelevant absolute top-[40%] right-[10%] p-4 border border-aerosar-grey-dark font-technical text-xs text-aerosar-grey-mid bg-aerosar-black-secondary flex items-center gap-2">
               <Activity className="w-4 h-4"/> DRONE TELEMETRY
             </div>
             <div className="kb-node irrelevant absolute bottom-[10%] left-[20%] p-4 border border-aerosar-grey-dark font-technical text-xs text-aerosar-grey-mid bg-aerosar-black-secondary flex items-center gap-2">
               <MapPin className="w-4 h-4"/> SECTOR 9 LAYOUT
             </div>

             {/* Relevant Nodes */}
             <div className="kb-node relevant absolute top-[20%] left-[40%] p-4 border border-aerosar-grey-industrial font-technical text-xs text-aerosar-grey-light bg-[#0a0a0a] flex items-center gap-2 z-10 transform -translate-x-1/2">
               <Database className="w-4 h-4"/> MISSION 07 HISTORY
             </div>
             <div className="kb-node relevant absolute bottom-[30%] left-[30%] p-4 border border-aerosar-grey-industrial font-technical text-xs text-aerosar-grey-light bg-[#0a0a0a] flex items-center gap-2 z-10 transform -translate-x-1/2">
               <MapPin className="w-4 h-4"/> LOCATION HISTORY
             </div>
             <div className="kb-node relevant absolute top-[30%] right-[30%] p-4 border border-aerosar-grey-industrial font-technical text-xs text-aerosar-grey-light bg-[#0a0a0a] flex items-center gap-2 z-10 transform translate-x-1/2">
               <Eye className="w-4 h-4"/> PREVIOUS OBSERVATION
             </div>
             <div className="kb-node relevant absolute bottom-[20%] right-[40%] p-4 border border-aerosar-grey-industrial font-technical text-xs text-aerosar-grey-light bg-[#0a0a0a] flex items-center gap-2 z-10 transform translate-x-1/2">
               <FileText className="w-4 h-4"/> RESPONSE PROCEDURE
             </div>
          </div>

          {/* Central Query / Retrieval Area */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="kb-query py-2 px-6 border border-aerosar-red bg-[#1a0507] font-technical text-aerosar-red tracking-widest mb-12 flex items-center gap-2">
              <Search className="w-4 h-4" /> QUERY
            </div>
            
            <div className="relative flex items-center justify-center">
              {/* Assembly lines pointing to center */}
              <div className="assembly-line absolute -top-16 -left-16 w-16 h-px bg-aerosar-red transform rotate-45 origin-bottom-right"></div>
              <div className="assembly-line absolute -bottom-16 -left-16 w-16 h-px bg-aerosar-red transform -rotate-45 origin-top-right"></div>
              <div className="assembly-line absolute -top-16 -right-16 w-16 h-px bg-aerosar-red transform -rotate-45 origin-bottom-left"></div>
              <div className="assembly-line absolute -bottom-16 -right-16 w-16 h-px bg-aerosar-red transform rotate-45 origin-top-left"></div>
              
              <div className="retrieved-context-center py-6 px-10 border-2 border-aerosar-red bg-[#050505] font-technical tracking-widest text-aerosar-white shadow-[0_0_30px_rgba(227,38,54,0.3)]">
                RETRIEVED CONTEXT
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 font-technical tracking-widest text-sm text-aerosar-grey-mid uppercase flex flex-col items-center">
           <div>QUERY</div>
           <div className="text-aerosar-grey-dark my-1">↓</div>
           <div>SEARCH</div>
           <div className="text-aerosar-grey-dark my-1">↓</div>
           <div className="text-aerosar-red">RELEVANT CONTEXT</div>
        </div>
      </div>

      {/* 7. CONTEXT ASSEMBLY */}
      <div className="assembly-trigger min-h-screen flex flex-col justify-center items-center px-6 max-w-4xl mx-auto">
        <div className="flex flex-col items-center font-technical tracking-widest text-sm w-full">
          <div className="assembly-item w-full max-w-sm py-4 px-6 border border-aerosar-grey-dark bg-aerosar-black-secondary text-center text-aerosar-white">
            CURRENT INCIDENT
          </div>
          <div className="assembly-arrow py-3 text-aerosar-grey-dark">+</div>
          <div className="assembly-item w-full max-w-sm py-4 px-6 border border-aerosar-grey-dark bg-aerosar-black-secondary text-center text-aerosar-grey-light">
            PREVIOUS OBSERVATION
          </div>
          <div className="assembly-arrow py-3 text-aerosar-grey-dark">+</div>
          <div className="assembly-item w-full max-w-sm py-4 px-6 border border-aerosar-grey-dark bg-aerosar-black-secondary text-center text-aerosar-grey-light">
            LOCATION CONTEXT
          </div>
          <div className="assembly-arrow py-3 text-aerosar-grey-dark">+</div>
          <div className="assembly-item w-full max-w-sm py-4 px-6 border border-aerosar-grey-dark bg-aerosar-black-secondary text-center text-aerosar-grey-light">
            RELEVANT PROCEDURE
          </div>
          <div className="assembly-arrow py-4 text-aerosar-grey-dark">↓</div>
          <div className="final-context w-full max-w-md py-6 px-8 border border-aerosar-grey-industrial bg-[#0a0a0a] text-center text-aerosar-white text-lg font-bold flex flex-col items-center gap-3">
            <Layers className="w-6 h-6 text-aerosar-red" />
            CONTEXT
          </div>
        </div>
      </div>

      {/* 8. EDITORIAL SEQUENCE */}
      <div className="editorial-trigger min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-5xl mx-auto space-y-16">
        <h2 className="ed-1 font-space-grotesk text-3xl md:text-5xl text-aerosar-white uppercase">
          THE INCIDENT IS THE QUESTION.
        </h2>
        <div className="text-aerosar-grey-dark font-technical">↓</div>
        <h2 className="ed-2 font-space-grotesk text-3xl md:text-5xl text-aerosar-white uppercase">
          THE KNOWLEDGE BASE IS THE MEMORY.
        </h2>
        <div className="text-aerosar-grey-dark font-technical">↓</div>
        <h2 className="ed-3 font-space-grotesk text-3xl md:text-5xl text-aerosar-white uppercase">
          RETRIEVAL FINDS WHAT MATTERS.
        </h2>
        <div className="text-aerosar-grey-dark font-technical">↓</div>
        <h2 className="ed-4 font-space-grotesk text-4xl md:text-6xl text-aerosar-red uppercase font-bold">
          CONTEXT GIVES THE INCIDENT MEANING.
        </h2>
      </div>

      {/* 9. SPATIAL CONTEXT */}
      <div className="spatial-trigger min-h-screen flex flex-col lg:flex-row justify-center items-center px-6 gap-16 max-w-7xl mx-auto">
        <div className="spatial-map relative w-full lg:w-1/2 aspect-square border border-aerosar-grey-industrial bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#171717 1px, transparent 1px), linear-gradient(90deg, #171717 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }}></div>
          <div className="absolute top-[40%] left-[60%] flex flex-col items-center">
            <div className="relative">
              <MapPin className="w-10 h-10 text-aerosar-red relative z-10" />
              <div className="absolute inset-0 bg-aerosar-red rounded-full animate-ping opacity-20 scale-150"></div>
            </div>
            <span className="font-technical text-xs text-aerosar-red mt-2 bg-aerosar-black px-2 py-1 border border-aerosar-red">INCIDENT LOCATION</span>
          </div>
          {/* Previous observation faint marker */}
          <div className="absolute top-[30%] left-[40%] flex flex-col items-center opacity-40">
            <MapPin className="w-6 h-6 text-aerosar-grey-light" />
            <span className="font-technical text-[10px] text-aerosar-grey-light mt-1 bg-aerosar-black px-1 border border-aerosar-grey-dark">PREV OBS</span>
          </div>
        </div>

        <div className="font-technical tracking-widest text-sm flex flex-col gap-6 lg:w-1/3">
          <div className="spatial-step p-4 border border-aerosar-grey-dark text-aerosar-grey-light">LOCAL AREA</div>
          <div className="spatial-step text-aerosar-grey-dark pl-8">↓</div>
          <div className="spatial-step p-4 border border-aerosar-grey-dark text-aerosar-grey-light">PREVIOUS OBSERVATIONS</div>
          <div className="spatial-step text-aerosar-grey-dark pl-8">↓</div>
          <div className="spatial-step p-4 border border-aerosar-grey-dark text-aerosar-white">CURRENT INCIDENT</div>
          <div className="spatial-step text-aerosar-grey-dark pl-8">↓</div>
          <div className="spatial-step p-4 border border-aerosar-red bg-[#1a0507] text-aerosar-red font-bold">RELEVANT CONTEXT</div>
        </div>
      </div>

      {/* 10. MISSION MEMORY */}
      <div className="memory-trigger min-h-screen flex flex-col justify-center items-center px-6 max-w-6xl mx-auto">
        <h2 className="memory-title font-space-grotesk text-4xl md:text-6xl text-aerosar-white uppercase mb-24 text-center">
          THE MISSION <span className="text-aerosar-red">REMEMBERS.</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 w-full justify-center items-center font-technical tracking-widest text-sm text-center">
          
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-2 mb-4">
              {['OBSERVATION 01', 'OBSERVATION 02', 'OBSERVATION 03', 'OBSERVATION 04'].map((obs, i) => (
                <div key={i} className="obs-item py-2 px-6 border border-aerosar-grey-dark text-aerosar-grey-mid bg-aerosar-black-secondary">{obs}</div>
              ))}
            </div>
            <div className="mem-arrow-1 py-4 text-aerosar-grey-dark">↓</div>
            <div className="mem-knowledge py-4 px-8 border border-aerosar-grey-industrial text-aerosar-white bg-[#0a0a0a] flex items-center gap-2">
              <Database className="w-4 h-4"/> MISSION KNOWLEDGE
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mem-current py-4 px-8 border border-aerosar-grey-dark text-aerosar-white bg-aerosar-black-secondary">CURRENT INCIDENT</div>
            <div className="mem-arrow-2 py-4 text-aerosar-grey-dark">↓</div>
            <div className="mem-retrieve py-4 px-8 border border-aerosar-grey-dark text-aerosar-red flex items-center gap-2">
              <Search className="w-4 h-4"/> RETRIEVE
            </div>
            <div className="mem-arrow-3 py-4 text-aerosar-grey-dark">↓</div>
            <div className="mem-history py-4 px-8 border border-aerosar-red bg-[#1a0507] text-aerosar-red font-bold">RELEVANT HISTORY</div>
          </div>

        </div>
      </div>

      {/* 11, 12, 13. COMPRESSION & GROUNDING */}
      <div className="compress-trigger min-h-screen flex flex-col justify-center items-center px-6 max-w-5xl mx-auto text-center">
        <h2 className="grounding-1 font-space-grotesk text-4xl md:text-6xl text-aerosar-white uppercase mb-6">
          CONTEXT BEFORE <span className="text-aerosar-red">GENERATION.</span>
        </h2>
        <p className="grounding-2 font-technical tracking-widest text-sm text-aerosar-grey-light uppercase mb-24">
          THE MODEL RECEIVES THE INFORMATION RELEVANT TO THE INCIDENT.
        </p>

        <div className="w-full flex flex-col items-center font-technical tracking-widest">
          <div className="w-full max-w-4xl border border-aerosar-grey-dark bg-aerosar-black-secondary p-4 flex flex-col items-start relative h-16">
            <span className="absolute -top-6 text-xs text-aerosar-grey-mid">MISSION KNOWLEDGE</span>
            <div className="compress-wide h-full bg-aerosar-grey-industrial relative overflow-hidden">
               <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(90deg, #171717 2px, transparent 2px)', backgroundSize: '10px 10px' }}></div>
            </div>
          </div>
          
          <div className="compress-arrow-1 py-6 text-aerosar-grey-dark text-xs flex items-center gap-2"><Search className="w-3 h-3"/> RETRIEVAL ↓</div>
          
          <div className="w-full max-w-4xl border border-aerosar-red bg-[#1a0507] p-4 flex flex-col items-center relative h-16">
            <span className="absolute -top-6 text-xs text-aerosar-red">RELEVANT CONTEXT</span>
            <div className="compress-narrow h-full relative overflow-hidden flex items-center justify-center text-aerosar-black text-xs font-bold bg-aerosar-red">
               <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(90deg, #8B111E 2px, transparent 2px)', backgroundSize: '10px 10px', opacity: 0.2 }}></div>
            </div>
          </div>

          <div className="compress-arrow-2 py-6 text-aerosar-grey-dark">↓</div>
          
          <div className="compress-llm py-4 px-12 border border-aerosar-grey-industrial bg-aerosar-black-secondary text-aerosar-white flex items-center gap-3 font-bold">
            <Cpu className="w-5 h-5"/> LLM
          </div>
        </div>
      </div>

      {/* 14 & 15. PIPELINE & HUMAN SUPERVISION */}
      <div className="pipe-full-trigger min-h-screen flex flex-col justify-center items-center px-6 max-w-7xl mx-auto overflow-hidden">
        
        {/* Human Supervision */}
        <div className="text-center mb-24 border-b border-aerosar-grey-dark pb-12 w-full">
          <h4 className="font-space-grotesk text-2xl md:text-4xl text-aerosar-white uppercase mb-4">AI ASSISTS THE OPERATOR.</h4>
          <h4 className="font-space-grotesk text-2xl md:text-4xl text-aerosar-grey-mid uppercase">HUMAN SUPERVISION REMAINS IN THE LOOP.</h4>
        </div>

        {/* Diagonal / Wrapping Pipeline */}
        <div className="w-full font-technical text-[10px] md:text-xs tracking-widest flex flex-wrap justify-center items-center gap-2 md:gap-4 lg:gap-6 px-4">
          {[
            {label: 'UAV', icon: <Activity className="w-3 h-3"/>},
            {label: 'CAMERA / SENSORS', icon: <Eye className="w-3 h-3"/>},
            {label: 'DETECTION', icon: <Target className="w-3 h-3"/>},
            {label: 'TARGET LOCATION', icon: <MapPin className="w-3 h-3"/>},
            {label: 'INCIDENT', icon: <ShieldAlert className="w-3 h-3"/>},
            {label: 'INCIDENT DATABASE', icon: <Database className="w-3 h-3"/>},
            {label: 'RAG RETRIEVAL', icon: <Search className="w-3 h-3"/>},
            {label: 'RELEVANT CONTEXT', icon: <Layers className="w-3 h-3"/>},
            {label: 'LLM', icon: <Cpu className="w-3 h-3"/>},
            {label: 'INCIDENT REPORT', icon: <FileText className="w-3 h-3"/>},
            {label: 'HUMAN OPERATOR', icon: <Crosshair className="w-3 h-3"/>}
          ].map((item, i, arr) => (
            <React.Fragment key={i}>
              <div className="full-pipe-node py-2 px-3 md:py-3 md:px-4 border border-aerosar-grey-dark bg-aerosar-black-secondary text-aerosar-grey-mid flex items-center gap-2 whitespace-nowrap">
                {item.icon} {item.label}
              </div>
              {i < arr.length - 1 && (
                <div className="text-aerosar-grey-dark hidden md:block">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 16 & 17. FINAL RAG STATEMENT & LLM TRANSITION */}
      <div className="rag-final-trigger min-h-screen flex flex-col justify-center items-center px-6 text-center max-w-6xl mx-auto pb-32">
        <div className="mb-32 space-y-12">
          <h2 className="final-1 font-space-grotesk text-4xl md:text-6xl text-aerosar-white uppercase">
            RAW DATA IS NOT INTELLIGENCE.
          </h2>
          <h2 className="final-2 font-space-grotesk text-4xl md:text-6xl text-aerosar-grey-light uppercase">
            CONTEXT MAKES INFORMATION USEFUL.
          </h2>
          <h2 className="final-3 font-space-grotesk text-4xl md:text-6xl text-aerosar-red uppercase font-bold leading-tight">
            RAG CONNECTS THE INCIDENT <br className="hidden md:block"/>TO WHAT THE SYSTEM ALREADY KNOWS.
          </h2>
        </div>

        <div className="flex flex-col items-center gap-6 font-technical tracking-widest text-sm w-full max-w-2xl mx-auto">
          <div className="py-4 px-8 border border-aerosar-red bg-[#1a0507] text-aerosar-red w-full max-w-xs text-center font-bold">
            RETRIEVED CONTEXT
          </div>
          <div className="text-aerosar-grey-dark text-xl">↓</div>
          <div className="py-4 px-8 border border-aerosar-grey-industrial bg-aerosar-black-secondary text-aerosar-white w-full max-w-xs text-center flex items-center justify-center gap-3">
            <Cpu className="w-5 h-5"/> LLM
          </div>
          <div className="text-aerosar-grey-dark text-xl">↓</div>
          
          {/* Partial Glimpse of Report */}
          <div className="report-preview w-full border border-aerosar-grey-industrial bg-[#080808] p-6 text-left relative overflow-hidden mt-4">
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>
            <div className="text-aerosar-grey-mid border-b border-aerosar-grey-dark pb-2 mb-4">INCIDENT REPORT</div>
            <div className="space-y-2 text-aerosar-grey-light text-xs opacity-70">
              <div><span className="text-aerosar-grey-dark">TARGET:</span> UNIDENTIFIED PERSONNEL</div>
              <div><span className="text-aerosar-grey-dark">LOCATION:</span> SECTOR 9 / SUB-LEVEL 2</div>
              <div><span className="text-aerosar-grey-dark">EVIDENCE:</span> CONFIDENCE 0.94 / VISUAL ID MATCH</div>
              <div><span className="text-aerosar-grey-dark">CONTEXT:</span> PREVIOUS SIGHTING AT 12:44 NEAR ENTRY A.</div>
              <div><span className="text-aerosar-grey-dark">STATUS:</span> ACTIVE INVESTIGATION</div>
            </div>
          </div>
        </div>

        <div className="final-4 mt-32 flex flex-col items-center gap-6">
          <h3 className="font-space-grotesk text-3xl md:text-5xl text-aerosar-grey-light uppercase">FROM CONTEXT</h3>
          <ArrowRight className="w-8 h-8 text-aerosar-red rotate-90" />
          <h3 className="font-space-grotesk text-4xl md:text-6xl text-aerosar-white uppercase border-b-2 border-aerosar-red pb-2">TO UNDERSTANDING.</h3>
        </div>
      </div>

    </section>
  );
};

export default RagSection;
