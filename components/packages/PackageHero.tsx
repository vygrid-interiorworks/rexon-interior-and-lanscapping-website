"use client";

import { motion } from "framer-motion";
import { Sparkles, Leaf } from "lucide-react";

export default function PackageHero() {
  return (
    <section className="bg-gradient-to-b from-[#18191B] via-[#1E2023] to-[#212224] pt-[140px] pb-24 lg:pt-[170px] lg:pb-28 relative overflow-hidden border-b border-[#7CB342]/25 mb-6">
      {/* Architectural Grid Lines & Ambient Lighting Overlays */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#7CB342_1px,transparent_1px),linear-gradient(to_bottom,#7CB342_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#7CB342]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#7CB342]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Refined Display Serif Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-megalky font-normal text-white leading-[1.15] tracking-wide mb-4"
        >
          Our Tailored <span className="italic text-[#DCE8CC] font-light">Packages</span>
        </motion.h1>

        {/* Bespoke Decorative Accent Divider with Leaf Motif */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 my-5"
        >
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#7CB342]/60 to-[#7CB342]" />
          <div className="w-6 h-6 rounded-full bg-[#7CB342]/20 border border-[#7CB342]/40 flex items-center justify-center text-[#7CB342]">
            <Leaf className="w-3 h-3" />
          </div>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#7CB342]/60 to-[#7CB342]" />
        </motion.div>

        {/* Refined Subheading Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[#DCE8CC]/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans font-light"
        >
          Explore curated turnkey design solutions for your home and outdoor spaces. Every specification is meticulously tailored to your floor plan, landscape, and lifestyle.
        </motion.p>

      </div>
    </section>
  );
}
