"use client";
import { Loading } from "@/components/Loading";
//const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png`;

import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PokemonPage({ params }: { params: { id: string } }) {
  const { id } = React.use(params);
  const [pokemonData, setPokemonData] = useState<any>(null);
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

      const data = await res.json();

      setPokemonData(data);
    };
    fetchData();
  }, [id]);

  if (!pokemonData) {
    return <div className="text-center py-10">
      <Loading />
    </div>;
  }

  // if (!pokemonData) {
  //   return (
  //     <div
  //       className="flex flex-col items-center justify-center h-full"
  //       style={{ backgroundColor: "var(--water-off)" }}
  //     >
  //       <h1 className="text-2xl font-bold text-red-700">
  //         Pokémon não encontrado!
  //       </h1>
  //     </div>
  //   );
  // }

  return (
    <div className="pt-10 w-full max-w-4xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <Link href={`/pokedex/pokemon/${Number(id) - 1}`}>
          <button
            className={`cursor-pointer hover:underline ${
              id == 1 ? "hidden" : ""
            }`}
          >
            {"<"}Previous
          </button>
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">
            {pokemonData.name.toUpperCase()}
          </span>
          <span className="text-gray-700">
            #{pokemonData.id.toString().padStart(4, "0")}
          </span>
        </div>
        <Link href={`/pokedex/pokemon/${Number(id) + 1}`}>
          <button
            className={`cursor-pointer hover:underline ${
              id == 1025 ? "hidden" : ""
            }`}
          >
            Next{">"}
          </button>
        </Link>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-8">
        {/* Images */}
        <div className="flex flex-col items-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            alt=""
            className="bg-gray-200 w-full max-w-xs h-auto object-contain"
          />
          <div className="flex gap-2 mt-4 justify-center">
            {pokemonData.types.map((type: any) => (
              <span
                key={type.type.name}
                className="px-3 py-1 rounded-full font-semibold capitalize"
                style={{
                  backgroundColor: `var(--${type.type.name})`,
                  color: "white",
                }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
        {/* Stats */}
        <div className="flex flex-col gap-4 w-full max-w-lg">
          <ProgressBar stats={pokemonData.stats} />
        </div>
      </div>
    </div>
  );
}
