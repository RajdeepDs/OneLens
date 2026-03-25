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
	acceptedAt?: Date | null;
	expiresAt: Date;
	id: string;
	token: string;
}

interface TeamsStepProps {
	invites: TeamInvite[];
	isLoading?: boolean;
	onCreateInvite: () => Promise<string>;
	onNext: () => void;
}

export function TeamsStep({
	invites,
	isLoading,
	onNext,
	onCreateInvite,
}: TeamsStepProps) {
	const [copied, setCopied] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [createError, setCreateError] = useState<string | null>(null);

	const handleCreateInvite = useCallback(async () => {
		setIsCreating(true);
		setCreateError(null);

		try {
			await onCreateInvite();
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "Failed to create invite";
			setCreateError(message);
			toast.error(message);
		} finally {
			setIsCreating(false);
		}
	}, [onCreateInvite]);

	useEffect(() => {
		if (invites.length === 0 && !isCreating && !isLoading && !createError) {
			handleCreateInvite();
		}
	}, [invites.length, isCreating, isLoading, createError, handleCreateInvite]);

	const handleCopyInviteLink = async (token: string) => {
		const link = `${typeof window !== "undefined" ? window.location.origin : ""}/invite/${token}`;
		try {
			await navigator.clipboard.writeText(link);
			setCopied(true);
			toast.success("Invite link copied to clipboard");

			setTimeout(() => {
				setCopied(false);
			}, 2000);
		} catch {
			toast.error("Failed to copy invite link");
		}
	};

	const currentInvite = invites[0];

	const getInviteLink = () => {
		if (createError) {
			return "Failed to generate invite";
		}
		if (isLoading) {
			return "Loading...";
		}
		if (currentInvite) {
			const origin =
				typeof window !== "undefined" ? window.location.origin : "";
			return `${origin}/invite/${currentInvite.token}`;
		}
		return "Generating invite link...";
	};

	const inviteLink = getInviteLink();

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
					value={inviteLink}
				/>
				{createError ? (
					<Button
						disabled={isCreating}
						onClick={handleCreateInvite}
						size="icon"
						variant={"secondary"}
					>
						{isCreating ? "..." : "!"}
					</Button>
				) : (
					<Button
						disabled={!currentInvite || copied}
						onClick={() =>
							currentInvite && handleCopyInviteLink(currentInvite.token)
						}
						size="icon"
						variant={"secondary"}
					>
						{copied ? <IconCircleCheck /> : <IconSquareBehindSquare2 />}
					</Button>
				)}
			</div>

			<Button className="h-10 w-full" onClick={onNext}>
				Complete setup
			</Button>
		</motion.div>
	);
}
