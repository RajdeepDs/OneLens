"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@onelens/ui/components/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLinkItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@onelens/ui/components/dropdown-menu";
import { IconChevronGrabberVertical } from "@onelens/ui/components/icons";
import { Label } from "@onelens/ui/components/label";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@onelens/ui/components/sidebar";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";

export function WorkspaceSwitcher() {
	const { data: workspace } = useQuery(
		orpc.getCurrentWorkspace.queryOptions({ input: { slug: "one-lens" } })
	);

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton className="h-fit w-fit p-1">
								<Avatar size="sm">
									<AvatarImage className={"rounded-sm"} src={""} />
									<AvatarFallback className={"rounded-sm bg-transparent"}>
										{workspace?.name ? workspace.name[0] : "O"}
									</AvatarFallback>
								</Avatar>
								<Label>{workspace?.name || "OneLens"}</Label>
								<IconChevronGrabberVertical
									className="text-gray-11"
									size={16}
								/>
							</SidebarMenuButton>
						}
					/>
					<DropdownMenuContent className={"w-full"}>
						<DropdownMenuGroup>
							<DropdownMenuLinkItem href="/">
								Settings
								<DropdownMenuShortcut>G then S</DropdownMenuShortcut>
							</DropdownMenuLinkItem>
							<DropdownMenuLinkItem>
								Invite or manage members
							</DropdownMenuLinkItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									Switch workspace
								</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent>Hello</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
							<DropdownMenuItem>Log out</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
