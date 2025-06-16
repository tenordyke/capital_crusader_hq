import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CalendarCheck, Phone, Star, Trophy, Shield, Zap, DollarSign, Award, Flame } from 'lucide-react';

const HeroSection = ({ fadeInUp, staggerContainer }) => {
  const { toast } = useToast();
  const bookingLink = "https://troyatcapital.setmore.com/troy?utm_source=website&utm_medium=cta&utm_campaign=hero_testdrive";
  const phoneNumber = "+13063314802";

  const handleBookTestDrive = () => {
    window.open(bookingLink, '_blank', 'noopener,noreferrer');
    toast({
      title: "Test Drive Mission Set! 🗓️",
      description: "You're one step closer to a heroic car buying experience!",
      duration: 4000,
      className: "bg-green-600 border-green-700 text-white font-semibold",
    });
  };

  const handleCallNow = () => {
    window.location.href = `tel:${phoneNumber}`;
    toast({
      title: "Dialing the Crusader! 📞",
      description: "Troy is ready to help you save the day!",
      duration: 3000,
    });
  };

  // Enhanced animation variants
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

  const imageVariants = {
    initial: { opacity: 0, scale: 0.9, rotateY: -15 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      transition: { duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.4 }
    }
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.8 }
    }
  };

  return (
    <motion.section
      id="hero"
      aria-labelledby="hero-title"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-crusaderYellow/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [-10, 10, -10]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-32 right-16 w-40 h-40 bg-crusaderOrange/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
            y: [-15, 15, -15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-crusaderRed/15 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Enhanced Badge with Urgency */}
        <motion.div variants={heroVariants} className="mb-6">
          <div className="inline-flex items-center gap-4 flex-wrap justify-center">
            <div className="inline-flex items-center px-6 py-3 bg-crusaderRed text-white rounded-full font-black text-base sm:text-lg animate-pulse">
              <Flame className="w-5 h-5 mr-2" />
              LIMITED TIME: $500 OFF + 0% APR
            </div>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-black/90 via-black/80 to-black/90 border-2 border-crusaderYellow rounded-full text-crusaderYellow font-comic font-black text-base sm:text-lg backdrop-blur-md shadow-2xl">
              <Trophy className="w-5 h-5 mr-2 text-crusaderYellow" />
              Regina's #1 Auto Superhero
            </div>
          </div>
        </motion.div>

        {/* Enhanced Main Title with Value Prop */}
        <motion.div variants={titleVariants} className="mb-6 sm:mb-8">
          <h1 
            id="hero-title"
            className="font-comic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-tight relative"
          >
            <span className="block text-white text-lg sm:text-xl md:text-2xl mb-2 font-bold">
              SAVE UP TO $8,000 ON
            </span>
            <span className="block text-crusaderYellow text-outline-black-lg drop-shadow-2xl">
              GMC, BUICK & CADILLAC
            </span>
            <span className="block text-crusaderOrange text-outline-black-lg drop-shadow-2xl mt-2">
              NO PRESSURE. JUST SAVINGS!
            </span>
          </h1>
        </motion.div>

        {/* Enhanced Hero Image */}
        <motion.div variants={imageVariants} className="mb-10 sm:mb-12">
          <div className="relative max-w-3xl mx-auto group">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-r from-crusaderYellow/30 via-crusaderOrange/20 to-crusaderRed/30 rounded-3xl blur-2xl scale-105 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            <img 
              src="https://tjoyajajskeijhujoczy.supabase.co/storage/v1/object/public/images//Untitled_20250615_200233.png"
              alt="Troy Nordyke - Capital Crusader, your Regina auto superhero with business card"
              className="relative w-full h-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 border-4 border-crusaderYellow/30"
              loading="eager"
            />
            
            {/* Floating elements around image */}
            <motion.div 
              className="absolute -top-4 -right-4 w-12 h-12 bg-crusaderYellow rounded-full flex items-center justify-center shadow-lg"
              animate={{ 
                y: [-5, 5, -5],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Star className="w-6 h-6 text-black" />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-crusaderOrange rounded-full flex items-center justify-center shadow-lg"
              animate={{ 
                y: [5, -5, 5],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Service Highlights */}
        <motion.div variants={fadeInUp} className="mb-10 sm:mb-12">
          <h2 className="font-comic text-3xl sm:text-4xl md:text-5xl font-black text-crusaderOrange mb-6 text-outline-black-lg">
            LEGENDARY SERVICE
          </h2>
          <div className="bg-gradient-to-r from-black/60 via-black/40 to-black/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-crusaderYellow/30 max-w-6xl mx-auto">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white font-bold leading-relaxed">
              <span className="text-crusaderYellow">🦸‍♂️ VIP Treatment</span> • 
              <span className="text-blue-300">🚗 Zero-Pressure Experience</span> • 
              <span className="text-crusaderOrange">⚡ Lightning-Fast Approvals</span>
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl text-yellow-300 font-black mt-4 text-outline-black-lg">
              Your Trusted Regina Auto Superhero Saves The Day!
            </p>
          </div>
        </motion.div>

        {/* Enhanced Perks Cards */}
        <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 sm:mb-12 max-w-6xl mx-auto">
          {[
            { icon: Shield, title: "Zero Pressure", desc: "No pushy sales tactics", color: "text-blue-400" },
            { icon: Zap, title: "Lightning Fast", desc: "Quick approvals & delivery", color: "text-yellow-400" },
            { icon: DollarSign, title: "Best Prices", desc: "Transparent, fair deals", color: "text-green-400" },
            { icon: Award, title: "5-Star Service", desc: "Regina's top-rated dealer", color: "text-orange-400" }
          ].map((perk, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group bg-gradient-to-br from-black/70 via-black/50 to-black/70 backdrop-blur-md border-2 border-crusaderYellow/30 rounded-2xl p-6 text-center hover:border-crusaderYellow hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-crusaderYellow/5 via-transparent to-crusaderOrange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <perk.icon className={`w-12 h-12 mx-auto mb-4 ${perk.color} relative z-10`} />
              <h3 className="font-comic text-xl sm:text-2xl font-black text-crusaderYellow mb-3 relative z-10">{perk.title}</h3>
              <p className="text-gray-300 text-base sm:text-lg relative z-10">{perk.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Stats Bar */}
        <motion.div variants={fadeInUp} className="mb-10 sm:mb-12">
          <div className="bg-gradient-to-r from-black/80 via-black/60 to-black/80 backdrop-blur-md border-2 border-crusaderYellow/50 rounded-2xl p-6 sm:p-8 max-w-5xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-crusaderYellow/10 via-crusaderOrange/5 to-crusaderRed/10 animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center relative z-10">
              <div className="group">
                <div className="text-4xl sm:text-5xl font-comic font-black text-crusaderYellow mb-2 group-hover:scale-110 transition-transform duration-300">1,000+</div>
                <div className="text-gray-300 text-lg sm:text-xl font-semibold">Happy Regina Drivers</div>
              </div>
              <div className="group">
                <div className="text-4xl sm:text-5xl font-comic font-black text-crusaderYellow mb-2 group-hover:scale-110 transition-transform duration-300">0%</div>
                <div className="text-gray-300 text-lg sm:text-xl font-semibold">Financing Available</div>
              </div>
              <div className="group">
                <div className="text-4xl sm:text-5xl font-comic font-black text-crusaderYellow mb-2 group-hover:scale-110 transition-transform duration-300">5-Star</div>
                <div className="text-gray-300 text-lg sm:text-xl font-semibold">Customer Reviews</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div variants={buttonVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
          <Button 
            onClick={handleBookTestDrive}
            className="group w-full sm:w-auto font-comic bg-gradient-to-r from-crusaderRed via-red-600 to-orange-500 hover:from-red-700 hover:via-red-800 hover:to-orange-600 text-white text-xl sm:text-2xl font-black px-10 py-6 sm:px-14 sm:py-8 rounded-2xl shadow-2xl hover:shadow-crusaderRed/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 relative overflow-hidden"
            aria-label="Book your heroic test drive with Troy"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <CalendarCheck className="w-7 h-7 relative z-10" />
            <span className="relative z-10 text-outline-black-sm">BOOK HEROIC TEST DRIVE</span>
          </Button>
          
          <Button 
            onClick={handleCallNow}
            variant="outline"
            className="group w-full sm:w-auto font-comic border-3 border-crusaderYellow text-crusaderYellow hover:bg-crusaderYellow hover:text-black text-xl sm:text-2xl font-black px-10 py-6 sm:px-14 sm:py-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 backdrop-blur-md bg-black/20 hover:shadow-2xl hover:shadow-crusaderYellow/30 hover:scale-105 relative overflow-hidden"
            aria-label="Call Troy directly for immediate assistance"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-crusaderYellow/20 via-transparent to-crusaderYellow/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <Phone className="w-7 h-7 relative z-10" />
            <span className="relative z-10 text-outline-black-sm group-hover:text-outline-yellow-md">CALL TROY NOW</span>
          </Button>
        </motion.div>


      </div>
    </motion.section>
  );
};

export default HeroSection;
