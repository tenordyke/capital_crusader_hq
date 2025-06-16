
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Shield, DollarSign, Award, Users, Clock, CheckCircle } from 'lucide-react';

const TrustBarSection = ({ fadeInUp }) => {
  const trustPoints = [
    { icon: Star, text: "5.0★ Google Reviews", highlight: true, count: "200+" },
    { icon: Users, text: "Happy Regina Drivers", highlight: false, count: "1,000+" },
    { icon: DollarSign, text: "0% Financing Available", highlight: true, count: "OAC" },
    { icon: Shield, text: "Employee Pricing", highlight: false, count: "Save $$$" },
    { icon: Award, text: "Top Rated Dealer", highlight: true, count: "2024" },
    { icon: Clock, text: "Same Day Approval", highlight: false, count: "Fast!" }
  ];

  const testimonials = [
    { text: "Troy saved me $3,000 on my new GMC Sierra!", author: "Sarah M.", rating: 5 },
    { text: "Best car buying experience in Regina!", author: "Mike D.", rating: 5 },
    { text: "No pressure, just honest advice and great deals!", author: "Lisa K.", rating: 5 },
    { text: "The Capital Crusader really lives up to his name!", author: "James R.", rating: 5 },
    { text: "Professional service and unbeatable prices!", author: "Amanda T.", rating: 5 },
    { text: "Troy made financing so easy and stress-free!", author: "David L.", rating: 5 }
  ];

  return (
    <motion.section
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 py-8 sm:py-12 shadow-2xl relative z-20 border-t-4 border-b-4 border-yellow-400 backdrop-blur-sm"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-red-600/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-comic text-2xl sm:text-3xl md:text-4xl font-black text-yellow-400 mb-2">
            🏆 TRUSTED BY REGINA DRIVERS
          </h2>
          <p className="text-gray-300 text-lg font-semibold">
            Join thousands of satisfied customers who chose The Capital Crusader
          </p>
        </motion.div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-8">
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 ${
                point.highlight 
                  ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-black shadow-lg shadow-yellow-400/30' 
                  : 'bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 text-yellow-400 border-2 border-yellow-400/30 hover:border-yellow-400/60'
              }`}
            >
              {/* Animated background effect */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                point.highlight 
                  ? 'bg-gradient-to-br from-white/20 via-transparent to-white/10' 
                  : 'bg-gradient-to-br from-yellow-400/10 via-transparent to-orange-500/10'
              }`}></div>
              
              <div className="relative z-10">
                <point.icon className={`w-8 h-8 mx-auto mb-2 ${point.highlight ? 'text-black' : 'text-yellow-400'} group-hover:scale-110 transition-transform duration-300`} />
                <div className={`text-2xl font-comic font-black mb-1 ${point.highlight ? 'text-black' : 'text-yellow-400'}`}>
                  {point.count}
                </div>
                <div className={`text-xs sm:text-sm font-bold leading-tight ${point.highlight ? 'text-black' : 'text-gray-300'}`}>
                  {point.text}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Testimonial Ticker */}
        <motion.div 
          className="relative overflow-hidden bg-gradient-to-r from-black/60 via-gray-900/60 to-black/60 rounded-2xl p-4 border border-yellow-400/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex animate-scroll-left">
            <div className="flex gap-8 px-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex items-center gap-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-300 italic text-sm sm:text-base">
                      "{testimonial.text}" - {testimonial.author}
                    </span>
                  </div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                </div>
              ))}
            </div>
            {/* Duplicate for seamless scroll */}
            <div className="flex gap-8 px-4">
              {testimonials.map((testimonial, index) => (
                <div key={`dup-${index}`} className="flex items-center gap-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-300 italic text-sm sm:text-base">
                      "{testimonial.text}" - {testimonial.author}
                    </span>
                  </div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-yellow-400 font-comic text-lg sm:text-xl font-bold">
            Ready to join the Capital Crusader family? 
            <span className="text-white ml-2">Your heroic car-buying adventure awaits!</span>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TrustBarSection;
