import { env } from "@onelens/env/server";
import * as schema from "./schema";

async function createDb() {
	const isNeon = env.DATABASE_URL.includes("neon.tech");

	if (isNeon) {
		const { neon } = await import("@neondatabase/serverless");
		const { drizzle } = await import("drizzle-orm/neon-http");
		const sql = neon(env.DATABASE_URL);
		return drizzle(sql, { schema });
	}
	const { drizzle } = await import("drizzle-orm/node-postgres");
	return drizzle(env.DATABASE_URL, { schema });
}

const db = await createDb();

export * from "./schema";
export { db };
