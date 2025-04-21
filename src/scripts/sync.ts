import db from "../lib/db";

let isSyncing = false;

export async function syncDatabase() {
  if (isSyncing) return;
  isSyncing = true;

  try {
    await db.sync();
    console.log("✅ Database synced successfully!");
  } finally {
    isSyncing = false;
  }
}

