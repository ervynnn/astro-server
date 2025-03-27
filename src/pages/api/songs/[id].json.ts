import db from "@/lib/db";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const id = params.id;

  if (!id) throw Error( "Missing ID." );

  const songs = await db.execute("SELECT * FROM songs WHERE id = ?", [id]);
  
  if (songs.rows.length > 0) 
    return new Response(JSON.stringify(songs.rows[0]), { status: 200 });
  else 
    return new Response(JSON.stringify({ error: "Song not found" }), { status: 404 });
};

export const DELETE: APIRoute = async ({ params }) => {
    const id = params.id;
  
    if (!id) throw Error( "Missing ID." );
    
    const remove = await db.execute("DELETE FROM songs WHERE id = ?", [id]);
    
    return new Response( JSON.stringify({
      message: remove.rowsAffected === 0 ? "Failed" : "Success",
    }))
  };
  