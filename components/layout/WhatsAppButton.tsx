"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = "https://wa.me/919876543210?text=Hi%20Rexon%20Interiors,%20I%20would%20like%20to%20get%20a%20free%20design%20consultation.";
  const instagramUrl = "https://www.instagram.com/rexon_interiors";
  const youtubeUrl = "https://www.youtube.com/@rexon_interiors";

  const socialLinks = [
    {
      name: "WhatsApp",
      url: whatsappUrl,
      color: "#25D366",
      hoverColor: "#1ebd5b",
      icon: <WhatsAppIcon className="w-5 h-5 fill-current" />,
      label: "Chat on WhatsApp",
    },
    {
      name: "Instagram",
      url: instagramUrl,
      color: "#E4405F",
      hoverColor: "#d33352",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      label: "Follow on Instagram",
    },
    {
      name: "YouTube",
      url: youtubeUrl,
      color: "#FF0000",
      hoverColor: "#e60000",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.54a29 29 0 0 0 .46 5.12 2.78 2.78 0 0 0 1.95 1.96c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.12 29 29 0 0 0-.46-5.12z"></path>
          <polygon points="9.75 15.02 15.5 11.54 9.75 8.06 9.75 15.02"></polygon>
        </svg>
      ),
      label: "Watch on YouTube",
    },
  ];

  return (
    <div className="fixed bottom-20 right-6 md:bottom-6 md:right-6 z-[9999] flex flex-col items-center">
      {/* Sub social bubbles fanning out upwards */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-center space-y-3 mb-3">
            {socialLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: (socialLinks.length - 1 - idx) * 0.08,
                }}
                className="relative flex items-center justify-center w-11 h-11 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer"
                style={{ backgroundColor: link.color }}
                aria-label={link.label}
              >
                {link.icon}
                {/* Tooltip on hover */}
                <span className="absolute right-14 bg-black/75 backdrop-blur-xs text-[10px] text-white px-2.5 py-1 rounded-md font-semibold tracking-wide uppercase opacity-0 pointer-events-none hover:opacity-100 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
                  {link.name}
                </span>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main expandable FAB toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-[#89B036] hover:bg-[#546622] text-white rounded-full shadow-2xl transition-colors focus:outline-none focus:ring-4 focus:ring-[#89B036]/40 cursor-pointer relative"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle contact menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </motion.div>

        {/* Small pinging indicator if closed */}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#FF0000]"></span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
