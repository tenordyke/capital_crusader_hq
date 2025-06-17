import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { sendLeadToWebhook } from '@/lib/webhookService';
import { 
  Car, 
  DollarSign, 
  Calculator, 
  FileText, 
  Phone, 
  Mail, 
  MessageSquare, 
  Star, 
  Shield, 
  Zap, 
  Gift,
  Clock,
  Users,
  TrendingUp,
  Award,
  CheckCircle
} from 'lucide-react';

const SmartLeadCaptureSection = () => {
  const [activeTab, setActiveTab] = useState('valuation');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    mileage: '',
    condition: 'excellent',
    interestedVehicle: '',
    budget: '',
    timeframe: 'immediate',
    contactPreference: 'phone'
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadScore, setLeadScore] = useState(0);
  const [personalizedOffer, setPersonalizedOffer] = useState(null);
  const { toast } = useToast();

  // AI-powered lead scoring
  useEffect(() => {
    let score = 0;
    if (formData.name) score += 10;
    if (formData.phone) score += 15;
    if (formData.email) score += 10;
    if (formData.vehicleYear && parseInt(formData.vehicleYear) >= 2018) score += 20;
    if (formData.budget && parseInt(formData.budget.replace(/\D/g, '')) >= 20000) score += 15;
    if (formData.timeframe === 'immediate') score += 20;
    if (formData.timeframe === 'within_month') score += 10;
    
    setLeadScore(score);

    // Generate personalized offer based on lead score
    if (score >= 60) {
      setPersonalizedOffer({
        type: 'premium',
        discount: '$3,000',
        extras: ['Extended Warranty', 'Free Detailing', 'Priority Service'],
        urgency: 'VIP Treatment - Available Today Only!'
      });
    } else if (score >= 40) {
      setPersonalizedOffer({
        type: 'standard',
        discount: '$1,500',
        extras: ['Vehicle History Report', 'Free Oil Changes'],
        urgency: 'Special Offer - This Week Only!'
      });
    } else if (score >= 20) {
      setPersonalizedOffer({
        type: 'basic',
        discount: '$500',
        extras: ['Free Inspection'],
        urgency: 'Limited Time Offer!'
      });
    }
  }, [formData]);

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
      const leadData = {
        ...formData,
        lead_score: leadScore,
        personalized_offer: personalizedOffer,
        source: `smart-lead-capture-${activeTab}`,
        vehicle_interest: formData.interestedVehicle || 'General Inquiry',
        preferred_contact_method: formData.contactPreference
      };

      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select();

      if (error) throw error;

      try {
        await sendLeadToWebhook(leadData);
      } catch (webhookError) {
        console.error('Webhook call failed, but lead was saved:', webhookError);
      }
      
      toast({
        title: "🎉 Success! The Crusader Has Your Signal!",
        description: `Lead Score: ${leadScore}/100 - Troy will contact you within ${leadScore >= 60 ? '1 hour' : '24 hours'}!`,
        duration: 5000,
        className: "bg-green-600 border-green-700 text-white font-semibold",
      });

      setCurrentStep(4); // Success step
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Signal Blocked!",
        description: "Please try again or call Troy directly at (306) 331-4802",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    {
      id: 'valuation',
      title: 'Vehicle Valuation',
      icon: DollarSign,
      description: 'Get instant trade-in value',
      color: 'text-green-400',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 'financing',
      title: 'Financing Calculator',
      icon: Calculator,
      description: 'Calculate your payments',
      color: 'text-blue-400',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'inventory',
      title: 'Find My Vehicle',
      icon: Car,
      description: 'Browse available inventory',
      color: 'text-purple-400',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      id: 'consultation',
      title: 'Free Consultation',
      icon: FileText,
      description: 'Speak with Troy directly',
      color: 'text-orange-400',
      gradient: 'from-orange-500/20 to-red-500/20'
    }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-comic font-black text-yellow-400 text-center mb-6">
              Tell Us About Yourself
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
              />
              
              <Input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
              />
            </div>
            
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
            />

            <div className="text-center">
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!formData.name || !formData.phone || !formData.email}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-comic font-black text-lg py-3 px-8 rounded-xl"
              >
                Continue to {tabs.find(t => t.id === activeTab)?.title} →
              </Button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {activeTab === 'valuation' && (
              <>
                <h3 className="text-2xl font-comic font-black text-green-400 text-center mb-6">
                  Vehicle Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    type="number"
                    name="vehicleYear"
                    placeholder="Year (e.g., 2020)"
                    value={formData.vehicleYear}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
                  />
                  
                  <Input
                    type="text"
                    name="vehicleMake"
                    placeholder="Make (e.g., GMC)"
                    value={formData.vehicleMake}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
                  />
                  
                  <Input
                    type="text"
                    name="vehicleModel"
                    placeholder="Model (e.g., Sierra)"
                    value={formData.vehicleModel}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
                  />
                </div>
                
                <Input
                  type="number"
                  name="mileage"
                  placeholder="Mileage (e.g., 45000)"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
                />
                
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl py-3 px-4 backdrop-blur-sm"
                >
                  <option value="excellent" className="bg-gray-800">Excellent</option>
                  <option value="good" className="bg-gray-800">Good</option>
                  <option value="fair" className="bg-gray-800">Fair</option>
                  <option value="poor" className="bg-gray-800">Poor</option>
                </select>
              </>
            )}

            {activeTab === 'financing' && (
              <>
                <h3 className="text-2xl font-comic font-black text-blue-400 text-center mb-6">
                  Financing Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="budget"
                    placeholder="Budget Range (e.g., $25,000)"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
                  />
                  
                  <select
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleInputChange}
                    className="bg-white/10 border border-white/20 text-white rounded-xl py-3 px-4 backdrop-blur-sm"
                  >
                    <option value="immediate" className="bg-gray-800">Ready to Buy Now</option>
                    <option value="within_month" className="bg-gray-800">Within a Month</option>
                    <option value="within_3months" className="bg-gray-800">Within 3 Months</option>
                    <option value="just_looking" className="bg-gray-800">Just Looking</option>
                  </select>
                </div>
              </>
            )}

            {activeTab === 'inventory' && (
              <>
                <h3 className="text-2xl font-comic font-black text-purple-400 text-center mb-6">
                  Vehicle Preferences
                </h3>
                
                <Input
                  type="text"
                  name="interestedVehicle"
                  placeholder="Interested Vehicle (e.g., 2025 GMC Sierra)"
                  value={formData.interestedVehicle}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="budget"
                    placeholder="Budget Range"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
                  />
                  
                  <select
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleInputChange}
                    className="bg-white/10 border border-white/20 text-white rounded-xl py-3 px-4 backdrop-blur-sm"
                  >
                    <option value="immediate" className="bg-gray-800">Ready to Buy Now</option>
                    <option value="within_month" className="bg-gray-800">Within a Month</option>
                    <option value="within_3months" className="bg-gray-800">Within 3 Months</option>
                    <option value="just_looking" className="bg-gray-800">Just Looking</option>
                  </select>
                </div>
              </>
            )}

            {activeTab === 'consultation' && (
              <>
                <h3 className="text-2xl font-comic font-black text-orange-400 text-center mb-6">
                  Consultation Preferences
                </h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    type="button"
                    onClick={() => setFormData({...formData, contactPreference: 'phone'})}
                    variant={formData.contactPreference === 'phone' ? 'default' : 'outline'}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-lg py-3"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setFormData({...formData, contactPreference: 'email'})}
                    variant={formData.contactPreference === 'email' ? 'default' : 'outline'}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-lg py-3"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setFormData({...formData, contactPreference: 'text'})}
                    variant={formData.contactPreference === 'text' ? 'default' : 'outline'}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-lg py-3"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Text
                  </Button>
                </div>
                
                <select
                  name="timeframe"
                  value={formData.timeframe}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl py-3 px-4 backdrop-blur-sm"
                >
                  <option value="immediate" className="bg-gray-800">Contact Me Today</option>
                  <option value="within_week" className="bg-gray-800">Within a Week</option>
                  <option value="within_month" className="bg-gray-800">Within a Month</option>
                </select>
              </>
            )}

            <div className="flex gap-4">
              <Button
                onClick={() => setCurrentStep(1)}
                variant="outline"
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl py-3"
              >
                ← Back
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                className="flex-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-comic font-black text-lg py-3 px-8 rounded-xl"
              >
                Review & Submit →
              </Button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-comic font-black text-yellow-400 text-center mb-6">
              Review Your Information
            </h3>

            {/* Lead Score Display */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/30 rounded-xl p-6 text-center">
              <h4 className="text-purple-400 font-bold text-lg mb-2">🎯 Your Lead Score</h4>
              <div className="text-4xl font-black text-white mb-2">{leadScore}/100</div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${leadScore}%` }}
                ></div>
              </div>
              <p className="text-white/80 text-sm mt-2">
                {leadScore >= 60 ? 'High Priority - VIP Treatment!' : 
                 leadScore >= 40 ? 'Good Lead - Priority Service!' : 
                 'Standard Service - We\'ll Take Great Care of You!'}
              </p>
            </div>

            {/* Personalized Offer */}
            {personalizedOffer && (
              <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-xl p-6">
                <h4 className="text-green-400 font-bold text-lg mb-3">🎁 Your Personalized Offer</h4>
                <div className="text-center mb-4">
                  <div className="text-3xl font-black text-white">{personalizedOffer.discount} OFF</div>
                  <div className="text-green-400 font-semibold">{personalizedOffer.urgency}</div>
                </div>
                <div className="space-y-2">
                  {personalizedOffer.extras.map((extra, index) => (
                    <div key={index} className="flex items-center gap-2 text-white">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{extra}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="text-white font-bold text-lg mb-4">📋 Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white">
                <div><strong>Name:</strong> {formData.name}</div>
                <div><strong>Phone:</strong> {formData.phone}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Service:</strong> {tabs.find(t => t.id === activeTab)?.title}</div>
                {formData.vehicleYear && <div><strong>Vehicle:</strong> {formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel}</div>}
                {formData.budget && <div><strong>Budget:</strong> {formData.budget}</div>}
                <div><strong>Timeframe:</strong> {formData.timeframe.replace('_', ' ')}</div>
                <div><strong>Contact Method:</strong> {formData.contactPreference}</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setCurrentStep(2)}
                variant="outline"
                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl py-3"
              >
                ← Edit
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-2 bg-gradient-to-r from-red-600 via-red-700 to-orange-600 hover:from-red-700 hover:via-red-800 hover:to-orange-700 text-white font-comic font-black text-lg py-4 px-8 rounded-xl shadow-2xl hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending to Crusader...</span>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Shield className="w-6 h-6 mr-3 relative z-10" />
                    <span className="relative z-10">ACTIVATE CRUSADER MISSION!</span>
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        );

      case 4:
        return (
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
            
            <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-6 mb-6">
              <p className="text-green-400 font-bold text-lg mb-2">
                Lead Score: {leadScore}/100
              </p>
              <p className="text-white">
                Troy will contact you within {leadScore >= 60 ? '1 hour' : leadScore >= 40 ? '4 hours' : '24 hours'} with:
              </p>
              <ul className="text-white text-sm mt-3 space-y-1">
                <li>✅ Your personalized vehicle recommendations</li>
                <li>✅ Exclusive pricing and offers</li>
                <li>✅ Pre-approved financing options</li>
                {personalizedOffer && <li>✅ Your {personalizedOffer.discount} discount locked in!</li>}
              </ul>
            </div>

            <Button
              onClick={() => {
                setCurrentStep(1);
                setFormData({
                  name: '', phone: '', email: '', vehicleYear: '', vehicleMake: '', vehicleModel: '',
                  mileage: '', condition: 'excellent', interestedVehicle: '', budget: '',
                  timeframe: 'immediate', contactPreference: 'phone'
                });
                setLeadScore(0);
                setPersonalizedOffer(null);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-comic font-black text-lg py-3 px-8 rounded-xl"
            >
              Help Another Customer →
            </Button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.section
      id="smart-lead-capture"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-black to-gray-900"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
            className="inline-block p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-2xl"
          >
            <TrendingUp className="w-12 h-12 text-black" />
          </motion.div>
          
          <h2 className="font-comic text-4xl sm:text-5xl md:text-6xl font-black text-yellow-400 mb-4 uppercase">
            Smart Lead Capture System
          </h2>
          
          <p className="text-xl sm:text-2xl text-white max-w-3xl mx-auto">
            AI-Powered Lead Scoring • Personalized Offers • Multiple Conversion Paths
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setCurrentStep(1);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                activeTab === tab.id
                  ? 'border-yellow-400 bg-yellow-400/10'
                  : 'border-white/20 bg-white/5 hover:border-white/40'
              }`}
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${tab.gradient} flex items-center justify-center`}>
                <tab.icon className={`w-6 h-6 ${tab.color}`} />
              </div>
              <h3 className="font-comic font-bold text-white text-lg mb-1">{tab.title}</h3>
              <p className="text-white/60 text-sm">{tab.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-orange-400/5"></div>
          
          {/* Progress Bar */}
          <div className="relative z-10 mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Step {currentStep} of 4</span>
              <span className="text-white/60">{Math.round((currentStep / 4) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
            <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-white font-semibold text-sm">100% Secure</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-white font-semibold text-sm">Instant Results</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-white font-semibold text-sm">1000+ Customers</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
            <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-white font-semibold text-sm">5-Star Service</div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SmartLeadCaptureSection;
