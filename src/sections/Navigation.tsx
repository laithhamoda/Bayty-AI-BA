import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Platform', href: '#modules' },
  { label: 'Modules', href: '#modules' },
  { label: 'Insights', href: '#insights' },
  { label: 'About', href: '#why' },
  { label: 'Contact', href: '#footer' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-10 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(3,15,26,0.85)] backdrop-blur-xl border-b border-[rgba(26,58,82,0.3)]'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            className="text-[#D4A93A]"
          >
            <path
              d="M16 2L4 9V23L16 30L28 23V9L16 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M16 2V16M16 16L4 9M16 16L28 9M16 16V30"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            <path
              d="M4 9L16 16L28 9"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="text-[#F0F2F5]">BAYTY</span>
            <span className="text-[#D4A93A]">AI</span>
          </span>
        </a>

        {/* Center Links - Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-medium text-[#B8C4D0] hover:text-[#F0F2F5] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          <span className="text-xs font-medium text-[#B8C4D0]">
            <span className="text-[#F0F2F5]">EN</span>
            <span className="mx-1">|</span>
            <span className="hover:text-[#F0F2F5] cursor-pointer transition-colors">عربي</span>
          </span>
          <a
            href="#"
            className="text-sm font-medium text-[#B8C4D0] hover:text-[#F0F2F5] transition-colors duration-300"
          >
            Client Login
          </a>
          <a
            href="#footer"
            onClick={(e) => handleLinkClick(e, '#footer')}
            className="btn-primary text-sm py-2.5 px-6"
          >
            Request Demo
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-[#F0F2F5] p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(3,15,26,0.97)] flex flex-col items-center justify-center gap-8 lg:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-display font-medium text-2xl text-[#F0F2F5] hover:text-[#D4A93A] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col items-center gap-4 mt-8">
            <span className="text-sm font-medium text-[#B8C4D0]">
              <span className="text-[#F0F2F5]">EN</span>
              <span className="mx-2">|</span>
              <span>عربي</span>
            </span>
            <a
              href="#footer"
              onClick={(e) => handleLinkClick(e, '#footer')}
              className="btn-primary text-base py-3 px-8"
            >
              Request Demo
            </a>
          </div>
        </div>
      )}
    </>
  );
}
