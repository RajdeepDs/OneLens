"use client";

import { Icon } from "@onelens/ui/components/icons";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@onelens/ui/components/sidebar";
import type { Route } from "next";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
	APP_SIDEBAR_ITEMS,
	APP_SIDEBAR_REPO_ITEMS,
} from "@/configs/app-sidebar";
import { WorkspaceSwitcher } from "./workspace-switcher";

export function AppSidebar() {
	const { slug } = useParams<{ slug: string }>();
	const pathname = usePathname();

	return (
		<Sidebar className="border-none">
			<SidebarHeader className="mt-1.5 flex h-11 w-full items-center justify-between">
				<WorkspaceSwitcher />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu className="gap-px">
						{APP_SIDEBAR_ITEMS.map((item) => {
							const isActive = pathname === `/${slug}/${item.href}`;
							return (
								<SidebarMenuItem key={item.id}>
									<SidebarMenuButton
										className="pl-1.5"
										isActive={isActive}
										render={
											<Link href={item.href as Route}>
												<Icon
													className={
														isActive ? "text-foreground" : "text-gray-11"
													}
													name={item.icon}
													variant={isActive ? "filled" : "outline"}
												/>
												{item.label}
											</Link>
										}
									/>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Repository</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="gap-px">
							{APP_SIDEBAR_REPO_ITEMS.map((item) => {
								const isActive = pathname === `/${slug}/${item.href}`;
								return (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton
											className="ps-7.5"
											isActive={isActive}
											render={
												<Link href={item.href as Route}>{item.label}</Link>
											}
										/>
										<SidebarMenuBadge>{item.count}</SidebarMenuBadge>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
