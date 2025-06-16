
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle2, XCircle, Award, Car } from 'lucide-react';

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
      crusaderWay: "Your Ally & Guide",
      typicalDealership: "Pressure & Sales Quotas",
    },
    {
      feature: "Pricing Strategy",
      crusaderWay: "Transparent & Fair Value",
      typicalDealership: "Hidden Fees & Haggling Games",
    },
    {
      feature: "Vehicle Knowledge",
      crusaderWay: "Expert Advice, Not Upsells",
      typicalDealership: "Pushing Specific Inventory",
    },
    {
      feature: "Test Drive Experience",
      crusaderWay: "Relaxed, Informative & Fun",
      typicalDealership: "Rushed & Obligation-Heavy",
    },
    {
      feature: "Post-Sale Support",
      crusaderWay: "Continued Heroic Service",
      typicalDealership: "Often Forgotten Quickly",
    },
    {
      feature: "Community Focus",
      crusaderWay: "Supporting Regina Locals",
      typicalDealership: "Corporate Bottom Line",
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

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {comparisonData.map((item, idx) => (
            <motion.div
              key={item.feature}
              variants={cardVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-crusaderYellow/50 transition-all duration-300"
            >
              <h3 className="font-comic text-xl font-bold text-white mb-4 uppercase tracking-wide">
                {item.feature}
              </h3>
              
              <div className="space-y-3">
                {/* Crusader Way */}
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-green-400 text-sm uppercase tracking-wide mb-1">The Crusader Way:</p>
                    <p className="text-white">{item.crusaderWay}</p>
                  </div>
                </div>
                
                {/* Typical Dealership */}
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-red-400 text-sm uppercase tracking-wide mb-1">Typical Dealership:</p>
                    <p className="text-gray-300">{item.typicalDealership}</p>
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
