"use client";

import React, { useEffect, useState } from "react";

interface EvolutionsProps {
  evolutions: { first: string; second: string; third: string };
}

const Evolutions = ({ evolutions }: EvolutionsProps) => {
  const [firstEvolution, setFirstEvolution] = useState<any>(null);
  const [secondEvolution, setSecondEvolution] = useState<any>(null);
  const [thirdEvolution, setThirdEvolution] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const urls = [
        evolutions?.first &&
          `https://pokeapi.co/api/v2/pokemon/${evolutions.first}`,
        evolutions?.second &&
          `https://pokeapi.co/api/v2/pokemon/${evolutions.second}`,
        evolutions?.third &&
          `https://pokeapi.co/api/v2/pokemon/${evolutions.third}`,
      ].filter(Boolean);

      const responses = await Promise.all(urls.map((url) => fetch(url!)));
      const data = await Promise.all(responses.map((res) => res.json()));

      setFirstEvolution(data[0]);
      setSecondEvolution(data[1]);
      setThirdEvolution(data[2]);
    };
    fetchData();
  }, [evolutions]);

  if (!firstEvolution) return <div>Carregando evoluções...</div>;

  console.log(firstEvolution, secondEvolution, thirdEvolution);

  return (
    <div className="flex flex-row items-center justify-center text-center">
      {/* Primeira evolução */}
      {secondEvolution && (
        <div className="flex flex-col gap-4 m-4">
          <img
            src={firstEvolution.sprites.other.showdown.front_default}
            alt={firstEvolution.name}
          />
          <p className="font-bold">{firstEvolution.name.toUpperCase()}</p>
        </div>
      )}

      {/* Setinha entre 1ª e 2ª */}
      {secondEvolution && <div>{"->"}</div>}

      {/* Segunda evolução */}
      {secondEvolution && (
        <div className="flex flex-col gap-4 m-4">
          <img
            src={secondEvolution.sprites.other.showdown.front_default}
            alt={secondEvolution.name}
          />
          <p className="font-bold">{secondEvolution.name.toUpperCase()}</p>
        </div>
      )}

      {/* Setinha entre 2ª e 3ª */}
      {thirdEvolution && <div>{"->"}</div>}

      {/* Terceira evolução */}
      {thirdEvolution && (
        <div className="flex flex-col gap-4 m-4">
          <img
            src={thirdEvolution.sprites.other.showdown.front_default}
            alt={thirdEvolution.name}
          />
          <p className="font-bold">{thirdEvolution.name.toUpperCase()}</p>
        </div>
      )}
    </div>
  );
};

export default Evolutions;
