"use client";

import { usePokemons } from "@/app/context/PokemonContext";
import { useFetchPokemons } from "@/app/hooks/useFetchData";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/loader";
import PokemonCard from "../PokemonCard/pokemon-card";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Pagination from "../Pagination/pagination";

interface PokemonGridProps {
  page: number;
}
const PokemonGrid = ({ page }: PokemonGridProps) => {
  const [currentPage, setCurrentPage] = useState(page);
  const { pokemonList, isLoading, maxPokemon } = useFetchPokemons(currentPage);
  const { pokemons, setPokemons } = usePokemons();
  const router = useRouter();
  useEffect(() => {
    setPokemons(pokemonList);
  }, [pokemonList, setPokemons]);
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  if (isLoading) return <Loader />;
  if (!pokemons.length) return <p>No profile data</p>;

  const goToNextPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + 1;
      router.push(`/?page=${nextPage}`);
      return nextPage;
    });
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => {
      const prevPageValue = Math.max(1, prevPage - 1);
      router.push(`/?page=${prevPageValue}`);
      return prevPageValue;
    });
  };

  const maxPages = Math.ceil(maxPokemon / 15);

  const maxButtons = 5;
  return (
    <div className="mx-4 md:mx-16 xl:mx-32 2xl:mx-64">
      <div className="grid items-center justify-center grid-cols-1 sm:grid-cols-2  xl:grid-cols-3">
        {pokemons.map((pokemon) => (
          <PokemonCard
            pokemon={pokemon}
            key={pokemon.id}
            onClick={() => router.push(`/pokemon/${pokemon.id}`)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        maxPokemon={maxPokemon}
        maxPages={maxPages}
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
      />

      {/* <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={goToPrevPage}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Previous
          </button>
          <button
            onClick={goToNextPage}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default PokemonGrid;
