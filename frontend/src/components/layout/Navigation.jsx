import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Phone, 
  ChevronDown, 
  DollarSign, 
  Car, 
  Star, 
  Users, 
  MessageCircle, 
  Calendar,
  Search,
  Bell,
  Shield,
  Zap,
  Gift
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [liveInventory, setLiveInventory] = useState(3);
  const location = useLocation();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate live inventory updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setLiveInventory(prev => prev + 1);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Offers', path: '/offers', icon: '🔥', badge: 'HOT' },
    { name: 'About Troy', path: '/about', icon: '🦸‍♂️' },
    { name: 'Videos', path: '/videos', icon: '📹' },
    { name: 'Contact', path: '/contact', icon: '📞' }
  ];

  const quickActions = [
    {
      title: 'FREE Vehicle Valuation',
      subtitle: 'Get instant trade-in value',
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      action: () => window.scrollTo({ top: document.getElementById('smart-lead-capture')?.offsetTop || 0, behavior: 'smooth' })
    },
    {
      title: 'VIP Test Drive',
      subtitle: 'Book your heroic experience',
      icon: Car,
      color: 'text-blue-400',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      action: () => window.open('https://troyatcapital.setmore.com/troy', '_blank')
    },
    {
      title: 'Live Chat with Troy',
      subtitle: 'Get instant answers',
      icon: MessageCircle,
      color: 'text-purple-400',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      action: () => console.log('Open chat')
    }
  ];

  const isActive = (path) => location.pathname === path;

  const handleQuickAction = (action) => {
    action();
    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* Premium Glassmorphism Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-2' 
            : 'py-4'
        }`}
      >
        {/* Floating Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className={`relative rounded-2xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-500 ${
              isScrolled 
                ? 'backdrop-blur-xl bg-gradient-to-r from-red-600/90 via-red-700/90 to-red-800/90' 
                : 'backdrop-blur-xl bg-gradient-to-r from-red-600/95 via-red-700/95 to-red-800/95'
            }`}
            style={{
              boxShadow: '0 25px 50px rgba(220,38,127,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
          >
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-orange-400/10 animate-pulse"></div>

            <div className="flex items-center justify-between h-16 sm:h-20 relative z-10">
              
              {/* Enhanced Logo Section */}
              <div className="flex items-center -ml-4 sm:-ml-8">
                <Link to="/" className="flex items-center group">
                  <motion.img 
                    src="https://tjoyajajskeijhujoczy.supabase.co/storage/v1/object/public/images//Untitled_20250616_072055.png"
                    alt="The Capital Crusader Logo"
                    className={`w-auto object-contain filter brightness-125 contrast-110 transition-all duration-500 ${
                      isScrolled ? 'h-12 sm:h-16' : 'h-16 sm:h-20 md:h-24'
                    }`}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Floating Particles around Logo */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
                      style={{
                        left: `${20 + i * 15}px`,
                        top: `${10 + i * 8}px`
                      }}
                      animate={{
                        y: [-5, -15, -5],
                        opacity: [0.6, 1, 0.6],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </Link>
              </div>

              {/* Dynamic Center Title */}
              <motion.div 
                className="absolute left-1/2 transform -translate-x-1/2"
                animate={{ scale: isScrolled ? 0.9 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Link 
                  to="/" 
                  className={`font-comic text-yellow-400 font-bold hover:text-yellow-300 transition-all duration-300 text-center leading-tight whitespace-nowrap ${
                    isScrolled 
                      ? 'text-sm sm:text-lg md:text-xl' 
                      : 'text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl'
                  }`}
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  THE CAPITAL CRUSADER
                </Link>
              </motion.div>

              {/* Enhanced Right Section */}
              <div className="flex items-center gap-3 sm:gap-6">
                
                {/* Live Inventory Notification */}
                <AnimatePresence>
                  {showNotification && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="hidden lg:flex items-center gap-2 px-3 py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-400 text-sm font-semibold backdrop-blur-sm"
                    >
                      <Bell className="w-4 h-4 animate-bounce" />
                      <span>New Arrival!</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Trust Signals */}
                <div className="hidden xl:flex items-center gap-4">
                  <div className="flex items-center gap-2 text-yellow-400 text-sm font-semibold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>5-Star Rated</span>
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm">
                    <Users className="w-4 h-4" />
                    <span>1000+ Customers</span>
                  </div>
                </div>

                {/* Premium Desktop Navigation */}
                <div className="hidden md:flex items-center">
                  <div className="relative">
                    <motion.button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-300 font-medium backdrop-blur-sm border border-white/20 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <span className="relative z-10">Navigation</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 relative z-10 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </motion.button>
                    
                    {/* Advanced Mega Menu */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
                          className="absolute right-0 top-full mt-4 w-96 rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(31,41,55,0.9) 100%)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
                          }}
                        >
                          {/* Quick Actions Section */}
                          <div className="p-6 border-b border-white/10">
                            <h3 className="text-yellow-400 font-comic font-bold text-lg mb-4">🚀 Quick Actions</h3>
                            <div className="space-y-3">
                              {quickActions.map((action, index) => (
                                <motion.button
                                  key={index}
                                  onClick={() => handleQuickAction(action.action)}
                                  whileHover={{ scale: 1.02, x: 5 }}
                                  className={`w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${action.bgColor} border border-white/10 hover:border-white/20 transition-all duration-300 group`}
                                >
                                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${action.bgColor} flex items-center justify-center`}>
                                    <action.icon className={`w-6 h-6 ${action.color}`} />
                                  </div>
                                  <div className="text-left">
                                    <div className="text-white font-semibold">{action.title}</div>
                                    <div className="text-white/60 text-sm">{action.subtitle}</div>
                                  </div>
                                  <ChevronDown className="w-4 h-4 text-white/40 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                              ))}
                            </div>
                          </div>

                          {/* Navigation Links */}
                          <div className="p-6">
                            <h3 className="text-yellow-400 font-comic font-bold text-lg mb-4">📍 Navigation</h3>
                            <div className="grid grid-cols-1 gap-2">
                              {navItems.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  onClick={() => setIsDropdownOpen(false)}
                                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                                    isActive(item.path)
                                      ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                                      : 'text-white hover:bg-white/10 hover:text-yellow-300'
                                  }`}
                                >
                                  <span className="text-lg">{item.icon}</span>
                                  <span className="font-medium">{item.name}</span>
                                  {item.badge && (
                                    <span className="ml-auto px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold">
                                      {item.badge}
                                    </span>
                                  )}
                                  <ChevronDown className="w-4 h-4 rotate-[-90deg] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Contact Section */}
                          <div className="p-6 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border-t border-white/10">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-yellow-400 font-bold">Need Help?</div>
                                <div className="text-white/80 text-sm">Troy is standing by!</div>
                              </div>
                              <div className="flex gap-2">
                                <motion.a
                                  href="tel:+1-306-331-4802"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-400 transition-colors"
                                >
                                  <Phone className="w-5 h-5" />
                                </motion.a>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-400 transition-colors"
                                >
                                  <MessageCircle className="w-5 h-5" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Enhanced Call Button */}
                <motion.a
                  href="tel:+1-306-331-4802"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-2xl relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,193,7,0.9) 0%, rgba(255,152,0,0.9) 100%)',
                    color: '#7F1D1D',
                    boxShadow: '0 10px 20px rgba(255,193,7,0.3)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <Phone className="w-5 h-5 relative z-10" />
                  <span className="hidden lg:inline relative z-10">Call Troy</span>
                </motion.a>

                {/* Mobile Menu Button */}
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="md:hidden text-white hover:text-yellow-400 transition-colors p-2 rounded-lg hover:bg-white/10"
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

            {/* Enhanced Mobile Navigation */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden border-t border-white/20"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(31,41,55,0.9) 100%)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  {/* Quick Actions for Mobile */}
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-yellow-400 font-comic font-bold mb-3">🚀 Quick Actions</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {quickActions.slice(0, 2).map((action, index) => (
                        <motion.button
                          key={index}
                          onClick={() => {
                            handleQuickAction(action.action);
                            setIsOpen(false);
                          }}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${action.bgColor} border border-white/10`}
                        >
                          <action.icon className={`w-5 h-5 ${action.color}`} />
                          <div className="text-left">
                            <div className="text-white font-semibold text-sm">{action.title}</div>
                            <div className="text-white/60 text-xs">{action.subtitle}</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="p-4">
                    <div className="space-y-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive(item.path)
                              ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                              : 'text-white hover:bg-white/10 hover:text-yellow-300'
                          }`}
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="font-medium">{item.name}</span>
                          {item.badge && (
                            <span className="ml-auto px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Contact Section */}
                  <div className="p-4 border-t border-white/10 bg-gradient-to-r from-yellow-400/10 to-orange-400/10">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-yellow-400 font-bold">Contact Troy</div>
                        <div className="text-white/80 text-sm">Your Auto Superhero</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <motion.a
                        href="tel:+1-306-331-4802"
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-semibold"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call Now</span>
                      </motion.a>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.nav>
      
      {/* Dropdown Backdrop */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" 
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Spacer for fixed navigation */}
      <div className={`${isScrolled ? 'h-20' : 'h-24'} transition-all duration-500`} />
    </>
  );
};

export default Navigation;
