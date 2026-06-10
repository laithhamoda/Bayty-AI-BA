import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: 'SBG', abbr: 'SBG' },
  { name: 'Nesma & Partners', abbr: 'NESMA' },
  { name: 'El Seif Engineering', abbr: 'ELSEIF' },
  { name: 'Arabtec', abbr: 'ARABTEC' },
  { name: 'MAKKAH Construction', abbr: 'MAKKAH' },
  { name: 'Roshn', abbr: 'ROSHN' },
  { name: 'Red Sea Global', abbr: 'RED SEA' },
  { name: 'NEOM', abbr: 'NEOM' },
  { name: 'Dubai Municipality', abbr: 'DUBAI' },
  { name: 'Qatar Rail', abbr: 'QATAR' },
];

function PartnerLogo({ name, abbr }: { name: string; abbr: string }) {
  return (
    <div className="flex-shrink-0 w-[140px] h-[60px] flex items-center justify-center mx-10 group">
      <div className="flex flex-col items-center gap-1 opacity-50 hover:opacity-80 transition-opacity duration-300">
        <span className="font-display font-bold text-xl text-[#B8C4D0] tracking-wider group-hover:text-[#F0F2F5] transition-colors">
          {abbr}
        </span>
        <span className="text-[9px] text-[#B8C4D0] tracking-widest uppercase opacity-60">
          {name}
        </span>
      </div>
    </div>
  );
}

export default function Partners() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        trackRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Double the partners array for seamless loop
  const allPartners = [...partners, ...partners];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 overflow-hidden bg-transparent z-10"
    >
      <p className="font-mono-brand text-xs text-[#B8C4D0] text-center tracking-widest uppercase mb-6 opacity-50">
        Trusted across the GCC
      </p>

      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#030F1A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#030F1A] to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex animate-marquee hover:[animation-play-state:paused]"
        >
          {allPartners.map((partner, i) => (
            <PartnerLogo key={`${partner.abbr}-${i}`} name={partner.name} abbr={partner.abbr} />
          ))}
        </div>
      </div>
    </section>
  );
}
