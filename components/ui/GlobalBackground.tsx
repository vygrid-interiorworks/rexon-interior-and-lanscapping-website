"use client";

import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function GlobalBackground() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Scroll parallax offset (0.5x relative scroll speed)
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  // 12 Ambient floating particles distributed down the document height
  const particles = [
    { top: "8%", left: "12%", size: "w-3 h-3", color: "bg-[#7CB342]", duration: 8, delay: 0 },
    { top: "15%", left: "82%", size: "w-3.5 h-3.5", color: "bg-[#7CB342]", duration: 11, delay: 1 },
    { top: "25%", left: "22%", size: "w-2.5 h-2.5", color: "bg-[#546622]", duration: 9, delay: 2 },
    { top: "33%", left: "88%", size: "w-3 h-3", color: "bg-[#7CB342]", duration: 12, delay: 0.5 },
    { top: "42%", left: "15%", size: "w-3.5 h-3.5", color: "bg-[#DCE8CC]", duration: 10, delay: 1.5 },
    { top: "50%", left: "78%", size: "w-2 h-2", color: "bg-[#7CB342]", duration: 13, delay: 2.2 },
    { top: "58%", left: "25%", size: "w-3 h-3", color: "bg-[#546622]", duration: 9.5, delay: 0.8 },
    { top: "66%", left: "85%", size: "w-3.5 h-3.5", color: "bg-[#7CB342]", duration: 11.5, delay: 1.2 },
    { top: "75%", left: "10%", size: "w-2.5 h-2.5", color: "bg-[#7CB342]", duration: 8.5, delay: 2 },
    { top: "83%", left: "75%", size: "w-3 h-3", color: "bg-[#DCE8CC]", duration: 10.5, delay: 0.3 },
    { top: "90%", left: "20%", size: "w-3.5 h-3.5", color: "bg-[#7CB342]", duration: 12.5, delay: 1.8 },
    { top: "96%", left: "80%", size: "w-2 h-2", color: "bg-[#546622]", duration: 9, delay: 2.5 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Scroll-Linked Parallax Layer */}
      <motion.div
        style={shouldReduceMotion ? {} : { y: yParallax }}
        className="absolute inset-0 w-full h-[125%] pointer-events-none"
      >
        {/* Layer 1: Section-Aware Blurred Radial Gradient Blobs */}
        
        {/* Blob 1: Hero -> About Transition (Top Right) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 50, -30, 0],
                  y: [0, -40, 30, 0],
                  scale: [1, 1.1, 0.95, 1],
                }
          }
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] -right-24 w-[700px] h-[700px] bg-gradient-to-br from-[#7CB342]/12 via-[#DCE8CC]/40 to-transparent rounded-full filter blur-[110px] opacity-80"
        />

        {/* Blob 2: About -> Services Transition (Mid Left) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -40, 35, 0],
                  y: [0, 35, -25, 0],
                  scale: [1, 0.92, 1.08, 1],
                }
          }
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[28%] -left-28 w-[650px] h-[650px] bg-gradient-to-tr from-[#546622]/10 via-[#7CB342]/15 to-[#DCE8CC]/35 rounded-full filter blur-[120px] opacity-85"
        />

        {/* Blob 3: Services -> Packages Transition (Mid Right) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 45, -35, 0],
                  y: [0, -35, 40, 0],
                  scale: [1, 1.12, 0.94, 1],
                }
          }
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-[55%] -right-20 w-[680px] h-[680px] bg-gradient-to-bl from-[#7CB342]/14 via-[#DCE8CC]/45 to-transparent rounded-full filter blur-[115px] opacity-80"
        />

        {/* Blob 4: Projects -> Contact Transition (Bottom Left) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -35, 45, 0],
                  y: [0, 40, -30, 0],
                  scale: [1, 0.95, 1.1, 1],
                }
          }
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[80%] -left-20 w-[620px] h-[620px] bg-gradient-to-tr from-[#546622]/12 via-[#7CB342]/15 to-[#DCE8CC]/40 rounded-full filter blur-[110px] opacity-80"
        />

        {/* Layer 2: Continuous Dashed Path Network (Seamless Winding SVG Path) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 stroke-[#7CB342]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 2400"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Main Continuous Winding Vine Path */}
          <motion.path
            d="M-80,180 C320,50 620,380 1120,120 C1320,-20 1480,450 1250,750 C1000,1050 300,900 150,1250 C-20,1600 450,1850 1050,1700 C1350,1600 1480,2050 1550,2300"
            strokeWidth="1.75"
            strokeDasharray="14 14"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, -400] }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Secondary Interweaving Path */}
          <motion.path
            d="M1520,350 C1100,500 400,300 200,650 C0,1000 800,1200 1200,1450 C1600,1700 800,2100 -50,2250"
            strokeWidth="1.25"
            strokeDasharray="10 10"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, 360] }}
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>

        {/* Layer 3: Ambient Floating Particles (Dots/Leaves) across viewport */}
        {particles.map((p, index) => (
          <motion.div
            key={index}
            style={{ top: p.top, left: p.left }}
            initial={{ opacity: 0.15 }}
            whileInView={{ opacity: [0.15, 0.4, 0.2] }}
            viewport={{ once: false, margin: "-50px" }}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -18, 0, 15, 0],
                    x: [0, (index % 2 === 0 ? 8 : -8), 0],
                  }
            }
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
            className={`absolute ${p.size} rounded-full ${p.color} filter blur-[0.5px]`}
          />
        ))}
      </motion.div>
    </div>
  );
}
