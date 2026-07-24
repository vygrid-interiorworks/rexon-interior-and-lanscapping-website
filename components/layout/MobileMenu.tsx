"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight, Phone, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ name: string; path: string }>;
  pathname: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  pathname,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#F5F5F3] shadow-2xl flex flex-col p-6 lg:hidden font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2B2C2E]/10 pb-4 mb-6">
              <Link href="/" onClick={onClose} className="p-[4px]">
                <Image
                  src="/rexon-logob.png"
                  alt="Rexon Logo"
                  width={130}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#DCE8CC]/50 text-[#2B2C2E] hover:text-[#7CB342] focus:outline-none"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col space-y-4 flex-grow overflow-y-auto pr-2">
              {navLinks.map((link) => {
                const currentHash = typeof window !== "undefined" ? window.location.hash : "";
                const isActive = link.path.includes("#")
                  ? pathname === "/" && currentHash === link.path.substring(link.path.indexOf("#"))
                  : link.path === "/"
                  ? pathname === "/" && (!currentHash || currentHash === "")
                  : pathname === link.path ||
                    (link.path !== "/" && pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={onClose}
                    className={`px-4 py-3 text-base font-medium rounded-xl transition-all ${
                      isActive
                        ? "bg-[#DCE8CC] text-[#2B2C2E] font-semibold"
                        : "text-[#2B2C2E] hover:bg-[#DCE8CC]/40 hover:text-[#7CB342]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Footer / CTA Actions */}
            <div className="mt-auto border-t border-[#2B2C2E]/10 pt-6 space-y-4">
              <Link
                href="/get-quote"
                onClick={onClose}
                className="flex items-center justify-center w-full py-3.5 px-6 text-base font-medium tracking-wider text-white bg-[#2B2C2E] rounded-full hover:bg-[#1A1A1B] transition-all shadow-md focus:outline-none"
              >
                Get Free Quote
                <ArrowRight className="ml-2 w-5 h-5 text-[#7CB342]" />
              </Link>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center py-2.5 px-4 text-sm font-semibold border border-[#2B2C2E]/20 rounded-full text-[#2B2C2E] hover:bg-[#DCE8CC]/40 transition-all"
                >
                  <Phone className="mr-2 w-4 h-4 text-[#7CB342]" />
                  Call Us
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-[#25D366] hover:bg-[#20ba59] transition-all"
                >
                  <WhatsAppIcon className="mr-2 w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
