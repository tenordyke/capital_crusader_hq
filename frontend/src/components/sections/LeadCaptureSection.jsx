import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Mail, Phone, Car, Send, Loader2, ShieldQuestion, MessageSquare, PhoneCall, AtSign, Gift, DollarSign, FileText, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { sendLeadToWebhook } from '@/lib/webhookService';

const LeadCaptureSection = ({ fadeInUp, staggerContainer }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleInterest: '',
    tradeIn: '',
    tradeInYear: '',
    tradeInMileage: '',
    purchaseTimeframe: '',
    budget: '',
    contactMethodText: false,
    contactMethodCall: false,
    contactMethodEmail: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const backgroundImageURL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/bbfa8fae3d61d7f433e72791410bc4b0.webp";

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const preferredContactMethods = [];
    if (formData.contactMethodText) preferredContactMethods.push('Text');
    if (formData.contactMethodCall) preferredContactMethods.push('Call');
    if (formData.contactMethodEmail) preferredContactMethods.push('Email');
    
    if (preferredContactMethods.length === 0) {
      toast({
        title: "Hold Up, Crusader!",
        description: "Please select at least one preferred contact method.",
        variant: "destructive",
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Save to Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            phone: formData.phone, 
            vehicle_interest: formData.vehicleInterest,
            trade_in: formData.tradeIn,
            trade_in_year: formData.tradeInYear,
            trade_in_mileage: formData.tradeInMileage,
            purchase_timeframe: formData.purchaseTimeframe,
            budget: formData.budget,
            preferred_contact_method: preferredContactMethods.join(', ')
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      // Also send to webhook for Ava to call
      try {
        await sendLeadToWebhook({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicle_interest: formData.vehicleInterest,
          trade_in: formData.tradeIn,
          trade_in_year: formData.tradeInYear,
          trade_in_mileage: formData.tradeInMileage,
          purchase_timeframe: formData.purchaseTimeframe,
          budget: formData.budget,
          preferred_contact_method: preferredContactMethods.join(', '),
          source: 'lead-capture-form'
        });
      } catch (webhookError) {
        console.error('Webhook call failed, but lead was saved:', webhookError);
        // Don't fail the whole submission if webhook fails
      }

      console.log('Lead data saved to Supabase:', data);
      toast({
        title: "Heroic Info Sent! 🚀",
        description: "Thanks, Crusader! Your request is on its way. We'll use your preferred contact method!",
        duration: 5000,
        className: "bg-green-600 border-green-700 text-white font-semibold",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicleInterest: '',
        tradeIn: '',
        tradeInYear: '',
        tradeInMileage: '',
        purchaseTimeframe: '',
        budget: '',
        contactMethodText: false,
        contactMethodCall: false,
        contactMethodEmail: false,
      });
    } catch (error) {
      console.error('Error saving lead to Supabase:', error);
      toast({
        title: "Uh Oh, Crusader Signal Lost! 😱",
        description: "Couldn't save your info. Please try again or contact support!",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { id: 'name', label: 'Full Name', type: 'text', icon: User, placeholder: 'John Smith' },
    { id: 'email', label: 'Email Address', type: 'email', icon: Mail, placeholder: 'john@example.com' },
    { id: 'phone', label: 'Phone Number (Optional)', type: 'tel', icon: Phone, placeholder: '(306) 555-1234' },
  ];

  const contactMethods = [
    { id: 'contactMethodText', label: 'Text Message', icon: MessageSquare },
    { id: 'contactMethodCall', label: 'Phone Call', icon: PhoneCall },
    { id: 'contactMethodEmail', label: 'Email', icon: AtSign },
  ];

  return (
    <motion.section
      id="lead-capture"
      aria-labelledby="lead-capture-title"
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageURL})` }}
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-crusaderBlue/85 via-black/75 to-crusaderBlue/85 z-0"></div>
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          variants={fadeInUp}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-crusaderYellow text-black px-6 py-3 rounded-full font-black text-lg mb-6"
          >
            <Gift className="w-6 h-6" />
            EXCLUSIVE OFFER - LIMITED TIME
          </motion.div>
          
          <h2 id="lead-capture-title" className="font-comic text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-white uppercase"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Get <span className="text-crusaderYellow">$500 OFF</span> + Free Car Buyer's Guide!
          </h2>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join 1,000+ Regina drivers who saved thousands with Troy's insider secrets
          </p>
          
          {/* Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-crusaderYellow/30">
              <DollarSign className="w-8 h-8 text-crusaderYellow mx-auto mb-2" />
              <p className="text-white font-bold">$500 OFF</p>
              <p className="text-sm text-gray-400">Any Vehicle Purchase</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-crusaderYellow/30">
              <FileText className="w-8 h-8 text-crusaderYellow mx-auto mb-2" />
              <p className="text-white font-bold">Free Guide</p>
              <p className="text-sm text-gray-400">Regina's Car Buying Secrets</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-crusaderYellow/30">
              <Clock className="w-8 h-8 text-crusaderYellow mx-auto mb-2" />
              <p className="text-white font-bold">Priority Access</p>
              <p className="text-sm text-gray-400">VIP Treatment Guaranteed</p>
            </div>
          </div>
        </motion.div>

        <motion.form
          variants={fadeInUp}
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 sm:p-10 rounded-2xl shadow-2xl"
        >
          {inputFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id} className="text-sm font-semibold text-gray-700 flex items-center">
                <field.icon className="w-4 h-4 mr-2 text-gray-500" />
                {field.label}
              </Label>
              <Input
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
                value={formData[field.id]}
                onChange={handleChange}
                required={field.id !== 'phone'} 
                className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crusaderYellow focus:border-transparent placeholder-gray-400 text-gray-900"
                disabled={isSubmitting}
              />
            </div>
          ))}

          <div className="space-y-2">
            <Label htmlFor="vehicleInterest" className="text-sm font-semibold text-gray-700 flex items-center">
              <Car className="w-4 h-4 mr-2 text-gray-500" />
              What vehicle are you interested in?
            </Label>
            <Textarea
              id="vehicleInterest"
              placeholder="e.g., Looking for a GMC Sierra 1500 or similar truck..."
              value={formData.vehicleInterest}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crusaderYellow focus:border-transparent placeholder-gray-400 text-gray-900"
              disabled={isSubmitting}
            />
          </div>

          {/* Trade-in Information */}
          <div className="border-t pt-6">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Trade-In Information (Optional)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="tradeIn" className="text-sm font-semibold text-gray-700">
                  Current Vehicle (Year, Make, Model)
                </Label>
                <Input
                  type="text"
                  id="tradeIn"
                  placeholder="e.g., 2018 Ford F-150"
                  value={formData.tradeIn}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crusaderYellow focus:border-transparent placeholder-gray-400 text-gray-900"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="tradeInYear" className="text-sm font-semibold text-gray-700">
                  Trade-In Year
                </Label>
                <Input
                  type="text"
                  id="tradeInYear"
                  placeholder="e.g., 2018"
                  value={formData.tradeInYear}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crusaderYellow focus:border-transparent placeholder-gray-400 text-gray-900"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="tradeInMileage" className="text-sm font-semibold text-gray-700">
                  Current Mileage
                </Label>
                <Input
                  type="text"
                  id="tradeInMileage"
                  placeholder="e.g., 45,000 km"
                  value={formData.tradeInMileage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crusaderYellow focus:border-transparent placeholder-gray-400 text-gray-900"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Purchase Information */}
          <div className="border-t pt-6">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Purchase Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="purchaseTimeframe" className="text-sm font-semibold text-gray-700">
                  When are you looking to purchase?
                </Label>
                <select
                  id="purchaseTimeframe"
                  value={formData.purchaseTimeframe}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crusaderYellow focus:border-transparent text-gray-900"
                  disabled={isSubmitting}
                >
                  <option value="">Select timeframe</option>
                  <option value="immediately">Immediately</option>
                  <option value="within_week">Within a week</option>
                  <option value="within_month">Within a month</option>
                  <option value="2-3_months">2-3 months</option>
                  <option value="just_browsing">Just browsing</option>
                </select>
              </div>
              <div>
                <Label htmlFor="budget" className="text-sm font-semibold text-gray-700">
                  Budget Range
                </Label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-crusaderYellow focus:border-transparent text-gray-900"
                  disabled={isSubmitting}
                >
                  <option value="">Select budget</option>
                  <option value="under_20k">Under $20,000</option>
                  <option value="20k-30k">$20,000 - $30,000</option>
                  <option value="30k-40k">$30,000 - $40,000</option>
                  <option value="40k-50k">$40,000 - $50,000</option>
                  <option value="50k-70k">$50,000 - $70,000</option>
                  <option value="over_70k">Over $70,000</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">
              How would you like us to contact you?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {contactMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-crusaderYellow transition-colors cursor-pointer">
                  <Checkbox
                    id={method.id}
                    checked={formData[method.id]}
                    onCheckedChange={(checked) => handleChange({ target: { id: method.id, checked, type: 'checkbox' }})}
                    disabled={isSubmitting}
                    aria-labelledby={`${method.id}-label`}
                    className="border-gray-300 data-[state=checked]:bg-crusaderYellow data-[state=checked]:border-crusaderYellow"
                  />
                  <method.icon className="w-4 h-4 text-gray-500" />
                  <Label htmlFor={method.id} id={`${method.id}-label`} className="text-sm text-gray-700 font-medium cursor-pointer select-none">
                    {method.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>


          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-crusaderRed via-red-600 to-orange-500 hover:from-red-700 hover:via-red-700 hover:to-orange-600 text-white font-bold text-lg py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
            aria-label="Get your exclusive offer"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Get My $500 OFF + Free Guide
                <Send className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
          
          <p className="text-xs text-center text-gray-500 mt-4">
            By submitting, you agree to receive communications. Your information is secure and will never be shared.
          </p>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default LeadCaptureSection;
