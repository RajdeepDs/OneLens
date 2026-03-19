import type { ReactNode } from "react";
import { Header, ScrollableContainer } from "@/components/layout";

export default function MarketingLayout({ children }: { children: ReactNode }) {
	return (
		<ScrollableContainer>
			<Header />
			{children}
		</ScrollableContainer>
	);
}
