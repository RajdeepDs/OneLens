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
		<header className="z-50 h-(--header-height) items-stretch">
			<div className="fixed inset-x-0 top-0 mx-auto flex h-(--header-height) w-full items-center border-b bg-alpha-1 py-3 backdrop-blur-2xl">
				<div className="mx-auto flex w-full items-center justify-between px-6 sm:max-w-7xl">
					<Link href={"/"}>
						<WordMark />
					</Link>
					<nav className="hidden gap-4 text-[13px] sm:flex">
						{links.map(({ to, label }) => {
							return (
								<Link href={to as Route} key={to}>
									{label}
								</Link>
							);
						})}
					</nav>
					<div className="flex items-center gap-2">
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
