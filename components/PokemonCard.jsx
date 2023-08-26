"use client";
import axios from 'axios';
import { useEffect, useState } from 'react'

export default function PokemonCard ({pokemon, isCorrect}) {

    const [data, setData] = useState({});

    useEffect(() => {
        try {

            if (pokemon === undefined) {
              return;
            } 
            const fetchData = async () => {
                if (!pokemon) return;
                const rs = await axios.get(pokemon.url);
                setData(rs.data);
            };
            fetchData();
        }   catch (err) {
            console.log(err);
        }
    }, [pokemon]);
    
  return (
    <div className='card'>
      <img 
        src={data?.sprites?.front_default}
        alt={"loading image"}
        className={isCorrect ? "card_img--correct" : "card_img--incorrect"}
        style={{
            marginTop: "100px"
        }}
      />
    </div>
  );
};
