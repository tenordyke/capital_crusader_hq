
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle2, XCircle, Award, Car, Shield, Star, Zap, Heart, Users, DollarSign } from 'lucide-react';

const WhyShopSection = ({ fadeInUp, staggerContainer }) => {
  const { toast } = useToast();
  const bookingLink = "https://troyatcapital.setmore.com/troy?utm_source=website&utm_medium=cta&utm_campaign=whyshop_testdrive";

  const handleBookTestDrive = () => {
    window.open(bookingLink, '_blank', 'noopener,noreferrer');
    toast({
      title: "Crusader Difference Awaits! 🚀",
      description: "You're one step closer to a heroic car buying experience!",
      duration: 4000,
      className: "bg-green-600 border-green-700 text-white font-semibold",
    });
  };

  const comparisonData = [
    {
      feature: "Sales Approach",
      icon: Shield,
      crusaderWay: "Your Personal Auto Superhero & Trusted Guide",
      typicalDealership: "High-Pressure Tactics & Monthly Sales Quotas",
      crusaderColor: "text-blue-400",
    },
    {
      feature: "Pricing Strategy",
      icon: DollarSign,
      crusaderWay: "100% Transparent Pricing & Employee Discounts",
      typicalDealership: "Hidden Fees, Markups & Endless Haggling",
      crusaderColor: "text-green-400",
    },
    {
      feature: "Vehicle Knowledge",
      icon: Star,
      crusaderWay: "Expert Product Specialist with Honest Advice",
      typicalDealership: "Pushing Whatever's on the Lot This Month",
      crusaderColor: "text-yellow-400",
    },
    {
      feature: "Test Drive Experience",
      icon: Zap,
      crusaderWay: "Relaxed, Educational & Genuinely Fun",
      typicalDealership: "Rushed 5-Minute Drives with Obligations",
      crusaderColor: "text-purple-400",
    },
    {
      feature: "Post-Sale Support",
      icon: Heart,
      crusaderWay: "Lifelong Relationship & Continued Hero Service",
      typicalDealership: "Good Luck Finding Us After the Sale",
      crusaderColor: "text-red-400",
    },
    {
      feature: "Community Focus",
      icon: Users,
      crusaderWay: "Proud Regina Local Supporting Our Community",
      typicalDealership: "Corporate Chain Focused on Profit Margins",
      crusaderColor: "text-orange-400",
    },
  ];

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.section
      id="why-shop-capital-crusader"
      aria-labelledby="why-shop-title"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-black to-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
          <Award className="w-16 h-16 text-crusaderYellow mx-auto mb-6" />
          <h2 
            id="why-shop-title"
            className="font-comic text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-crusaderYellow uppercase"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
          >
            Crusader vs. The Old Way — No Contest.
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            See why choosing the Capital Crusader means a truly heroic car buying journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {comparisonData.map((item, idx) => (
            <motion.div
              key={item.feature}
              variants={cardVariants}
              className="group bg-gradient-to-br from-gray-800/60 via-gray-900/60 to-black/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-700/50 hover:border-yellow-400/60 transition-all duration-300 hover:scale-105 relative overflow-hidden"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Header with icon */}
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 ${item.crusaderColor} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-comic text-xl font-bold text-white uppercase tracking-wide">
                  {item.feature}
                </h3>
              </div>
              
              <div className="space-y-4 relative z-10">
                {/* Crusader Way */}
                <div className="bg-gradient-to-r from-green-900/30 via-green-800/20 to-green-900/30 rounded-xl p-4 border border-green-500/30">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-green-500 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-comic font-bold text-green-400 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                        🦸‍♂️ The Crusader Way
                      </p>
                      <p className="text-white font-semibold leading-relaxed">{item.crusaderWay}</p>
                    </div>
                  </div>
                </div>
                
                {/* Typical Dealership */}
                <div className="bg-gradient-to-r from-red-900/30 via-red-800/20 to-red-900/30 rounded-xl p-4 border border-red-500/30">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-red-500 rounded-full">
                      <XCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-comic font-bold text-red-400 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                        😤 Typical Dealership
                      </p>
                      <p className="text-gray-300 leading-relaxed">{item.typicalDealership}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="text-center">
          <Button 
            onClick={handleBookTestDrive} 
            className="font-comic bg-gradient-to-r from-crusaderRed via-red-600 to-orange-500 hover:from-red-700 hover:via-red-700 hover:to-orange-600 text-white text-lg sm:text-xl font-black px-10 py-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-3 group"
            aria-label="Experience the Crusader Difference Today by booking a test drive"
          >
            Experience the Crusader Difference Today 
            <Car className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default WhyShopSection;
