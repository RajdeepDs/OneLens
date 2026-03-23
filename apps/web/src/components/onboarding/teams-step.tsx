"use client";

import { Button } from "@onelens/ui/components/button";
import { FieldError, FieldLabel } from "@onelens/ui/components/field";
import {
	IconChainLink1,
	IconCirclePlus,
	IconLoader,
	IconTrashCan,
} from "@onelens/ui/components/icons";
import { Input } from "@onelens/ui/components/input";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface TeamInvite {
	acceptedAt?: Date;
	email: string;
	expiresAt: Date;
	id: string;
	token: string;
}

interface TeamsStepProps {
	invites: TeamInvite[];
	onCreateInvite: (email: string) => Promise<string>;
	onDeleteInvite: (inviteId: string) => Promise<void>;
	onNext: () => void;
	onSkip?: () => void;
}

export function TeamsStep({
	invites,
	onNext,
	onSkip,
	onCreateInvite,
	onDeleteInvite,
}: TeamsStepProps) {
	const [email, setEmail] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isCreating, setIsCreating] = useState(false);

	const handleCreateInvite = async () => {
		if (!EMAIL_REGEX.test(email)) {
			setError("Please enter a valid email address");
			return;
		}

		setIsCreating(true);
		setError(null);

		try {
			await onCreateInvite(email);
			setEmail("");
			toast.success(`Invite sent to ${email}`);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to create invite");
		} finally {
			setIsCreating(false);
		}
	};

	const handleDeleteInvite = async (inviteId: string) => {
		try {
			await onDeleteInvite(inviteId);
			toast.success("Invite removed");
		} catch {
			toast.error("Failed to remove invite");
		}
	};

	const copyInviteLink = (token: string) => {
		const link = `${typeof window !== "undefined" ? window.location.origin : ""}/invite/${token}`;
		navigator.clipboard.writeText(link);
		toast.success("Invite link copied to clipboard");
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
				<h2 className="font-medium text-lg leading-snug">Invite your team</h2>
				<p className="text-muted-foreground text-sm">
					Send invite links to your teammates so they can join your workspace.
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<div className="flex gap-2">
					<div className="flex flex-1 flex-col gap-1">
						<FieldLabel htmlFor="invite-email">Email address</FieldLabel>
						<Input
							aria-invalid={!!error}
							disabled={isCreating}
							id="invite-email"
							onChange={(e) => {
								setEmail(e.target.value);
								if (error) {
									setError(null);
								}
							}}
							placeholder="colleague@company.com"
							type="email"
							value={email}
						/>
						{error && <FieldError>{error}</FieldError>}
					</div>
					<Button
						className="mt-5 h-10 shrink-0"
						disabled={!email || isCreating}
						icon={
							isCreating ? (
								<IconLoader className="animate-spin" />
							) : (
								<IconCirclePlus />
							)
						}
						onClick={handleCreateInvite}
					>
						Invite
					</Button>
				</div>
			</div>

			{invites.length > 0 && (
				<div className="flex flex-col gap-2">
					<span className="font-medium text-sm">Pending invites</span>
					<div className="flex max-h-48 flex-col gap-1 overflow-y-auto">
						{invites.map((invite) => (
							<div
								className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
								key={invite.id}
							>
								<div className="flex min-w-0 flex-1 flex-col gap-0.5">
									<span className="truncate font-medium text-sm">
										{invite.email}
									</span>
									<span className="text-muted-foreground text-xs">
										Invited {new Date(invite.expiresAt).toLocaleDateString()}
									</span>
								</div>
								<Button
									onClick={() => copyInviteLink(invite.token)}
									size="icon-sm"
									title="Copy invite link"
									variant="ghost"
								>
									<IconChainLink1 />
								</Button>
								<Button
									onClick={() => handleDeleteInvite(invite.id)}
									size="icon-sm"
									title="Remove invite"
									variant="ghost"
								>
									<IconTrashCan />
								</Button>
							</div>
						))}
					</div>
				</div>
			)}

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
