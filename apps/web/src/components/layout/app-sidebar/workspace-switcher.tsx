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
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
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
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { orpc } from "@/utils/orpc";

export function WorkspaceSwitcher() {
	const router = useRouter();
	const { data: session } = authClient.useSession();
	const { data: workspace } = useQuery(
		orpc.getCurrentWorkspace.queryOptions({ input: { slug: "one-lens" } })
	);

	const handleSignOut = async () => {
		await authClient.signOut();
		router.push("/login");
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex items-center justify-between">
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton className="h-fit w-fit p-1">
								<Avatar className="after:rounded-md" size="sm">
									<AvatarFallback className={"bg-transparent"}>
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
					<DropdownMenuContent className={"w-60"}>
						<DropdownMenuGroup>
							<DropdownMenuLinkItem href="/settings">
								<Icon name="IconSettingsGear2" size={20} variant="filled" />
								Settings
							</DropdownMenuLinkItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>Switch account</DropdownMenuSubTrigger>
								<DropdownMenuSubContent>
									<DropdownMenuItem>
										<Avatar size="sm">
											<AvatarImage src={session?.user.image as string} />
											<AvatarFallback className={"bg-transparent"}>
												{session?.user.name ? session.user.name[0] : "U"}
											</AvatarFallback>
										</Avatar>
										{session?.user.email as string}
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="pl-2.5">
										<Icon name="IconUserAddRight" variant="filled" />
										Add account
									</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuSub>
							<DropdownMenuItem onClick={handleSignOut} variant="destructive">
								Log out
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
