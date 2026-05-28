"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sofa, ChefHat, TreePine, Paintbrush, Layers,
  Flower2, Lightbulb, Hammer, BrickWall, Droplets,
  ArrowRight, CheckCircle2,
} from "lucide-react";

const services = [
  {
    id: "interior-design",
    icon: Sofa,
    title: "Interior Design",
    tag: "Interiors",
    tagline: "Spaces that reflect who you are.",
    desc: "Our interior design service covers every corner of your home or office — from mood boards and 3D renders to material selection, furniture layout, and final installation. We create spaces that are beautiful, functional, and deeply personal.",
    features: [
      "Personalised 3D concept renders",
      "Material and colour palette curation",
      "Furniture layout planning",
      "False ceiling & lighting integration",
      "End-to-end project management",
      "Post-handover support",
    ],
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "modular-kitchen",
    icon: ChefHat,
    title: "Modular Kitchen",
    tag: "Interiors",
    tagline: "Kitchens crafted for how you live.",
    desc: "From Italian-finish laminates to premium hardware and smart storage solutions, our modular kitchens combine elegance with efficiency. We design for your cooking style, your family, and your aesthetic.",
    features: [
      "Custom cabinet design & finishes",
      "Premium Hettich / Blum hardware",
      "Quartz & granite countertops",
      "Integrated appliance planning",
      "Tall units, islands & breakfast counters",
      "10-year structure warranty",
    ],
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "landscaping",
    icon: TreePine,
    title: "Landscaping & Gardens",
    tag: "Outdoors",
    tagline: "Transforming land into living art.",
    desc: "We design and build breathtaking outdoor spaces — from sweeping villa gardens to compact apartment balconies. Our landscape architects combine native flora, stone, water, and light to create retreats that feel timeless.",
    features: [
      "Site analysis & concept design",
      "Native & exotic plant selection",
      "Irrigation & drainage planning",
      "Stone pathways & edging",
      "Outdoor lighting design",
      "Seasonal maintenance plans",
    ],
    img: "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "false-ceiling",
    icon: Layers,
    title: "False Ceiling",
    tag: "Interiors",
    tagline: "Ceilings that define the room.",
    desc: "Our false ceiling solutions use gypsum, POP, and wood-panel systems to add drama, depth, and ambient warmth to any space. We integrate concealed LED coves, spotlights, and chandeliers seamlessly.",
    features: [
      "Gypsum board & POP ceilings",
      "Coffered & tray ceiling designs",
      "Concealed LED cove lighting",
      "Acoustic & moisture-resistant options",
      "Drop ceiling for commercial spaces",
      "Quick 5–7 day installation",
    ],
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "wallpaper-decor",
    icon: Paintbrush,
    title: "Wallpaper & Wall Décor",
    tag: "Interiors",
    tagline: "Walls that tell your story.",
    desc: "From luxury wallpapers and textured paints to feature wall panelling and murals, we transform plain walls into statement pieces that set the mood for the entire room.",
    features: [
      "500+ curated wallpaper collections",
      "Textured & Venetian plaster finishes",
      "3D panel & MDF wall art",
      "Hand-painted accent murals",
      "Eco-friendly water-based paints",
      "Professional installation",
    ],
    img: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "garden-maintenance",
    icon: Flower2,
    title: "Garden Maintenance",
    tag: "Outdoors",
    tagline: "Your garden, always in bloom.",
    desc: "Maintaining a beautiful garden is an ongoing commitment. Our certified horticulturalists offer monthly and annual maintenance plans covering pruning, fertilisation, pest control, and replanting.",
    features: [
      "Weekly or monthly service plans",
      "Pruning, trimming & shaping",
      "Fertilisation & soil enrichment",
      "Pest & disease control",
      "Seasonal flower planting",
      "Irrigation system upkeep",
    ],
    img: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "lighting-design",
    icon: Lightbulb,
    title: "Lighting Design",
    tag: "Interiors",
    tagline: "Light that transforms every mood.",
    desc: "Lighting is the invisible ingredient that makes or breaks a space. We design layered lighting systems — ambient, task, and accent — using smart controls, dimmers, and energy-efficient LED technology.",
    features: [
      "Layered ambient & task lighting",
      "Smart home lighting integration",
      "Dimmable LED systems",
      "Cove & strip lighting",
      "Landscape & garden lighting",
      "Energy audit & optimisation",
    ],
    img: "https://images.unsplash.com/photo-1565538810844-1e119df60efc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "carpentry",
    icon: Hammer,
    title: "Carpentry & Woodwork",
    tag: "Interiors",
    tagline: "Bespoke woodwork, built to last.",
    desc: "Our in-house carpentry team crafts custom wardrobes, TV units, bookshelves, study desks, and door frames using premium marine ply and solid wood — designed to fit your space perfectly.",
    features: [
      "Custom wardrobes & walk-in closets",
      "TV unit & entertainment panels",
      "Study tables & office furniture",
      "Solid wood & ply construction",
      "Italian laminate & veneer finishes",
      "Anti-termite treatment included",
    ],
    img: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "stone-tile",
    icon: BrickWall,
    title: "Stone & Tile Work",
    tag: "Both",
    tagline: "Natural textures, timeless beauty.",
    desc: "We specialise in natural stone cladding, designer floor tiles, mosaic feature walls, and outdoor paving. From polished marble to rustic slate, we source premium materials and install them to perfection.",
    features: [
      "Marble, granite & slate flooring",
      "Designer ceramic & vitrified tiles",
      "Natural stone wall cladding",
      "Outdoor paving & driveway stones",
      "Mosaic & encaustic tile features",
      "Epoxy & sanded grouting",
    ],
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "water-features",
    icon: Droplets,
    title: "Water Features",
    tag: "Outdoors",
    tagline: "The sound of water, the soul of luxury.",
    desc: "Nothing elevates an outdoor space like a custom water feature. We design and build garden ponds, natural waterfalls, koi pools, wall fountains, and infinity pools tailored to your landscape.",
    features: [
      "Koi ponds & natural pools",
      "Garden waterfalls & streams",
      "Wall-mounted water features",
      "Fibre-optic lighting integration",
      "Pump, filter & UV systems",
      "Ongoing maintenance plans",
    ],
    img: "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ServicesPage() {
  const [active, setActive] = useState(services[0].id);
  const current = services.find((s) => s.id === active)!;
  const Icon = current.icon;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#2E3A1E] pt-[140px] pb-24 lg:pt-[170px] lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,_#89B036_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8D65A]">What We Offer</span>
          <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-white mt-4 mb-6">Our Services</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            A complete suite of interior and landscaping solutions — designed, managed, and delivered
            by specialists who care as much as you do.
          </p>
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0 z-20">
              <div className="bg-[#F9F8F5] rounded-2xl border border-[#E8E8E8] p-3 lg:p-4 sticky top-20 lg:top-24">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#89B036] px-3 mb-3 hidden lg:block">All Services</p>
                <nav className="flex flex-row overflow-x-auto lg:flex-col gap-2 lg:space-y-1 pb-1 lg:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {services.map((s) => {
                    const SIcon = s.icon;
                    const isActive = s.id === active;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setActive(s.id)}
                        className={`w-auto lg:w-full flex-shrink-0 flex items-center gap-2.5 lg:gap-3 px-4 py-2.5 lg:py-3 rounded-xl text-left transition-all duration-200 text-xs lg:text-sm font-semibold whitespace-nowrap ${
                          isActive
                            ? "bg-[#89B036] text-white shadow-md"
                            : "text-[#3A3A3A] hover:bg-[#89B036]/10 hover:text-[#89B036]"
                        }`}
                      >
                        <SIcon className="w-4 h-4 flex-shrink-0" />
                        {s.title}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Detail Panel */}
            <main className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Image */}
                  <div className="rounded-2xl overflow-hidden shadow-xl mb-10 aspect-[16/9] max-h-[320px] sm:max-h-[360px] lg:max-h-[400px] w-full">
                    <img src={current.img} alt={current.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Badge + heading */}
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#89B036] bg-[#89B036]/10 px-3 py-1 rounded-full mb-4">
                    {current.tag}
                  </span>
                  <h2 className="text-4xl font-playfair font-bold text-[#3A3A3A] mb-3">{current.title}</h2>
                  <p className="text-lg font-semibold text-[#89B036] italic mb-5">{current.tagline}</p>
                  <p className="text-[#4A4A4A] leading-relaxed text-base mb-10">{current.desc}</p>

                  {/* Features */}
                  <div className="bg-[#F9F8F5] rounded-2xl border border-[#E8E8E8] p-8 mb-10">
                    <h3 className="text-lg font-bold text-[#3A3A3A] mb-6">What&apos;s Included</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {current.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-[#3A3A3A]">
                          <CheckCircle2 className="w-5 h-5 text-[#89B036] flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/get-quote"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#89B036] hover:bg-[#546622] text-white font-bold rounded-full text-sm uppercase tracking-wider transition-all duration-300 shadow-lg"
                    >
                      Get a Free Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-[#89B036] text-[#89B036] hover:bg-[#89B036] hover:text-white font-bold rounded-full text-sm uppercase tracking-wider transition-all duration-300"
                    >
                      Speak to a Designer
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
