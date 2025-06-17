import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, CalendarCheck, Phone, Mail, Clock, Users, Star, Shield, Zap, Gift } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { sendLeadToWebhook } from '@/lib/webhookService';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [visitorCount, setVisitorCount] = useState(23);
  const [recentActivity, setRecentActivity] = useState('Sarah from Regina just booked!');
  const [slotsLeft, setSlotsLeft] = useState(3);
  const { toast } = useToast();

  // Countdown timer effect
  useEffect(() => {
    if (isVisible && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isVisible, timeLeft]);

  // Simulate live activity
  useEffect(() => {
    if (isVisible) {
      const activities = [
        'Sarah from Regina just booked!',
        'Mike from Saskatoon reserved a test drive!',
        'Jennifer from Moose Jaw got approved!',
        'David from Prince Albert saved $6,500!',
        'Lisa from Swift Current booked VIP service!'
      ];
      
      const activityTimer = setInterval(() => {
        setRecentActivity(activities[Math.floor(Math.random() * activities.length)]);
        setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
        if (Math.random() > 0.7) {
          setSlotsLeft(prev => Math.max(1, prev - 1));
        }
      }, 8000);
      
      return () => clearInterval(activityTimer);
    }
  }, [isVisible]);

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
          vehicle_interest: 'VIP Crusader Test Drive - Exit Intent',
          preferred_contact_method: 'Call, Text, Email',
          source: 'exit-intent-popup-enhanced'
        }])
        .select();

      if (error) throw error;

      try {
        await sendLeadToWebhook({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicle_interest: 'VIP Crusader Test Drive - Exit Intent',
          preferred_contact_method: 'Call, Text, Email',
          source: 'exit-intent-popup-enhanced'
        });
      } catch (webhookError) {
        console.error('Webhook call failed, but lead was saved:', webhookError);
      }
      
      toast({
        title: "🦸‍♂️ Mission Accepted! The Crusader is Coming!",
        description: "Troy will contact you within 2 hours with your VIP treatment!",
        duration: 5000,
        className: "bg-green-600 border-green-700 text-white font-semibold",
      });

      setCurrentStep(3); // Success step
      setTimeout(() => {
        setIsVisible(false);
        setFormData({ name: '', phone: '', email: '' });
        setCurrentStep(1);
      }, 3000);
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Oops! The Crusader's Signal Got Blocked!",
        description: "Please try again or call the Crusader directly at (306) 331-4802",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const capeVariants = {
    animate: {
      rotate: [0, 5, -5, 0],
      scale: [1, 1.02, 0.98, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const particleVariants = {
    animate: {
      y: [-20, -40, -20],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%)',
            backdropFilter: 'blur(10px)'
          }}
          onClick={handleClose}
        >
          {/* Floating Particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/60 rounded-full"
              style={{
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 3) * 30}%`
              }}
              variants={particleVariants}
              animate="animate"
              transition={{ delay: i * 0.2 }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
            transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="relative max-w-lg w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glassmorphism Container */}
            <div 
              className="relative rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
            >
              {/* Animated Cape Background */}
              <motion.div
                variants={capeVariants}
                animate="animate"
                className="absolute -top-10 -right-10 w-32 h-32 opacity-20"
                style={{
                  background: 'linear-gradient(45deg, #FCD34D, #F59E0B, #DC2626)',
                  borderRadius: '50% 20% 50% 20%',
                  filter: 'blur(2px)'
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-red-600/10 rounded-3xl" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-20 p-2 rounded-full hover:bg-white/10"
                aria-label="Close popup"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Live Activity Banner */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-4 left-4 bg-green-500/90 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="font-semibold">{recentActivity}</span>
              </motion.div>

              {/* Main Content */}
              <div className="relative z-10 pt-8">
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    {/* Superhero Header */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
                      className="mb-6"
                    >
                      <div className="inline-block p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4 shadow-2xl">
                        <Shield className="w-12 h-12 text-black" />
                      </div>
                      <h2 className="font-comic text-3xl font-black text-white mb-2 uppercase">
                        <span className="text-yellow-400">WAIT!</span> The Crusader Has a
                        <br />
                        <span className="text-orange-400">Special Mission</span> for You!
                      </h2>
                    </motion.div>

                    {/* Urgency Elements */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {/* Countdown Timer */}
                      <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-3 text-center">
                        <Clock className="w-6 h-6 text-red-400 mx-auto mb-1" />
                        <div className="text-red-400 font-bold text-lg">{formatTime(timeLeft)}</div>
                        <div className="text-white text-xs">Offer Expires</div>
                      </div>

                      {/* Slots Left */}
                      <div className="bg-orange-600/20 border border-orange-500/30 rounded-xl p-3 text-center">
                        <CalendarCheck className="w-6 h-6 text-orange-400 mx-auto mb-1" />
                        <div className="text-orange-400 font-bold text-lg">{slotsLeft}</div>
                        <div className="text-white text-xs">VIP Slots Left</div>
                      </div>
                    </div>

                    {/* Value Stack */}
                    <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-xl p-4 mb-6">
                      <h3 className="text-yellow-400 font-bold text-lg mb-3">🎁 Exclusive VIP Package Worth $500+</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm text-white">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>Red Carpet Service</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Gift className="w-4 h-4 text-green-400" />
                          <span>Free Vehicle Report</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-blue-400" />
                          <span>Priority Approval</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-purple-400" />
                          <span>Lifetime Support</span>
                        </div>
                      </div>
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center justify-center gap-4 mb-6 text-sm text-white/80">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span>{visitorCount} people viewing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span>1000+ Happy Customers</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => setCurrentStep(2)}
                      className="w-full bg-gradient-to-r from-red-600 via-red-700 to-orange-600 hover:from-red-700 hover:via-red-800 hover:to-orange-700 text-white font-comic font-black text-xl py-4 rounded-xl shadow-2xl hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <CalendarCheck className="w-6 h-6 mr-3 relative z-10" />
                      <span className="relative z-10">CLAIM MY VIP TEST DRIVE!</span>
                    </Button>

                    <p className="text-center text-xs text-white/60 mt-4">
                      🔒 100% Secure • No Spam • No Obligation • Troy's Promise
                    </p>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-center"
                  >
                    <h3 className="font-comic text-2xl font-black text-yellow-400 mb-6 uppercase">
                      🦸‍♂️ The Crusader Needs Your Signal!
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Input
                          type="text"
                          name="name"
                          placeholder="Your Hero Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
                        />
                      </div>
                      
                      <div className="relative">
                        <Input
                          type="tel"
                          name="phone"
                          placeholder="Crusader Hotline (Phone)"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
                        />
                      </div>
                      
                      <div className="relative">
                        <Input
                          type="email"
                          name="email"
                          placeholder="Digital Signal (Email)"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
                        />
                      </div>

                      {/* Contact Preference */}
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-lg py-2"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-lg py-2"
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-lg py-2"
                        >
                          📱 Text
                        </Button>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 hover:from-green-700 hover:via-green-800 hover:to-emerald-700 text-white font-comic font-black text-xl py-4 rounded-xl shadow-2xl hover:shadow-green-600/50 hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group mt-6"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Sending Signal to Crusader...</span>
                          </div>
                        ) : (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <Shield className="w-6 h-6 mr-3 relative z-10" />
                            <span className="relative z-10">ACTIVATE CRUSADER MISSION!</span>
                          </>
                        )}
                      </Button>
                    </form>

                    <Button
                      onClick={() => setCurrentStep(1)}
                      variant="ghost"
                      className="text-white/60 hover:text-white mt-4"
                    >
                      ← Back to Mission Details
                    </Button>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                      className="inline-block p-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 shadow-2xl"
                    >
                      <Shield className="w-16 h-16 text-white" />
                    </motion.div>
                    
                    <h3 className="font-comic text-3xl font-black text-green-400 mb-4 uppercase">
                      🎉 Mission Accepted!
                    </h3>
                    
                    <p className="text-white text-lg mb-4">
                      The Crusader has received your signal and is preparing your VIP experience!
                    </p>
                    
                    <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-4">
                      <p className="text-green-400 font-bold">
                        Troy will contact you within 2 hours with:
                      </p>
                      <ul className="text-white text-sm mt-2 space-y-1">
                        <li>✅ Your exclusive VIP appointment</li>
                        <li>✅ Pre-approved financing options</li>
                        <li>✅ Special Crusader pricing</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
