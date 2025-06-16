import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';

const WalkaroundSection = lazy(() => import('@/components/sections/WalkaroundSection'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-yellow-400 border-transparent rounded-full"
    />
    <p className="ml-3 sm:ml-4 text-xl sm:text-2xl font-comic text-yellow-400">Loading Video Tours...</p>
  </div>
);

const VideosPage = () => {
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
              🎥 VEHICLE VIDEO TOURS
            </h1>
            <p className="text-xl sm:text-2xl text-white max-w-3xl mx-auto">
              Take a virtual tour with The Capital Crusader and explore our amazing vehicles up close!
            </p>
          </motion.div>

          {/* Video Introduction */}
          <motion.section 
            className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border-4 border-yellow-400 shadow-2xl text-center">
              <div className="text-6xl mb-6">🎬</div>
              <h2 className="text-3xl sm:text-4xl font-comic text-yellow-400 mb-6">
                Exclusive Video Walkarounds
              </h2>
              <p className="text-lg text-white max-w-3xl mx-auto mb-8">
                Get an inside look at our featured vehicles with Troy's personal video tours. 
                See every detail, feature, and benefit before you visit the dealership. 
                It's like having your own private showing!
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-red-600/20 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">🚗</div>
                  <h3 className="text-xl font-comic text-yellow-400 mb-2">Detailed Tours</h3>
                  <p className="text-white">Complete walkarounds of every vehicle</p>
                </div>
                <div className="bg-red-600/20 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">⭐</div>
                  <h3 className="text-xl font-comic text-yellow-400 mb-2">Key Features</h3>
                  <p className="text-white">Highlighting the best features and benefits</p>
                </div>
                <div className="bg-red-600/20 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">💡</div>
                  <h3 className="text-xl font-comic text-yellow-400 mb-2">Expert Insights</h3>
                  <p className="text-white">Troy's professional recommendations</p>
                </div>
              </div>
            </div>
          </motion.section>

          <WalkaroundSection 
            fadeInUp={fadeInUp} 
            staggerContainer={staggerContainer} 
          />
        </div>
      </Suspense>
    </Layout>
  );
};

export default VideosPage;
