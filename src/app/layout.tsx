import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const font = Geist({ variable: "--font-geist", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sourcing & Procurement Tool",
  description: "Strategic sourcing control — supplier performance, AI cost analysis, risk monitoring and RFQ management.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${font.variable} h-full antialiased`}>
      <body className="min-h-full flex" style={{ background: "#f1f5f9", fontFamily: "var(--font-geist), sans-serif" }}>
        <Sidebar />
        <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
      </body>
    </html>
  );
}
