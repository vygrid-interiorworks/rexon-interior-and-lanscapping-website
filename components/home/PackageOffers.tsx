"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────

type Room = { room: string; items: string[] };

type Package = {
  id: string;
  name: string;
  tagline: string;
  originalPrice: string;
  offerPrice: string;
  image: string;
  rooms: Room[];
};

const packages: Package[] = [
  {
    id: "harmony",
    name: "HARMONY",
    tagline: "Smart interiors for a comfortable 2BHK home",
    originalPrice: "₹9.50 Lac",
    offerPrice: "₹6.85 Lac*",
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
    originalPrice: "₹17.20 Lac",
    offerPrice: "₹12.35 Lac*",
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
    originalPrice: "₹26.50 Lac",
    offerPrice: "₹18.55 Lac*",
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

function PriceDisplay({
  original,
  offer,
  size = "md",
}: {
  original: string;
  offer: string;
  size?: "sm" | "md" | "lg";
}) {
  const originalSize =
    size === "lg"
      ? "text-base"
      : size === "md"
      ? "text-sm"
      : "text-xs";
  const offerSize =
    size === "lg"
      ? "text-3xl lg:text-4xl"
      : size === "md"
      ? "text-xl"
      : "text-base";

  return (
    <div className="flex flex-col gap-0.5">
      <span
        className={`${originalSize} text-[#6B6B6B] line-through leading-none`}
      >
        {original}
      </span>
      <span
        className={`${offerSize} font-extrabold text-[#89B036] leading-none font-playfair`}
      >
        {offer}
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
  const activePackage = packages.find((p) => p.id === activeId)!;

  return (
    <section
      id="packages"
      className="py-24 bg-white relative overflow-hidden"
      aria-label="Package Offers"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#89B036]/5 filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#546622]/5 filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#89B036]">
            Package Offers
          </span>
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-[#3A3A3A] mt-3 mb-5">
            Choose Your Perfect Package
          </h2>
          <p className="text-[#4A4A4A] text-base leading-relaxed">
            Choose a package tailored to your space and vision. All packages are
            fully customisable.
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
                  group flex-1 relative rounded-2xl border-2 p-5 text-left transition-all duration-300 cursor-pointer focus:outline-none
                  ${
                    isActive
                      ? "bg-[#2E3A1E] border-[#89B036] shadow-xl shadow-[#89B036]/15"
                      : "bg-white border-[#E8E8E8] hover:border-[#89B036]/50 hover:shadow-md"
                  }
                `}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#89B036] rounded-t-2xl" />
                )}

                {/* "Most Popular" badge on Signature */}
                {pkg.id === "signature" && (
                  <span
                    className={`absolute -top-3 right-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow ${
                      isActive
                        ? "bg-[#89B036] text-white"
                        : "bg-[#89B036]/10 text-[#546622]"
                    }`}
                  >
                    Most Popular
                  </span>
                )}

                <p
                  className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                    isActive ? "text-[#89B036]" : "text-[#A0A0A0]"
                  }`}
                >
                  {i === 0 ? "Starter" : i === 1 ? "Best Value" : "Premium"}
                </p>
                <h3
                  className={`text-base font-bold mb-1 ${
                    isActive ? "text-white" : "text-[#3A3A3A]"
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`text-xs mb-4 leading-snug ${
                    isActive ? "text-[#A8B89A]" : "text-[#6B6B6B]"
                  }`}
                >
                  {pkg.tagline}
                </p>

                {/* Prices */}
                <div className="flex flex-col gap-0.5">
                  <span
                    className={`text-xs line-through ${
                      isActive ? "text-[#6B8A4E]" : "text-[#A0A0A0]"
                    }`}
                  >
                    {pkg.originalPrice}
                  </span>
                  <span
                    className={`text-xl font-extrabold font-playfair leading-none ${
                      isActive ? "text-[#89B036]" : "text-[#89B036]"
                    }`}
                  >
                    {pkg.offerPrice}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Detail Panel ── */}
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
            className="bg-[#F9F8F5] rounded-3xl overflow-hidden border border-[#E8E8E8] shadow-lg"
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
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/50 via-transparent to-transparent" />

                {/* Price overlay on image (mobile only) */}
                <div className="absolute bottom-6 left-6 lg:hidden">
                  <PriceDisplay
                    original={activePackage.originalPrice}
                    offer={activePackage.offerPrice}
                    size="lg"
                  />
                </div>

                {/* Savings badge */}
                <div className="absolute top-6 left-6 bg-[#89B036] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                  Save Up to 30%
                </div>
              </div>

              {/* Right: Content */}
              <div className="lg:col-span-3 p-7 lg:p-10 flex flex-col">
                {/* Package name + pricing (desktop) */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#89B036]">
                      Package Details
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-[#2E3A1E] mt-1">
                      {activePackage.name}
                    </h3>
                    <p className="text-sm text-[#6B6B6B] mt-1">
                      {activePackage.tagline}
                    </p>
                  </div>

                  {/* Desktop pricing */}
                  <div className="hidden lg:block">
                    <PriceDisplay
                      original={activePackage.originalPrice}
                      offer={activePackage.offerPrice}
                      size="lg"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#E0E0E0] mb-8" />

                {/* Room-by-room inclusions */}
                <div className="flex-1 overflow-auto">
                  <h4 className="text-sm font-bold text-[#3A3A3A] uppercase tracking-wider mb-5">
                    What&apos;s Included
                  </h4>
                  <RoomsList rooms={activePackage.rooms} />
                </div>

                {/* Footnote */}
                <p className="text-[10px] text-[#9B9B9B] mt-6 italic">
                  *Prices are indicative and subject to site conditions. Final
                  pricing may vary.
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-[#E0E0E0] my-6" />

                {/* CTA Links */}
                <div className="flex flex-wrap gap-5">
                  <Link
                    href="/#faq"
                    className="group flex items-center gap-2 text-sm font-semibold text-[#3A3A3A] hover:text-[#89B036] transition-colors duration-200"
                    aria-label="Frequently Asked Questions"
                  >
                    <HelpCircle className="w-4 h-4 text-[#89B036] flex-shrink-0" />
                    Frequently Asked Questions
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>

                  <Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm font-semibold text-[#3A3A3A] hover:text-[#89B036] transition-colors duration-200"
                    aria-label="View Package Video on YouTube"
                  >
                    <PlayCircle className="w-4 h-4 text-[#89B036] flex-shrink-0" />
                    View Package Video
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>

                  <Link
                    href="/contact"
                    className="group flex items-center gap-2 text-sm font-semibold text-[#3A3A3A] hover:text-[#89B036] transition-colors duration-200"
                    aria-label="Contact us for package details"
                  >
                    <Phone className="w-4 h-4 text-[#89B036] flex-shrink-0" />
                    Contact Us for More Details
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
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
          className="mt-14 rounded-3xl bg-[#2E3A1E] relative overflow-hidden px-8 py-10"
        >
          {/* Background decorative blobs */}
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
            <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-[#89B036] filter blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#89B036] filter blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
            {/* Heading */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-white leading-tight">
                Buy Direct from Us &amp;{" "}
                <span className="text-[#89B036]">Save Up to 30%</span>
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
                    <div className="w-11 h-11 rounded-full bg-[#89B036]/20 border border-[#89B036]/30 flex items-center justify-center group-hover:bg-[#89B036]/35 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-[#89B036]" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#A8B89A] text-center leading-snug max-w-[80px]">
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
