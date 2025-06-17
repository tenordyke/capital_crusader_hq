import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, CalendarCheck } from 'lucide-react';
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
        title: "Test Drive Reserved! 🎉",
        description: "Troy will contact you within 24 hours!",
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-xl p-6 max-w-sm w-full mx-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Simple Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Wait! Get Your Free Test Drive
              </h2>
              <p className="text-gray-600">
                Book now and Troy will call you within 24 hours
              </p>
            </div>

            {/* Simple Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full"
              />
              
              <Input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full"
              />
              
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full"
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Booking...</span>
                  </div>
                ) : (
                  <>
                    <CalendarCheck className="w-5 h-5 mr-2" />
                    Book My Test Drive
                  </>
                )}
              </Button>
            </form>

            {/* Simple trust indicator */}
            <p className="text-center text-xs text-gray-500 mt-4">
              🔒 Your information is secure • No spam, ever
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
