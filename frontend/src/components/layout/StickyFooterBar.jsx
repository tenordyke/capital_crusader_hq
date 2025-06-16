import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarCheck } from 'lucide-react'; 
import { useToast } from '@/components/ui/use-toast';

const StickyFooterBar = ({ onBookNowClick }) => {
  const { toast } = useToast(); // Though onBookNowClick is passed, local toast might be used for other actions if added later.

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 p-3 sm:p-4 shadow-2xl z-50 flex items-center justify-between"
    >
      <div className="flex items-center">
        <p className="text-xs sm:text-sm md:text-base font-bold text-background text-outline-black-xs">
          Book with the Capital Crusader – No Pressure, Just Perks!
        </p>
      </div>
      <Button
        onClick={onBookNowClick}
        size="sm"
        className="sticky-cta-button px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg hover:scale-105 transition-transform duration-200 flex items-center"
        aria-label="Book Now with The Capital Crusader"
      >
        <CalendarCheck className="w-4 h-4 mr-1 sm:mr-1.5" />
        Book Now
        <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
      </Button>
    </motion.div>
  );
};

export default StickyFooterBar;