"use client";

import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import PokemonCard from "@/components/PokemonCard";
import Pagination from "@/components/Pagination";
import { Loading } from "@/components/Loading";
import Input from "@/components/Input";

const pokedexPage = () => {
  const itemsPerPage = 18;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<any[]>([]);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
      const data = await res.json();
      const detailed = await fetchDetailedPokemon(data.results);

      setPokemonData(detailed);
      setFilteredPokemon(detailed);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!pokemonData || pokemonData.length === 0) return;

    if (pokemonName.trim() === "") {
      setFilteredPokemon(pokemonData);
      setCurrentPage(1);
      return;
    }

    const timer = setTimeout(() => {
      const fuse = new Fuse(pokemonData, {
        keys: ["name"], // Campo usado para buscar
        threshold: 0.4, // 0 = busca exata | 1 = tudo é similar (0.3–0.4 é ideal)
      });

      const results = fuse.search(pokemonName);
      setFilteredPokemon(results.map((r) => r.item));
      setCurrentPage(1);
    }, 300); // 300ms de atraso
    return () => clearTimeout(timer);
  }, [pokemonName, pokemonData]);

  useEffect(() => {
    localStorage.setItem("currentPage", String(currentPage));
  }, [currentPage]);

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPokemon.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Função auxiliar para limitar o número de botões visíveis
  const getVisiblePages = () => {
    const maxVisible = 5;
    const pages = [];

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };
  return isLoading ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div className="h-full overflow-auto">
      <div className="flex flex-col items-center w-full max-w-6xl mx-auto py-4">
        {/*Input*/}
        <Input setPokemonName={setPokemonName} />
        {/* Cards de Pokémon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-2 w-full min-w-0">
          {currentItems.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemonData={pokemon} />
          ))}
        </div>

        {/* Paginação */}
        <Pagination
          startIndex={startIndex}
          itemsPerPage={itemsPerPage}
          filteredPokemon={filteredPokemon}
          goToPrevious={goToPrevious}
          currentPage={currentPage}
          getVisiblePages={getVisiblePages}
          setCurrentPage={setCurrentPage}
          goToNext={goToNext}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default pokedexPage;
