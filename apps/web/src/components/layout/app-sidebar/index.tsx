"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
} from "@onelens/ui/components/sidebar";
import { WorkspaceSwitcher } from "./workspace-switcher";

export function AppSidebar() {
	return (
		<Sidebar className="border-none">
			<SidebarHeader className="flex w-full items-center justify-between">
				<WorkspaceSwitcher />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
