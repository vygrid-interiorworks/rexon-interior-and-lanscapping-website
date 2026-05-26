"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Menon",
    role: "Homeowner, Kochi",
    rating: 5,
    text: "Rexon completely transformed our 3BHK into a luxury haven. The attention to detail, quality of materials, and the team's professionalism exceeded every expectation. Our home now looks like something out of a magazine!",
    category: "Interior Design",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Arun Krishnan",
    role: "Villa Owner, Thrissur",
    rating: 5,
    text: "Our garden went from barren land to an absolute tropical paradise. The landscaping team understood our vision perfectly. The water feature they built is the highlight of our entire property. Highly recommend!",
    category: "Landscaping",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Sujatha Nair",
    role: "Restaurant Owner, Calicut",
    rating: 5,
    text: "We commissioned Rexon for our restaurant's complete interior redesign. The result? Footfall doubled in the first month. Guests constantly compliment the ambience. Worth every penny invested.",
    category: "Commercial Interior",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Rajesh Kumar",
    role: "Apartment Owner, Trivandrum",
    rating: 5,
    text: "The modular kitchen they designed for us is absolutely stunning. Smart storage solutions, premium finishes, and delivered on time — exactly as promised. The after-sales service is excellent too.",
    category: "Modular Kitchen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Divya Thomas",
    role: "Bungalow Owner, Kannur",
    rating: 5,
    text: "From the very first consultation to the final handover, Rexon was an absolute pleasure to work with. Zero compromises on quality. Our courtyard garden is now our family's favourite spot.",
    category: "Garden Design",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const getIndex = (offset: number) =>
    (current + offset + testimonials.length) % testimonials.length;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#89B036]">
            Client Stories
          </span>
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-[#3A3A3A] mt-3 mb-5">
            What Our Clients Say
          </h2>
          <p className="text-[#4A4A4A] text-base leading-relaxed">
            Don&apos;t just take our word for it — hear from the families and businesses we&apos;ve transformed.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          {/* Main Card */}
          <div className="flex justify-center items-center min-h-[340px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -60, scale: 0.95 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="w-full max-w-2xl bg-[#F9F8F5] rounded-3xl p-8 lg:p-12 relative border border-[#E8E8E8] shadow-xl"
              >
                {/* Quote icon */}
                <Quote className="absolute top-8 right-8 w-10 h-10 text-[#89B036]/15" />

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
                  ))}
                </div>

                <p className="text-[#3A3A3A] text-lg leading-relaxed italic mb-8">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[current].avatar}
                    alt={testimonials[current].name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-[#89B036]/30"
                  />
                  <div>
                    <div className="font-bold text-[#3A3A3A] text-base">{testimonials[current].name}</div>
                    <div className="text-xs text-[#4A4A4A]">{testimonials[current].role}</div>
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-widest text-[#89B036]">
                      {testimonials[current].category}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border-2 border-[#89B036] text-[#89B036] hover:bg-[#89B036] hover:text-white flex items-center justify-center transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-6 h-2.5 bg-[#89B036]" : "w-2.5 h-2.5 bg-[#89B036]/25 hover:bg-[#89B036]/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border-2 border-[#89B036] text-[#89B036] hover:bg-[#89B036] hover:text-white flex items-center justify-center transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Mini cards row */}
          <div className="hidden lg:flex justify-center gap-4 mt-10">
            {[-2, -1, 1, 2].map((offset) => {
              const idx = getIndex(offset);
              return (
                <motion.div
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  whileHover={{ scale: 1.04 }}
                  className="w-44 bg-[#F9F8F5] rounded-xl p-4 border border-[#E8E8E8] cursor-pointer opacity-60 hover:opacity-100 transition-all duration-300 flex items-center gap-3"
                >
                  <img
                    src={testimonials[idx].avatar}
                    alt={testimonials[idx].name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#3A3A3A] leading-tight">{testimonials[idx].name}</div>
                    <div className="text-[10px] text-[#4A4A4A]">{testimonials[idx].category}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
