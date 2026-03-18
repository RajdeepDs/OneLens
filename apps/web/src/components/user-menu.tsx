"use client";
import { Button } from "@onelens/ui/components/button";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
	const { data: session } = authClient.useSession();

	if (!session) {
		return (
			<Link href={session ? "/" : "/login"}>
				<Button shortcut={"L"} variant="ghost">
					{session ? "Dashboard" : "Login"}
				</Button>
			</Link>
		);
	}
}
