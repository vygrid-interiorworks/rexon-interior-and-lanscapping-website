"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, X, Leaf } from "lucide-react";
import { apiService } from "@/lib/api";

const testimonials = [
  {
    name: "Priya Menon",
    role: "Homeowner, Kochi",
    rating: 5,
    text: "Rexon completely transformed our 3BHK into a luxury haven. The attention to detail, quality of materials, and the team's professionalism exceeded every expectation. Our home now looks like something out of a magazine!",
    category: "Interior Design",
  },
  {
    name: "Arun Krishnan",
    role: "Villa Owner, Thrissur",
    rating: 5,
    text: "Our garden went from barren land to an absolute tropical paradise. The landscaping team understood our vision perfectly. The water feature they built is the highlight of our entire property. Highly recommend!",
    category: "Landscaping",
  },
  {
    name: "Sujatha Nair",
    role: "Restaurant Owner, Calicut",
    rating: 5,
    text: "We commissioned Rexon for our restaurant's complete interior redesign. The result? Footfall doubled in the first month. Guests constantly compliment the ambience. Worth every penny invested.",
    category: "Commercial Interior",
  },
  {
    name: "Rajesh Kumar",
    role: "Apartment Owner, Trivandrum",
    rating: 5,
    text: "The modular kitchen they designed for us is absolutely stunning. Smart storage solutions, premium finishes, and delivered on time — exactly as promised. The after-sales service is excellent too.",
    category: "Modular Kitchen",
  },
  {
    name: "Divya Thomas",
    role: "Bungalow Owner, Kannur",
    rating: 5,
    text: "From the very first consultation to the final handover, Rexon was an absolute pleasure to work with. Zero compromises on quality. Our courtyard garden is now our family's favourite spot.",
    category: "Garden Design",
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState<string[]>([
    "Interior Design",
    "Landscaping",
    "Modular Kitchen",
    "Garden Design",
    "Commercial Interior",
  ]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    rating: 5,
    category: "Interior Design",
    text: "",
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
        });
      }, 3000);
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-14 sm:py-16 bg-[#F5F5F3] overflow-hidden font-sans border-t border-[#DCE8CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#7CB342] mb-2">
            Client Stories
          </span>
          <h2 className="text-4xl lg:text-5xl font-megalky font-normal text-[#2B2C2E] mb-3">
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#7CB342]/60 to-[#7CB342]" />
            <div className="w-6 h-6 rounded-full bg-[#7CB342]/20 border border-[#7CB342]/40 flex items-center justify-center text-[#7CB342]">
              <Leaf className="w-3 h-3" />
            </div>
            <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#7CB342]/60 to-[#7CB342]" />
          </div>
          <p className="text-[#58595B] text-base leading-relaxed font-sans">
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
                className="w-full max-w-2xl bg-white rounded-3xl p-8 lg:p-12 relative border border-[#DCE8CC] shadow-xl"
              >
                {/* Oversized Quote icon graphic in light tint #DCE8CC */}
                <Quote className="absolute top-6 right-8 w-20 h-20 text-[#DCE8CC] stroke-[1.5]" />

                {/* Stars */}
                <div className="flex gap-1 mb-5 relative z-10">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
                  ))}
                </div>

                <p className="text-[#2B2C2E] text-lg leading-[1.7] italic mb-8 relative z-10 font-sans">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>

                <div className="relative z-10">
                  <div className="font-megalky font-bold text-[#2B2C2E] text-lg">{testimonials[current].name}</div>
                  <div className="text-xs text-[#58595B] font-sans">{testimonials[current].role}</div>
                  <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-widest text-[#7CB342] font-sans">
                    {testimonials[current].category}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-[#7CB342] text-[#7CB342] hover:bg-[#7CB342] hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm"
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
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === current ? "w-6 h-2.5 bg-[#7CB342]" : "w-2.5 h-2.5 bg-[#7CB342]/30 hover:bg-[#7CB342]/60"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-[#7CB342] text-[#7CB342] hover:bg-[#7CB342] hover:text-white flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm"
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
                  className="px-5 py-3 bg-white rounded-2xl border border-[#DCE8CC] cursor-pointer opacity-60 hover:opacity-100 transition-all duration-300 text-center shadow-sm"
                >
                  <div className="text-xs font-megalky font-bold text-[#2B2C2E] leading-tight">{testimonials[idx].name}</div>
                  <div className="text-[10px] text-[#58595B] font-sans mt-0.5">{testimonials[idx].category}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Add Testimonial CTA Button */}
          <div className="text-center mt-12">
            <button
              onClick={() => setFormOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2B2C2E] hover:bg-[#1A1A1B] text-white font-medium rounded-full text-xs tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pt-24 sm:pt-28 pb-8 bg-black/70 backdrop-blur-md overflow-y-auto"
          >
            <div className="fixed inset-0 cursor-pointer" onClick={() => setFormOpen(false)} />
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-8 z-10 border border-gray-100 max-h-[78vh] overflow-y-auto my-auto"
            >
              <button 
                onClick={() => setFormOpen(false)} 
                className="absolute top-4 right-4 text-[#4A4A4A] hover:text-[#3A3A3A] transition-colors p-2 hover:bg-gray-100 rounded-full cursor-pointer z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#DCE8CC] flex items-center justify-center mx-auto mb-4">
                    <Star className="w-9 h-9 text-[#7CB342] fill-[#7CB342]" />
                  </div>
                  <h3 className="text-2xl font-megalky font-bold text-[#2B2C2E] mb-2">Thank You!</h3>
                  <p className="text-[#58595B] text-sm leading-relaxed">
                    Your experience has been shared successfully. Thank you for taking the time to write a review!
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 pr-6">
                    <h3 className="text-2xl font-megalky font-bold text-[#2B2C2E]">Add Your Experience</h3>
                    <p className="text-xs text-[#58595B] mt-1">We value your honest feedback and design experience.</p>
                  </div>

                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2B2C2E] uppercase tracking-wider mb-1.5 font-sans">
                        Your Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-[#DCE8CC] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#7CB342] transition-colors text-[#2B2C2E] font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2B2C2E] uppercase tracking-wider mb-1.5 font-sans">
                        Location / Role *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Homeowner, Kochi"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full border border-[#DCE8CC] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#7CB342] transition-colors placeholder:text-[#58595B]/50 text-[#2B2C2E] font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#2B2C2E] uppercase tracking-wider mb-1.5 font-sans">
                          Project Category
                        </label>
                        <select
                          value={form.category}
                          onChange={(e) => setForm({ ...form, category: e.target.value })}
                          className="w-full border border-[#DCE8CC] rounded-full px-4 py-3 text-sm focus:outline-none focus:border-[#7CB342] transition-colors text-[#2B2C2E] font-sans"
                        >
                          {categories.length > 1 ? (
                            categories.filter(c => c !== "All").map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))
                          ) : (
                            <>
                              <option>Interior Design</option>
                              <option>Landscaping</option>
                              <option>Modular Kitchen</option>
                            </>
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#2B2C2E] uppercase tracking-wider mb-1.5 font-sans">
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
                      <label className="block text-xs font-semibold text-[#2B2C2E] uppercase tracking-wider mb-1.5 font-sans">
                        Share Your Experience *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.text}
                        onChange={(e) => setForm({ ...form, text: e.target.value })}
                        className="w-full border border-[#DCE8CC] rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-[#7CB342] transition-colors text-[#2B2C2E] font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#2B2C2E] hover:bg-[#1A1A1B] text-white font-medium py-3.5 rounded-full transition-colors duration-300 text-sm tracking-wider shadow-md focus:outline-none disabled:opacity-50 cursor-pointer"
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
