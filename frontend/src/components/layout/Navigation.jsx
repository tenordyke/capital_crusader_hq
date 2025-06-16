import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Special Offers', path: '/offers' },
    { name: 'About Troy', path: '/about' },
    { name: 'Video Tours', path: '/videos' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 via-red-700 to-red-800 shadow-lg border-b-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16 sm:h-20">
          {/* Left - Logo */}
          <div className="flex justify-start">
            <Link to="/" className="flex items-center group">
              <img 
                src="https://tjoyajajskeijhujoczy.supabase.co/storage/v1/object/public/images//Untitled_20250616_072055.png"
                alt="The Capital Crusader Logo"
                className="h-12 sm:h-16 md:h-18 lg:h-20 w-auto object-contain filter brightness-125 contrast-110 group-hover:scale-105 transition-all duration-300"
              />
            </Link>
          </div>

          {/* Center - Title Text */}
          <div className="flex justify-center px-2">
            <Link to="/" className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-comic text-yellow-400 font-bold hover:text-yellow-300 transition-colors duration-300 text-center leading-tight">
              THE CAPITAL CRUSADER
            </Link>
          </div>

          {/* Right - Desktop Navigation & Mobile Menu */}
          <div className="flex justify-end">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-yellow-400 text-red-800 font-bold'
                      : 'text-white hover:bg-red-500 hover:text-yellow-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Contact Info */}
              <div className="flex items-center space-x-2 lg:space-x-3 ml-2 lg:ml-4 pl-2 lg:pl-4 border-l border-red-500">
                <a
                  href="tel:+1-306-331-4802"
                  className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <Phone size={14} />
                  <span className="text-xs lg:text-sm font-medium hidden lg:inline">306-331-4802</span>
                </a>
                <a
                  href="mailto:troy.nordyke@capitalauto.ca"
                  className="flex items-center space-x-1 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <Mail size={14} />
                  <span className="text-xs lg:text-sm font-medium hidden lg:inline">Email</span>
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-yellow-400 transition-colors"
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
              
              {/* Mobile Contact Info */}
              <div className="pt-4 mt-4 border-t border-red-600 space-y-2">
                <a
                  href="tel:+1-306-331-4802"
                  className="flex items-center space-x-2 px-3 py-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <Phone size={16} />
                  <span>306-331-4802</span>
                </a>
                <a
                  href="mailto:troy.nordyke@capitalauto.ca"
                  className="flex items-center space-x-2 px-3 py-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <Mail size={16} />
                  <span>troy.nordyke@capitalauto.ca</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
