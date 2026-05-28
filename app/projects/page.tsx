"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, User, Maximize2, Calendar, Briefcase, Hammer } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Interior", "Landscaping", "Kitchen", "Garden"];

const projects = [
  {
    id: 1,
    title: "Luxury Villa Interior",
    category: "Interior",
    location: "Kochi, Kerala",
    img: "https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&w=800&q=80",
    description: "An opulent, contemporary residential interior designed for a luxury villa in Kochi. The space merges rich textures with warm, curated wood paneling and gold trim highlights. Features high-end custom carpentry, smart dimmable task lighting, bespoke velvet seating, and a spacious open-concept layout tailored for modern Keralite lifestyle.",
    images: [
      "https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    ],
    details: {
      client: "Dr. Sandeep Nair",
      area: "4,500 Sq. Ft.",
      duration: "6 Months",
      scope: "Full-Home Turnkey Interior Design",
      materials: "Teak wood, Premium veneer, Gold-brushed PVD, Velvet fabrics",
    }
  },
  {
    id: 2,
    title: "Tropical Garden Retreat",
    category: "Landscaping",
    location: "Thrissur, Kerala",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    description: "A lush, green sanctuary featuring premium outdoor wooden decking, a custom Koi pond with natural stone cascades, and native tropical plants selected for low upkeep. Built to provide a serene space for morning tea and outdoor gatherings, the retreat features professional landscape illumination and built-in stone sitting benches.",
    images: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    ],
    details: {
      client: "Kurian & Family",
      area: "3,200 Sq. Ft. Garden",
      duration: "3 Months",
      scope: "Complete Landscape Architecture & Water Features",
      materials: "Natural Kerala Laterite Stone, Engineered Teak Decking, Smart Irrigation",
    }
  },
  {
    id: 3,
    title: "Modular Kitchen Redesign",
    category: "Kitchen",
    location: "Calicut, Kerala",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    description: "A state-of-the-art modular kitchen designed for high utility and modern aesthetics. Integrated with premium Hafele soft-close mechanisms, custom PU-lacquered cabinet doors in sage green, white quartz countertops, and smart built-in appliances. Features an island counter with high seating for casual meals.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
    details: {
      client: "Aysha Rahman",
      area: "240 Sq. Ft.",
      duration: "4 Weeks",
      scope: "Modular Kitchen Design, Fabrication & Installation",
      materials: "Marine Plywood, Sage Green PU Finish, Premium Quartz, Hafele hardware",
    }
  },
  {
    id: 4,
    title: "Corporate Office Revamp",
    category: "Interior",
    location: "Trivandrum, Kerala",
    img: "https://images.unsplash.com/photo-1583847268964-b28ce8f52859?auto=format&fit=crop&w=800&q=80",
    description: "A collaborative corporate workspace designed to foster productivity and crew engagement. Incorporates acoustic panel ceilings, ergonomic workstations, vibrant green biophilic breakout zones, and high-tech conference spaces. Designed with an earthy corporate color theme emphasizing natural light flow.",
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28ce8f52859?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
    ],
    details: {
      client: "Apex Tech Ventures",
      area: "8,500 Sq. Ft.",
      duration: "4 Months",
      scope: "Commercial Interior Design & Build",
      materials: "Acoustic fabric panels, Recycled carpet tiles, Oak worktables, Glass partition walls",
    }
  },
  {
    id: 5,
    title: "Zen Courtyard Design",
    category: "Garden",
    location: "Kannur, Kerala",
    img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
    description: "A stunning traditional inner courtyard design based on Naalukettu architecture with a Zen layout. Features a center gravel courtyard, bamboo plantings, polished granite accents, and a minimal waterfall wall generating soothing soundscapes. Ideal for quiet meditation and yoga.",
    images: [
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    ],
    details: {
      client: "Dr. Vinod Krishnan",
      area: "1,200 Sq. Ft.",
      duration: "2 Months",
      scope: "Traditional Courtyard Zen Design",
      materials: "White pebbles, Black Granite, Bamboo, Teak Pillars",
    }
  },
  {
    id: 6,
    title: "Contemporary Living Room",
    category: "Interior",
    location: "Kochi, Kerala",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    description: "A bright, warm contemporary living area that maximises seating comfort and visual depth. Incorporates a bespoke marble-accented television unit, ambient warm cove lighting, and soft linen curtains that diffuse sunlight beautifully. Elegant, minimalist furniture selected from custom Italian collections.",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    ],
    details: {
      client: "Meera & Rahul",
      area: "650 Sq. Ft.",
      duration: "6 Weeks",
      scope: "Living Room Remodel",
      materials: "Statuario Marble, Oak veneers, Natural Linen, Dimmable Warm LEDs",
    }
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setActiveImgIndex(0);
  };

  return (
    <div className="bg-[#F9F8F5]">
      {/* Hero */}
      <section className="bg-[#2E3A1E] pt-[140px] pb-24 lg:pt-[170px] lg:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_right,_#89B036_0%,_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8D65A]">Our Portfolio</span>
          <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-white mt-4 mb-6">Our Projects</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Every project tells a transformation story. Explore our portfolio of interiors and landscapes.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === c
                    ? "bg-[#89B036] text-white shadow-lg"
                    : "bg-white text-[#4A4A4A] border border-[#E8E8E8] hover:border-[#89B036] hover:text-[#89B036]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence>
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    />
                    <span className="absolute top-4 left-4 bg-[#89B036] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-widest block mb-1">
                      {project.location}
                    </span>
                    <h3 className="text-base font-bold text-[#3A3A3A] mb-2 group-hover:text-[#89B036] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#4A4A4A] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Immersive Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            {/* Background click to close */}
            <div
              className="absolute inset-0 cursor-zoom-out"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col lg:flex-row max-h-[92vh] lg:max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 z-20 p-2.5 bg-black/50 hover:bg-black/75 text-white rounded-full transition-colors backdrop-blur-sm shadow-md cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Image Gallery */}
              <div className="w-full lg:w-1/2 bg-[#171717] relative flex flex-col justify-center p-4 sm:p-6 min-h-[220px] lg:min-h-0">
                {/* Main Image View */}
                <div className="relative flex-grow flex items-center justify-center overflow-hidden rounded-2xl aspect-[16/9] lg:aspect-[4/3] max-h-[240px] lg:max-h-none">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImgIndex}
                      src={selectedProject.images[activeImgIndex]}
                      alt={`${selectedProject.title} ${activeImgIndex + 1}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImgIndex((prev) =>
                            prev === 0 ? selectedProject.images.length - 1 : prev - 1
                          );
                        }}
                        className="absolute left-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-sm cursor-pointer"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImgIndex((prev) =>
                            prev === selectedProject.images.length - 1 ? 0 : prev + 1
                          );
                        }}
                        className="absolute right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-sm cursor-pointer"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails list */}
                {selectedProject.images.length > 1 && (
                  <div className="flex justify-center gap-2 mt-3 overflow-x-auto pb-1 max-h-[48px] lg:max-h-none">
                    {selectedProject.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImgIndex(idx)}
                        className={`relative w-12 h-9 sm:w-16 sm:h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                          activeImgIndex === idx
                            ? "border-[#89B036] scale-105 shadow-md"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Side: Details Content */}
              <div className="w-full lg:w-1/2 p-5 sm:p-8 lg:p-10 overflow-y-auto flex flex-col justify-between bg-white max-h-[50vh] lg:max-h-[90vh]">
                <div>
                  {/* Category tag */}
                  <span className="inline-block px-3 py-1 bg-[#89B036]/10 text-[#89B036] text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-3">
                    {selectedProject.category}
                  </span>

                  <h3 className="text-2xl font-playfair font-bold text-[#3A3A3A] mb-1.5 leading-tight">
                    {selectedProject.title}
                  </h3>

                  <p className="text-xs text-[#89B036] font-bold mb-5 flex items-center">
                    <span className="w-1.5 h-1.5 bg-[#89B036] rounded-full mr-2" />
                    {selectedProject.location}
                  </p>

                  <div className="border-t border-[#F2F2F2] pt-5 mb-5">
                    <h4 className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider mb-1.5">Project Overview</h4>
                    <p className="text-[#4A4A4A] text-xs leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Spec list */}
                  <div className="border-t border-[#F2F2F2] pt-5 mb-5">
                    <h4 className="text-[10px] font-bold text-[#A0A0A0] uppercase tracking-wider mb-3.5">Project Specifications</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2.5">
                        <User className="w-4 h-4 text-[#89B036] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[9px] font-bold text-[#A0A0A0] uppercase tracking-wider">Client</p>
                          <p className="text-xs text-[#3A3A3A] font-semibold">{selectedProject.details.client}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Maximize2 className="w-4 h-4 text-[#89B036] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[9px] font-bold text-[#A0A0A0] uppercase tracking-wider">Area</p>
                          <p className="text-xs text-[#3A3A3A] font-semibold">{selectedProject.details.area}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Calendar className="w-4 h-4 text-[#89B036] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[9px] font-bold text-[#A0A0A0] uppercase tracking-wider">Duration</p>
                          <p className="text-xs text-[#3A3A3A] font-semibold">{selectedProject.details.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Briefcase className="w-4 h-4 text-[#89B036] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[9px] font-bold text-[#A0A0A0] uppercase tracking-wider">Scope</p>
                          <p className="text-xs text-[#3A3A3A] font-semibold">{selectedProject.details.scope}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#F2F2F2] pt-5 mb-5">
                    <div className="flex items-start gap-2.5">
                      <Hammer className="w-4 h-4 text-[#89B036] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[9px] font-bold text-[#A0A0A0] uppercase tracking-wider">Key Materials</p>
                        <p className="text-xs text-[#3A3A3A] font-medium leading-relaxed mt-0.5">{selectedProject.details.materials}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F2F2F2] flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto w-full">
                  <Link
                    href="/get-quote"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#89B036] hover:bg-[#546622] text-white font-bold rounded-full text-xs sm:text-2xs uppercase tracking-wider transition-colors duration-300 shadow-md text-center"
                  >
                    Consult on this
                  </Link>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-full sm:w-auto py-2 text-center text-xs sm:text-2xs font-bold text-[#A0A0A0] hover:text-[#3A3A3A] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
