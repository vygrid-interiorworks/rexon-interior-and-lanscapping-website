"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Home, TreePine, Users, Award } from "lucide-react";
import { apiService } from "@/lib/api";

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16)) || 1;
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

function parseVal(v: any, fallback: number) {
  if (v === undefined || v === null || v === "") return fallback;
  const n = Number(v);
  return isNaN(n) ? fallback : n;
}

export default function StatsBar() {
  const [stats, setStats] = useState([
    { icon: Home, value: 850, suffix: "+", label: "Interiors Designed" },
    { icon: TreePine, value: 320, suffix: "+", label: "Landscapes Created" },
    { icon: Users, value: 1200, suffix: "+", label: "Happy Clients" },
    { icon: Award, value: 12, suffix: " Yrs", label: "Years of Excellence" },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiService.getSettings();
        if (data) {
          const landscapesVal = parseVal(data.landscapesCreated ?? data.propertiesLandscapes, 320);

          setStats([
            { icon: Home, value: parseVal(data.interiorsDesigned, 850), suffix: "+", label: "Interiors Designed" },
            { icon: TreePine, value: landscapesVal, suffix: "+", label: "Landscapes Created" },
            { icon: Users, value: parseVal(data.happyClients, 1200), suffix: "+", label: "Happy Clients" },
            { icon: Award, value: parseVal(data.yearsExperience, 12), suffix: " Yrs", label: "Years of Excellence" },
          ]);
        }
      } catch (err) {
        console.error("Failed to load settings stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="bg-[#DCE8CC]/40 py-16 lg:py-20 relative overflow-hidden font-sans border-y border-[#DCE8CC]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#7CB342]/20 flex items-center justify-center mb-4 shadow-sm group-hover:bg-[#7CB342] group-hover:text-white text-[#7CB342] transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-4xl lg:text-6xl font-serif font-normal text-[#2B2C2E] leading-none mb-2">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-[#58595B] font-medium uppercase tracking-widest font-sans">
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
