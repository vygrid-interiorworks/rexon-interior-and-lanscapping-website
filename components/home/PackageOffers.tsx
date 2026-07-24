"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { apiService } from "@/lib/api";
import {
  HelpCircle,
  PlayCircle,
  Phone,
  ChevronRight,
  CheckSquare,
  BadgeCheck,
  Gem,
  Clock3,
  Headphones,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────

type Room = { room: string; items: string[] };

type Package = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  rooms: Room[];
};

const staticPackages: Package[] = [
  {
    id: "harmony",
    name: "HARMONY",
    tagline: "Smart interiors for a comfortable 2BHK home",
    image: "/images/package-interior-hero.jpg",
    rooms: [
      {
        room: "Foyer",
        items: ["Shoe rack unit with cabinets and shutters"],
      },
      {
        room: "Living Room",
        items: ["Premium TV display unit with aluminium profile & glass shutter"],
      },
      {
        room: "Dining Room",
        items: [
          "6 Seater dining table",
          "3 dining chairs",
          "1 dining bench (3-seater)",
        ],
      },
      {
        room: "Master Bedroom",
        items: [
          "3-door soft-close hinged wardrobe",
          "Queen size bed with headboard",
          "2 open bedside tables",
        ],
      },
      {
        room: "Guest Bedroom",
        items: [
          "3-door soft-close hinged wardrobe",
          "Queen size bed with headboard",
          "2 open bedside tables",
        ],
      },
      {
        room: "Modular Kitchen",
        items: [
          "Bottom & overhead cabinets",
          "6 Hettich accessories (German-made, 15-yr warranty)",
          "Hood & Hob by Faber",
        ],
      },
    ],
  },
  {
    id: "signature",
    name: "SIGNATURE",
    tagline: "Refined design & full woodwork for a 3BHK",
    image: "/images/package-interior-hero.jpg",
    rooms: [
      {
        room: "Foyer",
        items: ["Shoe rack unit with cabinets and shutters"],
      },
      {
        room: "Living Room",
        items: [
          "Premium TV display unit with aluminium profile & glass shutter",
          "Prayer unit with open storage",
        ],
      },
      {
        room: "Dining Room",
        items: [
          "6-seater dining table",
          "3 dining chairs",
          "1 dining bench",
          "Custom living-dining partition",
        ],
      },
      {
        room: "Master Bedroom",
        items: [
          "3-door soft-close hinged wardrobe",
          "Dressing unit with cabinet & drawer",
          "Custom study table",
          "Queen size bed with headboard",
          "2 bedside tables",
        ],
      },
      {
        room: "Kids Room",
        items: [
          "Wardrobe up to ceiling",
          "Custom study table",
          "Queen size bed with headboard",
          "1 bedside table",
        ],
      },
      {
        room: "Guest Bedroom",
        items: [
          "Wardrobe up to ceiling",
          "Queen size bed with headboard",
          "1 bedside table",
        ],
      },
      {
        room: "Modular Kitchen",
        items: [
          "Top & bottom cabinets",
          "6 Hettich accessories",
          "Hood & Hob by Faber",
          "Accessories: Cutlery tray, plain basket, plate rack, bottle pull-out, waste bin pull-out, detergent holder",
        ],
      },
    ],
  },
  {
    id: "grandeur",
    name: "GRANDEUR",
    tagline: "Luxury turnkey interiors for a premium 3BHK",
    image: "/images/package-interior-hero.jpg",
    rooms: [
      {
        room: "Foyer",
        items: ["Shoe rack & ledges", "Round mirror", "Cement wall texture"],
      },
      {
        room: "Living Room",
        items: [
          "Premium TV display unit",
          "Prayer unit",
          "Curtains with lining",
          "Super premium wall panelling",
          "Decorative clock",
          "3-seater sofa set with lounge",
          "4 cushions",
          "Designer carpet",
          "Centre table",
        ],
      },
      {
        room: "Dining Room",
        items: [
          "6-seater dining table",
          "3 dining chairs",
          "1 dining bench",
          "Living-dining partition",
          "Wash area with frameless projected mirror",
          "Cement wall texture",
        ],
      },
      {
        room: "Master Bedroom",
        items: [
          "Soft-close hinged wardrobe",
          "Dressing unit",
          "Custom study unit",
          "King size bed with headboard & bottom drawer",
          "2 double-drawer bedside tables",
          "Premium Roman blinds",
          "Single accent chair",
          "3 rolls wallpaper",
          "6\" Peps mattress",
          "Bed setting",
        ],
      },
      {
        room: "Kids Bedroom",
        items: [
          "Queen size bed",
          "2 bedside tables",
          "Bed setting",
          "Mattress",
          "Wardrobe",
          "Custom study unit",
          "3 rolls wallpaper",
        ],
      },
      {
        room: "Guest Bedroom",
        items: [
          "Queen size bed",
          "2 bedside tables",
          "Premium Roman blinds",
          "3 rolls wallpaper",
          "Mattress",
          "Bed setting",
          "Wardrobe",
          "1 coat primer + 2 coat premium emulsion",
        ],
      },
      {
        room: "Kitchen",
        items: [
          "Top & bottom cabinets",
          "6 Hettich accessories",
          "Hood & Hob by Faber",
          "Accessories: Cutlery tray, plain basket, plate rack, bottle pull-out, waste bin pull-out, detergent holder",
        ],
      },
    ],
  },
];

const trustBadges = [
  { icon: BadgeCheck, label: "100% Customised" },
  { icon: Gem, label: "Premium Quality" },
  { icon: Clock3, label: "On-Time Delivery" },
  { icon: Headphones, label: "Lifetime Service Support" },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function EnquiryBadge({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex items-center justify-between mt-3 pt-3 border-t border-current/10">
      <span className={`text-xs font-medium ${isActive ? "text-[#DCE8CC]" : "text-[#58595B]"}`}>
        Tailored Solution
      </span>
      <span
        className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 transition-all ${isActive
            ? "bg-[#7CB342] text-white"
            : "bg-[#7CB342]/15 text-[#7CB342] group-hover:bg-[#7CB342] group-hover:text-white"
          }`}
      >
        Enquire
        <ChevronRight className="w-3 h-3" />
      </span>
    </div>
  );
}

function RoomsList({ rooms }: { rooms: Room[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
      {rooms.map((room) => (
        <div key={room.room}>
          <h4 className="text-sm font-bold text-[#2E3A1E] uppercase tracking-wide mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#89B036] flex-shrink-0" />
            {room.room}
          </h4>
          <ul className="space-y-1.5 pl-3.5">
            {room.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckSquare className="w-3.5 h-3.5 text-[#89B036] mt-0.5 flex-shrink-0" />
                <span className="text-xs text-[#4A4A4A] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function PackageOffers() {
  const [activeId, setActiveId] = useState<string>("signature");
  const [packages, setPackages] = useState<Package[]>(staticPackages);

  useEffect(() => {
    const load = async () => {
      try {
        const remote = await apiService.getPackages();
        if (remote && remote.length > 0) {
          const normalized: Package[] = remote.map((p: any) => ({
            id: p._id,
            name: p.name || "",
            tagline: p.tagline || "",
            image: p.image || "/images/package-interior-hero.jpg",
            rooms: (p.rooms || []).map((r: any) => ({
              room: r.room || "",
              items: Array.isArray(r.items) ? r.items : [r.items].filter(Boolean),
            })),
          }));
          setPackages(normalized);
          setActiveId((prev) =>
            normalized.some((p) => p.id === prev) ? prev : normalized[0]?.id || prev
          );
        }
      } catch (e) {
        // Silently fall back to static
      }
    };
    load();
  }, []);

  const activePackage = packages.find((p) => p.id === activeId) ?? packages[0];

  return (
    <section
      id="packages"
      className="py-14 sm:py-16 bg-[#F5F5F3] relative overflow-hidden font-sans border-t border-[#DCE8CC]"
      aria-label="Package Offers"
    >
      {/* Subtle background shape */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#DCE8CC] filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#DCE8CC]/60 filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7CB342]">
            Package Solutions
          </span>
          <h2 className="text-4xl lg:text-5xl font-megalky font-normal text-[#2B2C2E] mt-3 mb-5">
            Choose Your Perfect Package
          </h2>
          <p className="text-[#58595B] text-base leading-relaxed font-sans">
            Explore curated design solutions tailored to your space. Every package is
            fully customisable to match your budget and specific requirements.
          </p>
        </motion.div>

        {/* ── Tab Selector Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
          role="tablist"
          aria-label="Package selection"
        >
          {packages.map((pkg, i) => {
            const isActive = pkg.id === activeId;
            return (
              <motion.button
                key={pkg.id}
                id={`tab-${pkg.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${pkg.id}`}
                onClick={() => setActiveId(pkg.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: isActive ? 0 : -3 }}
                className={`
                  group flex-1 relative rounded-2xl border-2 p-5 text-left transition-all duration-300 cursor-pointer focus:outline-none flex flex-col justify-between
                  ${isActive
                    ? "bg-[#2B2C2E] border-[#7CB342] shadow-xl"
                    : "bg-white border-[#DCE8CC] hover:border-[#7CB342]/60 hover:shadow-md"
                  }
                `}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#7CB342] rounded-t-2xl" />
                )}

                {/* "Most Popular" badge on middle package */}
                {i === 1 && packages.length === 3 && (
                  <span
                    className={`absolute -top-3 right-4 text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full shadow ${isActive
                        ? "bg-[#7CB342] text-white"
                        : "bg-[#DCE8CC] text-[#2B2C2E]"
                      }`}
                  >
                    Most Popular
                  </span>
                )}

                <div>
                  <p
                    className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isActive ? "text-[#7CB342]" : "text-[#58595B]/70"
                      }`}
                  >
                    {i === 0 ? "Starter" : i === 1 ? "Best Value" : "Premium"}
                  </p>
                  <h3
                    className={`text-lg font-megalky font-bold mb-1 ${isActive ? "text-white" : "text-[#2B2C2E]"
                      }`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`text-xs mb-3 leading-snug font-sans ${isActive ? "text-[#DCE8CC]" : "text-[#58595B]"
                      }`}
                  >
                    {pkg.tagline}
                  </p>
                </div>

                {/* Enquiry Action Badge */}
                <EnquiryBadge isActive={isActive} />
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Detail Panel in #DCE8CC Tinted Background ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            id={`panel-${activeId}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeId}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="bg-[#DCE8CC]/50 rounded-3xl overflow-hidden border border-[#DCE8CC] shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Left: Image */}
              <div className="lg:col-span-2 relative min-h-[280px] lg:min-h-[560px]">
                <Image
                  src={activePackage.image}
                  alt={`${activePackage.name} package interior preview`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 via-transparent to-transparent" />

                {/* Action button on image (mobile only) */}
                <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#7CB342] hover:bg-[#689F38] text-white text-sm font-semibold rounded-xl shadow-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Enquire for {activePackage.name}
                  </Link>
                </div>

                {/* Customized solution badge */}
                <div className="absolute top-6 left-6 bg-[#7CB342] text-white text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                  100% Customized Solutions
                </div>
              </div>

              {/* Right: Content overlay panel */}
              <div className="lg:col-span-3 p-7 lg:p-10 flex flex-col bg-white/90 backdrop-blur-sm">
                {/* Package name + Enquire button (desktop) */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#7CB342]">
                      Package Details
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-megalky font-bold text-[#2B2C2E] mt-1">
                      {activePackage.name}
                    </h3>
                    <p className="text-sm text-[#58595B] mt-1 font-sans">
                      {activePackage.tagline}
                    </p>
                  </div>

                  {/* Desktop Enquiry Action */}
                  <div className="hidden lg:flex flex-col items-end gap-1.5">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#7CB342] hover:bg-[#689F38] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Enquire Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <span className="text-[11px] text-[#58595B] font-medium">
                      Tailored to your requirements
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#DCE8CC] mb-8" />

                {/* Room-by-room inclusions */}
                <div className="flex-1 overflow-auto">
                  <h4 className="text-sm font-bold text-[#3A3A3A] uppercase tracking-wider mb-5">
                    What&apos;s Included
                  </h4>
                  <RoomsList rooms={activePackage.rooms} />
                </div>

                {/* Footnote */}
                <p className="text-[10px] text-[#9B9B9B] mt-6 italic">
                  *Package specifications are customized to your exact floor plan, materials preference, and design vision.
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-[#E0E0E0] my-6" />

                {/* CTA Links */}
                <div className="flex flex-wrap gap-5">
                  <Link
                    href="/#faq"
                    className="group flex items-center gap-2 text-sm font-medium text-[#2B2C2E] hover:text-[#7CB342] transition-colors duration-200"
                    aria-label="Frequently Asked Questions"
                  >
                    <HelpCircle className="w-4 h-4 text-[#7CB342] flex-shrink-0" />
                    Frequently Asked Questions
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 text-[#7CB342]" />
                  </Link>

                  <Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm font-medium text-[#2B2C2E] hover:text-[#7CB342] transition-colors duration-200"
                    aria-label="View Package Video on YouTube"
                  >
                    <PlayCircle className="w-4 h-4 text-[#7CB342] flex-shrink-0" />
                    View Package Video
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 text-[#7CB342]" />
                  </Link>

                  <Link
                    href="/contact"
                    className="group flex items-center gap-2 text-sm font-medium text-[#2B2C2E] hover:text-[#7CB342] transition-colors duration-200"
                    aria-label="Contact us for package details"
                  >
                    <Phone className="w-4 h-4 text-[#7CB342] flex-shrink-0" />
                    Contact Us for More Details
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 text-[#7CB342]" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Trust Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-14 rounded-3xl bg-[#2B2C2E] relative overflow-hidden px-8 py-10 shadow-xl border border-[#7CB342]/20"
        >
          {/* Background decorative blobs */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-[#7CB342] filter blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#7CB342] filter blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
            {/* Heading */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-megalky font-normal text-white leading-tight">
                Tailored Interior Designs &amp;{" "}
                <span className="text-[#7CB342]">Custom Quotes for Every Budget</span>
              </h3>
            </div>

            {/* Divider (desktop) */}
            <div className="hidden lg:block w-px h-14 bg-white/20 mx-10 flex-shrink-0" />

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-6 lg:gap-8">
              {trustBadges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#7CB342]/20 border border-[#7CB342]/30 flex items-center justify-center group-hover:bg-[#7CB342] group-hover:text-white transition-colors duration-300 text-[#7CB342]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-medium text-[#DCE8CC] text-center leading-snug max-w-[80px]">
                      {badge.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

