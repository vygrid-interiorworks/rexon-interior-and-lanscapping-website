"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sofa, TreePine,
  Leaf, ArrowRight, CheckCircle2, Sparkles,
} from "lucide-react";
import { apiService } from "@/lib/api";

const iconMap: Record<string, any> = {
  Sofa,
  TreePine,
};

const defaultServices = [
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
];

function ServicesPageContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get("id");

  const [servicesList, setServicesList] = useState<any[]>([]);
  const [active, setActive] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        setLoading(true);
        const fetched = await apiService.getServices();
        const targetId = queryId || (typeof window !== "undefined" ? window.location.hash.replace("#", "") : "");

        if (fetched && Array.isArray(fetched) && fetched.length > 0) {
          const normalized = fetched.map((s: any) => {
            const IconComp = iconMap[s.icon] || Sofa;
            let featArr: string[] = [];
            if (Array.isArray(s.features)) {
              featArr = s.features;
            } else if (typeof s.features === "string") {
              featArr = s.features.split("\n").map((f: string) => f.trim()).filter(Boolean);
            } else {
              featArr = [];
            }

            const rawTitle = s.title || s.name || "Custom Service";
            const rawSlug = s.slug || rawTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");

            return {
              id: s._id || s.id || rawSlug,
              slug: rawSlug,
              title: rawTitle,
              icon: IconComp,
              tag: s.tag || "Interiors",
              tagline: s.tagline || "",
              desc: s.desc || s.description || "",
              features: featArr,
              img: s.img || s.image || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
            };
          });

          setServicesList(normalized);

          if (targetId) {
            const cleanTarget = decodeURIComponent(targetId).toLowerCase().replace(/[^a-z0-9]/g, "");
            const matched = normalized.find((item: any) => {
              const cleanTitle = item.title.toLowerCase().replace(/[^a-z0-9]/g, "");
              const cleanId = (item.id || "").toLowerCase().replace(/[^a-z0-9]/g, "");
              const cleanSlug = (item.slug || "").toLowerCase().replace(/[^a-z0-9]/g, "");

              return (
                cleanTitle.includes(cleanTarget) ||
                cleanTarget.includes(cleanTitle) ||
                cleanId === cleanTarget ||
                cleanSlug === cleanTarget ||
                cleanId.includes(cleanTarget) ||
                cleanSlug.includes(cleanTarget)
              );
            });

            if (matched) {
              setActive(matched.id);
              setTimeout(() => {
                const el = document.getElementById("service-details");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }, 300);
            } else if (normalized.length > 0) {
              setActive(normalized[0].id);
            }
          } else if (normalized.length > 0) {
            setActive(normalized[0].id);
          }
        } else {
          setServicesList([]);
        }
      } catch (err) {
        console.error("Failed loading dynamic services for services page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, [queryId]);

  const current = servicesList.find((s) => s.id === active) || servicesList[0] || defaultServices[0];
  const Icon = current.icon || Sofa;

  return (
    <div className="bg-[#F5F5F3] font-sans">
      {/* ── Luxury Hero Banner ── */}
      <section className="bg-gradient-to-b from-[#18191B] via-[#1E2023] to-[#212224] pt-[140px] pb-24 lg:pt-[170px] lg:pb-28 relative overflow-hidden border-b border-[#7CB342]/25 mb-6">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#7CB342_1px,transparent_1px),linear-gradient(to_bottom,#7CB342_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#7CB342]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#7CB342]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-megalky font-normal text-white leading-[1.15] tracking-wide mb-6">
            Our Premium <span className="italic text-[#DCE8CC] font-light">Services</span>
          </h1>

          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#7CB342]/60 to-[#7CB342]" />
            <div className="w-6 h-6 rounded-full bg-[#7CB342]/20 border border-[#7CB342]/40 flex items-center justify-center text-[#7CB342]">
              <Leaf className="w-3 h-3" />
            </div>
            <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#7CB342]/60 to-[#7CB342]" />
          </div>

          <p className="text-[#DCE8CC]/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans font-light mb-4">
            From comprehensive residential interiors to lush tropical landscapes, explore our full suite of design and build solutions.
          </p>
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="py-20 bg-[#F5F5F3]" id="service-details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0 z-20">
              <div className="bg-white rounded-3xl border border-[#DCE8CC] p-3 lg:p-4 sticky top-20 lg:top-24 shadow-sm">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7CB342] px-3 mb-3 hidden lg:block font-sans">All Services ({servicesList.length})</p>
                <nav className="flex flex-row overflow-x-auto lg:flex-col gap-2 lg:space-y-1.5 pb-1 lg:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {servicesList.map((s) => {
                    const SIcon = s.icon || Sofa;
                    const isActive = s.id === active;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setActive(s.id)}
                        className={`w-auto lg:w-full flex-shrink-0 flex items-center gap-2.5 lg:gap-3 px-4 py-2.5 lg:py-3 rounded-full text-left transition-all duration-200 text-xs lg:text-sm font-medium whitespace-nowrap cursor-pointer ${
                          isActive
                            ? "bg-[#2B2C2E] text-white shadow-md"
                            : "text-[#2B2C2E] hover:bg-[#DCE8CC]/50 hover:text-[#7CB342]"
                        }`}
                      >
                        <SIcon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#7CB342]" : ""}`} />
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
                  <div className="rounded-3xl overflow-hidden shadow-xl mb-10 aspect-[16/9] max-h-[320px] sm:max-h-[360px] lg:max-h-[400px] w-full border-2 border-white">
                    <img src={current.img} alt={current.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Badge + heading */}
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-[#7CB342] bg-[#DCE8CC]/60 border border-[#7CB342]/20 px-3.5 py-1 rounded-full mb-4 font-sans">
                    {current.tag}
                  </span>
                  <h2 className="text-4xl font-megalky font-normal text-[#2B2C2E] mb-3">{current.title}</h2>
                  <p className="text-lg font-medium text-[#7CB342] italic mb-5 font-sans">{current.tagline}</p>
                  <p className="text-[#58595B] leading-relaxed text-base mb-10 font-sans">{current.desc}</p>

                  {/* Features */}
                  <div className="bg-white rounded-3xl border border-[#DCE8CC] p-8 mb-10 shadow-sm">
                    <h3 className="text-xl font-megalky font-bold text-[#2B2C2E] mb-6">What&apos;s Included</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {current.features.map((f: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#58595B] font-sans">
                          <CheckCircle2 className="w-5 h-5 text-[#7CB342] flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dynamic Photo Gallery Grid for this Service Filter */}
                  {Array.isArray(current.images) && current.images.length > 0 && (
                    <div className="bg-white rounded-3xl border border-[#DCE8CC] p-8 mb-10 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#7CB342]">
                            Project Gallery ({current.images.length} Photos)
                          </span>
                          <h3 className="text-xl font-megalky font-bold text-[#2B2C2E] mt-0.5">
                            {current.title} Work Showcase
                          </h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                        {current.images.map((imgUrl: string, idx: number) => (
                          <div
                            key={idx}
                            className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer border border-[#DCE8CC] bg-[#F5F5F3]"
                            onClick={() => {
                              // Open lightbox
                              window.open(imgUrl, "_blank");
                            }}
                          >
                            <img
                              src={imgUrl}
                              alt={`${current.title} ${idx + 1}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-medium">
                              View Full
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/get-quote"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#2B2C2E] hover:bg-[#1A1A1B] text-white font-medium rounded-full text-sm tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Get a Free Quote <ArrowRight className="w-4 h-4 text-[#7CB342]" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#7CB342] text-[#7CB342] hover:bg-[#7CB342] hover:text-white font-medium rounded-full text-sm tracking-wider transition-all duration-300 shadow-sm"
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

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F5F3]" />}>
      <ServicesPageContent />
    </Suspense>
  );
}
