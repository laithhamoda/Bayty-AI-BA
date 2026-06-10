import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Simplex noise implementation for GLSL
const simplexNoiseGLSL = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

const glassVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vNoise;

  ${simplexNoiseGLSL}

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    float noise = snoise(position * 0.8 + uTime * 0.15);
    vNoise = noise;
    
    vec3 newPosition = position + normal * noise * 0.6;
    
    // Subtle rotation from mouse
    float rotY = uMouse.x * 0.003;
    float rotX = uMouse.y * 0.003;
    
    mat3 rotMatrix;
    rotMatrix[0] = vec3(cos(rotY), 0.0, sin(rotY));
    rotMatrix[1] = vec3(0.0, 1.0, 0.0);
    rotMatrix[2] = vec3(-sin(rotY), 0.0, cos(rotY));
    
    newPosition = rotMatrix * newPosition;
    
    vPosition = newPosition;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const glassFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;
  varying float vNoise;

  void main() {
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - dot(viewDirection, vNormal), 3.0);
    
    // Chromatic aberration
    float aberration = 0.04;
    vec3 colorR = vec3(0.83, 0.66, 0.23); // Gold #D4A93A
    vec3 colorG = vec3(0.10, 0.23, 0.32); // Deep Teal #1A3A52
    vec3 colorB = vec3(0.04, 0.06, 0.10); // Deep Obsidian #030F1A
    
    vec3 refractedColor = mix(colorG, colorR, vNoise * 0.5 + 0.5);
    
    // Fresnel rim in gold
    vec3 goldRim = vec3(0.83, 0.66, 0.23) * fresnel * 1.5;
    
    // Subtle internal glow
    vec3 internalGlow = mix(colorB, colorG, abs(vNoise)) * 0.3;
    
    vec3 finalColor = refractedColor * 0.4 + goldRim + internalGlow;
    
    // Add subtle iridescence
    float iridescence = sin(vNoise * 10.0 + uTime * 0.5) * 0.1;
    finalColor += vec3(iridescence * 0.5, iridescence * 0.3, iridescence * 0.1);
    
    float alpha = 0.6 + fresnel * 0.4;
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function GlassMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      
      materialRef.current.uniforms.uMouse.value.set(
        mouseRef.current.x,
        mouseRef.current.y
      );
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={Math.min(viewport.width, viewport.height) * 0.25}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={glassVertexShader}
        fragmentShader={glassFragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 40;

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
      spd[i] = 0.002 + Math.random() * 0.003;
    }
    return { positions: pos, speeds: spd };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const posArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArray[i * 3 + 1] += speeds[i];
        posArray[i * 3] += Math.sin(Date.now() * 0.001 + i) * 0.001;
        if (posArray[i * 3 + 1] > 5) {
          posArray[i * 3 + 1] = -5;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#D4A93A"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#D4A93A" />
      <pointLight position={[-5, -5, 3]} intensity={0.3} color="#1A3A52" />
      <GlassMesh />
      <Particles />
      <EffectComposer>
        <Bloom
          intensity={0.35}
          luminanceThreshold={0.7}
          luminanceSmoothing={0.8}
          radius={0.8}
        />
      </EffectComposer>
    </>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Hero entrance animations
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.fromTo(
      '.hero-title-line',
      { opacity: 0, y: 40, filter: 'blur(12px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
      }
    )
      .fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        '.scroll-indicator',
        { opacity: 0 },
        { opacity: 0.5, duration: 1 },
        '-=0.2'
      );

    // Scroll-driven fade
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '50% top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(canvasContainerRef.current, {
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '80% top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-end overflow-hidden"
    >
      {/* Three.js Canvas Background */}
      <div
        ref={canvasContainerRef}
        className="fixed inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #0A1A2A 0%, #1A3A52 50%, #030F1A 100%)' }}
      >
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full px-6 lg:px-10 pb-20 lg:pb-24 pt-32"
      >
        <div className="max-w-[700px]">
          {/* Glass text panel */}
          <div className="liquid-glass p-6 lg:p-8 inline-block">
            <h1 className="font-display font-bold tracking-tight">
              <span className="hero-title-line block text-4xl sm:text-5xl lg:text-7xl text-[#F0F2F5] leading-[1.1] opacity-0">
                Where Vision
              </span>
              <span className="hero-title-line block text-4xl sm:text-5xl lg:text-7xl text-[#D4A93A] leading-[1.1] opacity-0">
                Meets Intelligence
              </span>
              <span className="hero-title-line block text-3xl sm:text-4xl lg:text-5xl text-[#F0F2F5] leading-[1.2] mt-2 opacity-0">
                AI-Powered Construction
              </span>
              <span className="hero-title-line block text-3xl sm:text-4xl lg:text-5xl text-[rgba(240,242,245,0.7)] leading-[1.2] opacity-0">
                Management for the GCC
              </span>
            </h1>

            <p className="hero-subtitle mt-6 text-base lg:text-lg text-[#B8C4D0] max-w-[520px] leading-relaxed opacity-0">
              Unify project data, automate workflows, and harness predictive
              analytics — built for government entities, mega-project owners,
              and contractors across the GCC.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-4 mt-8 opacity-0">
              <a href="#modules" className="btn-primary text-base flex items-center justify-center gap-2">
                Explore the Platform
              </a>
              <button className="btn-secondary text-base flex items-center justify-center gap-2">
                <Play size={16} fill="currentColor" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
          <span className="font-mono-brand text-xs text-[#B8C4D0] tracking-wider">
            SCROLL TO EXPLORE
          </span>
          <div className="w-0.5 h-10 bg-[rgba(184,196,208,0.2)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-[#B8C4D0] animate-scroll-line" />
          </div>
        </div>
      </div>

      {/* Vignette Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(3,15,26,0.6) 100%)',
        }}
      />
    </section>
  );
}
