"use client";

import { useState, useEffect } from "react";
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
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { apiService } from "@/lib/api";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [settings, setSettings] = useState({
    phone: "+91 98765 43210",
    email: "info@rexoninteriors.com",
    address: "Rexon Tower, Near NH Bypass,\nKochi, Kerala - 682024",
    whatsapp: "919876543210",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  });

  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const data = await apiService.getSettings();
        if (data) {
          setSettings({
            phone: data.phone || "+91 98765 43210",
            email: data.email || "info@rexoninteriors.com",
            address: data.address || "Rexon Tower, Near NH Bypass,\nKochi, Kerala - 682024",
            whatsapp: data.whatsapp || "919876543210",
            instagram: data.instagram || "https://instagram.com",
            facebook: data.facebook || "https://facebook.com",
            youtube: data.youtube || "https://youtube.com",
          });
        }
      } catch (err) {
        console.error("Failed to load footer settings:", err);
      }

      try {
        const fetchedServices = await apiService.getServices();
        if (fetchedServices && Array.isArray(fetchedServices)) {
          setDbServices(fetchedServices);
        }
      } catch (err) {
        console.error("Failed to load services for footer:", err);
      }
    };
    fetchFooterData();
  }, []);

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Rexon%20Interiors,%20I%20would%20like%20to%20get%20a%20free%20design%20consultation.`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <footer className="bg-[#2B2C2E] text-[#DCE8CC] pt-16 pb-8 border-t border-[#7CB342]/20 relative z-10 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Column 1: About */}
            <div className="space-y-6">
              {/* Logo in light container with 12px minimum padding */}
              <div className="inline-block bg-[#FFFFFF] rounded-xl p-[14px] shadow-md">
                <Image
                  src="/rexon-logob.png"
                  alt="Rexon Interiors & Landscaping"
                  width={150}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-sm leading-relaxed text-[#DCE8CC]/80">
                Rexon Interiors and Landscaping is a premium service provider delivering state-of-the-art interior spaces and beautiful landscape designs across Kerala. Transforming spaces inside and out.
              </p>
              {/* Social Icons */}
              <div className="flex items-center space-x-4">
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#FFFFFF]/10 hover:bg-[#7CB342] flex items-center justify-center text-white hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Camera className="w-5 h-5" />
                </a>
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#FFFFFF]/10 hover:bg-[#7CB342] flex items-center justify-center text-white hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Globe className="w-5 h-5" />
                </a>
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#FFFFFF]/10 hover:bg-[#7CB342] flex items-center justify-center text-white hover:text-white transition-all duration-300"
                  aria-label="YouTube"
                >
                  <Video className="w-5 h-5" />
                </a>
                <button
                  onClick={handleWhatsAppClick}
                  className="w-10 h-10 rounded-full bg-[#FFFFFF]/10 hover:bg-[#25D366] flex items-center justify-center text-white hover:text-white transition-all duration-300 focus:outline-none cursor-pointer"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-xl font-megalky font-bold text-white mb-6 border-b-2 border-[#7CB342] pb-2 inline-block">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "About Us", path: "/about" },
                  { name: "Services", path: "/services" },
                  { name: "Packages", path: "/packages" },
                  { name: "Projects / Portfolio", path: "/projects" },
                  { name: "Contact Us", path: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-sm text-[#DCE8CC]/90 hover:text-[#7CB342] transition-colors flex items-center"
                    >
                      <span className="mr-2 text-[#7CB342]">›</span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Dynamic Services from DB */}
            <div>
              <h3 className="text-xl font-megalky font-bold text-white mb-6 border-b-2 border-[#7CB342] pb-2 inline-block">
                Our Services
              </h3>
              <ul className="space-y-3">
                {dbServices.length > 0 ? (
                  dbServices.map((service) => {
                    const title = service.title || service.name || "Service";
                    const slug = service.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                    return (
                      <li key={service._id || slug}>
                        <Link
                          href={`/services?id=${encodeURIComponent(slug)}`}
                          className="text-sm text-[#DCE8CC]/90 hover:text-[#7CB342] transition-colors flex items-center"
                        >
                          <span className="mr-2 text-[#7CB342]">›</span>
                          {title}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li>
                    <Link
                      href="/services"
                      className="text-sm text-[#DCE8CC]/90 hover:text-[#7CB342] transition-colors flex items-center"
                    >
                      <span className="mr-2 text-[#7CB342]">›</span>
                      Browse All Services
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-megalky font-bold text-white mb-6 border-b-2 border-[#7CB342] pb-2 inline-block">
                Contact Info
              </h3>
              <ul className="space-y-4 text-sm text-[#DCE8CC]/90">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#7CB342] mr-3 shrink-0 mt-0.5" />
                  <span className="whitespace-pre-line">
                    {settings.address}
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-[#7CB342] mr-3 shrink-0" />
                  <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#7CB342] transition-colors">
                    {settings.phone}
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-[#7CB342] mr-3 shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-[#7CB342] transition-colors">
                    {settings.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#7CB342]/20 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#DCE8CC]/60">
            <p>
              &copy; {currentYear} Rexon Interiors and Landscaping. All Rights
              Reserved.
            </p>
            <p className="mt-4 md:mt-0">
              Designed by{" "}
              <a
                href="https://vygrid.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7CB342] hover:underline font-semibold"
              >
                Vygrid Digital Studio
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA bar (visible only on mobile viewports under lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#2B2C2E] shadow-[0_-4px_10px_rgba(0,0,0,0.2)] border-t border-[#7CB342]/20 px-4 py-3 flex items-center justify-between">
        <a
          href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
          className="flex-1 mr-3 flex items-center justify-center py-2.5 px-4 text-sm font-bold border border-[#7CB342] rounded-full text-[#7CB342] hover:bg-[#7CB342]/10 transition-colors focus:outline-none"
        >
          <Phone className="mr-2 w-4 h-4" />
          Call Now
        </a>
        <Link
          href="/get-quote"
          className="flex-1 flex items-center justify-center py-2.5 px-4 text-sm font-bold text-white bg-[#7CB342] rounded-full hover:bg-[#689B32] transition-colors shadow-md focus:outline-none"
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
