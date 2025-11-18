"use client";

import { getEvolutions } from "@/functions/Evolutions";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface EvolutionsProps {
  evolutionChainUrl: any;
}

const Evolutions = ({ evolutionChainUrl }: EvolutionsProps) => {
  const [firstEvolution, setFirstEvolution] = useState<any>(null);
  const [secondEvolution, setSecondEvolution] = useState<any>(null);
  const [thirdEvolution, setThirdEvolution] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [secondTrigger, setSecondTrigger] = useState<string>("");
  const [thirdTrigger, setThirdTrigger] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const evolutionChain = await fetch(evolutionChainUrl.url);
        const chainData = await evolutionChain.json();

        // chainData.chain.evolves_to.forEach((e: any) => {
        //   if (e.species.name === "persian") {
        //     console.log(e.species);
        //   }
        // });

        const evolutions = await getEvolutions(evolutionChainUrl.url);
        console.log(evolutions);

        const evoMap = [
          chainData.chain.species.name,
          evolutions?.second.name,
          evolutions?.third.name,
        ];

        if (evolutions?.second.name === null) {
          setIsLoading(false);
          return;
        }

        // URLs garantidas na ordem certa
        const urls = evoMap.map((name) =>
          typeof name === "string"
            ? `https://pokeapi.co/api/v2/pokemon/${name}`
            : null
        );

        // Faz fetch apenas das existentes
        const fetchPromises = urls.map((url) =>
          url ? fetch(url).then((r) => (r.ok ? r.json() : null)) : null
        );

        const data = await Promise.all(fetchPromises);

        setFirstEvolution(data[0]);
        setSecondEvolution(data[1]);
        setThirdEvolution(data[2]);
        setSecondTrigger(evolutions.second.trigger);
        setThirdTrigger(evolutions.third.trigger);

        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar evoluções:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Carregando evoluções...</div>;

  return (
    <div className="flex flex-row items-center justify-center text-center">
      {/* Primeira evolução */}
      {firstEvolution?.name && (
        <Link href={`/pokedex/pokemon/${firstEvolution?.id}`}>
          <div className="flex flex-col gap-4 m-4 h-14 w-14 sm:h-28 sm:w-28 bg-gray-200 rounded-full">
            <img
              src={firstEvolution?.sprites.front_default}
              alt={firstEvolution?.name}
            />
            <p className="font-bold">{firstEvolution?.name.toUpperCase()}</p>
          </div>
        </Link>
      )}

      {/* Setinha entre 1ª e 2ª */}
      {firstEvolution?.name && secondEvolution?.name && (
        <div className="flex flex-col items-center">
          <span>{secondTrigger}</span>
          <Arrow />
        </div>
      )}

      {/* Segunda evolução */}
      {secondEvolution?.name && (
        <Link href={`/pokedex/pokemon/${secondEvolution?.id}`}>
          <div className="flex flex-col gap-4 m-4 h-14 w-14 sm:h-28 sm:w-28 bg-gray-200 rounded-full">
            <img
              src={secondEvolution?.sprites.front_default}
              alt={secondEvolution?.name}
            />
            <p className="font-bold">{secondEvolution?.name.toUpperCase()}</p>
          </div>
        </Link>
      )}

      {/* Setinha entre 2ª e 3ª */}
      {secondEvolution?.name && thirdEvolution?.name && (
        <div>
          <span className="flex flex-col items-center">{thirdTrigger}</span>
          <Arrow />
        </div>
      )}

      {/* Terceira evolução */}
      {thirdEvolution?.name && (
        <Link href={`/pokedex/pokemon/${thirdEvolution?.id}`}>
          <div className="flex flex-col gap-4 m-4 h-14 w-14 sm:h-28 sm:w-28 bg-gray-200 rounded-full whitespace-nowrap">
            <img
              src={thirdEvolution?.sprites.front_default}
              alt={thirdEvolution?.name}
              className=""
            />
            <p className="font-bold">{thirdEvolution?.name.toUpperCase()}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
    />
  </svg>
);

export default Evolutions;
