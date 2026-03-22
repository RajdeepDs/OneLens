"use client";

import { ButtonLink } from "@onelens/ui/components/button";
import { useGlobalHotkeys } from "@onelens/ui/hooks/use-global-hotkeys";
import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WordMark } from "@/components/ui";
import { UserMenu } from "@/components/user";

const links = [
	{ to: "/changelog", label: "Changelog" },
	{ to: "/contact", label: "Contact" },
] as const;

export default function Header() {
	const router = useRouter();

	useGlobalHotkeys({
		keys: "j",
		callback: () => {
			router.push("/waitlist" as Route);
		},
		options: { preventDefault: true },
	});
	useGlobalHotkeys({
		keys: "l",
		callback: () => {
			router.push("/login" as Route);
		},
		options: { preventDefault: true },
	});

	return (
		<header className="sticky inset-x-0 top-0 z-50 h-(--header-height) items-stretch border-border/50 border-b bg-gray-1/80 backdrop-blur-2xl supports-backdrop-filter:bg-gray-1/60">
			<div className="mx-auto flex h-(--header-height) w-full items-center py-3">
				<div className="mx-auto flex w-full items-center justify-between px-6 sm:max-w-7xl">
					<div className="flex flex-1 items-center justify-start">
						<Link href={"/"}>
							<WordMark />
						</Link>
					</div>
					<nav className="hidden flex-1 justify-center gap-4 text-[13px]">
						{links.map(({ to, label }) => {
							return (
								<Link
									className="group relative text-muted-foreground transition-colors duration-150 ease-out hover:text-foreground"
									href={to as Route}
									key={to}
								>
									<span className="relative">
										{label}
										<span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-[width] duration-200 ease-out group-hover:w-full" />
									</span>
								</Link>
							);
						})}
					</nav>
					<div className="flex flex-1 items-center justify-end gap-2">
						<UserMenu />
						<ButtonLink
							href={"/waitlist" as Route}
							shortcut={"j"}
							variant={"secondary"}
						>
							Join waitlist
						</ButtonLink>
					</div>
				</div>
			</div>
		</header>
	);
}
