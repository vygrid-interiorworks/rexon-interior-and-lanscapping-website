"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LeadCapture() {
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length >= 10) setSubmitted(true);
  };

  return (
    <>
      {/* ── Lead Capture Strip ── */}
      <section className="py-20 bg-gradient-to-br from-[#546622] via-[#2E3A1E] to-[#89B036] relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-white/5" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="flex-1 text-center lg:text-left"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#A8D65A]">
                Free Consultation
              </span>
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-white mt-3 mb-4 leading-tight">
                Ready to Transform<br />Your Space?
              </h2>
              <p className="text-white/75 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                Drop your number and our design expert will call you within 24 hours —
                completely free, zero obligation.
              </p>

              <ul className="flex flex-col sm:flex-row gap-3 mt-6 justify-center lg:justify-start">
                {["Free site visit", "No hidden charges", "Expert consultation"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5 text-xs font-semibold text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-[#A8D65A] flex-shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="flex-1 w-full max-w-md"
            >
              {submitted ? (
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#A8D65A]/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9 text-[#A8D65A]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">You&apos;re on the list!</h3>
                  <p className="text-white/70 text-sm">We&apos;ll call you back within 24 hours.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 space-y-4"
                >
                  <h3 className="text-lg font-bold text-white">Get a Callback</h3>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <input
                      required
                      type="tel"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/10 border border-white/25 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors"
                    />
                  </div>
                  <select className="w-full bg-white/10 border border-white/25 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-white/60 transition-colors">
                    <option value="" className="text-[#3A3A3A]">Select a Service</option>
                    <option className="text-[#3A3A3A]">Interior Design</option>
                    <option className="text-[#3A3A3A]">Modular Kitchen</option>
                    <option className="text-[#3A3A3A]">Landscaping & Garden</option>
                    <option className="text-[#3A3A3A]">False Ceiling</option>
                    <option className="text-[#3A3A3A]">Other</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-white text-[#546622] hover:bg-[#A8D65A] font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Request Free Callback <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sticky Mobile CTA bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden">
        <Link
          href="tel:+919999999999"
          className="flex-1 flex items-center justify-center gap-2 bg-[#3A3A3A] text-white py-4 text-sm font-bold uppercase tracking-wider"
        >
          <Phone className="w-4 h-4" /> Call Us
        </Link>
        <Link
          href="/get-quote"
          className="flex-1 flex items-center justify-center gap-2 bg-[#89B036] text-white py-4 text-sm font-bold uppercase tracking-wider"
        >
          Get Quote <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </>
  );
}
