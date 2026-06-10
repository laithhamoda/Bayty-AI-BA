import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  {
    label: 'Predictive Analytics',
    features: [
      'Forecast project completion dates with 94% accuracy',
      'Identify bottleneck patterns across your portfolio',
      'AI-generated recommendations for resource reallocation',
      'Historical trend analysis from 10,000+ project data points',
    ],
    image: '/images/intelligence-dashboard.jpg',
  },
  {
    label: 'Risk Intelligence',
    features: [
      'Real-time risk scoring for every work package',
      'Automated escalation to project stakeholders',
      'Weather, market, and geopolitical risk integration',
      'Proactive mitigation strategy suggestions',
    ],
    image: '/images/intelligence-risk.jpg',
  },
  {
    label: 'Cost Optimization',
    features: [
      'AI-powered cost variance analysis',
      'Vendor pricing benchmark comparisons',
      'Change order impact prediction',
      'Budget forecasting with confidence intervals',
    ],
    image: '/images/intelligence-cost.jpg',
  },
  {
    label: 'Schedule Intelligence',
    features: [
      'Critical path auto-detection and monitoring',
      'Delay cascade impact modeling',
      'What-if scenario simulation',
      'Milestone drift early warnings',
    ],
    image: '/images/intelligence-schedule.jpg',
  },
];

export default function Intelligence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (index: number) => {
    if (index === activeTab || isAnimating) return;
    setIsAnimating(true);

    // Animate out
    gsap.to(contentRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.2,
      onComplete: () => {
        setActiveTab(index);
        // Animate in
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            delay: 0.1,
            onComplete: () => setIsAnimating(false),
          }
        );
      },
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        '.intel-header',
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
        y: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intelligence"
      className="relative w-full py-20 lg:py-32 bg-[#030F1A] z-10 overflow-hidden min-h-screen"
    >
      {/* Watermark */}
      <div
        ref={watermarkRef}
        className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden"
      >
        {'BAYTYAI'.split('').map((letter, i) => (
          <span
            key={i}
            className="font-display font-bold text-[18vw] leading-[0.85] text-[rgba(240,242,245,0.03)] block"
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="relative px-6 lg:px-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="intel-header mb-12 lg:mb-16">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#F0F2F5] tracking-tight">
            Intelligence at the Core
          </h2>
          <p className="mt-4 text-lg text-[#B8C4D0] max-w-[500px] leading-relaxed">
            AI that learns your projects and predicts what comes next.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 lg:gap-8 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => handleTabChange(i)}
              className={`relative font-display font-medium text-sm lg:text-base whitespace-nowrap pb-3 transition-colors duration-300 ${
                i === activeTab ? 'text-[#F0F2F5]' : 'text-[#B8C4D0] hover:text-[#F0F2F5]'
              }`}
            >
              {tab.label}
              {i === activeTab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4A93A] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div ref={contentRef} className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left - Features */}
          <div className="lg:w-1/2">
            <ul className="space-y-5">
              {tabs[activeTab].features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[rgba(212,169,58,0.15)] flex items-center justify-center mt-0.5">
                    <Check size={12} className="text-[#D4A93A]" />
                  </span>
                  <span className="text-base text-[#F0F2F5] leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Image */}
          <div className="lg:w-1/2">
            <div className="liquid-glass rounded-xl overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src={tabs[activeTab].image}
                alt={tabs[activeTab].label}
                className="w-full aspect-[3/2] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
