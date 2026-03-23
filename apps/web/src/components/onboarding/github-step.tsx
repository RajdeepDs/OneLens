"use client";

import { Button } from "@onelens/ui/components/button";
import { Card, CardContent } from "@onelens/ui/components/card";
import { GitHub } from "@onelens/ui/components/icons";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface GitHubStepProps {
	onNext: () => void;
	onSkip?: () => void;
}

export function GitHubStep({ onNext, onSkip }: GitHubStepProps) {
	const { data: session, isPending } = authClient.useSession();
	const router = useRouter();
	const isConnected = !!session?.user;

	const handleConnect = async () => {
		try {
			await authClient.signIn.social({ provider: "github" });
		} catch {
			router.push("/login");
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
				<div className="flex items-center gap-3">
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
						<span className="font-medium text-sm">
							{session?.user?.name || "GitHub User"}
						</span>
						<span className="text-muted-foreground text-xs">
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
					<span className="font-medium text-sm">GitHub</span>
					<span className="text-muted-foreground text-xs">Not connected</span>
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
				<h2 className="font-medium text-lg leading-snug">Connect GitHub</h2>
				<p className="text-muted-foreground text-sm">
					Connect your GitHub account to access repositories and track pull
					requests.
				</p>
			</div>

			<Card>
				<CardContent className="flex flex-col gap-4 p-4">
					{renderConnectionStatus()}
				</CardContent>
			</Card>

			<div className="flex flex-col gap-3">
				{isConnected ? (
					<Button className="h-10 w-full" onClick={handleContinue}>
						Continue
					</Button>
				) : (
					<Button
						className="h-10 w-full"
						icon={<GitHub />}
						onClick={handleConnect}
						variant="outline"
					>
						Connect GitHub
					</Button>
				)}

				{onSkip && (
					<Button
						className="h-10 w-full text-muted-foreground"
						onClick={onSkip}
						variant="ghost"
					>
						Skip for now
					</Button>
				)}
			</div>
		</motion.div>
	);
}
