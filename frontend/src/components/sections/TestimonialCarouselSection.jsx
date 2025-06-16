import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Camera, Phone, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const clientPhotosData = [
  {
    id: 1,
    name: "Terry & Leion",
    quote: "Terry & Leion join the Hero Squad! Thrilled with their new ride and Troy's amazing service.",
    vehicle: "New Buick Envision",
    altText: "Happy client Terry & Leion with their new vehicle from The Capital Crusader",
    src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/47c1cb601bb9bdf765eb047564c67a25.png",
    rating: 5,
  },
  {
    id: 2,
    name: "Kelly Godlien",
    quote: "Kelly Godlien loves his new Cadillac Escalade! Another victory for the Crusader!",
    vehicle: "Cadillac Escalade",
    altText: "Kelly Godlien proudly standing with his new Cadillac Escalade from The Capital Crusader",
    src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/fb71a7392de2d93c7cb314235b8469d1.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Maddie Renwick",
    quote: "Maddie Renwick hit the road in her new GMC Terrain! The Capital Crusader delivers again!",
    vehicle: "GMC Terrain",
    altText: "Maddie Renwick excited about her new GMC Terrain, thanks to The Capital Crusader",
    src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/50a7278bd80f801bad292bf36cc253e8.jpg",
    heroHit: true,
  },
  {
    id: 4,
    name: "Mike & Jess",
    quote: "Mike & Jess with their new ride! Ready for adventure, thanks to the Crusader.",
    vehicle: "GMC Terrain",
    altText: "Mike & Jess proudly posing with their new red GMC Terrain, complete with a celebratory silver bow, from The Capital Crusader",
    src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/d93376bbc33e610e93c1a05e112296bd.png",
    rating: 5,
  },
  {
    id: 5,
    name: "The Anderson Family",
    quote: "The Anderson Family's New Adventure Mobile! Lots of smiles all around.",
    vehicle: "Spacious SUV",
    altText: "The Anderson Family happily posing with their new black SUV, ready for family adventures, from The Capital Crusader",
    src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/575726270e48451a51bf818d956bdc39.png",
    heroHit: true,
  },
  {
    id: 6,
    name: "Dave",
    quote: "Dave's Dream Truck Secured! Another hero hits the road, ready for anything.",
    vehicle: "Powerful GMC Pickup Truck",
    altText: "Dave proudly standing with his new GMC truck from The Capital Crusader",
    src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/525ede022f0f80ee82d4d0191ee53647.png",
    heroHit: true,
  }
];

const TestimonialCarouselSection = ({ fadeInUp, staggerContainer }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();
  const bookingLink = "https://troyatcapital.setmore.com/troy";

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? clientPhotosData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === clientPhotosData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBookTestDrive = () => {
    window.open(bookingLink, '_blank', 'noopener,noreferrer');
    toast({
      title: "Let's Get You Driving! 🗓️",
      description: "Redirecting to the Crusader's booking page for your test drive!",
      duration: 4000,
      className: "bg-green-600 border-green-700 text-white font-semibold",
    });
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 7000); 
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const currentClient = clientPhotosData[currentIndex];

  const slideVariants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };


  return (
    <motion.section
      aria-labelledby="testimonial-carousel-title"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
      id="testimonial-carousel"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-crusaderYellow/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-crusaderRed/10 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeInUp}
          className="text-center mb-12 sm:mb-16 relative z-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-crusaderYellow to-crusaderOrange p-4 rounded-full">
              <Camera className="w-12 h-12 text-black" />
            </div>
          </motion.div>
          
          <h2 id="testimonial-carousel-title" className="font-comic text-4xl sm:text-5xl md:text-6xl font-black mb-4 text-crusaderYellow uppercase"
              style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}>
            Testimonial Carousel
          </h2>
          <p className="text-xl sm:text-2xl text-white font-bold max-w-3xl mx-auto">
            Victories from Our Valued Crusaders!
          </p>
        </motion.div>

        <motion.div 
          variants={fadeInUp} 
          className="relative h-[650px] sm:h-[600px] md:h-[550px] flex items-center justify-center"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full max-w-xl"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl border-4 border-crusaderYellow flex flex-col items-center text-center relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-crusaderYellow/20 via-transparent to-crusaderRed/20 opacity-50"></div>
                
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 border-2 border-crusaderYellow/50 shadow-2xl group">
                  <img
                    src={currentClient.src}
                    alt={currentClient.altText}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <h3 className="relative text-3xl font-comic font-black text-crusaderYellow mb-2 uppercase"
                    style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  {currentClient.name}
                </h3>
                <p className="relative text-lg text-crusaderOrange font-bold mb-3">{currentClient.vehicle}</p>
                
                {currentClient.rating && (
                  <div className="relative flex items-center justify-center my-3" aria-label={`Rating: ${currentClient.rating} out of 5 stars`}>
                    {[...Array(currentClient.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-crusaderYellow fill-crusaderYellow drop-shadow-lg" />
                    ))}
                  </div>
                )}
                
                {currentClient.heroHit && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="relative bg-gradient-to-r from-crusaderRed to-crusaderOrange text-white font-black text-lg px-6 py-2 rounded-full mb-4"
                  >
                    Another Hero Hit the Road! 🚀
                  </motion.div>
                )}

                <blockquote className="relative text-white text-lg font-medium my-4 px-4 italic">
                  "{currentClient.quote}"
                </blockquote>
                
                <Button
                  onClick={handleBookTestDrive}
                  className="relative mt-6 bg-gradient-to-r from-crusaderRed via-red-600 to-orange-500 hover:from-red-700 hover:via-red-700 hover:to-orange-600 
                             text-white font-comic font-black text-xl py-4 px-10 rounded-xl
                             shadow-2xl hover:shadow-crusaderRed/50 hover:scale-105 active:scale-95 
                             transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <CalendarCheck className="inline-block mr-2 h-6 w-6 relative z-10" />
                  <span className="relative z-10">BOOK TEST DRIVE!</span>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => paginate(-1)}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-gradient-to-r from-crusaderYellow to-crusaderOrange hover:from-crusaderOrange hover:to-crusaderRed 
                       text-black rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-gradient-to-r from-crusaderYellow to-crusaderOrange hover:from-crusaderOrange hover:to-crusaderRed 
                       text-black rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
         <div className="flex justify-center mt-8">
            {clientPhotosData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full mx-2 transition-all duration-300 ease-in-out
                            ${currentIndex === index ? 'bg-crusaderYellow scale-150 shadow-lg shadow-crusaderYellow/50' : 'bg-gray-600 hover:bg-gray-500'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
      </div>
    </motion.section>
  );
};

export default TestimonialCarouselSection;
