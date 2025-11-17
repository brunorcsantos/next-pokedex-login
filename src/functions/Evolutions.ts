export async function getEvolutions(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar cadeia de evolução");
  }

  const data = await response.json();
  const chain = data.chain;

  const evolutions = {
    first: chain.species?.name || null,
    second: null,
    third: null,
  };

  // Caso o Pokémon não evolua
  if (!chain.evolves_to || chain.evolves_to.length === 0) {
    return evolutions;
  }

  // Segunda evolução (primeiro nível)
  evolutions.second = chain.evolves_to[0].species?.name || null;

  if (evolutions.second) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${evolutions.second}`
    );
    const speciesData = await res.json();

    // varieties é um array, então filtrar corretamente:
    const defaultVariety = speciesData.varieties.find(
      (v: any) => v.is_default === true
    );
    console.log(defaultVariety)

    if (defaultVariety) {
      // Pega o nome correto da espécie default
      evolutions.second = defaultVariety.pokemon.name;
    }
  }

  // Caso não exista uma segunda evolução no array
  if (
    !chain.evolves_to[0].evolves_to ||
    chain.evolves_to[0].evolves_to.length === 0
  ) {
    return evolutions;
  }

  // Terceira evolução (segundo nível)
  evolutions.third = chain.evolves_to[0].evolves_to[0].species?.name || null;

  if (evolutions.third) {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${evolutions.third}`
    );
    const speciesData = await res.json();

    // varieties é um array, então filtrar corretamente:
    const defaultVariety = speciesData.varieties.find(
      (v: any) => v.is_default === true
    );

    if (defaultVariety) {
      // Pega o nome correto da espécie default
      evolutions.third = defaultVariety.pokemon.name;
    }
  }
  console.log(evolutions)

  return evolutions;
}
