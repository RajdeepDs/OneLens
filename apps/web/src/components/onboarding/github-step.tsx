"use client";

import { Button } from "@onelens/ui/components/button";
import { Card, CardContent } from "@onelens/ui/components/card";
import { GitHub } from "@onelens/ui/components/icons";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface GitHubStepProps {
	onNext: () => void;
}

export function GitHubStep({ onNext }: GitHubStepProps) {
	const { data: session, isPending } = authClient.useSession();
	const [isConnecting, setIsConnecting] = useState(false);
	const isConnected = !!session?.user;

	const handleConnect = async () => {
		setIsConnecting(true);
		try {
			await authClient.signIn.social({ provider: "github" });
		} catch {
			toast.error("Failed to connect GitHub. Please try again.");
		} finally {
			setIsConnecting(false);
		}
	};

	const handleContinue = () => {
		if (isConnected) {
			onNext();
		}
	};

	const renderConnectionStatus = () => {
		if (isPending) {
			return (
				<div className="flex items-center gap-3">
					<div className="size-10 animate-pulse rounded-full bg-muted" />
					<div className="flex flex-1 flex-col gap-1">
						<div className="h-4 w-24 animate-pulse rounded bg-muted" />
						<div className="h-3 w-32 animate-pulse rounded bg-muted" />
					</div>
				</div>
			);
		}

		if (isConnected) {
			return (
				<div className="flex w-full items-center gap-3">
					<div className="relative size-10 overflow-hidden rounded-full bg-muted">
						{session?.user?.image && (
							<Image
								alt=""
								className="size-full object-cover"
								height={40}
								src={session.user.image}
								width={40}
							/>
						)}
					</div>
					<div className="flex flex-col gap-0.5">
						<span className="text-body-regular-medium">
							{session?.user?.name || "GitHub User"}
						</span>
						<span className="text-body-mini-regular text-muted-foreground">
							{session?.user?.email}
						</span>
					</div>
					<div className="ml-auto rounded-full bg-green-500/10 px-2 py-0.5 font-medium text-green-600 text-xs dark:text-green-400">
						Connected
					</div>
				</div>
			);
		}

		return (
			<div className="flex items-center gap-3">
				<div className="flex size-10 items-center justify-center rounded-full bg-muted">
					<GitHub className="size-5" />
				</div>
				<div className="flex flex-col gap-0.5">
					<span className="text-body-regular-medium">GitHub</span>
					<span className="text-body-small-regular text-gray-11">
						Not connected
					</span>
				</div>
			</div>
		);
	};

	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className="flex w-full flex-col gap-6"
			exit={{ opacity: 0, y: -8 }}
			initial={{ opacity: 0, y: 12 }}
			transition={{ duration: 0.2 }}
		>
			<div className="flex flex-col gap-2">
				<h2 className="text-title-small-semibold">Connect GitHub</h2>
				<p className="text-body-small-spaced text-gray-11">
					Connect GitHub to power your workspace.
				</p>
			</div>

			<Card className="-mx-6">
				<CardContent className="flex flex-col gap-4 px-6">
					{renderConnectionStatus()}
				</CardContent>
			</Card>

			{isConnected ? (
				<Button className="h-10 w-full" onClick={handleContinue}>
					Continue
				</Button>
			) : (
				<Button
					className="h-10 w-full"
					disabled={isConnecting}
					icon={<GitHub />}
					onClick={handleConnect}
					variant="outline"
				>
					{isConnecting ? "Connecting..." : "Connect GitHub"}
				</Button>
			)}
		</motion.div>
	);
}
