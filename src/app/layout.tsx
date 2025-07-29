import type { Metadata } from "next";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import LayoutWrapper from "../app/components/layout-wrapper/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HRMS",
  description: "Developed by CINQDev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
    //   <head />
    //   <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
    //     <LayoutWrapper>{children}</LayoutWrapper>
    //   </body>
    // </html>


    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo.png" type="image/x-icon" />
        <title>HRMS</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
