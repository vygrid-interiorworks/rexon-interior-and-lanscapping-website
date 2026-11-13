import type { Metadata } from "next";
import PackageHero from "@/components/packages/PackageHero";
import PackageOffers from "@/components/home/PackageOffers";
import LeadCapture from "@/components/home/LeadCapture";

export const metadata: Metadata = {
  title: "Interior & Landscaping Packages | Rexon Interiors Kerala",
  description:
    "Explore customized turnkey interior and landscaping packages in Kerala tailored to your requirements.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return (
    <div className="bg-[#212224] font-sans min-h-screen">
      {/* Luxury Page Hero Banner */}
      <PackageHero />

      {/* Package Offers Interactive Component */}
      <PackageOffers />

      {/* Free Consultation Callout */}
      <LeadCapture />
    </div>
  );
}
