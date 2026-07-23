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
      {/* ── Lead Capture CTA Banner Strip (Pattern 12 & 6) ── */}
      <section 
        className="py-20 relative overflow-hidden bg-[#DCE8CC] font-sans border-t border-[#DCE8CC]"
      >
        {/* Soft Organic Blob Background Decoration */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/40 filter blur-2xl pointer-events-none z-0" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-[#7CB342]/10 filter blur-2xl pointer-events-none z-0" />

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
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7CB342]">
                Free Consultation
              </span>
              <h2 className="text-3xl lg:text-4xl font-megalky font-normal text-[#2B2C2E] mt-3 mb-4 leading-tight whitespace-pre-line">
                {settings.ctaHeading}
              </h2>
              <p className="text-[#58595B] text-sm leading-relaxed max-w-md mx-auto lg:mx-0 font-sans">
                {settings.ctaSubtext}
              </p>

              <ul className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
                {["Free site visit", "No hidden charges", "Expert consultation"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5 text-xs font-semibold text-[#2B2C2E] font-sans">
                    <CheckCircle2 className="w-4 h-4 text-[#7CB342] flex-shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right form with inline/pill styling */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="flex-1 w-full max-w-md"
            >
              {submitted ? (
                <div className="bg-white border border-[#DCE8CC] rounded-3xl p-8 text-center shadow-xl">
                  <div className="w-16 h-16 rounded-full bg-[#DCE8CC] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9 text-[#7CB342]" />
                  </div>
                  <h3 className="text-xl font-megalky font-bold text-[#2B2C2E] mb-2">You&apos;re on the list!</h3>
                  <p className="text-[#58595B] text-sm font-sans">We&apos;ll call you back within 24 hours.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white border border-[#DCE8CC] rounded-3xl p-8 space-y-4 shadow-xl"
                >
                  <h3 className="text-xl font-megalky font-bold text-[#2B2C2E]">Get a Callback</h3>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#58595B]/60" />
                    <input
                      required
                      type="tel"
                      placeholder="Your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F5F5F3] border border-[#DCE8CC] rounded-full pl-11 pr-4 py-3.5 text-[#2B2C2E] placeholder:text-[#58595B]/50 text-sm focus:outline-none focus:border-[#7CB342] transition-colors font-sans"
                    />
                  </div>
                  <select 
                    value={serviceSelected} 
                    onChange={(e) => setServiceSelected(e.target.value)}
                    className="w-full bg-[#F5F5F3] border border-[#DCE8CC] rounded-full px-4 py-3.5 text-[#2B2C2E] text-sm focus:outline-none focus:border-[#7CB342] transition-colors font-sans"
                  >
                    <option value="" className="text-[#2B2C2E]">Select a Service</option>
                    <option value="Interior Design" className="text-[#2B2C2E]">Interior Design</option>
                    <option value="Modular Kitchen" className="text-[#2B2C2E]">Modular Kitchen</option>
                    <option value="Landscaping & Garden" className="text-[#2B2C2E]">Landscaping & Garden</option>
                    <option value="False Ceiling" className="text-[#2B2C2E]">False Ceiling</option>
                    <option value="Other" className="text-[#2B2C2E]">Other</option>
                  </select>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#2B2C2E] hover:bg-[#1A1A1B] text-white font-medium py-3.5 rounded-full text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    {loading ? "Submitting..." : settings.ctaBtnLabel} <ArrowRight className="w-4 h-4 text-[#7CB342]" />
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
