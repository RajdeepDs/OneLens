"use client";

import { Badge } from "@onelens/ui/components/badge";
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
import type { Route } from "next";
import Link from "next/link";
import { useTheme } from "next-themes";
import type { ComponentPropsWithoutRef } from "react";
import { memo, useCallback, useMemo, useState } from "react";

const ICON_MAP: Record<string, IconName> = {
	"Ready to Merge": "IconPush",
	"Needs Changes": "IconExclamationTriangle",
	Merged: "IconCheckCircle2",
};

const COLOR_MAP: Record<string, string> = {
	"Ready to Merge": "text-emerald-500",
	"Needs Changes": "text-amber-500",
	Merged: "text-indigo-500",
};

const GRADIENT_LIGHT_MAP: Record<string, string> = {
	"Ready to Merge":
		"linear-gradient(90deg, lch(96.024 3.659 136.2) 0%, lch(95.94 0.5 282) 100%)",

	"Needs Changes":
		"linear-gradient(90deg, lch(96.024 0.825 69.481) 0%, lch(95.94 0.5 282) 100%)",

	Merged:
		"linear-gradient(90deg, lch(96.024 3.659 282.977) 0%, lch(95.94 0.5 282) 100%)",
};

const GRADIENT_DARK_MAP: Record<string, string> = {
	"Ready to Merge":
		"linear-gradient(90deg, lch(9.38 3.59 140) 0%, lch(7.67 0.75 272) 100%)",

	"Needs Changes":
		"linear-gradient(90deg, lch(9.38 1.88 78.116) 0%, lch(7.67 0.75 272) 100%)",

	Merged:
		"linear-gradient(90deg, lch(9.38 6.126 283.311) 0%, lch(7.67 0.75 272) 100%)",
};

const DEFAULT_LIGHT_GRADIENT =
	"linear-gradient(90deg, lch(95.94 0.5 282) 0%, lch(95.94 0.5 282) 100%)";

const DEFAULT_DARK_GRADIENT =
	"linear-gradient(90deg, lch(9.38 0.805 269.936) 0%, lch(7.67 0.75 272) 100%)";

const DEFAULT_ICON = "IconSpeedDots" as IconName;
const DEFAULT_COLOR = "text-gray-11";

export interface QueueGroupItemReviewer {
	avatarUrl: string | null;
	initials: string;
	ringColor: "green" | "yellow" | "red";
}

export interface QueueGroupItem {
	author: string;
	blockingReason?: string;
	ci?: {
		reason: string;
		state: string;
	};
	deploy?: {
		duration: string;
		state: string;
	};
	id: string;
	inboxSummary?: string;
	mergedAt?: string;
	prId: string;
	repo: string;
	reviewers: QueueGroupItemReviewer[];
	risk: string;
	status: string;
	time?: string;
	title: string;
}

interface QueueGroupProps extends ComponentPropsWithoutRef<"div"> {
	defaultOpen?: boolean;
	items: QueueGroupItem[];
	onItemSelect: (itemId: string) => void;
	selectedItems: Set<string>;
	title: string;
}

interface QueueItemProps {
	isSelected: boolean;
	item: QueueGroupItem;
	onSelect: (itemId: string) => void;
}

const QueueItem = memo(function QueueItem({
	item,
	isSelected,
	onSelect,
}: QueueItemProps) {
	const handleCheckedChange = useCallback(() => {
		onSelect(item.id);
	}, [onSelect, item.id]);

	const ciStatus = getCiStatus(item.ci?.state);
	const hasReviewers = item.reviewers.length > 0;

	return (
		<div className="queue-group-item flex cursor-pointer items-center gap-4.5 rounded-md px-3.5 py-3 transition-[background-color,transform] duration-200">
			<Checkbox checked={isSelected} onCheckedChange={handleCheckedChange} />
			<Link
				className="flex flex-1 items-center gap-4.5"
				href={`pr/${item.prId}` as Route}
			>
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
						{item.inboxSummary}
					</p>
				</div>
				<div className="flex shrink-0 items-center gap-3">
					{ciStatus && (
						<Badge
							className="flex h-6 items-center gap-1.5"
							variant={"outline"}
						>
							<div className={cn("size-2 rounded-full", ciStatus.dotColor)} />
							<span className="text-body-small-regular text-gray-11 capitalize">
								{ciStatus.label}
							</span>
						</Badge>
					)}
					<div className="flex items-center gap-1.5">
						{hasReviewers ? (
							<div className="flex -space-x-1.5">
								{item.reviewers.map((reviewer, index) => (
									<div
										className={cn(
											"flex h-6 w-6 items-center justify-center rounded-full border-2 bg-muted font-medium text-[10px]",
											reviewer.ringColor === "green" && "border-emerald-500",
											reviewer.ringColor === "yellow" && "border-amber-500",
											reviewer.ringColor === "red" && "border-red-500"
										)}
										key={index}
									>
										{reviewer.initials}
									</div>
								))}
							</div>
						) : (
							<div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-muted-foreground/30 border-dashed">
								<svg
									aria-label="Add reviewer"
									className="h-3 w-3 text-muted-foreground/50"
									fill="none"
									viewBox="0 0 12 12"
								>
									<path
										d="M6 2v8M2 6h8"
										stroke="currentColor"
										strokeLinecap="round"
										strokeWidth="1.5"
									/>
								</svg>
							</div>
						)}
					</div>

					<p className="min-w-8 select-none whitespace-nowrap text-right text-body-small-regular text-muted-foreground">
						{item.time}
					</p>
				</div>
			</Link>
		</div>
	);
});

function getCiStatus(state: string | undefined) {
	if (!state) {
		return null;
	}
	switch (state) {
		case "passed":
			return { dotColor: "bg-emerald-500", label: "passing" };
		case "flaky":
			return { dotColor: "bg-amber-500", label: "flaky" };
		case "failed":
			return { dotColor: "bg-red-500", label: "failing" };
		case "pending":
			return { dotColor: "bg-gray-400", label: "pending" };
		default:
			return null;
	}
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
	const { theme } = useTheme();

	const isDark = theme === "dark";

	const iconName = ICON_MAP[title] || DEFAULT_ICON;
	const iconColor = COLOR_MAP[title] || DEFAULT_COLOR;

	const gradientStyle = useMemo(() => {
		if (isDark) {
			return GRADIENT_DARK_MAP[title] || DEFAULT_DARK_GRADIENT;
		}
		return GRADIENT_LIGHT_MAP[title] || DEFAULT_LIGHT_GRADIENT;
	}, [title, isDark]);

	const handleItemSelect = useCallback(
		(itemId: string) => {
			onItemSelect(itemId);
		},
		[onItemSelect]
	);

	const renderedItems = useMemo(
		() =>
			items.map((item) => (
				<QueueItem
					isSelected={selectedItems.has(item.id)}
					item={item}
					key={item.id}
					onSelect={handleItemSelect}
				/>
			)),
		[items, selectedItems, handleItemSelect]
	);

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
							<Kbd className="tabular-numbers">{items.length}</Kbd>
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
						renderedItems
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
