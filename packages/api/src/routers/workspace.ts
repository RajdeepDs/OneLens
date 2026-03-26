import { workspace as workspaceTable } from "@onelens/db";
import { eq } from "drizzle-orm";
import z from "zod";
import { protectedProcedure } from "../index";

export const workspaceRouter = {
	getCurrentWorkspace: protectedProcedure
		.input(z.object({ slug: z.string().min(1) }))
		.handler(async ({ input, context }) => {
			const { slug } = input;

			const existingWorkspace = await context.db
				.select()
				.from(workspaceTable)
				.where(eq(workspaceTable.slug, slug))
				.limit(1);

			return existingWorkspace[0];
		}),
};
