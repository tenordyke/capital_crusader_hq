import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Send, 
  Star, 
  Users, 
  Zap, 
  DollarSign,
  Navigation,
  Building,
  Headphones
} from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'general',
    message: '',
    contactPreference: 'phone'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneNumber = "+13063314802";
  const email = "troy.nordyke@capitalauto.ca";
  const bookingLink = "https://troyatcapital.setmore.com/troy?utm_source=website&utm_medium=cta&utm_campaign=contact_page";

  const handleCallNow = () => {
    window.location.href = `tel:${phoneNumber}`;
    toast({
      title: "Calling The Crusader! 📞",
      description: "Troy is ready to help you save the day!",
      duration: 3000,
    });
  };

  const handleEmailNow = () => {
    window.location.href = `mailto:${email}?subject=Ready to Connect with The Capital Crusader!&body=Hi Troy,%0D%0A%0D%0AI'm interested in learning more about your automotive services. Please reach out to me at your earliest convenience.%0D%0A%0D%0AThank you!`;
    toast({
      title: "Email Ready! 📧",
      description: "Your message to Troy is ready to send!",
      duration: 3000,
    });
  };

  const handleBookMeeting = () => {
    window.open(bookingLink, '_blank', 'noopener,noreferrer');
    toast({
      title: "Meeting Scheduled! 🗓️",
      description: "Book your consultation with The Crusader!",
      duration: 3000,
    });
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

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "🎉 Message Sent to The Crusader!",
        description: "Troy will contact you within 24 hours. Get ready for heroic service!",
        duration: 5000,
        className: "bg-green-600 border-green-700 text-white font-semibold",
      });
      
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'general',
        message: '',
        contactPreference: 'phone'
      });
      setIsSubmitting(false);
    }, 2000);
  };

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
      <div className="flex flex-col items-center">
        
        {/* Hero Section */}
        <motion.section
          className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(31,41,55,0.9) 0%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,1) 100%)'
          }}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                background: `
                  radial-gradient(circle at 20% 80%, rgba(255,193,7,0.12) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255,152,0,0.12) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(220,38,127,0.08) 0%, transparent 50%)
                `
              }}
            />
            
            {/* Floating Elements */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${8 + i * 2}px`,
                  height: `${8 + i * 2}px`,
                  left: `${5 + i * 9}%`,
                  top: `${10 + (i % 4) * 20}%`,
                  background: `linear-gradient(135deg, rgba(255,193,7,${0.1 + i * 0.02}) 0%, rgba(255,152,0,${0.05 + i * 0.01}) 100%)`,
                  filter: 'blur(1px)'
                }}
                animate={{
                  y: [-10 - i * 2, -25 - i * 2, -10 - i * 2],
                  x: [-5, 5, -5],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto text-center">
            <motion.div variants={fadeInUp}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
                className="inline-block p-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-8 shadow-2xl"
              >
                <MessageSquare className="w-12 h-12 text-white" />
              </motion.div>
              
              <h1 className="font-comic text-5xl sm:text-6xl md:text-7xl font-black uppercase leading-[0.9] mb-8">
                <span 
                  className="block text-green-400 drop-shadow-2xl mb-2" 
                  style={{ 
                    textShadow: '4px 4px 8px rgba(0,0,0,0.8), 0 0 30px rgba(34,197,94,0.3)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  CONTACT THE
                </span>
                <span 
                  className="block text-blue-400 drop-shadow-2xl" 
                  style={{ 
                    textShadow: '4px 4px 8px rgba(0,0,0,0.8), 0 0 30px rgba(59,130,246,0.3)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  CAPITAL CRUSADER
                </span>
              </h1>

              <p className="text-2xl sm:text-3xl text-white font-bold mb-12 leading-relaxed max-w-4xl mx-auto" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0 rgba(0,0,0,0.8), 1px -1px 0 rgba(0,0,0,0.8), -1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8)' }}>
                Ready to start your <span className="text-green-400">heroic car-buying journey?</span> 
                <span className="text-blue-400"> Multiple ways to connect</span> with Regina's 
                <span className="text-yellow-400"> most trusted automotive superhero!</span>
              </p>

              {/* Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Button 
                  onClick={handleCallNow}
                  className="group font-comic text-white text-xl font-black px-12 py-6 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(34,197,94,0.95) 0%, rgba(16,185,129,0.95) 100%)',
                    boxShadow: '0 25px 50px rgba(34,197,94,0.3)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Phone className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">CALL TROY NOW</span>
                </Button>
                
                <Button 
                  onClick={handleBookMeeting}
                  className="group font-comic text-white text-xl font-black px-12 py-6 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.95) 0%, rgba(147,51,234,0.95) 100%)',
                    boxShadow: '0 25px 50px rgba(59,130,246,0.3)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Calendar className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">BOOK TEST DRIVE</span>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { value: "< 1 Hour", label: "Response Time", icon: Zap, color: "text-yellow-400" },
                  { value: "1,000+", label: "Happy Customers", icon: Users, color: "text-green-400" },
                  { value: "5-Star", label: "Service Rating", icon: Star, color: "text-blue-400" },
                  { value: "$2,500", label: "Avg. Savings", icon: DollarSign, color: "text-purple-400" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20"
                  >
                    <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                    <div className={`text-xl font-black ${stat.color}`}>{stat.value}</div>
                    <div className="text-white text-sm font-semibold">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Methods Section */}
        <motion.section 
          className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-black to-gray-900"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
                className="inline-block p-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mb-6 shadow-2xl"
              >
                <Headphones className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="font-comic text-4xl sm:text-5xl md:text-6xl font-black text-purple-400 mb-6 uppercase">
                MULTIPLE WAYS TO CONNECT
              </h2>
              
              <p className="text-xl sm:text-2xl text-white max-w-4xl mx-auto leading-relaxed" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0 rgba(0,0,0,0.8), 1px -1px 0 rgba(0,0,0,0.8), -1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8)' }}>
                Choose your preferred way to reach The Crusader. Every method gets you world-class service!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Phone,
                  title: "Call Direct",
                  subtitle: "(306) 331-4802",
                  description: "Instant connection with Troy for immediate assistance",
                  action: handleCallNow,
                  buttonText: "CALL NOW",
                  color: "from-green-500/20 to-emerald-500/20",
                  iconColor: "text-green-400",
                  buttonColor: "from-green-600 to-emerald-600"
                },
                {
                  icon: Mail,
                  title: "Send Email",
                  subtitle: "troy.nordyke@capitalauto.ca",
                  description: "Detailed inquiries and document sharing",
                  action: handleEmailNow,
                  buttonText: "EMAIL TROY",
                  color: "from-blue-500/20 to-cyan-500/20",
                  iconColor: "text-blue-400",
                  buttonColor: "from-blue-600 to-cyan-600"
                },
                {
                  icon: Calendar,
                  title: "Book Meeting",
                  subtitle: "Online Scheduling",
                  description: "Schedule test drives and consultations",
                  action: handleBookMeeting,
                  buttonText: "BOOK NOW",
                  color: "from-purple-500/20 to-pink-500/20",
                  iconColor: "text-purple-400",
                  buttonColor: "from-purple-600 to-pink-600"
                },
                {
                  icon: MessageSquare,
                  title: "Contact Form",
                  subtitle: "Detailed Inquiry",
                  description: "Send detailed messages with your specific needs",
                  action: () => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' }),
                  buttonText: "SEND MESSAGE",
                  color: "from-orange-500/20 to-red-500/20",
                  iconColor: "text-orange-400",
                  buttonColor: "from-orange-600 to-red-600"
                }
              ].map((method, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`backdrop-blur-xl border border-white/20 rounded-2xl p-8 bg-gradient-to-br ${method.color} relative overflow-hidden text-center`}
                  style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4">
                      <method.icon className={`w-8 h-8 ${method.iconColor}`} />
                    </div>
                    <h3 className="font-comic text-xl font-black text-white mb-2">{method.title}</h3>
                    <p className={`font-semibold ${method.iconColor} mb-3`}>{method.subtitle}</p>
                    <p className="text-white/80 text-sm leading-relaxed">{method.description}</p>
                  </div>
                  
                  <Button
                    onClick={method.action}
                    className={`w-full font-comic text-white font-black py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 bg-gradient-to-r ${method.buttonColor}`}
                  >
                    {method.buttonText}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Information & Hours */}
        <motion.section 
          className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900 to-black"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div 
                  className="backdrop-blur-xl border border-white/20 rounded-3xl p-8 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-blue-400/5"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <Building className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-comic text-3xl font-black text-green-400">CRUSADER HEADQUARTERS</h3>
                        <p className="text-white/80" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 0 rgba(0,0,0,0.8), 1px -1px 0 rgba(0,0,0,0.8), -1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8)' }}>Your trusted automotive fortress</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
                        <MapPin className="w-6 h-6 text-blue-400 mt-1" />
                        <div>
                          <h4 className="font-comic text-lg font-black text-white mb-1">Address</h4>
                          <p className="text-white/90" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 0 rgba(0,0,0,0.8), 1px -1px 0 rgba(0,0,0,0.8), -1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8)' }}>
                            Capital GMC Buick Cadillac<br />
                            4020 Rochdale Blvd<br />
                            Regina, SK S4X 4K7
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
                        <Phone className="w-6 h-6 text-green-400 mt-1" />
                        <div>
                          <h4 className="font-comic text-lg font-black text-white mb-1">Phone</h4>
                          <a href={`tel:${phoneNumber}`} className="text-green-400 hover:text-green-300 transition-colors font-semibold">
                            (306) 331-4802
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl">
                        <Mail className="w-6 h-6 text-blue-400 mt-1" />
                        <div>
                          <h4 className="font-comic text-lg font-black text-white mb-1">Email</h4>
                          <a href={`mailto:${email}`} className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                            troy.nordyke@capitalauto.ca
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Hours & Directions */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Hours */}
                <div 
                  className="backdrop-blur-xl border border-white/20 rounded-2xl p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                  style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-400" />
                    </div>
                    <h4 className="font-comic text-xl font-black text-white">Business Hours</h4>
                  </div>
                  
                  <div className="space-y-3 text-white">
                    {[
                      { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                      { day: "Saturday", hours: "9:00 AM - 5:00 PM" },
                      { day: "Sunday", hours: "12:00 PM - 5:00 PM" }
                    ].map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                        <span className="font-semibold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 0 rgba(0,0,0,0.8), 1px -1px 0 rgba(0,0,0,0.8), -1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8)' }}>{schedule.day}</span>
                        <span className="text-purple-400 font-bold">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-green-500/20 rounded-xl text-center">
                    <p className="text-green-400 font-bold">📞 Emergency Contact Available 24/7</p>
                    <p className="text-white text-sm mt-1" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 0 rgba(0,0,0,0.8), 1px -1px 0 rgba(0,0,0,0.8), -1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8)' }}>For urgent automotive needs</p>
                  </div>
                </div>

                {/* Directions */}
                <div 
                  className="backdrop-blur-xl border border-white/20 rounded-2xl p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
                  style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Navigation className="w-6 h-6 text-blue-400" />
                    </div>
                    <h4 className="font-comic text-xl font-black text-white">Getting Here</h4>
                  </div>
                  
                  <div className="space-y-4 text-white">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <p className="font-semibold text-blue-400 mb-1">🚗 By Car</p>
                      <p className="text-sm" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 0 rgba(0,0,0,0.8), 1px -1px 0 rgba(0,0,0,0.8), -1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8)' }}>Easy access from Ring Road and Rochdale Boulevard</p>
                    </div>
                    
                    <div className="p-3 bg-white/10 rounded-lg">
                      <p className="font-semibold text-blue-400 mb-1">🅿️ Parking</p>
                      <p className="text-sm" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 0 rgba(0,0,0,0.8), 1px -1px 0 rgba(0,0,0,0.8), -1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8)' }}>Free customer parking available on-site</p>
                    </div>
                    
                    <div className="p-3 bg-white/10 rounded-lg">
                      <p className="font-semibold text-blue-400 mb-1">🚌 Public Transit</p>
                      <p className="text-sm" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 0 rgba(0,0,0,0.8), 1px -1px 0 rgba(0,0,0,0.8), -1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8)' }}>Multiple bus routes serve the area</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Contact Form Section */}
        <motion.section 
          id="contact-form"
          className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-black to-gray-900"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
                className="inline-block p-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mb-6 shadow-2xl"
              >
                <Send className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="font-comic text-4xl sm:text-5xl md:text-6xl font-black text-orange-400 mb-6 uppercase">
                SEND A MESSAGE
              </h2>
              
              <p className="text-xl sm:text-2xl text-white max-w-3xl mx-auto leading-relaxed" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 0 rgba(0,0,0,0.8), 1px -1px 0 rgba(0,0,0,0.8), -1px 1px 0 rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.8)' }}>
                Have specific questions? Send Troy a detailed message and get personalized assistance!
              </p>
            </div>

            <div 
              className="backdrop-blur-xl border border-orange-400/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(239,68,68,0.08) 100%)',
                boxShadow: '0 25px 50px rgba(249,115,22,0.1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-transparent to-red-400/5"></div>
              
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Name *</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-semibold mb-2">Phone *</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm"
                    placeholder="Your email address"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl py-3 px-4 backdrop-blur-sm"
                  >
                    <option value="general" className="bg-gray-800">General Inquiry</option>
                    <option value="test-drive" className="bg-gray-800">Test Drive Request</option>
                    <option value="financing" className="bg-gray-800">Financing Questions</option>
                    <option value="trade-in" className="bg-gray-800">Trade-In Valuation</option>
                    <option value="service" className="bg-gray-800">Service Appointment</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/60 rounded-xl py-3 px-4 backdrop-blur-sm resize-none"
                    placeholder="Tell Troy about your automotive needs..."
                  />
                </div>
                
                <div>
                  <label className="block text-white font-semibold mb-3">Preferred Contact Method</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-white cursor-pointer">
                      <input
                        type="radio"
                        name="contactPreference"
                        value="phone"
                        checked={formData.contactPreference === 'phone'}
                        onChange={handleInputChange}
                        className="text-orange-400"
                      />
                      <Phone className="w-4 h-4" />
                      Phone
                    </label>
                    <label className="flex items-center gap-2 text-white cursor-pointer">
                      <input
                        type="radio"
                        name="contactPreference"
                        value="email"
                        checked={formData.contactPreference === 'email'}
                        onChange={handleInputChange}
                        className="text-orange-400"
                      />
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-comic text-white text-xl font-black py-4 px-8 rounded-xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Send className="w-6 h-6 mr-3 relative z-10" />
                  <span className="relative z-10">
                    {isSubmitting ? 'SENDING TO THE CRUSADER...' : 'SEND MESSAGE TO TROY'}
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default ContactPage;
