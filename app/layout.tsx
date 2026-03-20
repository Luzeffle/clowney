import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "@Clowney",
  description: "Best Virtual Cosmetics Sellers on Twitter as legit as can be!",
  icons: {
    icon: "/profile.webp",
  },

  // This is the magic section for link previews!
  openGraph: {
    title: "@Clowney",
    description: "Best Virtual Cosmetics Sellers on Twitter as legit as can be!",
    url: "https://clowney.vercel.app/",
    images: [
      {
        url: "/opengraph-image.png", // Put this image in your 'public' folder
        width: 1200,
        height: 630,
        alt: "@Clowney Portfolio Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Twitter uses its own slightly different system
  twitter: {
    card: "summary_large_image",
    title: "@Clowney",
    description: "Best Virtual Cosmetics Sellers on Twitter as legit as can be!",
    images: ["/opengraph-image.png"], // Same image as above
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
