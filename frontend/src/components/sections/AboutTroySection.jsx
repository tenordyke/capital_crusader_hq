import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Award, Calendar, Users, Heart, Star, Shield, Phone, CalendarCheck } from 'lucide-react';

const AboutTroySection = ({ fadeInUp, staggerContainer }) => {
  const { toast } = useToast();
  const bookingLink = "https://troyatcapital.setmore.com/troy?utm_source=website&utm_medium=cta&utm_campaign=about_troy";
  const phoneNumber = "+13063314802";

  const handleBookTestDrive = () => {
    window.open(bookingLink, '_blank', 'noopener,noreferrer');
    toast({
      title: "Meeting the Crusader!",
      description: "Troy is excited to help you find your perfect vehicle!",
      duration: 4000,
      className: "bg-green-600 border-green-700 text-white font-semibold",
    });
  };

  const handleCallNow = () => {
    window.location.href = `tel:${phoneNumber}`;
    toast({
      title: "Calling the Crusader! 📞",
      description: "Troy is ready to help you save the day!",
      duration: 3000,
    });
  };

  const achievements = [
    {
      icon: Calendar,
      title: "30+ Years Experience",
      description: "In sales since 1992 - automotive and beyond",
      color: "text-blue-400"
    },
    {
      icon: Users,
      title: "1,000+ Happy Customers",
      description: "Regina families trust Troy for their vehicle needs",
      color: "text-green-400"
    },
    {
      icon: Award,
      title: "Top Performer",
      description: "Consistently recognized for excellence and integrity",
      color: "text-yellow-400"
    },
    {
      icon: Heart,
      title: "Community Champion",
      description: "Proud Regina local supporting our community",
      color: "text-red-400"
    }
  ];

  return (
    <motion.section
      id="about-troy"
      aria-labelledby="about-troy-title"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-black to-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeInUp}
          className="text-center mb-16"
        >
          {/* Clean Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center bg-gradient-to-r from-crusaderRed to-orange-600 text-white px-8 py-4 rounded-full font-black text-lg mb-8 shadow-2xl"
          >
            <span>30+ YEARS EXPERIENCE</span>
          </motion.div>
          
          {/* Clean Title */}
          <h2 id="about-troy-title" className="font-comic text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-crusaderYellow uppercase text-outline-black-lg drop-shadow-2xl">
            Meet Troy
          </h2>
          
          {/* Clean Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto font-semibold leading-relaxed">
            Regina's trusted auto superhero with <span className="text-crusaderYellow">30+ years of sales expertise</span>
          </p>
        </motion.div>

        {/* Troy's Story - Full Width */}
        <motion.div variants={fadeInUp} className="mb-16">
          <div className="bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 backdrop-blur-md rounded-2xl p-8 sm:p-12 border border-crusaderYellow/30 max-w-4xl mx-auto">
            <h3 className="font-comic text-3xl sm:text-4xl font-black text-crusaderOrange mb-8 text-outline-black-sm text-center">
              The Crusader's Origin Story
            </h3>
            
            <div className="space-y-6 text-gray-300 text-center">
              <p className="text-lg sm:text-xl leading-relaxed">
                <span className="text-crusaderYellow font-bold">Since 1992</span>, Troy has been perfecting the art of helping people make confident decisions. His journey began in retail sales, expanded into real estate, and now he's found his true calling in the automotive world.
              </p>
              
              <p className="text-lg sm:text-xl leading-relaxed">
                What makes Troy different? He genuinely cares about finding you the <span className="text-crusaderOrange font-bold">right vehicle</span>, not just making a sale. His superhero motto: <span className="text-crusaderYellow font-bold">"No pressure, just savings!"</span>
              </p>
              
              <p className="text-lg sm:text-xl leading-relaxed">
                As a proud Regina local, Troy understands our community's needs. Whether you're a first-time buyer or upgrading your family vehicle, he'll guide you through every step with honesty, expertise, and a smile.
              </p>
            </div>

            <div className="mt-10 p-6 bg-gradient-to-r from-crusaderRed/20 via-crusaderOrange/20 to-crusaderYellow/20 rounded-xl border border-crusaderYellow/30">
              <p className="text-xl sm:text-2xl font-bold text-crusaderYellow text-center">
                "Every customer deserves to feel like a superhero when they drive off our lot!"
              </p>
              <p className="text-center text-gray-400 mt-3 text-lg">- Troy Nordyke, Capital Crusader</p>
            </div>
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group bg-gradient-to-br from-black/70 via-gray-900/70 to-black/70 backdrop-blur-md border-2 border-crusaderYellow/30 rounded-2xl p-6 text-center hover:border-crusaderYellow hover:scale-105 transition-all duration-300 relative overflow-hidden card-perfect-hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-crusaderYellow/5 via-transparent to-crusaderOrange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <achievement.icon className={`w-12 h-12 mx-auto mb-4 ${achievement.color} relative z-10`} />
              <h4 className="font-comic text-xl sm:text-2xl font-black text-crusaderYellow mb-3 relative z-10">{achievement.title}</h4>
              <p className="text-gray-300 text-sm sm:text-base relative z-10">{achievement.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={fadeInUp} className="text-center">
          <div className="bg-gradient-to-r from-black/60 via-gray-900/60 to-black/60 backdrop-blur-md rounded-2xl p-8 border border-crusaderYellow/30 max-w-4xl mx-auto">
            <h3 className="font-comic text-3xl sm:text-4xl font-black text-crusaderYellow mb-6">
              Ready to Meet Your Auto Superhero?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Experience the difference 30+ years of sales expertise makes. No pressure, just honest advice and heroic savings!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                onClick={handleBookTestDrive}
                className="group w-full sm:w-auto font-comic bg-gradient-to-r from-crusaderRed via-red-600 to-orange-500 hover:from-red-700 hover:via-red-800 hover:to-orange-600 text-white text-xl font-black px-10 py-6 rounded-2xl shadow-2xl hover:shadow-crusaderRed/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 relative overflow-hidden button-perfect-hover"
                aria-label="Book a test drive with Troy"
              >
                <CalendarCheck className="w-6 h-6 relative z-10" />
                <span className="relative z-10">MEET THE CRUSADER</span>
              </Button>
              
              <Button 
                onClick={handleCallNow}
                variant="outline"
                className="group w-full sm:w-auto font-comic border-3 border-crusaderYellow text-crusaderYellow hover:bg-crusaderYellow hover:text-black text-xl font-black px-10 py-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 backdrop-blur-md bg-black/20 hover:shadow-2xl hover:shadow-crusaderYellow/30 hover:scale-105 relative overflow-hidden button-perfect-hover"
                aria-label="Call Troy directly"
              >
                <Phone className="w-6 h-6 relative z-10" />
                <span className="relative z-10">CALL TROY NOW</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutTroySection;
