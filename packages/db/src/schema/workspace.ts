import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import * as auth from "./auth";

export const workspace = pgTable(
	"workspace",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		slug: text("slug").notNull().unique(),
		ownerId: text("owner_id")
			.notNull()
			.references(() => auth.user.id, { onDelete: "cascade" }),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [
		index("workspace_ownerId_idx").on(table.ownerId),
		index("workspace_slug_idx").on(table.slug),
	]
);

export const teamInvite = pgTable(
	"team_invite",
	{
		id: text("id").primaryKey(),
		workspaceId: text("workspace_id")
			.notNull()
			.references(() => workspace.id, { onDelete: "cascade" }),
		email: text("email").notNull(),
		token: text("token").notNull().unique(),
		expiresAt: timestamp("expires_at").notNull(),
		acceptedAt: timestamp("accepted_at"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [
		index("teamInvite_workspaceId_idx").on(table.workspaceId),
		index("teamInvite_email_idx").on(table.email),
		index("teamInvite_token_idx").on(table.token),
	]
);

export const workspaceRelations = relations(workspace, ({ one, many }) => ({
	owner: one(auth.user, {
		fields: [workspace.ownerId],
		references: [auth.user.id],
	}),
	invites: many(teamInvite),
}));

export const teamInviteRelations = relations(teamInvite, ({ one }) => ({
	workspace: one(workspace, {
		fields: [teamInvite.workspaceId],
		references: [workspace.id],
	}),
}));
