import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";
import "jsr:@std/dotenv/load";

const db = new Client({
  user: Deno.env.get("DB_USERNAME") || "",
  database: Deno.env.get("DB_NAME") || "",
  hostname: Deno.env.get("DB_HOST") || "",
  port: parseInt(Deno.env.get("DB_PORT") || "5432"),
  password: Deno.env.get("DB_PASSWORD") || "",
});

export { db };
