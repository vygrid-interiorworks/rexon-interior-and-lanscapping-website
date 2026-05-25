"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
      title: "Transforming Spaces,",
      highlight: "Inside & Out",
      subtext: "Elegantly stylized luxury home interiors curated for standard modern living across Kerala.",
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      title: "Breathtaking Gardens,",
      highlight: "Tailored Landscapes",
      subtext: "State-of-the-art outdoor architecture, pathways, and green retreats designed to wow.",
    },
    {
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      title: "Functional Aesthetics,",
      highlight: "Smart Living",
      subtext: "Custom modular kitchens, living zones, and workspaces crafted with premium long-lasting wood.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[85vh] sm:h-[90vh] lg:h-screen w-full overflow-hidden bg-black">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0 w-full h-full bg-cover bg-center select-none"
          style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.45, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 z-10" />

      {/* Content Container */}
      <div className="absolute inset-0 flex items-center z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl text-[#FFFFFF] space-y-6">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#7A9E2E]/25 border border-[#7A9E2E] text-xs font-bold uppercase tracking-widest text-[#7A9E2E]"
            >
              <Sparkles className="w-4 h-4 mr-1 text-[#7A9E2E]" />
              <span>Premium Design & Landscaping Expert</span>
            </motion.div>

            {/* Main Animated Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-playfair font-extrabold leading-tight tracking-tight text-[#FFFFFF]">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="block text-[#FFFFFF]"
              >
                {slides[currentSlide].title}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block text-[#7A9E2E] mt-1 drop-shadow-md"
              >
                {slides[currentSlide].highlight}
              </motion.span>
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-base sm:text-lg lg:text-xl text-[#D6D6D6] leading-relaxed max-w-xl font-medium"
            >
              {slides[currentSlide].subtext}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 pt-4"
            >
              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold uppercase tracking-wider text-white bg-[#7A9E2E] rounded-full hover:bg-[#4A5A1E] transition-all duration-300 shadow-xl hover:shadow-2xl focus:outline-none"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold uppercase tracking-wider text-white border-2 border-white rounded-full hover:bg-white hover:text-[#3A3A3A] transition-all duration-300 focus:outline-none"
              >
                Explore Our Work
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
              currentSlide === index ? "w-8 bg-[#7A9E2E]" : "w-2.5 bg-[#FFFFFF]/45 hover:bg-[#FFFFFF]/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
