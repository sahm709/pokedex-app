import {
  Pokemon,
  EvolutionChain,
  PokemonDetail,
  PokemonListResponse,
} from "../models/models";

const POKEMON_API = "https://pokeapi.co/api/v2/";

// pokemonApi.ts
export const getPokemonList = async (
  limit: number,
  offset: number
): Promise<PokemonListResponse> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await response.json();
  return data;
};

export async function getPokemon(name: string): Promise<PokemonDetail> {
  const response = await fetch(POKEMON_API + "pokemon/" + name);
  const data = await response.json();
  return data;
}

export const getImageURL = (pokemonId: number) => {
  const baseURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other";

  // Has only PNG.
  if (pokemonId >= 650) {
    return `${baseURL}/official-artwork/${pokemonId}.png`;
  }

  // Has SVG.
  return `${baseURL}/dream-world/${pokemonId}.svg`;
};
export async function fetchPokemonEvolutionChain(
  pokemonId: number
): Promise<EvolutionChain> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
  );
  const data = await response.json();
  const evolutionChainId = data.evolution_chain.url.match(/\/(\d+)\//)[1];

  const chainResponse = await fetch(
    `https://pokeapi.co/api/v2/evolution-chain/${evolutionChainId}`
  );
  const chainData = await chainResponse.json();

  return chainData;
}
