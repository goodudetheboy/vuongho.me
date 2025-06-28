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
  title: "Vuong Ho - Software Engineer",
  description: "Software Engineer with experience at Meta, Google, and Bloomberg",
  openGraph: {
    title: "Vuong Ho - Software Engineer",
    description: "Software Engineer with experience at Meta, Google, and Bloomberg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vuong Ho - Software Engineer",
    description: "Software Engineer with experience at Meta, Google, and Bloomberg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
