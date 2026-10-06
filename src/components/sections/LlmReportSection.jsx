import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, FileText, MapPin, Eye, ShieldAlert, Activity, ArrowRight, Target, Network, HardDrive } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PipelineNode = ({ title, icon: Icon }) => (
  <div className="flex flex-col items-center">
    <div className="pipeline-node w-16 h-16 rounded-full border-2 border-[#666666] flex items-center justify-center bg-[#050505] text-[#D6D6D6] z-10 transition-colors">
      <Icon className="w-6 h-6" />
    </div>
    <span className="text-[10px] uppercase font-mono mt-4 text-[#A3A3A3] text-center w-20 leading-tight">{title}</span>
  </div>
);

const LlmReportSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Setup Initial States
      gsap.set(".report-field", { opacity: 0, y: 20 });
      gsap.set(".mission-intelligence-incident", { opacity: 0, y: 20 });
      gsap.set(".pipeline-node", { opacity: 0.3, scale: 0.95 });
      gsap.set(".pipeline-connection", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".pipeline-connection-mobile", { scaleY: 0, transformOrigin: "top center" });

      // 1. SECTION ENTRY
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".llm-entry-trigger",
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        }
      });
      entryTl.fromTo(".context-ready-text", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 })
             .to(".context-ready-text", { opacity: 0, y: -20, duration: 1 }, "+=0.5")
             .fromTo(".understandable-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
             .to(".understandable-text", { opacity: 0, y: -20, duration: 1 }, "+=0.5")
             .fromTo(".machine-to-human-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });

      // 2. CONTEXT ENTERS THE MODEL
      const contextTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".context-enter-trigger",
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1,
        }
      });
      contextTl.fromTo(".retrieved-context-box", { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1 })
               .fromTo(".context-to-llm-arrow", { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 1 })
               .fromTo(".llm-processing-box", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 })
               .to(".context-to-llm-arrow", { borderColor: "#E32636", duration: 0.5 }); // Red signal

      // 3. LLM PROCESSING
      const processingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".llm-processing-trigger",
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1,
        }
      });
      processingTl.fromTo(".llm-language-context", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 });

      // 4. INFORMATION TRANSFORMATION
      const transformTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".transform-trigger",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        }
      });
      transformTl.fromTo(".machine-data-side", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1 })
                 .fromTo(".human-info-side", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1 }, "<")
                 .fromTo(".transformation-arrow", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 1 }, "-=0.5");

      // 5 & 6 & 7. REPORT GENERATION (Light mode reveal)
      const reportTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".report-generation-trigger",
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1,
        }
      });
      reportTl.fromTo(".incident-report-container", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
              .to(".report-field", { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 });

      // 8 & 9. MAP + REPORT + EVIDENCE
      const mapReportTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".map-report-trigger",
          start: "top 60%",
          end: "bottom 30%",
          scrub: 1,
        }
      });
      mapReportTl.fromTo(".map-reference", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1 })
                 .fromTo(".evidence-attachment", { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1 }, "-=0.5");

      // 10 & 11. HUMAN IN THE LOOP & OPERATOR VIEW
      const humanLoopTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".human-loop-trigger",
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1,
        }
      });
      humanLoopTl.fromTo(".ai-assists-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 })
                 .fromTo(".operator-decides-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "+=0.2")
                 .fromTo(".one-incident-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "+=0.5");

      // 12. MULTIPLE REPORTS -> MISSION INTELLIGENCE
      const missionIntelligenceTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".mission-intelligence-trigger",
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1,
        }
      });
      missionIntelligenceTl.to(".mission-intelligence-incident", { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 })
                           .fromTo(".mission-intelligence-result", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, "+=0.5");

      // 13. COMPLETE SOFTWARE INTELLIGENCE CHAIN
      const pipelineTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".complete-pipeline-trigger",
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1,
        }
      });
      pipelineTl.to(".pipeline-node", { opacity: 1, scale: 1, duration: 0.3, stagger: 0.2, borderColor: "#E32636", color: "#E32636" })
                .to(".pipeline-connection", { scaleX: 1, duration: 0.3, stagger: 0.2, backgroundColor: "#E32636" }, "<0.1")
                .to(".pipeline-connection-mobile", { scaleY: 1, duration: 0.3, stagger: 0.2, backgroundColor: "#E32636" }, "<0.1");

      // 14 & 15. THE BIG MESSAGE & WHAT AEROSAR DELIVERS
      const bigMessageTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".big-message-trigger",
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1,
        }
      });
      bigMessageTl.fromTo(".sensor-to-action-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.3 })
                  .fromTo(".without-removing-human", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, color: "#E32636" }, "+=0.5")
                  .fromTo(".what-aerosar-delivers", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, "+=0.5");

      // 16. TRANSITION TO FULL MISSION
      const fullMissionTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".full-mission-trigger",
          start: "top 70%",
          end: "bottom 20%",
          scrub: 1,
        }
      });
      fullMissionTl.fromTo(".full-mission-visuals", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5 })
                   .fromTo(".one-system-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.3 }, "+=0.5")
                   .fromTo(".find-understand-inform-text", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, color: "#E32636" }, "+=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden font-sans">
      
      {/* --- DARK SECTION --- */}
      <div className="bg-[#050505] text-[#F5F5F5]">
        
        {/* 1. ENTRY */}
        <div className="llm-entry-trigger min-h-screen flex flex-col items-center justify-center px-6">
          <div className="context-ready-text text-5xl md:text-7xl font-bold font-space tracking-tight text-center mb-12">
            CONTEXT IS READY.
          </div>
          <div className="understandable-text text-3xl md:text-5xl font-medium text-[#D6D6D6] text-center mb-8">
            NOW MAKE IT UNDERSTANDABLE.
          </div>
          <div className="text-[#E32636] font-mono text-sm tracking-widest mb-16 uppercase">
            LLM / INCIDENT REPORTING
          </div>
          <div className="machine-to-human-text text-2xl md:text-4xl text-center text-[#A3A3A3]">
            FROM MACHINE DATA<br/>
            <span className="block my-4 text-[#E32636]">&#8595;</span>
            <span className="text-[#F5F5F5]">TO HUMAN INTELLIGENCE</span>
          </div>
        </div>

        {/* 2 & 3. CONTEXT ENTERS THE MODEL & LLM PROCESSING */}
        <div className="context-enter-trigger llm-processing-trigger min-h-screen flex flex-col items-center justify-center px-6 py-24">
          <div className="retrieved-context-box border border-[#333333] bg-[#0A0A0A] p-6 rounded-lg w-full max-w-sm">
            <h3 className="font-mono text-xs text-[#A3A3A3] uppercase mb-4 tracking-widest">Retrieved Context</h3>
            <ul className="font-mono text-sm text-[#D6D6D6] space-y-2">
              <li>INCIDENT</li>
              <li>LOCATION</li>
              <li>EVIDENCE</li>
              <li>CONFIDENCE</li>
              <li>MISSION HISTORY</li>
              <li>RELEVANT PROCEDURES</li>
            </ul>
          </div>

          <div className="context-to-llm-arrow h-24 border-l-2 border-[#333333] my-4 origin-top transition-colors"></div>

          <div className="llm-processing-box border border-[#E32636] bg-[#0A0A0A] p-8 rounded-lg w-full max-w-sm text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#E32636]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Cpu className="w-12 h-12 text-[#E32636] mx-auto mb-4" />
            <h2 className="text-3xl font-bold font-space tracking-tight mb-2">LLM</h2>
            <div className="llm-language-context font-mono text-sm text-[#D6D6D6] uppercase tracking-widest">
              LANGUAGE + CONTEXT
            </div>
          </div>
        </div>

        {/* 4. INFORMATION TRANSFORMATION */}
        <div className="transform-trigger min-h-screen flex flex-col md:flex-row items-center justify-center px-6 gap-12 md:gap-8">
          
          <div className="machine-data-side border border-[#333333] bg-[#0A0A0A] p-8 rounded-lg w-full max-w-md font-mono text-sm">
            <div className="text-[#A3A3A3] uppercase tracking-widest mb-6 pb-4 border-b border-[#333333]">Machine Data</div>
            <div className="space-y-3 text-[#D6D6D6]">
              <div className="flex justify-between"><span>TYPE:</span> <span>PERSON</span></div>
              <div className="flex justify-between"><span>CONFIDENCE:</span> <span>0.94</span></div>
              <div className="flex justify-between"><span>X:</span> <span>04.82</span></div>
              <div className="flex justify-between"><span>Y:</span> <span>07.31</span></div>
              <div className="flex justify-between"><span>TIME:</span> <span>14:32</span></div>
              <div className="flex justify-between"><span>EVIDENCE:</span> <span>FRAME_004821</span></div>
            </div>
          </div>

          <div className="hidden md:flex transformation-arrow items-center justify-center text-[#E32636]">
            <ArrowRight className="w-8 h-8" />
          </div>
          <div className="md:hidden transformation-arrow flex items-center justify-center text-[#E32636] my-4">
            <ArrowRight className="w-8 h-8 rotate-90" />
          </div>

          <div className="human-info-side border border-[#E32636]/30 bg-[#0A0A0A] p-8 rounded-lg w-full max-w-md">
             <div className="font-mono text-xs text-[#E32636] uppercase tracking-widest mb-6 pb-4 border-b border-[#333333]">Incident Report</div>
             <p className="text-[#F5F5F5] text-lg leading-relaxed mb-4">
               A person was detected within the explored area.
             </p>
             <p className="text-[#D6D6D6] leading-relaxed mb-4">
               The target was localized using the available spatial information.
             </p>
             <p className="text-[#A3A3A3] text-sm leading-relaxed">
               Evidence is associated with the incident for operator review.
             </p>
          </div>
        </div>
      </div>

      {/* --- LIGHT SECTION --- */}
      {/* 5, 6, 7, 8, 9. REPORT AS A CASE FILE */}
      <div className="bg-[#F5F5F2] text-[#050505] min-h-screen py-24 px-6 md:px-12 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="font-mono text-sm tracking-widest text-[#C91F2D] uppercase border-b border-[#C91F2D]/30 pb-2">Dark Intelligence System &#8595; Light Incident Report</span>
          </div>

          <div className="report-generation-trigger map-report-trigger flex flex-col lg:flex-row gap-8">
            
            {/* The Report Document */}
            <div className="incident-report-container flex-1 bg-white border border-[#D6D6D6] p-8 md:p-12 shadow-sm relative overflow-hidden"
                 style={{ backgroundImage: 'linear-gradient(#F5F5F5 1px, transparent 1px), linear-gradient(90deg, #F5F5F5 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C91F2D]/5 rounded-bl-full"></div>
              
              <div className="flex justify-between items-start mb-12 border-b border-[#050505] pb-6">
                <div>
                  <h2 className="text-3xl font-space font-bold tracking-tight">INCIDENT 0042</h2>
                  <div className="font-mono text-xs text-[#666666] mt-2">SYS-GEN-RPT // 2026-10-05</div>
                </div>
                <div className="w-3 h-3 bg-[#C91F2D] rounded-full mt-2 animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="report-field">
                  <div className="font-mono text-[10px] text-[#666666] uppercase mb-1">EVENT</div>
                  <div className="font-bold font-space text-lg">PERSON DETECTED</div>
                </div>
                <div className="report-field">
                  <div className="font-mono text-[10px] text-[#666666] uppercase mb-1">LOCATION</div>
                  <div className="font-medium flex items-center gap-2"><MapPin className="w-4 h-4 text-[#C91F2D]"/> LOCAL MAP / TARGET POSITION</div>
                </div>
                <div className="report-field">
                  <div className="font-mono text-[10px] text-[#666666] uppercase mb-1">CONFIDENCE</div>
                  <div className="font-mono text-lg">94%</div>
                </div>
                <div className="report-field">
                  <div className="font-mono text-[10px] text-[#666666] uppercase mb-1">EVIDENCE</div>
                  <div className="font-mono text-sm">FRAME 004821</div>
                </div>
              </div>

              <div className="report-field mb-12">
                <div className="font-mono text-[10px] text-[#666666] uppercase mb-3">SUMMARY</div>
                <p className="text-xl leading-relaxed text-[#262626]">
                  A person was detected within the explored environment and localized using the available spatial data.
                </p>
              </div>

              <div className="report-field border-t border-[#D6D6D6] pt-6">
                <div className="font-mono text-[10px] text-[#666666] uppercase mb-2">STATUS</div>
                <div className="inline-block bg-[#050505] text-white px-4 py-2 font-mono text-xs font-medium tracking-wide">
                  REQUIRES OPERATOR REVIEW
                </div>
              </div>
            </div>

            {/* Spatial & Evidence Reference */}
            <div className="w-full lg:w-1/3 flex flex-col gap-6">
              <div className="map-reference bg-white border border-[#D6D6D6] p-6 shadow-sm flex flex-col h-1/2">
                <div className="font-mono text-[10px] text-[#666666] uppercase mb-4 flex items-center justify-between">
                  <span>Target / Local Frame</span>
                  <Activity className="w-4 h-4" />
                </div>
                <div className="flex-1 bg-[#F5F5F2] border border-[#E5E5E5] relative flex items-center justify-center overflow-hidden min-h-[160px]">
                  {/* Abstract map visual */}
                  <div className="absolute w-32 h-32 border border-[#C91F2D]/20 rounded-full"></div>
                  <div className="absolute w-16 h-16 border border-[#C91F2D]/40 rounded-full"></div>
                  <div className="w-3 h-3 bg-[#C91F2D] rounded-full z-10 relative">
                    <div className="absolute inset-0 bg-[#C91F2D] rounded-full animate-ping opacity-75"></div>
                  </div>
                  <div className="absolute bottom-2 left-2 font-mono text-[8px] text-[#666666]">X:04.82 Y:07.31</div>
                </div>
              </div>

              <div className="evidence-attachment bg-white border border-[#D6D6D6] p-6 shadow-sm flex flex-col h-1/2">
                <div className="font-mono text-[10px] text-[#666666] uppercase mb-4 flex items-center justify-between">
                  <span>Detection Frame</span>
                  <Eye className="w-4 h-4" />
                </div>
                <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden min-h-[160px]">
                  {/* Abstract evidence visual */}
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                  <div className="border-2 border-[#C91F2D] w-24 h-32 relative z-10 flex items-start justify-end p-1">
                     <span className="font-mono text-[8px] text-[#C91F2D] bg-black px-1">94%</span>
                  </div>
                  <div className="absolute bottom-2 left-2 font-mono text-[8px] text-[#A3A3A3]">FRAME_004821</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 10, 11. HUMAN-IN-THE-LOOP */}
      <div className="human-loop-trigger bg-[#F5F5F2] text-[#050505] min-h-[70vh] flex flex-col items-center justify-center px-6 text-center border-t border-[#D6D6D6]">
        <div className="ai-assists-text text-5xl md:text-7xl font-space font-bold mb-4">
          AI ASSISTS.
        </div>
        <div className="operator-decides-text text-4xl md:text-6xl font-space font-medium text-[#666666] mb-12">
          THE OPERATOR DECIDES.
        </div>
        <div className="font-mono text-sm tracking-widest text-[#C91F2D] uppercase border border-[#C91F2D]/30 px-6 py-3 rounded-full mb-24 bg-white shadow-sm">
          GENERATED INFORMATION IS PRESENTED FOR HUMAN REVIEW.
        </div>

        <div className="flex flex-col items-center space-y-4 font-mono text-xs text-[#666666]">
          <div className="one-incident-text text-xl text-[#050505] font-space font-bold mt-8 mb-2">ONE INCIDENT. ONE CLEAR PICTURE.</div>
          <div>INCIDENT</div>
          <div className="text-[#C91F2D]">&#8595;</div>
          <div>LOCATION</div>
          <div className="text-[#C91F2D]">&#8595;</div>
          <div>EVIDENCE</div>
          <div className="text-[#C91F2D]">&#8595;</div>
          <div>CONTEXT</div>
          <div className="text-[#C91F2D]">&#8595;</div>
          <div>SUMMARY</div>
        </div>
      </div>

      {/* 12. MULTIPLE REPORTS */}
      <div className="mission-intelligence-trigger bg-[#050505] text-[#F5F5F5] py-32 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <div className="flex gap-4 md:gap-8 mb-16 flex-wrap justify-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mission-intelligence-incident w-32 h-40 border border-[#333333] bg-[#0A0A0A] p-4 flex flex-col">
                <div className="w-full h-1 bg-[#E32636] mb-4"></div>
                <div className="font-mono text-[8px] text-[#A3A3A3] mb-1">INCIDENT 0{i}</div>
                <div className="h-2 w-16 bg-[#333333] rounded-full mb-2"></div>
                <div className="h-2 w-20 bg-[#333333] rounded-full mb-2"></div>
                <div className="h-2 w-12 bg-[#333333] rounded-full"></div>
              </div>
            ))}
          </div>
          <div className="text-[#E32636] mb-8 animate-bounce">
            <ArrowRight className="w-8 h-8 rotate-90" />
          </div>
          <div className="mission-intelligence-result border border-[#E32636] bg-[#0A0A0A] px-12 py-8 rounded-lg text-center">
             <div className="text-3xl font-space font-bold tracking-widest text-white uppercase">Mission Intelligence</div>
          </div>
        </div>
      </div>

      {/* 13. COMPLETE SOFTWARE INTELLIGENCE CHAIN */}
      <div className="complete-pipeline-trigger bg-[#050505] min-h-screen py-24 flex items-center justify-center px-6 overflow-hidden">
        <div className="w-full max-w-7xl">
          <div className="text-center mb-20">
             <h2 className="text-3xl md:text-5xl font-space font-bold text-white tracking-tight">THE INTELLIGENCE CHAIN</h2>
          </div>
          
          <div className="relative">
            {/* The horizontal connection line for desktop */}
            <div className="hidden md:block absolute top-8 left-12 right-12 h-[2px] bg-[#333333] -z-0">
               <div className="pipeline-connection h-full w-full bg-[#E32636]"></div>
            </div>

            {/* Vertical connection for mobile */}
            <div className="md:hidden absolute top-8 bottom-8 left-1/2 w-[2px] bg-[#333333] -translate-x-1/2 -z-0">
               <div className="pipeline-connection-mobile w-full h-full bg-[#E32636]"></div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 relative z-10">
              <PipelineNode title="CAMERA" icon={Eye} />
              <PipelineNode title="COMPUTER VISION" icon={Target} />
              <PipelineNode title="SLAM MAP" icon={MapPin} />
              <PipelineNode title="INCIDENT ENGINE" icon={Activity} />
              <PipelineNode title="DATABASE" icon={HardDrive} />
              <PipelineNode title="RAG" icon={Network} />
              <PipelineNode title="LLM" icon={Cpu} />
              <PipelineNode title="REPORT" icon={FileText} />
              <PipelineNode title="HUMAN" icon={ShieldAlert} />
            </div>
          </div>
        </div>
      </div>

      {/* 14, 15, 16. THE BIG MESSAGE & TRANSITION TO MISSION */}
      <div className="big-message-trigger full-mission-trigger bg-[#050505] text-white min-h-screen flex flex-col justify-center relative overflow-hidden">
        
        {/* Abstract Mission Visual Background */}
        <div className="full-mission-visuals absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#333333] rounded-full"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#333333] rounded-full"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#E32636]/30 rounded-full"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#E32636] rounded-full">
             <div className="absolute inset-0 bg-[#E32636] rounded-full animate-ping opacity-50"></div>
           </div>
        </div>

        <div className="relative z-10 px-6 max-w-5xl mx-auto text-center">
          <div className="space-y-6 md:space-y-8 font-space font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight mb-16">
            <div className="sensor-to-action-text text-[#A3A3A3]">FROM SENSOR DATA</div>
            <div className="sensor-to-action-text text-[#C2C2C2]">TO SPATIAL UNDERSTANDING</div>
            <div className="sensor-to-action-text text-[#D6D6D6]">TO PERCEPTION</div>
            <div className="sensor-to-action-text text-[#E5E5E5]">TO CONTEXT</div>
            <div className="sensor-to-action-text text-[#F5F5F5]">TO INTELLIGENCE</div>
            <div className="sensor-to-action-text text-white">TO ACTIONABLE INFORMATION</div>
          </div>

          <div className="without-removing-human text-lg md:text-3xl font-mono tracking-widest text-[#E32636] uppercase mb-32 font-bold border-y border-[#E32636]/20 py-8">
            WITHOUT REMOVING THE HUMAN FROM THE LOOP.
          </div>

          <div className="what-aerosar-delivers space-y-4 mb-40">
            <p className="text-xl md:text-2xl text-[#A3A3A3] font-medium">
              AEROSAR DOES NOT JUST FLY INTO A DANGEROUS ENVIRONMENT.
            </p>
            <p className="text-2xl md:text-4xl text-white font-space font-bold">
              IT RETURNS INFORMATION THAT PEOPLE CAN ACT ON.
            </p>
          </div>

          <div className="space-y-8 pb-32">
            <div className="one-system-text text-4xl md:text-6xl font-space font-bold">ONE SYSTEM.</div>
            <div className="one-system-text text-4xl md:text-6xl font-space font-bold">ONE MISSION.</div>
            <div className="find-understand-inform-text text-2xl md:text-4xl font-mono tracking-widest text-[#E32636] uppercase mt-12">
              FIND. UNDERSTAND. INFORM.
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default LlmReportSection;
