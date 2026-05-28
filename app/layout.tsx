import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import PublicLayoutWrapper from "@/components/layout/PublicLayoutWrapper";
import { Toaster } from "react-hot-toast";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rexon Interiors & Landscaping | Premium Design Services in Kerala",
  description: "Transform your spaces inside & out with Rexon Interiors and Landscaping. Discover premium interior designs, customized modular kitchens, residential & commercial works, and stunning landscape gardening in Kerala.",
  metadataBase: new URL("https://rexoninteriors.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rexon Interiors & Landscaping | Premium Design Services in Kerala",
    description: "Premium interior design & landscaping services. Transform your home, modular kitchen, and garden spaces with Rexon.",
    url: "https://rexoninteriors.com",
    siteName: "Rexon Interiors and Landscaping",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F9F8F5]">
        {/* Google Analytics – loaded after page is interactive */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}

