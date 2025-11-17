"use client";
import Evolutions from "@/components/Evolutions";
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
  const [hideTableEntries, setHideTableEntries] = useState<boolean>(false);
  const [pokemonSpecies, setPokemonSpecies] = useState<any>(null);
  const [selectedVersion, setSelectedVersion] = useState<string>("all");
  const [pokemonEvolution, setPokemonEvolution] = useState<any>(null);
  const [evolutions, setEvolutions] = useState<{
    first: any;
    second: any;
    third: any;
  }>({
    first: { name: "", trigger: "" },
    second: null,
    third: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const urls = [
        id && `https://pokeapi.co/api/v2/pokemon/${id}`,
        id && `https://pokeapi.co/api/v2/pokemon-species/${id}`,
      ].filter(Boolean);

      const responses = await Promise.all(urls.map((url) => fetch(url!)));
      const data = await Promise.all(responses.map((res) => res.json()));

      const pokemonEvolution = await fetch(data[1].evolution_chain.url);
      const evolutionData = await pokemonEvolution.json();

      setPokemonEvolution(await evolutionData);
      setPokemonData(data[0]);
      setPokemonSpecies(data[1]);
      
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!pokemonEvolution) return;

    const evolutionsData: any = { first: { name: "", trigger: "" } };

    evolutionsData.first = pokemonEvolution?.chain.species.name;
    // pokemonEvolution?.chain.evolves_to.map((e:any) => {
    //   evolutionsData.first.trigger = e?.trigger?.name
    // });

    pokemonEvolution.chain.evolves_to.forEach((e: any) => {
      evolutionsData.second = e?.species.name;

      e?.evolves_to?.forEach((inner: any) => {
        evolutionsData.third = inner?.species.name;
      });
    });
    

    setEvolutions(evolutionsData);
  }, [pokemonEvolution]);

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
          <div className="flex flex-col items-center h-60 w-60 bg-gray-200 rounded-full">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              alt=""
              className="w-full max-w-xs h-auto object-contain"
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
        {/* Evolution */}
        <div className="whitespace-nowrap">
          <Evolutions evolutionChainUrl={pokemonSpecies.evolution_chain}/>
        </div>

        {/* Entries Table */}
        <div
          className="w-full overflow-x-auto my-16 cursor-pointer"
          onClick={() => setHideTableEntries(!hideTableEntries)}
        >
          <table className="w-full border-collapse text-left">
            <thead className="">
              <tr className="border-b bg-gray-100">
                <th className="py-2 px-4">
                  <div className="flex flex-col">
                    <span
                      className="text-sm font-semibold"
                    >
                      Version
                    </span>
                  </div>
                </th>

                {/* SEGUNDA COLUNA - texto + ícone */}
                <th className="py-2 px-4">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold">Pokédex Entries</span>
                    {/* <select
                      id="version"
                      value={selectedVersion}
                      onChange={(e) => setSelectedVersion(e.target.value)}
                      className="border border-gray-500 rounded-md px-2 py-1 text-sm  bg-gray-100"
                    >
                      <option value="all">All Versions</option>
                      {versions.map((version: string) => (
                        <option key={version} value={version}>
                          {version}
                        </option>
                      ))}
                    </select> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`size-6 transition-transform duration-300 cursor-pointer 
              ${hideTableEntries ? "rotate-0" : "rotate-180"}`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody
              className={`origin-top transition-all duration-500 ease-in-out overflow-hidden
      ${
        hideTableEntries
          ? "max-h-0 opacity-0 scale-y-0 rounded-xl"
          : "max-h-[2000px] opacity-100 scale-y-100 rounded-md"
      }
    `}
            >
              {filteredEntries.map((e: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50 bg-gray-200">
                  <td
                    className="py-2 px-4 font-semibold whitespace-nowrap"
                    style={{ color: `var(--${e?.version?.name})` }}
                  >
                    {e?.version?.name.charAt(0).toUpperCase() +
                      e?.version?.name.slice(1)}
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
