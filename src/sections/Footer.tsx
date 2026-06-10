import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Platform: ['Features', 'Pricing', 'API Access', 'System Status', 'Changelog'],
  Solutions: ['Government Entities', 'Project Owners', 'Contractors', 'Facility Managers'],
  Resources: ['Documentation', 'Case Studies', 'Blog', 'Security & Compliance'],
  Company: ['About Us', 'Careers', 'Contact', 'Privacy Policy', 'Terms of Service'],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-area',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.footer-col',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.footer-links',
            start: 'top 90%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} id="footer" className="relative bg-[#030F1A] z-10">
      {/* CTA Area */}
      <div
        className="cta-area relative py-20 lg:py-32 px-6 lg:px-10"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(212, 169, 58, 0.05) 0%, transparent 70%)',
        }}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#D4A93A] rounded-full opacity-30"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${20 + Math.random() * 60}%`,
                animation: `float ${4 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="cta-content relative max-w-[1200px] mx-auto text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-[#F0F2F5] tracking-tight">
            Ready to Build Smarter?
          </h2>
          <p className="mt-4 text-lg text-[#B8C4D0] max-w-[600px] mx-auto leading-relaxed">
            Join the GCC's leading construction organizations already using
            BaytyAI to deliver projects on time, on budget, and beyond
            expectations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a href="#" className="btn-primary text-base py-4 px-10">
              Request a Demo
            </a>
            <a href="#" className="btn-secondary text-base py-4 px-10">
              Contact Sales
            </a>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-[rgba(26,58,82,0.4)] px-6 lg:px-10 pt-16 pb-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="footer-links grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="footer-col">
                <h4 className="font-display font-medium text-sm text-[#F0F2F5] mb-4 tracking-wide">
                  {category.toUpperCase()}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-[#B8C4D0] hover:text-[#F0F2F5] transition-colors duration-300"
                        onClick={(e) => e.preventDefault()}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-6 border-t border-[rgba(26,58,82,0.3)] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#B8C4D0]">
              2026 BaytyAI Technologies. All rights reserved.
            </p>
            <p className="font-mono-brand text-xs text-[#1A3A52]">
              Designed for the GCC. Built for the world.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-[#B8C4D0] hover:text-[#D4A93A] transition-colors duration-300"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
