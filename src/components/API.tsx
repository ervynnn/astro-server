import React, { useState } from 'react'

type Song = {
  title: string;
  author: string;
  category:
  | "JPop"
  | "Rock"
  | "Alternative"
  | "Ballad"
}

const API = () => {
    const [song, setSong] = useState([]);

    const handleGet = async () => {
        const res = await fetch("/endpoint.json")
        const data = await res.json();
        console.log(data);
        setSong(data);
    }

  return (
    <div>
        <p>Get Items</p>
        {song.length > 0 && song.map((z : Song) => <p>{z.title}</p>)}
        <button onClick={handleGet}>get</button>
    </div>
  )
}

export default API;
