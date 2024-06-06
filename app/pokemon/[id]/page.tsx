"use client";
import { usePokemons } from "@/app/context/PokemonContext";
import "./css/pokemon-detail.css";
import React, { useEffect, useState } from "react";
import {
  TAB_ABOUT,
  TAB_DEFAULT,
  TAB_EVOLUTION,
  TAB_MOVES,
  TAB_STATS,
  tabs,
} from "@/app/models/tab";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader/loader";
import { getImageURL, getPokemon } from "@/app/lib/pokemonApi";
import PokemonCard from "@/app/components/PokemonCard/pokemon-card";
import Image from "next/image";
import PokemonAbout from "@/app/components/details/PokemonDetailAbout/css/pokemon-detail-about";
import Evolution from "@/app/components/details/PokemonDetailEvolution/pokemon-detail-evolution";
import PokemonMoves from "@/app/components/details/PokemonDetailMoves/pokemon-detail-moves";
import PokemonStats from "@/app/components/details/PokemonDetailStats/pokemon-detail-stats";
import { PokemonDetail } from "../../models/models";
import BackButton from "@/app/components/BackButton/back-button";
const PokemonDetailPage = ({ params }: { params: { id?: string } }) => {
  const { id } = params;
  const [pokemon, setPokemon] = useState<PokemonDetail | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [currentTab, setCurrentTab] = useState(TAB_DEFAULT);

  const router = useRouter();
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const pokemonData = await getPokemon(id);
          setPokemon(pokemonData);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching Pokemon data:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  if (!pokemon) {
    return <p>No pokemon data</p>;
  }

  const imgURL = getImageURL(pokemon?.id);

  const typeClassNames = pokemon.types
    .map(({ type }) => "type-" + type.name)
    .join(" ");

  const getClassName = (tabName: string) => {
    return `tab-switch ${
      currentTab === tabName ? "active" : ""
    } ${typeClassNames}`;
  };
  return (
    <div className="flex justify-center items-start p-0 h-screen">
      <div className="pokemon-detail flex flex-col h-3/4 max-w-3xl w-full">
        {isLoading && <Loader />}
        <div className="detail-card min-h-96 mt-0">
          <BackButton onClick={() => router.push("/")} />

          <PokemonCard pokemon={pokemon} />
        </div>
        <div className="details">
          <Image
            alt={pokemon.name}
            src={imgURL}
            className="pokemon-image"
            width={100}
            height={100}
          />
          <div className="tabs-switch-container">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                className={getClassName(id)}
                onClick={() => setCurrentTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {(() => {
            switch (currentTab) {
              case TAB_ABOUT:
                return <PokemonAbout pokemon={pokemon} />;
              case TAB_STATS:
                return <PokemonStats pokemon={pokemon} />;
              case TAB_EVOLUTION:
                return <Evolution pokemon={pokemon} />;
              case TAB_MOVES:
                return <PokemonMoves pokemon={pokemon} />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
