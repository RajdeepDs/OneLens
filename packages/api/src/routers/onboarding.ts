import { account, teamInvite, workspace as workspaceTable } from "@onelens/db";
import type { RouterClient } from "@orpc/server";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { protectedProcedure } from "../index";

const INVITE_EXPIRY_DAYS = 7;

export const onboardingRouter = {
	saveWorkspace: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1).max(100),
				slug: z.string().min(1).max(100),
			})
		)
		.handler(async ({ input, context }) => {
			const userId = context.session.user.id;

			const existing = await context.db
				.select({ id: workspaceTable.id })
				.from(workspaceTable)
				.where(eq(workspaceTable.ownerId, userId))
				.limit(1);

			const workspaceRecord = existing[0];
			if (workspaceRecord) {
				await context.db
					.update(workspaceTable)
					.set({ name: input.name, slug: input.slug })
					.where(eq(workspaceTable.id, workspaceRecord.id));
				return { id: workspaceRecord.id, slug: input.slug, updated: true };
			}

			const id = nanoid();
			await context.db.insert(workspaceTable).values({
				id,
				name: input.name,
				slug: input.slug,
				ownerId: userId,
			});

			return { id, slug: input.slug, updated: false };
		}),

	getWorkspace: protectedProcedure.handler(async ({ context }) => {
		const userId = context.session.user.id;

		const result = await context.db
			.select()
			.from(workspaceTable)
			.where(eq(workspaceTable.ownerId, userId))
			.limit(1);

		return result[0] || null;
	}),

	getGithubRepos: protectedProcedure.handler(async ({ context }) => {
		const userId = context.session.user.id;

		const githubAccount = await context.db
			.select()
			.from(account)
			.where(eq(account.userId, userId))
			.limit(1);

		const accountRecord = githubAccount[0];
		if (!accountRecord?.accessToken) {
			throw new Error("GitHub account not connected");
		}

		const response = await fetch(
			"https://api.github.com/user/repos?sort=updated&per_page=100",
			{
				headers: {
					Authorization: `Bearer ${accountRecord.accessToken}`,
					Accept: "application/vnd.github.v3+json",
				},
			}
		);

		if (!response.ok) {
			throw new Error("Failed to fetch repositories from GitHub");
		}

		const repos = (await response.json()) as Array<{
			id: number;
			full_name: string;
			private: boolean;
			default_branch: string;
			html_url: string;
		}>;
		return repos.map((repo) => ({
			id: repo.id,
			fullName: repo.full_name,
			isPrivate: repo.private,
			defaultBranch: repo.default_branch,
			url: repo.html_url,
		}));
	}),

	saveRepositories: protectedProcedure
		.input(
			z.object({
				workspaceId: z.string(),
				repositoryIds: z.array(z.number()),
			})
		)
		.handler(({ input }) => {
			return { success: true, count: input.repositoryIds.length };
		}),

	createTeamInvite: protectedProcedure
		.input(
			z.object({
				workspaceId: z.string(),
				email: z.string().email(),
			})
		)
		.handler(async ({ input, context }) => {
			const token = nanoid(32);
			const expiresAt = new Date();
			expiresAt.setDate(expiresAt.getDate() + INVITE_EXPIRY_DAYS);

			await context.db.insert(teamInvite).values({
				id: nanoid(),
				workspaceId: input.workspaceId,
				email: input.email,
				token,
				expiresAt,
			});

			return { token, expiresAt };
		}),

	getTeamInvites: protectedProcedure
		.input(z.object({ workspaceId: z.string() }))
		.handler(async ({ input, context }) => {
			const invites = await context.db
				.select()
				.from(teamInvite)
				.where(eq(teamInvite.workspaceId, input.workspaceId))
				.orderBy(teamInvite.createdAt);

			return invites;
		}),

	deleteTeamInvite: protectedProcedure
		.input(z.object({ inviteId: z.string() }))
		.handler(async ({ input, context }) => {
			await context.db
				.delete(teamInvite)
				.where(eq(teamInvite.id, input.inviteId));
			return { success: true };
		}),
};

export type OnboardingRouter = typeof onboardingRouter;
export type OnboardingRouterClient = RouterClient<typeof onboardingRouter>;
