import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Shield,
  FileText,
  Users,
  Lock,
  BarChart3,
  TrendingUp,
  Layers,
  Zap,
  Clipboard,
  Wrench,
  Truck,
  HardHat,
  Building2,
  Thermometer,
  Bell,
  Calendar,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: 'Government Entities',
    image: '/images/capability-gov.jpg',
    description: 'Streamlined oversight across ministries',
    items: [
      { icon: Shield, title: 'Regulatory Compliance', desc: 'Built-in NCA, SDAIA, and MoF frameworks for Saudi government standards.' },
      { icon: FileText, title: 'Automated Reporting', desc: 'Generate ministry-ready reports with one click.' },
      { icon: Users, title: 'Multi-Stakeholder Coordination', desc: 'Align contractors, consultants, and supervisors in one platform.' },
      { icon: Lock, title: 'Secure Data Handling', desc: 'Government-grade encryption and access controls.' },
    ],
  },
  {
    title: 'Mega Project Owners',
    image: '/images/capability-mega.jpg',
    description: 'Unified command for nation-scale developments',
    items: [
      { icon: BarChart3, title: 'Portfolio Visibility', desc: 'Monitor all your projects from a unified command center.' },
      { icon: TrendingUp, title: 'Progress Tracking', desc: 'Real-time dashboards with milestone and KPI alerts.' },
      { icon: Layers, title: 'Resource Optimization', desc: 'AI-powered allocation of labor, materials, and equipment.' },
      { icon: Zap, title: 'Risk Forecasting', desc: 'Predict delays and cost overruns before they happen.' },
    ],
  },
  {
    title: 'Contractors',
    image: '/images/capability-contractors.jpg',
    description: 'Precision execution at every site',
    items: [
      { icon: Clipboard, title: 'Site Management', desc: 'Daily logs, inspections, and approvals — all digital.' },
      { icon: Wrench, title: 'Workforce Coordination', desc: 'Schedule crews, track attendance, and manage certifications.' },
      { icon: Truck, title: 'Material Tracking', desc: 'From procurement to installation, track every material.' },
      { icon: HardHat, title: 'Safety Compliance', desc: 'Automated safety checklists and incident reporting.' },
    ],
  },
  {
    title: 'Facility Managers',
    image: '/images/capability-facility.jpg',
    description: 'Smart operations for built assets',
    items: [
      { icon: Building2, title: 'Asset Management', desc: 'Complete inventory of building systems and equipment.' },
      { icon: Thermometer, title: 'Energy Monitoring', desc: 'Track consumption patterns and optimize HVAC operations.' },
      { icon: Bell, title: 'Predictive Maintenance', desc: 'AI alerts you before equipment fails.' },
      { icon: Calendar, title: 'Lifecycle Planning', desc: 'Long-term maintenance scheduling and budget forecasting.' },
    ],
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // Auto-rotate images every 4 seconds
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % categories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cap-header',
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
        '.cap-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.cap-grid',
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
      className="relative w-full py-20 lg:py-32 bg-[#FDF8F0] z-10"
    >
      <div className="px-6 lg:px-10 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="cap-header text-center mb-16 lg:mb-20">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#030F1A] tracking-tight">
            Built for Every Scale
          </h2>
          <p className="mt-4 text-lg text-[#142840] max-w-[700px] mx-auto leading-relaxed">
            From government ministries to specialized contractors, BaytyAI
            adapts to your operational reality.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left - Sticky Image Card */}
          <div className="lg:w-[40%] lg:sticky lg:top-32 lg:self-start">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#0A1A2A]">
              {categories.map((cat, i) => (
                <img
                  key={i}
                  src={cat.image}
                  alt={cat.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    i === activeImage ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[rgba(3,15,26,0.3)]" />

              {/* Label */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display font-medium text-xl lg:text-2xl text-[#F0F2F5]">
                  {categories[activeImage].title}
                </p>
                <p className="text-sm text-[#B8C4D0] mt-1">
                  {categories[activeImage].description}
                </p>
              </div>

              {/* Dots indicator */}
              <div className="absolute top-6 right-6 flex gap-2">
                {categories.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === activeImage
                        ? 'bg-[#D4A93A] w-6'
                        : 'bg-[rgba(240,242,245,0.3)]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right - Scrolling Categories */}
          <div className="lg:w-[60%] flex flex-col gap-12 lg:gap-16">
            {categories.map((category, catIndex) => (
              <div key={catIndex}>
                <h3 className="font-display font-bold text-xl lg:text-2xl text-[#030F1A] mb-6">
                  {category.title}
                </h3>
                <div className="cap-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={itemIndex}
                        className="cap-card bg-[#F0F2F5] border border-[rgba(3,15,26,0.08)] rounded-[10px] p-5 hover:border-[rgba(26,58,82,0.3)] hover:shadow-[0_4px_12px_rgba(3,15,26,0.06)] transition-all duration-300 cursor-default"
                      >
                        <Icon size={24} className="text-[#1A3A52] mb-3" />
                        <h4 className="font-display font-medium text-base text-[#030F1A] mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-[#142840] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
