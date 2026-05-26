"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Interior", "Landscaping", "Kitchen", "Garden"];

const projects = [
  { id: 1, title: "Luxury Villa Interior", category: "Interior", location: "Kochi, Kerala", img: "https://images.unsplash.com/photo-1558904541-efa843a96f09?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Tropical Garden Retreat", category: "Landscaping", location: "Thrissur, Kerala", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Modular Kitchen Redesign", category: "Kitchen", location: "Calicut, Kerala", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Corporate Office Revamp", category: "Interior", location: "Trivandrum, Kerala", img: "https://images.unsplash.com/photo-1583847268964-b28ce8f52859?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Zen Courtyard Design", category: "Garden", location: "Kannur, Kerala", img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: "Contemporary Living Room", category: "Interior", location: "Kochi, Kerala", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80" },
];

export default function RecentWork() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 bg-[#F9F8F5]" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#89B036]">
            Portfolio
          </span>
          <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-[#3A3A3A] mt-3 mb-5">
            Our Recent Work
          </h2>
          <p className="text-[#4A4A4A] text-base leading-relaxed">
            A curated showcase of our finest interior and landscaping transformations across Kerala.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#89B036] text-white shadow-lg"
                  : "bg-white text-[#4A4A4A] border border-[#E8E8E8] hover:border-[#89B036] hover:text-[#89B036]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-bold text-[#89B036] uppercase tracking-widest mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
                  <p className="text-xs text-white/70 mt-1">{project.location}</p>
                </div>
                {/* Default bottom tag */}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm px-5 py-3 translate-y-0 group-hover:translate-y-full transition-transform duration-400">
                  <span className="text-[10px] font-bold text-[#89B036] uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-sm font-bold text-[#3A3A3A] leading-tight mt-0.5">{project.title}</h3>
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
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[#89B036] text-[#89B036] hover:bg-[#89B036] hover:text-white font-bold rounded-full text-sm uppercase tracking-wider transition-all duration-300"
          >
            View All Projects →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
