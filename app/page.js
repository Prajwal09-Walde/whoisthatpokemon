"use client";
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PokemonCard from '@/components/PokemonCard';

export default function Home() {

  const [pokemon, setPokemon] = useState(null);
  const [currPokemon, setCurrPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const getPokemon = async () => {
    setLoading(true);
    try {
      const data = await axios.get('/api/pokemon');
      console.log(data);
      setPokemon(data.data);
      setLoading(false);
    }catch (err) {
      console.log(err);
      setIsError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!guess) return;
    if (guess.toLowerCase() === currPokemon.name) {
      setScore(score + 1);
      setGuess('');
      setIsCorrect(true);

      setTimeout(() => {
        setIsCorrect(false);
        getPokemon();
      }, 1000)
    }else {
      setGuess('');
    }
  }

  useEffect(() => {
    if (pokemon && !isError && !loading && pokemon.results) {
      console.log(pokemon.results)
      const randomPokemon = Math.floor(Math.random() * pokemon.results.length);
      setCurrPokemon(pokemon.results[randomPokemon]);
    }
  }, [pokemon])

  useEffect(() => {
    console.log(currPokemon);
  }, [currPokemon])

  if (loading) {
    const statusMessage = loading ? "loading..." : "Error :(";
    return (
      <main className='flex flex-col items-center justify-center min-h-screen py-2 h-screen'>
         <h1 className='text-6xl font-bold'>{statusMessage}</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isError && (
        <div 
          className='bg-red-100 border-red-500 text-red-700 px-4 py-3 rounded relative'
          role='alert'
        >
          <strong className='font-bold'>Error!</strong>
          <span className='blockline sm:inline'>
            Something went wrong. Please try again later :(
          </span>
        </div>
      )}
      <h1 className='text-4xl font-bold'>Who's that Pokémon?</h1>
      <h2 className='text-3xl font-bold'>Score: {score}</h2>
      <PokemonCard pokemon={currPokemon} isCorrect={isCorrect}/>
      <form 
        className='w-full max-w-sm'
        onSubmit={handleSubmit}
        style={{marginTop: "2rem"}}
      >
        <div className='flex items-center border-b border-teal-500 py-2'>
          <input 
            className='appearance-none bg-transparent border-none w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none'
            type='text'
            placeholder='Who is that Pokémon?'
            aria-label='Full name'
            onChange={(e) => setGuess(e.target.value)}
            value={guess}
          />
          <button
            className='flex-shrink-0 bg-teal-600 hover:bg-teal-300 text-sm border-4 text-white py-1 px-2 rounded'
            type='submit'
          >
            Submit
          </button>
          <button
            className='flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-900 py-1 px-2 rounded'
            type='button'
            onClick={() => {
              setGuess('');
              getPokemon();
            }}
          >
            Skip
          </button>
        </div>
      </form>
    </main>
  )
}
