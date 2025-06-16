import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { User, Mail, MessageSquare as MessageSquareText, Send, Loader2, ShieldAlert } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { sendLeadToWebhook } from '@/lib/webhookService';

const VIPAccessFormSection = ({ fadeInUp, staggerContainer }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.email) {
      toast({
        title: "Email Required, Crusader!",
        description: "Please provide your email address so I can get back to you.",
        variant: "destructive",
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('leads') 
        .insert([
          { 
            name: formData.name || null, 
            email: formData.email, 
            message: formData.message || null,
            vehicle_interest: 'General Inquiry from VIP Form', 
            preferred_contact_method: 'Email' 
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      // Send to webhook for AI follow-up
      try {
        await sendLeadToWebhook({
          name: formData.name || 'VIP Access User',
          email: formData.email,
          message: formData.message,
          vehicle_interest: 'General Inquiry from VIP Form',
          preferred_contact_method: 'Email',
          source: 'vip-access-form'
        });
      } catch (webhookError) {
        console.error('Webhook call failed, but lead was saved:', webhookError);
      }

      toast({
        title: "Message Sent to Crusader HQ! 🚀",
        description: "Thanks for reaching out! I'll get back to you ASAP via email.",
        duration: 5000,
        className: "bg-green-600 border-green-700 text-white font-semibold",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message to Supabase:', error);
      toast({
        title: "Signal Lost! Message Not Sent 😱",
        description: "Couldn't send your message. Please try again or use another contact method!",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { id: 'name', label: 'Your Name (Optional)', type: 'text', icon: User, placeholder: 'e.g., Lois Lane' },
    { id: 'email', label: 'Your Email Address', type: 'email', icon: Mail, placeholder: 'e.g., reporter@dailyplanet.com', required: true },
    { id: 'message', label: 'Your Message (Optional)', type: 'textarea', icon: MessageSquareText, placeholder: 'e.g., Interested in a GMC Sierra, best time to call, etc.' },
  ];

  return (
    <motion.section
      id="vip-access-form"
      aria-labelledby="vip-access-form-title"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-crusaderBlue"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeInUp}
          className="text-center mb-12 sm:mb-16"
        >
          <ShieldAlert className="w-20 h-20 text-crusaderYellow mx-auto mb-6 animate-pulse-subtle" />
          <h1 id="vip-access-form-title" className="font-comic text-5xl sm:text-6xl font-black mb-5 text-crusaderYellow uppercase"
              style={{ textShadow: '3px 3px 0px #000, -3px -3px 0px #000, 3px -3px 0px #000, -3px 3px 0px #000, 6px 6px 12px rgba(0,0,0,0.7)' }}>
            Get In Touch With Troy
          </h1>
          <p className="text-xl sm:text-2xl text-white font-medium" style={{ textShadow: '1.5px 1.5px 3px rgba(0,0,0,0.6)' }}>
            Have a question or need some heroic advice? Send a message directly to the Capital Crusader!
          </p>
        </motion.div>

        <motion.form
          variants={fadeInUp}
          onSubmit={handleSubmit}
          className="space-y-8 bg-crusaderRed/90 p-8 sm:p-10 md:p-12 rounded-xl shadow-2xl border-2 border-crusaderYellow/70 comic-style-form"
          style={{ boxShadow: "inset 0 0 20px rgba(255,204,0,0.15), 0 10px 30px rgba(0,0,0,0.6)" }}
        >
          {inputFields.map((field) => (
            <div key={field.id} className="space-y-2 relative">
              <Label htmlFor={field.id} className="text-lg font-comic text-crusaderYellow flex items-center">
                <field.icon className="w-5 h-5 mr-2 text-crusaderYellow" />
                {field.label}
              </Label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={handleChange}
                  rows={4}
                  className="pl-10 text-lg bg-black/30 border-crusaderYellow/60 focus:border-crusaderYellow placeholder-gray-300 text-white rounded-md"
                  disabled={isSubmitting}
                />
              ) : (
                <Input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required={field.required}
                  className="pl-10 text-lg bg-black/30 border-crusaderYellow/60 focus:border-crusaderYellow placeholder-gray-300 text-white rounded-md"
                  disabled={isSubmitting}
                />
              )}
            </div>
          ))}

          <Button 
            type="submit" 
            className="w-full font-comic text-2xl py-4 px-8 rounded-lg shadow-xl hover:shadow-2xl active:scale-95 active:brightness-90 transition-all duration-150 ease-in-out transform hover:-translate-y-1 flex items-center justify-center bg-crusaderYellow text-black hover:bg-yellow-500"
            aria-label="Send your message to The Capital Crusader"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="w-6 h-6 mr-3 animate-spin" />
            ) : (
              <Send className="w-6 h-6 mr-3" />
            )}
            {isSubmitting ? 'Sending to Crusader HQ...' : 'Send to Crusader HQ'}
          </Button>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default VIPAccessFormSection;
