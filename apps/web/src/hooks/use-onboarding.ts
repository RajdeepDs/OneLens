"use client";

import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { Repository } from "@/components/onboarding/RepositoryStep";
import type { TeamInvite } from "@/components/onboarding/TeamsStep";
import { orpc } from "@/utils/orpc";

interface UseOnboardingOptions {
	onComplete?: () => void;
}

interface UseOnboardingReturn {
	complete: () => void;
	createInvite: (email: string) => Promise<string>;
	currentStep: number;
	deleteInvite: (inviteId: string) => Promise<void>;
	direction: number;
	goBack: () => void;
	goNext: () => void;
	isReposLoading: boolean;
	isWorkspaceLoading: boolean;
	repositories: Repository[];
	saveWorkspace: (name: string) => void;
	selectedRepoIds: number[];
	setRepositories: (repos: Repository[]) => void;
	setSelectedRepoIds: (ids: number[]) => void;
	skipGitHub: () => void;
	skipRepositories: () => void;
	teamInvites: TeamInvite[];
	workspaceId: string | null;
	workspaceName: string;
}

const TOTAL_STEPS = 4;

export function useOnboarding({
	onComplete,
}: UseOnboardingOptions): UseOnboardingReturn {
	const [currentStep, setCurrentStep] = useState(0);
	const [direction, setDirection] = useState(1);
	const [workspaceId, setWorkspaceId] = useState<string | null>(null);
	const [workspaceName, setWorkspaceName] = useState("");
	const [repositories, setRepositories] = useState<Repository[]>([]);
	const [selectedRepoIds, setSelectedRepoIds] = useState<number[]>([]);
	const [teamInvites, setTeamInvites] = useState<TeamInvite[]>([]);

	const goNext = useCallback(() => {
		setDirection(1);
		setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
	}, []);

	const goBack = useCallback(() => {
		setDirection(-1);
		setCurrentStep((prev) => Math.max(prev - 1, 0));
	}, []);

	const saveWorkspaceMutation = useMutation(
		orpc.saveWorkspace.mutationOptions({
			onSuccess: (data) => {
				setWorkspaceId(data.id);
				toast.success("Workspace created!");
				goNext();
			},
			onError: (error) => {
				toast.error(error.message || "Failed to create workspace");
			},
		})
	);

	const saveRepositoriesMutation = useMutation(
		orpc.saveRepositories.mutationOptions({
			onError: () => {
				goNext();
			},
		})
	);

	const createInviteMutation = useMutation(
		orpc.createTeamInvite.mutationOptions({
			onSuccess: (data, variables) => {
				setTeamInvites((prev) => [
					...prev,
					{
						id: crypto.randomUUID(),
						email: variables.email,
						token: data.token,
						expiresAt: data.expiresAt,
					},
				]);
				toast.success(`Invite sent to ${variables.email}`);
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
		(name: string) => {
			setWorkspaceName(name);
			saveWorkspaceMutation.mutate({ name });
		},
		[saveWorkspaceMutation]
	);

	const skipGitHub = useCallback(() => {
		goNext();
	}, [goNext]);

	const skipRepositories = useCallback(() => {
		if (workspaceId && selectedRepoIds.length > 0) {
			saveRepositoriesMutation.mutate({
				workspaceId,
				repositoryIds: selectedRepoIds,
			});
		} else {
			goNext();
		}
	}, [workspaceId, selectedRepoIds, saveRepositoriesMutation, goNext]);

	const createInvite = useCallback(
		async (email: string): Promise<string> => {
			if (!workspaceId) {
				throw new Error("No workspace created");
			}
			const result = await createInviteMutation.mutateAsync({
				workspaceId,
				email,
			});
			return result.token;
		},
		[workspaceId, createInviteMutation]
	);

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
		selectedRepoIds,
		teamInvites,
		isWorkspaceLoading: saveWorkspaceMutation.isPending,
		isReposLoading: saveRepositoriesMutation.isPending,
		goNext,
		goBack,
		saveWorkspace,
		skipGitHub,
		setRepositories,
		setSelectedRepoIds,
		skipRepositories,
		createInvite,
		deleteInvite,
		complete,
	};
}
