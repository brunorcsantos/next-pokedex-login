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
      <body className="antialiased screen font-sans bg-gradient-to-r from-blue-100 to-blue-300" >
        {!hideNavbar && <Navbar/>}
        <main>{children}</main>
      </body>
    </html>
  );
}
