"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="flex flex-1 flex-col items-center justify-center text-center p-6 pt-0"
      style={{color: "white", minHeight: "calc(100vh - 56px)" }}
    >
      {/* Conteúdo principal */}
      <section className="flex flex-col items-center justify-center gap-2 mt-0">
        <img src="images/slowpoke.png" alt="" className="w-72 object-cover"/>
        <h2 className="text-2xl font-bold drop-shadow-lg">
          Bem-vindo à sua Pokédex!
        </h2>
        <p className="text-lg max-w-lg opacity-90">
          Explore o mundo Pokémon e descubra informações detalhadas sobre
          centenas de criaturas incríveis.
        </p>

        <Link
          href="/pokedex"
          className="mt-0 px-6 py-3 text-lg font-semibold rounded-full transition-all"
          style={{
            backgroundColor: "var(--electric)",
            color: "black",
            boxShadow: "0 4px 0 var(--ground)",
          }}
        >
          Acessar Pokédex
        </Link>
      </section>

      {/* Rodapé */}
      <footer className="absolute bottom-0 py-2 text-sm opacity-70">
        © {new Date().getFullYear()} Pokédex Next — Feito com ❤️ e Tailwind
      </footer>
    </main>
  );
}
