"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

export function GoogleAdsScripts() {
  return (
    <>
      <Script
        id="gtag-src"
        src="https://www.googletagmanager.com/gtag/js?id=AW-847457408"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', 'AW-847457408');
          `}
      </Script>
    </>
  );
}

export function GoogleAdsConversion() {
  const pathname = usePathname();
  useEffect(() => {
    window.gtag?.("event", "conversion", {
      send_to: "AW-847457408/e6s6CMGhwe8YEIDZjJQD",
    });
  }, [pathname]);
  return null;
}

export function trackDemoClick() {
  window.gtag?.("event", "conversion", {
    send_to: "AW-847457408/yJfuCIntpOIbEIDZjJQD",
  });
}

export function trackSignupClick() {
  window.gtag?.("event", "conversion", {
    send_to: "AW-847457408/2fAKCIDhl-IbEIDZjJQD",
  });
}
