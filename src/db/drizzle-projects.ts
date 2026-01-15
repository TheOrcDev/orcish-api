import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env" });

import { neon } from "@neondatabase/serverless";
import { projects } from "./schema.js";

const sql = neon(process.env.PROJECTS_DATABASE_URL ?? "");
const db = drizzle(sql, { schema: { projects } });

export default db;
