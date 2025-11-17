"use client";
import React, { useState } from "react";
import { usePokemonEvolutions } from "@/hooks/usePokemonEvolutions ";

//export default function EvoList({ pokemonName }: { pokemonName: string }) {
export default function EvoList() {
  const [pokemonName, setPokemonName] = useState<string>("");
  
  setPokemonName("meowth")
  const { evolutions, loading, error } = usePokemonEvolutions(pokemonName);

  if (loading) return <div>Carregando evoluções...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!evolutions || evolutions.length === 0) return <div>Sem evoluções regionais para {pokemonName}</div>;

  return (
    <div className="grid grid-cols-1 gap-3">
      {evolutions.map((e) => (
        <div key={e.speciesName} className="p-3 border rounded">
          <div className="font-medium">{e.resolvedPokemonName}</div>
          <div className="text-sm text-gray-500">species: {e.speciesName}</div>
          <div className="text-xs text-gray-400 break-all">{e.speciesUrl}</div>
        </div>
      ))}
    </div>
  );
}
