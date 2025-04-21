import { createClient } from '@libsql/client';
import path from "path";
import dotenv from "dotenv";
dotenv.config()

if (!process.env.TURSO_DATABASE_URL) 
  throw new Error("❌ TURSO_DATABASE_URL is not set!");

if (!process.env.TURSO_AUTH_TOKEN) 
  throw new Error("❌ TURSO_AUTH_TOKEN is not set!");

// initialize variables
const LOCAL_DB_PATH = `file:${path.resolve(process.env.LOCAL_DB_PATH || "src/db/local-replica.db")}`;
const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

const db = createClient({
  url: LOCAL_DB_PATH,
  syncUrl: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
  syncInterval: 60,
});

export default db;
