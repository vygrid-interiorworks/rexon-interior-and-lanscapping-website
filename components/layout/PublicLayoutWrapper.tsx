"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import GlobalBackground from "@/components/ui/GlobalBackground";

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <GlobalBackground />
      <Navbar />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
