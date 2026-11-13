import type { Metadata } from "next";
import HeroBanner from "@/components/home/HeroBanner";
import StatsBar from "@/components/home/StatsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import RecentWork from "@/components/home/RecentWork";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PackageOffers from "@/components/home/PackageOffers";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import LeadCapture from "@/components/home/LeadCapture";
import { apiService } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  let settings: any = null;
  try {
    settings = await apiService.getSettings();
  } catch (e) {
    // fallback
  }

  const title = settings?.metaTitle || "Rexon Interiors & Landscaping | Premium Design Services in Kerala";
  const description = settings?.metaDescription || "Transform your spaces inside & out with Rexon Interiors and Landscaping. Discover premium interior designs, customized modular kitchens, residential & commercial works, and stunning landscape gardening in Kerala.";
  const siteUrl = (settings?.siteUrl || "https://rexoninteriors.com").replace(/\/+$/, "");
  const ogImageUrl = `${siteUrl}/og-image.png`;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: "Rexon Interiors and Landscaping",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    other: {
      "og:image:secure_url": ogImageUrl,
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:type": "image/png",
    },
  };
}

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

      {/* Section 7 – Testimonials */}
      <div className="bg-[#F9F8F5]">
        <TestimonialsSlider />
      </div>

      {/* Section 8 – Lead Capture + Sticky Mobile Bar */}
      <LeadCapture />
    </>
  );
}
