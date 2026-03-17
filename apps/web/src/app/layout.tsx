import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import "../index.css";
import Header from "@/components/header";
import Providers from "@/components/providers";
import { ScrollableContainer } from "@/components/scrollable-container";

const interVariable = localFont({
	src: "../assets/fonts/InterVariable.woff2",
	display: "swap",
	variable: "--font-inter",
	style: "normal",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "OneLens ~ The intelligence layer for pull requests",
	description: "Fully automated. Zero ceremony. From PR open to merge-ready.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${interVariable.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<ScrollableContainer>
						<Header />
						{children}
					</ScrollableContainer>
				</Providers>
			</body>
		</html>
	);
}
