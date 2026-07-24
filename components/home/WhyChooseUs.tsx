"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck, Clock3, Leaf, HeartHandshake,
  Gem, ArrowRight
} from "lucide-react";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Quality Guaranteed",
    desc: "Every project is backed by a comprehensive warranty and a dedicated post-handover support team.",
    chipShape: "rounded-2xl",
  },
  {
    icon: Clock3,
    title: "On-Time Delivery",
    desc: "We respect your timeline. Strict project schedules with milestone-based live tracking.",
    chipShape: "rounded-full",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious Choices",
    desc: "Sustainable materials and green energy practices embedded into every design decision.",
    chipShape: "rounded-2xl",
  },
  {
    icon: HeartHandshake,
    title: "Client-First Culture",
    desc: "Transparent communication, zero hidden costs, and designs tailored around how you live.",
    chipShape: "rounded-full",
  },
  {
    icon: Gem,
    title: "Premium Materials",
    desc: "We source exclusively from certified, high-grade global and local suppliers for lasting beauty.",
    chipShape: "rounded-2xl",
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
    <section className="py-14 sm:py-16 bg-[#F5F5F3] relative overflow-hidden font-sans border-t border-[#DCE8CC]" id="why-choose-us">
      
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
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
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

        {/* Feature Grid - 5 Uniform Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <motion.div
                key={reason.title}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group bg-white hover:bg-[#FAFBF8] rounded-[24px] p-7 border border-[#DCE8CC] hover:border-[#7CB342]/60 cursor-pointer transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.04),0_20px_40px_rgba(0,0,0,0.10)] flex flex-col justify-between relative overflow-hidden"
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

                {/* Bottom Micro-CTA Link */}
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

