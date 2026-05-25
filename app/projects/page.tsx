"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Interior", "Kitchen", "Landscaping", "Garden", "Commercial"];

const projects = [
  { id: 1, title: "Seaside Villa Interior", category: "Interior", location: "Kochi", year: "2024", area: "2800 sq.ft", img: "https://placehold.co/800x600/4A5A1E/FFFFFF?text=Villa+Interior", before: "https://placehold.co/800x600/999999/FFFFFF?text=Before", after: "https://placehold.co/800x600/4A5A1E/FFFFFF?text=After" },
  { id: 2, title: "Tropical Garden Retreat", category: "Landscaping", location: "Thrissur", year: "2024", area: "5000 sq.ft", img: "https://placehold.co/800x600/7A9E2E/FFFFFF?text=Garden+Retreat", before: "https://placehold.co/800x600/BBBBBB/FFFFFF?text=Before", after: "https://placehold.co/800x600/7A9E2E/FFFFFF?text=After" },
  { id: 3, title: "Contemporary Modular Kitchen", category: "Kitchen", location: "Calicut", year: "2023", area: "450 sq.ft", img: "https://placehold.co/800x600/3A3A3A/FFFFFF?text=Modular+Kitchen", before: "https://placehold.co/800x600/AAAAAA/FFFFFF?text=Before", after: "https://placehold.co/800x600/3A3A3A/FFFFFF?text=After" },
  { id: 4, title: "IT Corporate Office", category: "Commercial", location: "Trivandrum", year: "2024", area: "6200 sq.ft", img: "https://placehold.co/800x600/4A5A1E/FFFFFF?text=Office+Interiors", before: "https://placehold.co/800x600/CCCCCC/FFFFFF?text=Before", after: "https://placehold.co/800x600/4A5A1E/FFFFFF?text=After" },
  { id: 5, title: "Zen Courtyard Garden", category: "Garden", location: "Kannur", year: "2023", area: "1200 sq.ft", img: "https://placehold.co/800x600/7A9E2E/FFFFFF?text=Zen+Courtyard", before: "https://placehold.co/800x600/999999/FFFFFF?text=Before", after: "https://placehold.co/800x600/7A9E2E/FFFFFF?text=After" },
  { id: 6, title: "Contemporary Living Room", category: "Interior", location: "Kochi", year: "2024", area: "380 sq.ft", img: "https://placehold.co/800x600/3A3A3A/FFFFFF?text=Living+Room", before: "https://placehold.co/800x600/BBBBBB/FFFFFF?text=Before", after: "https://placehold.co/800x600/3A3A3A/FFFFFF?text=After" },
  { id: 7, title: "Boutique Hotel Lobby", category: "Commercial", location: "Kochi", year: "2023", area: "1800 sq.ft", img: "https://placehold.co/800x600/4A5A1E/FFFFFF?text=Hotel+Lobby", before: "https://placehold.co/800x600/AAAAAA/FFFFFF?text=Before", after: "https://placehold.co/800x600/4A5A1E/FFFFFF?text=After" },
  { id: 8, title: "Rooftop Garden Terrace", category: "Garden", location: "Thrissur", year: "2024", area: "900 sq.ft", img: "https://placehold.co/800x600/7A9E2E/FFFFFF?text=Rooftop+Garden", before: "https://placehold.co/800x600/CCCCCC/FFFFFF?text=Before", after: "https://placehold.co/800x600/7A9E2E/FFFFFF?text=After" },
  { id: 9, title: "Master Bedroom Suite", category: "Interior", location: "Trivandrum", year: "2023", area: "520 sq.ft", img: "https://placehold.co/800x600/3A3A3A/FFFFFF?text=Master+Bedroom", before: "https://placehold.co/800x600/999999/FFFFFF?text=Before", after: "https://placehold.co/800x600/3A3A3A/FFFFFF?text=After" },
];

type Project = typeof projects[0];

function BeforeAfterSlider({ project }: { project: Project }) {
  const [sliderPos, setSliderPos] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(95, Math.max(5, pct)));
  };

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl cursor-col-resize select-none" onMouseMove={handleMouseMove}>
      <img src={project.after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
        <img src={project.before} alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${10000 / sliderPos}%`, maxWidth: "none" }} />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10" style={{ left: `${sliderPos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-[#7A9E2E] flex items-center justify-center shadow-xl">
          <ChevronLeft className="w-3 h-3 text-[#7A9E2E]" />
          <ChevronRight className="w-3 h-3 text-[#7A9E2E]" />
        </div>
      </div>
      <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Before</div>
      <div className="absolute top-3 right-3 bg-[#7A9E2E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">After</div>
    </div>
  );
}

function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const [view, setView] = useState<"photo" | "comparison">("photo");
  return (
    <motion.div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="w-full max-w-4xl" initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-bold text-xl font-playfair">{project.title}</h3>
            <p className="text-white/50 text-sm">{project.location} · {project.year} · {project.area}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-white/10 rounded-full p-1">
              {(["photo", "comparison"] as const).map((v) => (
                <button key={v} onClick={() => setView(v)} className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${view === v ? "bg-[#7A9E2E] text-white" : "text-white/60 hover:text-white"}`}>
                  {v === "photo" ? "Photo" : "Before/After"}
                </button>
              ))}
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        {view === "photo"
          ? <img src={project.img} alt={project.title} className="w-full rounded-2xl shadow-2xl object-cover max-h-[70vh]" />
          : <BeforeAfterSlider project={project} />
        }
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<Project | null>(null);

  const filtered = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#F9F8F5]">
      {/* Hero */}
      <section className="bg-[#2E3A1E] py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_right,_#7A9E2E_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8D65A]">Our Portfolio</span>
          <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-white mt-4 mb-6">Our Projects</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Every project tells a transformation story. Explore our portfolio of interiors and landscapes across Kerala.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === c ? "bg-[#7A9E2E] text-white shadow-lg" : "bg-white text-[#6B6B6B] border border-[#E8E8E8] hover:border-[#7A9E2E] hover:text-[#7A9E2E]"}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence>
              {filtered.map(project => (
                <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => setLightbox(project)}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white/20 border border-white flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <span className="absolute top-4 left-4 bg-[#7A9E2E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-[#3A3A3A] mb-1">{project.title}</h3>
                    <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
                      <span>{project.location}, Kerala</span>
                      <span>{project.year} · {project.area}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && <Lightbox project={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}
