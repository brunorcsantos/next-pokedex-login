"use client";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

const blogPage = () => {
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredPokemon, setFilteredPokemon] = useState<any[]>([]);

  const fetchDetailedPokemon = async (results: any[]) => {
    const chunkSize = 50;
    const allDetailed: any[] = [];

    for (let i = 0; i < results.length; i += chunkSize) {
      const chunk = results.slice(i, i + chunkSize);
      const detailedChunk = await Promise.all(
        chunk.map(async (p: any) => {
          const res = await fetch(p.url);
          return res.json();
        })
      );
      allDetailed.push(...detailedChunk);
    }

    return allDetailed;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1025`);
      const data = await res.json();

      const detailed = await fetchDetailedPokemon(data.results);

      setPokemonData(detailed);
      setFilteredPokemon(detailed);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (pokemonName.trim() === "") {
      setFilteredPokemon(pokemonData);
    } else {
      const filtered = pokemonData.filter((p) =>
        p.name.toLowerCase().includes(pokemonName.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  }, [pokemonName, pokemonData]);
  

  return (
    <div
      className="flex flex-col items-center justify-start p-6 min-h-screen"
      style={{ backgroundColor: "var(--water-off)" }}
    >
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <>
          <div className="flex flex-row gap-2 mb-4 items-center h-[50px]">
            <input
              type="text"
              className="bg-white border"
              onChange={(e) => {
                setPokemonName(e.target.value);
              }}
            />
            <span>Search</span>
          </div>
          {filteredPokemon.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl">
              {filteredPokemon.map((pokemon) => (
                <Card key={pokemon.id} pokemonData={pokemon} />
              ))}
            </div>
          ) : (
            <div className="text-gray-600 text-center col-span-full mt-8">
              Nenhum Pokémon encontrado
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default blogPage;
