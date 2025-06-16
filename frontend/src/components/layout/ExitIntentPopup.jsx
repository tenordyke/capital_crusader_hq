import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, CalendarCheck, Gift, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { sendLeadToWebhook } from '@/lib/webhookService';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let exitTimer;
    
    const handleMouseLeave = (e) => {
      // Only trigger if mouse leaves from the top of the page and popup hasn't been shown
      if (e.clientY <= 0 && !hasShown && !isVisible) {
        clearTimeout(exitTimer);
        exitTimer = setTimeout(() => {
          setIsVisible(true);
          setHasShown(true);
        }, 100);
      }
    };

    const handleMouseEnter = () => {
      clearTimeout(exitTimer);
    };

    // Also show after 45 seconds if user hasn't left
    const timeoutTimer = setTimeout(() => {
      if (!hasShown && !isVisible) {
        setIsVisible(true);
        setHasShown(true);
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(exitTimer);
      clearTimeout(timeoutTimer);
    };
  }, [hasShown, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicle_interest: 'VIP Test Drive Request',
          preferred_contact_method: 'Call, Text, Email',
          source: 'exit-intent-popup'
        }])
        .select();

      if (error) throw error;

      // Send to webhook for AI follow-up
      try {
        await sendLeadToWebhook({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicle_interest: 'VIP Test Drive Request',
          preferred_contact_method: 'Call, Text, Email',
          source: 'exit-intent-popup'
        });
      } catch (webhookError) {
        console.error('Webhook call failed, but lead was saved:', webhookError);
      }
      
      toast({
        title: "VIP Test Drive Reserved! 🎉",
        description: "Troy will contact you within 24 hours to schedule your exclusive test drive!",
        duration: 5000,
        className: "bg-green-600 border-green-700 text-white font-semibold",
      });

      setIsVisible(false);
      setFormData({ name: '', phone: '', email: '' });
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or call us directly at (306) 331-4802",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookNow = () => {
    window.open('https://troyatcapital.setmore.com/troy?utm_source=website&utm_medium=popup&utm_campaign=exit_intent', '_blank', 'noopener,noreferrer');
    setIsVisible(false);
    toast({
      title: "Redirecting to Booking! 🚀",
      description: "Choose your perfect test drive time!",
      duration: 3000,
      className: "bg-blue-600 border-blue-700 text-white font-semibold",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl border-2 border-yellow-400"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Close popup"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full">
                  <Gift className="w-8 h-8 text-black" />
                </div>
              </div>
              
              <h2 className="font-comic text-2xl sm:text-3xl font-black text-yellow-400 mb-2 uppercase"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                Wait! Don't Miss Out!
              </h2>
              
              <p className="text-white text-lg font-semibold mb-2">
                🎁 <span className="text-yellow-300">EXCLUSIVE OFFER</span> 🎁
              </p>
              
              <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse border border-yellow-400 mb-4">
                LIMITED TIME ONLY!
              </div>
            </div>

            {/* Offer details */}
            <div className="bg-black/40 rounded-xl p-4 mb-6 border border-yellow-400/30">
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-yellow-300 text-sm font-semibold">VIP Treatment</span>
              </div>
              
              <ul className="text-white space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Priority test drive scheduling</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Exclusive financing pre-approval</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>No-pressure consultation with Troy</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Special pricing consideration</span>
                </li>
              </ul>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-black/50 border-yellow-400/50 text-white placeholder-gray-400 focus:border-yellow-400"
              />
              
              <Input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="bg-black/50 border-yellow-400/50 text-white placeholder-gray-400 focus:border-yellow-400"
              />
              
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-black/50 border-yellow-400/50 text-white placeholder-gray-400 focus:border-yellow-400"
              />

              {/* Action buttons */}
              <div className="space-y-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative overflow-hidden font-comic bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white text-lg font-black py-4 rounded-xl shadow-xl hover:shadow-red-500/50 transition-all duration-300 border-2 border-yellow-400/60"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)' }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)' }}>Reserving Your VIP Spot...</span>
                    </div>
                  ) : (
                    <>
                      <CalendarCheck className="w-5 h-5 mr-2" />
                      <span style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)' }}>CLAIM MY VIP TEST DRIVE!</span>
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  onClick={handleBookNow}
                  variant="outline"
                  className="w-full font-comic border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black text-base py-3 rounded-xl transition-all duration-300"
                >
                  Or Book Online Now
                </Button>
              </div>
            </form>

            {/* Trust indicators */}
            <div className="text-center mt-4 pt-4 border-t border-gray-600">
              <p className="text-gray-400 text-xs">
                🔒 Your information is secure • No spam, ever • Regina's #1 Auto Superhero
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
