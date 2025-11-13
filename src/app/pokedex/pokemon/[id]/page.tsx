"use client";
import { Loading } from "@/components/Loading";
//const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png`;

import ProgressBar from "@/components/ProgressBar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [pokemonSpecies, setPokemonSpecies] = useState<any>(null);
  const [selectedVersion, setSelectedVersion] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemonSpecie = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const pokemonData = await res.json();
      const specieData = await pokemonSpecie.json();
      setPokemonData(pokemonData);
      setPokemonSpecies(specieData);
    };
    fetchData();
  }, [id]);

  if (!pokemonData || !pokemonSpecies) {
    return (
      <div className="text-center py-10">
        <Loading />
      </div>
    );
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
  const versions: string[] = Array.from(
    new Set(
      pokemonSpecies.flavor_text_entries
        .filter((e: any) => e.language.name === "en")
        .map((e: any) => e.version.name)
    )
  );
  
  const filteredEntries = pokemonSpecies.flavor_text_entries
    .filter((e: any) => e.language.name === "en")
    .filter(
      (e: any) =>
        selectedVersion === "all" || e.version.name === selectedVersion
    );

  return (
    <div className="pt-10 w-full max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <Link href={`/pokedex/pokemon/${Number(id) - 1}`}>
          <button
            className={`cursor-pointer hover:underline ${
              Number(id) == 1 ? "hidden" : ""
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
              Number(id) == 1025 ? "hidden" : ""
            }`}
          >
            Next{">"}
          </button>
        </Link>
      </div>
      <div>
        <div className="flex flex-row flex-wrap items-center justify-center gap-8 mb-8">
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

        {/* Entries Table */}
        <div className="w-full overflow-x-auto mb-10">
          <select
            id="version"
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            className="border border-gray-500 rounded-md px-2 py-1 text-sm my-4 bg-gray-100"
          >
            <option value="all">All Versions</option>
            {versions.map((version: string) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
          <table className="w-full border-collapse text-left ">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="py-2 px-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="version"
                      className="text-sm font-semibold mb-1"
                    >
                      Version
                    </label>
                  </div>
                </th>
                <th className="py-2 px-4">Pokédex Entries</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((e: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50 bg-gray-200">
                  <td
                    className="py-2 px-4 font-semibold whitespace-nowrap"
                    style={{ color: `var(--${e?.version?.name})` }}
                  >
                    {e?.version?.name.charAt(0).toUpperCase() + e?.version?.name.slice(1)}
                  </td>
                  <td className="py-2 px-4 align-top">
                    {e?.flavor_text.replace(/\f/g, " ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
