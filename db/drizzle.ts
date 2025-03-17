import { neon } from "@neondatabase/serverless"
// import { config } from "dotenv";

import { drizzle } from "drizzle-orm/neon-http"
// config({ path: ".env.local" });

// Add connection validation
const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  console.error("DATABASE_URL is not defined in environment variables")
}

export const sql = neon(connectionString!)

// Test the connection
try {
  // This will be executed when the module is imported
  sql`SELECT 1`
    .then(() => {
      console.log("Database connection successful")
    })
    .catch((err) => {
      console.error("Database connection failed:", err)
    })
} catch (error) {
  console.error("Error initializing database connection:", error)
}

export const db = drizzle(sql)

