
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Shield, DollarSign } from 'lucide-react';

const TrustBarSection = ({ fadeInUp }) => {
  const trustPoints = [
    { icon: Star, text: "5.0★ Google Reviews", highlight: true },
    { icon: Trophy, text: "1,000+ Happy Drivers", highlight: false },
    { icon: DollarSign, text: "0% Financing Available", highlight: true },
    { icon: Shield, text: "Costco Member Pricing", highlight: false },
  ];

  return (
    <motion.section
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-gradient-to-r from-black via-gray-900 to-black py-6 sm:py-8 shadow-2xl relative z-20 border-t-4 border-b-4 border-crusaderYellow"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                point.highlight 
                  ? 'bg-crusaderYellow text-black font-black' 
                  : 'bg-gray-800 text-crusaderYellow font-bold border border-crusaderYellow/50'
              }`}
            >
              <point.icon className="w-5 h-5" />
              <span className="text-sm sm:text-base whitespace-nowrap">{point.text}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Scrolling testimonial ticker */}
        <motion.div 
          className="mt-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex animate-scroll-left">
            <div className="flex gap-8 px-4">
              <span className="text-gray-300 italic whitespace-nowrap">"Best car buying experience!" - Sarah M.</span>
              <span className="text-crusaderYellow">★★★★★</span>
              <span className="text-gray-300 italic whitespace-nowrap">"Troy made everything so easy!" - Mike D.</span>
              <span className="text-crusaderYellow">★★★★★</span>
              <span className="text-gray-300 italic whitespace-nowrap">"No pressure, just great service!" - Lisa K.</span>
              <span className="text-crusaderYellow">★★★★★</span>
            </div>
            {/* Duplicate for seamless scroll */}
            <div className="flex gap-8 px-4">
              <span className="text-gray-300 italic whitespace-nowrap">"Best car buying experience!" - Sarah M.</span>
              <span className="text-crusaderYellow">★★★★★</span>
              <span className="text-gray-300 italic whitespace-nowrap">"Troy made everything so easy!" - Mike D.</span>
              <span className="text-crusaderYellow">★★★★★</span>
              <span className="text-gray-300 italic whitespace-nowrap">"No pressure, just great service!" - Lisa K.</span>
              <span className="text-crusaderYellow">★★★★★</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TrustBarSection;
