import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { CalendarCheck, Phone, Star, Trophy, DollarSign, Flame, Gift, Zap } from 'lucide-react';

const CurrentOffersSection = lazy(() => import('@/components/sections/CurrentOffersSection'));
const PricingSection = lazy(() => import('@/components/sections/PricingSection'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-yellow-400 border-transparent rounded-full"
    />
    <p className="ml-3 sm:ml-4 text-xl sm:text-2xl font-comic text-yellow-400">Loading Heroic Offers...</p>
  </div>
);

const OffersPage = () => {
  const { toast } = useToast();
  const bookingLink = "https://troyatcapital.setmore.com/troy?utm_source=website&utm_medium=cta&utm_campaign=offers_page";
  const phoneNumber = "+13063314802";

  const handleBookTestDrive = () => {
    window.open(bookingLink, '_blank', 'noopener,noreferrer');
    toast({
      title: "Offer Consultation Booked! 🎯",
      description: "Troy will help you find the perfect deal for your needs!",
      duration: 4000,
      className: "bg-green-600 border-green-700 text-white font-semibold",
    });
  };

  const handleCallNow = () => {
    window.location.href = `tel:${phoneNumber}`;
    toast({
      title: "Calling the Deal Master! 📞",
      description: "Troy is ready to discuss your perfect offer!",
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

  const heroVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
    }
  };

  const titleVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.2 }
    }
  };

  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <div className="flex flex-col items-center">
          {/* Enhanced Page Header */}
          <motion.section 
            className="relative w-full py-16 sm:py-20 md:py-24 overflow-hidden"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
              <motion.div 
                className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                  x: [-10, 10, -10]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute bottom-32 right-16 w-40 h-40 bg-orange-500/20 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.3, 0.2],
                  y: [-15, 15, -15]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              
              {/* Enhanced Badge */}
              <motion.div variants={heroVariants} className="mb-8">
                <div className="flex items-center gap-4 flex-wrap justify-center">
                  <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white rounded-full font-black text-lg sm:text-xl shadow-2xl border-2 border-yellow-400/50 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <Gift className="w-6 h-6 mr-3 animate-bounce relative z-10" />
                    <span className="relative z-10">EXCLUSIVE CAPITAL CRUSADER DEALS</span>
                  </div>
                  <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 border-3 border-yellow-400 rounded-full text-yellow-400 font-comic font-black text-lg sm:text-xl backdrop-blur-md shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 group">
                    <Flame className="w-6 h-6 mr-3 text-yellow-400 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                    <span className="relative z-10">LIMITED TIME OFFERS</span>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Title with Logo */}
              <motion.div variants={titleVariants} className="mb-8">
                <div className="flex items-center justify-center gap-6 mb-6">
                  <img 
                    src="https://tjoyajajskeijhujoczy.supabase.co/storage/v1/object/public/images//Untitled_20250616_072055.png"
                    alt="The Capital Crusader Logo"
                    className="h-16 sm:h-20 w-auto object-contain filter brightness-125 contrast-110"
                  />
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-comic font-black uppercase leading-tight">
                    <span className="block text-yellow-400 text-outline-black-lg drop-shadow-2xl">
                      HEROIC DEALS
                    </span>
                    <span className="block text-orange-500 text-outline-black-lg drop-shadow-2xl mt-2">
                      & OFFERS
                    </span>
                  </h1>
                </div>
                
                <p className="text-xl sm:text-2xl lg:text-3xl text-white max-w-4xl mx-auto font-bold leading-relaxed">
                  Discover <span className="text-yellow-400">unbeatable savings</span> and <span className="text-orange-500">exclusive offers</span> from The Capital Crusader!
                </p>
              </motion.div>

              {/* Enhanced Stats Bar */}
              <motion.div variants={fadeInUp} className="mb-12">
                <div className="bg-gradient-to-r from-black/80 via-black/60 to-black/80 backdrop-blur-md border-2 border-yellow-400/50 rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-500/5 to-red-600/10 animate-pulse"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center relative z-10">
                    <div className="group">
                      <div className="text-3xl sm:text-4xl font-comic font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-2">
                        <DollarSign className="w-8 h-8" />
                        $8,000
                      </div>
                      <div className="text-gray-300 text-lg sm:text-xl font-semibold">Maximum Savings</div>
                    </div>
                    <div className="group">
                      <div className="text-3xl sm:text-4xl font-comic font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-2">
                        <Zap className="w-8 h-8" />
                        0%
                      </div>
                      <div className="text-gray-300 text-lg sm:text-xl font-semibold">APR Available</div>
                    </div>
                    <div className="group">
                      <div className="text-3xl sm:text-4xl font-comic font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-2">
                        <Trophy className="w-8 h-8" />
                        90
                      </div>
                      <div className="text-gray-300 text-lg sm:text-xl font-semibold">Days No Payments</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <Button 
                  onClick={handleBookTestDrive}
                  className="group w-full sm:w-auto font-comic bg-gradient-to-r from-red-600 via-red-700 to-orange-500 hover:from-red-700 hover:via-red-800 hover:to-orange-600 text-white text-xl sm:text-2xl font-black px-10 py-6 sm:px-14 sm:py-8 rounded-2xl shadow-2xl hover:shadow-red-500/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 relative overflow-hidden"
                  aria-label="Book consultation to discuss offers"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <CalendarCheck className="w-7 h-7 relative z-10" />
                  <span className="relative z-10 text-outline-black-sm">BOOK OFFER CONSULTATION</span>
                </Button>
                
                <Button 
                  onClick={handleCallNow}
                  variant="outline"
                  className="group w-full sm:w-auto font-comic border-3 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black text-xl sm:text-2xl font-black px-10 py-6 sm:px-14 sm:py-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 backdrop-blur-md bg-black/20 hover:shadow-2xl hover:shadow-yellow-400/30 hover:scale-105 relative overflow-hidden"
                  aria-label="Call Troy to discuss current offers"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Phone className="w-7 h-7 relative z-10" />
                  <span className="relative z-10 text-outline-black-sm group-hover:text-outline-yellow-md">CALL FOR DEALS</span>
                </Button>
              </motion.div>
            </div>
          </motion.section>

          <CurrentOffersSection 
            fadeInUp={fadeInUp}
            staggerContainer={staggerContainer}
          />
          <PricingSection 
            fadeInUp={fadeInUp}
            staggerContainer={staggerContainer}
          />
        </div>
      </Suspense>
    </Layout>
  );
};

export default OffersPage;
