import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const FooterSection = () => {
  const socialLinks = [
    { icon: Facebook, href: "https://m.facebook.com/profile.php?id=660255630493469", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/troy.at.capital?utm_source=qr&igsh=emFhaDJya2pneHg3", label: "Instagram" },
  ];

  const contactInfo = [
    { icon: Phone, text: "306-331-4802", href: "tel:+13063314802", label: "Call Troy" },
    { icon: Mail, text: "troy.nordyke@capitalauto.ca", href: "mailto:troy.nordyke@capitalauto.ca", label: "Email Troy" },
    { icon: MapPin, text: "4020 Rochdale Blvd., Regina, SK", href: "https://www.google.com/maps/search/?api=1&query=4020+Rochdale+Blvd+Regina+SK", label: "View Map" },
  ];
  
  const year = new Date().getFullYear();

  const footerItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.footer 
      className="bg-crusaderBlue text-white py-12 px-4 sm:px-6 lg:px-8 border-t-4 border-crusaderYellow"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        
        <motion.div variants={footerItemVariants}>
          <p className="font-comic text-3xl text-crusaderYellow mb-3">The Capital Crusader</p>
          <p className="text-md">Your trusted partner for heroic deals and super service at Capital GMC Buick Cadillac. Saving Regina, one car deal at a time!</p>
        </motion.div>

        <motion.div variants={footerItemVariants}>
          <p className="font-comic text-2xl text-crusaderYellow mb-4">Connect & Conquer</p>
          <ul className="space-y-3">
            {contactInfo.map((item, index) => (
              <li key={index} className="flex items-center justify-center md:justify-start hover:text-crusaderYellow transition-colors duration-200">
                <item.icon className="w-5 h-5 mr-3 text-crusaderYellow" />
                <a 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-crusaderYellow rounded"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={footerItemVariants}>
          <p className="font-comic text-2xl text-crusaderYellow mb-4">Follow My Adventures</p>
          <div className="flex justify-center md:justify-start space-x-5">
            {socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`Follow The Capital Crusader on ${link.label}`}
                className="text-white hover:text-crusaderYellow transition-colors duration-200 transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-crusaderYellow rounded-full p-1"
              >
                <link.icon className="w-8 h-8" />
              </a>
            ))}
          </div>
        </motion.div>

      </div>
      <motion.div 
        variants={footerItemVariants}
        className="text-center text-gray-300 pt-10 mt-10 border-t border-white/20"
      >
        <p>&copy; {year} The Capital Crusader - Troy Nordyke. All Rights Reserved.</p>
        <p className="text-sm">Operates with Capital GMC Buick Cadillac, Regina, SK.</p>
      </motion.div>
    </motion.footer>
  );
};

export default FooterSection;