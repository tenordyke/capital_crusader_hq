import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { websiteProtection } from '@/lib/security';
import Navigation from './Navigation';
import FooterSection from '@/components/sections/FooterSection';
import ExitIntentPopup from './ExitIntentPopup';

const AnimatedBackgroundElement = ({ className, initial, animate, transition, style }) => (
  <motion.div
    className={className}
    style={style}
    initial={initial}
    animate={animate}
    transition={transition}
  />
);

const Layout = ({ children }) => {
  // Initialize ElevenLabs ConvAI widget
  useEffect(() => {
    // Load the ElevenLabs ConvAI script
    if (!document.querySelector('script[src*="convai-widget-embed"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    }

    // Add the ConvAI widget element if it doesn't exist
    if (!document.querySelector('elevenlabs-convai')) {
      const widget = document.createElement('elevenlabs-convai');
      widget.setAttribute('agent-id', 'agent_01jxrzhz1jf7ttr1ym87v6hdjz');
      document.body.appendChild(widget);
    }
  }, []);

  // Initialize security protection
  useEffect(() => {
    const protectCriticalElements = () => {
      const criticalSelectors = [
        '[data-critical]',
        '.hero-section',
        '.lead-capture',
        '.contact-form',
        '.pricing-section'
      ];

      criticalSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          websiteProtection.protectElement(element);
        });
      });
    };

    const timer = setTimeout(protectCriticalElements, 1000);
    return () => clearTimeout(timer);
  }, []);

  const backgroundElements = [
    {
      className: "absolute rounded-full blur-3xl opacity-30",
      style: { width: 'clamp(150px, 40vw, 300px)', height: 'clamp(150px, 40vw, 300px)', top: '5%', left: '10%', background: 'rgba(255, 69, 0, 0.5)' },
      initial: { opacity: 0.2, scale: 0.8 },
      animate: { opacity: [0.2, 0.4, 0.2], scale: [0.8, 1, 0.8], x: [-20, 20, -20] },
      transition: { duration: 12, repeat: Infinity, ease: "easeInOut" }
    },
    {
      className: "absolute rounded-full blur-3xl opacity-40",
      style: { width: 'clamp(200px, 50vw, 400px)', height: 'clamp(200px, 50vw, 400px)', bottom: '10%', right: '15%', background: 'rgba(255, 215, 0, 0.4)' },
      initial: { opacity: 0.3, scale: 0.9 },
      animate: { opacity: [0.3, 0.5, 0.3], scale: [0.9, 1.1, 0.9], y: [30, -30, 30] },
      transition: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }
    },
    {
      className: "absolute rounded-lg blur-3xl opacity-20",
      style: { width: 'clamp(180px, 45vw, 350px)', height: 'clamp(180px, 45vw, 350px)', top: '30%', left: '40%', background: 'rgba(204, 51, 51, 0.4)' },
      initial: { opacity: 0.1, scale: 0.7 },
      animate: { opacity: [0.1, 0.3, 0.1], scale: [0.7, 0.9, 0.7], rotate: [0, 15, 0] },
      transition: { duration: 18, repeat: Infinity, ease: "linear" }
    }
  ];

  return (
    <div className="min-h-screen comic-gradient overflow-x-hidden relative">
      {/* Animated Background */}
      <div aria-hidden="true" className="fixed inset-0 overflow-hidden -z-10">
        {backgroundElements.map((el, i) => (
          <AnimatedBackgroundElement 
            key={i} 
            className={el.className}
            style={el.style}
            initial={el.initial}
            animate={el.animate}
            transition={el.transition}
          />
        ))}
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="pt-20 pb-16 sm:pb-20 md:pb-24">
        {children}
      </main>

      {/* Footer */}
      <FooterSection />

      {/* Global Components */}
      <Toaster />
      <ExitIntentPopup />
    </div>
  );
};

export default Layout;
