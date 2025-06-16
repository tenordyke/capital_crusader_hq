import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TestimonialsSection = ({ fadeInUp, staggerContainer }) => {
  const testimonials = [
    {
      name: "Leone & Terry Marcotte",
      role: "Happy Buick Envision Owners",
      company: "Capital Customer",
      content: "We recently purchased a new Buick Envision from Capital. Troy met us at the door and gave us friendly, enthusiastic, no pressure information--answering all of our questions. Troy was very knowledgeable about the vehicle we purchased. We recommend Troy to anyone looking for a vehicle.",
      rating: 5,
      avatarPlaceholder: "Man and woman smiling, representing satisfied customers"
    }
  ];

  return (
    <motion.section 
      aria-labelledby="testimonials-title"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-crusaderBlue"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 id="testimonials-title" className="font-comic text-5xl sm:text-6xl font-black mb-6 text-crusaderYellow uppercase"
              style={{ textShadow: '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 4px 4px 8px rgba(0,0,0,0.7)' }}>
            Victories from the Front Lines
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Hear from fellow Crusaders who've conquered with Capital Crusader.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer} 
          className="flex justify-center" 
          role="list"
          aria-label="Customer testimonials"
        >
          {testimonials.map((testimonial, index) => (
            <motion.blockquote
              key={index}
              variants={fadeInUp} 
              className="glass-effect-hero p-8 rounded-2xl hover:glow-effect-hero transition-all duration-300 border border-crusaderYellow/20 max-w-lg w-full bg-black/30" 
              role="listitem"
            >
              <div className="flex items-center mb-5" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} aria-hidden="true" className="w-6 h-6 text-crusaderYellow fill-current" />
                ))}
              </div>
              
              <p className="text-gray-200 mb-6 italic text-lg">&ldquo;{testimonial.content}&rdquo;</p>
              
              <footer className="mt-4">
                <div className="font-bold text-xl text-white">{testimonial.name}</div>
                <div className="text-sm text-crusaderYellow">{testimonial.role}</div>
                <cite className="text-sm text-gray-400 not-italic">{testimonial.company}</cite>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;