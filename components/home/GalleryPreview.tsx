"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const galleryItems = [
  { id: 1, src: "https://placehold.co/600x800/4A5A1E/FFFFFF?text=Interior+01", alt: "Living Room Design", cat: "Interior", tall: true },
  { id: 2, src: "https://placehold.co/600x400/7A9E2E/FFFFFF?text=Garden+01", alt: "Tropical Garden", cat: "Landscaping", tall: false },
  { id: 3, src: "https://placehold.co/600x400/3A3A3A/FFFFFF?text=Kitchen+01", alt: "Modular Kitchen", cat: "Kitchen", tall: false },
  { id: 4, src: "https://placehold.co/600x800/7A9E2E/FFFFFF?text=Outdoor+01", alt: "Garden Pathway", cat: "Landscaping", tall: true },
  { id: 5, src: "https://placehold.co/600x400/4A5A1E/FFFFFF?text=Bedroom+01", alt: "Master Bedroom", cat: "Interior", tall: false },
  { id: 6, src: "https://placehold.co/600x400/3A3A3A/FFFFFF?text=Ceiling+01", alt: "False Ceiling Design", cat: "Interior", tall: false },
];

export default function GalleryPreview() {
  const [lightbox, setLightbox] = useState<null | { src: string; alt: string }>(null);

  return (
    <section className="py-24 bg-[#F9F8F5]" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#7A9E2E]">
            Photo Gallery
          </span>
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-[#3A3A3A] mt-3 mb-5">
            Moments of Transformation
          </h2>
          <p className="text-[#6B6B6B] text-base leading-relaxed">
            A glimpse into the worlds we&apos;ve created — spaces that tell stories of craft and care.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer shadow-md"
              onClick={() => setLightbox({ src: item.src, alt: item.alt })}
            >
              <img
                src={item.src}
                alt={item.alt}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  item.tall ? "h-80 md:h-[420px]" : "h-48 md:h-60"
                }`}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/20 border border-white/50 flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">{item.cat}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#7A9E2E] hover:bg-[#4A5A1E] text-white font-bold rounded-full text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View Full Gallery →
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", damping: 22 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white text-[#3A3A3A] hover:bg-[#7A9E2E] hover:text-white flex items-center justify-center transition-colors z-10 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="w-full rounded-2xl shadow-2xl max-h-[85vh] object-contain"
              />
              <p className="text-white/70 text-center text-sm mt-4">{lightbox.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
