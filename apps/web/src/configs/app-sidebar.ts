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
