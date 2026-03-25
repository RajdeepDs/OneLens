"use client";

import { Button } from "@onelens/ui/components/button";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
	const router = useRouter();
	const handleLogout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/login" as Route);
				},
			},
		});
	};

	return (
		<Button
			className="absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2"
			onClick={handleLogout}
			variant={"ghost"}
		>
			Log out
		</Button>
	);
}
