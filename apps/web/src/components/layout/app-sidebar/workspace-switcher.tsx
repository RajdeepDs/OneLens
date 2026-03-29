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
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@onelens/ui/components/dropdown-menu";
import { Icon } from "@onelens/ui/components/icons";
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
								<Icon
									className="text-gray-11"
									name="IconChevronGrabberVertical"
									size={16}
								/>
							</SidebarMenuButton>
						}
					/>
					<DropdownMenuContent className={"w-56"}>
						<DropdownMenuGroup>
							<DropdownMenuLinkItem href="/">
								<Icon name="IconSettingsGear2" variant="filled" />
								Settings
							</DropdownMenuLinkItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>Log out</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
