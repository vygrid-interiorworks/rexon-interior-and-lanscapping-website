"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sofa, ChefHat, TreePine, Paintbrush, Layers, Flower2,
  Lightbulb, Hammer, BrickWall, Droplets, ArrowRight
} from "lucide-react";
import { apiService } from "@/lib/api";

const iconMap: Record<string, any> = {
  Sofa,
  ChefHat,
  TreePine,
  Paintbrush,
  Layers,
  Flower2,
  Lightbulb,
  Hammer,
  BrickWall,
  Droplets
};

const defaultServices = [
  {
    icon: "Sofa",
    title: "Interior Design",
    desc: "Elegant and functional living spaces — from concept mood boards and 3D renders to material selection and final installation.",
    color: "#7CB342",
    slug: "interior-design",
    tag: "Interiors",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    showOnHome: true,
  },
  {
    icon: "ChefHat",
    title: "Modular Kitchen",
    desc: "Smart, stylish kitchens with premium hardware, quartz countertops, and custom cabinet finishes tailored for modern living.",
    color: "#2B2C2E",
    slug: "modular-kitchen",
    tag: "Interiors",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    showOnHome: true,
  },
  {
    icon: "TreePine",
    title: "Landscaping & Gardens",
    desc: "Transforming land into living art — outdoor architecture, stone pathways, water features, and lush green retreats.",
    color: "#7CB342",
    slug: "landscaping",
    tag: "Outdoors",
    img: "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80",
    showOnHome: true,
  },
  {
    icon: "Layers",
    title: "False Ceiling",
    desc: "Designer gypsum and POP ceiling systems with concealed LED cove lighting and acoustic insulation integration.",
    color: "#2B2C2E",
    slug: "false-ceiling",
    tag: "Interiors",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    showOnHome: true,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function ServicesGrid() {
  const [services, setServices] = useState<any[]>(defaultServices);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const loadServicesData = async () => {
      try {
        const fetched = await apiService.getServices();
        if (fetched && fetched.length > 0) {
          const normalized = fetched.map((s: any) => ({
            ...s,
            title: s.title || s.name,
            desc: s.desc || s.description,
            icon: s.icon || "Sofa",
            slug: s.slug || (s.title || s.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            color: s.color || "#7CB342",
            tag: s.tag || "Interiors",
            img: s.img || s.image || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
            showOnHome: s.showOnHome !== false,
          }));
          
          const homeEnabled = normalized.filter((s: any) => s.showOnHome);
          setServices(homeEnabled.length > 0 ? homeEnabled : normalized);
        } else {
          setServices(defaultServices);
        }
      } catch (err) {
        console.error("Failed to load services for grid:", err);
        setServices(defaultServices);
      }
    };
    loadServicesData();

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Determine optimal responsive grid class based on service count
  const getGridColsClass = () => {
    const count = services.length;
    if (count === 1) return "grid-cols-1 max-w-xl mx-auto";
    if (count === 2) return "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
    if (count === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto";
  };

  return (
    <section className="py-24 bg-[#F5F5F3] font-sans relative overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7CB342]">
            What We Offer
          </span>
          <h2 className="text-4xl lg:text-5xl font-megalky font-normal text-[#2B2C2E] mt-3 mb-5">
            Our Premium Services
          </h2>
          <p className="text-[#58595B] text-base leading-relaxed font-sans">
            A complete spectrum of interior and exterior solutions — all under one roof,
            delivered with craftsmanship that exceeds expectations.
          </p>
        </motion.div>

        {/* Dynamic Responsive Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className={`grid gap-8 ${getGridColsClass()}`}
        >
          {services.map((service, index) => {
            const isExtra = index >= 4;
            const Icon = iconMap[service.icon] || Sofa;
            const shouldShow = !isExtra || isExpanded || !isMobile || !mounted;
            const formattedIndex = (index + 1).toString().padStart(2, "0");

            return (
              <AnimatePresence key={service.slug || service.id || index} initial={false}>
                {shouldShow && (
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="group bg-white rounded-[24px] border border-[#DCE8CC] hover:border-[#7CB342]/60 cursor-pointer flex flex-col overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.03),0_12px_28px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(124,179,66,0.14),0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 relative"
                  >
                    {/* Top Image Block */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 border-b border-[#DCE8CC]/50">
                      <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2B2C2E]/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                      
                      {/* Category Pill Tag */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#7CB342] bg-white/90 backdrop-blur-md border border-[#7CB342]/20 px-3 py-1 rounded-full shadow-sm font-sans">
                          {service.tag}
                        </span>
                      </div>

                      {/* Faint Editorial Number Badge */}
                      <span className="absolute top-3 right-4 z-10 font-megalky font-bold text-3xl text-white/70 drop-shadow-md select-none">
                        {formattedIndex}
                      </span>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 sm:p-7 flex flex-col flex-grow relative bg-white">
                      
                      {/* Floating Gradient Icon Badge */}
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br from-[#DCE8CC]/80 via-white to-[#DCE8CC]/50 border border-[#7CB342]/30 text-[#7CB342] shadow-sm group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_0_20px_rgba(124,179,66,0.3)] transition-all duration-300 -mt-12 relative z-20">
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-2xl font-megalky font-normal text-[#2B2C2E] mb-3 leading-snug group-hover:text-[#7CB342] transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-[#58595B] leading-relaxed flex-grow font-sans mb-6">
                        {service.desc}
                      </p>

                      {/* Interactive CTA Link */}
                      <div className="pt-4 border-t border-[#DCE8CC]/40 flex items-center justify-between text-xs font-semibold text-[#7CB342] uppercase tracking-wider font-sans mt-auto">
                        <span className="group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1.5">
                          Explore Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/services?id=${encodeURIComponent(service.slug || service.id || service.title)}`}
                      className="absolute inset-0 z-30 focus:outline-none"
                      aria-label={`View ${service.title} details`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </motion.div>

        {/* View All Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-16"
        >
          {mounted && isMobile && services.length > 4 ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2B2C2E] hover:bg-[#1A1A1B] text-white font-medium rounded-full text-sm tracking-wider transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none cursor-pointer"
            >
              {isExpanded ? "Show Less" : "View All Services"}
              <ArrowRight className="w-4 h-4 text-[#7CB342]" />
            </button>
          ) : (
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2B2C2E] hover:bg-[#1A1A1B] text-white font-medium rounded-full text-sm tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
            >
              View All Services
              <ArrowRight className="w-4 h-4 text-[#7CB342]" />
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
