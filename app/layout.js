import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./Providers";
import "./globals.css";
// import { Manrope } from 'next/font/google'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { manrope, playfairdisplay, roboto_mono } from './fonts';
import ZustandHydration from '@/components/zustand_hydration/ZustandHydration';
import { Suspense } from 'react';
import Loading from '@/components/loader/loading';

import Script from 'next/script'
import GoogleAnalytics from '@/components/google_analytics/GoogleAnalytics';
import SalesIq from '@/components/salesIq/SalesIq';

export const metadata = {
  title: "My Top Arts",
  description: "Discover exceptional artwork at My Top Arts. Elevate your space with curated collections. Redefine your walls today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          type="module"
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"
        ></Script>
      </head>
      <body className={`${manrope.variable} ${playfairdisplay.variable}`}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <Suspense fallback={<Loading />}>
          <ZustandHydration>
            <AuthProvider>{children}</AuthProvider>
          </ZustandHydration>
          <Toaster />
          <SalesIq></SalesIq>
        </Suspense>
      </body>
    </html>
  );
}
