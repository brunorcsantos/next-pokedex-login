"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  

  return (
    // make navbar sticky so it's always at the top of the viewport
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-red-500 text-white p-4 h-14">
      <Link href={"/"}>
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-20 h-10 object-contain"
        />
      </Link>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/pokedex">Pokédex</Link>
        {/* {pathname === "/login" ? (
          <Link
            href="/auth/register"
            className="text-white font-semibold hover:underline"
          >
            Register
          </Link>
        ) : (
          <Link
            href="/auth/login"
            className="text-white font-semibold hover:underline"
          >
            Login
          </Link>
        )} */}
      </div>
    </nav>
  );
}
