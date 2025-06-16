import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';

const LeadCaptureSection = lazy(() => import('@/components/sections/LeadCaptureSection'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-yellow-400 border-transparent rounded-full"
    />
    <p className="ml-3 sm:ml-4 text-xl sm:text-2xl font-comic text-yellow-400">Loading Contact Info...</p>
  </div>
);

const ContactPage = () => {
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
              📞 CONTACT THE CRUSADER
            </h1>
            <p className="text-xl sm:text-2xl text-white max-w-3xl mx-auto">
              Ready to find your perfect vehicle? Get in touch with Troy and start your heroic car-buying journey!
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.section 
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Details */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border-4 border-yellow-400 shadow-2xl">
                <h2 className="text-3xl sm:text-4xl font-comic text-yellow-400 mb-8 text-center">
                  🦸‍♂️ Get In Touch
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-red-600/20 rounded-xl">
                    <div className="text-3xl">📞</div>
                    <div>
                      <h3 className="text-xl font-comic text-yellow-400">Phone</h3>
                      <a href="tel:+1-306-331-4802" className="text-white hover:text-yellow-300 transition-colors">
                        306-331-4802
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-red-600/20 rounded-xl">
                    <div className="text-3xl">📧</div>
                    <div>
                      <h3 className="text-xl font-comic text-yellow-400">Email</h3>
                      <a href="mailto:troy.nordyke@capitalauto.ca" className="text-white hover:text-yellow-300 transition-colors">
                        troy.nordyke@capitalauto.ca
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-red-600/20 rounded-xl">
                    <div className="text-3xl">📍</div>
                    <div>
                      <h3 className="text-xl font-comic text-yellow-400">Address</h3>
                      <p className="text-white">
                        Capital GMC Buick Cadillac<br />
                        4020 Rochdale Blvd<br />
                        Regina, SK S4X 4K7
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-red-600/20 rounded-xl">
                    <div className="text-3xl">🕒</div>
                    <div>
                      <h3 className="text-xl font-comic text-yellow-400">Hours</h3>
                      <div className="text-white space-y-1">
                        <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 5:00 PM</p>
                        <p>Sunday: 12:00 PM - 5:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <a
                    href="https://troyatcapital.setmore.com/troy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-yellow-400 to-red-600 text-white font-comic text-xl px-8 py-4 rounded-full hover:from-yellow-500 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    📅 Book Test Drive Now!
                  </a>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-4 border-yellow-400 shadow-2xl">
                <h2 className="text-3xl font-comic text-yellow-400 mb-6 text-center">
                  🗺️ Find Us
                </h2>
                <div className="bg-gray-800/50 rounded-xl h-96 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">📍</div>
                    <h3 className="text-2xl font-comic text-yellow-400 mb-2">Capital GMC Buick Cadillac</h3>
                    <p className="text-lg">4020 Rochdale Blvd, Regina, SK</p>
                    <p className="text-sm mt-4 opacity-75">
                      Interactive map coming soon!<br />
                      Use GPS navigation to find us easily.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <LeadCaptureSection 
            fadeInUp={fadeInUp}
            staggerContainer={staggerContainer}
          />
        </div>
      </Suspense>
    </Layout>
  );
};

export default ContactPage;
