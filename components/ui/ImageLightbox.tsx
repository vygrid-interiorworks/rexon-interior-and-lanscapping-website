"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type ImageItem = {
  img?: string;
  image?: string;
  title?: string;
  [key: string]: any;
};

type ImageLightboxProps = {
  isOpen: boolean;
  currentIndex: number;
  items: ImageItem[];
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function ImageLightbox({
  isOpen,
  currentIndex,
  items,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const activeThumbRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (isOpen && activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isOpen, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % items.length);
      } else if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, items.length, onNavigate, onClose]);

  if (!mounted || !isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];
  const imgSrc = currentItem?.img || currentItem?.image || "";

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  const portalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[999999] w-screen h-screen bg-black/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-6 overflow-hidden select-none"
      >
        {/* Background Click to Close */}
        <div
          className="absolute inset-0 z-0"
          onClick={onClose}
        />

        {/* Top Header Bar */}
        <div className="relative z-20 flex items-center justify-between max-w-7xl mx-auto w-full pt-2 px-2 sm:px-4">
          <div className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-white/90 text-xs sm:text-sm font-medium font-sans">
            Photo <span className="text-[#7CB342] font-bold">{currentIndex + 1}</span> of {items.length}
          </div>

          <button
            onClick={onClose}
            className="p-2.5 bg-white/10 hover:bg-[#7CB342] text-white rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 cursor-pointer shadow-lg hover:scale-110"
            aria-label="Close photo lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Center Main Image View with Navigation Arrows */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-3 overflow-hidden">
          {/* Left Arrow Button */}
          {items.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-8 z-30 p-3.5 sm:p-4 bg-black/50 hover:bg-[#7CB342] text-white rounded-full transition-all duration-300 backdrop-blur-md border border-white/30 cursor-pointer shadow-2xl hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          )}

          {/* Main Image Display */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={imgSrc}
              alt={`Photo ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="max-h-[62vh] sm:max-h-[66vh] max-w-[85vw] sm:max-w-[80vw] object-contain rounded-2xl shadow-2xl border border-white/15 bg-black/40"
            />
          </AnimatePresence>

          {/* Right Arrow Button */}
          {items.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-8 z-30 p-3.5 sm:p-4 bg-black/50 hover:bg-[#7CB342] text-white rounded-full transition-all duration-300 backdrop-blur-md border border-white/30 cursor-pointer shadow-2xl hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          )}
        </div>

        {/* Bottom Scrollable Thumbnails Bar */}
        {items.length > 1 && (
          <div className="relative z-20 w-full max-w-5xl mx-auto bg-black/60 backdrop-blur-md rounded-2xl border border-white/15 p-2 sm:p-3 shadow-2xl">
            <div className="flex justify-start sm:justify-center gap-2.5 overflow-x-auto scrollbar-thin scrollbar-thumb-[#7CB342] scrollbar-track-black/20 py-1 px-1">
              {items.map((item, idx) => {
                const isSelected = currentIndex === idx;
                const thumbSrc = item.img || item.image || "";
                return (
                  <button
                    key={idx}
                    ref={isSelected ? activeThumbRef : null}
                    onClick={() => onNavigate(idx)}
                    className={`relative w-14 h-11 sm:w-18 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 cursor-pointer ${
                      isSelected
                        ? "border-[#7CB342] scale-105 shadow-xl ring-2 ring-[#7CB342]/60 opacity-100"
                        : "border-transparent opacity-40 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={thumbSrc}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(portalContent, document.body);
}
