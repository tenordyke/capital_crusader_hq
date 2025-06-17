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
      {/* Advanced 3D Parallax Background System */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Layer 1: Deep Background */}
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [-10, 10, -10],
            rotateZ: [0, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: 'translateZ(-100px)' }}
        />
        
        {/* Layer 2: Mid Background */}
        <motion.div 
          className="absolute bottom-32 right-16 w-40 h-40 bg-orange-500/20 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
            y: [-15, 15, -15],
            rotateZ: [360, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ transform: 'translateZ(-50px)' }}
        />
        
        {/* Layer 3: Foreground */}
        <motion.div 
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-600/15 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transform: 'translateZ(-25px)' }}
        />
        
        {/* Advanced Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-16 h-16 border border-yellow-400/30 rotate-45"
          animate={{
            rotate: [45, 405],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ 
            background: 'linear-gradient(45deg, rgba(255,193,7,0.1), transparent)',
            transform: 'translateZ(-75px)'
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-orange-500/30"
          animate={{
            rotate: [0, -360],
            scale: [1, 0.8, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ 
            background: 'linear-gradient(135deg, rgba(255,152,0,0.1), transparent)',
            borderRadius: '30%',
            transform: 'translateZ(-60px)'
          }}
        />
        
        {/* Floating Orbs with Physics */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/20 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
              transform: `translateZ(-${30 + i * 10}px)`
            }}
            animate={{
              y: [-20, -40, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Mesh Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(255,193,7,0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,152,0,0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(220,38,127,0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Enhanced Badge with Urgency */}
        <motion.div variants={heroVariants} className="mb-8">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white rounded-full font-black text-lg sm:text-xl shadow-2xl border-2 border-yellow-400/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Flame className="w-6 h-6 mr-3 animate-bounce relative z-10" />
              <span className="relative z-10">LIMITED TIME: SAVE UP TO $8,000</span>
            </div>
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 border-3 border-yellow-400 rounded-full text-yellow-400 font-comic font-black text-lg sm:text-xl backdrop-blur-md shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 group">
              <Trophy className="w-6 h-6 mr-3 text-yellow-400 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">REGINA'S #1 AUTO SUPERHERO</span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Main Title with Value Prop */}
        <motion.div variants={titleVariants} className="mb-6 sm:mb-8">
          <h1 
            id="hero-title"
            className="font-comic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-tight relative"
          >
            <span className="block text-yellow-400 drop-shadow-2xl" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(255,193,7,0.3)' }}>
              GMC, BUICK & CADILLAC
            </span>
            <span className="block text-orange-400 drop-shadow-2xl mt-2" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 20px rgba(255,152,0,0.3)' }}>
              NO PRESSURE. JUST SAVINGS!
            </span>
          </h1>
        </motion.div>

        {/* Enhanced Hero Image with Perfect Visual Effects */}
        <motion.div variants={imageVariants} className="mb-10 sm:mb-12">
          <div className="relative max-w-3xl mx-auto group">
            {/* Multi-layered glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 via-orange-500/30 to-red-600/40 rounded-3xl blur-3xl scale-110 opacity-70 group-hover:opacity-90 transition-all duration-700 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-orange-500/15 to-red-600/25 rounded-3xl blur-xl scale-105 opacity-50 group-hover:opacity-70 transition-all duration-500"></div>
            
            {/* Main image with enhanced effects */}
            <div className="relative overflow-hidden rounded-3xl border-4 border-yellow-400/50 group-hover:border-yellow-400/80 transition-all duration-500 shadow-2xl">
              <img 
                src="https://tjoyajajskeijhujoczy.supabase.co/storage/v1/object/public/images//Untitled_20250615_200233.png"
                alt="Troy Nordyke - Capital Crusader, your Regina auto superhero with business card"
                className="relative w-full h-auto transform group-hover:scale-105 transition-all duration-700 filter group-hover:brightness-110"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
              
              {/* Overlay gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Enhanced floating elements */}
            <motion.div 
              className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-crusaderYellow to-yellow-300 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20"
              animate={{ 
                y: [-8, 8, -8],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Star className="w-8 h-8 text-black drop-shadow-lg" />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-crusaderOrange to-orange-400 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20"
              animate={{ 
                y: [8, -8, 8],
                rotate: [0, -15, 15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            >
              <Shield className="w-8 h-8 text-white drop-shadow-lg" />
            </motion.div>
            
            {/* Additional decorative elements */}
            <motion.div 
              className="absolute top-1/4 -left-8 w-8 h-8 bg-crusaderRed/80 rounded-full shadow-lg"
              animate={{ 
                x: [-5, 5, -5],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            
            <motion.div 
              className="absolute bottom-1/4 -right-8 w-10 h-10 bg-crusaderYellow/70 rounded-full shadow-lg"
              animate={{ 
                x: [5, -5, 5],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
            
            {/* Sparkle effects */}
            <motion.div 
              className="absolute top-8 left-8 w-2 h-2 bg-white rounded-full"
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            
            <motion.div 
              className="absolute bottom-12 right-12 w-3 h-3 bg-crusaderYellow rounded-full"
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
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

        {/* Enhanced Perks Cards with Cutting-Edge Glassmorphism */}
        <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 sm:mb-12 max-w-6xl mx-auto">
          {[
            { icon: Shield, title: "Zero Pressure", desc: "No pushy sales tactics", color: "text-blue-400", gradient: "from-blue-500/20 to-cyan-500/20" },
            { icon: Zap, title: "Lightning Fast", desc: "Quick approvals & delivery", color: "text-yellow-400", gradient: "from-yellow-500/20 to-orange-500/20" },
            { icon: DollarSign, title: "Best Prices", desc: "Transparent, fair deals", color: "text-green-400", gradient: "from-green-500/20 to-emerald-500/20" },
            { icon: Award, title: "5-Star Service", desc: "Regina's top-rated dealer", color: "text-orange-400", gradient: "from-orange-500/20 to-red-500/20" }
          ].map((perk, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center transition-all duration-500 overflow-hidden"
                   style={{
                     background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                     backdropFilter: 'blur(20px)',
                     boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                   }}>
                
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${perk.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                
                {/* Floating Particles Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/40 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`
                      }}
                      animate={{
                        y: [-10, -20, -10],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                
                {/* Icon with Enhanced Animation */}
                <motion.div
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: 1.2
                  }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 mb-4"
                >
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${perk.gradient} flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg`}>
                    <perk.icon className={`w-8 h-8 ${perk.color} drop-shadow-lg`} />
                  </div>
                </motion.div>
                
                {/* Title with Kinetic Typography */}
                <motion.h3 
                  className="font-comic text-xl sm:text-2xl font-black text-yellow-400 mb-3 relative z-10"
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 20px rgba(255,193,7,0.5)"
                  }}
                >
                  {perk.title}
                </motion.h3>
                
                {/* Description */}
                <p className="text-gray-300 text-base sm:text-lg relative z-10 leading-relaxed">{perk.desc}</p>
                
                {/* Hover Border Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{
                       background: 'linear-gradient(135deg, transparent 0%, rgba(255,193,7,0.2) 50%, transparent 100%)',
                       filter: 'blur(1px)'
                     }}>
                </div>
              </div>
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
