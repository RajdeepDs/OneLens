"use client";

import { ButtonLink } from "@onelens/ui/components/button";
import type { Route } from "next";
import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
	const { data: session } = authClient.useSession();

	if (!session) {
		return (
			<ButtonLink
				href={session ? "/" : ("/login" as Route)}
				shortcut={"l"}
				variant={"ghost"}
			>
				{session ? "Dashboard" : "Login"}
			</ButtonLink>
		);
	}
}
