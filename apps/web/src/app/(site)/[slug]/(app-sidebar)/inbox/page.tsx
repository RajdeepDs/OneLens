"use client";

import { memo, useCallback, useState } from "react";
import { PageHeader } from "@/components/layout";
import { QueueGroup } from "@/components/ui/queue-group";
import { INBOX_FIXTURE, type PR } from "@/configs/dummy-data-pr";

function transformItem(item: PR) {
	return {
		id: item.displayId,
		title: item.title,
		repo: item.repo,
		author: item.author.name,
		status: item.status,
		risk: item.ai?.riskLevel || "unknown",
		time: item.openedRelative,
		inboxSummary: item.ai?.inboxSummary,
		mergedAt: "mergedAtRelative" in item ? item.mergedAtRelative : undefined,
		ci: item.ci ? { reason: item.ci.reason, state: item.ci.state } : undefined,
		blockingReason: "blockingReason" in item ? item.blockingReason : undefined,
		deploy:
			"deploy" in item && item.deploy
				? { duration: item.deploy.duration, state: item.deploy.state }
				: undefined,
	};
}

const MemoizedQueueGroup = memo(QueueGroup);

export default function InboxPage() {
	const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
	const { yourQueue, mergeReady, needsChanges, merged } = INBOX_FIXTURE;

	const yourQueueItems = yourQueue.map(transformItem);
	const mergeReadyItems = mergeReady.map(transformItem);
	const needsChangesItems = needsChanges.map(transformItem);
	const mergedItems = merged.map(transformItem);

	const handleItemSelect = useCallback((itemId: string) => {
		setSelectedItems((prev) => {
			if (prev.has(itemId)) {
				const next = new Set(prev);
				next.delete(itemId);
				return next;
			}
			const next = new Set(prev);
			next.add(itemId);
			return next;
		});
	}, []);

	return (
		<>
			<PageHeader title="Inbox" />
			<main className="mt-3 px-2">
				<div className="space-y-1">
					<MemoizedQueueGroup
						defaultOpen={true}
						items={yourQueueItems}
						onItemSelect={handleItemSelect}
						selectedItems={selectedItems}
						title="Your Queue"
					/>
					<MemoizedQueueGroup
						defaultOpen={true}
						items={mergeReadyItems}
						onItemSelect={handleItemSelect}
						selectedItems={selectedItems}
						title="Ready to Merge"
					/>
					<MemoizedQueueGroup
						defaultOpen={false}
						items={needsChangesItems}
						onItemSelect={handleItemSelect}
						selectedItems={selectedItems}
						title="Needs Changes"
					/>
					<MemoizedQueueGroup
						defaultOpen={false}
						items={mergedItems}
						onItemSelect={handleItemSelect}
						selectedItems={selectedItems}
						title="Merged"
					/>
				</div>
			</main>
		</>
	);
}
