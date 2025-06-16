import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';

const TestimonialCarouselSection = lazy(() => import('@/components/sections/TestimonialCarouselSection'));
const FAQSection = lazy(() => import('@/components/sections/FAQSection'));
const HappyClientsSection = lazy(() => import('@/components/sections/HappyClientsSection'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-yellow-400 border-transparent rounded-full"
    />
    <p className="ml-3 sm:ml-4 text-xl sm:text-2xl font-comic text-yellow-400">Loading About Troy...</p>
  </div>
);

const AboutPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const staggerContainer = {
    initial: {}, 
    animate: { 
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2, 
      }
    }
  };

  return (
    <Layout>
      <Suspense fallback={<LoadingFallback />}>
        <div className="flex flex-col items-center">
          {/* Page Header */}
          <motion.div 
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-comic text-yellow-400 mb-4">
              🦸‍♂️ MEET THE CAPITAL CRUSADER
            </h1>
            <p className="text-xl sm:text-2xl text-white max-w-3xl mx-auto">
              Your automotive superhero dedicated to finding you the perfect vehicle with unbeatable service!
            </p>
          </motion.div>

          {/* About Troy Section */}
          <motion.section 
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border-4 border-yellow-400 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-comic text-yellow-400 mb-6">
                    Troy Nordyke - The Capital Crusader
                  </h2>
                  <div className="space-y-4 text-white text-lg">
                    <p>
                      With years of experience in the automotive industry, Troy Nordyke has earned his reputation as 
                      <strong className="text-yellow-400"> The Capital Crusader</strong> - your dedicated automotive superhero 
                      at Capital GMC Buick Cadillac in Regina.
                    </p>
                    <p>
                      Troy's mission is simple: to provide every customer with an exceptional car-buying experience, 
                      combining expert knowledge, honest advice, and unbeatable deals to help you drive away in your perfect vehicle.
                    </p>
                    <p>
                      Whether you're looking for a rugged GMC truck, a luxurious Cadillac, or a reliable Buick, 
                      Troy will work tirelessly to ensure you get the best deal possible with service that goes above and beyond.
                    </p>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-red-600/20 rounded-xl p-4 text-center">
                      <div className="text-2xl font-comic text-yellow-400">5+ Years</div>
                      <div className="text-white">Experience</div>
                    </div>
                    <div className="bg-red-600/20 rounded-xl p-4 text-center">
                      <div className="text-2xl font-comic text-yellow-400">500+</div>
                      <div className="text-white">Happy Customers</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-br from-yellow-400 to-red-600 rounded-full p-2 inline-block mb-4">
                    <div className="bg-white rounded-full p-8">
                      <div className="text-6xl">🦸‍♂️</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-comic text-yellow-400 mb-4">Your Automotive Hero</h3>
                  <div className="space-y-2 text-white">
                    <p>📧 troy.nordyke@capitalauto.ca</p>
                    <p>📞 306-331-4802</p>
                    <p>📍 4020 Rochdale Blvd, Regina, SK</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <TestimonialCarouselSection
            fadeInUp={fadeInUp}
            staggerContainer={staggerContainer}
          />
          <HappyClientsSection
            fadeInUp={fadeInUp}
            staggerContainer={staggerContainer}
          />
          <FAQSection
            fadeInUp={fadeInUp}
            staggerContainer={staggerContainer}
          />
        </div>
      </Suspense>
    </Layout>
  );
};

export default AboutPage;
