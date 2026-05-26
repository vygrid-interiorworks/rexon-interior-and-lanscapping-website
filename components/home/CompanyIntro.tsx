"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, ArrowRight, Leaf, Star, Shield, Clock } from "lucide-react";

const usps = [
  { icon: Star, text: "12+ years of award-winning interior and landscaping excellence" },
  { icon: Leaf, text: "100% eco-friendly materials sourced from certified suppliers" },
  { icon: Shield, text: "End-to-end project management with zero hidden costs" },
  { icon: Clock, text: "On-time delivery guaranteed across all project scales" },
  { icon: CheckCircle2, text: "Customized designs tailored to your lifestyle and budget" },
];

function LeadModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "Interior Design" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 z-10"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-[#4A4A4A] hover:text-[#3A3A3A] transition-colors">
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#89B036]/15 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9 text-[#89B036]" />
            </div>
            <h3 className="text-2xl font-playfair font-bold text-[#3A3A3A] mb-2">Thank You!</h3>
            <p className="text-[#4A4A4A] text-sm leading-relaxed">
              We&apos;ve received your request. Our team will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#89B036]">Free Consultation</span>
              <h3 className="text-2xl font-playfair font-bold text-[#3A3A3A] mt-1">Get Expert Advice</h3>
              <p className="text-sm text-[#4A4A4A] mt-1">Fill in your details and we&apos;ll call you back for free.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required type="text" placeholder="Your Full Name"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#89B036] transition-colors placeholder:text-[#AAAAAA]"
              />
              <input
                required type="tel" placeholder="Phone Number"
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#89B036] transition-colors placeholder:text-[#AAAAAA]"
              />
              <input
                type="email" placeholder="Email Address (optional)"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#89B036] transition-colors placeholder:text-[#AAAAAA]"
              />
              <select
                value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                className="w-full border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#89B036] transition-colors text-[#3A3A3A]"
              >
                <option>Interior Design</option>
                <option>Modular Kitchen</option>
                <option>Landscaping & Garden</option>
                <option>False Ceiling</option>
                <option>Wallpaper & Décor</option>
                <option>Other</option>
              </select>
              <button
                type="submit"
                className="w-full bg-[#89B036] hover:bg-[#546622] text-white font-bold py-3.5 rounded-lg transition-colors duration-300 text-sm uppercase tracking-wider"
              >
                Request Free Consultation
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function CompanyIntro() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&w=800&q=80"
                alt="Rexon Premium Interior Design"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating accent image */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                alt="Rexon Landscaping"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute top-6 left-6 bg-[#89B036] text-white rounded-xl px-5 py-3 shadow-lg">
              <div className="text-3xl font-extrabold font-playfair leading-none">12+</div>
              <div className="text-xs font-semibold tracking-widest uppercase mt-1">Years Expert</div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:pl-8"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#89B036]">Who We Are</span>
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-[#3A3A3A] mt-3 mb-6 leading-tight">
              Design That Speaks,{" "}
              <span className="text-rexon-green-gradient">Spaces That Inspire</span>
            </h2>
            <p className="text-[#4A4A4A] text-base leading-relaxed mb-6">
              Rexon Interiors and Landscaping is Kerala&apos;s premier design studio specializing in
              transforming residential and commercial spaces with unmatched craftsmanship.
              From elegant home interiors to lush garden landscapes, we bring your vision to life
              with precision, passion, and premium materials.
            </p>

            <ul className="space-y-3 mb-8">
              {usps.map((usp, i) => {
                const Icon = usp.icon;
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                  >
                    <Icon className="w-5 h-5 text-[#89B036] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#3A3A3A] leading-snug">{usp.text}</span>
                  </motion.li>
                );
              })}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-[#89B036] hover:bg-[#546622] text-white font-bold rounded-full text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Book Free Consultation
              </button>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-[#89B036] text-[#89B036] hover:bg-[#89B036] hover:text-white font-bold rounded-full text-sm uppercase tracking-wider transition-all duration-300"
              >
                Our Story <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && <LeadModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
