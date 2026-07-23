import type { Metadata } from "next";
import HeroBanner from "@/components/home/HeroBanner";
import StatsBar from "@/components/home/StatsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import RecentWork from "@/components/home/RecentWork";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PackageOffers from "@/components/home/PackageOffers";
import ReviewStats from "@/components/home/ReviewStats";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
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

      {/* Section 3 – Services Grid */}
      <ServicesGrid />

      {/* Section 4 – Recent Work (filterable) */}
      <RecentWork />

      {/* Section 5 – Why Choose Us */}
      <WhyChooseUs />

      {/* Section 6 – Package Offers */}
      <PackageOffers />

      {/* Section 7 – Testimonials & Stats */}
      <div className="bg-[#F9F8F5]">
        <ReviewStats />
        <TestimonialsSlider />
      </div>

      {/* Section 8 – Lead Capture + Sticky Mobile Bar */}
      <LeadCapture />
    </>
  );
}
