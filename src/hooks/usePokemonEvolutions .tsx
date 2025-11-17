"use client";
import { useEffect, useState } from "react";

type EvoResult = {
  speciesName: string;      // ex: "persian" (nome da species no evolution chain)
  resolvedPokemonName: string; // ex: "persian-alola" ou "persian" dependendo da disponibilidade da forma regional
  speciesUrl: string;       // URL do pokemon-species (útil se quiser mais dados)
};

type HookReturn = {
  evolutions: EvoResult[] | null;
  loading: boolean;
  error: string | null;
};

/**
 * Percorre recursivamente a evolution chain e retorna uma lista (em ordem)
 * de species { name, url } encontrados na árvore (exclui o root se necessário).
 */
function flattenChain(chainNode: any): Array<{ name: string; url: string }> {
  const list: Array<{ name: string; url: string }> = [];

  function walk(node: any) {
    if (!node) return;
    if (node.species) {
      list.push({ name: node.species.name, url: node.species.url });
    }
    if (Array.isArray(node.evolves_to) && node.evolves_to.length) {
      node.evolves_to.forEach((child: any) => walk(child));
    }
  }

  walk(chainNode);
  return list;
}

/**
 * Verifica se a species especificada possui uma variedade (variety) com o nome
 * esperado (ex: "persian-alola"). Retorna o nome do pokemon (variety) se existir,
 * ou null caso contrário.
 */
async function findVarietyWithSuffix(speciesUrl: string, targetVarietyName: string): Promise<string | null> {
  try {
    const res = await fetch(speciesUrl);
    if (!res.ok) return null;
    const species = await res.json();
    if (!species.varieties) return null;

    const found = species.varieties.find((v: any) => v.pokemon && v.pokemon.name === targetVarietyName);
    return found ? found.pokemon.name : null;
  } catch {
    return null;
  }
}

/**
 * Hook principal.
 * @param pokemonName - nome exato usado na PokéAPI, ex: "meowth", "meowth-alola", "meowth-galar"
 */
export function usePokemonEvolutions(pokemonName: string | null): HookReturn {
  const [evolutions, setEvolutions] = useState<EvoResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemonName) {
      setEvolutions(null);
      setError(null);
      return;
    }

    let mounted = true;

    const run = async () => {
      setLoading(true);
      setError(null);
      setEvolutions(null);

      try {
        // 1) buscar /pokemon/{name} (ponto de entrada)
        const pRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        if (!pRes.ok) throw new Error(`Pokémon não encontrado: ${pokemonName}`);
        const pData = await pRes.json();

        // 2) species url
        const speciesUrl: string = pData.species.url; // ex: "https://pokeapi.co/api/v2/pokemon-species/52/"

        // 3) buscar species para pegar evolution_chain url e species base name
        const sRes = await fetch(speciesUrl);
        if (!sRes.ok) throw new Error("Erro ao buscar pokemon-species");
        const sData = await sRes.json();

        // identificar se o nome recebido é uma forma regional (ex: meowth-alola)
        const baseSpeciesName: string = sData.name; // geralmente "meowth"
        const inputNameLower = pokemonName.toLowerCase();
        let regionSuffix: string | null = null;

        // se o input for diferente do baseSpeciesName e tiver '-', pegamos sufixo
        if (inputNameLower !== baseSpeciesName && inputNameLower.startsWith(baseSpeciesName + "-")) {
          regionSuffix = inputNameLower.slice((baseSpeciesName + "-").length); // ex: "alola", "galar"
        }

        // 4) pegar evolution_chain
        const evoChainUrl: string = sData.evolution_chain?.url;
        if (!evoChainUrl) {
          if (mounted) {
            setEvolutions([]);
            setLoading(false);
          }
          return;
        }

        const chainRes = await fetch(evoChainUrl);
        if (!chainRes.ok) throw new Error("Erro ao buscar evolution_chain");
        const chainData = await chainRes.json();

        // 5) flatten chain em uma lista de species
        const speciesList = flattenChain(chainData.chain); // ex: [{name: "meowth", url: "..."} , {name:"persian", url:"..."} ...]

        // 6) Para cada species na lista, resolver se existe forma regional equivalente (ex: persian-alola)
        const results: EvoResult[] = [];

        for (const sp of speciesList) {
          // pulamos a species original (se quiser incluir a forma base, removível)
          // Mas vamos incluir todas; o usuário pode filtrar no componente.
          const speciesName = sp.name; // ex: "persian"
          let resolvedPokemonName = speciesName; // por default

          if (regionSuffix) {
            // montar candidate: ex "persian-alola"
            const candidateName = `${speciesName}-${regionSuffix}`;
            // verificar se essa species possui uma variety com esse nome
            const match = await findVarietyWithSuffix(sp.url, candidateName);
            if (match) {
              resolvedPokemonName = match; // ex: "persian-alola"
            } else {
              // se não tem variedade, não forçamos incluir a forma base como evolução da forma regional.
              // Dependendo do que você desejar: pode manter resolvedPokemonName = speciesName
              // ou definir resolvedPokemonName = null para indicar "não existe evolução regional".
              // Aqui vou manter o base como fallback (útil pra exibir 'persian' caso exista).
              resolvedPokemonName = speciesName;
            }
          }

          results.push({
            speciesName,
            resolvedPokemonName,
            speciesUrl: sp.url,
          });
        }

        if (mounted) {
          // normalmente, você vai querer retornar apenas as evoluções posteriores ao Pokémon atual.
          // Vamos filtrar para começar a lista a partir da espécie do pokemon atual.
          const idxCurrent = results.findIndex(r => r.speciesName === baseSpeciesName || r.resolvedPokemonName === inputNameLower);
          const sliced = idxCurrent >= 0 ? results.slice(idxCurrent + 1) : results; // evoluções após a espécie atual
          setEvolutions(sliced.length ? sliced : []);
        }
      } catch (err: any) {
        if (mounted) setError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [pokemonName]);

  return { evolutions, loading, error };
}
