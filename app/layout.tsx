import type { Metadata } from "next";
import { headers } from "next/headers";
import { EnquiryProvider } from "./components/EnquiryCart";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ||
    requestHeaders.get("host") ||
    "khwood.example";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ||
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "KH Wood | Iraq's Trusted Wood Supply & Market Partner",
    description:
      "Family-led wood and construction supply for Iraqi projects, plus trusted market access for international manufacturers.",
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
          url: `${origin}/og-v2.png`,
          width: 1734,
          height: 905,
          alt: "KH Wood — Iraq's trusted wood supply partner",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "KH Wood | Iraq's Trusted Wood Supply & Market Partner",
      description:
        "For projects at home. For partners around the world.",
      images: [`${origin}/og-v2.png`],
    },
  };
}

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
