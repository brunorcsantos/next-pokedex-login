"use client"
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login";

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col font-sans bg-[#5CAEDB]">
        {!hideNavbar && <Navbar />}
        {/* make main exactly viewport minus navbar (navbar = h-14 = 56px) */}
        <main className="h-[calc(100vh-56px)] overflow-y-auto overflow-x-hidden">{children}</main>
      </body>
    </html>
  );
}
