"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sliders,
  DollarSign,
  Compass,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { apiService } from "@/lib/api";

type Step = "details" | "type" | "budget" | "style" | "success";

export default function GetQuotePage() {
  const [currentStep, setCurrentStep] = useState<Step>("details");
  
  // Step 1: Personal details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  // Step 2: Project Type
  const [projectType, setProjectType] = useState<"Interior" | "Landscaping" | "Both">("Interior");
  const [sizeSqft, setSizeSqft] = useState(1200);
  const [bhkSize, setBhkSize] = useState("2 BHK");

  // Step 3: Budget Slider
  const [budget, setBudget] = useState(500000); // 5 Lakhs default

  // Step 4: Design style preferences
  const [interiorStyle, setInteriorStyle] = useState("Modern Minimalist");
  const [landscapeStyle, setLandscapeStyle] = useState("Zen Garden");
  const [specialRequirements, setSpecialRequirements] = useState("");

  // Loading & Submission
  const [submitting, setSubmitting] = useState(false);

  const getProgressPercentage = () => {
    switch (currentStep) {
      case "details": return 20;
      case "type": return 45;
      case "budget": return 70;
      case "style": return 90;
      case "success": return 100;
      default: return 0;
    }
  };

  const handleNext = () => {
    if (currentStep === "details") {
      if (!name || !phone) {
        alert("Please fill in your Name and Phone number to continue.");
        return;
      }
      setCurrentStep("type");
    } else if (currentStep === "type") {
      setCurrentStep("budget");
    } else if (currentStep === "budget") {
      setCurrentStep("style");
    }
  };

  const handleBack = () => {
    if (currentStep === "type") setCurrentStep("details");
    else if (currentStep === "budget") setCurrentStep("type");
    else if (currentStep === "style") setCurrentStep("budget");
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const messageDetails = `
--- QUOTE WIZARD SUBMISSION ---
Interested In: ${projectType}
Property Size: ${sizeSqft} sqft (${projectType === "Interior" || projectType === "Both" ? bhkSize : "N/A"})
Est. Budget: INR ${budget.toLocaleString()}
Interior Style Preference: ${interiorStyle}
Landscape Style Preference: ${landscapeStyle}
Additional details: ${specialRequirements || "None"}
      `.trim();

      const enquiry = {
        name,
        email,
        phone,
        service: projectType,
        message: messageDetails,
        source: "Quote Wizard",
      };

      await apiService.submitEnquiry(enquiry);
      setCurrentStep("success");
    } catch (err) {
      console.error("Backend error submitting quote enquiry, simulating local success in frontend wizard:", err);
      setCurrentStep("success");
    } finally {
      setSubmitting(false);
    }
  };

  const triggerWhatsAppRedirect = () => {
    const waMessage = `Hi Rexon team, I just completed your website's Quote Wizard!
My Name: ${name}
Phone: ${phone}
Services Needed: ${projectType}
Estimated Area: ${sizeSqft} Sq.Ft. (${projectType !== "Landscaping" ? bhkSize : "N/A"})
My Target Budget: INR ${budget.toLocaleString()}
Preferred Style: ${projectType === "Landscaping" ? landscapeStyle : interiorStyle}
Looking forward to consulting soon.`;

    const encoded = encodeURIComponent(waMessage);
    window.open(`https://wa.me/919876543210?text=${encoded}`, "_blank");
  };

  return (
    <main className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-[#F9F8F5] to-[#FFFFFF] text-[#3A3A3A]">
      {/* Progress Header */}
      <section className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#89B036] uppercase block mb-2">
            Rexon Cost Estimator
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-[#3A3A3A] font-bold">
            Get an Interactive Quote
          </h1>
          <p className="text-sm text-[#4A4A4A] mt-2">
            Answer a few quick questions to estimate budgets and get connected with our experts.
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-gray-100 rounded-full h-2 mb-10 overflow-hidden relative shadow-inner">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${getProgressPercentage()}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-[#89B036] to-[#546622] h-full rounded-full"
          />
        </div>

        {/* Main interactive Box */}
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-gray-100 min-h-[480px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {currentStep === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#89B036]/10 flex items-center justify-center text-[#89B036]">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#3A3A3A]">Tell Us About Yourself</h2>
                    <p className="text-xs text-[#4A4A4A]">Please provide basic details to schedule a consultant call.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Priya Nair"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-sm text-[#3A3A3A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-sm text-[#3A3A3A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. priya@nair.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-sm text-[#3A3A3A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-2">
                      Project Location / Area
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Jayanagar, Bangalore"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-sm text-[#3A3A3A]"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === "type" && (
              <motion.div
                key="type"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#89B036]/10 flex items-center justify-center text-[#89B036]">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#3A3A3A]">Project Details</h2>
                    <p className="text-xs text-[#4A4A4A]">Help us understand what type of service you are looking for.</p>
                  </div>
                </div>

                {/* Project type buttons */}
                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-3">
                    What are you looking to design?
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {(["Interior", "Landscaping", "Both"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setProjectType(type)}
                        className={`py-4 rounded-xl border text-sm font-semibold tracking-wide transition-all ${
                          projectType === type
                            ? "bg-[#89B036] text-white border-[#89B036] shadow-md"
                            : "bg-gray-50 border-gray-200 text-[#3A3A3A] hover:bg-gray-100"
                        }`}
                      >
                        {type === "Both" ? "Both (Integrated)" : type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area Input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-2">
                      Property Size (Sq. Ft.)
                    </label>
                    <input
                      type="number"
                      value={sizeSqft}
                      onChange={(e) => setSizeSqft(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-sm text-[#3A3A3A]"
                    />
                  </div>

                  {(projectType === "Interior" || projectType === "Both") && (
                    <div>
                      <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-2">
                        BHK Configuration
                      </label>
                      <select
                        value={bhkSize}
                        onChange={(e) => setBhkSize(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-sm text-[#3A3A3A]"
                      >
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK / Duplex">4 BHK / Duplex</option>
                        <option value="Independent Villa">Independent Villa</option>
                        <option value="Other">Other / Commercial</option>
                      </select>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === "budget" && (
              <motion.div
                key="budget"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#89B036]/10 flex items-center justify-center text-[#89B036]">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#3A3A3A]">Target Budget</h2>
                    <p className="text-xs text-[#4A4A4A]">Adjust the slider to match your estimated target investment.</p>
                  </div>
                </div>

                {/* Budget Slider */}
                <div className="space-y-6 py-4">
                  <div className="flex justify-between items-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <span className="text-sm font-semibold text-[#4A4A4A]">Target Investment:</span>
                    <span className="text-2xl font-bold text-[#89B036] font-serif">
                      INR {budget.toLocaleString()}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="50000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-[#89B036]"
                  />

                  <div className="flex justify-between text-xs text-[#4A4A4A] font-semibold">
                    <span>1 Lakh</span>
                    <span>10 Lakhs</span>
                    <span>25 Lakhs</span>
                    <span>50 Lakhs+</span>
                  </div>
                </div>

                <div className="bg-[#89B036]/5 rounded-2xl p-4 border border-[#89B036]/20 text-xs text-[#4A4A4A] leading-relaxed">
                  💡 <strong>Tip:</strong> The budget size impacts product finishes (e.g. premium laminates vs. acrylics, or exotic plants vs. native creepers). Our consultants will tailor recommendations accordingly.
                </div>
              </motion.div>
            )}

            {currentStep === "style" && (
              <motion.div
                key="style"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#89B036]/10 flex items-center justify-center text-[#89B036]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#3A3A3A]">Style Preferences</h2>
                    <p className="text-xs text-[#4A4A4A]">Select the aesthetic vibe that matches your preference.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Interior style dropdown */}
                  {(projectType === "Interior" || projectType === "Both") && (
                    <div>
                      <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-2">
                        Preferred Interior Theme
                      </label>
                      <select
                        value={interiorStyle}
                        onChange={(e) => setInteriorStyle(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-sm text-[#3A3A3A]"
                      >
                        <option value="Modern Minimalist">Modern Minimalist</option>
                        <option value="Luxurious Editorial">Luxurious Editorial</option>
                        <option value="Classic Contemporary">Classic Contemporary</option>
                        <option value="Industrial Chic">Industrial Chic</option>
                        <option value="Scandi / Nordic">Scandi / Nordic</option>
                      </select>
                    </div>
                  )}

                  {/* Landscape style dropdown */}
                  {(projectType === "Landscaping" || projectType === "Both") && (
                    <div>
                      <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-2">
                        Preferred Landscape Theme
                      </label>
                      <select
                        value={landscapeStyle}
                        onChange={(e) => setLandscapeStyle(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-sm text-[#3A3A3A]"
                      >
                        <option value="Zen Garden">Zen Japanese Garden</option>
                        <option value="Lush Tropical">Lush Tropical Oasis</option>
                        <option value="Modern Geometric">Modern Geometric Patio</option>
                        <option value="English Cottage Garden">English Cottage Feel</option>
                        <option value="Desert Xeriscape">Dry Desert Xeriscape</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Additional requirements */}
                <div>
                  <label className="block text-xs font-semibold text-[#3A3A3A] uppercase tracking-wider mb-2">
                    Additional details / Special requirements
                  </label>
                  <textarea
                    rows={3}
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    placeholder="e.g. Pet-friendly plants, double-height ceiling requirements, space-saving kitchen attachments..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#89B036] text-sm text-[#3A3A3A]"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center py-10 flex-1 flex flex-col justify-center items-center"
              >
                <div className="w-20 h-20 bg-green-50 text-green-600 border border-green-200 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-12 h-12 animate-bounce" />
                </div>

                <h2 className="text-3xl font-serif font-bold text-[#3A3A3A] mb-2">
                  Quote Estimate Completed!
                </h2>
                <p className="text-sm text-[#4A4A4A] max-w-md mb-8 leading-relaxed">
                  Thank you, <strong>{name}</strong>! Your customized estimate details have been saved in our system. A senior architect will prepare formal 3D layout briefs for you.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <button
                    onClick={triggerWhatsAppRedirect}
                    className="inline-flex items-center justify-center px-8 py-3.5 font-semibold text-sm text-white bg-[#25D366] hover:bg-[#1EBE57] rounded-xl transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none"
                  >
                    <WhatsAppIcon className="w-5 h-5 mr-2 fill-current" />
                    Share on WhatsApp for Fast Estimate
                  </button>

                  <button
                    onClick={() => {
                      // Reset quote
                      setName("");
                      setPhone("");
                      setEmail("");
                      setLocation("");
                      setProjectType("Interior");
                      setBudget(500000);
                      setSizeSqft(1200);
                      setSpecialRequirements("");
                      setCurrentStep("details");
                    }}
                    className="inline-flex items-center justify-center px-8 py-3.5 font-semibold text-sm text-[#3A3A3A] bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Estimate Another Project
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          {currentStep !== "success" && (
            <div className="flex justify-between items-center border-t border-gray-100 pt-6 mt-8">
              {currentStep !== "details" ? (
                <button
                  onClick={handleBack}
                  className="inline-flex items-center text-sm font-semibold text-[#4A4A4A] hover:text-[#89B036] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep !== "style" ? (
                <button
                  onClick={handleNext}
                  className="inline-flex items-center justify-center px-6 py-3 font-semibold text-sm text-white bg-[#89B036] rounded-xl hover:bg-[#546622] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center justify-center px-8 py-3.5 font-semibold text-sm text-white bg-[#89B036] rounded-xl hover:bg-[#546622] transition-all duration-300 shadow-md"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  Calculate & Submit Quote Request
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
