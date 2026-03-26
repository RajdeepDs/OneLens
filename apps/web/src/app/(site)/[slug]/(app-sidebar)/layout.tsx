import { SidebarProvider } from "@onelens/ui/components/sidebar";
import type { ReactNode } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarLayout } from "@/components/layout/app-sidebar/sidebar-layout";

export default function AppLayout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarLayout>{children}</SidebarLayout>
		</SidebarProvider>
	);
}
