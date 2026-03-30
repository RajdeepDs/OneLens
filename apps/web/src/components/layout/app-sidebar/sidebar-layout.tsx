"use client";

import { useSidebar } from "@onelens/ui/components/sidebar";
import { cn } from "@onelens/ui/lib/utils";

interface SidebarLayoutProps {
	readonly children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
	const { isMobile } = useSidebar();
	return (
		<div
			className={cn(
				"flex h-screen w-full flex-col overflow-hidden bg-gray-3 py-1.5 pr-1.5",
				{
					"py-0 pr-0": isMobile,
				}
			)}
		>
			<div
				className={cn(
					"flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-gray-2",
					!isMobile && "rounded-lg shadow"
				)}
			>
				{children}
			</div>
		</div>
	);
}
