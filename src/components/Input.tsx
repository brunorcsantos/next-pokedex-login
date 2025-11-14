"use client"

import React from "react";

interface StateProps{
  setPokemonName: (name: string) => void
}

const Input = ({ setPokemonName }: StateProps) => {
  return (
    <div className="relative w-68 md:w-full max-w-md mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 
                     bg-white/90 backdrop-blur-sm shadow-sm transition-all
                     focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300
                     text-gray-900 placeholder-gray-500"
        onChange={(e) => {
          setPokemonName(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
