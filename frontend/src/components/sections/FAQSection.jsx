import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Shield, DollarSign, Clock, Award } from 'lucide-react';

const FAQSection = ({ fadeInUp, staggerContainer }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      icon: DollarSign,
      question: "What financing options do you offer?",
      answer: "We offer 0% APR financing on select models, traditional auto loans, and lease options. As your Capital Crusader, I work with multiple lenders to find the best rates for your situation. We also honor military, first responder, student, and newcomer discounts!"
    },
    {
      icon: Shield,
      question: "Is there really no pressure at Capital Crusader?",
      answer: "Absolutely! My superhero mission is to be your ally, not a pushy salesperson. Take your time, ask questions, and never feel obligated. I believe the right vehicle will speak to you, and my job is to help you find it - not force a sale."
    },
    {
      icon: Clock,
      question: "How long does the car buying process take?",
      answer: "With pre-approval and the right vehicle in stock, you could drive away the same day! However, I never rush anyone. Whether you need an hour or a week to decide, I'm here to support your timeline and comfort level."
    },
    {
      icon: Award,
      question: "What makes Capital Crusader different from other dealers?",
      answer: "I'm Troy, your personal auto superhero! Unlike big dealerships, you get one-on-one service, transparent pricing, and a genuine commitment to your satisfaction. Plus, I'm deeply rooted in the Regina community and treat every customer like family."
    },
    {
      icon: HelpCircle,
      question: "Can I trade in my current vehicle?",
      answer: "Absolutely! I provide fair, competitive trade-in valuations. Bring your current vehicle for a no-obligation assessment, and I'll work the trade value into your deal to maximize your savings."
    },
    {
      icon: Shield,
      question: "What warranty and service options are available?",
      answer: "All new vehicles come with full manufacturer warranties. I also offer extended warranty options and can connect you with trusted local service centers. Your peace of mind is part of my heroic service!"
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      id="faq"
      aria-labelledby="faq-title"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
          <HelpCircle className="w-16 h-16 text-crusaderYellow mx-auto mb-6" />
          <h2 
            id="faq-title"
            className="font-comic text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-crusaderYellow uppercase"
            style={{ textShadow: '3px 3px 0px #000, -3px -3px 0px #000, 3px -3px 0px #000, -3px 3px 0px #000, 5px 5px 10px rgba(0,0,0,0.6)' }}
          >
            Got Questions? I've Got Answers!
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Your Capital Crusader is here to help! Here are answers to the most common questions from Regina drivers.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-black/40 backdrop-blur-md rounded-xl border border-crusaderYellow/20 hover:border-crusaderYellow/50 transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-crusaderYellow/5 transition-colors duration-200"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-crusaderYellow/20 p-2 rounded-lg">
                    <faq.icon className="w-5 h-5 text-crusaderYellow" />
                  </div>
                  <h3 className="font-comic text-lg sm:text-xl font-bold text-white"
                      style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)' }}>
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-6 h-6 text-crusaderYellow" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <div className="pl-12">
                        <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center mt-12">
          <div className="bg-gradient-to-r from-crusaderYellow/20 to-crusaderRed/20 backdrop-blur-md border border-crusaderYellow/30 rounded-xl p-6">
            <h3 className="font-comic text-xl sm:text-2xl font-bold text-crusaderYellow mb-3">
              Still Have Questions?
            </h3>
            <p className="text-gray-300 mb-4">
              Don't see your question here? No problem! Your Capital Crusader is always ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+13063314802"
                className="inline-flex items-center justify-center px-6 py-3 bg-crusaderRed hover:bg-red-700 text-white font-comic font-bold rounded-lg transition-colors duration-200"
              >
                📞 Call Troy: (306) 331-4802
              </a>
              <button
                onClick={() => {
                  const askButton = document.querySelector('.sticky-ask-button');
                  if (askButton) askButton.click();
                }}
                className="inline-flex items-center justify-center px-6 py-3 bg-crusaderYellow hover:bg-yellow-500 text-black font-comic font-bold rounded-lg transition-colors duration-200"
              >
                💬 Ask Troy Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FAQSection;
