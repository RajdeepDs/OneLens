import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

import "../index.css";
import { Providers } from "@/components/theme";

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
	metadataBase: new URL("https://onelens.vercel.app"),
	openGraph: {
		title: "OneLens ~ The intelligence layer for pull requests",
		description: "Fully automated. Zero ceremony. From PR open to merge-ready.",
		url: "https://onelens.vercel.app",
		siteName: "OneLens",
		images: [
			{
				url: "/opengraph-image.png",
				width: "1200",
				height: "630",
				alt: "OneLens",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "OneLens ~ The intelligence layer for pull requests",
		description: "Fully automated. Zero ceremony. From PR open to merge-ready.",
		images: ["/opengraph-image.png"],
		creator: "@onelens",
	},
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
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
