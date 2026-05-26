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
  title: "FaunaLens - ระบบจำแนกสายพันธุ์สัตว์ด้วย AI",
  description: "ค้นหาและวิเคราะห์สายพันธุ์สัตว์ป่าและสัตว์เลี้ยงจากภาพถ่ายด้วยเทคโนโลยี Google Gemini 2.5 Flash พร้อมรายงานผลชีววิทยา ถิ่นอาศัย และประวัติการสแกนแบบพรีเมียม",
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
