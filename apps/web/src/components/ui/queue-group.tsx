"use client";

import { Button } from "@onelens/ui/components/button";
import { Checkbox } from "@onelens/ui/components/checkbox";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@onelens/ui/components/collapsible";
import type { IconName } from "@onelens/ui/components/icons";
import { Icon } from "@onelens/ui/components/icons";
import { Kbd } from "@onelens/ui/components/kbd";
import { cn } from "@onelens/ui/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import { useState } from "react";

interface QueueGroupProps extends ComponentPropsWithoutRef<"div"> {
	defaultOpen?: boolean;
	items: Array<{
		id: string;
		title: string;
		repo: string;
		author: string;
		status: string;
		risk: string;
		time?: string;
		mergedAt?: string;
		inboxSummary?: string;
		ci?: {
			reason: string;
			state: string;
		};
		blockingReason?: string;
		deploy?: {
			duration: string;
			state: string;
		};
	}>;
	onItemSelect: (itemId: string) => void;
	selectedItems: Set<string>;
	title: string;
}

export function QueueGroup({
	title,
	items,
	selectedItems,
	onItemSelect,
	defaultOpen = true,
	className,
	...props
}: QueueGroupProps) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	const handleCheckboxChange = (itemId: string) => {
		onItemSelect(itemId);
	};

	const getIconName = (groupTitle: string): IconName => {
		const iconMap: Record<string, IconName> = {
			"Attention Required": "IconCircle",
			"Ready to Merge": "IconPush",
			"Needs Changes": "IconExclamationTriangle",
			Merged: "IconCheckCircle2",
		};
		return iconMap[groupTitle] || "IconSpeedDots";
	};

	const getIconColor = (groupTitle: string): string => {
		const colorMap: Record<string, string> = {
			"Attention Required": "text-red-500",
			"Ready to Merge": "text-emerald-500",
			"Needs Changes": "text-amber-500",
			Merged: "text-indigo-500",
		};
		return colorMap[groupTitle] || "text-gray-11";
	};

	const getGradientStyle = (groupTitle: string): string => {
		const gradientMap: Record<string, string> = {
			"Attention Required":
				"linear-gradient(90deg, lch(66.74 0.241 27.94) 0%, lch(95.94 0.5 282) 100%), lch(95.94 0.5 282)",
			"Ready to Merge":
				"linear-gradient(90deg, lch(96.024 3.659 136.2) 0%, lch(95.94 0.5 282) 100%), lch(95.94 0.5 282)",
			"Needs Changes":
				"linear-gradient(90deg, lch(96.024 0.825 69.481) 0%, lch(95.94 0.5 282) 100%), lch(95.94 0.5 282)",
			Merged:
				"linear-gradient(90deg, lch(96.024 3.659 282.977) 0%, lch(95.94 0.5 282) 100%), lch(95.94 0.5 282)",
		};
		return (
			gradientMap[groupTitle] ||
			"linear-gradient(90deg, lch(95.94 0.5 282) 0%, lch(95.94 0.5 282) 100%), lch(95.94 0.5 282)"
		);
	};

	const iconName = getIconName(title);
	const iconColor = getIconColor(title);
	const gradientStyle = getGradientStyle(title);

	return (
		<Collapsible
			className={cn("space-y-0.5", className)}
			onOpenChange={setIsOpen}
			open={isOpen}
			{...props}
		>
			<CollapsibleTrigger
				className="queue-group-trigger relative flex w-full items-center gap-3 overflow-hidden rounded-md px-2 py-1.5"
				nativeButton={false}
				render={
					<div className="relative z-10">
						<Button
							className={cn(
								"queue-group-chevron group",
								isOpen ? "" : "-rotate-90"
							)}
							size={"icon-sm"}
							variant={"link"}
						>
							<Icon
								className="queue-group-icon text-gray-11 group-hover:text-gray-12"
								name="IconChevronTriangleDownSmall"
								variant="filled"
							/>
						</Button>
						<div className="flex items-center gap-3">
							<Icon
								className={cn(
									"queue-group-icon transition-colors duration-200",
									iconColor
								)}
								name={iconName}
								variant="filled"
							/>
							<span className="select-none font-medium text-gray-12 text-xs uppercase tracking-wider">
								{title}
							</span>
							<Kbd
								className="tabular-numbers"
								style={{ fontVariantNumeric: "tabular-nums" }}
							>
								{items.length}
							</Kbd>
						</div>
					</div>
				}
				style={{
					background: gradientStyle,
				}}
			/>

			<CollapsibleContent className="queue-group-content">
				<div className="space-y-0">
					{items.length > 0 ? (
						items.map((item) => {
							const displayText = item.inboxSummary;
							const timeText = item.time;

							return (
								<div
									className="queue-group-item flex cursor-pointer items-center gap-4.5 rounded-md px-3.5 py-3 transition-[background-color,transform] duration-200"
									key={item.id}
								>
									<Checkbox
										checked={selectedItems.has(item.id)}
										onCheckedChange={() => handleCheckboxChange(item.id)}
									/>
									<div className="w-12 shrink-0">
										<p className="select-none text-body-small-spaced text-muted-foreground">
											{item.id}
										</p>
									</div>
									<div className="max-w-72 flex-1">
										<p className="select-none truncate text-body-small-medium text-foreground">
											{item.title}
										</p>
									</div>
									<div className="min-w-0 flex-1">
										<p className="select-none truncate text-body-small-regular text-muted-foreground">
											{displayText}
										</p>
									</div>
									<div className="shrink-0">
										<p className="select-none whitespace-nowrap text-body-small-regular text-muted-foreground">
											{timeText}
										</p>
									</div>
								</div>
							);
						})
					) : (
						<div className="py-8 text-center opacity-60 transition-opacity duration-200">
							<p className="text-muted-foreground text-sm">No items</p>
						</div>
					)}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
}
