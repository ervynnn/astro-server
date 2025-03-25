import { getCollection } from "astro:content";

const song = await getCollection("song");

export const GET = async ({}) => {
    return new Response(JSON.stringify(song.map(res => res.data)),
    {
        headers: {
            "content-type": "application/json"
        },
        status: 200,

    });
}