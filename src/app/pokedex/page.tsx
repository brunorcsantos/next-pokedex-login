"use client";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const blogPage = () => {
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredPokemon, setFilteredPokemon] = useState<any[]>([]);

  console.log(pokemonName)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1025`);
      const data = await res.json();

      const detailed = await Promise.all(
        data.results.map(async (p: any) => {
          const res = await fetch(p.url);
          return res.json();
        })
      );
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
    <div className="sticky flex flex-col items-center justify-center p-6 bg-blue-200 min-h-screen">
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <>
          <div className="flex flex-row gap-2 mb-4">
            <span>Search</span>
            <input type="text" className="bg-white border" onChange={(e) => {setPokemonName(e.target.value)}}/>
          </div>
          <div className="grid grid-cols-6 gap-4 max-w-7xl">
            <Card pokemonData={filteredPokemon} />
          </div>
        </>
      )}
    </div>
  );
};

export default blogPage;
