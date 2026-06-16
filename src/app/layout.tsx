import type { Metadata, Viewport } from "next";
import { body, display } from "./fonts";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Analytics } from "@/components/Analytics";
import { organizationSchema, webSiteSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Pathways Within | Therapy on Long Island and online",
    template: "%s | Pathways Within",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full`}>
      <body className="min-h-full flex flex-col pb-14 md:pb-0">
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-md focus:top-md focus:z-50 focus:bg-text focus:px-md focus:py-sm focus:text-background"
        >
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <StickyCallBar />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
