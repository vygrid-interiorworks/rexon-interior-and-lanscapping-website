"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, User, Maximize2, Calendar, Briefcase, Hammer, Leaf } from "lucide-react";
import { apiService } from "@/lib/api";
import ImageLightbox from "@/components/ui/ImageLightbox";

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

export default function RecentWork() {
  const [projectList, setProjectList] = useState<Project[]>(staticProjects);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

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
        // Fallback to static
      }
    };
    fetchProjects();
  }, []);

  // Dynamically derive category filters from projects present in admin panel / DB
  const categories = [
    "All",
    ...Array.from(new Set(projectList.map((p) => p.category).filter(Boolean))),
  ];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  const activeThumbRef = useRef<HTMLButtonElement | null>(null);

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

  useEffect(() => {
    if (lightboxIndex !== null && activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [lightboxIndex]);

  return (
    <section className="py-14 sm:py-16 bg-[#F5F5F3] font-sans border-t border-[#DCE8CC]" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#7CB342] mb-2">
            Portfolio Showcase
          </span>
          <h2 className="text-4xl lg:text-5xl font-megalky font-normal text-[#2B2C2E] mb-3">
            Our Recent Work
          </h2>
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#7CB342]/60 to-[#7CB342]" />
            <div className="w-6 h-6 rounded-full bg-[#7CB342]/20 border border-[#7CB342]/40 flex items-center justify-center text-[#7CB342]">
              <Leaf className="w-3 h-3" />
            </div>
            <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#7CB342]/60 to-[#7CB342]" />
          </div>
          <p className="text-[#58595B] text-base leading-relaxed font-sans">
            A curated showcase of our finest interior and landscaping transformations across Kerala.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#7CB342] text-white shadow-md"
                  : "bg-white text-[#58595B] border border-[#DCE8CC] hover:border-[#7CB342] hover:text-[#7CB342]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery-style Image Grid Cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.slice(0, 9).map((project, idx) => (
              <motion.div
                key={project.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleProjectClick(idx)}
                className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer bg-white border-2 border-white aspect-[4/3]"
              >
                <img
                  src={project.img}
                  alt="Portfolio Image"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2B2C2E] hover:bg-[#1A1A1B] text-white font-medium rounded-full text-sm tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View All {filtered.length} Photos →
          </Link>
        </motion.div>
      </div>

      {/* Reusable Portal Lightbox */}
      <ImageLightbox
        isOpen={lightboxIndex !== null}
        currentIndex={lightboxIndex ?? 0}
        items={filtered}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </section>
  );
}
