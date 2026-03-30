import type { IconName } from "@onelens/ui/components/icons";

export interface SidebarItem {
	href: string;
	icon: IconName;
	id: string;
	label: string;
}

export const APP_SIDEBAR_ITEMS: SidebarItem[] = [
	{
		id: "inbox",
		label: "Inbox",
		href: "inbox",
		icon: "IconInboxEmpty",
	},
	{
		id: "my-prs",
		label: "My PRs",
		href: "my-prs",
		icon: "IconPullRequest",
	},
];

interface SidebarRepoItem extends Omit<SidebarItem, "icon"> {
	count: number;
}

export const APP_SIDEBAR_REPO_ITEMS: SidebarRepoItem[] = [
	{
		id: "payments-service",
		label: "Payments Service",
		href: "repositories/payments-service",
		count: 13,
	},
	{
		id: "auth-service",
		label: "Auth Service",
		href: "repositories/auth-service",
		count: 2,
	},
	{
		id: "api-gateway",
		label: "Api Gateway",
		href: "repositories/api-gateway",
		count: 5,
	},
	{
		id: "frontend",
		label: "Frontend",
		href: "repositories/frontend",
		count: 24,
	},
];
