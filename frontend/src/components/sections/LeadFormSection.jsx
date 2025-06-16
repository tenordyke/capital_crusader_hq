
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { sendLeadToWebhook } from '@/lib/webhookService';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { User, Mail, MessageSquare, Send, Loader2, ShieldCheck } from 'lucide-react';

const LeadFormSection = ({ fadeInUp, staggerContainer }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ email: '', name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast({
        title: "Email Required!",
        description: "Please enter your email address to send the message.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    setIsSubmitting(true);
    try {
      // Save to Supabase
      const { error } = await supabase.from('leads').insert([
        { 
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      ]);
      if (error) throw error;

      // Also send to webhook for Ava to call
      try {
        await sendLeadToWebhook({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          source: 'contact-form'
        });
      } catch (webhookError) {
        console.error('Webhook call failed, but lead was saved:', webhookError);
        // Don't fail the whole submission if webhook fails
      }

      setSubmitted(true);
      toast({
        title: "Message Sent! 🦸‍♂️",
        description: "Thanks! Troy will get back to you shortly.",
        className: "bg-green-600 border-green-700 text-white font-semibold",
        duration: 5000,
      });
      setFormData({ email: '', name: '', message: '' }); 
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Submission Failed 🚧",
        description: "Could not send your message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    { name: 'name', label: 'Your Name (Optional)', type: 'text', icon: User, placeholder: 'e.g., Clark Kent' },
    { name: 'email', label: 'Your Email Address', type: 'email', icon: Mail, placeholder: 'e.g., hero@example.com', required: true },
  ];

  return (
    <motion.section
      id="contact-troy"
      aria-labelledby="contact-troy-title"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-700 via-orange-500 to-yellow-400"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={fadeInUp}
          className="text-center mb-10 sm:mb-12"
        >
          <ShieldCheck className="w-16 h-16 sm:w-20 sm:h-20 text-white mx-auto mb-4 sm:mb-6 drop-shadow-lg" />
          <h2 
            id="contact-troy-title" 
            className="text-white text-3xl sm:text-4xl font-comic uppercase tracking-wide"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }} 
          >
            <span className="text-yellow-400">Get in Touch with Troy</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mt-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            Have a question or need some heroic advice? Send a message directly to the Capital Crusader!
          </p>
        </motion.div>

        {submitted && !isSubmitting ? (
          <motion.div
            variants={fadeInUp}
            className="text-center p-8 bg-green-600/90 border-2 border-green-400 rounded-xl shadow-2xl"
          >
            <ShieldCheck className="w-12 h-12 text-white mx-auto mb-3" />
            <p className="text-2xl font-comic text-white font-semibold">Thanks! Your message is on its way!</p>
            <p className="text-gray-200 mt-1">Troy will text or email you shortly.</p>
            <Button onClick={() => setSubmitted(false)} className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-full shadow-lg">
              Send Another Message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="space-y-6 bg-white text-black p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl border-yellow-400 border-2"
          >
            {inputFields.map((field) => (
              <div key={field.name} className="space-y-1.5 relative">
                <Label htmlFor={field.name} className="text-red-700 font-semibold uppercase text-xs tracking-wide flex items-center">
                  <field.icon className="w-4 h-4 mr-2 text-red-600" />
                  {field.label}
                </Label>
                <Input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  className="pl-9 text-base bg-gray-100 border-gray-300 focus:border-red-500 text-black placeholder-gray-500"
                  disabled={isSubmitting}
                />
              </div>
            ))}
            
            <div className="space-y-1.5 relative">
              <Label htmlFor="message" className="text-red-700 font-semibold uppercase text-xs tracking-wide flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-red-600" />
                Your Message (Optional)
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="e.g., Interested in a GMC Sierra, best time to call, etc."
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="pl-9 text-base bg-gray-100 border-gray-300 focus:border-red-500 text-black placeholder-gray-500"
                disabled={isSubmitting}
              />
            </div>

            <Button
              type="submit"
              className="w-full font-comic text-xl py-3 px-6 rounded-full shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black font-bold"
              aria-label="Send your message to Troy"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 mr-2.5 animate-spin" />
              ) : (
                <Send className="w-5 h-5 mr-2.5" />
              )}
              {isSubmitting ? 'Sending Signal...' : 'Send to Crusader HQ'}
            </Button>
          </motion.form>
        )}
      </div>
    </motion.section>
  );
};

export default LeadFormSection;
