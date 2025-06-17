import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Shield, 
  Award, 
  Users, 
  TrendingUp, 
  Heart, 
  Zap, 
  Target, 
  CheckCircle,
  Calendar,
  DollarSign,
  Clock,
  Handshake,
  Trophy,
  MessageSquare
} from 'lucide-react';

const AboutPage = () => {
  const { toast } = useToast();
  const phoneNumber = "+13063314802";
  const email = "troy.nordyke@capitalauto.ca";
  const bookingLink = "https://troyatcapital.setmore.com/troy?utm_source=website&utm_medium=cta&utm_campaign=about_page";

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
        
        {/* Hero Section - Enhanced */}
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
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${12 + i * 3}px`,
                  height: `${12 + i * 3}px`,
                  left: `${10 + i * 10}%`,
                  top: `${15 + (i % 3) * 25}%`,
                  background: `linear-gradient(135deg, rgba(255,193,7,${0.1 + i * 0.02}) 0%, rgba(255,152,0,${0.05 + i * 0.01}) 100%)`,
                  filter: 'blur(1px)'
                }}
                animate={{
                  y: [-15 - i * 2, -30 - i * 2, -15 - i * 2],
                  x: [-8, 8, -8],
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.8, 1.1, 0.8]
                }}
                transition={{
                  duration: 5 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Side - Hero Content */}
              <motion.div variants={fadeInUp} className="text-center lg:text-left">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
                  className="inline-block p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-8 shadow-2xl"
                >
                  <Shield className="w-12 h-12 text-black" />
                </motion.div>
                
                <h1 className="font-comic text-5xl sm:text-6xl md:text-7xl font-black uppercase leading-[0.9] mb-8">
                  <span 
                    className="block text-yellow-400 drop-shadow-2xl mb-2" 
                    style={{ 
                      textShadow: '4px 4px 8px rgba(0,0,0,0.8), 0 0 30px rgba(255,193,7,0.3)',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    MEET THE
                  </span>
                  <span 
                    className="block text-orange-400 drop-shadow-2xl" 
                    style={{ 
                      textShadow: '4px 4px 8px rgba(0,0,0,0.8), 0 0 30px rgba(255,152,0,0.3)',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    CAPITAL CRUSADER
                  </span>
                </h1>

                <p className="text-2xl sm:text-3xl text-white font-bold mb-8 leading-relaxed">
                  Your <span className="text-yellow-400">Automotive Superhero</span> dedicated to 
                  <span className="text-orange-400"> Saving You Money</span> and delivering 
                  <span className="text-green-400"> World-Class Service!</span>
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-6 mb-10">
                  {[
                    { value: "1,000+", label: "Happy Customers", icon: Users, color: "text-green-400" },
                    { value: "5+", label: "Years Experience", icon: Award, color: "text-blue-400" },
                    { value: "5-Star", label: "Service Rating", icon: Star, color: "text-yellow-400" }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20"
                    >
                      <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                      <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                      <div className="text-white text-sm font-semibold">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
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
                    onClick={handleEmailNow}
                    variant="outline"
                    className="group font-comic text-yellow-400 hover:text-black text-xl font-black px-12 py-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-xl hover:scale-105 border border-yellow-400/50"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(31,41,55,0.8) 100%)',
                      boxShadow: '0 25px 50px rgba(0,0,0,0.4)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-yellow-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Mail className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">EMAIL TROY</span>
                  </Button>
                </div>
              </motion.div>

              {/* Right Side - Hero Image */}
              <motion.div variants={fadeInUp} className="relative">
                <div className="relative group">
                  {/* Glow Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-orange-500/20 to-red-600/30 rounded-3xl blur-3xl scale-110 opacity-60 group-hover:opacity-80 transition-all duration-700"></div>
                  
                  {/* Image Container */}
                  <div 
                    className="relative overflow-hidden rounded-3xl border border-yellow-400/30 group-hover:border-yellow-400/50 transition-all duration-500 shadow-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                      boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
                    }}
                  >
                    <img 
                      src="https://tjoyajajskeijhujoczy.supabase.co/storage/v1/object/public/images//circle.jpg"
                      alt="Troy Nordyke - The Capital Crusader, your Regina automotive superhero"
                      className="w-full h-auto transform group-hover:scale-105 transition-all duration-700 filter group-hover:brightness-110"
                      loading="eager"
                    />
                  </div>
                  
                  {/* Floating Badge */}
                  <motion.div 
                    className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl border border-white/10"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,193,7,0.9) 0%, rgba(255,152,0,0.9) 100%)',
                      boxShadow: '0 20px 40px rgba(255,193,7,0.3)'
                    }}
                    animate={{ 
                      y: [-8, 8, -8],
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Trophy className="w-12 h-12 text-black" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Troy's Story Section */}
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
                className="inline-block p-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mb-6 shadow-2xl"
              >
                <Heart className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="font-comic text-4xl sm:text-5xl md:text-6xl font-black text-blue-400 mb-6 uppercase">
                THE CRUSADER'S ORIGIN STORY
              </h2>
              
              <p className="text-xl sm:text-2xl text-white max-w-4xl mx-auto leading-relaxed">
                Every superhero has an origin story. Here's how Troy became Regina's most trusted automotive hero.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div 
                  className="backdrop-blur-xl border border-white/20 rounded-3xl p-8 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5"></div>
                  
                  <div className="relative z-10">
                    <h3 className="font-comic text-3xl font-black text-yellow-400 mb-6">
                      🦸‍♂️ The Mission Begins
                    </h3>
                    
                    <div className="space-y-6 text-white text-lg leading-relaxed">
                      <p>
                        With <strong className="text-yellow-400">5+ years of sales experience</strong>, Troy discovered his true calling: 
                        protecting Regina families from the stress and confusion of car buying. He witnessed too many people 
                        getting overwhelmed by pushy salespeople and complicated processes.
                      </p>
                      
                      <p>
                        That's when <strong className="text-orange-400">The Capital Crusader was born</strong> - a superhero 
                        dedicated to making car buying simple, transparent, and actually enjoyable. Troy's superpower? 
                        <strong className="text-green-400"> Genuine care for every customer's needs</strong>.
                      </p>
                      
                      <p>
                        Today, Troy has helped <strong className="text-blue-400">over 1,000 Regina families</strong> find their 
                        perfect vehicle, saving them thousands of dollars and countless hours of stress. His mission continues: 
                        <strong className="text-purple-400">One satisfied customer at a time</strong>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Shield, title: "Zero Pressure", desc: "No pushy tactics, ever", color: "text-blue-400" },
                    { icon: Heart, title: "Genuine Care", desc: "Your needs come first", color: "text-red-400" },
                    { icon: Zap, title: "Lightning Fast", desc: "Quick, efficient service", color: "text-yellow-400" },
                    { icon: Target, title: "Perfect Match", desc: "Find your ideal vehicle", color: "text-green-400" }
                  ].map((value, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20"
                    >
                      <value.icon className={`w-10 h-10 ${value.color} mx-auto mb-3`} />
                      <h4 className="font-comic text-lg font-black text-white mb-2">{value.title}</h4>
                      <p className="text-white/80 text-sm">{value.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Achievement Cards */}
                {[
                  {
                    icon: Users,
                    title: "1,000+ Happy Customers",
                    desc: "Regina families who trust The Crusader",
                    stat: "98% Satisfaction Rate",
                    color: "from-green-500/20 to-emerald-500/20",
                    iconColor: "text-green-400"
                  },
                  {
                    icon: DollarSign,
                    title: "$2.5M+ in Savings",
                    desc: "Total money saved for customers",
                    stat: "Average $2,500 per customer",
                    color: "from-yellow-500/20 to-orange-500/20",
                    iconColor: "text-yellow-400"
                  },
                  {
                    icon: Clock,
                    title: "15-Minute Approvals",
                    desc: "Lightning-fast financing decisions",
                    stat: "Industry-leading speed",
                    color: "from-blue-500/20 to-purple-500/20",
                    iconColor: "text-blue-400"
                  }
                ].map((achievement, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02, y: -3 }}
                    className={`backdrop-blur-xl border border-white/20 rounded-2xl p-6 bg-gradient-to-br ${achievement.color}`}
                    style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                        <achievement.icon className={`w-8 h-8 ${achievement.iconColor}`} />
                      </div>
                      <div>
                        <h4 className="font-comic text-xl font-black text-white">{achievement.title}</h4>
                        <p className="text-white/80">{achievement.desc}</p>
                      </div>
                    </div>
                    <div className={`text-2xl font-black ${achievement.iconColor}`}>{achievement.stat}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Customer Testimonials */}
        <motion.section 
          className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-900 to-black"
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
                <MessageSquare className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="font-comic text-4xl sm:text-5xl md:text-6xl font-black text-purple-400 mb-6 uppercase">
                CRUSADER SUCCESS STORIES
              </h2>
              
              <p className="text-xl sm:text-2xl text-white max-w-4xl mx-auto leading-relaxed">
                Real stories from real Regina families who experienced The Crusader difference.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah & Mike Johnson",
                  vehicle: "2024 GMC Sierra",
                  quote: "Troy saved us $4,200 and made the whole process stress-free. He's not just a salesperson - he's genuinely looking out for your best interests!",
                  rating: 5,
                  savings: "$4,200 Saved",
                  color: "from-green-500/20 to-emerald-500/20"
                },
                {
                  name: "Jennifer Martinez",
                  vehicle: "2024 Cadillac XT4",
                  quote: "I was dreading car shopping, but Troy made it actually enjoyable! He found me the perfect Cadillac with payments I could afford. Amazing service!",
                  rating: 5,
                  savings: "$3,800 Saved",
                  color: "from-blue-500/20 to-cyan-500/20"
                },
                {
                  name: "David & Lisa Chen",
                  vehicle: "2024 Buick Encore",
                  quote: "Troy went above and beyond to get us approved when other dealers said no. He's a true professional who delivers on his promises!",
                  rating: 5,
                  savings: "$2,900 Saved",
                  color: "from-purple-500/20 to-pink-500/20"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`backdrop-blur-xl border border-white/20 rounded-2xl p-8 bg-gradient-to-br ${testimonial.color} relative overflow-hidden`}
                  style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}
                >
                  <div className="absolute top-4 right-4">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-comic text-xl font-black text-white mb-2">{testimonial.name}</h4>
                    <p className="text-yellow-400 font-semibold">{testimonial.vehicle}</p>
                  </div>
                  
                  <blockquote className="text-white text-lg leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="bg-green-500/20 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-green-400">{testimonial.savings}</div>
                    <div className="text-white text-sm">Customer Savings</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-black to-gray-900"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", duration: 0.8 }}
                className="inline-block p-4 bg-gradient-to-br from-red-400 to-orange-500 rounded-full mb-6 shadow-2xl"
              >
                <Handshake className="w-12 h-12 text-white" />
              </motion.div>
              
              <h2 className="font-comic text-4xl sm:text-5xl md:text-6xl font-black text-red-400 mb-6 uppercase">
                READY TO MEET YOUR HERO?
              </h2>
              
              <p className="text-xl sm:text-2xl text-white max-w-4xl mx-auto leading-relaxed mb-12">
                The Crusader is standing by, ready to save your day with unbeatable deals and world-class service!
              </p>
            </div>

            <div 
              className="backdrop-blur-xl border border-red-400/30 rounded-3xl p-12 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(249,115,22,0.08) 100%)',
                boxShadow: '0 25px 50px rgba(239,68,68,0.1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 via-transparent to-orange-400/5"></div>
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <h3 className="font-comic text-3xl font-black text-yellow-400 mb-8">
                    🚀 ACTIVATE THE CRUSADER SIGNAL!
                  </h3>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex items-center gap-4 justify-center lg:justify-start">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Phone className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">Call The Crusader</div>
                        <div className="text-green-400 font-semibold">(306) 331-4802</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 justify-center lg:justify-start">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Mail className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">Email The Crusader</div>
                        <div className="text-blue-400 font-semibold">troy.nordyke@capitalauto.ca</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 justify-center lg:justify-start">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-lg">Visit The Fortress</div>
                        <div className="text-purple-400 font-semibold">4020 Rochdale Blvd, Regina, SK</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
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
                      <span className="relative z-10">CALL NOW</span>
                    </Button>
                    
                    <Button 
                      onClick={handleBookMeeting}
                      className="group font-comic text-white text-xl font-black px-12 py-6 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(220,38,127,0.95) 0%, rgba(239,68,68,0.95) 100%)',
                        boxShadow: '0 25px 50px rgba(220,38,127,0.3)'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <Calendar className="w-6 h-6 relative z-10" />
                      <span className="relative z-10">BOOK MEETING</span>
                    </Button>
                  </div>
                </div>

                <div className="text-center lg:text-right">
                  <div className="inline-block p-8 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20">
                    <h4 className="font-comic text-2xl font-black text-yellow-400 mb-6">
                      🏆 Why Choose The Crusader?
                    </h4>
                    
                    <div className="space-y-4 text-white">
                      {[
                        "✅ No pressure, just honest advice",
                        "✅ Transparent pricing & deals",
                        "✅ Lightning-fast approvals",
                        "✅ Personalized service",
                        "✅ 5-star customer satisfaction",
                        "✅ Regina's most trusted dealer"
                      ].map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="text-lg font-semibold"
                        >
                          {benefit}
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-4 bg-green-500/20 rounded-xl">
                      <div className="text-3xl font-black text-green-400">$2,500</div>
                      <div className="text-white text-sm">Average Customer Savings</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

      </div>
    </Layout>
  );
};

export default AboutPage;
