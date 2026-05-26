"use client";

import { motion } from "framer-motion";
import { MessageSquare, Compass, Ruler, Truck, Sparkles } from "lucide-react";

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
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#89B036]">
            How We Work
          </span>
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-[#3A3A3A] mt-3 mb-5">
            Our Design Process
          </h2>
          <p className="text-[#4A4A4A] text-base leading-relaxed">
            A streamlined, transparent journey from first call to final handover —
            built around your comfort and confidence.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Dashed connector — desktop */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px border-t-2 border-dashed border-[#89B036]/35 mx-[10%]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="flex flex-col items-center text-center relative"
                >
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-extrabold text-[#89B036] tracking-widest bg-white px-2 z-10">
                    {step.step}
                  </div>

                  {/* Icon circle */}
                  <motion.div
                    whileHover={{ scale: 1.12, boxShadow: "0 8px 30px rgba(122,158,46,0.25)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-20 h-20 rounded-full bg-[#F9F8F5] border-2 border-[#89B036]/30 flex items-center justify-center mb-5 relative z-10 cursor-pointer"
                  >
                    <Icon className="w-9 h-9 text-[#89B036]" />
                  </motion.div>

                  <h3 className="text-base font-bold text-[#3A3A3A] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#4A4A4A] leading-relaxed max-w-[160px]">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
