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
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 z-10 font-sans border border-[#DCE8CC]"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25 }}
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-[#58595B] hover:text-[#2B2C2E] transition-colors">
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#DCE8CC] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9 text-[#7CB342]" />
            </div>
            <h3 className="text-2xl font-megalky font-bold text-[#2B2C2E] mb-2">Thank You!</h3>
            <p className="text-[#58595B] text-sm leading-relaxed">
              We&apos;ve received your request. Our team will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7CB342]">Free Consultation</span>
              <h3 className="text-2xl font-megalky font-bold text-[#2B2C2E] mt-1">Get Expert Advice</h3>
              <p className="text-sm text-[#58595B] mt-1">Fill in your details and we&apos;ll call you back for free.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required type="text" placeholder="Your Full Name"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border border-[#DCE8CC] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#7CB342] transition-colors placeholder:text-[#58595B]/60 text-[#2B2C2E]"
              />
              <input
                required type="tel" placeholder="Phone Number"
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-[#DCE8CC] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#7CB342] transition-colors placeholder:text-[#58595B]/60 text-[#2B2C2E]"
              />
              <input
                type="email" placeholder="Email Address (optional)"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border border-[#DCE8CC] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#7CB342] transition-colors placeholder:text-[#58595B]/60 text-[#2B2C2E]"
              />
              <select
                value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                className="w-full border border-[#DCE8CC] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#7CB342] transition-colors text-[#2B2C2E]"
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
                className="w-full bg-[#2B2C2E] hover:bg-[#1A1A1B] text-white font-medium py-3.5 rounded-full transition-colors duration-300 text-sm tracking-wider"
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
    <section className="py-24 bg-[#F5F5F3] relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Dual Overlapping Images + Accent Blob */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Organic sage blob shape behind */}
            <div className="absolute -top-6 -left-6 w-full h-full bg-[#DCE8CC] rounded-[40px] transform -rotate-2 -z-10" />

            <div className="relative rounded-[28px] overflow-hidden shadow-xl aspect-[4/3] border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80"
                alt="Rexon Premium Interior Design"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute top-6 left-6 bg-[#7CB342] text-white rounded-2xl px-5 py-3 shadow-lg">
              <div className="text-3xl font-bold font-serif leading-none">12+</div>
              <div className="text-[11px] font-medium tracking-wider uppercase mt-1">Years Expert</div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:pl-4"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7CB342]">Who We Are</span>
            <h2 className="text-4xl lg:text-5xl font-megalky font-normal text-[#2B2C2E] mt-3 mb-6 leading-[1.18]">
              Design That Speaks,{" "}
              <span className="text-rexon-green-gradient italic">Spaces That Inspire</span>
            </h2>
            <p className="text-[#58595B] text-base leading-relaxed mb-6 font-sans">
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
                    <Icon className="w-5 h-5 text-[#7CB342] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#58595B] leading-snug font-sans">{usp.text}</span>
                  </motion.li>
                );
              })}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#2B2C2E] hover:bg-[#1A1A1B] text-white font-medium rounded-full text-sm tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                Book Free Consultation
              </button>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-[#7CB342] text-[#7CB342] hover:bg-[#7CB342] hover:text-white font-medium rounded-full text-sm tracking-wider transition-all duration-300"
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
