import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const insights = [
  {
    image: '/images/insight-1.jpg',
    category: 'AI Research',
    title: 'How AI Is Reshaping Mega-Project Delivery in Saudi Arabia',
    excerpt:
      'With Vision 2030 driving $3 trillion in infrastructure investment, artificial intelligence is becoming the critical differentiator...',
  },
  {
    image: '/images/insight-2.jpg',
    category: 'Market Analysis',
    title: 'The State of Construction Digitalization Across the GCC',
    excerpt:
      'A comprehensive look at digital adoption rates, technology spending, and the platforms shaping the region\'s building sector...',
  },
  {
    image: '/images/insight-3.jpg',
    category: 'Product Update',
    title: 'From Spreadsheets to Intelligence: The BaytyAI Workflow',
    excerpt:
      'Why we built BaytyAI to replace the patchwork of Excel, email, and legacy ERPs that still dominate construction management...',
  },
];

export default function Insights() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.insights-header',
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
        '.insight-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.insights-grid',
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
      id="insights"
      className="relative w-full py-20 lg:py-32 bg-[#0A1A2A] z-10"
    >
      <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="insights-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-16">
          <div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#F0F2F5] tracking-tight">
              Latest Insights
            </h2>
            <p className="mt-4 text-lg text-[#B8C4D0] max-w-[500px] leading-relaxed">
              Perspectives on AI, construction technology, and the future of
              building in the GCC.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-[#D4A93A] font-medium hover:underline whitespace-nowrap"
            onClick={(e) => e.preventDefault()}
          >
            View all <ArrowRight size={16} />
          </a>
        </div>

        {/* Grid */}
        <div className="insights-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((item, i) => (
            <article
              key={i}
              className="insight-card group liquid-glass overflow-hidden cursor-pointer
                hover:-translate-y-1 hover:border-[rgba(26,58,82,0.7)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]
                transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="font-mono-brand text-xs text-[#D4A93A] tracking-wider uppercase">
                  {item.category}
                </span>
                <h3 className="font-display font-medium text-lg text-[#F0F2F5] mt-2 mb-3 line-clamp-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-[#B8C4D0] line-clamp-3 leading-relaxed mb-4">
                  {item.excerpt}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-[#D4A93A] font-medium group-hover:underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Read more <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
