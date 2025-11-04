"use client";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const blogPage = () => {
  const [pokemon, setPokemon] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
      const data = await res.json();

      const detailed = await Promise.all(
        data.results.map(async (p: any) => {
          const res = await fetch(p.url);
          return res.json();
        })
      );

      setPokemon(detailed);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar/>
      <div className="grid grid-cols-6 gap-4 max-w-7xl m-6">
        <Card pokemon={pokemon} />
      </div>
    </div>
  );
};

export default blogPage;
