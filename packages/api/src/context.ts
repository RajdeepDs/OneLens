import { auth } from "@onelens/auth";
import { db } from "@onelens/db";
import type { NextRequest } from "next/server";

export interface Context {
	db: typeof db;
	session: Awaited<ReturnType<typeof auth.api.getSession>>;
}

export async function createContext(req: NextRequest): Promise<Context> {
	const session = await auth.api.getSession({
		headers: req.headers,
	});
	return {
		session,
		db,
	};
}
