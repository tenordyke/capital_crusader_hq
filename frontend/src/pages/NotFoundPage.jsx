import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen comic-gradient flex flex-col items-center justify-center text-center px-4 overflow-hidden relative">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.3, 1], opacity: 0.05 }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        >
          <ShieldAlert className="w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] text-yellow-400" strokeWidth={0.3} />
        </motion.div>
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-black/60 z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10"
      >
        <ShieldAlert className="w-24 h-24 sm:w-32 sm:h-32 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
        
        <h1 
          className="font-comic text-6xl sm:text-7xl md:text-8xl font-black text-yellow-400 mb-4 uppercase"
          style={{ textShadow: '3px 3px 0px #000, -3px -3px 0px #000, 3px -3px 0px #000, -3px 3px 0px #000, 6px 6px 12px rgba(0,0,0,0.7)' }}
        >
          404 - Whoops!
        </h1>
        
        <p 
          className="text-xl sm:text-2xl md:text-3xl text-white font-semibold mb-8 max-w-2xl mx-auto"
          style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
        >
          Looks like the Crusader took a wrong turn! This page has vanished into another dimension.
        </p>
        
        <Button
          asChild
          size="xl"
          className="button-primary-hero-enhanced px-8 py-5 sm:px-10 sm:py-6 text-lg sm:text-xl rounded-xl glow-effect-hero transform hover:scale-110 transition-all duration-300 shadow-2xl shadow-yellow-500/50 border-2 border-white/80"
          aria-label="Return to Homepage"
        >
          <Link to="/">
            <Home className="w-6 h-6 sm:w-7 sm:h-7 mr-2.5" />
            Return to Crusader HQ
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;