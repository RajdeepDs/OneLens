"use client";

import { SidebarTrigger } from "@onelens/ui/components/sidebar";
import type { ReactNode } from "react";

interface PageHeaderProps {
	actions?: ReactNode;
	className?: string;
	title: string | ReactNode;
	titleClassName?: string;
}

export function PageHeader({
	title,
	actions,
	className = "",
	titleClassName = "",
}: PageHeaderProps) {
	return (
		<header
			className={`flex h-11 items-center justify-between gap-4 border-b px-4 ${className}`}
		>
			<div className="flex min-w-0 flex-1 items-center gap-3">
				<SidebarTrigger isMobile={true} />
				<div className={`flex min-w-0 flex-col gap-0 ${titleClassName}`}>
					<h1 className="text-body-regular-medium text-gray-12">{title}</h1>
				</div>
			</div>
			{actions && (
				<div className="flex shrink-0 items-center gap-2">{actions}</div>
			)}
		</header>
	);
}
