import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const differentiators = [
  {
    number: '01',
    title: 'Arabic-First Design',
    description:
      'Built for Arabic workflows from day one — not translated as an afterthought. Every interface, report, and data field supports RTL natively.',
  },
  {
    number: '02',
    title: 'Government-Ready Compliance',
    description:
      'Pre-configured for Saudi NCA, UAE BIM mandates, and Qatar GSAS standards. Audit trails, e-signatures, and regulatory reporting built in.',
  },
  {
    number: '03',
    title: 'Predictive AI Engine',
    description:
      'Our proprietary machine learning models are trained on 50,000+ GCC construction data points — delivering predictions you can trust.',
  },
  {
    number: '04',
    title: 'Rapid Deployment',
    description:
      'Go live in 30 days, not 12 months. Our modular architecture means you start with what you need and expand on your timeline.',
  },
  {
    number: '05',
    title: 'Enterprise Security',
    description:
      'ISO 27001 certified, SOC 2 Type II audited, with GCC data residency options. Your project data never leaves the region.',
  },
  {
    number: '06',
    title: 'Unified Ecosystem',
    description:
      'One platform for the entire project lifecycle — from pre-construction planning through handover to facility management. No more data silos.',
  },
];

export default function WhyBaytyAI() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.why-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Watermark parallax
      gsap.to(watermarkRef.current, {
        y: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Differentiator items stagger
      gsap.fromTo(
        '.diff-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.diff-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="relative w-full py-20 lg:py-32 bg-[#030F1A] z-10 overflow-hidden"
    >
      {/* Background Text */}
      <div
        ref={watermarkRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        {['BUILT', 'FOR THE', 'GCC'].map((word, i) => (
          <span
            key={i}
            className="font-display font-bold text-[12vw] lg:text-[15vw] leading-[0.9] text-[rgba(240,242,245,0.02)] whitespace-nowrap block"
          >
            {word}
          </span>
        ))}
      </div>

      <div className="relative px-6 lg:px-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="why-header mb-12 lg:mb-16">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#F0F2F5] tracking-tight">
            Why BaytyAI?
          </h2>
        </div>

        {/* Grid */}
        <div className="diff-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {differentiators.map((item, i) => (
            <div key={i} className="diff-item">
              <span className="font-display font-bold text-3xl lg:text-4xl text-[#1A3A52]">
                {item.number}
              </span>
              <h3 className="font-display font-medium text-xl text-[#F0F2F5] mt-2 mb-3">
                {item.title}
              </h3>
              <p className="text-base text-[#B8C4D0] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
