import axios from "axios";
import { NextResponse } from "next/server";

const getRandomPokemon = async () => {
    try {
        const data = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
        return data;
    }catch (err) {
        return err;
    }
};

export async function GET() {
    try {
        const pokemon = await getRandomPokemon();
        return NextResponse.json(pokemon.data);
    }catch (err) {
        return NextResponse.json(500, err);
    }
};