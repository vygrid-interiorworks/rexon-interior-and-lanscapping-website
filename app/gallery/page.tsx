"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Loader2, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { apiService } from "@/lib/api";
import ImageLightbox from "@/components/ui/ImageLightbox";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
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

  const categories = [
    "All",
    ...Array.from(new Set(galleryItems.map((g) => g.category).filter(Boolean))),
  ];

  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter(g => g.category === activeCategory);

  const prev = () => {
    setLightboxIndex((prevIdx) => (prevIdx !== null ? (prevIdx === 0 ? filtered.length - 1 : prevIdx - 1) : 0));
  };
  const next = () => {
    setLightboxIndex((prevIdx) => (prevIdx !== null ? (prevIdx + 1) % filtered.length : 0));
  };

  const activeThumbRef = useRef<HTMLButtonElement | null>(null);

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
    <div className="bg-[#F5F5F3] font-sans">
      {/* ── Luxury Hero Banner ── */}
      <section className="bg-gradient-to-b from-[#18191B] via-[#1E2023] to-[#212224] pt-[140px] pb-24 lg:pt-[170px] lg:pb-28 relative overflow-hidden border-b border-[#7CB342]/25 mb-6">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#7CB342_1px,transparent_1px),linear-gradient(to_bottom,#7CB342_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#7CB342]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#7CB342]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-megalky font-normal text-white leading-[1.15] tracking-wide mb-6">
            Our Photo <span className="italic text-[#DCE8CC] font-light">Gallery</span>
          </h1>

          <div className="flex items-center justify-center gap-4 my-5">
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#7CB342]/60 to-[#7CB342]" />
            <div className="w-6 h-6 rounded-full bg-[#7CB342]/20 border border-[#7CB342]/40 flex items-center justify-center text-[#7CB342]">
              <Leaf className="w-3 h-3" />
            </div>
            <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#7CB342]/60 to-[#7CB342]" />
          </div>

          <p className="text-[#DCE8CC]/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans font-light">
            Browse our curated collection of completed interiors and landscapes — each image a story of craft and care.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(c => (
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

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#58595B] font-sans">
              <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#7CB342]" />
              <p>Loading gallery items...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#58595B] font-sans">
              <p>No gallery images found in this category.</p>
            </div>
          ) : (
            /* Masonry Cards */
            <motion.div layout className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
              <AnimatePresence>
                {filtered.map((item, index) => (
                  <motion.div
                    key={item.id || item._id || index}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="break-inside-avoid group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border-2 border-white bg-white"
                    onClick={() => setLightboxIndex(index)}
                  >
                    <img
                      src={item.image || item.img}
                      alt="Gallery Photo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=800";
                      }}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-600 ${index % 3 === 0 ? "h-72 lg:h-96" : "h-48 lg:h-60"}`}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-300 flex flex-col items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-11 h-11 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white">
                          <ZoomIn className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Reusable Portal Lightbox */}
      <ImageLightbox
        isOpen={lightboxIndex !== null}
        currentIndex={lightboxIndex ?? 0}
        items={filtered}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
