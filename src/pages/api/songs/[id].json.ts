import db from "@/lib/db";
import type { APIRoute } from "astro";
import sanitize from "sanitize-html";

// select by id
export const GET: APIRoute = async ({ params }) => {
  const id = params.id;

  if (!id) throw Error( "Missing ID." );

  const songs = await db.execute("SELECT * FROM songs WHERE id = ?", [id]);
  
  if (songs.rows.length > 0) 
    return new Response(JSON.stringify(songs.rows[0]), { status: 200 });
  else 
    return new Response(JSON.stringify({ error: "Song not found" }), { status: 404 });
};

// edit by id
export const POST: APIRoute = async ({ params, request }) => {
  const id = params.id;
  const { title, author, category, img, releaseDate, ytlink, lyrics } = await request.json();
  try{
    if (!title || !author || !category || !img || !releaseDate || !ytlink || !lyrics) throw Error( "Missing required fields." );
  
    const update = await db.execute(
      "UPDATE songs SET title = ?, author = ?, category = ?, img = ?, releaseDate = ?, ytlink = ?, lyrics = ? WHERE id = ?",
      [
        sanitize(title),  
        sanitize(author), 
        sanitize(category), 
        sanitize(img), 
        sanitize(releaseDate), 
        sanitize(ytlink), 
        lyrics,
        id
      ]
    );
  
    if (update.rowsAffected > 0) 
      return new Response(JSON.stringify({ 
        message: `${title} has been updated successfully.`, 
        success: true }),
         { status: 200 });
    else 
      return new Response(JSON.stringify({ 
        message: "Error has been occured while updating song.", 
        success: false }),
         { status: 404 });
   
  }catch(e){
    console.error(e);
      return new Response(JSON.stringify({
        message: e instanceof Error ? e.message : "There was an unknown error." ,
        success: false
      }),
      { status: 404 })
  }
 
};

// delete by id
export const DELETE: APIRoute = async ({ params }) => {
    const id = params.id;
  
    if (!id) throw Error( "Missing ID." );
    
    const remove = await db.execute("DELETE FROM songs WHERE id = ?", [id]);
    
    return new Response( JSON.stringify({
      message: remove.rowsAffected === 0 ? "Failed" : "Success",
    }))
  };
  