import { FlickeringGrid } from "@onelens/ui/components/flickering-grid";

import type { ReactNode } from "react";
import { PRCard } from "@/components/ui/pr-card";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="grid min-h-svh gap-4 md:grid-cols-2 md:p-1">
			<main className="h-full border border-alpha-1 bg-background-2 p-6 md:rounded-md">
				{children}
			</main>

			<div className="hidden md:block">
				<div className="relative h-full">
					<FlickeringGrid
						className="absolute inset-0 z-0 size-full"
						color="#A8A8A8"
						flickerChance={0.1}
						gridGap={6}
						height={1600}
						maxOpacity={0.5}
						squareSize={3}
						width={2400}
					/>

					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-y-0 left-0 z-10 h-full w-full bg-linear-to-r from-0% from-background to-transparent"
					/>

					<div className="pointer-events-none absolute inset-0 z-20 mx-auto flex max-w-lg items-center justify-center px-6">
						<PRCard />
					</div>
				</div>
			</div>
		</div>
	);
}
