import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aerosarVideo from '../../assets/aerosar.mp4';
import heroPoster from '../../assets/hero.png';

gsap.registerPlugin(ScrollTrigger);

const CinematicOpening = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const droneRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Initial Hero Reveal
      const heroTl = gsap.timeline();
      heroTl.fromTo(".hero-title-char", 
        { opacity: 0, x: 20, filter: "blur(10px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.2, stagger: 0.05, ease: "power3.out" }
      )
      .fromTo(".hero-subtitle", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8");

      // 2. Video fades and scales slightly as we scroll into problem
      gsap.to(videoRef.current, {
        opacity: 0.2,
        scale: 1.05,
        scrollTrigger: {
          trigger: ".problem-start",
          start: "top 80%",
          end: "bottom center",
          scrub: true
        }
      });

      // 3. Problem Statement Cinematic Reveals
      const problemElements = gsap.utils.toArray('.problem-env');
      problemElements.forEach((el, i) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 50, scale: 0.95 },
          { 
            opacity: 1, y: 0, scale: 1, 
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 40%",
              scrub: true,
            }
          }
        );
        gsap.to(el, {
          opacity: 0, y: -50,
          scrollTrigger: {
            trigger: el,
            start: "top 20%",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // 4. Drone Callouts sequence
      const callouts = gsap.utils.toArray('.drone-callout');
      callouts.forEach((callout, i) => {
        gsap.fromTo(callout, 
          { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
          { 
            opacity: 1, x: 0, 
            scrollTrigger: {
              trigger: ".drone-section",
              start: `top+=${i * 15}% center`,
              end: `top+=${(i + 1) * 15}% center`,
              scrub: true,
            }
          }
        );
      });

      // 5. System Bridge Reveal
      gsap.fromTo(".system-bridge-item", 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, stagger: 0.1,
          scrollTrigger: {
            trigger: ".system-bridge",
            start: "top 70%",
            end: "top 40%",
            scrub: true
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Split text for hero
  const splitText = (text) => text.split('').map((char, i) => (
    <span key={i} className={`inline-block ${char === ' ' ? 'w-4' : 'hero-title-char'}`}>
      {char}
    </span>
  ));

  return (
    <div ref={containerRef} className="relative w-full bg-black text-aerosar-white selection:bg-aerosar-red selection:text-white">
      
      {/* Background Video - Fixed position */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <video ref={videoRef} src={aerosarVideo} poster={heroPoster} autoPlay muted loop playsInline className="w-full h-full object-cover brightness-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black pointer-events-none" />
      </div>

      <div className="relative z-10">
        
        {/* --- PART 1: HERO --- */}
        <section className="h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24">
          <div className="max-w-5xl">
            <div className="hero-subtitle font-technical text-aerosar-white/70 tracking-[0.25em] text-[10px] uppercase mb-6">
              AUTONOMOUS UAV / SEARCH & RESCUE
            </div>
            <h1 className="font-space-grotesk text-4xl md:text-6xl lg:text-[6rem] font-bold leading-[1.05] text-aerosar-red uppercase tracking-tight">
              {splitText("STALLION AEROSAR")}
            </h1>
            <h2 className="hero-subtitle font-space-grotesk text-xl md:text-3xl text-white mt-4 uppercase tracking-wider">
              Autonomous Search & Rescue
            </h2>
          </div>
        </section>

        {/* --- PART 2: THE PROBLEM --- */}
        <section className="problem-start min-h-[150vh] flex flex-col justify-start pt-32 px-6 md:px-12 lg:px-24">
          <h2 className="font-space-grotesk text-4xl md:text-6xl lg:text-7xl leading-[1.1] uppercase tracking-tighter mb-32 max-w-4xl">
            WHEN ACCESS BECOMES THE PROBLEM,<br/>
            <span className="text-aerosar-red">AEROSAR GOES IN.</span>
          </h2>

          <div className="flex flex-col gap-[30vh] pb-[30vh]">
            {[
              { id: "01", title: "COLLAPSED STRUCTURES" },
              { id: "02", title: "CONFINED SPACES" },
              { id: "03", title: "GPS-DENIED ENVIRONMENTS" },
              { id: "04", title: "LIMITED VISIBILITY" },
              { id: "05", title: "HAZARDOUS AREAS" }
            ].map((env, i) => (
              <div key={i} className="problem-env relative max-w-3xl ml-auto md:mr-24">
                <div className="absolute -left-6 top-2 w-1 h-12 bg-aerosar-red" />
                <div className="font-technical text-aerosar-red text-xs tracking-widest mb-2">{env.id} / SCENARIO</div>
                <h3 className="font-space-grotesk text-3xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white/90">
                  {env.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* --- PART 3 & 4: SYSTEM REVEAL --- */}
        <section className="drone-section relative min-h-[200vh]">
          {/* Sticky Container for Drone */}
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            
            <div className="absolute top-24 text-center w-full z-20">
              <h2 className="font-space-grotesk text-4xl md:text-6xl uppercase text-white tracking-tighter">
                MEET <span className="text-aerosar-red">AEROSAR.</span>
              </h2>
            </div>

            {/* Premium Technical 2D Drone Visualization */}
            <div ref={droneRef} className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] mt-16">
              {/* Outer Cage */}
              <div className="absolute inset-0 border-[1px] border-white/20 rounded-[40px] rotate-45 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)]">
                <div className="w-[90%] h-[90%] border-[1px] border-white/10 rounded-[35px]" />
              </div>
              
              {/* Internal Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] bg-black border border-white/30 rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(201,31,45,0.2)] z-10">
                <div className="w-16 h-16 border border-aerosar-red/50 rounded-full animate-[spin_4s_linear_infinite]" />
                <div className="absolute w-2 h-2 bg-aerosar-red rounded-full" />
              </div>

              {/* Rotors */}
              <div className="absolute top-[15%] left-[15%] w-16 h-16 border border-white/20 rounded-full flex items-center justify-center"><div className="w-8 h-8 border border-white/10 rounded-full animate-[spin_2s_linear_infinite]" /></div>
              <div className="absolute top-[15%] right-[15%] w-16 h-16 border border-white/20 rounded-full flex items-center justify-center"><div className="w-8 h-8 border border-white/10 rounded-full animate-[spin_2s_linear_infinite_reverse]" /></div>
              <div className="absolute bottom-[15%] left-[15%] w-16 h-16 border border-white/20 rounded-full flex items-center justify-center"><div className="w-8 h-8 border border-white/10 rounded-full animate-[spin_2s_linear_infinite_reverse]" /></div>
              <div className="absolute bottom-[15%] right-[15%] w-16 h-16 border border-white/20 rounded-full flex items-center justify-center"><div className="w-8 h-8 border border-white/10 rounded-full animate-[spin_2s_linear_infinite]" /></div>

              {/* Callouts (Positioned absolute around the drone) */}
              <div className="drone-callout absolute top-[-5%] left-[-20%] w-48 text-right">
                <div className="absolute right-[-20px] top-[10px] w-[60px] h-[1px] bg-aerosar-red/50 rotate-[-15deg] origin-right" />
                <div className="font-space-grotesk text-lg text-white">CAMERA</div>
                <div className="font-technical text-[10px] text-aerosar-red tracking-widest">PERCEPTION</div>
              </div>

              <div className="drone-callout absolute top-[15%] right-[-25%] w-48 text-left">
                <div className="absolute left-[-20px] top-[10px] w-[80px] h-[1px] bg-aerosar-red/50 rotate-[20deg] origin-left" />
                <div className="font-space-grotesk text-lg text-white">LiDAR / DEPTH</div>
                <div className="font-technical text-[10px] text-aerosar-red tracking-widest">SPATIAL SENSING</div>
              </div>

              <div className="drone-callout absolute top-[45%] left-[-30%] w-48 text-right">
                <div className="absolute right-[-20px] top-[10px] w-[100px] h-[1px] bg-aerosar-red/50 rotate-[0deg] origin-right" />
                <div className="font-space-grotesk text-lg text-white">RASPBERRY PI 5</div>
                <div className="font-technical text-[10px] text-aerosar-red tracking-widest">ONBOARD COMPUTATION</div>
              </div>

              <div className="drone-callout absolute bottom-[20%] right-[-30%] w-48 text-left">
                <div className="absolute left-[-20px] top-[10px] w-[90px] h-[1px] bg-aerosar-red/50 rotate-[-15deg] origin-left" />
                <div className="font-space-grotesk text-lg text-white">FLIGHT CONTROLLER</div>
                <div className="font-technical text-[10px] text-aerosar-red tracking-widest">LOW-LEVEL CONTROL</div>
              </div>

              <div className="drone-callout absolute bottom-[-10%] left-[10%] w-48 text-right">
                <div className="absolute right-[-20px] top-0 w-[60px] h-[1px] bg-aerosar-red/50 rotate-[45deg] origin-right" />
                <div className="font-space-grotesk text-lg text-white">MAVLINK</div>
                <div className="font-technical text-[10px] text-aerosar-red tracking-widest">TELEMETRY / COMMANDS</div>
              </div>

            </div>
          </div>
        </section>

        {/* --- PART 5: SYSTEM BRIDGE --- */}
        <section className="system-bridge relative min-h-screen bg-black flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 z-20">
          <div className="max-w-6xl w-full mx-auto">
            
            <div className="flex flex-col md:flex-row justify-between gap-12 mb-32">
              {[
                { step: "SENSE", desc: "Camera + sensors" },
                { step: "MAP", desc: "LiDAR + SLAM" },
                { step: "PERCEIVE", desc: "Computer Vision" },
                { step: "LOCALIZE", desc: "Spatial + semantic understanding" },
                { step: "INFORM", desc: "Incident intelligence" }
              ].map((item, i) => (
                <div key={i} className="system-bridge-item flex flex-col items-start border-t border-white/10 pt-4 flex-1">
                  <div className="font-technical text-aerosar-red text-[10px] tracking-widest mb-4">0{i + 1}</div>
                  <h3 className="font-space-grotesk text-xl text-white uppercase mb-2">{item.step}</h3>
                  <p className="font-inter text-aerosar-grey-light text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-32 max-w-4xl mx-auto">
              <h2 className="font-space-grotesk text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-white/50 mb-4">
                THE WORLD IS UNKNOWN.
              </h2>
              <h3 className="font-space-grotesk text-2xl md:text-4xl lg:text-5xl uppercase tracking-tight text-white">
                AEROSAR BUILDS AN UNDERSTANDING OF IT.
              </h3>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default CinematicOpening;
