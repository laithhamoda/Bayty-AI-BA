import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FolderKanban, Workflow, Brain, Building2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const modules = [
  {
    icon: FolderKanban,
    title: 'Project Intelligence',
    summary: 'Unified data across every project phase.',
    description:
      'Aggregate data from contractors, consultants, and subcontractors into a single source of truth. Track milestones, budgets, and deliverables in real-time with AI-enriched dashboards.',
    badge: 'Live',
    badgeColor: 'bg-[rgba(212,169,58,0.15)] text-[#D4A93A]',
    image: '/images/og-module-project-intelligence.jpg',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    summary: 'Streamlined processes from approval to closeout.',
    description:
      'Digitize approval chains, automate document routing, and eliminate bottlenecks. Custom workflows adapt to your organization\'s hierarchy and compliance requirements.',
    badge: 'Live',
    badgeColor: 'bg-[rgba(212,169,58,0.15)] text-[#D4A93A]',
    image: '/images/og-module-workflow-automation.jpg',
  },
  {
    icon: Brain,
    title: 'AI Analytics & Predictions',
    summary: 'Turn project data into actionable foresight.',
    description:
      'Machine learning models trained on GCC construction patterns predict delays, cost overruns, and resource conflicts before they materialize. Make decisions with confidence, not guesswork.',
    badge: 'Live',
    badgeColor: 'bg-[rgba(212,169,58,0.15)] text-[#D4A93A]',
    image: '/images/og-module-ai-analytics.jpg',
  },
  {
    icon: Building2,
    title: 'Facility Management',
    summary: 'Operate smarter with AI-driven maintenance.',
    description:
      'Extend BaytyAI\'s intelligence into the operational phase. Monitor building systems, schedule predictive maintenance, and optimize energy consumption across your facility portfolio.',
    badge: 'Beta',
    badgeColor: 'bg-[rgba(26,188,156,0.15)] text-[#1ABC9C]',
    image: '/images/og-module-facility-management.jpg',
  },
];

export default function Modules() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.modules-header',
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

      gsap.fromTo(
        '.module-card',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.modules-grid',
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
      id="modules"
      className="relative w-full py-20 lg:py-32 bg-[#030F1A] z-10"
    >
      {/* Subtle geometric pattern background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 58, 82, 1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(26, 58, 82, 1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative px-6 lg:px-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="modules-header text-center mb-12 lg:mb-20">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#F0F2F5] tracking-tight">
            Powerful Modules. One Platform.
          </h2>
          <p className="mt-4 text-lg text-[#B8C4D0] max-w-[600px] mx-auto leading-relaxed">
            Four integrated engines that transform how you plan, build, and
            operate.
          </p>
        </div>

        {/* Grid */}
        <div className="modules-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div
                key={i}
                className="module-card group liquid-glass p-6 lg:p-8 min-h-[280px] lg:min-h-[320px] relative overflow-hidden cursor-default
                  hover:-translate-y-1 hover:border-[rgba(26,58,82,0.7)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]
                  transition-all duration-500"
              >
                {/* Decorative watermark image */}
                <img
                  src={mod.image}
                  alt=""
                  className="absolute -bottom-4 -right-4 w-[200px] h-[140px] object-cover rounded-lg opacity-[0.08] rotate-[5deg] pointer-events-none group-hover:opacity-[0.12] transition-opacity duration-500"
                />

                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-3">
                  <Icon
                    size={40}
                    className="text-[#D4A93A] group-hover:rotate-[360deg] transition-transform duration-500"
                  />
                  <h3 className="font-display font-medium text-xl lg:text-2xl text-[#F0F2F5]">
                    {mod.title}
                  </h3>
                </div>

                {/* Summary - always visible */}
                <p className="text-[#B8C4D0] text-base mb-4">{mod.summary}</p>

                {/* Description - revealed on hover (desktop) or always visible (mobile) */}
                <div className="lg:grid lg:grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <div className="overflow-hidden">
                    <p className="text-[#B8C4D0] text-base leading-relaxed pt-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-[-8px] lg:group-hover:translate-y-0 transition-all duration-500">
                      {mod.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-[#D4A93A] text-sm font-medium mt-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 delay-100 hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      Learn more <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

                {/* Badge */}
                <span
                  className={`absolute bottom-6 right-6 font-mono-brand text-xs px-3 py-1 rounded-full ${mod.badgeColor}
                    lg:translate-x-[120%] lg:group-hover:translate-x-0 transition-transform duration-500 delay-100`}
                >
                  {mod.badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
