"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Loader2 } from "lucide-react";
import { apiService } from "@/lib/api";

const categories = ["All", "Interior", "Landscaping", "Kitchen", "Outdoor", "Commercial"];

type Project = any;

function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="w-full max-w-4xl" initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-bold text-xl font-playfair">{project.title}</h3>
            <p className="text-white/50 text-sm mt-1">{project.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <img src={project.image} alt={project.title} className="w-full rounded-2xl shadow-2xl object-cover max-h-[70vh]" />
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<Project | null>(null);
  
  // Firebase Data State
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await apiService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const filtered = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#F9F8F5]">
      {/* Hero */}
      <section className="bg-[#2E3A1E] py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_right,_#89B036_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8D65A]">Our Portfolio</span>
          <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-white mt-4 mb-6">Our Projects</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Every project tells a transformation story. Explore our portfolio of interiors and landscapes.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === c ? "bg-[#89B036] text-white shadow-lg" : "bg-white text-[#4A4A4A] border border-[#E8E8E8] hover:border-[#89B036] hover:text-[#89B036]"}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#6B6B6B]">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#89B036]" />
              <p>Loading projects...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#6B6B6B]">
              <p>No projects found in this category.</p>
            </div>
          ) : (
            /* Grid */
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              <AnimatePresence>
                {filtered.map(project => (
                  <motion.div key={project._id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => setLightbox(project)}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white/20 border border-white flex items-center justify-center">
                          <ZoomIn className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <span className="absolute top-4 left-4 bg-[#89B036] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-[#3A3A3A] mb-2">{project.title}</h3>
                      <p className="text-xs text-[#4A4A4A] line-clamp-2">{project.description}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && <Lightbox project={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}
