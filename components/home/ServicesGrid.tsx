"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sofa, ChefHat, TreePine, Paintbrush, Layers, Flower2,
  Lightbulb, Hammer, BrickWall, Droplets, HelpCircle
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
    desc: "Elegant and functional living spaces — from concept boards to final installation.",
    color: "#89B036",
    slug: "interior-design",
    tag: "Interiors",
    showOnHome: true,
  },
  {
    icon: "ChefHat",
    title: "Modular Kitchen",
    desc: "Smart, stylish kitchens with premium hardware and custom cabinet finishes.",
    color: "#546622",
    slug: "modular-kitchen",
    tag: "Interiors",
    showOnHome: true,
  },
  {
    icon: "TreePine",
    title: "Landscaping & Gardens",
    desc: "Transforming outdoor spaces into breathtaking natural retreats.",
    color: "#89B036",
    slug: "landscaping",
    tag: "Outdoors",
    showOnHome: true,
  },
  {
    icon: "Layers",
    title: "False Ceiling",
    desc: "Designer gypsum and POP false ceilings with integrated lighting.",
    color: "#546622",
    slug: "false-ceiling",
    tag: "Interiors",
    showOnHome: true,
  },
  {
    icon: "Paintbrush",
    title: "Wallpaper & Wall Décor",
    desc: "Premium wallpapers, textures, and accent wall treatments.",
    color: "#89B036",
    slug: "wallpaper-decor",
    tag: "Interiors",
    showOnHome: true,
  },
  {
    icon: "Flower2",
    title: "Garden Maintenance",
    desc: "Scheduled upkeep, pruning, fertilization, and seasonal replanting.",
    color: "#546622",
    slug: "garden-maintenance",
    tag: "Outdoors",
    showOnHome: false,
  },
  {
    icon: "Lightbulb",
    title: "Lighting Design",
    desc: "Ambient, task, and accent lighting systems for mood-perfect spaces.",
    color: "#89B036",
    slug: "lighting-design",
    tag: "Interiors",
    showOnHome: false,
  },
  {
    icon: "Hammer",
    title: "Carpentry & Woodwork",
    desc: "Bespoke wardrobes, TV units, and custom wooden furniture crafted locally.",
    color: "#546622",
    slug: "carpentry",
    tag: "Interiors",
    showOnHome: false,
  },
  {
    icon: "BrickWall",
    title: "Stone & Tile Work",
    desc: "Natural stone cladding, floor tiling, and mosaic feature walls.",
    color: "#89B036",
    slug: "stone-tile",
    tag: "Both",
    showOnHome: false,
  },
  {
    icon: "Droplets",
    title: "Water Features",
    desc: "Custom ponds, waterfalls, and fountain installations for outdoor luxury.",
    color: "#546622",
    slug: "water-features",
    tag: "Outdoors",
    showOnHome: false,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function ServicesGrid() {
  const [services, setServices] = useState<any[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const loadServicesData = async () => {
      try {
        const fetched = await apiService.getServices();
        if (fetched && fetched.length > 0) {
          // Normalize properties to support DB formats
          const normalized = fetched.map((s: any) => ({
            ...s,
            title: s.title || s.name,
            desc: s.desc || s.description,
            icon: s.icon || "Sofa",
            slug: s.slug || (s.title || s.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            color: s.color || "#89B036",
            tag: s.tag || "Interiors",
            showOnHome: s.showOnHome !== false,
          }));
          
          // Filter to only show home-page enabled services
          const homeEnabled = normalized.filter((s: any) => s.showOnHome);
          setServices(homeEnabled.length > 0 ? homeEnabled : normalized);
        } else {
          // Filter default services to those showing on home
          setServices(defaultServices.filter(s => s.showOnHome));
        }
      } catch (err) {
        console.error("Failed to load services:", err);
        setServices(defaultServices.filter(s => s.showOnHome));
      }
    };
    loadServicesData();

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="py-24 bg-[#F9F8F5]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#89B036]">
            What We Offer
          </span>
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-[#3A3A3A] mt-3 mb-5">
            Our Premium Services
          </h2>
          <p className="text-[#4A4A4A] text-base leading-relaxed">
            A complete spectrum of interior and exterior solutions — all under one roof,
            delivered with craftsmanship that exceeds expectations.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {services.map((service, index) => {
            const isExtra = index >= 3;
            const Icon = iconMap[service.icon] || Sofa;
            const shouldShow = !isExtra || isExpanded || !isMobile || !mounted;

            return (
              <AnimatePresence key={service.slug} initial={false}>
                {shouldShow && (
                  <motion.div
                    variants={cardVariants}
                    initial={isExtra && mounted && isMobile ? { opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0 } : "show"}
                    animate={isExtra && mounted && isMobile ? { opacity: 1, height: "auto", paddingTop: 24, paddingBottom: 24, marginTop: "", marginBottom: "" } : "show"}
                    exit={isExtra && mounted && isMobile ? { opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0 } : undefined}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                    className="group bg-white rounded-2xl p-6 border border-[#E8E8E8] cursor-pointer transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${service.color}18` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: service.color }} />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A0A0A0] mb-2">
                      {service.tag}
                    </span>
                    <h3 className="text-base font-bold text-[#3A3A3A] mb-2 leading-snug group-hover:text-[#89B036] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#4A4A4A] leading-relaxed flex-grow">{service.desc}</p>

                    <Link
                      href={`/services#${service.slug}`}
                      className="mt-4 text-xs font-bold text-[#89B036] uppercase tracking-wider flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Learn More →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </motion.div>

        {/* View All Services / Toggle Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          {mounted && isMobile ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#89B036] hover:bg-[#546622] text-white font-bold rounded-full text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none"
            >
              {isExpanded ? "Show Less" : "View All Services"}
            </button>
          ) : (
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#89B036] hover:bg-[#546622] text-white font-bold rounded-full text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Services
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
