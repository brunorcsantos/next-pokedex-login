export async function getEvolutions(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar cadeia de evolução");
  }

  const data = await response.json();
  const chain = data.chain;

  const evolutions = {
    first: chain.species?.name || "",
    second: { name: "", trigger: "" },
    third: { name: "", trigger: "" },
  };

  // ===== 2ª EVOLUÇÃO =====
  const secondStage = chain.evolves_to?.[0];
  if (!secondStage) return evolutions;

  evolutions.second.name = secondStage.species.name;
  evolutions.second.trigger = secondStage.evolution_details?.[0]?.trigger?.name || null;

  // ===== 3ª EVOLUÇÃO =====
  const thirdStage = secondStage.evolves_to?.[0];
  if (!thirdStage) return evolutions;

  evolutions.third.name = thirdStage.species.name;
  evolutions.third.trigger = thirdStage.evolution_details?.[0]?.trigger?.name || null;

  return evolutions;
}