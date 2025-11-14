"use client";

import { useEffect, useState } from "react";

const blogPage = () => {
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredPokemon, setFilteredPokemon] = useState<any[]>([]);
  const [page, setPage] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=12"
  );
  const [nextPage, setNextPage] = useState<string>("");
  const [previousPage, setPreviousPage] = useState<string>("");

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

  const handlePage = (url: string) => {
    setPage(url);
    console.log(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(page);
      const data = await res.json();
      console.log(data);
      setNextPage(data.next);
      setPreviousPage(data.previous);
      const detailed = await fetchDetailedPokemon(data.results);

      setPokemonData(detailed);
      setFilteredPokemon(detailed);
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

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
    <div className="flex flex-col items-center justify-start p-6 min-h-screen">
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
            <div className="flex flex-col items-center">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl">
                {filteredPokemon.map((pokemon) => (
                  <Card key={pokemon.id} pokemonData={pokemon} />
                ))}
              </div>
              <div className="flex gap-4 m-10">
                <div className="flex flex-row gap-2">
                  {previousPage ? (
                    <button
                      className="cursor-pointer hover:text-sky-700 hover:font-bold m-2"
                      onClick={() => {
                        handlePage(previousPage);
                      }}
                    >
                      {"<<"}Previous
                    </button>
                  ) : (
                    ""
                  )}

                  <button
                    className="cursor-pointer hover:text-sky-700 hover:font-bold m-2"
                    onClick={() => {
                      handlePage(nextPage);
                    }}
                  >
                    Next{">>"}
                  </button>
                </div>
              </div>
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
