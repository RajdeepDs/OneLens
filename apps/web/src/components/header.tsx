"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { WordMark } from "./ui/word-mark";
import UserMenu from "./user-menu";

export default function Header() {
	const links = [
		{ to: "/", label: "Changelog" },
		{ to: "/dashboard", label: "Contact" },
	] as const;

	return (
		<div>
			<div className="container mx-auto flex flex-row items-center justify-between px-2 py-1">
				<Link href={"/"}>
					<WordMark />
				</Link>
				<nav className="flex gap-4 text-[13px]">
					{links.map(({ to, label }) => {
						return (
							<Link href={to} key={to}>
								{label}
							</Link>
						);
					})}
				</nav>
				<div className="flex items-center gap-2">
					<ModeToggle />
					<UserMenu />
				</div>
			</div>
			<hr />
		</div>
	);
}
