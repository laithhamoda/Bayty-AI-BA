import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Partners from './sections/Partners';
import Capabilities from './sections/Capabilities';
import Intelligence from './sections/Intelligence';
import Modules from './sections/Modules';
import WhyBaytyAI from './sections/WhyBaytyAI';
import Insights from './sections/Insights';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global scroll-triggered reveals
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Staggered reveals
    const staggerContainers = document.querySelectorAll('.stagger-reveal');
    staggerContainers.forEach((container) => {
      const children = container.querySelectorAll('.stagger-item');
      gsap.fromTo(
        children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-deep-obsidian">
      <Navigation />
      <main>
        <Hero />
        <Partners />
        <Capabilities />
        <Intelligence />
        <Modules />
        <WhyBaytyAI />
        <Insights />
      </main>
      <Footer />
    </div>
  );
}

export default App;
