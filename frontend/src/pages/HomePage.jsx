import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';

const HeroSection = lazy(() => import('@/components/sections/HeroSection'));
const TrustBarSection = lazy(() => import('@/components/sections/TrustBarSection'));
const WhyShopSection = lazy(() => import('@/components/sections/WhyShopSection'));
const AboveTheFoldCTASection = lazy(() => import('@/components/sections/AboveTheFoldCTASection'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-t-yellow-400 border-transparent rounded-full"
    />
    <p className="ml-3 sm:ml-4 text-xl sm:text-2xl font-comic text-yellow-400">Loading Crusader Content...</p>
  </div>
);

const HomePage = () => {
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
          <HeroSection 
            fadeInUp={fadeInUp} 
            staggerContainer={staggerContainer} 
          />
          <TrustBarSection fadeInUp={fadeInUp} />
          <WhyShopSection
            fadeInUp={fadeInUp}
            staggerContainer={staggerContainer}
          />
          <AboveTheFoldCTASection />
        </div>
      </Suspense>
    </Layout>
  );
};

export default HomePage;
