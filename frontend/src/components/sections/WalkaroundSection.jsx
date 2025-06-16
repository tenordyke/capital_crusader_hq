import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Film, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

const WalkaroundSection = ({ fadeInUp, staggerContainer }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [selectedVideoTitle, setSelectedVideoTitle] = useState('');

  const videos = [
    {
      id: 1,
      title: "Crusader's Top Pick Walkaround",
      thumbnailText: "GMC Sierra Denali Ultimate Tour",
      duration: "2:35",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4", // Example YouTube ID
      altText: "Video walkaround of a GMC Sierra Denali Ultimate"
    },
    {
      id: 2,
      title: "Luxury Cruiser Unveiled",
      thumbnailText: "Cadillac Escalade Feature Showcase",
      duration: "3:10",
      videoUrl: "https://www.youtube.com/embed/0zG0ks4LqjM", // Example YouTube ID
      altText: "Video walkaround of a Cadillac Escalade"
    }
  ];

  const openVideoModal = (videoUrl, videoTitle) => {
    setSelectedVideoUrl(videoUrl);
    setSelectedVideoTitle(videoTitle);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideoUrl('');
    setSelectedVideoTitle('');
  };

  return (
    <>
      <motion.section
        aria-labelledby="walkaround-title"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/50 to-black/70"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 id="walkaround-title" className="font-comic text-5xl sm:text-6xl font-black mb-5 text-yellow-400 uppercase"
                style={{ textShadow: '2.5px 2.5px 0px #000, -2.5px -2.5px 0px #000, 2.5px -2.5px 0px #000, -2.5px 2.5px 0px #000, 4px 4px 8px rgba(0,0,0,0.7)' }}>
              Watch a Crusader Walkaround
            </h2>
            <p className="text-2xl sm:text-3xl text-white font-semibold" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}>
              📣 Why Customers Call Me the Auto Superhero 📣
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            role="list"
            aria-label="Vehicle walkaround videos"
          >
            {videos.map((video) => (
              <motion.div
                key={video.id}
                variants={fadeInUp}
                className="aspect-video bg-black/70 rounded-xl overflow-hidden shadow-2xl 
                           border-2 border-yellow-500/50 hover:border-yellow-400 
                           transition-all duration-300 ease-in-out transform hover:scale-105 
                           flex flex-col items-center justify-center p-6 cursor-pointer 
                           relative group comic-style-video-card"
                onClick={() => openVideoModal(video.videoUrl, video.title)}
                style={{
                  backgroundImage: "linear-gradient(45deg, rgba(20,20,20,0.8) 0%, rgba(50,50,50,0.6) 100%)",
                  boxShadow: "inset 0 0 15px rgba(255,215,0,0.3), 0 10px 20px rgba(0,0,0,0.5)"
                }}
                role="listitem"
                tabIndex="0"
                onKeyPress={(e) => e.key === 'Enter' && openVideoModal(video.videoUrl, video.title)}
                aria-label={`Play video: ${video.title}`}
              >
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <PlayCircle aria-hidden="true" className="w-20 h-20 sm:w-24 sm:h-24 text-yellow-400 group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_10px_rgba(253,224,71,0.7)] mb-4" strokeWidth={1.5}/>
                
                <div className="text-center relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-yellow-300 transition-colors duration-300" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{video.title}</h3>
                  <p className="text-sm sm:text-base text-gray-300 group-hover:text-gray-100 transition-colors duration-300">{video.thumbnailText}</p>
                  <div className="mt-3 inline-flex items-center bg-black/50 text-yellow-400 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border border-yellow-500/50">
                    <Film aria-hidden="true" size={16} className="mr-1.5" />
                    <span>{video.duration}</span>
                  </div>
                </div>
                <span aria-hidden="true" className="absolute top-2 right-2 text-xs bg-red-600 text-white px-2 py-0.5 rounded-md font-comic font-bold tracking-wider">LIVE</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.p 
            variants={fadeInUp}
            className="text-center mt-12 text-gray-400 text-sm italic"
          >
            * Click on a video to watch it in a pop-up player.
          </motion.p>
        </div>
      </motion.section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[900px] bg-black border-yellow-500/50 p-0 aspect-video">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedVideoTitle}</DialogTitle>
          </DialogHeader>
          {selectedVideoUrl && (
            <iframe
              width="100%"
              height="100%"
              src={selectedVideoUrl}
              title={selectedVideoTitle || "YouTube video player"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          )}
           <DialogClose asChild>
            <Button variant="ghost" size="icon" className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-black/70 hover:bg-red-600/90 text-white hover:text-white border border-yellow-500/50 hover:border-red-500 z-50">
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">Close video player</span>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalkaroundSection;