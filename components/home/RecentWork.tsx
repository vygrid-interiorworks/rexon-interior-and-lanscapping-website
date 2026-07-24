"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, User, Maximize2, Calendar, Briefcase, Hammer } from "lucide-react";

const categories = ["All", "Interior", "Landscaping", "Kitchen", "Garden"];

const projects = [
  {
    id: 1,
    title: "Luxury Villa Interior",
    category: "Interior",
    location: "Kochi, Kerala",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    description: "An opulent, contemporary residential interior designed for a luxury villa in Kochi. The space merges rich textures with warm, curated wood paneling and gold trim highlights. Features high-end custom carpentry, smart dimmable task lighting, bespoke velvet seating, and a spacious open-concept layout tailored for modern Keralite lifestyle.",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
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
    img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    description: "A lush, green sanctuary featuring premium outdoor wooden decking, a custom Koi pond with natural stone cascades, and native tropical plants selected for low upkeep. Built to provide a serene space for morning tea and outdoor gatherings, the retreat features professional landscape illumination and built-in stone sitting benches.",
    images: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80",
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
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    description: "A state-of-the-art modular kitchen designed for high utility and modern aesthetics. Integrated with premium Hafele soft-close mechanisms, custom PU-lacquered cabinet doors in sage green, white quartz countertops, and smart built-in appliances. Features an island counter with high seating for casual meals.",
    images: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
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
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
    description: "A collaborative corporate workspace designed to foster productivity and crew engagement. Incorporates acoustic panel ceilings, ergonomic workstations, vibrant green biophilic breakout zones, and high-tech conference spaces. Designed with an earthy corporate color theme emphasizing natural light flow.",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
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
    img: "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80",
    description: "A stunning traditional inner courtyard design based on Naalukettu architecture with a Zen layout. Features a center gravel courtyard, bamboo plantings, polished granite accents, and a minimal waterfall wall generating soothing soundscapes. Ideal for quiet meditation and yoga.",
    images: [
      "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80",
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

export default function RecentWork() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const filtered = (
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory)
  ).slice(0, 3);

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setActiveImgIndex(0);
  };

  return (
    <section className="py-14 sm:py-16 bg-[#F5F5F3] font-sans border-t border-[#DCE8CC]" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7CB342]">
            Portfolio Showcase
          </span>
          <h2 className="text-4xl lg:text-5xl font-megalky font-normal text-[#2B2C2E] mt-3 mb-5">
            Our Recent Work
          </h2>
          <p className="text-[#58595B] text-base leading-relaxed font-sans">
            A curated showcase of our finest interior and landscaping transformations across Kerala.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#7CB342] text-white shadow-md"
                  : "bg-white text-[#58595B] border border-[#DCE8CC] hover:border-[#7CB342] hover:text-[#7CB342]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid with Arch Cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleProjectClick(project)}
                className="group relative rounded-t-[100px] rounded-b-[20px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer bg-white border-2 border-white"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2C2E]/90 via-[#2B2C2E]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-xs font-semibold text-[#7CB342] uppercase tracking-wider mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-megalky font-bold text-white leading-tight">{project.title}</h3>
                  <p className="text-xs text-white/80 mt-1 font-sans">{project.location}</p>
                </div>
                {/* Default bottom tag */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-6 py-4 translate-y-0 group-hover:translate-y-full transition-transform duration-300 border-t border-[#DCE8CC]">
                  <span className="text-[10px] font-semibold text-[#7CB342] uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-base font-megalky font-bold text-[#2B2C2E] leading-tight mt-0.5">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2B2C2E] hover:bg-[#1A1A1B] text-white font-medium rounded-full text-sm tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View All Projects →
          </Link>
        </motion.div>
      </div>

      {/* Immersive Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
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
              className="relative bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col lg:flex-row max-h-[92vh] lg:max-h-[90vh] border border-[#DCE8CC]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 z-20 p-2.5 bg-[#2B2C2E]/70 hover:bg-[#2B2C2E] text-white rounded-full transition-colors backdrop-blur-sm shadow-md cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Image Gallery */}
              <div className="w-full lg:w-1/2 bg-[#2B2C2E] relative flex flex-col justify-center p-4 sm:p-6 min-h-[220px] lg:min-h-0">
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
                        className={`relative w-12 h-9 sm:w-16 sm:h-12 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                          activeImgIndex === idx
                            ? "border-[#7CB342] scale-105 shadow-md"
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
                  <span className="inline-block px-3 py-1 bg-[#DCE8CC] text-[#7CB342] text-[10px] font-semibold uppercase tracking-widest rounded-full mb-3 font-sans">
                    {selectedProject.category}
                  </span>

                  <h3 className="text-2xl lg:text-3xl font-megalky font-bold text-[#2B2C2E] mb-1.5 leading-tight">
                    {selectedProject.title}
                  </h3>

                  <p className="text-xs text-[#7CB342] font-semibold mb-5 flex items-center font-sans">
                    <span className="w-1.5 h-1.5 bg-[#7CB342] rounded-full mr-2" />
                    {selectedProject.location}
                  </p>

                  <div className="border-t border-[#DCE8CC] pt-5 mb-5">
                    <h4 className="text-[10px] font-semibold text-[#58595B]/70 uppercase tracking-wider mb-1.5 font-sans">Project Overview</h4>
                    <p className="text-[#58595B] text-xs leading-relaxed font-sans">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Spec list */}
                  <div className="border-t border-[#DCE8CC] pt-5 mb-5">
                    <h4 className="text-[10px] font-semibold text-[#58595B]/70 uppercase tracking-wider mb-3.5 font-sans">Project Specifications</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2.5">
                        <User className="w-4 h-4 text-[#7CB342] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[9px] font-semibold text-[#58595B]/70 uppercase tracking-wider font-sans">Client</p>
                          <p className="text-xs text-[#2B2C2E] font-semibold font-sans">{selectedProject.details.client}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Maximize2 className="w-4 h-4 text-[#7CB342] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[9px] font-semibold text-[#58595B]/70 uppercase tracking-wider font-sans">Area</p>
                          <p className="text-xs text-[#2B2C2E] font-semibold font-sans">{selectedProject.details.area}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Calendar className="w-4 h-4 text-[#7CB342] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[9px] font-semibold text-[#58595B]/70 uppercase tracking-wider font-sans">Duration</p>
                          <p className="text-xs text-[#2B2C2E] font-semibold font-sans">{selectedProject.details.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Briefcase className="w-4 h-4 text-[#7CB342] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[9px] font-semibold text-[#58595B]/70 uppercase tracking-wider font-sans">Scope</p>
                          <p className="text-xs text-[#2B2C2E] font-semibold font-sans">{selectedProject.details.scope}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#DCE8CC] pt-5 mb-5">
                    <div className="flex items-start gap-2.5">
                      <Hammer className="w-4 h-4 text-[#7CB342] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[9px] font-semibold text-[#58595B]/70 uppercase tracking-wider font-sans">Key Materials</p>
                        <p className="text-xs text-[#58595B] font-medium leading-relaxed mt-0.5 font-sans">{selectedProject.details.materials}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCE8CC] flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto w-full">
                  <Link
                    href="/get-quote"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#2B2C2E] hover:bg-[#1A1A1B] text-white font-medium rounded-full text-xs tracking-wider transition-colors duration-300 shadow-md text-center"
                  >
                    Consult on this
                  </Link>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-full sm:w-auto py-2 text-center text-xs font-semibold text-[#58595B] hover:text-[#2B2C2E] tracking-wider transition-colors cursor-pointer font-sans"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
