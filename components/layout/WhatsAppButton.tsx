"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/919876543210?text=Hi%20Rexon%20Interiors,%20I%20would%20like%20to%20get%20a%20free%20design%20consultation.";

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20ba59] transition-colors focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      aria-label="Contact us on WhatsApp"
    >
      <MessageSquare className="w-8 h-8 fill-current" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFFFFF] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#7A9E2E]"></span>
      </span>
    </motion.a>
  );
}
