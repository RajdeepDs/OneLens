"use client";

import { Button } from "@onelens/ui/components/button";
import * as motion from "motion/react-client";
import type { ComponentPropsWithoutRef } from "react";

type PRCardProps = ComponentPropsWithoutRef<typeof motion.div>;

function InsightChip({
	icon,
	label,
	description,
	delay = 0,
}: {
	icon: React.ReactNode;
	label: string;
	description: string;
	delay?: number;
}) {
	return (
		<motion.div
			animate={{ y: [0, -8, 0] }}
			className="flex max-w-50 items-start gap-2.5 rounded-xl border border-alpha-1 bg-gray-1 px-3 py-2.5 shadow-alpha-1 shadow-lg backdrop-blur"
			transition={{
				duration: 4,
				delay,
				ease: "easeInOut",
				repeat: Number.POSITIVE_INFINITY,
			}}
		>
			<div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-alpha-1 bg-gray-2">
				{icon}
			</div>
			<div className="flex flex-col gap-0.5">
				<p className="font-semibold text-[12px] text-foreground leading-tight">
					{label}
				</p>
				<p className="text-[11px] text-muted-foreground leading-snug">
					{description}
				</p>
			</div>
		</motion.div>
	);
}

export function PRCard(props: PRCardProps) {
	const { className, ...rest } = props;

	return (
		<div className="relative">
			{/* Top-left chip — reviewer context */}
			<div className="absolute -top-20 -left-40 z-10 hidden -rotate-10 xl:block">
				<InsightChip
					description="Sara touched auth/ last 3 PRs this month."
					icon={
						<svg
							className="text-violet-500"
							fill="none"
							height="11"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="1.5"
							viewBox="0 0 14 14"
							width="11"
						>
							<title>Context</title>
							<circle cx="7" cy="4" r="2.5" />
							<path d="M2 12c0-2.5 2-4 5-4s5 1.5 5 4" />
						</svg>
					}
					label="Assigned by context"
				/>
			</div>

			{/* Bottom-right chip — flaky insight */}
			<div className="absolute -right-36 -bottom-25 z-10 rotate-10">
				<InsightChip
					description="Failed 14 times. No linked incident."
					icon={
						<svg
							className="text-blue-500"
							fill="none"
							height="11"
							stroke="currentColor"
							strokeLinecap="round"
							strokeWidth="1.5"
							viewBox="0 0 14 14"
							width="11"
						>
							<title>Flaky Insight</title>
							<circle cx="7" cy="7" r="5" />
							<path d="M7 4.5v3l1.5 1.5" />
						</svg>
					}
					label="E2E failure is noise."
				/>
			</div>

			{/* PR Card */}
			<motion.div
				animate={{ y: [0, -10, 0] }}
				className="pointer-events-auto relative -rotate-2 rounded-2xl border border-alpha-1 bg-gray-1 p-4 shadow-2xl shadow-alpha-1 ring-4 ring-alpha-1/60 backdrop-blur"
				transition={{
					duration: 4,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
				{...rest}
			>
				{/* Header */}
				<div className="mb-3 flex items-center justify-between font-medium text-[11px] text-muted-foreground uppercase tracking-wide">
					<div className="flex flex-col items-center gap-1.5">
						<span>PR #2841 · feat/auth-refactor</span>
					</div>
					<span className="rounded-full bg-emerald-500/11 px-2 py-0.5 font-semibold text-[11px] text-emerald-700">
						Ready
					</span>
				</div>

				{/* Description */}
				<div className="mb-3 rounded-md">
					<p className="mb-1 font-medium text-[15px] text-foreground">
						Refactor authentication flow to use JWT refresh tokens
					</p>
					<p className="text-[13px] text-muted-foreground leading-snug">
						Replaces session-based auth with stateless JWT tokens. Adds refresh
						token rotation, invalidation on logout, and a 15-min access token
						TTL.
					</p>
				</div>

				{/* Meta grid */}
				<div className="mb-3 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
					<div className="space-y-0.5">
						<p className="text-foreground">Reviewer</p>
						<p className="text-[11px]">Sara K.</p>
						<p className="text-muted-foreground/80">OL-482</p>
					</div>
					<div className="space-y-0.5">
						<p className="text-foreground">Risk</p>
						<p className="text-[11px] text-amber-800">Medium</p>
					</div>
					<div className="space-y-0.5 text-right">
						<p className="text-foreground">Checks</p>
						<p className="text-[11px] text-emerald-700">148 passed</p>
						<p className="text-muted-foreground/80">No errors</p>
					</div>
				</div>

				{/* Checks list */}
				<div className="mb-3 flex flex-col gap-1.5 text-[11px]">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 text-muted-foreground">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
							<span>Unit tests</span>
						</div>
						<span className="text-[11px] text-emerald-700">Passed</span>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 text-muted-foreground">
							<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
							<span>Type check</span>
						</div>
						<span className="text-[11px] text-emerald-700">No errors</span>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 text-muted-foreground">
							<span className="h-1.5 w-1.5 rounded-full bg-amber-800" />
							<span>E2E · login_flow</span>
						</div>
						<span className="text-[11px] text-amber-800">
							Flaky · 14× history
						</span>
					</div>
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between text-[11px] text-muted-foreground">
					<span>
						2 files · <span className="text-emerald-600">+186</span>{" "}
						<span className="text-red-700">-94</span>
					</span>
					<Button size={"sm"} variant={"default"}>
						Merge
					</Button>
				</div>
			</motion.div>
		</div>
	);
}
