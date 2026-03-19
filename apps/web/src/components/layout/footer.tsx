"use client";

import {
	Marquee,
	MarqueeContent,
	MarqueeFade,
	MarqueeItem,
} from "@onelens/ui/components/kibo-ui/marquee";
import { Logo, WordMark } from "@/components/ui";

const FOOTER_LINKS = [
	// {
	// 	title: "Product",
	// 	links: [{ label: "Changelog", href: "/" }],
	// },
	{
		title: "Connect",
		links: [
			{ label: "X", href: "https://x.com/Rajdeep__ds" },
			{ label: "GitHub", href: "https://github.com/RajdeepDs/OneLens" },
		],
	},
	// {
	// 	title: "Company",
	// 	links: [
	// 		{
	// 			label: "Contact us",
	// 			href: "mailto:rajdeepds626@gmail.com",
	// 		},
	// 		{ label: "Privacy", href: "/" },
	// 		{ label: "Terms of Use", href: "/" },
	// 	],
	// },
] as const;

const TICKER_ITEMS = [
	"PR workflow",
	"— automated",
	"Code review",
	"— accelerated",
	"Shipping velocity",
	"— restored",
	"Engineering overhead",
	"— eliminated",
	"Context gaps",
	"— closed",
	"CI signal",
	"— amplified",
] as const;

function MarqueeTicker() {
	return (
		<Marquee className="py-4">
			<MarqueeFade className="pointer-events-none" side="left" />
			<MarqueeFade className="pointer-events-none" side="right" />
			<MarqueeContent
				aria-label="OneLens highlights"
				className="max-w-full overflow-x-hidden"
				speed={35}
			>
				{TICKER_ITEMS.map((item, index) => {
					const isAccent = item.startsWith("—");
					return (
						<MarqueeItem
							className={`max-w-full whitespace-nowrap px-2 ${isAccent ? "font-medium text-foreground" : ""}`}
							key={`${item}-${index}`}
						>
							{item}
						</MarqueeItem>
					);
				})}
			</MarqueeContent>
		</Marquee>
	);
}

export default function Footer() {
	return (
		<footer className="relative overflow-hidden border-t bg-background font-mono text-[13px] text-muted-foreground uppercase tracking-widest antialiased">
			<div className="border-b">
				<div className="flex max-w-sm sm:container sm:mx-auto">
					<MarqueeTicker />
				</div>
			</div>
			<div className="mx-auto min-w-0 max-w-7xl overflow-x-hidden">
				<div className="flex min-w-0 flex-col justify-between gap-12 px-8 py-16 md:flex-row lg:px-12">
					<div className="grid w-full min-w-0 flex-1 grid-cols-2 gap-12 md:grid-cols-5 md:gap-24">
						{FOOTER_LINKS.map((section) => (
							<div className="space-y-6" key={section.title}>
								<h3 className="font-bold text-foreground">{section.title}</h3>
								<ul className="flex flex-col gap-4">
									{section.links.map((link) => {
										const isExternal = link.href.startsWith("http");
										return (
											<li key={link.label}>
												<a
													className="transition-colors duration-150 ease-[var(--ease-out)] hover:text-foreground"
													href={link.href}
													{...(isExternal && {
														rel: "noopener noreferrer",
														target: "_blank",
													})}
												>
													{link.label}
												</a>
											</li>
										);
									})}
								</ul>
							</div>
						))}
					</div>

					<div className="hidden shrink-0 items-start justify-end md:flex">
						<Logo className="size-8 text-foreground" />
					</div>
				</div>

				<div className="px-8 lg:px-12">
					<div className="flex min-w-0 flex-col items-center justify-between gap-6 border-border/50 border-t py-6 text-center tracking-wide md:flex-row md:text-left">
						<div className="w-full md:w-1/3">
							© {new Date().getFullYear()} OneLens, Inc. All rights reserved.
						</div>

						<div className="flex w-full items-center justify-end gap-1.5 md:w-1/3">
							DESIGNED AND BUILT BY
							<span className="font-medium text-foreground">
								THE ONELENS COMPANY
							</span>
						</div>
					</div>
				</div>

				<div
					className="pointer-events-none w-full min-w-0 max-w-full select-none overflow-hidden px-6 pt-8 text-foreground opacity-[0.15] md:pt-16"
					style={{
						WebkitMaskImage:
							"linear-gradient(to bottom, black 0%, transparent 90%)",
						maskImage: "linear-gradient(to bottom, black 0%, transparent 90%)",
					}}
				>
					<WordMark className="h-auto w-full" />
				</div>
			</div>
		</footer>
	);
}
