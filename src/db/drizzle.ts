import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env" });

import { neon } from "@neondatabase/serverless";
import { schema } from "./schema.js";

const sql = neon(process.env.DATABASE_URL ?? "");
const db = drizzle(sql, { schema });

export default db;
