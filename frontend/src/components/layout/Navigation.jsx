import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Offers', path: '/offers' },
    { name: 'About', path: '/about' },
    { name: 'Videos', path: '/videos' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 via-red-700 to-red-800 shadow-lg border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 relative">
            {/* Left - Logo */}
            <div className="flex items-center -ml-8 sm:-ml-12">
              <Link to="/" className="flex items-center group">
                <img 
                  src="https://tjoyajajskeijhujoczy.supabase.co/storage/v1/object/public/images//Untitled_20250616_072055.png"
                  alt="The Capital Crusader Logo"
                  className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain filter brightness-125 contrast-110 group-hover:scale-105 transition-all duration-300 mt-4 sm:mt-6"
                />
              </Link>
            </div>

            {/* Center - Title Text */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/" className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-comic text-yellow-400 font-bold hover:text-yellow-300 transition-colors duration-300 text-center leading-tight whitespace-nowrap">
                THE CAPITAL CRUSADER
              </Link>
            </div>

            {/* Right - Desktop Navigation & Mobile Menu */}
            <div className="flex items-center gap-6">
              {/* Desktop Navigation - Simple dropdown */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-red-500 transition-colors duration-200 font-medium"
                  >
                    <span>Menu</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-red-800 rounded-lg shadow-xl border border-yellow-400/30 overflow-hidden"
                    >
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsDropdownOpen(false)}
                          className={`block px-4 py-3 text-white hover:bg-red-700 transition-colors duration-200 ${
                            isActive(item.path) ? 'bg-yellow-400 text-red-800 font-bold' : ''
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Call button - Always visible on desktop */}
              <div className="hidden md:flex">
                <a
                  href="tel:+1-306-331-4802"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-red-800 hover:bg-yellow-300 transition-colors duration-200 font-bold shadow-lg"
                >
                  <Phone size={18} />
                  <span className="hidden lg:inline">Call Now</span>
                </a>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white hover:text-yellow-400 transition-colors p-2"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-red-800 border-t border-red-600"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-yellow-400 text-red-800 font-bold'
                        : 'text-white hover:bg-red-500 hover:text-yellow-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Contact */}
                <div className="pt-4 mt-4 border-t border-red-600">
                  <a
                    href="tel:+1-306-331-4802"
                    className="flex items-center gap-2 px-3 py-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <Phone size={16} />
                    <span>306-331-4802</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>
      
      {/* Dropdown backdrop for desktop */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
