import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gift, Percent, Award, Phone, CalendarCheck, Flame, Clock, TrendingDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CurrentOffersSection = ({ fadeInUp, staggerContainer }) => {
  const { toast } = useToast();
  const bookingLink = "https://troyatcapital.setmore.com/troy";
  const phoneNumber = "+13063314802"; 

  const offers = [
    {
      icon: Gift,
      title: "Employee Pricing Event",
      urgency: "SAVE $8,000+",
      savings: "$8,000",
      description: "Your price is MY price! Get the same deals as GM employees on select new models.",
      features: ["No haggling required", "Transparent pricing", "Limited inventory"],
      imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/6eaab9dcdf89a03097617c1efc35bc3c.webp",
      altText: "Employee Pricing Event graphic with GMC Sierra trucks in the background",
      ctaText: "Claim This Deal",
      actionType: "book",
      highlight: true
    },
    {
      icon: Percent,
      title: "0% APR for 60 Months",
      urgency: "SAVE $3,500",
      savings: "$3,500",
      description: "Drive home a new Buick Envision with ZERO interest. That's thousands in savings!",
      features: ["$0 down available", "60 month terms", "Quick approval"],
      imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/0a964d0fd76718c5d11859c54fca61b6.png",
      altText: "Stylish red Buick Envision highlighting the 0% APR offer",
      ctaText: "Get Pre-Approved",
      actionType: "book",
      highlight: false
    },
    {
      icon: Award,
      title: "Hero Discounts",
      urgency: "EXTRA $1,000 OFF",
      savings: "$1,000",
      description: "Military, First Responders, Healthcare Workers, Teachers & Students save even more!",
      features: ["Stackable savings", "Easy verification", "Thank you for your service"],
      imgSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/d799a40c6d455bc26b63c5b5a89e2c73.jpg",
      altText: "GMC Special Offers promotional image with a lineup of various GMC trucks against a mountain backdrop.",
      ctaText: "Verify & Save",
      actionType: "book",
      highlight: false
    },
  ];

  const handleAction = (offer) => {
    if (offer.actionType === "book") {
      window.open(bookingLink, '_blank', 'noopener,noreferrer');
      toast({
        title: "Test Drive Mission Set! 🗓️",
        description: `Getting you ready to save ${offer.savings} on ${offer.title}!`,
        duration: 3000,
        className: "bg-green-600 border-green-700 text-white font-semibold",
      });
    } else if (offer.actionType === "call") {
      window.location.href = `tel:${phoneNumber}`;
      toast({
        title: "Dialing the Crusader! 📞",
        description: `Connecting you to discuss ${offer.title}.`,
        duration: 3000,
      });
    }
  };

  return (
    <motion.section
      aria-labelledby="current-offers-title"
      id="offers"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-crusaderRed/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-crusaderYellow/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={fadeInUp}
          className="text-center mb-16"
        >
          {/* Clean Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-crusaderRed to-orange-600 text-white px-8 py-4 rounded-full font-black text-lg mb-8 shadow-2xl"
          >
            <Flame className="w-5 h-5" />
            <span>LIMITED TIME OFFERS</span>
          </motion.div>
          
          {/* Clean Title */}
          <h2 id="current-offers-title" className="font-comic text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-crusaderYellow uppercase text-outline-black-lg drop-shadow-2xl">
            Special Offers
          </h2>
          
          {/* Clean Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto font-semibold leading-relaxed">
            Exclusive deals from <span className="text-crusaderYellow">The Capital Crusader</span>
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`group relative rounded-2xl overflow-hidden shadow-2xl card-perfect-hover
                         transition-all duration-300 transform
                         ${offer.highlight ? 'ring-4 ring-crusaderYellow ring-offset-4 ring-offset-black enhanced-glow' : 'hover:scale-105'}`}
            >
              {offer.highlight && (
                <div className="absolute -top-1 -right-1 z-20">
                  <div className="bg-crusaderYellow text-black px-4 py-1 rounded-bl-xl font-black text-sm">
                    BEST VALUE
                  </div>
                </div>
              )}
              
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-crusaderRed/20 via-crusaderOrange/30 to-crusaderYellow/20">
                {/* Enhanced gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/40 to-black/60"></div>
                
                {/* Icon and Savings Badge Together */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <offer.icon className="w-20 h-20 text-crusaderYellow/40" />
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500 text-white px-6 py-3 rounded-xl font-black text-xl shadow-2xl">
                      {offer.urgency}
                    </div>
                    <TrendingDown className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 p-6 flex flex-col h-full">
                <div className="text-center mb-4">
                  <h3 className="font-comic text-2xl text-crusaderYellow">{offer.title}</h3>
                </div>
                
                <p className="text-gray-300 mb-4">{offer.description}</p>
                
                {/* Features */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {offer.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-crusaderYellow rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handleAction(offer)}
                  className="w-full bg-gradient-to-r from-crusaderRed via-red-600 to-orange-500 hover:from-red-700 hover:via-red-700 hover:to-orange-600 text-white font-comic font-black text-lg py-4 rounded-xl shadow-xl hover:shadow-crusaderRed/50 transition-all duration-300 group"
                  aria-label={`${offer.ctaText} for ${offer.title}`}
                >
                  {offer.actionType === "book" ? <CalendarCheck className="w-5 h-5 mr-2" /> : <Phone className="w-5 h-5 mr-2" />}
                  {offer.ctaText}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Urgency banner */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 bg-gradient-to-r from-crusaderRed via-red-600 to-orange-500 rounded-2xl p-6 text-center"
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Clock className="w-8 h-8 text-white animate-pulse" />
            <p className="text-white font-black text-xl">
              These deals end this month! Don't miss out on saving thousands!
            </p>
            <Button
              onClick={() => window.open(bookingLink, '_blank')}
              className="bg-white text-crusaderRed hover:bg-gray-100 font-comic font-black px-6 py-3 rounded-lg"
            >
              Book Now Before Month End!
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CurrentOffersSection;
