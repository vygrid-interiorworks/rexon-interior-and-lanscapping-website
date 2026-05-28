"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Loader2 } from "lucide-react";
import { apiService } from "@/lib/api";

const categories = ["All", "Interior", "Landscaping", "Kitchen", "Outdoor", "Commercial"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  // Firebase Data State
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await apiService.getGallery();
        setGalleryItems(data);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter(g => g.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightbox({ src: filtered[index].image, alt: filtered[index].title });
  };
  const prev = () => {
    const newIdx = (lightboxIndex - 1 + filtered.length) % filtered.length;
    setLightboxIndex(newIdx);
    setLightbox({ src: filtered[newIdx].image, alt: filtered[newIdx].title });
  };
  const next = () => {
    const newIdx = (lightboxIndex + 1) % filtered.length;
    setLightboxIndex(newIdx);
    setLightbox({ src: filtered[newIdx].image, alt: filtered[newIdx].title });
  };

  return (
    <div className="bg-[#F9F8F5]">
      {/* Hero */}
      <section className="bg-[#2E3A1E] pt-[140px] pb-24 lg:pt-[170px] lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_#89B036_0%,_transparent_60%)]" />
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
                className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeCategory === c ? "bg-[#89B036] text-white shadow-lg" : "bg-white text-[#4A4A4A] border border-[#E8E8E8] hover:border-[#89B036] hover:text-[#89B036]"}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#6B6B6B]">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#89B036]" />
              <p>Loading gallery items...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#6B6B6B]">
              <p>No gallery images found in this category.</p>
            </div>
          ) : (
            /* Masonry */
            <motion.div layout className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              <AnimatePresence>
                {filtered.map((item, index) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=800";
                      }}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-600 ${index % 3 === 0 ? "h-72 lg:h-96" : "h-48 lg:h-60"}`}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 rounded-full bg-white/25 border border-white flex items-center justify-center mb-2 mx-auto">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-white text-xs font-bold text-center px-3 leading-tight">{item.title}</p>
                      </div>
                    </div>
                    <span className="absolute bottom-2 left-2 bg-[#89B036]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}>
            <motion.div className="relative max-w-4xl w-full flex flex-col items-center" initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setLightbox(null)} className="absolute -top-12 right-0 z-10 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white">
                <X className="w-5 h-5" />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=800";
                }}
                className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain"
              />
              <div className="flex items-center justify-between w-full mt-4 px-2">
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
