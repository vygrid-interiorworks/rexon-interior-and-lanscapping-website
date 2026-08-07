"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, User, Maximize2, Calendar, Briefcase, Hammer, Sparkles, Leaf } from "lucide-react";
import Link from "next/link";
import { apiService } from "@/lib/api";

type Project = {
  id: string | number;
  title: string;
  category: string;
  location: string;
  img: string;
  description: string;
  showContent?: boolean;
  images: string[];
  details: {
    client: string;
    area: string;
    duration: string;
    scope: string;
    materials: string;
  };
};

const staticProjects: Project[] = [
  {
    id: 1,
    title: "Luxury Villa Interior",
    category: "Interior",
    location: "Kochi, Kerala",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    description: "An opulent, contemporary residential interior designed for a luxury villa in Kochi. The space merges rich textures with warm, curated wood paneling and gold trim highlights. Features high-end custom carpentry, smart dimmable task lighting, bespoke velvet seating, and a spacious open-concept layout tailored for modern Keralite lifestyle.",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    ],
    details: {
      client: "Dr. Sandeep Nair",
      area: "4,500 Sq. Ft.",
      duration: "6 Months",
      scope: "Full-Home Turnkey Interior Design",
      materials: "Teak wood, Premium veneer, Gold-brushed PVD, Velvet fabrics",
    }
  },
  {
    id: 2,
    title: "Tropical Garden Retreat",
    category: "Landscaping",
    location: "Thrissur, Kerala",
    img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    description: "A lush, green sanctuary featuring premium outdoor wooden decking, a custom Koi pond with natural stone cascades, and native tropical plants selected for low upkeep. Built to provide a serene space for morning tea and outdoor gatherings, the retreat features professional landscape illumination and built-in stone sitting benches.",
    images: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80",
    ],
    details: {
      client: "Kurian & Family",
      area: "3,200 Sq. Ft. Garden",
      duration: "3 Months",
      scope: "Complete Landscape Architecture & Water Features",
      materials: "Natural Kerala Laterite Stone, Engineered Teak Decking, Smart Irrigation",
    }
  },
  {
    id: 3,
    title: "Modular Kitchen Redesign",
    category: "Kitchen",
    location: "Calicut, Kerala",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    description: "A state-of-the-art modular kitchen designed for high utility and modern aesthetics. Integrated with premium Hafele soft-close mechanisms, custom PU-lacquered cabinet doors in sage green, white quartz countertops, and smart built-in appliances. Features an island counter with high seating for casual meals.",
    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
    details: {
      client: "Aysha Rahman",
      area: "240 Sq. Ft.",
      duration: "4 Weeks",
      scope: "Modular Kitchen Design, Fabrication & Installation",
      materials: "Marine Plywood, Sage Green PU Finish, Premium Quartz, Hafele hardware",
    }
  },
  {
    id: 4,
    title: "Corporate Office Revamp",
    category: "Interior",
    location: "Trivandrum, Kerala",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
    description: "A collaborative corporate workspace designed to foster productivity and crew engagement. Incorporates acoustic panel ceilings, ergonomic workstations, vibrant green biophilic breakout zones, and high-tech conference spaces. Designed with an earthy corporate color theme emphasizing natural light flow.",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
    ],
    details: {
      client: "Apex Tech Ventures",
      area: "8,500 Sq. Ft.",
      duration: "4 Months",
      scope: "Commercial Interior Design & Build",
      materials: "Acoustic fabric panels, Recycled carpet tiles, Oak worktables, Glass partition walls",
    }
  },
  {
    id: 5,
    title: "Zen Courtyard Design",
    category: "Garden",
    location: "Kannur, Kerala",
    img: "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80",
    description: "A stunning traditional inner courtyard design based on Naalukettu architecture with a Zen layout. Features a center gravel courtyard, bamboo plantings, polished granite accents, and a minimal waterfall wall generating soothing soundscapes. Ideal for quiet meditation and yoga.",
    images: [
      "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    ],
    details: {
      client: "Dr. Vinod Krishnan",
      area: "1,200 Sq. Ft.",
      duration: "2 Months",
      scope: "Traditional Courtyard Zen Design",
      materials: "White pebbles, Black Granite, Bamboo, Teak Pillars",
    }
  },
  {
    id: 6,
    title: "Contemporary Living Room",
    category: "Interior",
    location: "Kochi, Kerala",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    description: "A bright, warm contemporary living area that maximises seating comfort and visual depth. Incorporates a bespoke marble-accented television unit, ambient warm cove lighting, and soft linen curtains that diffuse sunlight beautifully. Elegant, minimalist furniture selected from custom Italian collections.",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    ],
    details: {
      client: "Meera & Rahul",
      area: "650 Sq. Ft.",
      duration: "6 Weeks",
      scope: "Living Room Remodel",
      materials: "Statuario Marble, Oak veneers, Natural Linen, Dimmable Warm LEDs",
    }
  },
];

export default function ProjectsPage() {
  const [projectList, setProjectList] = useState<Project[]>(staticProjects);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [hideAllContent, setHideAllContent] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const settingsData = await apiService.getSettings();
        if (settingsData && settingsData.hideAllProjectContent !== undefined) {
          setHideAllContent(settingsData.hideAllProjectContent);
        }

        const remote = await apiService.getProjects();
        if (remote && remote.length > 0) {
          const normalized: Project[] = remote.map((p: any, idx: number) => ({
            id: p._id || idx + 1,
            title: p.title || "Project",
            category: p.category || "Interior",
            location: p.location || "Kerala, India",
            img: p.img || p.image || (Array.isArray(p.images) && p.images[0]) || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
            description: p.description || "",
            showContent: p.showContent !== false,
            images: Array.isArray(p.images) && p.images.length > 0
              ? p.images
              : [p.img || p.image || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"],
            details: {
              client: p.details?.client || p.client || "Rexon Client",
              area: p.details?.area || p.area || "Custom Area",
              duration: p.details?.duration || p.duration || "Custom Duration",
              scope: p.details?.scope || p.scope || p.category || "Turnkey Project",
              materials: p.details?.materials || p.materials || "Premium finishes",
            },
          }));
          setProjectList(normalized);
        }
      } catch (err) {
        // Fallback
      }
    };
    fetchProjects();
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(projectList.map((p) => p.category).filter(Boolean))),
  ];

  const filtered = activeCategory === "All"
    ? projectList
    : projectList.filter((p) => p.category === activeCategory);

  const handleProjectClick = (index: number) => {
    setLightboxIndex(index);
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : 0));
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev !== null ? (prev === 0 ? filtered.length - 1 : prev - 1) : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filtered.length]);

  return (
    <div className="bg-[#F5F5F3] font-sans">
      {/* ── Luxury Hero Banner ── */}
      <section className="bg-gradient-to-b from-[#18191B] via-[#1E2023] to-[#212224] pt-[140px] pb-24 lg:pt-[170px] lg:pb-28 relative overflow-hidden border-b border-[#7CB342]/25 mb-6">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#7CB342_1px,transparent_1px),linear-gradient(to_bottom,#7CB342_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#7CB342]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#7CB342]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-megalky font-normal text-white leading-[1.15] tracking-wide mb-6">
            Our Featured <span className="italic text-[#DCE8CC] font-light">Projects</span>
          </h1>

          <div className="flex items-center justify-center gap-4 my-5">
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#7CB342]/60 to-[#7CB342]" />
            <div className="w-6 h-6 rounded-full bg-[#7CB342]/20 border border-[#7CB342]/40 flex items-center justify-center text-[#7CB342]">
              <Leaf className="w-3 h-3" />
            </div>
            <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#7CB342]/60 to-[#7CB342]" />
          </div>

          <p className="text-[#DCE8CC]/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans font-light">
            Every project tells a transformation story. Explore our curated portfolio of residential interiors and landscape architecture across Kerala.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16 bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setActiveCategory(c);
                  setLightboxIndex(null);
                }}
                className={`px-6 py-2.5 rounded-full text-xs font-medium tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === c
                    ? "bg-[#7CB342] text-white shadow-md"
                    : "bg-white text-[#2B2C2E] border border-[#DCE8CC] hover:border-[#7CB342] hover:text-[#7CB342]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Gallery-style Image Grid Cards */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((project, idx) => (
                <motion.div
                  key={project.id || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer bg-white border-2 border-white aspect-[4/3]"
                  onClick={() => handleProjectClick(idx)}
                >
                  <img
                    src={project.img}
                    alt="Project Image"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  />
                  {/* Hover overlay zoom effect */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Overlay with Arrow & Scroll Navigation */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between z-20">
              <span className="text-xs font-semibold text-white/80 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
                Photo {lightboxIndex + 1} of {filtered.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm shadow-md cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Center Area: Image & Nav Arrows */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              {/* Prev Arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 z-30 p-3 bg-white/15 hover:bg-[#7CB342] text-white rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 cursor-pointer shadow-lg hover:scale-110"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  src={filtered[lightboxIndex].img}
                  alt={`Photo ${lightboxIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-[70vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl border border-white/10"
                />
              </AnimatePresence>

              {/* Next Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-6 z-30 p-3 bg-white/15 hover:bg-[#7CB342] text-white rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 cursor-pointer shadow-lg hover:scale-110"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Scrollable Thumbnails Bar */}
            <div className="w-full max-w-5xl mx-auto overflow-x-auto pb-2 flex justify-start sm:justify-center gap-2.5 scrollbar-thin scrollbar-thumb-white/20">
              {filtered.map((proj, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-14 h-11 sm:w-18 sm:h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                    lightboxIndex === idx
                      ? "border-[#7CB342] scale-105 shadow-lg"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={proj.img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
