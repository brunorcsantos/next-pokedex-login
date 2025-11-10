import React from "react";

export const Loading = () => {
  const loading = "loading";
  const splitedString = loading.split("");

  return (
    <div className="flex justify-center items-center w-full h-screen ">
      {splitedString.map((char, idx) => (
        <div key={idx} className="">
          <img
            src={`https://img.pokemondb.net/sprites/black-white/anim/normal/unown-${char}.gif`}
            alt="Unown"
          />
        </div>
      ))}
    </div>
  );
};
