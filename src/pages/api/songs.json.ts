import db from "@/lib/db";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const songs = await db.execute("SELECT * FROM songs");
  return new Response(JSON.stringify(songs.rows));
};

export const POST: APIRoute = async ({ request }) => {
  const { title, author, category, img, releaseDate, ytlink, lyrics } = await request.json();

  if (!title || !author || !category || !img || !releaseDate || !ytlink || !lyrics) throw Error( "Missing required fields." );
  
  const insert = await db.execute(
    "INSERT INTO songs (title, author, category, img, releaseDate, ytlink, lyrics) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *",
    [title, author, category, img, releaseDate, ytlink, lyrics]
  );

  if (insert.rows.length > 0) 
    return new Response(JSON.stringify({ message: `${title} has been added successfully.` }), { status: 200 });
  else 
    return new Response(JSON.stringify({ error: "Error has been occured while adding song." }), { status: 404 });
 
};
