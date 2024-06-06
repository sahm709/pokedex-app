import { useState, useEffect } from "react";
import { PokemonDetail } from "../models/models";
import { getPokemon, getPokemonList } from "../lib/pokemonApi";

export const useFetchPokemons = (page: number) => {
  const [pokemonList, setPokemonList] = useState<PokemonDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [maxPokemon, setMaxPokemon] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offset = (page - 1) * 15;
        const pokemonListResponse = await getPokemonList(15, offset);
        setMaxPokemon(pokemonListResponse.count);
        const detailedDataPromises = pokemonListResponse.results.map(
          (pokemon) => getPokemon(pokemon.name)
        );

        const detailedData = await Promise.all(detailedDataPromises);
        setPokemonList(detailedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return { pokemonList, isLoading, maxPokemon };
};
