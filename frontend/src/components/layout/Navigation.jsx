import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Troy', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Redesigned Navigation with Comic Book Logo */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative rounded-2xl border border-white/20 shadow-2xl transition-all duration-300 ${
              isScrolled 
                ? 'backdrop-blur-xl bg-gradient-to-r from-red-600/95 via-red-700/95 to-red-800/95' 
                : 'backdrop-blur-xl bg-gradient-to-r from-red-600/90 via-red-700/90 to-red-800/90'
            }`}
            style={{
              boxShadow: '0 20px 40px rgba(220,38,127,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
              overflow: 'visible'
            }}
          >
            <div className={`flex items-center justify-between px-6 ${
              isScrolled ? 'h-16 sm:h-18' : 'h-18 sm:h-20'
            }`}>
              
              {/* Logo Section with Comic Book Effect */}
              <div className="flex items-center relative">
                <Link to="/" className="flex items-center group relative z-20">
                  <motion.img 
                    src="https://tjoyajajskeijhujoczy.supabase.co/storage/v1/object/public/images//Untitled_20250616_072055.png"
                    alt="The Capital Crusader Logo"
                    className={`w-auto object-contain filter brightness-125 contrast-110 transition-all duration-300 ${
                      isScrolled 
                        ? 'h-20 sm:h-24' // Comic book size when scrolled
                        : 'h-24 sm:h-28' // Full comic book effect when not scrolled
                    }`}
                    style={{
                      filter: 'brightness(125%) contrast(110%) drop-shadow(0 6px 12px rgba(0,0,0,0.4))',
                      marginTop: '-4px',
                      marginBottom: '-4px'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      rotate: 1,
                      filter: 'brightness(135%) contrast(120%) drop-shadow(0 8px 16px rgba(255,193,7,0.5))'
                    }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  />
                  
                  {/* Comic book glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </Link>
              </div>

              {/* Center Section - Title on Left, Nav Links Evenly Spaced */}
              <div className="flex-1 flex items-center px-4 hidden sm:flex">
                {/* Title on Left */}
                <Link 
                  to="/" 
                  className={`font-comic text-yellow-400 font-bold hover:text-yellow-300 transition-colors duration-300 whitespace-nowrap mr-8 ${
                    isScrolled 
                      ? 'text-lg md:text-xl lg:text-2xl' 
                      : 'text-xl md:text-2xl lg:text-3xl'
                  }`}
                  style={{ 
                    textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
                    letterSpacing: '0.05em'
                  }}
                >
                  THE CAPITAL CRUSADER
                </Link>

                {/* Navigation Links - Evenly Spaced */}
                <div className="flex-1 flex justify-evenly items-center">
                  {navItems.map((item) => (
                    <motion.div key={item.name} className="relative">
                      <Link
                        to={item.path}
                        className={`font-medium text-lg transition-all duration-300 hover:scale-105 relative z-10 ${
                          isActive(item.path)
                            ? 'text-yellow-400 font-bold'
                            : 'text-white hover:text-yellow-300'
                        }`}
                      >
                        {item.name === 'About Troy' ? 'About' : item.name}
                      </Link>
                      {/* Active indicator */}
                      {isActive(item.path) && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-yellow-400 rounded-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      {/* Hover glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-yellow-400/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"
                        whileHover={{ scale: 1.1 }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Section - Call Button */}
              <div className="flex items-center gap-6">
                {/* Call Button */}
                <motion.a
                  href="tel:+1-306-331-4802"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,193,7,0.9) 0%, rgba(255,152,0,0.9) 100%)',
                    color: '#7F1D1D'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                  <Phone className="w-5 h-5 relative z-10" />
                  <span className="hidden sm:inline relative z-10">Call Troy</span>
                </motion.a>

                {/* Mobile Menu Button */}
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="sm:hidden text-white hover:text-yellow-400 transition-colors p-2"
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={24} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu size={24} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="sm:hidden border-t border-white/20 bg-black/20 backdrop-blur-xl"
                >
                  <div className="p-4 space-y-2">
                    {/* Mobile Title */}
                    <div className="text-center mb-4">
                      <Link 
                        to="/" 
                        className="font-comic text-yellow-400 font-bold text-xl"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                      >
                        THE CAPITAL CRUSADER
                      </Link>
                    </div>
                    
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive(item.path)
                            ? 'bg-yellow-400/20 text-yellow-400 font-bold'
                            : 'text-white hover:bg-white/10 hover:text-yellow-300'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                    
                    {/* Mobile Contact */}
                    <div className="pt-4 border-t border-white/20">
                      <motion.a
                        href="tel:+1-306-331-4802"
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 text-white rounded-xl font-semibold"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call Troy Now</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
      
      {/* Spacer for fixed navigation */}
      <div className={`${isScrolled ? 'h-20' : 'h-24'} transition-all duration-300`} />
    </>
  );
};

export default Navigation;
