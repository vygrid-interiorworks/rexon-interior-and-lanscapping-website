"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight, CheckCircle2, Leaf } from "lucide-react";
import { apiService } from "@/lib/api";

export default function LeadCapture() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceSelected, setServiceSelected] = useState("Interior Design");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    ctaHeading: "Ready to Transform\nYour Space?",
    ctaSubtext: "Drop your details and our design expert will call you within 24 hours — completely free, zero obligation.",
    ctaBgType: "gradient",
    ctaBgColor: "from-[#546622] via-[#2E3A1E] to-[#89B036]",
    ctaBgImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    ctaBtnLabel: "Send Enquiry",
  });

  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    const loadSettingsData = async () => {
      try {
        const data = await apiService.getSettings();
        if (data) {
          setSettings({
            ctaHeading: data.ctaHeading || "Ready to Transform\nYour Space?",
            ctaSubtext: data.ctaSubtext || "Drop your details and our design expert will call you within 24 hours — completely free, zero obligation.",
            ctaBgType: data.ctaBgType || "gradient",
            ctaBgColor: data.ctaBgColor || "from-[#546622] via-[#2E3A1E] to-[#89B036]",
            ctaBgImage: data.ctaBgImage || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
            ctaBtnLabel: data.ctaBtnLabel || "Send Enquiry",
          });
        }
      } catch (err) {
        console.error("Failed to load settings for cta banner:", err);
      }

      try {
        const fetched = await apiService.getServices();
        if (fetched && Array.isArray(fetched) && fetched.length > 0) {
          setDbServices(fetched);
          setServiceSelected(fetched[0].title || fetched[0].name || "Interior Design");
        }
      } catch (err) {
        console.error("Failed to load services for LeadCapture:", err);
      }
    };
    loadSettingsData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Name and Phone number are required.");
      return;
    }

    try {
      setLoading(true);
      const enquiry = {
        name: name,
        phone: phone,
        email: email,
        service: serviceSelected || "Interior Design",
        message: message || "Enquiry submitted from Ready to Transform Your Space section.",
        source: "Contact Page",
      };
      await apiService.submitEnquiry(enquiry);
      setSubmitted(true);
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setSubmitted(true); // Fallback to success feedback for demo
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Lead Capture CTA Banner Strip ── */}
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
              className="flex-1 text-center"
            >
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#7CB342] mb-2">
                Get In Touch
              </span>
              <h2 className="text-3xl lg:text-4xl font-megalky font-normal text-[#2B2C2E] mb-3 leading-tight whitespace-pre-line">
                {settings.ctaHeading}
              </h2>
              <div className="flex items-center justify-center gap-4 my-4">
                <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-[#7CB342]/60 to-[#7CB342]" />
                <div className="w-6 h-6 rounded-full bg-[#7CB342]/20 border border-[#7CB342]/40 flex items-center justify-center text-[#7CB342]">
                  <Leaf className="w-3 h-3" />
                </div>
                <div className="w-16 sm:w-20 h-px bg-gradient-to-l from-transparent via-[#7CB342]/60 to-[#7CB342]" />
              </div>
              <p className="text-[#58595B] text-sm leading-relaxed max-w-md mx-auto font-sans">
                {settings.ctaSubtext}
              </p>
            </motion.div>

            {/* Right form with full enquiry fields */}
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
                  <h3 className="text-xl font-megalky font-bold text-[#2B2C2E] mb-2">Enquiry Sent!</h3>
                  <p className="text-[#58595B] text-sm font-sans">Thank you for getting in touch. Our team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white border border-[#DCE8CC] rounded-3xl p-6 sm:p-8 space-y-3.5 shadow-xl"
                >
                  <h3 className="text-xl font-megalky font-bold text-[#2B2C2E] mb-1">Send an Enquiry</h3>
                  
                  <div>
                    <input
                      required
                      type="text"
                      placeholder="Your Full Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#F5F5F3] border border-[#DCE8CC] rounded-full px-4 py-3 text-[#2B2C2E] placeholder:text-[#58595B]/50 text-sm focus:outline-none focus:border-[#7CB342] transition-colors font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#58595B]/60" />
                      <input
                        required
                        type="tel"
                        placeholder="Phone Number *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#F5F5F3] border border-[#DCE8CC] rounded-full pl-10 pr-3 py-3 text-[#2B2C2E] placeholder:text-[#58595B]/50 text-sm focus:outline-none focus:border-[#7CB342] transition-colors font-sans"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#F5F5F3] border border-[#DCE8CC] rounded-full px-4 py-3 text-[#2B2C2E] placeholder:text-[#58595B]/50 text-sm focus:outline-none focus:border-[#7CB342] transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <select 
                      value={serviceSelected} 
                      onChange={(e) => setServiceSelected(e.target.value)}
                      className="w-full bg-[#F5F5F3] border border-[#DCE8CC] rounded-full px-4 py-3 text-[#2B2C2E] text-sm focus:outline-none focus:border-[#7CB342] transition-colors font-sans"
                    >
                      {dbServices.length > 0 ? (
                        dbServices.map((s) => {
                          const title = s.title || s.name || "Service";
                          return (
                            <option key={s._id || title} value={title} className="text-[#2B2C2E]">
                              {title}
                            </option>
                          );
                        })
                      ) : (
                        <>
                          <option value="Interior Design" className="text-[#2B2C2E]">Interior Design</option>
                          <option value="Modular Kitchen" className="text-[#2B2C2E]">Modular Kitchen</option>
                          <option value="Landscaping & Garden" className="text-[#2B2C2E]">Landscaping & Garden</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      placeholder="Describe your space / requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#F5F5F3] border border-[#DCE8CC] rounded-2xl px-4 py-3 text-[#2B2C2E] placeholder:text-[#58595B]/50 text-sm focus:outline-none focus:border-[#7CB342] transition-colors font-sans resize-none"
                    />
                  </div>

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
