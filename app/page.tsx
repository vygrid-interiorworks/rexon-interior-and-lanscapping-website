import type { Metadata } from "next";
import HeroBanner from "@/components/home/HeroBanner";
import StatsBar from "@/components/home/StatsBar";
import CompanyIntro from "@/components/home/CompanyIntro";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import RecentWork from "@/components/home/RecentWork";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import GalleryPreview from "@/components/home/GalleryPreview";
import LeadCapture from "@/components/home/LeadCapture";

export const metadata: Metadata = {
  title: "Rexon Interiors & Landscaping | Premium Design Services in Kerala",
  description:
    "Transform your spaces inside & out with Rexon Interiors and Landscaping. Discover premium interior designs, customized modular kitchens, residential & commercial works, and stunning landscape gardening in Kerala.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* Section 1 – Hero Slider */}
      <HeroBanner />

      {/* Section 2 – Animated Stats */}
      <StatsBar />

      {/* Section 3 – Who We Are + Lead Modal */}
      <CompanyIntro />

      {/* Section 4 – Services Grid */}
      <ServicesGrid />

      {/* Section 5 – Design Process Timeline */}
      <ProcessTimeline />

      {/* Section 6 – Recent Work (filterable) */}
      <RecentWork />

      {/* Section 7 – Why Choose Us */}
      <WhyChooseUs />

      {/* Section 8 – Testimonials */}
      <TestimonialsSlider />

      {/* Section 9 – Gallery Preview */}
      <GalleryPreview />

      {/* Section 10 – Lead Capture + Sticky Mobile Bar */}
      <LeadCapture />
    </>
  );
}
