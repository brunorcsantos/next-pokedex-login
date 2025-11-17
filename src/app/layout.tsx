"use client"
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col font-sans bg-[#9acce7]">
        <Navbar />
        {/* make main exactly viewport minus navbar (navbar = h-14 = 56px) */}
        <main className="overflow-y-auto overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
