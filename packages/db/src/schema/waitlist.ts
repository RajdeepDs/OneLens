import {
	boolean,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";

export const waitlist = pgTable(
	"waitlist",
	{
		id: text("id").primaryKey(),
		email: text("email").notNull(),
		accepted: boolean("accepted").default(false).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(table) => [uniqueIndex("waitlist_email_idx").on(table.email)]
);

export type Waitlist = typeof waitlist.$inferSelect;
export type NewWaitlist = typeof waitlist.$inferInsert;
