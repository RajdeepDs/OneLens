"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout";
import { QueueGroup } from "@/components/ui/queue-group";
import { INBOX_FIXTURE, type PR } from "@/configs/dummy-data-pr";

export default function InboxPage() {
	const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
	const { yourQueue, mergeReady, needsChanges, merged } = INBOX_FIXTURE;

	// Transform fixture data to match QueueGroup item format
	const transformItem = (item: PR) => ({
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
	});

	const handleItemSelect = (itemId: string) => {
		const newSelected = new Set(selectedItems);
		if (newSelected.has(itemId)) {
			newSelected.delete(itemId);
		} else {
			newSelected.add(itemId);
		}
		setSelectedItems(newSelected);
	};

	return (
		<>
			<PageHeader title="Inbox" />
			<main className="mt-3 px-2">
				<div className="space-y-1">
					<QueueGroup
						defaultOpen={true}
						items={yourQueue.map(transformItem)}
						onItemSelect={handleItemSelect}
						selectedItems={selectedItems}
						title="Your Queue"
					/>
					<QueueGroup
						defaultOpen={true}
						items={mergeReady.map(transformItem)}
						onItemSelect={handleItemSelect}
						selectedItems={selectedItems}
						title="Ready to Merge"
					/>
					<QueueGroup
						defaultOpen={false}
						items={needsChanges.map(transformItem)}
						onItemSelect={handleItemSelect}
						selectedItems={selectedItems}
						title="Needs Changes"
					/>
					<QueueGroup
						defaultOpen={false}
						items={merged.map(transformItem)}
						onItemSelect={handleItemSelect}
						selectedItems={selectedItems}
						title="Merged"
					/>
				</div>
			</main>
		</>
	);
}
