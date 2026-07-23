"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { apiService } from "@/lib/api";
import HeroBackground from "@/components/home/HeroBackground";

const defaultSlides = [
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

export default function HeroBanner() {
  const [slides, setSlides] = useState(defaultSlides);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadHeroSlides = async () => {
      try {
        const data = await apiService.getSettings();
        if (data && data.heroSlides && data.heroSlides.length > 0) {
          setSlides(data.heroSlides);
        }
      } catch (err) {
        console.error("Failed to load hero slides:", err);
      }
    };
    loadHeroSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <HeroBackground>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Text & Content */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* Main Display Heading in Megalky */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-megalky font-normal leading-[1.12] text-[#2B2C2E] tracking-tight">
            <motion.span
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="block"
            >
              {slides[currentSlide].title}
            </motion.span>
            <motion.span
              key={`highlight-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="block text-[#7CB342] mt-1 italic font-normal"
            >
              {slides[currentSlide].highlight}
            </motion.span>
          </h1>

          {/* Subtext in Satoshi */}
          <motion.p
            key={`subtext-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg text-[#58595B] leading-[1.7] max-w-xl font-sans"
          >
            {slides[currentSlide].subtext}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-2"
          >
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold tracking-wider text-white bg-[#7CB342] hover:bg-[#689B32] rounded-full transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none"
            >
              Get a Free Quote
              <ArrowRight className="ml-2.5 w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold tracking-wide text-[#2B2C2E] hover:text-[#7CB342] transition-all duration-300 group focus:outline-none"
            >
              Explore Our Work
              <ArrowRight className="ml-2 w-4 h-4 text-[#7CB342] group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Indicators */}
          <div className="flex space-x-3 pt-4 items-center">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  currentSlide === index ? "w-8 bg-[#7CB342]" : "w-2.5 bg-[#2B2C2E]/20 hover:bg-[#2B2C2E]/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Overlapping Soft-Rounded Images */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
          {/* Organic accent tint blob background */}
          <div className="absolute -inset-4 bg-[#DCE8CC] rounded-[40px] transform -rotate-3 scale-95 -z-10" />

          {/* Primary Large Image */}
          <div className="relative rounded-[28px] overflow-hidden shadow-xl aspect-[4/5] z-10 border-4 border-white">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>

          {/* Secondary Overlapping Image with Smooth Fade In/Out */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -left-8 w-44 h-44 sm:w-56 sm:h-56 rounded-[22px] overflow-hidden shadow-2xl z-20 border-4 border-white hidden sm:block"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`secondary-${currentSlide}`}
                src={slides[(currentSlide + 1) % slides.length].image}
                alt="Rexon Showcase"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </HeroBackground>
  );
}
