"use client";

import { Button } from "@onelens/ui/components/button";
import { Icon } from "@onelens/ui/components/icons";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useGitHubRepos, useOnboarding } from "@/hooks";
import { AnimatedStepContent } from "./animated-step-content";
import { GitHubStep } from "./github-step";
import { STEPS, StepIndicator } from "./onboarding-wizard";
import { RepositoryStep } from "./repository-step";
import { TeamsStep } from "./teams-step";
import { WorkspaceStep } from "./workspace-step";

export function WelcomeClient() {
	const router = useRouter();

	const {
		currentStep,
		direction,
		workspaceName,
		repositories,
		selectedRepoId,
		teamInvites,
		isWorkspaceLoading,
		isWorkspaceFetching,
		goNext,
		goBack,
		saveWorkspace,
		setRepositories,
		setSelectedRepoId,
		skipRepositories,
		createInvite,
		complete,
	} = useOnboarding({
		onComplete: () => {
			router.push("/dashboard" as Route);
		},
	});

	const {
		data: fetchedRepos,
		isLoading: isReposLoading,
		error: reposError,
	} = useGitHubRepos();

	const canGoBack = currentStep > 0;

	const handleGitHubNext = () => {
		if (fetchedRepos) {
			setRepositories(fetchedRepos);
		}
		goNext();
	};
	const renderStep = () => {
		switch (currentStep) {
			case 0:
				return (
					<WorkspaceStep
						initialValue={workspaceName}
						isLoading={isWorkspaceLoading}
						onNext={saveWorkspace}
					/>
				);
			case 1:
				return <GitHubStep onNext={handleGitHubNext} />;
			case 2:
				return (
					<RepositoryStep
						error={reposError?.message}
						isLoading={isReposLoading && repositories.length === 0}
						onNext={skipRepositories}
						onSelectionChange={setSelectedRepoId}
						repositories={repositories}
						selectedId={selectedRepoId}
					/>
				);
			case 3:
				return (
					<TeamsStep
						invites={teamInvites}
						isLoading={isWorkspaceFetching}
						onCreateInvite={createInvite}
						onNext={complete}
					/>
				);
			default:
				return null;
		}
	};
	return (
		<div className="flex h-full w-full flex-col items-center justify-between gap-8 pt-36 pb-12">
			<div className="flex h-full w-full flex-1">
				<AnimatedStepContent direction={direction} stepKey={currentStep}>
					{renderStep()}
				</AnimatedStepContent>
			</div>
			<div className="flex w-full items-center justify-between">
				{canGoBack ? (
					<Button onClick={goBack} variant="ghost">
						<Icon name="IconChevronLeftMedium" />
						Back
					</Button>
				) : (
					<div />
				)}
				<StepIndicator currentStep={currentStep} totalSteps={STEPS.length} />
			</div>
		</div>
	);
}
