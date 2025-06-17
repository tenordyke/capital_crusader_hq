import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center">
        {/* Page Header */}
        <motion.div 
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-comic text-yellow-400 mb-4">
            MEET THE CAPITAL CRUSADER
          </h1>
          <p className="text-xl sm:text-2xl text-white max-w-3xl mx-auto">
            Your automotive superhero dedicated to finding you the perfect vehicle with unbeatable service!
          </p>
        </motion.div>

        {/* About Troy Section */}
        <motion.section 
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
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
                    With years of sales related experience, Troy Nordyke has earned his reputation as 
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
                <div className="inline-block mb-4">
                  <img 
                    src="https://tjoyajajskeijhujoczy.supabase.co/storage/v1/object/public/images//circle.jpg"
                    alt="Troy Nordyke - The Capital Crusader"
                    className="w-48 h-48 rounded-full object-cover border-4 border-yellow-400 shadow-2xl"
                  />
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
      </div>
    </Layout>
  );
};

export default AboutPage;
