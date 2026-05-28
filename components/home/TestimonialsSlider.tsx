"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, X } from "lucide-react";
import { apiService } from "@/lib/api";

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
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    rating: 5,
    category: "Interior Design",
    text: "",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
  });

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const getIndex = (offset: number) =>
    (current + offset + testimonials.length) % testimonials.length;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiService.submitTestimonial({
        name: form.name,
        role: form.role,
        rating: Number(form.rating),
        category: form.category,
        text: form.text,
        avatar: form.avatar,
        projectType: form.category === "Landscaping" || form.category === "Garden Design" ? "Landscaping" : "Interior",
      });
      setSubmitted(true);
      setTimeout(() => {
        setFormOpen(false);
        setSubmitted(false);
        setForm({
          name: "",
          role: "",
          rating: 5,
          category: "Interior Design",
          text: "",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
        });
      }, 3000);
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setSubmitting(false);
    }
  };

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

          {/* Add Testimonial CTA Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => setFormOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#89B036] hover:bg-[#89B036] hover:text-white text-[#89B036] font-bold rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Add Your Experience
            </button>
          </div>
        </div>
      </div>

      {/* Add Testimonial Pop-up Modal */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setFormOpen(false)} />
            
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 z-10 border border-gray-100 max-h-[92vh] overflow-y-auto"
            >
              <button 
                onClick={() => setFormOpen(false)} 
                className="absolute top-5 right-5 text-[#4A4A4A] hover:text-[#3A3A3A] transition-colors p-1.5 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#89B036]/15 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-9 h-9 text-[#89B036] fill-[#89B036]" />
                  </div>
                  <h3 className="text-2xl font-playfair font-bold text-[#3A3A3A] mb-2">Thank You!</h3>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed">
                    Your experience has been shared successfully. Thank you for taking the time to write a review!
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#89B036]">Share Your Story</span>
                    <h3 className="text-2xl font-playfair font-bold text-[#3A3A3A] mt-1">Add Your Experience</h3>
                    <p className="text-xs text-[#4A4A4A] mt-1">We value your honest feedback and design experience.</p>
                  </div>

                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#89B036] transition-colors text-[#3A3A3A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-1.5">
                        Location / Role *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Homeowner, Kochi"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#89B036] transition-colors placeholder:text-[#AAAAAA] text-[#3A3A3A]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-1.5">
                          Project Category
                        </label>
                        <select
                          value={form.category}
                          onChange={(e) => setForm({ ...form, category: e.target.value })}
                          className="w-full border border-[#E5E5E5] rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#89B036] transition-colors text-[#3A3A3A]"
                        >
                          <option>Interior Design</option>
                          <option>Landscaping</option>
                          <option>Modular Kitchen</option>
                          <option>Garden Design</option>
                          <option>Commercial Interior</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-1.5">
                          Rating *
                        </label>
                        <div className="flex gap-1.5 h-11 items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setForm({ ...form, rating: star })}
                              className="focus:outline-none cursor-pointer"
                            >
                              <Star
                                className={`w-6 h-6 transition-all duration-150 ${
                                  star <= form.rating
                                    ? "text-[#F59E0B] fill-[#F59E0B] scale-110"
                                    : "text-gray-300 hover:text-[#F59E0B]"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-1.5">
                        Share Your Experience *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.text}
                        onChange={(e) => setForm({ ...form, text: e.target.value })}
                        className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#89B036] transition-colors text-[#3A3A3A]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#89B036] hover:bg-[#546622] text-white font-bold py-3.5 rounded-xl transition-colors duration-300 text-sm uppercase tracking-wider shadow-md focus:outline-none disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? "Submitting..." : "Submit Experience"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
