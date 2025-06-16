import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingSection = ({ handleCTA, fadeInUp, staggerContainer }) => {
  const plans = [
    {
      name: "Sidekick",
      price: "$49",
      description: "For aspiring heroes ready to make their mark.",
      features: ["Up to 150 Vehicles", "Core Analytics Suite", "Standard Support", "Mobile Access"],
      popular: false,
      buttonClass: "bg-gray-700/50 hover:bg-gray-600/70 text-white border border-gray-500/50"
    },
    {
      name: "Capital Crusader",
      price: "$149",
      description: "The ultimate toolkit for established champions.",
      features: ["Up to 1,500 Vehicles", "Advanced AI Analytics", "Priority Hero Support", "API & Integrations", "Custom Branding"],
      popular: true,
      buttonClass: "button-primary-hero"
    },
    {
      name: "Legend Tier",
      price: "$399",
      description: "For automotive empires shaping the future.",
      features: ["Unlimited Vehicles", "Predictive AI Insights", "Dedicated Legend Support", "White-Label Platform", "Bespoke Development"],
      popular: false,
      buttonClass: "bg-gray-700/50 hover:bg-gray-600/70 text-white border border-gray-500/50"
    }
  ];

  return (
    <motion.section 
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      className="py-24 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-6 text-glow-hero">
            <span className="hero-title-gradient">
              Choose Your Power Level
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Equip yourself with the right SaaS arsenal. Select your mission tier and amplify your automotive impact.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer} // Applying stagger to the container of pricing plans
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={fadeInUp} // Each plan card fades in
              className={`relative glass-effect-hero p-8 rounded-3xl border ${
                plan.popular ? 'border-yellow-400 glow-effect-hero scale-105 shadow-2xl shadow-yellow-500/20' : 'border-gray-600/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 text-background px-6 py-2 rounded-full text-sm font-bold shadow-md">
                    Most Heroic
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-3 uppercase tracking-wide">{plan.name}</h3>
                <div className="text-5xl font-black text-yellow-400 mb-2">
                  {plan.price}<span className="text-xl text-gray-400">/mo</span>
                </div>
                <p className="text-gray-300 h-12">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleCTA(plan.name)}
                className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 ${plan.buttonClass} ${plan.popular ? 'glow-effect-hero' : ''}`}
              >
                Activate {plan.name}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PricingSection;