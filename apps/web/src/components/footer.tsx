import Logo from "./ui/logo";
import { WordMark } from "./ui/word-mark";

const FOOTER_LINKS = [
	{
		title: "Product",
		links: [
			{ label: "Changelog", href: "/" },
			{ label: "Roadmap", href: "/" },
		],
	},
	{
		title: "Connect",
		links: [
			{ label: "X", href: "/" },
			{ label: "LinkedIn", href: "/" },
			{ label: "GitHub", href: "/" },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "About Us", href: "/" },
			{ label: "Contact", href: "/" },
			{ label: "Blog", href: "/" },
			{ label: "Privacy", href: "/" },
			{ label: "Terms of Use", href: "/" },
		],
	},
] as const;

export default function Footer() {
	return (
		<footer className="relative mx-auto w-full overflow-hidden border-t bg-background font-mono text-[13px] text-muted-foreground uppercase tracking-widest antialiased">
			<div className="mx-auto max-w-7xl">
				{/* Main Content Grid */}
				<div className="flex flex-col justify-between gap-12 px-8 py-16 md:flex-row lg:px-12">
					<div className="grid w-full flex-1 grid-cols-2 gap-12 md:grid-cols-5 md:gap-24">
						{FOOTER_LINKS.map((section) => (
							<div className="space-y-6" key={section.title}>
								<h3 className="font-bold text-foreground">{section.title}</h3>
								<ul className="flex flex-col gap-4">
									{section.links.map((link) => (
										<li key={link.label}>
											<a
												className="transition-colors hover:text-foreground"
												href={link.href}
											>
												{link.label}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					{/* Circular Badge - Right Side */}
					<div className="hidden shrink-0 items-start justify-end md:flex">
						<Logo className="size-8 text-foreground" />
					</div>
				</div>

				{/* Footer Info Row */}
				<div className="px-8 lg:px-12">
					<div className="flex flex-col items-center justify-between gap-6 border-border/50 border-t py-6 text-center tracking-wide md:flex-row md:text-left">
						<div className="w-full md:w-1/3 md:text-left">
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
					className="pointer-events-none w-full select-none overflow-hidden px-6 pt-8 text-foreground opacity-[0.15] md:pt-16"
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
