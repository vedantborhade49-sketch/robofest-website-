import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Html } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

const DroneModel = ({ dummyRef }) => {
  const masterRef = useRef();
  const frameRef = useRef();
  const bodyRef = useRef();
  const fcRef = useRef();
  const computerRef = useRef();
  const sensorRef = useRef();
  const propsRef = useRef();

  useFrame((state) => {
    if (!masterRef.current) return;
    
    const d = dummyRef.current;
    
    // Smooth mouse parallax
    const mouseX = (state.pointer.x * Math.PI) / 10;
    const mouseY = (state.pointer.y * Math.PI) / 10;
    
    masterRef.current.position.z = d.droneZ;
    masterRef.current.position.y = d.droneY + Math.sin(state.clock.elapsedTime) * 0.1 + mouseY * 0.2;
    masterRef.current.position.x = mouseX * 0.2;
    
    masterRef.current.rotation.y = d.droneRotY + mouseX * 0.1;
    masterRef.current.rotation.x = d.droneRotX - mouseY * 0.1;

    frameRef.current.position.y = d.explodeFrame;
    fcRef.current.position.y = d.explodeFC;
    computerRef.current.position.y = d.explodeComputer;
    sensorRef.current.position.y = d.explodeSensor;
    
    // Spin props
    if (propsRef.current) {
      propsRef.current.rotation.y += 0.5;
    }
  });

  return (
    <group ref={masterRef}>
      {/* Frame / Cage */}
      <group ref={frameRef}>
        <mesh rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[2.2, 0.04, 16, 64]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.2} />
        </mesh>
        <Html position={[2.5, 0, 0]} className="callout-frame callout-all opacity-0 pointer-events-none">
          <div className="flex items-center gap-4 w-[200px]">
             <div className="w-12 h-[1px] bg-aerosar-grey-dark/80 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-aerosar-white/50" />
             </div>
             <div className="font-technical text-[10px] tracking-widest uppercase text-aerosar-white">
               04 <br/><span className="text-aerosar-grey-light">PROTECTED AIRFRAME</span>
             </div>
          </div>
        </Html>
      </group>

      {/* Body & Arms */}
      <group ref={bodyRef}>
        <mesh>
          <boxGeometry args={[1.2, 0.3, 1.2]} />
          <meshStandardMaterial color="#111" roughness={0.6} metalness={0.5} />
        </mesh>
        {/* Arms */}
        {[Math.PI/4, -Math.PI/4, Math.PI*3/4, -Math.PI*3/4].map((rot, i) => (
          <group key={i} rotation={[0, rot, 0]}>
            <mesh position={[1.2, 0, 0]}>
              <boxGeometry args={[1.4, 0.1, 0.1]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
            </mesh>
            {/* Motor mount */}
            <mesh position={[1.9, 0.1, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
              <meshStandardMaterial color="#0a0a0a" roughness={0.5} />
            </mesh>
          </group>
        ))}
        {/* Props Container */}
        <group ref={propsRef}>
          {[[1.34, 1.34], [1.34, -1.34], [-1.34, 1.34], [-1.34, -1.34]].map((pos, i) => (
            <mesh key={i} position={[pos[0], 0.2, pos[1]]}>
              <cylinderGeometry args={[0.8, 0.8, 0.02, 32]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.05} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Flight Controller */}
      <group ref={fcRef} position={[0, 0.25, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 0.1, 0.5]} />
          <meshStandardMaterial color="#222" roughness={0.5} />
        </mesh>
        <mesh position={[0.1, 0.06, 0.1]}>
          <boxGeometry args={[0.05, 0.02, 0.05]} />
          <meshBasicMaterial color="#C91F2D" />
        </mesh>
        <Html position={[-0.6, 0.2, 0]} className="callout-fc callout-all opacity-0 pointer-events-none">
          <div className="flex items-center gap-4 flex-row-reverse w-[200px] ml-[-200px]">
             <div className="w-12 h-[1px] bg-aerosar-red/80 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-aerosar-red" />
             </div>
             <div className="font-technical text-[10px] tracking-widest uppercase text-aerosar-white text-right">
               01 <br/><span className="text-aerosar-red">FLIGHT CONTROL</span>
             </div>
          </div>
        </Html>
      </group>

      {/* Companion Computer */}
      <group ref={computerRef} position={[0, -0.25, 0]}>
        <mesh>
          <boxGeometry args={[0.8, 0.15, 0.8]} />
          <meshStandardMaterial color="#151515" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[-0.3, 0, 0.41]}>
           <boxGeometry args={[0.1, 0.05, 0.02]} />
           <meshBasicMaterial color="#C91F2D" />
        </mesh>
        <Html position={[0.8, -0.2, 0]} className="callout-computer callout-all opacity-0 pointer-events-none">
          <div className="flex items-center gap-4 w-[200px]">
             <div className="w-12 h-[1px] bg-aerosar-red/80 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-aerosar-red" />
             </div>
             <div className="font-technical text-[10px] tracking-widest uppercase text-aerosar-white">
               02 <br/><span className="text-aerosar-red">COMPANION COMPUTER</span>
             </div>
          </div>
        </Html>
      </group>

      {/* Sensors */}
      <group ref={sensorRef} position={[0, -0.45, 0.4]}>
        {/* Main Sensor block */}
        <mesh>
          <boxGeometry args={[0.4, 0.2, 0.3]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.3} />
        </mesh>
        {/* Lenses */}
        <mesh position={[-0.1, 0, 0.16]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
          <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh position={[0.1, 0, 0.16]} rotation={[Math.PI/2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.05, 16]} />
          <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
        </mesh>
        {/* LiDAR puck */}
        <mesh position={[0, -0.15, -0.1]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
        </mesh>
        <mesh position={[0, -0.15, -0.1]}>
          <cylinderGeometry args={[0.13, 0.13, 0.11, 32]} />
          <meshBasicMaterial color="#050505" />
        </mesh>
        <Html position={[-0.5, -0.2, 0.2]} className="callout-sensor callout-all opacity-0 pointer-events-none">
          <div className="flex items-center gap-4 flex-row-reverse w-[200px] ml-[-200px]">
             <div className="w-12 h-[1px] bg-aerosar-red/80 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-aerosar-red" />
             </div>
             <div className="font-technical text-[10px] tracking-widest uppercase text-aerosar-white text-right">
               03 <br/><span className="text-aerosar-red">PERCEPTION (CAM/LIDAR)</span>
             </div>
          </div>
        </Html>
      </group>
    </group>
  );
};

const SystemSection = () => {
  const sectionRef = useRef(null);
  const dummyRef = useRef({
    droneZ: -15,
    droneY: 0,
    droneRotX: 0.2,
    droneRotY: -0.5,
    explodeFrame: 0,
    explodeFC: 0,
    explodeComputer: 0,
    explodeSensor: 0,
  });

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=8000",
          pin: true,
          scrub: 1,
        }
      });

      const d = dummyRef.current;

      // 1. Approach
      tl.to(".text-system", { opacity: 0, duration: 1 })
        .to(d, { droneZ: -2, droneRotY: 0, droneRotX: 0.1, duration: 2 }, "<")
        .to(".text-not-just", { opacity: 1, duration: 1 }, "-=1")
        .to({}, { duration: 1 }) // pause
        .to(".text-not-just", { opacity: 0, duration: 1 });

      // 2. Rotate & System text
      tl.to(d, { droneRotY: Math.PI, duration: 2 })
        .to(".text-rescue", { opacity: 1, duration: 1 }, "-=1")
        .to({}, { duration: 1 })
        .to(".text-rescue", { opacity: 0, duration: 1 });

      // 3. Highlight FC
      tl.to(d, { droneRotY: Math.PI + Math.PI/4, droneRotX: 0.3, duration: 1.5 })
        .to(".callout-fc", { opacity: 1, duration: 0.5 }, "-=0.5")
        .to({}, { duration: 1.5 })
        .to(".callout-fc", { opacity: 0, duration: 0.5 });

      // 4. Highlight Computer
      tl.to(d, { droneRotY: Math.PI + Math.PI/2, droneRotX: 0, duration: 1.5 })
        .to(".callout-computer", { opacity: 1, duration: 0.5 }, "-=0.5")
        .to({}, { duration: 1.5 })
        .to(".callout-computer", { opacity: 0, duration: 0.5 });

      // 5. Highlight Sensors
      tl.to(d, { droneRotY: Math.PI + Math.PI, droneRotX: -0.2, duration: 1.5 })
        .to(".callout-sensor", { opacity: 1, duration: 0.5 }, "-=0.5")
        .to({}, { duration: 1.5 })
        .to(".callout-sensor", { opacity: 0, duration: 0.5 });

      // 6. Highlight Frame
      tl.to(d, { droneRotY: Math.PI * 2 + Math.PI/4, droneRotX: 0.2, duration: 1.5 })
        .to(".callout-frame", { opacity: 1, duration: 0.5 }, "-=0.5")
        .to({}, { duration: 1.5 })
        .to(".callout-frame", { opacity: 0, duration: 0.5 });

      // 7. Explode View
      tl.to(d, { 
          explodeFrame: 2.5, 
          explodeFC: 1, 
          explodeComputer: -1, 
          explodeSensor: -2, 
          droneRotY: Math.PI * 2 + Math.PI/2,
          droneZ: -4,
          duration: 2 
        })
        .to(".text-exploded", { opacity: 1, duration: 1 }, "-=1.5")
        .to(".callout-all", { opacity: 1, duration: 1 }, "<")
        .to({}, { duration: 2 })
        .to(".text-exploded", { opacity: 0, duration: 1 })
        .to(".callout-all", { opacity: 0, duration: 1 }, "<");

      // 8. Re-assemble
      tl.to(d, {
          explodeFrame: 0, 
          explodeFC: 0, 
          explodeComputer: 0, 
          explodeSensor: 0,
          droneRotY: Math.PI * 2 + Math.PI,
          droneZ: -2,
          duration: 2
        })
        .to(".text-reassemble", { opacity: 1, duration: 1 }, "-=1")
        .to({}, { duration: 1.5 })
        .to(".text-reassemble", { opacity: 0, duration: 1 });

      // 9. Move away & Final Text
      tl.to(d, { droneZ: -20, droneRotY: Math.PI * 4, duration: 2 })
        .to(".text-transition", { opacity: 1, duration: 1 }, "-=1");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#C91F2D" />
          <spotLight position={[0, 10, 0]} intensity={0.5} penumbra={1} angle={0.5} />
          
          <DroneModel dummyRef={dummyRef} />
          
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* HTML Overlays */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center px-6">
        
        <div className="text-system font-technical text-xs tracking-[0.3em] text-aerosar-grey-light uppercase absolute">
          AEROSAR / SYSTEM
        </div>
        
        <div className="text-not-just font-space-grotesk text-4xl md:text-6xl lg:text-7xl text-aerosar-white uppercase tracking-tight text-center absolute opacity-0">
          AEROSAR <br/>
          <span className="text-aerosar-red">IS NOT JUST A DRONE.</span>
        </div>
        
        <div className="text-rescue font-space-grotesk text-4xl md:text-6xl lg:text-7xl text-aerosar-white uppercase tracking-tight text-center absolute opacity-0">
          IT IS AN AUTONOMOUS <br/>
          <span className="text-aerosar-white/50">SEARCH & RESCUE SYSTEM.</span>
        </div>
        
        <div className="text-exploded font-space-grotesk text-3xl md:text-5xl lg:text-6xl text-aerosar-white uppercase tracking-tight text-center absolute opacity-0 bottom-24 md:bottom-32">
          EVERY LAYER <span className="text-aerosar-red">HAS A PURPOSE.</span>
        </div>
        
        <div className="text-reassemble font-space-grotesk text-4xl md:text-6xl lg:text-7xl text-aerosar-white uppercase tracking-tight text-center absolute opacity-0">
          ONE SYSTEM. <br/>
          <span className="text-aerosar-white/50">MULTIPLE CAPABILITIES.</span>
        </div>
        
        <div className="text-transition font-space-grotesk text-4xl md:text-6xl lg:text-7xl text-aerosar-white uppercase tracking-tight text-center absolute opacity-0">
          THE MACHINE <br/>
          <span className="text-aerosar-red">CAN ENTER THE SPACE.</span>
        </div>

      </div>

      {/* Very subtle structural grid on HTML layer */}
      <div className="absolute inset-0 z-20 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-20 mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      
    </section>
  );
};

export default SystemSection;
