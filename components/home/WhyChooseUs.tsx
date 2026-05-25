"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck, Clock3, Leaf, HeartHandshake,
  Headphones, Gem, MapPin, BarChart3
} from "lucide-react";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Quality Guaranteed",
    desc: "Every project is backed by a quality warranty and a dedicated post-handover support team.",
  },
  {
    icon: Clock3,
    title: "On-Time Delivery",
    desc: "We respect your timeline. Strict project schedules with milestone-based tracking.",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious Choices",
    desc: "Sustainable materials and green practices embedded into every design decision.",
  },
  {
    icon: HeartHandshake,
    title: "Client-First Culture",
    desc: "Transparent communication, no hidden costs, and designs that truly reflect you.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Dedicated project managers available round the clock for all your queries.",
  },
  {
    icon: Gem,
    title: "Premium Materials",
    desc: "We source only from certified, high-grade suppliers for lasting beauty.",
  },
  {
    icon: MapPin,
    title: "Kerala-Based Experts",
    desc: "Deep local knowledge of climate, culture, and architecture trends across Kerala.",
  },
  {
    icon: BarChart3,
    title: "Proven Track Record",
    desc: "1,200+ satisfied clients and 850+ completed interior and landscape projects.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#2E3A1E] relative overflow-hidden">
      {/* Background decorative */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#7A9E2E] filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#7A9E2E] filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#7A9E2E]">
            Why Rexon
          </span>
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-white mt-3 mb-5">
            Why Clients Choose Us
          </h2>
          <p className="text-[#A8B89A] text-base leading-relaxed">
            More than a design firm — we&apos;re your trusted partner in building spaces that
            stand the test of time.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#7A9E2E]/40 transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-[#7A9E2E]/20 border border-[#7A9E2E]/30 flex items-center justify-center mb-5 group-hover:bg-[#7A9E2E]/35 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-[#7A9E2E]" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-xs text-[#A8B89A] leading-relaxed">{reason.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
