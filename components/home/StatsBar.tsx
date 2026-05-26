"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Home, TreePine, Users, Award } from "lucide-react";

const stats = [
  { icon: Home, value: 850, suffix: "+", label: "Interiors Designed" },
  { icon: TreePine, value: 320, suffix: "+", label: "Landscapes Created" },
  { icon: Users, value: 1200, suffix: "+", label: "Happy Clients" },
  { icon: Award, value: 12, suffix: " Yrs", label: "Years of Excellence" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-[#f2f7ec] py-16 relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#89B036_0%,_transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-[#89B036]/10 border border-[#89B036]/30 flex items-center justify-center mb-4 group-hover:bg-[#89B036]/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#89B036]" />
                </div>
                <div className="text-4xl lg:text-5xl font-extrabold text-[#2E3A1E] font-playfair">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-[#546622] mt-2 uppercase tracking-widest font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
