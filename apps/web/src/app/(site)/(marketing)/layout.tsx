import type { ReactNode } from "react";
import Header from "@/components/header";
import { ScrollableContainer } from "@/components/scrollable-container";

export default function MarketingLayout({ children }: { children: ReactNode }) {
	return (
		<ScrollableContainer>
			<Header />
			{children}
		</ScrollableContainer>
	);
}
