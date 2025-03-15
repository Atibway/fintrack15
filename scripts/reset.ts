import { db } from "@/db/drizzle";
import { config } from "dotenv";
import { sql } from "drizzle-orm";



async function resetDatabase() {
  await db.execute(sql.raw("DROP SCHEMA public CASCADE;"));
  await db.execute(sql.raw("CREATE SCHEMA public;"));
  console.log("Database reset successfully!");
}

resetDatabase().catch((err) => {
  console.error("Error resetting database:", err);
  process.exit(1);
});
