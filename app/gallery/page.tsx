"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const categories = ["All", "Interior", "Landscaping", "Kitchen", "Outdoor", "Commercial"];

const gallery = [
  { id: 1, src: "https://placehold.co/800x1000/4A5A1E/FFFFFF?text=Interior+01", alt: "Luxury Living Room", cat: "Interior", tall: true },
  { id: 2, src: "https://placehold.co/800x600/7A9E2E/FFFFFF?text=Garden+01", alt: "Tropical Garden", cat: "Landscaping", tall: false },
  { id: 3, src: "https://placehold.co/800x600/3A3A3A/FFFFFF?text=Kitchen+01", alt: "Modular Kitchen", cat: "Kitchen", tall: false },
  { id: 4, src: "https://placehold.co/800x900/7A9E2E/FFFFFF?text=Outdoor+01", alt: "Stone Pathway", cat: "Outdoor", tall: true },
  { id: 5, src: "https://placehold.co/800x600/4A5A1E/FFFFFF?text=Bedroom+01", alt: "Master Bedroom", cat: "Interior", tall: false },
  { id: 6, src: "https://placehold.co/800x600/3A3A3A/FFFFFF?text=Office+01", alt: "Corporate Office", cat: "Commercial", tall: false },
  { id: 7, src: "https://placehold.co/800x950/4A5A1E/FFFFFF?text=Interior+02", alt: "Dining Room", cat: "Interior", tall: true },
  { id: 8, src: "https://placehold.co/800x600/7A9E2E/FFFFFF?text=Garden+02", alt: "Zen Courtyard", cat: "Landscaping", tall: false },
  { id: 9, src: "https://placehold.co/800x600/3A3A3A/FFFFFF?text=Kitchen+02", alt: "Italian Kitchen", cat: "Kitchen", tall: false },
  { id: 10, src: "https://placehold.co/800x850/7A9E2E/FFFFFF?text=Outdoor+02", alt: "Koi Pond", cat: "Outdoor", tall: true },
  { id: 11, src: "https://placehold.co/800x600/4A5A1E/FFFFFF?text=Interior+03", alt: "Kids Room", cat: "Interior", tall: false },
  { id: 12, src: "https://placehold.co/800x600/3A3A3A/FFFFFF?text=Commercial+01", alt: "Restaurant Interior", cat: "Commercial", tall: false },
  { id: 13, src: "https://placehold.co/800x1000/4A5A1E/FFFFFF?text=Interior+04", alt: "Study Room", cat: "Interior", tall: true },
  { id: 14, src: "https://placehold.co/800x600/7A9E2E/FFFFFF?text=Garden+03", alt: "Terrace Garden", cat: "Landscaping", tall: false },
  { id: 15, src: "https://placehold.co/800x600/3A3A3A/FFFFFF?text=Outdoor+03", alt: "Garden Lighting", cat: "Outdoor", tall: false },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = activeCategory === "All" ? gallery : gallery.filter(g => g.cat === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightbox({ src: filtered[index].src, alt: filtered[index].alt });
  };
  const prev = () => {
    const newIdx = (lightboxIndex - 1 + filtered.length) % filtered.length;
    setLightboxIndex(newIdx);
    setLightbox({ src: filtered[newIdx].src, alt: filtered[newIdx].alt });
  };
  const next = () => {
    const newIdx = (lightboxIndex + 1) % filtered.length;
    setLightboxIndex(newIdx);
    setLightbox({ src: filtered[newIdx].src, alt: filtered[newIdx].alt });
  };

  return (
    <div className="bg-[#F9F8F5]">
      {/* Hero */}
      <section className="bg-[#2E3A1E] py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_#7A9E2E_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8D65A]">Visual Stories</span>
          <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-white mt-4 mb-6">Our Gallery</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Browse our curated collection of completed interiors and landscapes — each image a story of transformation.
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

          {/* Masonry */}
          <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-600 ${item.tall ? "h-72 lg:h-96" : "h-48 lg:h-60"}`}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-white/25 border border-white flex items-center justify-center mb-2 mx-auto">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-white text-xs font-bold text-center px-3 leading-tight">{item.alt}</p>
                    </div>
                  </div>
                  <span className="absolute bottom-2 left-2 bg-[#7A9E2E]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {item.cat}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}>
            <motion.div className="relative max-w-4xl w-full" initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setLightbox(null)} className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white">
                <X className="w-5 h-5" />
              </button>
              <img src={lightbox.src} alt={lightbox.alt} className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain" />
              <div className="flex items-center justify-between mt-4 px-2">
                <button onClick={prev} className="text-white/60 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors">← Prev</button>
                <p className="text-white/60 text-sm">{lightbox.alt}</p>
                <button onClick={next} className="text-white/60 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors">Next →</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
