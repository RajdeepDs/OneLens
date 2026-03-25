import { db, waitlist } from "@onelens/db";
import * as schema from "@onelens/db/schema/auth";
import { env } from "@onelens/env/server";
import { APIError, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { and, eq } from "drizzle-orm";

const WAITLIST_REJECTION_MESSAGE =
	"You're on the waitlist. We'll notify you once you're approved.";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
		},
	},
	user: {
		additionalFields: {
			onboardingCompleted: {
				type: "boolean",
				defaultValue: false,
			},
		},
	},
	trustedOrigins: [env.CORS_ORIGIN],
	secret: env.BETTER_AUTH_SECRET,
	baseURL: env.BETTER_AUTH_URL,
	plugins: [nextCookies()],
	onAPIError: {
		errorURL: "/login",
	},
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					const acceptedRow = await db
						.select({ id: waitlist.id })
						.from(waitlist)
						.where(
							and(eq(waitlist.email, user.email), eq(waitlist.accepted, true))
						)
						.limit(1);

					if (acceptedRow.length === 0) {
						throw new APIError("UNAUTHORIZED", {
							message: WAITLIST_REJECTION_MESSAGE,
						});
					}

					return { data: user };
				},
			},
		},
		session: {
			create: {
				before: async (session) => {
					const [currentUser] = await db
						.select({ email: schema.user.email })
						.from(schema.user)
						.where(eq(schema.user.id, session.userId))
						.limit(1);

					if (!currentUser?.email) {
						throw new APIError("UNAUTHORIZED", {
							message: "Unable to verify access. Please try again.",
						});
					}

					const acceptedRow = await db
						.select({ id: waitlist.id })
						.from(waitlist)
						.where(
							and(
								eq(waitlist.email, currentUser.email),
								eq(waitlist.accepted, true)
							)
						)
						.limit(1);

					if (acceptedRow.length === 0) {
						throw new APIError("UNAUTHORIZED", {
							message: WAITLIST_REJECTION_MESSAGE,
						});
					}

					return { data: session };
				},
			},
		},
	},
});
