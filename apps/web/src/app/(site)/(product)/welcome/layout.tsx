import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/onboarding/logout-button";
import { UserHeader } from "@/components/onboarding/user-header";
import Logo from "@/components/ui/logo";

export default function WelcomeLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-full flex-col">
			<header className="relative mt-6 flex w-full items-center justify-between p-6 sm:mt-0">
				<UserHeader />
				<Link
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
					href={"/" as Route}
				>
					<Logo className="size-6 text-gray-8" />
				</Link>
				<LogoutButton />
			</header>
			<main className="flex-1 items-center justify-center px-6 sm:mx-auto sm:w-lg">
				{children}
			</main>
		</div>
	);
}
