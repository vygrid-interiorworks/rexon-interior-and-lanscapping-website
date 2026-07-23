"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function HeroBackground({ children }: { children?: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  // Mouse Parallax Motion Values (smooth spring)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const parallaxX = useSpring(rawMouseX, { stiffness: 40, damping: 25 });
  const parallaxY = useSpring(rawMouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024 && !window.matchMedia("(pointer: coarse)").matches);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalized mouse offset (-1 to 1), clamped to max 6px shift
    const offsetX = ((e.clientX - centerX) / (rect.width / 2)) * 6;
    const offsetY = ((e.clientY - centerY) / (rect.height / 2)) * 6;

    rawMouseX.set(-offsetX);
    rawMouseY.set(-offsetY);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[85vh] lg:min-h-[90vh] w-full overflow-hidden bg-[#F5F5F3] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center"
    >
      {/* ── BACKGROUND ANIMATION LAYERS ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* Layer 1: Soft Ambient Gradient Blobs (Figure-8 Drift) */}
        <motion.div
          style={{ x: parallaxX, y: parallaxY }}
          className="absolute inset-0 pointer-events-none"
        >
          {/* Blob A: Top-Right behind Hero Image */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: [0, 45, 0, -35, 0],
                    y: [0, -25, 35, 10, 0],
                    scale: [1, 1.08, 0.95, 1.04, 1],
                  }
            }
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-20 -right-20 w-[650px] h-[650px] bg-gradient-to-br from-[#7CB342]/12 via-[#DCE8CC]/40 to-transparent rounded-full filter blur-[100px] opacity-90"
          />

          {/* Blob B: Bottom-Left behind Headline */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    x: [0, -35, 25, -15, 0],
                    y: [0, 35, -25, 15, 0],
                    scale: [1, 0.94, 1.08, 0.98, 1],
                  }
            }
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute -bottom-24 -left-24 w-[580px] h-[580px] bg-gradient-to-tr from-[#546622]/10 via-[#7CB342]/12 to-[#DCE8CC]/35 rounded-full filter blur-[110px] opacity-85"
          />
        </motion.div>

        {/* Layer 2: Animated SVG Dash Path ("Growing Vine / Garden Path Effect") */}
        <motion.svg
          style={{ x: parallaxX, y: parallaxY }}
          className="absolute inset-0 w-full h-full opacity-25 stroke-[#7CB342]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          fill="none"
        >
          {/* Main Vine Path 1 */}
          <motion.path
            d="M-80,180 C320,40 580,330 1080,90 C1280,-30 1480,230 1620,130"
            strokeWidth="1.75"
            strokeDasharray="12 12"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, -280] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Secondary Vine Path 2 */}
          <motion.path
            d="M-40,620 C420,440 680,730 1180,480 C1380,380 1520,630 1640,530"
            strokeWidth="1.25"
            strokeDasharray="8 8"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, 240] }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.svg>

        {/* Layer 3: Floating Accent Dots (Organic leaf-in-wind drift) */}
        <motion.div style={{ x: parallaxX, y: parallaxY }} className="absolute inset-0 pointer-events-none">
          {/* Dot 1 */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -18, 0, 14, 0],
                    x: [0, 8, -6, 4, 0],
                    opacity: [0.2, 0.4, 0.25, 0.35, 0.2],
                  }
            }
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[15%] w-3 h-3 rounded-full bg-[#7CB342]"
          />

          {/* Dot 2 */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, 20, -12, 0],
                    x: [0, -10, 6, 0],
                    opacity: [0.15, 0.35, 0.2, 0.15],
                  }
            }
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/3 right-[32%] w-3.5 h-3.5 rounded-full bg-[#7CB342]"
          />

          {/* Dot 3 */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -15, 18, 0],
                    x: [0, 6, -8, 0],
                    opacity: [0.25, 0.4, 0.15, 0.25],
                  }
            }
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            className="absolute bottom-1/3 left-[28%] w-2.5 h-2.5 rounded-full bg-[#546622]"
          />

          {/* Dot 4 */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, 16, -16, 0],
                    x: [0, -6, 10, 0],
                    opacity: [0.15, 0.3, 0.2, 0.15],
                  }
            }
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute top-[60%] right-[14%] w-3 h-3 rounded-full bg-[#7CB342]"
          />

          {/* Dot 5 */}
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    y: [0, -22, 12, 0],
                    x: [0, 10, -5, 0],
                    opacity: [0.2, 0.35, 0.15, 0.2],
                  }
            }
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
            className="absolute top-[18%] left-[45%] w-2 h-2 rounded-full bg-[#7CB342]"
          />
        </motion.div>
      </div>

      {/* Foreground Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {children}
      </div>
    </section>
  );
}
