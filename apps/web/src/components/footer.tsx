import Logo from "./ui/logo";

export default function Footer() {
	return (
		<footer className="relative w-full max-w-full overflow-hidden border-t bg-background font-mono text-muted-foreground text-xs uppercase tracking-widest antialiased">
			{/*<style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
      `}</style>*/}

			{/* Top Ticker */}
			{/*<div className="relative flex w-full max-w-full overflow-hidden border-border/50 border-b py-3">
				<div className="flex w-max animate-ticker items-center">
					{[...new Array(2)].map((_, i) => (
						<div className="flex items-center" key={i}>
							<span className="mx-6">— ELIMINATED</span>
							<span className="text-foreground/70">CONTEXT GAPS</span>
							<span className="mx-6">— CLOSED</span>
							<span className="text-foreground/70">CI SIGNAL</span>
							<span className="mx-6">— AMPLIFIED</span>
							<span className="text-foreground/70">PR WORKFLOW</span>
							<span className="mx-6">— AUTOMATED</span>
							<span className="text-foreground/70">CODE REVIEW</span>
							<span className="mx-6">— ACCELERATED</span>
							<span className="text-foreground/70">SHIPPING VELOCITY</span>
						</div>
					))}
				</div>
			</div>*/}

			{/* Main Content Grid */}
			<div className="flex flex-col justify-between gap-12 px-8 py-16 md:flex-row lg:px-12">
				<div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-24">
					{/* Product Column */}
					<div className="space-y-6">
						<h3 className="font-bold text-foreground">Product</h3>
						<ul className="flex flex-col gap-4">
							<li>
								<a className="transition-colors hover:text-foreground" href="/">
									Changelog
								</a>
							</li>
							<li>
								<a className="transition-colors hover:text-foreground" href="/">
									Roadmap
								</a>
							</li>
						</ul>
					</div>

					{/* Company Column */}
					<div className="space-y-6">
						<h3 className="font-bold text-foreground">Company</h3>
						<ul className="flex flex-col gap-4">
							<li>
								<a className="transition-colors hover:text-foreground" href="/">
									About Us
								</a>
							</li>
							<li>
								<a className="transition-colors hover:text-foreground" href="/">
									Contact
								</a>
							</li>
							<li>
								<a className="transition-colors hover:text-foreground" href="/">
									Blog
								</a>
							</li>
							<li>
								<a className="transition-colors hover:text-foreground" href="/">
									Privacy
								</a>
							</li>
							<li>
								<a className="transition-colors hover:text-foreground" href="/">
									Terms of Use
								</a>
							</li>
						</ul>
					</div>

					{/* Connect Column */}
					<div className="space-y-6">
						<h3 className="font-bold text-foreground">Connect</h3>
						<ul className="flex flex-col gap-4">
							<li>
								<a className="transition-colors hover:text-foreground" href="/">
									X
								</a>
							</li>
							<li>
								<a className="transition-colors hover:text-foreground" href="/">
									LinkedIn
								</a>
							</li>
							<li>
								<a className="transition-colors hover:text-foreground" href="/">
									GitHub
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Circular Badge - Right Side */}
				<div className="hidden shrink-0 items-start justify-end md:flex">
					<Logo className="size-8 text-foreground" />
				</div>
			</div>

			{/* Footer Info Row */}
			<div className="px-8 lg:px-12">
				<div className="flex flex-col items-center justify-between gap-6 border-border/50 border-t py-6 text-center md:flex-row md:text-left">
					<div className="w-full md:w-1/3 md:text-left">
						© {new Date().getFullYear()} OneLens, Inc. All rights reserved.
					</div>
					<div className="w-full text-center md:w-1/3">
						DESIGNED AND BUILT BY
						<br />
						<span className="font-medium text-foreground">
							THE ONELENS COMPANY
						</span>
					</div>
					<div className="w-full md:w-1/3 md:text-right">
						CURRENT STATUS: GENERAL AVAILABILITY
					</div>
				</div>
			</div>

			{/* Giant Faded Wordmark */}
			<div className="pointer-events-none w-full select-none overflow-hidden pt-8 md:pt-16">
				<h1
					className="bg-clip-text text-center font-bold font-sans text-[18vw] text-transparent leading-[0.75] tracking-tighter"
					style={{
						backgroundImage:
							"linear-gradient(to bottom, var(--foreground) 0%, transparent 100%)",
						opacity: 0.15,
					}}
				>
					OneLens
				</h1>
			</div>
		</footer>
	);
}
