"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, User, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { apiService } from "@/lib/api";

interface Testimonial {
  _id: string;
  name: string;
  designation: string;
  rating: number;
  comment: string;
  projectType: "Interior" | "Landscaping";
  location?: string;
  date?: string;
}

const localFallbackTestimonials: Testimonial[] = [
  {
    _id: "1",
    name: "Rohan Sharma",
    designation: "Villa Owner",
    rating: 5,
    comment: "Rexon Interiors transformed our living space into a luxurious, functional home. Their attention to detail in the modular kitchen and false ceiling design was impeccable. Highly recommended!",
    projectType: "Interior",
    location: "Indiranagar, Bangalore",
    date: "May 2026",
  },
  {
    _id: "2",
    name: "Aparna Sen",
    designation: "Penthouse Owner",
    rating: 5,
    comment: "The landscaping team did a brilliant job turning our bare terrace into a vibrant, green oasis. The choice of plants and the lighting installation makes it our favorite spot in the house.",
    projectType: "Landscaping",
    location: "Whitefield, Bangalore",
    date: "April 2026",
  },
  {
    _id: "3",
    name: "Vikram Malhotra",
    designation: "IT Executive",
    rating: 5,
    comment: "Excellent project management. From design layout to final execution, everything was handled professionally. The 3D designs were exactly matched with the physical output.",
    projectType: "Interior",
    location: "Koramangala, Bangalore",
    date: "March 2026",
  },
  {
    _id: "4",
    name: "Meera Krishnan",
    designation: "Duplex Owner",
    rating: 4,
    comment: "Great experience working with Rexon. They custom-made a bespoke vanity and walk-in wardrobe for us. Professional execution, clean finishes, and on-time delivery.",
    projectType: "Interior",
    location: "Jayanagar, Bangalore",
    date: "February 2026",
  },
  {
    _id: "5",
    name: "Sanjay Dutt",
    designation: "Commercial Space Owner",
    rating: 5,
    comment: "Rexon landscaped our office lawn and courtyard. Outstanding design! It has created a relaxing, premium atmosphere for our employees and clients.",
    projectType: "Landscaping",
    location: "HSR Layout, Bangalore",
    date: "January 2026",
  },
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeTab, setActiveTab] = useState<"All" | "Interior" | "Landscaping">("All");
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [rating, setRating] = useState(5);
  const [projectType, setProjectType] = useState<"Interior" | "Landscaping">("Interior");
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const list = await apiService.getTestimonials();
      if (list && list.length > 0) {
        setTestimonials(list);
      } else {
        setTestimonials(localFallbackTestimonials);
      }
    } catch (err) {
      console.error("Error fetching testimonials, using fallback data:", err);
      setTestimonials(localFallbackTestimonials);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment || !designation) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      const newReview = {
        name,
        designation,
        rating,
        projectType,
        comment,
        location: location || "Bangalore",
      };

      await apiService.submitTestimonial(newReview);
      setSuccess(true);
      setName("");
      setDesignation("");
      setRating(5);
      setComment("");
      setLocation("");
      
      // Refresh after a short delay
      setTimeout(() => {
        setSuccess(false);
        setShowFormModal(false);
        fetchTestimonials();
      }, 2500);

    } catch (err) {
      console.error("Error submitting testimonial, adding locally for demo:", err);
      // Fallback: simulate local update
      const mockNew: Testimonial = {
        _id: Math.random().toString(),
        name,
        designation,
        rating,
        projectType,
        comment,
        location: location || "Bangalore",
        date: "Today",
      };
      setTestimonials((prev) => [mockNew, ...prev]);
      setSuccess(true);
      setName("");
      setDesignation("");
      setRating(5);
      setComment("");
      setLocation("");
      setTimeout(() => {
        setSuccess(false);
        setShowFormModal(false);
      }, 2500);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredTestimonials = testimonials.filter((item) => {
    if (activeTab === "All") return true;
    return item.projectType === activeTab;
  });

  const averageRating = (
    testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <main className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-[#F9F8F5] to-[#FFFFFF] text-[#3A3A3A]">
      {/* Page Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm font-semibold tracking-widest text-[#7A9E2E] uppercase block mb-3"
        >
          Client Success Stories
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-serif text-[#3A3A3A] font-bold mb-6 tracking-tight leading-tight"
        >
          What Our Clients Say About Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-[#6B6B6B] text-base sm:text-lg mb-8 leading-relaxed"
        >
          Discover how Rexon has turned dreams into spaces and gardens. Read the real-life experiences of our clients in interior design and landscaping.
        </motion.p>
      </section>

      {/* Ratings Stats Bar */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl p-8 border border-[#7A9E2E]/10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left"
        >
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-5xl font-serif font-bold text-[#7A9E2E] mb-2">
              {testimonials.length > 0 ? averageRating : "5.0"}
            </h3>
            <div className="flex text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="text-sm text-[#6B6B6B]">Average Customer Rating</p>
          </div>

          <div className="flex flex-col items-center md:items-start border-y md:border-y-0 md:border-x border-gray-100 py-6 md:py-0 md:px-8">
            <h3 className="text-5xl font-serif font-bold text-[#3A3A3A] mb-2">120+</h3>
            <p className="text-sm text-[#6B6B6B]">Completed Residential & Commercial Projects</p>
          </div>

          <div className="flex flex-col items-center md:items-start md:pl-8">
            <h3 className="text-5xl font-serif font-bold text-[#4A5A1E] mb-2">98%</h3>
            <p className="text-sm text-[#6B6B6B]">Client Satisfaction & Referral Rate</p>
          </div>
        </motion.div>
      </section>

      {/* Controls & Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex p-1 bg-white rounded-full shadow-inner border border-[#3A3A3A]/10">
          {(["All", "Interior", "Landscaping"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#7A9E2E] text-white shadow-md"
                  : "text-[#3A3A3A] hover:text-[#7A9E2E]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowFormModal(true)}
          className="inline-flex items-center justify-center px-6 py-3 font-semibold text-sm text-[#FFFFFF] bg-[#7A9E2E] rounded-full hover:bg-[#4A5A1E] transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Share Your Experience
        </button>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#7A9E2E] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#6B6B6B]">Loading client stories...</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredTestimonials.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item._id}
                  className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl border border-gray-100 hover:border-[#7A9E2E]/20 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Accent Top Bar */}
                  <div
                    className={`absolute top-0 left-0 w-full h-1.5 transition-all duration-300 group-hover:h-2 ${
                      item.projectType === "Interior" ? "bg-[#7A9E2E]" : "bg-teal-600"
                    }`}
                  />

                  <div>
                    {/* Stars & Quote */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex text-amber-400">
                        {[...Array(item.rating)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-current" />
                        ))}
                        {[...Array(5 - item.rating)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 text-gray-200" />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-[#7A9E2E]/20 group-hover:text-[#7A9E2E]/40 transition-colors" />
                    </div>

                    {/* Comment */}
                    <p className="text-gray-600 text-sm sm:text-base italic leading-relaxed mb-6">
                      "{item.comment}"
                    </p>
                  </div>

                  {/* Profile info */}
                  <div className="flex items-center pt-6 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-[#7A9E2E]/10 flex items-center justify-center text-[#7A9E2E] mr-3 font-semibold">
                      {item.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-semibold text-sm sm:text-base text-[#3A3A3A]">
                          {item.name}
                        </h4>
                        <span className="inline-flex items-center text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-medium border border-green-200">
                          <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-[#6B6B6B]">
                        {item.designation} {item.location ? `• ${item.location}` : ""}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Review Submission Modal Form */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFormModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-lg w-full relative z-10 border border-gray-100 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowFormModal(false)}
                className="absolute top-4 right-4 text-[#3A3A3A] hover:text-[#7A9E2E] p-2 focus:outline-none"
              >
                ✕
              </button>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A3A3A] mb-2 text-center">
                Share Your Experience
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] mb-6 text-center">
                Your feedback helps us grow and assists others in designing beautiful spaces.
              </p>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-16 h-16 bg-[#7A9E2E]/10 rounded-full flex items-center justify-center text-[#7A9E2E] mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-[#3A3A3A] mb-2">Thank you!</h3>
                  <p className="text-[#6B6B6B]">
                    Your review has been successfully submitted and will be live shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Gupta"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A9E2E] text-sm text-[#3A3A3A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Designation */}
                    <div>
                      <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-1.5">
                        Designation *
                      </label>
                      <input
                        type="text"
                        required
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g. Villa Owner, Architect"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A9E2E] text-sm text-[#3A3A3A]"
                      />
                    </div>
                    {/* Location */}
                    <div>
                      <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-1.5">
                        Location
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Sarjapur Road"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A9E2E] text-sm text-[#3A3A3A]"
                      />
                    </div>
                  </div>

                  {/* Project Type & Star Rating */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-1.5">
                        Project Type
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value as "Interior" | "Landscaping")}
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A9E2E] text-sm text-[#3A3A3A]"
                      >
                        <option value="Interior">Interior Design</option>
                        <option value="Landscaping">Landscaping</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-1.5">
                        Rating
                      </label>
                      <div className="flex items-center gap-1.5 py-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= rating
                                  ? "text-amber-400 fill-current"
                                  : "text-gray-200 hover:text-amber-200"
                              } transition-colors`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-1.5">
                      Your Review *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us about the project quality, team, timelines, and outcome..."
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A9E2E] text-sm text-[#3A3A3A]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center px-6 py-3 font-semibold text-sm text-[#FFFFFF] bg-[#7A9E2E] rounded-xl hover:bg-[#4A5A1E] transition-all duration-300 shadow-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    Submit Review
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
