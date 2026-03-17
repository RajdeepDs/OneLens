"use client";

import { Button } from "@onelens/ui/components/button";
import type { Route } from "next";
import Link from "next/link";
import { WordMark } from "./ui/word-mark";
import UserMenu from "./user-menu";

export default function Header() {
	const links = [
		{ to: "/changelog", label: "Changelog" },
		{ to: "/contact", label: "Contact" },
	] as const;

	return (
		<header className="sticky inset-x-0 top-0 z-50 h-(--header-height) items-stretch border-b bg-gray-1/60 backdrop-blur-2xl">
			<div className="mx-auto flex h-(--header-height) w-full items-center py-3">
				<div className="mx-auto flex w-full items-center justify-between px-6 sm:max-w-7xl">
					<div className="flex flex-1 items-center justify-start">
						<Link href={"/"}>
							<WordMark />
						</Link>
					</div>
					<nav className="hidden flex-1 justify-center gap-4 text-[13px] sm:flex">
						{links.map(({ to, label }) => {
							return (
								<Link href={to as Route} key={to}>
									{label}
								</Link>
							);
						})}
					</nav>
					<div className="flex flex-1 items-center justify-end gap-2">
						{/*<ModeToggle />*/}
						<UserMenu />
						<Button shortcut={"J"} variant={"secondary"}>
							Join waitlist
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
