"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BadgeCheck, Clock3, Leaf, HeartHandshake,
  Headphones, Gem, MapPin, BarChart3, ArrowRight, TrendingUp
} from "lucide-react";

// Count-Up Animated Number Component
function AnimatedStatNumber({ valueStr }: { valueStr: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayVal, setDisplayVal] = useState("0");

  const match = valueStr.match(/^([\d,]+)(.*)$/);
  const numericVal = match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    if (!isInView || isNaN(numericVal) || numericVal === 0) {
      if (!isInView) setDisplayVal("0" + suffix);
      else setDisplayVal(valueStr);
      return;
    }

    let animationFrameId: number;
    const duration = 1600;
    const startTime = performance.now();

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * numericVal);

      setDisplayVal(current.toLocaleString() + suffix);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setDisplayVal(numericVal.toLocaleString() + suffix);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, numericVal, valueStr, suffix]);

  return (
    <span ref={ref} className="font-megalky font-normal text-4xl sm:text-5xl text-[#7CB342] leading-none inline-flex items-baseline gap-1">
      {displayVal}
    </span>
  );
}

const reasons = [
  {
    icon: BadgeCheck,
    title: "Quality Guaranteed",
    desc: "Every project is backed by a comprehensive warranty and a dedicated post-handover support team.",
    isStat: false,
    chipShape: "rounded-2xl",
    colSpan: "lg:col-span-1",
  },
  {
    icon: BarChart3,
    title: "Proven Track Record",
    desc: "Delivering architectural and interior excellence across Kerala with zero compromise on quality.",
    isStat: true,
    badgeText: "Proof of Quality",
    stats: [
      { label: "Satisfied Clients", value: "1,200+" },
      { label: "Projects Completed", value: "850+" },
    ],
    chipShape: "rounded-full",
    colSpan: "lg:col-span-2",
  },
  {
    icon: Clock3,
    title: "On-Time Delivery",
    desc: "We respect your timeline. Strict project schedules with milestone-based live tracking.",
    isStat: false,
    chipShape: "rounded-2xl",
    colSpan: "lg:col-span-1",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious Choices",
    desc: "Sustainable materials and green energy practices embedded into every design decision.",
    isStat: false,
    chipShape: "rounded-full",
    colSpan: "lg:col-span-1",
  },
  {
    icon: MapPin,
    title: "Kerala-Based Experts",
    desc: "Deep local knowledge of monsoon climate, native flora, and contemporary architecture.",
    isStat: true,
    badgeText: "Local Mastery",
    stats: [
      { label: "Districts Covered", value: "14 / 14" },
      { label: "Master Craftsmen", value: "150+" },
    ],
    chipShape: "rounded-2xl",
    colSpan: "lg:col-span-2",
  },
  {
    icon: HeartHandshake,
    title: "Client-First Culture",
    desc: "Transparent communication, zero hidden costs, and designs tailored around how you live.",
    isStat: false,
    chipShape: "rounded-full",
    colSpan: "lg:col-span-1",
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Support",
    desc: "Dedicated project managers available round the clock for smooth project updates.",
    isStat: false,
    chipShape: "rounded-2xl",
    colSpan: "lg:col-span-1",
  },
  {
    icon: Gem,
    title: "Premium Materials",
    desc: "We source exclusively from certified, high-grade global and local suppliers for lasting beauty.",
    isStat: false,
    chipShape: "rounded-full",
    colSpan: "lg:col-span-1",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#F5F5F3] relative overflow-hidden font-sans border-t border-[#DCE8CC]" id="why-choose-us">
      
      {/* Background Decorative SVG Vine & Soft Gradient Blobs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#DCE8CC]/35 filter blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full bg-[#7CB342]/10 filter blur-3xl -z-0 pointer-events-none" />
      
      <svg
        className="absolute inset-0 w-full h-full stroke-[#7CB342]/15 pointer-events-none fill-none -z-0 opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M -100 150 C 300 50, 700 350, 1300 200 C 1700 100, 2000 400, 2400 300"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7CB342]">
            Why Rexon
          </span>
          <h2 className="text-4xl lg:text-5xl font-megalky font-normal text-[#2B2C2E] mt-3 mb-5">
            Why Clients Choose Us
          </h2>
          <p className="text-[#58595B] text-base leading-relaxed font-sans">
            More than a design firm — we&apos;re your trusted partner in building spaces that
            stand the test of time.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;

            if (reason.isStat && reason.stats) {
              // Featured Stat Card Treatment
              return (
                <motion.div
                  key={reason.title}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className={`group ${reason.colSpan} bg-gradient-to-br from-white via-[#FAFBF8] to-[#DCE8CC]/30 rounded-[24px] p-7 sm:p-8 border border-[#7CB342]/40 hover:border-[#7CB342] cursor-default transition-all duration-300 shadow-[0_6px_24px_rgba(124,179,66,0.12),0_12px_32px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(124,179,66,0.20),0_4px_12px_rgba(0,0,0,0.06)] relative overflow-hidden flex flex-col justify-between`}
                >
                  {/* Subtle Background Pattern & Accent Emblem */}
                  <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#7CB342_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#7CB342]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#7CB342]/20 transition-colors duration-500" />

                  <div className="relative z-10">
                    {/* Header Row: Icon + Badge (Strictly rendered ONLY for stat cards) */}
                    <div className="flex items-center justify-between mb-6">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`w-14 h-14 ${reason.chipShape} bg-gradient-to-br from-[#DCE8CC] via-white to-[#DCE8CC]/60 border border-[#7CB342]/40 text-[#7CB342] shadow-[0_4px_14px_rgba(124,179,66,0.22)] flex items-center justify-center group-hover:shadow-[0_0_22px_rgba(124,179,66,0.38)] transition-all duration-300`}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.div>

                      {reason.badgeText && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#7CB342] bg-[#DCE8CC]/80 px-3 py-1 rounded-full border border-[#7CB342]/30 shadow-sm font-sans">
                          {reason.badgeText}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-megalky font-normal text-[#2B2C2E] mb-2 group-hover:text-[#7CB342] transition-colors duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#58595B] leading-relaxed font-sans mb-8">
                      {reason.desc}
                    </p>
                  </div>

                  {/* Prominent Stat Numbers Block with Count-Up Animation */}
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#DCE8CC]/60 relative z-10">
                    {reason.stats.map((st, idx) => (
                      <div key={idx} className="flex flex-col">
                        <div className="flex items-baseline gap-1 mb-1">
                          <AnimatedStatNumber valueStr={st.value} />
                          <TrendingUp className="w-4 h-4 text-[#7CB342] opacity-80" />
                        </div>
                        <span className="text-[11px] font-semibold text-[#58595B] uppercase tracking-wider font-sans">
                          {st.label}
                        </span>
                        <div className="w-8 h-0.5 bg-[#7CB342]/40 rounded-full mt-1.5" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            }

            // Standard Feature Card Treatment
            return (
              <motion.div
                key={reason.title}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`group ${reason.colSpan} bg-white hover:bg-[#FAFBF8] rounded-[24px] p-7 border border-[#DCE8CC] hover:border-[#7CB342]/60 cursor-pointer transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04),0_20px_40px_rgba(0,0,0,0.10)] flex flex-col justify-between relative overflow-hidden`}
              >
                <div>
                  {/* Icon Chip */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`w-14 h-14 ${reason.chipShape} bg-gradient-to-br from-[#DCE8CC] via-white to-[#DCE8CC]/50 border border-[#7CB342]/35 text-[#7CB342] shadow-[0_4px_12px_rgba(124,179,66,0.16)] flex items-center justify-center mb-6 group-hover:border-[#7CB342]/70 group-hover:shadow-[0_0_20px_rgba(124,179,66,0.30)] transition-all duration-300`}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>

                  <h3 className="text-xl font-megalky font-normal text-[#2B2C2E] mb-2.5 leading-snug group-hover:text-[#7CB342] transition-colors duration-300">
                    {reason.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#58595B] leading-[1.65] font-sans">
                    {reason.desc}
                  </p>
                </div>

                {/* Bottom Micro-CTA Link (Anchors empty space) */}
                <div className="pt-4 mt-6 border-t border-[#DCE8CC]/50 flex items-center justify-between text-xs font-semibold text-[#7CB342] font-sans">
                  <span className="group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1.5">
                    Learn More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
