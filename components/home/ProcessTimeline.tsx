"use client";

import { motion } from "framer-motion";
import { MessageSquare, Compass, Ruler, Truck, Sparkles, Leaf } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Consultation",
    desc: "We listen to your vision, lifestyle needs, and budget to understand your dream space.",
  },
  {
    icon: Compass,
    step: "02",
    title: "Concept Design",
    desc: "Our designers craft mood boards, 3D renders, and material palettes for your approval.",
  },
  {
    icon: Ruler,
    step: "03",
    title: "Planning & Quote",
    desc: "Detailed drawings, BOQ, and transparent pricing — no surprises, ever.",
  },
  {
    icon: Truck,
    step: "04",
    title: "Execution",
    desc: "Skilled craftsmen and project managers bring the design to life with precision.",
  },
  {
    icon: Sparkles,
    step: "05",
    title: "Handover",
    desc: "Final walkthrough, punch-list fixes, and a space you'll absolutely love.",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="py-14 sm:py-16 bg-[#F5F5F3] overflow-hidden font-sans border-t border-[#DCE8CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#7CB342] mb-2">
            How We Work
          </span>
          <h2 className="text-4xl lg:text-5xl font-megalky font-normal text-[#2B2C2E] mb-3">
            Our Design Process
          </h2>
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#7CB342]/60 to-[#7CB342]" />
            <div className="w-6 h-6 rounded-full bg-[#7CB342]/20 border border-[#7CB342]/40 flex items-center justify-center text-[#7CB342]">
              <Leaf className="w-3 h-3" />
            </div>
            <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#7CB342]/60 to-[#7CB342]" />
          </div>
          <p className="text-[#58595B] text-base leading-relaxed font-sans">
            A streamlined, transparent journey from first call to final handover —
            built around your comfort and confidence.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector — desktop */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px border-t-2 border-dashed border-[#7CB342]/40 mx-[10%]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="flex flex-col items-center text-center relative"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-[#7CB342] tracking-widest bg-[#F5F5F3] px-2 z-10 font-sans">
                    {step.step}
                  </div>

                  {/* Icon circle */}
                  <motion.div
                    whileHover={{ scale: 1.08, boxShadow: "0 8px 25px rgba(124,179,66,0.25)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-20 h-20 rounded-full bg-white border-2 border-[#7CB342]/30 flex items-center justify-center mb-5 relative z-10 cursor-pointer shadow-sm text-[#7CB342]"
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>

                  <h3 className="text-lg font-megalky font-bold text-[#2B2C2E] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#58595B] leading-relaxed max-w-[160px] font-sans">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
