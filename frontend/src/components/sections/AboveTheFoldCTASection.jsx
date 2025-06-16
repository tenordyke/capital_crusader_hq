
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Clock, Gift, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AboveTheFoldCTASection = () => {
  const { toast } = useToast();
  const bookingLink = "https://troyatcapital.setmore.com/troy";
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.2, once: true });
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 }; // Reset
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } 
    },
  };

  const handleBookNow = () => {
    window.open(bookingLink, '_blank', 'noopener,noreferrer');
    
    if (window.fbq) {
      window.fbq('track', 'Lead');
    }

    toast({
      title: "Test Drive Adventure Awaits! 🗓️",
      description: "You're on your way to book a super test drive experience!",
      duration: 4000,
      className: "bg-green-600 border-green-700 text-white font-semibold",
    });
  };

  return (
    <motion.section
      ref={ref}
      aria-labelledby="above-fold-cta-title"
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
      className="relative bg-gradient-to-br from-black via-gray-900 to-black py-12 sm:py-16 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-crusaderYellow/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-crusaderRed/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Offer */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-crusaderRed/20 border border-crusaderRed px-4 py-2 rounded-full mb-6"
            >
              <Gift className="w-5 h-5 text-crusaderRed" />
              <span className="text-crusaderRed font-bold">LIMITED TIME OFFER</span>
            </motion.div>
            
            <motion.h2 
              id="above-fold-cta-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-comic text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-white leading-tight"
            >
              Save Up To <span className="text-crusaderYellow text-outline-black-lg">$8,000</span> 
              <br />
              <span className="text-crusaderOrange">On Your Dream Vehicle!</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl text-gray-300 mb-6 leading-relaxed"
            >
              🎯 <span className="text-crusaderYellow font-bold">Employee Pricing</span> + 
              <span className="text-crusaderOrange font-bold"> 0% Financing</span> + 
              <span className="text-green-400 font-bold"> No Payments for 90 Days!</span>
            </motion.p>
            
            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <Clock className="w-6 h-6 text-crusaderYellow" />
              <div className="flex gap-3">
                <div className="bg-gray-800 px-3 py-2 rounded-lg border border-crusaderYellow/50">
                  <span className="text-2xl font-bold text-crusaderYellow">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-xs text-gray-400 block">HOURS</span>
                </div>
                <div className="bg-gray-800 px-3 py-2 rounded-lg border border-crusaderYellow/50">
                  <span className="text-2xl font-bold text-crusaderYellow">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-xs text-gray-400 block">MINS</span>
                </div>
                <div className="bg-gray-800 px-3 py-2 rounded-lg border border-crusaderYellow/50">
                  <span className="text-2xl font-bold text-crusaderYellow">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-xs text-gray-400 block">SECS</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right side - CTA */}
          <div className="text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-black/90 backdrop-blur-sm rounded-3xl p-8 border-3 border-yellow-400/50 shadow-2xl shadow-yellow-400/20 relative overflow-hidden group"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Superhero badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-black font-comic font-black text-sm px-4 py-2 rounded-full transform rotate-12 shadow-lg">
                🦸‍♂️ HERO DEAL!
              </div>
              
              <div className="relative z-10">
                <h3 className="font-comic text-2xl sm:text-3xl font-black text-yellow-400 mb-2">
                  🚗 BOOK YOUR HEROIC TEST DRIVE!
                </h3>
                <p className="text-gray-300 text-lg mb-6 font-semibold">
                  Join the Capital Crusader for an epic car-buying adventure!
                </p>
                
                <div className="bg-gradient-to-r from-green-900/40 via-green-800/30 to-green-900/40 rounded-2xl p-4 mb-6 border border-green-500/30">
                  <h4 className="font-comic text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                    ⚡ WHAT YOU GET:
                  </h4>
                  <ul className="text-left space-y-2">
                    <li className="flex items-center gap-3 text-white">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="font-semibold">Same-Day Appointments Available</span>
                    </li>
                    <li className="flex items-center gap-3 text-white">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="font-semibold">Zero-Pressure Experience Guaranteed</span>
                    </li>
                    <li className="flex items-center gap-3 text-white">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="font-semibold">Free Vehicle History Report</span>
                    </li>
                    <li className="flex items-center gap-3 text-white">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="font-semibold">Personal Auto Superhero Service</span>
                    </li>
                  </ul>
                </div>
                
                <Button
                  onClick={handleBookNow}
                  className="w-full bg-gradient-to-r from-red-600 via-red-700 to-orange-600 hover:from-red-700 hover:via-red-800 hover:to-orange-700 text-white font-comic font-black text-xl sm:text-2xl py-6 rounded-2xl shadow-2xl hover:shadow-red-500/50 hover:scale-105 active:scale-95 transition-all duration-300 group relative overflow-hidden border-2 border-yellow-400/30"
                  aria-label="Book your VIP test drive now"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    🗓️ BOOK MY VIP TEST DRIVE
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                
                <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    ✅ No credit card required
                  </span>
                  <span className="flex items-center gap-1">
                    ⚡ Instant confirmation
                  </span>
                </div>
                
                <p className="text-yellow-400 font-comic text-sm mt-3 font-bold">
                  🦸‍♂️ Your automotive adventure starts here!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboveTheFoldCTASection;
