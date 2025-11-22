import type { Metadata } from 'next';
import PrimaryLayout from "@/components/layouts/PrimaryLayout";
import { raleway, roboto } from "@/library/constants/fonts";
import "./globals.css";
import CookieConsent from "@/features/modals/CookieConsent";
import { CookiesProvider } from "next-client-cookies/server";
import Script from "next/script";

// ✅ Remove select-none restriction
const isSelectAbleContentClass = "";

export const generateMetadata = async (): Promise<Metadata> => {
  const domain = 'www.silveroakglobal.com';
  const mirrorDomain = 'www.silveroakglobal.net';
  
  // This will automatically get the current path
  return {
    metadataBase: new URL(`https://${domain}`),
    alternates: {
      canonical: './', // Auto-resolves to current path
      types: {
        'application/rss+xml': '/rss.xml',
      },
    },
    other: {
      'alternative': `https://${mirrorDomain}`,
      'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* GTM Script */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WLZ53Z7B');`,
          }}
        />
      </head>

      <body className={`${raleway.variable} ${roboto.variable} ${isSelectAbleContentClass}`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WLZ53Z7B"
            height="0"
            width="0"
            style={{display:"none",visibility:"hidden"}}
          ></iframe>
        </noscript>

        <CookiesProvider>
          <PrimaryLayout>{children}</PrimaryLayout>
          <CookieConsent />
        </CookiesProvider>
      </body>
    </html>
  );
}
