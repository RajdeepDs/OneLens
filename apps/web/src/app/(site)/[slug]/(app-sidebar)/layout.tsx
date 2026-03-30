import { SidebarProvider } from "@onelens/ui/components/sidebar";
import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarLayout } from "@/components/layout/app-sidebar/sidebar-layout";
import { batchPrefetch } from "@/orpc";
import { orpc } from "@/utils/orpc";

export default async function AppLayout({ children }: { children: ReactNode }) {
	await batchPrefetch([
		orpc.getCurrentWorkspace.queryOptions({ input: { slug: "one-lens" } }),
	]);
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarLayout>{children}</SidebarLayout>
		</SidebarProvider>
	);
}
