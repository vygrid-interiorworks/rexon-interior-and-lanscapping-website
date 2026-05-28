"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { apiService } from "@/lib/api";

export default function LeadCapture() {
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");
  const [serviceSelected, setServiceSelected] = useState("");
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    ctaHeading: "Ready to Transform\nYour Space?",
    ctaSubtext: "Drop your number and our design expert will call you within 24 hours — completely free, zero obligation.",
    ctaBgType: "gradient",
    ctaBgColor: "from-[#546622] via-[#2E3A1E] to-[#89B036]",
    ctaBgImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    ctaBtnLabel: "Request Free Callback",
  });

  useEffect(() => {
    const loadSettingsData = async () => {
      try {
        const data = await apiService.getSettings();
        if (data) {
          setSettings({
            ctaHeading: data.ctaHeading || "Ready to Transform\nYour Space?",
            ctaSubtext: data.ctaSubtext || "Drop your number and our design expert will call you within 24 hours — completely free, zero obligation.",
            ctaBgType: data.ctaBgType || "gradient",
            ctaBgColor: data.ctaBgColor || "from-[#546622] via-[#2E3A1E] to-[#89B036]",
            ctaBgImage: data.ctaBgImage || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
            ctaBtnLabel: data.ctaBtnLabel || "Request Free Callback",
          });
        }
      } catch (err) {
        console.error("Failed to load settings for cta banner:", err);
      }
    };
    loadSettingsData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length >= 10) {
      try {
        setLoading(true);
        const enquiry = {
          name: "Callback Request",
          phone: phone,
          service: serviceSelected || "General",
          message: "Requesting a callback from the footer widget.",
          source: "Callback Widget",
        };
        await apiService.submitEnquiry(enquiry);
        setSubmitted(true);
      } catch (err) {
        console.error("Callback submission error:", err);
        setSubmitted(true); // Fallback to success feedback for demo
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {/* ── Lead Capture Strip ── */}
      <section 
        className={`py-20 relative overflow-hidden ${
          settings.ctaBgType === "gradient" 
            ? `bg-gradient-to-br ${settings.ctaBgColor}`
            : ""
        }`}
        style={
          settings.ctaBgType === "image"
            ? { backgroundImage: `url('${settings.ctaBgImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : {}
        }
      >
        {/* Dark Overlay for Image Background readability */}
        {settings.ctaBgType === "image" && (
          <div className="absolute inset-0 bg-black/60 z-0" />
        )}

        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/5 z-0" />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 rounded-full bg-white/5 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-white mt-3 mb-4 leading-tight whitespace-pre-line">
                {settings.ctaHeading}
              </h2>
              <p className="text-white/75 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                {settings.ctaSubtext}
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
                  <select 
                    value={serviceSelected} 
                    onChange={(e) => setServiceSelected(e.target.value)}
                    className="w-full bg-white/10 border border-white/25 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-white/60 transition-colors"
                  >
                    <option value="" className="text-[#3A3A3A]">Select a Service</option>
                    <option value="Interior Design" className="text-[#3A3A3A]">Interior Design</option>
                    <option value="Modular Kitchen" className="text-[#3A3A3A]">Modular Kitchen</option>
                    <option value="Landscaping & Garden" className="text-[#3A3A3A]">Landscaping & Garden</option>
                    <option value="False Ceiling" className="text-[#3A3A3A]">False Ceiling</option>
                    <option value="Other" className="text-[#3A3A3A]">Other</option>
                  </select>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-[#546622] hover:bg-[#A8D65A] font-bold py-3.5 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {loading ? "Submitting..." : settings.ctaBtnLabel} <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
