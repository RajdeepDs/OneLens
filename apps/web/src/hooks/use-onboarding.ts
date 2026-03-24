"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { parsers } from "@/components/onboarding/onboarding-params";
import type { Repository } from "@/components/onboarding/repository-step";
import type { TeamInvite } from "@/components/onboarding/teams-step";
import { orpc } from "@/utils/orpc";

interface UseOnboardingOptions {
	onComplete?: () => void;
}

interface UseOnboardingReturn {
	complete: () => void;
	createInvite: () => Promise<string>;
	currentStep: number;
	deleteInvite: (inviteId: string) => Promise<void>;
	direction: number;
	goBack: () => void;
	goNext: () => void;
	isReposLoading: boolean;
	isWorkspaceLoading: boolean;
	repositories: Repository[];
	saveWorkspace: (data: { name: string; slug: string }) => void;
	selectedRepoId: number | null;
	setRepositories: (repos: Repository[]) => void;
	setSelectedRepoId: (id: number | null) => void;
	skipRepositories: () => void;
	teamInvites: TeamInvite[];
	workspaceId: string | null;
	workspaceName: string;
}

const TOTAL_STEPS = 4;

export function useOnboarding({
	onComplete,
}: UseOnboardingOptions): UseOnboardingReturn {
	const [currentStep, setCurrentStep] = useQueryState("step", parsers.step);
	const [direction, setDirection] = useState(1);
	const [workspaceId, setWorkspaceId] = useState<string | null>(null);
	const [workspaceName, setWorkspaceName] = useState("");
	const [repositories, setRepositories] = useState<Repository[]>([]);
	const [selectedRepoId, setSelectedRepoId] = useState<number | null>(null);
	const [teamInvites, setTeamInvites] = useState<TeamInvite[]>([]);

	const goNext = useCallback(() => {
		setDirection(1);
		setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
	}, [setCurrentStep]);

	const goBack = useCallback(() => {
		setDirection(-1);
		setCurrentStep((prev) => Math.max(prev - 1, 0));
	}, [setCurrentStep]);

	const saveWorkspaceMutation = useMutation(
		orpc.saveWorkspace.mutationOptions({
			onSuccess: (data) => {
				setWorkspaceId(data.id);
				goNext();
			},
			onError: (error) => {
				toast.error(error.message || "Failed to create workspace");
			},
		})
	);

	const saveRepositoriesMutation = useMutation(
		orpc.saveRepositories.mutationOptions({
			onSuccess: () => {
				goNext();
			},
			onError: () => {
				goNext();
			},
		})
	);

	const createInviteMutation = useMutation(
		orpc.createTeamInvite.mutationOptions({
			onSuccess: (data) => {
				setTeamInvites((prev) => [
					...prev,
					{
						id: crypto.randomUUID(),
						token: data.token,
						expiresAt: data.expiresAt,
					},
				]);
			},
			onError: (error) => {
				toast.error(error.message || "Failed to create invite");
			},
		})
	);

	const deleteInviteMutation = useMutation(
		orpc.deleteTeamInvite.mutationOptions({
			onSuccess: () => {
				toast.success("Invite removed");
			},
			onError: () => {
				toast.error("Failed to remove invite");
			},
		})
	);

	const saveWorkspace = useCallback(
		(data: { name: string; slug: string }) => {
			setWorkspaceName(data.name);
			saveWorkspaceMutation.mutate(data);
		},
		[saveWorkspaceMutation]
	);

	const skipRepositories = useCallback(() => {
		if (workspaceId && selectedRepoId !== null) {
			saveRepositoriesMutation.mutate({
				workspaceId,
				repositoryIds: [selectedRepoId],
			});
		} else {
			goNext();
		}
	}, [workspaceId, selectedRepoId, saveRepositoriesMutation, goNext]);

	const createInvite = useCallback(async (): Promise<string> => {
		if (!workspaceId) {
			throw new Error("No workspace created");
		}
		const result = await createInviteMutation.mutateAsync({
			workspaceId,
		});
		return result.token;
	}, [workspaceId, createInviteMutation]);

	const deleteInvite = useCallback(
		async (inviteId: string): Promise<void> => {
			await deleteInviteMutation.mutateAsync({ inviteId });
			setTeamInvites((prev) => prev.filter((inv) => inv.id !== inviteId));
		},
		[deleteInviteMutation]
	);

	const complete = useCallback(() => {
		onComplete?.();
	}, [onComplete]);

	return {
		currentStep,
		direction,
		workspaceId,
		workspaceName,
		repositories,
		selectedRepoId,
		teamInvites,
		isWorkspaceLoading: saveWorkspaceMutation.isPending,
		isReposLoading: saveRepositoriesMutation.isPending,
		goNext,
		goBack,
		saveWorkspace,
		setRepositories,
		setSelectedRepoId,
		skipRepositories,
		createInvite,
		deleteInvite,
		complete,
	};
}
