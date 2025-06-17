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

  const scrollToLeadCapture = (tab = 'valuation') => {
    const element = document.getElementById('smart-lead-capture');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Small delay to ensure scroll completes before tab change
      setTimeout(() => {
        // Dispatch custom event to change tab in SmartLeadCaptureSection
        window.dispatchEvent(new CustomEvent('changeLeadCaptureTab', { detail: { tab } }));
      }, 500);
    }
    toast({
      title: "🎯 Navigating to Lead Capture!",
      description: `Opening ${tab === 'valuation' ? 'Vehicle Valuation' : 'Inventory Search'} tool...`,
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
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(31,41,55,0.9) 0%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,1) 100%)'
      }}
    >
      {/* Sophisticated Background System */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Premium Gradient Mesh */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(255,193,7,0.12) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,152,0,0.12) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(220,38,127,0.08) 0%, transparent 50%),
              linear-gradient(135deg, rgba(59,130,246,0.05) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Elegant Floating Elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${8 + i * 2}px`,
              height: `${8 + i * 2}px`,
              left: `${15 + i * 7}%`,
              top: `${20 + (i % 4) * 20}%`,
              background: `linear-gradient(135deg, rgba(255,193,7,${0.1 + i * 0.02}) 0%, rgba(255,152,0,${0.05 + i * 0.01}) 100%)`,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [-20 - i * 2, -40 - i * 2, -20 - i * 2],
              x: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Refined Premium Badge Section */}
        <motion.div variants={heroVariants} className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-center gap-8 justify-center">
            {/* Premium Offer Badge */}
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }}
              className="inline-flex items-center px-12 py-6 text-white rounded-2xl font-black text-lg sm:text-xl shadow-2xl border border-yellow-400/20 relative overflow-hidden group backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(220,38,127,0.95) 0%, rgba(239,68,68,0.95) 50%, rgba(249,115,22,0.95) 100%)',
                boxShadow: '0 25px 50px rgba(220,38,127,0.25), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Flame className="w-8 h-8 mr-4 animate-bounce relative z-10 drop-shadow-lg" />
              <span className="relative z-10 tracking-wide">LIMITED TIME: SAVE UP TO $8,000</span>
            </motion.div>
            
            {/* Authority Badge */}
            <motion.div 
              whileHover={{ scale: 1.05, y: -3 }}
              className="inline-flex items-center px-12 py-6 rounded-2xl text-yellow-400 font-comic font-black text-lg sm:text-xl backdrop-blur-xl shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 group border border-yellow-400/40 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(31,41,55,0.85) 100%)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,193,7,0.15)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Trophy className="w-8 h-8 mr-4 text-yellow-400 group-hover:rotate-12 transition-transform duration-300 relative z-10 drop-shadow-lg" />
              <span className="relative z-10 tracking-wide">REGINA'S #1 AUTO SUPERHERO</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Refined Typography Hierarchy */}
        <motion.div variants={titleVariants} className="mb-10 sm:mb-12">
          <h1 
            id="hero-title"
            className="font-comic text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] relative"
          >
            <span 
              className="block text-yellow-400 drop-shadow-2xl mb-2" 
              style={{ 
                textShadow: '4px 4px 8px rgba(0,0,0,0.8), 0 0 30px rgba(255,193,7,0.3), 0 0 60px rgba(255,193,7,0.1)',
                letterSpacing: '-0.02em'
              }}
            >
              GMC, BUICK & CADILLAC
            </span>
            <span 
              className="block text-orange-400 drop-shadow-2xl" 
              style={{ 
                textShadow: '4px 4px 8px rgba(0,0,0,0.8), 0 0 30px rgba(255,152,0,0.3), 0 0 60px rgba(255,152,0,0.1)',
                letterSpacing: '-0.02em'
              }}
            >
              NO PRESSURE. JUST SAVINGS!
            </span>
          </h1>
        </motion.div>

        {/* Enhanced Hero Image with Sophisticated Effects */}
        <motion.div variants={imageVariants} className="mb-16 sm:mb-20">
          <div className="relative max-w-4xl mx-auto group">
            {/* Sophisticated Glow System */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-orange-500/20 to-red-600/30 rounded-3xl blur-3xl scale-110 opacity-60 group-hover:opacity-80 transition-all duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/15 via-orange-500/10 to-red-600/15 rounded-3xl blur-xl scale-105 opacity-40 group-hover:opacity-60 transition-all duration-500"></div>
            
            {/* Premium Image Container */}
            <div 
              className="relative overflow-hidden rounded-3xl border border-yellow-400/30 group-hover:border-yellow-400/50 transition-all duration-500 shadow-2xl backdrop-blur-sm"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <img 
                src="https://tjoyajajskeijhujoczy.supabase.co/storage/v1/object/public/images//Untitled_20250615_200233.png"
                alt="Troy Nordyke - Capital Crusader, your Regina auto superhero with business card"
                className="relative w-full h-auto transform group-hover:scale-105 transition-all duration-700 filter group-hover:brightness-110"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
              
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Refined Floating Elements */}
            <motion.div 
              className="absolute -top-8 -right-8 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(255,193,7,0.9) 0%, rgba(255,152,0,0.9) 100%)',
                boxShadow: '0 20px 40px rgba(255,193,7,0.3)'
              }}
              animate={{ 
                y: [-10, 10, -10],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Star className="w-10 h-10 text-black drop-shadow-lg" />
            </motion.div>
            
            <motion.div 
              className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(249,115,22,0.9) 0%, rgba(239,68,68,0.9) 100%)',
                boxShadow: '0 20px 40px rgba(249,115,22,0.3)'
              }}
              animate={{ 
                y: [10, -10, 10],
                rotate: [0, -15, 15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            >
              <Shield className="w-10 h-10 text-white drop-shadow-lg" />
            </motion.div>
          </div>
        </motion.div>

        {/* Instant Vehicle Valuation Tool - Refined Design */}
        <motion.div variants={fadeInUp} className="mb-16 sm:mb-20">
          <div 
            className="backdrop-blur-xl border border-green-400/20 rounded-3xl p-8 sm:p-12 max-w-5xl mx-auto relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(16,185,129,0.08) 50%, rgba(34,197,94,0.08) 100%)',
              boxShadow: '0 25px 50px rgba(34,197,94,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-transparent to-emerald-400/5"></div>
            
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block p-6 rounded-full mb-8 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(34,197,94,0.9) 0%, rgba(16,185,129,0.9) 100%)',
                  boxShadow: '0 20px 40px rgba(34,197,94,0.3)'
                }}
              >
                <DollarSign className="w-16 h-16 text-white" />
              </motion.div>
              
              <h2 className="font-comic text-4xl sm:text-5xl font-black text-green-400 mb-6 uppercase tracking-wide">
                🚗 FREE Instant Vehicle Valuation
              </h2>
              
              <p className="text-white text-xl sm:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
                Get your vehicle's <span className="text-green-400 font-bold">current market value</span> in 30 seconds! 
                Plus receive exclusive trade-in bonuses worth up to <span className="text-yellow-400 font-bold">$2,000 extra!</span>
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {[
                  { value: "30 Sec", label: "Instant Results", color: "text-green-400" },
                  { value: "$2,000", label: "Bonus Value", color: "text-yellow-400" },
                  { value: "100%", label: "Free Service", color: "text-blue-400" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                    }}
                  >
                    <div className={`text-3xl font-black ${item.color} mb-2`}>{item.value}</div>
                    <div className="text-white text-sm font-semibold">{item.label}</div>
                  </motion.div>
                ))}
              </div>
              
              <Button
                onClick={() => scrollToLeadCapture('valuation')}
                className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 hover:from-green-700 hover:via-green-800 hover:to-emerald-700 text-white font-comic font-black text-xl py-6 px-12 rounded-2xl shadow-2xl hover:shadow-green-600/50 hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <DollarSign className="w-7 h-7 mr-3 relative z-10" />
                <span className="relative z-10">GET MY FREE VALUATION NOW!</span>
              </Button>
              
              <p className="text-green-400 text-sm mt-4 font-semibold">
                ⚡ Limited Time: Extra $500 Trade-In Bonus This Week Only!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Real-Time Inventory Scarcity - Enhanced */}
        <motion.div variants={fadeInUp} className="mb-16 sm:mb-20">
          <div 
            className="backdrop-blur-xl border border-red-400/20 rounded-3xl p-8 sm:p-12 max-w-6xl mx-auto relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(249,115,22,0.08) 50%, rgba(239,68,68,0.08) 100%)',
              boxShadow: '0 25px 50px rgba(239,68,68,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/5 via-transparent to-orange-400/5"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <h3 className="font-comic text-3xl sm:text-4xl font-black text-red-400 mb-4 uppercase tracking-wide">
                  🔥 HOT INVENTORY ALERT!
                </h3>
                <p className="text-white text-xl">
                  These popular models are flying off our lot - <span className="text-yellow-400 font-bold">Act Fast!</span>
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  { model: "2025 GMC Sierra", status: "Only 2 Left!", viewers: "47 people viewed today", progress: "80%", color: "red" },
                  { model: "2025 Cadillac XT4", status: "3 Available", viewers: "32 people viewed today", progress: "60%", color: "orange" },
                  { model: "2025 Buick Encore", status: "5 Available", viewers: "28 people viewed today", progress: "40%", color: "yellow" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`backdrop-blur-sm rounded-2xl p-6 border border-${item.color}-400/20`}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                      boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-bold text-lg">{item.model}</span>
                      <span className={`bg-${item.color}-500 text-white text-xs px-3 py-1 rounded-full font-bold`}>{item.status}</span>
                    </div>
                    <div className={`text-${item.color}-400 text-sm mb-3 font-semibold`}>{item.viewers}</div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div className={`bg-${item.color}-500 h-3 rounded-full transition-all duration-1000`} style={{ width: item.progress }}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center">
                <Button
                  onClick={() => scrollToLeadCapture('inventory')}
                  className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 hover:from-red-700 hover:via-red-800 hover:to-orange-700 text-white font-comic font-black text-xl py-6 px-10 rounded-2xl shadow-2xl hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  🚨 RESERVE YOURS NOW - BEFORE THEY'RE GONE!
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Service Highlights with Premium Design */}
        <motion.div variants={fadeInUp} className="mb-16 sm:mb-20">
          <h2 className="font-comic text-4xl sm:text-5xl md:text-6xl font-black text-orange-400 mb-10 text-center tracking-wide">
            LEGENDARY SERVICE
          </h2>
          <div 
            className="backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-yellow-400/20 max-w-7xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(31,41,55,0.4) 50%, rgba(0,0,0,0.6) 100%)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xl sm:text-2xl text-white font-bold leading-relaxed mb-6">
                  <span className="text-yellow-400">🦸‍♂️ VIP Treatment</span> • 
                  <span className="text-blue-300">🚗 Zero-Pressure Experience</span> • 
                  <span className="text-orange-400">⚡ Lightning-Fast Approvals</span>
                </p>
                <p className="text-3xl sm:text-4xl text-yellow-300 font-black leading-tight">
                  Your Trusted Regina Auto Superhero Saves The Day!
                </p>
              </div>
              
              <div 
                className="backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
                }}
              >
                <h4 className="text-yellow-400 font-bold text-xl mb-6">🌟 Recent Success Stories</h4>
                <div className="space-y-4 text-base text-white">
                  {[
                    { text: "Saved $7,200 on my new Sierra!", author: "Mike R.", color: "green" },
                    { text: "Approved in 15 minutes!", author: "Sarah K.", color: "blue" },
                    { text: "Best car buying experience ever!", author: "David L.", color: "purple" }
                  ].map((story, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-3 h-3 bg-${story.color}-400 rounded-full animate-pulse`}></div>
                      <span>"{story.text}" - {story.author}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <span className="text-yellow-400 font-bold text-lg">⭐⭐⭐⭐⭐ 4.9/5 Rating</span>
                  <div className="text-white/60 text-sm">Based on 1,247 reviews</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Perks Cards with Premium Glassmorphism */}
        <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 sm:mb-24 max-w-7xl mx-auto">
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
              <div 
                className="relative backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${perk.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                
                <motion.div
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: 1.2
                  }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 mb-6"
                >
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${perk.gradient} flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg`}>
                    <perk.icon className={`w-10 h-10 ${perk.color} drop-shadow-lg`} />
                  </div>
                </motion.div>
                
                <motion.h3 
                  className="font-comic text-2xl font-black text-yellow-400 mb-4 relative z-10"
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 20px rgba(255,193,7,0.5)"
                  }}
                >
                  {perk.title}
                </motion.h3>
                
                <p className="text-gray-300 text-lg relative z-10 leading-relaxed">{perk.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Stats Bar */}
        <motion.div variants={fadeInUp} className="mb-20 sm:mb-24">
          <div 
            className="backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-8 sm:p-12 max-w-6xl mx-auto relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(31,41,55,0.4) 50%, rgba(0,0,0,0.6) 100%)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-500/5 to-red-600/10"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center relative z-10">
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="group"
              >
                <div className="text-5xl sm:text-6xl font-comic font-black text-yellow-400 mb-3 group-hover:scale-110 transition-transform duration-300">1,000+</div>
                <div className="text-gray-300 text-xl font-semibold">Happy Regina Drivers</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="group"
              >
                <div className="text-5xl sm:text-6xl font-comic font-black text-yellow-400 mb-3 group-hover:scale-110 transition-transform duration-300">0%</div>
                <div className="text-gray-300 text-xl font-semibold">Financing Available</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                className="group"
              >
                <div className="text-5xl sm:text-6xl font-comic font-black text-yellow-400 mb-3 group-hover:scale-110 transition-transform duration-300">5-Star</div>
                <div className="text-gray-300 text-xl font-semibold">Customer Reviews</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div variants={buttonVariants} className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <Button 
            onClick={handleBookTestDrive}
            className="group w-full sm:w-auto font-comic text-white text-2xl sm:text-3xl font-black px-16 py-8 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(220,38,127,0.95) 0%, rgba(239,68,68,0.95) 50%, rgba(249,115,22,0.95) 100%)',
              boxShadow: '0 25px 50px rgba(220,38,127,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
            aria-label="Book your heroic test drive with Troy"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <CalendarCheck className="w-8 h-8 relative z-10" />
            <span className="relative z-10">BOOK HEROIC TEST DRIVE</span>
          </Button>
          
          <Button 
            onClick={handleCallNow}
            variant="outline"
            className="group w-full sm:w-auto font-comic text-yellow-400 hover:text-black text-2xl sm:text-3xl font-black px-16 py-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 backdrop-blur-xl hover:scale-105 relative overflow-hidden border border-yellow-400/50"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(31,41,55,0.8) 100%)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,193,7,0.15)'
            }}
            aria-label="Call Troy directly for immediate assistance"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <Phone className="w-8 h-8 relative z-10" />
            <span className="relative z-10">CALL TROY NOW</span>
          </Button>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default HeroSection;
