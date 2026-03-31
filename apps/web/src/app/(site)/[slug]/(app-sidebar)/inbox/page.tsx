"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout";
import { QueueGroup } from "@/components/ui/queue-group";
import {
	merged,
	mergeReady,
	needsChanges,
	yourQueue,
} from "@/configs/dummy-data-pr";

export default function InboxPage() {
	const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

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
			<main className="mt-2 px-2">
				<div className="space-y-0.5">
					<QueueGroup
						defaultOpen={true}
						items={[...yourQueue]}
						onItemSelect={handleItemSelect}
						selectedItems={selectedItems}
						title="Your Queue"
					/>
					<QueueGroup
						defaultOpen={true}
						items={[...mergeReady]}
						onItemSelect={handleItemSelect}
						selectedItems={selectedItems}
						title="Ready to Merge"
					/>
					<QueueGroup
						defaultOpen={false}
						items={[...needsChanges]}
						onItemSelect={handleItemSelect}
						selectedItems={selectedItems}
						title="Needs Changes"
					/>
					<QueueGroup
						defaultOpen={false}
						items={[...merged]}
						onItemSelect={handleItemSelect}
						selectedItems={selectedItems}
						title="Merged"
					/>
				</div>
			</main>
		</>
	);
}
