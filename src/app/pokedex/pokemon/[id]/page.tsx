//const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png`;

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = params;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${(await id).id}`);

  if (!res.ok) {
    return (
      <div className="flex flex-col items-center justify-center h-full" style={{ backgroundColor: "var(--water-off)" }}>
        <h1 className="text-2xl font-bold text-red-700">
          Pokémon não encontrado!
        </h1>
      </div>
    );
  }

  const data = await res.json();
  

  return (
    <div className="flex flex-col items-center pt-10 justify-start h-full">
      <div className="flex flex-col items-center mb-6">
        <div>{data.name.toUpperCase()}</div>
        <div>#{data.id.toString().padStart(4, "0")}</div>
      </div>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          (await id).id
        }.png`}
        alt=""
        className="bg-gray-200 w-92 h-96"
      />
      <div></div>
    </div>
  );
}
