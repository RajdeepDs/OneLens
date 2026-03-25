import type { Metadata } from "next";
import { WelcomeClient } from "@/components/onboarding/welcome-client";

export const metadata: Metadata = {
	title: "Welcome ~ OneLens",
	description: "Complete onboarding steps to get started with OneLens.",
};

export default function WelcomePage() {
	return <WelcomeClient />;
}
