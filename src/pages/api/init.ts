import db from "@/lib/db";
import type { APIRoute } from "astro";
import { readFileSync } from "fs";

export const GET: APIRoute = async () => {
  const sql = readFileSync("src/lib/db/init.sql", "utf8");
  await db.execute(sql);
  return new Response(JSON.stringify({ message: "✅ Database initialized." }), { status: 200 });
};