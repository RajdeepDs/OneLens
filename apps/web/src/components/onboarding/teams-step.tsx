"use client";

import { Button } from "@onelens/ui/components/button";
import {
	IconCircleCheck,
	IconSquareBehindSquare2,
} from "@onelens/ui/components/icons";
import { Input } from "@onelens/ui/components/input";
import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export interface TeamInvite {
	acceptedAt?: Date;
	expiresAt: Date;
	id: string;
	token: string;
}

interface TeamsStepProps {
	invites: TeamInvite[];
	onCreateInvite: () => Promise<string>;
	onNext: () => void;
	onSkip?: () => void;
}

export function TeamsStep({
	invites,
	onNext,
	onSkip,
	onCreateInvite,
}: TeamsStepProps) {
	const [copied, setCopied] = useState(false);
	const [isCreating, setIsCreating] = useState(false);

	const handleCreateInvite = useCallback(async () => {
		setIsCreating(true);

		try {
			await onCreateInvite();
		} catch (err) {
			toast.error(
				err instanceof Error ? err.message : "Failed to create invite"
			);
		} finally {
			setIsCreating(false);
		}
	}, [onCreateInvite]);

	useEffect(() => {
		if (invites.length === 0 && !isCreating) {
			handleCreateInvite();
		}
	}, [invites.length, isCreating, handleCreateInvite]);

	const handleCopyInviteLink = (token: string) => {
		const link = `${typeof window !== "undefined" ? window.location.origin : ""}/invite/${token}`;
		navigator.clipboard.writeText(link);
		setCopied(true);
		toast.success("Invite link copied to clipboard");

		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	const currentInvite = invites[0];

	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className="flex w-full flex-col gap-6"
			exit={{ opacity: 0, y: -8 }}
			initial={{ opacity: 0, y: 12 }}
			transition={{ duration: 0.2 }}
		>
			<div className="flex flex-col gap-2">
				<h2 className="text-title-small-semibold">Invite your team</h2>
				<p className="text-body-small-spaced text-gray-11">
					Share this link with your teammates.
				</p>
			</div>

			<div className="flex w-full items-center gap-2">
				<Input
					className="h-8 w-full"
					disabled
					readOnly
					tabIndex={-1}
					value={
						currentInvite
							? `${typeof window !== "undefined" ? window.location.origin : ""}/invite/${currentInvite.token}`
							: "Generating invite link..."
					}
				/>
				<Button
					disabled={!currentInvite || copied}
					onClick={() =>
						currentInvite && handleCopyInviteLink(currentInvite.token)
					}
					size="icon"
				>
					{copied ? <IconCircleCheck /> : <IconSquareBehindSquare2 />}
				</Button>
			</div>

			<div className="flex flex-col gap-3">
				<Button className="h-10 w-full" onClick={onNext}>
					Complete setup
				</Button>

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
