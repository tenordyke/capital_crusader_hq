import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ThumbsUp, CheckCircle } from 'lucide-react';

const HappyClientsSection = ({ fadeInUp, staggerContainer }) => {
  const clientPhotos = [
    {
      id: 1,
      altText: "Happy client Terry & Leion with their new vehicle from The Capital Crusader",
      description: "Terry & Leion join the Hero Squad!",
      src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/47c1cb601bb9bdf765eb047564c67a25.png",
      overlayText: "From Inquiry to Keys in Record Time!"
    },
    {
      id: 2,
      altText: "Another satisfied client shaking hands with The Capital Crusader after a successful car deal",
      description: "Victory with Capital GMC!",
      src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/fb71a7392de2d93c7cb314235b8469d1.jpg",
      overlayText: "Another Heroic Delivery by Troy!"
    },
    {
      id: 3,
      altText: "Young woman Maddie smiling happily with her new car from The Capital Crusader",
      description: "Welcome to the HQ Team, Maddie!",
      src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/09416df981d2594967565867dd7b5bc2.jpg",
      overlayText: "Fast Tracked to a Fantastic Ride!"
    },
    {
      id: 4,
      altText: "Mike & Jess proudly posing with their new red GMC Terrain from The Capital Crusader",
      description: "Mike & Jess with their new ride!",
      src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/d93376bbc33e610e93c1a05e112296bd.png",
      overlayText: "Adventure Awaits - Hero Approved!"
    },
    {
      id: 5,
      altText: "Client family posing with their new SUV from The Capital Crusader",
      description: "The Anderson Family's New Adventure Mobile!",
      src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/575726270e48451a51bf818d956bdc39.png",
      overlayText: "Family Adventures Powered by the Crusader!"
    },
    {
      id: 6,
      altText: "Man excitedly pointing at his new truck from The Capital Crusader",
      description: "Dave's Dream Truck Secured!",
      src: "https://storage.googleapis.com/hostinger-horizons-assets-prod/d2016a82-0723-4f52-8896-b68c05729367/525ede022f0f80ee82d4d0191ee53647.png",
      overlayText: "Dream Truck Delivered - Mission Accomplished!"
    }
  ];

  return (
    <motion.section
      aria-labelledby="happy-clients-title"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.05 }}
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/80 via-gray-900/80 to-black/80"
      id="happy-clients"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          className="text-center mb-16 sm:mb-20"
        >
          <ThumbsUp aria-hidden="true" className="w-16 h-16 text-yellow-400 mx-auto mb-4 drop-shadow-[0_0_8px_rgba(253,224,71,0.5)] animate-bounce" />
          <h2 id="happy-clients-title" className="font-comic text-5xl sm:text-6xl font-black mb-5 text-yellow-400 uppercase"
              style={{ textShadow: '2.5px 2.5px 0px #000, -2.5px -2.5px 0px #000, 2.5px -2.5px 0px #000, -2.5px 2.5px 0px #000, 4px 4px 8px rgba(0,0,0,0.7)' }}>
            Heroic Deliveries!
          </h2>
          <p className="text-2xl sm:text-3xl text-white font-semibold" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>
            More Happy Crusaders Joining the Ranks!
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8"
          role="list" 
          aria-label="Gallery of happy clients with their new vehicles"
        >
          {clientPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              variants={fadeInUp}
              className="group aspect-[4/5] bg-black/60 rounded-xl overflow-hidden shadow-2xl 
                         border-2 border-yellow-500/40 hover:border-yellow-400 
                         transition-all duration-300 ease-in-out transform hover:scale-105 
                         relative comic-style-photo-card"
              style={{
                boxShadow: "inset 0 0 10px rgba(255,215,0,0.25), 0 8px 15px rgba(0,0,0,0.5)"
              }}
              role="listitem"
            >
              <img  
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={photo.altText}
                src={photo.src} 
                loading="lazy"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h4 className="text-yellow-400 font-bold text-xl drop-shadow-lg mb-1 font-comic">{photo.description}</h4>
                {photo.overlayText && (
                  <p className="text-white text-sm font-semibold" style={{textShadow: '1px 1px 1px black'}}> <CheckCircle size={16} className="inline mr-1 text-green-400" /> {photo.overlayText}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HappyClientsSection;