import type { Metadata } from "next";
import { Award, Target, Eye, Users, Leaf, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Rexon Interiors & Landscaping",
  description:
    "Learn about Rexon Interiors and Landscaping — our story, our mission, our passionate team, and the values that drive every project we take on in Kerala.",
  alternates: { canonical: "/about" },
};

const team = [
  { name: "Rexon P. Joseph", role: "Founder & Principal Designer", img: "https://placehold.co/400x400/4A5A1E/FFFFFF?text=RJ", bio: "12+ years shaping premium residential and commercial spaces across Kerala." },
  { name: "Ananya Krishnan", role: "Senior Interior Architect", img: "https://placehold.co/400x400/7A9E2E/FFFFFF?text=AK", bio: "Specialist in contemporary tropical design and biophilic interior concepts." },
  { name: "Sujith Menon", role: "Head of Landscaping", img: "https://placehold.co/400x400/3A3A3A/FFFFFF?text=SM", bio: "Certified horticulturalist with a passion for native Kerala flora and zen gardens." },
  { name: "Divya Nair", role: "Project Manager", img: "https://placehold.co/400x400/4A5A1E/FFFFFF?text=DN", bio: "Ensures every project is delivered on schedule, within budget, and beyond expectations." },
];

const values = [
  { icon: Star, title: "Excellence", desc: "We hold every detail to the highest standard, because average is never an option." },
  { icon: Leaf, title: "Sustainability", desc: "Eco-conscious materials and green practices in every project we deliver." },
  { icon: Users, title: "Collaboration", desc: "We work with you, not just for you — every decision involves your voice." },
  { icon: Award, title: "Integrity", desc: "Transparent pricing, honest timelines, and zero hidden surprises." },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="relative bg-[#2E3A1E] py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_#7A9E2E_0%,_transparent_65%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#A8D65A]">Our Story</span>
          <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-white mt-4 mb-6">
            Passion. Craft. Excellence.
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Since 2012, Rexon Interiors and Landscaping has been transforming homes, offices, and outdoor
            spaces across Kerala with uncompromising quality and a deeply personal approach to design.
          </p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7A9E2E]">Who We Are</span>
              <h2 className="text-4xl font-playfair font-bold text-[#3A3A3A] mt-3 mb-6 leading-tight">
                Built on a Belief That Design Can Change Lives
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-5">
                Rexon was born from a simple idea — that every person deserves a space they love coming home to.
                Founded by Rexon P. Joseph in Kochi, we started as a small interior consultancy and grew into
                one of Kerala&apos;s most trusted full-service design firms.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed mb-5">
                Today, our 30-member team handles everything from residential interiors and modular kitchens
                to large-scale commercial fit-outs and luxury landscape gardens — all with the same care and
                commitment that defined us from day one.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed">
                Our work spans over 1,200 completed projects across Kochi, Thrissur, Calicut, Trivandrum,
                and Kannur. Every space we design carries a piece of our collective passion.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <img src="https://placehold.co/800x600/4A5A1E/FFFFFF?text=Rexon+Studio" alt="Rexon Studio" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#7A9E2E] text-white rounded-2xl p-6 shadow-xl">
                <div className="text-4xl font-extrabold font-playfair">12+</div>
                <div className="text-xs font-bold uppercase tracking-widest mt-1">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="py-20 bg-[#F9F8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-10 border border-[#E8E8E8] shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-[#7A9E2E]/15 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-[#7A9E2E]" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-[#3A3A3A] mb-4">Our Vision</h3>
              <p className="text-[#6B6B6B] leading-relaxed">
                To be the most trusted and celebrated interior and landscaping brand in South India —
                recognised not just for beautiful spaces, but for the genuine relationships we build
                with every client we serve.
              </p>
            </div>
            <div className="bg-[#2E3A1E] rounded-2xl p-10 shadow-sm">
              <div className="w-14 h-14 rounded-xl bg-white/15 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#A8D65A]" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-white mb-4">Our Mission</h3>
              <p className="text-white/70 leading-relaxed">
                To deliver exceptional interior design and landscaping solutions that are rooted in
                client needs, crafted with premium materials, executed with precision, and completed
                without compromise — on time, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7A9E2E]">What Drives Us</span>
            <h2 className="text-4xl font-playfair font-bold text-[#3A3A3A] mt-3">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-[#F9F8F5] rounded-2xl p-7 border border-[#E8E8E8] hover:border-[#7A9E2E]/40 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#7A9E2E]/15 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#7A9E2E]" />
                  </div>
                  <h3 className="text-base font-bold text-[#3A3A3A] mb-2">{v.title}</h3>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 bg-[#F9F8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7A9E2E]">Meet the Team</span>
            <h2 className="text-4xl font-playfair font-bold text-[#3A3A3A] mt-3">The People Behind the Spaces</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="group text-center">
                <div className="relative w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-[#E8E8E8] group-hover:ring-[#7A9E2E] transition-all duration-300">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-base font-bold text-[#3A3A3A]">{member.name}</h3>
                <div className="text-xs font-bold text-[#7A9E2E] uppercase tracking-widest mt-1 mb-3">{member.role}</div>
                <p className="text-xs text-[#6B6B6B] leading-relaxed max-w-[200px] mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
