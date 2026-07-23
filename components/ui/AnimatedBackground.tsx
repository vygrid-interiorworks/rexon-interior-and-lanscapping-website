"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top-Right Floating Glowing Aura (Rexon Green & Sage Tint) */}
      <div className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-gradient-to-br from-[#7CB342]/20 via-[#DCE8CC]/60 to-[#7CB342]/10 rounded-full filter blur-[110px] animate-float-slow opacity-80" />

      {/* Mid-Left Floating Glowing Aura (Deep Emerald & Sage) */}
      <div className="absolute top-[35%] -left-32 w-[650px] h-[650px] bg-gradient-to-tr from-[#546622]/15 via-[#7CB342]/20 to-[#DCE8CC]/55 rounded-full filter blur-[120px] animate-float-reverse opacity-75" />

      {/* Bottom-Right Floating Glowing Aura */}
      <div className="absolute -bottom-36 -right-20 w-[600px] h-[600px] bg-gradient-to-bl from-[#7CB342]/25 via-[#DCE8CC]/50 to-transparent rounded-full filter blur-[100px] animate-float-slow opacity-70" />

      {/* Center Soft Pulse Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#DCE8CC]/40 rounded-full filter blur-[90px] animate-pulse-glow" />

      {/* Architectural SVG Waves Path Moving Across Viewport */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 stroke-[#7CB342]/30"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <motion.path
          d="M-100,200 C300,50 600,350 1100,100 C1300,-20 1500,250 1600,150"
          strokeWidth="1.5"
          strokeDasharray="8 8"
          animate={{ strokeDashoffset: [0, -200] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M-50,650 C400,480 700,780 1200,520 C1400,420 1550,670 1650,570"
          strokeWidth="1"
          strokeDasharray="6 6"
          animate={{ strokeDashoffset: [0, 200] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Floating Micro Orbs drifting vertically */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/5 right-1/4 w-7 h-7 rounded-full bg-[#7CB342]/35 filter blur-[1px] shadow-sm"
      />

      <motion.div
        animate={{
          y: [0, 35, 0],
          x: [0, -25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-2/3 left-1/5 w-9 h-9 rounded-full bg-[#DCE8CC] border border-[#7CB342]/20 filter blur-[1px] shadow-sm"
      />

      <motion.div
        animate={{
          y: [0, -40, 0],
          scale: [0.8, 1.25, 0.8],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 left-8 w-5 h-5 rounded-full bg-[#7CB342]/45 filter blur-[1px]"
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, 15, 0],
          scale: [0.9, 1.15, 0.9],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-1/4 right-10 w-6 h-6 rounded-full bg-[#DCE8CC] filter blur-[1px]"
      />
    </div>
  );
}
