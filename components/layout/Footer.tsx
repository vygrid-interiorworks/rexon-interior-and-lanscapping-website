"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Globe,
  Video,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  MessageSquare,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/919876543210?text=Hi%20Rexon%20Interiors,%20I%20would%20like%20to%20get%20a%20free%20design%20consultation.",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <footer className="bg-[#2E3A1E] text-[#D6D6D6] pt-16 pb-8 border-t border-[#4A5A1E]/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Column 1: About */}
            <div className="space-y-6">
              {/* Logo in light container with 12px minimum padding */}
              <div className="inline-block bg-[#FFFFFF] rounded-xl p-[14px] shadow-md">
                <Image
                  src="/rexon_2d_logo.png"
                  alt="Rexon Interiors & Landscaping"
                  width={150}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-sm leading-relaxed text-[#D6D6D6]/80">
                Rexon Interiors and Landscaping is a premium service provider delivering state-of-the-art interior spaces and beautiful landscape designs across Kerala. Transforming spaces inside and out.
              </p>
              {/* Social Icons */}
              <div className="flex items-center space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#FFFFFF]/10 hover:bg-[#7A9E2E] flex items-center justify-center text-white hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Camera className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#FFFFFF]/10 hover:bg-[#7A9E2E] flex items-center justify-center text-white hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Globe className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#FFFFFF]/10 hover:bg-[#7A9E2E] flex items-center justify-center text-white hover:text-white transition-all duration-300"
                  aria-label="YouTube"
                >
                  <Video className="w-5 h-5" />
                </a>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-10 h-10 rounded-full bg-[#FFFFFF]/10 hover:bg-[#25D366] flex items-center justify-center text-white hover:text-white transition-all duration-300 focus:outline-none"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 border-b-2 border-[#7A9E2E] pb-2 inline-block">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "About Us", path: "/about" },
                  { name: "Services", path: "/services" },
                  { name: "Projects / Portfolio", path: "/projects" },
                  { name: "Gallery", path: "/gallery" },
                  { name: "Testimonials", path: "/testimonials" },
                  { name: "Contact Us", path: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-sm hover:text-[#7A9E2E] transition-colors flex items-center"
                    >
                      <span className="mr-2 text-[#7A9E2E]">›</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div>
              <h3 className="text-lg font-bold text-white mb-6 border-b-2 border-[#7A9E2E] pb-2 inline-block">
                Our Services
              </h3>
              <ul className="space-y-3">
                {[
                  "Interior Design",
                  "Landscaping",
                  "Modular Kitchen",
                  "Living Room Design",
                  "Bedroom Design",
                  "Terrace Landscaping",
                  "Garden Design",
                ].map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="text-sm hover:text-[#7A9E2E] transition-colors flex items-center"
                    >
                      <span className="mr-2 text-[#7A9E2E]">›</span>
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-6 border-b-2 border-[#7A9E2E] pb-2 inline-block">
                Contact Info
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#7A9E2E] mr-3 shrink-0 mt-0.5" />
                  <span>
                    Rexon Tower, Near NH Bypass,
                    <br />
                    Kochi, Kerala - 682024
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-[#7A9E2E] mr-3 shrink-0" />
                  <a href="tel:+919876543210" className="hover:text-[#7A9E2E] transition-colors">
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-[#7A9E2E] mr-3 shrink-0" />
                  <a href="mailto:info@rexoninteriors.com" className="hover:text-[#7A9E2E] transition-colors">
                    info@rexoninteriors.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#4A5A1E]/30 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#D6D6D6]/60">
            <p>
              &copy; {currentYear} Rexon Interiors and Landscaping. All Rights
              Reserved.
            </p>
            <p className="mt-4 md:mt-0">
              Designed by{" "}
              <a
                href="https://github.com/vygrid-interiorworks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7A9E2E] hover:underline"
              >
                Vygrid Interiorworks
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA bar (visible only on mobile viewports under lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF] shadow-[0_-4px_10px_rgba(0,0,0,0.1)] border-t border-[#3A3A3A]/10 px-4 py-3 flex items-center justify-between">
        <a
          href="tel:+919876543210"
          className="flex-1 mr-3 flex items-center justify-center py-2.5 px-4 text-sm font-bold border border-[#7A9E2E] rounded-full text-[#7A9E2E] hover:bg-[#7A9E2E]/10 transition-colors focus:outline-none"
        >
          <Phone className="mr-2 w-4 h-4" />
          Call Now
        </a>
        <Link
          href="/get-quote"
          className="flex-1 flex items-center justify-center py-2.5 px-4 text-sm font-bold text-white bg-[#7A9E2E] rounded-full hover:bg-[#4A5A1E] transition-colors shadow-md focus:outline-none"
        >
          Get Free Quote
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>

      {/* Extra space at bottom on mobile to prevent sticky bar overlaying content */}
      <div className="lg:hidden h-16" />
    </>
  );
}
