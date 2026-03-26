import { waitlist } from "@onelens/db";
import type { RouterClient } from "@orpc/server";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../index";
import { onboardingRouter } from "./onboarding";
import { workspaceRouter } from "./workspace";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	privateData: protectedProcedure.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.session?.user,
		};
	}),
	joinWaitlist: publicProcedure
		.input(z.object({ email: z.email() }))
		.handler(async ({ input, context }) => {
			const existing = await context.db
				.select()
				.from(waitlist)
				.where(eq(waitlist.email, input.email))
				.limit(1);

			if (existing.length > 0) {
				return { success: true, message: "You're already on the waitlist!" };
			}

			await context.db.insert(waitlist).values({
				id: nanoid(),
				email: input.email,
			});

			return { success: true, message: "You've been added to the waitlist!" };
		}),
	...onboardingRouter,
	...workspaceRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
