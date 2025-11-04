"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-red-500 text-white p-4">
      <Link href={"/"}>
        <img
          src="images/logo.png"
          alt=""
          className="w-20 h-10 object-contain"
        />
      </Link>
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/pokedex">Pokédex</Link>
        <Link href="/sobre">Sobre</Link>
      </div>
    </nav>
  );
}
