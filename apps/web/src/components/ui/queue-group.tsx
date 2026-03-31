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
import { memo, useCallback, useMemo, useState } from "react";

const ICON_MAP: Record<string, IconName> = {
	"Attention Required": "IconCircle",
	"Ready to Merge": "IconPush",
	"Needs Changes": "IconExclamationTriangle",
	Merged: "IconCheckCircle2",
};

const COLOR_MAP: Record<string, string> = {
	"Attention Required": "text-red-500",
	"Ready to Merge": "text-emerald-500",
	"Needs Changes": "text-amber-500",
	Merged: "text-indigo-500",
};

const GRADIENT_MAP: Record<string, string> = {
	"Attention Required":
		"linear-gradient(90deg, lch(66.74 0.241 27.94) 0%, lch(95.94 0.5 282) 100%), lch(95.94 0.5 282)",
	"Ready to Merge":
		"linear-gradient(90deg, lch(96.024 3.659 136.2) 0%, lch(95.94 0.5 282) 100%), lch(95.94 0.5 282)",
	"Needs Changes":
		"linear-gradient(90deg, lch(96.024 0.825 69.481) 0%, lch(95.94 0.5 282) 100%), lch(95.94 0.5 282)",
	Merged:
		"linear-gradient(90deg, lch(96.024 3.659 282.977) 0%, lch(95.94 0.5 282) 100%), lch(95.94 0.5 282)",
};

const DEFAULT_ICON = "IconSpeedDots" as IconName;
const DEFAULT_COLOR = "text-gray-11";
const DEFAULT_GRADIENT =
	"linear-gradient(90deg, lch(95.94 0.5 282) 0%, lch(95.94 0.5 282) 100%), lch(95.94 0.5 282)";

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
	repo: string;
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

	return (
		<div className="queue-group-item flex cursor-pointer items-center gap-4.5 rounded-md px-3.5 py-3 transition-[background-color,transform] duration-200">
			<Checkbox checked={isSelected} onCheckedChange={handleCheckedChange} />
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
			<div className="shrink-0">
				<p className="select-none whitespace-nowrap text-body-small-regular text-muted-foreground">
					{item.time}
				</p>
			</div>
		</div>
	);
});

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

	const iconName = ICON_MAP[title] || DEFAULT_ICON;
	const iconColor = COLOR_MAP[title] || DEFAULT_COLOR;
	const gradientStyle = GRADIENT_MAP[title] || DEFAULT_GRADIENT;

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
