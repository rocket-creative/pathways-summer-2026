"use client";

import Script from "next/script";
import { useConsent } from "@/components/useConsent";

// Loads Google Tag Manager only after the visitor grants analytics consent,
// and only when a container id is configured. Renders nothing otherwise, so no
// analytics ever runs before consent.
export function Analytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const consent = useConsent();

  if (!gtmId || !consent?.analytics) return null;

  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
    </Script>
  );
}
