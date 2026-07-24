import type { Metadata } from "next";
import { Award, Target, Eye, Users, Leaf, Star, Sparkles } from "lucide-react";
import CompanyIntro from "@/components/home/CompanyIntro";
import ProcessTimeline from "@/components/home/ProcessTimeline";

export const metadata: Metadata = {
  title: "About Us | Rexon Interiors & Landscaping",
  description:
    "Learn about Rexon Interiors and Landscaping — our story, our mission, our passionate team, and the values that drive every project we take on in Kerala.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: Star, title: "Excellence", desc: "We hold every detail to the highest standard, because average is never an option." },
  { icon: Leaf, title: "Sustainability", desc: "Eco-conscious materials and green practices in every project we deliver." },
  { icon: Users, title: "Collaboration", desc: "We work with you, not just for you — every decision involves your voice." },
  { icon: Award, title: "Integrity", desc: "Transparent pricing, honest timelines, and zero hidden surprises." },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F5F5F3] font-sans">
      {/* ── Luxury Hero Banner ── */}
      <section className="bg-gradient-to-b from-[#18191B] via-[#1E2023] to-[#212224] pt-[125px] pb-14 lg:pt-[150px] lg:pb-16 relative overflow-hidden border-b border-[#7CB342]/15">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#7CB342_1px,transparent_1px),linear-gradient(to_bottom,#7CB342_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#7CB342]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#7CB342]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#7CB342]/10 border border-[#7CB342]/30 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#7CB342]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7CB342] font-sans">
              OUR HERITAGE &amp; VISION
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-megalky font-normal text-white leading-[1.15] tracking-wide mb-4">
            Passion. Craft. <span className="italic text-[#DCE8CC] font-light">Excellence.</span>
          </h1>

          <div className="flex items-center justify-center gap-4 my-5">
            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#7CB342]/60 to-[#7CB342]" />
            <div className="w-6 h-6 rounded-full bg-[#7CB342]/20 border border-[#7CB342]/40 flex items-center justify-center text-[#7CB342]">
              <Leaf className="w-3 h-3" />
            </div>
            <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#7CB342]/60 to-[#7CB342]" />
          </div>

          <p className="text-[#DCE8CC]/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans font-light">
            Since 2012, Rexon Interiors &amp; Landscaping has been transforming homes, offices, and outdoor sanctuaries across Kerala with uncompromising quality and a personal approach to design.
          </p>
        </div>
      </section>

      {/* ── Who We Are / Company Intro ── */}
      <CompanyIntro />

      {/* ── How We Work / Process Timeline ── */}
      <ProcessTimeline />

      {/* ── Vision & Mission ── */}
      <section className="py-20 bg-[#DCE8CC]/40 border-y border-[#DCE8CC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-10 border border-[#DCE8CC] shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-[#DCE8CC]/60 flex items-center justify-center mb-6 text-[#7CB342]">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-megalky font-bold text-[#2B2C2E] mb-4">Our Vision</h3>
              <p className="text-[#58595B] leading-relaxed font-sans">
                To be the most trusted and celebrated interior and landscaping brand in South India —
                recognised not just for beautiful spaces, but for the genuine relationships we build
                with every client we serve.
              </p>
            </div>
            <div className="bg-[#2B2C2E] rounded-3xl p-10 shadow-xl border border-[#7CB342]/20">
              <div className="w-14 h-14 rounded-2xl bg-[#7CB342]/20 flex items-center justify-center mb-6 text-[#7CB342]">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-megalky font-bold text-white mb-4">Our Mission</h3>
              <p className="text-[#DCE8CC]/90 leading-relaxed font-sans">
                To deliver exceptional interior design and landscaping solutions that are rooted in
                client needs, crafted with premium materials, executed with precision, and completed
                without compromise — on time, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-20 bg-[#F5F5F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7CB342]">What Drives Us</span>
            <h2 className="text-4xl font-megalky font-normal text-[#2B2C2E] mt-3">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white rounded-3xl p-7 border border-[#DCE8CC] hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-[#DCE8CC]/50 border border-[#7CB342]/20 flex items-center justify-center mb-5 text-[#7CB342]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-megalky font-bold text-[#2B2C2E] mb-2">{v.title}</h3>
                  <p className="text-xs text-[#58595B] leading-relaxed font-sans">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
