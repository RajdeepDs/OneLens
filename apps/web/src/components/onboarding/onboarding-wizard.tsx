"use client";

import { cn } from "@onelens/ui/lib/utils";

export type StepId = "workspace" | "github" | "repository" | "teams";

export interface Step {
	description: string;
	id: StepId;
	skipable: boolean;
	title: string;
}

export const STEPS: Step[] = [
	{
		id: "workspace",
		title: "Workspace",
		description: "Create your workspace",
		skipable: false,
	},
	{
		id: "github",
		title: "GitHub",
		description: "Connect your GitHub account",
		skipable: false,
	},
	{
		id: "repository",
		title: "Repository",
		description: "Select repositories to track",
		skipable: true,
	},
	{
		id: "teams",
		title: "Teams",
		description: "Invite your team",
		skipable: true,
	},
];

interface StepIndicatorProps {
	currentStep: number;
	totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
	return (
		<div className="flex items-center gap-1">
			{Array.from({ length: totalSteps }).map((_, index) => {
				const isActive = index === currentStep;
				return (
					<div
						className={cn(
							"h-1 rounded-full bg-gray-8 transition-all duration-300",
							isActive ? "w-3 bg-gray-12" : "w-1"
						)}
						key={index}
					/>
				);
			})}
		</div>
	);
}
