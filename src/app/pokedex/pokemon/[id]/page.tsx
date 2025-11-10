//const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png`;

import ProgressBar from "@/components/ProgressBar";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = params;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${(await id).id}`);

  if (!res.ok) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full"
        style={{ backgroundColor: "var(--water-off)" }}
      >
        <h1 className="text-2xl font-bold text-red-700">
          Pokémon não encontrado!
        </h1>
      </div>
    );
  }

  const data = await res.json();
  const tp = 40;

  return (
    <div className="pt-10 w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-col items-center mb-6">
        <div>{data.name.toUpperCase()}</div>
        <div>#{data.id.toString().padStart(4, "0")}</div>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-between gap-8">
        <div className="w-full max-w-xs flex flex-col items-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              (await id).id
            }.png`}
            alt=""
            className="bg-gray-200 w-full max-w-xs h-auto object-contain"
          />
          <div className="flex gap-2 mt-4 flex-wrap justify-center">
            {data.types.map((type: any) => (
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
        </div>
        <div className="flex flex-col gap-4 w-full max-w-lg">
          <ProgressBar stats={data.stats}/>
        </div>
      </div>
    </div>
  );
}
