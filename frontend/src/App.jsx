
import React, { Suspense, lazy, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { websiteProtection } from '@/lib/security';

import ExitIntentPopup from '@/components/layout/ExitIntentPopup';


const HeroSection = lazy(() => import('@/components/sections/HeroSection'));
const TrustBarSection = lazy(() => import('@/components/sections/TrustBarSection'));
const WhyShopSection = lazy(() => import('@/components/sections/WhyShopSection'));
const AboveTheFoldCTASection = lazy(() => import('@/components/sections/AboveTheFoldCTASection'));
const CurrentOffersSection = lazy(() => import('@/components/sections/CurrentOffersSection'));
const LeadCaptureSection = lazy(() => import('@/components/sections/LeadCaptureSection')); 
const TestimonialCarouselSection = lazy(() => import('@/components/sections/TestimonialCarouselSection'));
const FAQSection = lazy(() => import('@/components/sections/FAQSection'));
const WalkaroundSection = lazy(() => import('@/components/sections/WalkaroundSection'));

const FooterSection = lazy(() => import('@/components/sections/FooterSection'));


const AnimatedBackgroundElement = ({ className, initial, animate, transition, style }) => (
  <motion.div
    className={className}
    style={style}
    initial={initial}
    animate={animate}
    transition={transition}
  />
);

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center comic-gradient p-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-yellow-400 border-transparent rounded-full"
    />
    <p className="ml-3 sm:ml-4 text-xl sm:text-2xl font-comic text-yellow-400">Loading Crusader Content...</p>
  </div>
);


function App() {
  const { toast } = useToast();
  const bookingLink = "https://troyatcapital.setmore.com/troy?utm_source=website&utm_medium=cta&utm_campaign=stickyfooter_testdrive";

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
    // Security is already initialized when the module loads
    // Mark critical elements as protected once DOM is ready
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

    // Protect elements after a short delay to ensure DOM is ready
    const timer = setTimeout(protectCriticalElements, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBookTestDrive = () => {
    window.open(bookingLink, '_blank', 'noopener,noreferrer');
    toast({
      title: "Smart Move! 🚀",
      description: "Redirecting you to book your VIP Test Drive!",
      duration: 3000,
    });
  };
  
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const staggerContainer = {
    initial: {}, 
    animate: { 
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2, 
      }
    }
  };
  
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
    <div className="min-h-screen comic-gradient overflow-x-hidden relative pb-16 sm:pb-20 md:pb-24">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden -z-10">
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
      
      <Suspense fallback={<LoadingFallback />}>
        <main role="main" className="flex flex-col items-center">
          <HeroSection 
            fadeInUp={fadeInUp} 
            staggerContainer={staggerContainer} 
          />
          <TrustBarSection fadeInUp={fadeInUp} />
          <WhyShopSection
            fadeInUp={fadeInUp}
            staggerContainer={staggerContainer}
          />
          <AboveTheFoldCTASection />
          <CurrentOffersSection 
            fadeInUp={fadeInUp}
            staggerContainer={staggerContainer}
          />
          <LeadCaptureSection 
            fadeInUp={fadeInUp}
            staggerContainer={staggerContainer}
          />
          <TestimonialCarouselSection
            fadeInUp={fadeInUp}
            staggerContainer={staggerContainer}
          />
          <FAQSection
            fadeInUp={fadeInUp}
            staggerContainer={staggerContainer}
          />
          <WalkaroundSection 
            fadeInUp={fadeInUp} 
            staggerContainer={staggerContainer} 
          />
        </main>
        <FooterSection />
      </Suspense>
      <Toaster />
      <ExitIntentPopup />
    </div>
  );
}

export default App;
