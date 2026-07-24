"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash);
    };
    updateHash();
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("popstate", updateHash);
    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Packages", path: "/packages" },
    { name: "Projects", path: "/projects" },
    { name: "Contact Us", path: "/contact" },
  ];

  const checkIsActive = (linkPath: string) => {
    if (linkPath.includes("#")) {
      const hashPart = linkPath.substring(linkPath.indexOf("#"));
      return pathname === "/" && activeHash === hashPart;
    }
    if (linkPath === "/") {
      return pathname === "/" && (!activeHash || activeHash === "" || activeHash === "#");
    }
    return pathname === linkPath || (linkPath !== "/" && pathname.startsWith(linkPath));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "bg-[#F5F5F3]/95 backdrop-blur-md shadow-sm py-3"
            : "bg-[#F5F5F3] py-4 border-b border-[#2B2C2E]/10"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center focus:outline-none p-1 sm:p-[12px]">
              <Image
                src="/rexon-logob.png"
                alt="Rexon Logo"
                width={260}
                height={86}
                className="h-14 sm:h-20 lg:h-22 w-auto object-contain transition-all duration-300"
                priority
              />
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center space-x-8 font-sans">
              {navLinks.map((link) => {
                const isActive = checkIsActive(link.path);
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => {
                      if (link.path.includes("#")) {
                        setActiveHash(link.path.substring(link.path.indexOf("#")));
                      } else {
                        setActiveHash("");
                      }
                    }}
                    className={`relative text-sm font-medium tracking-wide transition-colors hover:text-[#7CB342] focus:outline-none ${isActive ? "text-[#7CB342] font-semibold" : "text-[#2B2C2E]"
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-[#7CB342] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA: Solid Dark Button per header pattern #1 */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium tracking-wider text-white bg-[#2B2C2E] rounded-full hover:bg-[#1A1A1B] transition-all duration-300 shadow-sm hover:shadow focus:outline-none"
              >
                Get Free Quote
                <ArrowRight className="ml-2 w-4 h-4 text-[#7CB342]" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-[#2B2C2E] hover:text-[#7CB342] focus:outline-none"
                aria-label="Open Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-in Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        pathname={pathname}
      />
    </>
  );
}
