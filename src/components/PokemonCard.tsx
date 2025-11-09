"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";

export default function PokemonCard(props: any) {
  const { pokemonData: p } = props;

  return (
    <>
      <Link href={`/pokedex/pokemon/${p?.id}`}>
        <div
          key={p.id ?? p.name}
          className="bg-white dark:bg-gray-200 rounded-2xl shadow-md p-4 flex flex-col items-center justify-between transition hover:scale-105 h-auto w-full"
        >
          <div className="flex gap-2 mt-4">
            {p.types.map((type: any) => (
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
          <div className="flex items-center justify-center w-full h-28">
            <img
              src={p.sprites?.front_default}
              alt={p.name}
              className="w-full h-full object-contain"
            />
          </div>
          <p className="capitalize font-semibold text-black text-center">
            {p.name}
          </p>
          <p className="text-gray-500 text-center">#{p.id}</p>
        </div>
      </Link>
    </>
  );
}
