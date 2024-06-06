"use client";
import PokemonGrid from "./components/PokemonGrid/pokemon-grid";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Loader from "./components/Loader/loader";

export default function Home() {
  const searchParams = useSearchParams();
  const pageQueryParam = searchParams.get("page");
  const page = pageQueryParam ? parseInt(pageQueryParam) : 1;
  return (
    <div className="pokedex-app lg:mx-16 mt-8">
      <h1 className="heading text-center font-bold text-3xl my-4 mb-16 text-gray-600 relative text-[#444444]">
        Pokédex
      </h1>
      <Suspense fallback={<Loader />}>
        <PokemonGrid page={page} />
      </Suspense>
    </div>
  );
}
