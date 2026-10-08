import type { Metadata } from "next";
import { EnquiryProvider } from "./components/EnquiryCart";
import { SITE_URL } from "./seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
    title: "KH Wood | Iraq's Trusted Wood Supply & Market Partner",
    description:
      "Principal-led timber and construction supply for Iraqi projects, plus proven market access for international manufacturers.",
    keywords: [
      "wood supplier Iraq",
      "timber distributor Iraq",
      "Iraq wood import company",
      "construction materials Iraq",
      "exclusive distributor Iraq",
      "franchise partner Iraq",
    ],
    icons: {
      icon: "/assets/kh-logo.png",
      shortcut: "/assets/kh-logo.png",
    },
    openGraph: {
      title: "KH Wood | Iraq's Trusted Wood Supply & Market Partner",
      description:
        "For projects at home. For partners around the world.",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og-v2.png`,
          width: 1731,
          height: 909,
          alt: "KH Wood — Iraq's trusted wood supply partner",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "KH Wood | Iraq's Trusted Wood Supply & Market Partner",
      description:
        "For projects at home. For partners around the world.",
      images: [`${SITE_URL}/og-v2.png`],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><EnquiryProvider>{children}</EnquiryProvider></body>
    </html>
  );
}
