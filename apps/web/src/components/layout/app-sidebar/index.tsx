"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
} from "@onelens/ui/components/sidebar";

export function AppSidebar() {
	return (
		<Sidebar className="border-none">
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
