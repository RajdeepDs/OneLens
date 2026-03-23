"use client";

import { useQuery } from "@tanstack/react-query";
import type { Repository } from "@/components/onboarding/RepositoryStep";
import { client } from "@/utils/orpc";

const GITHUB_REPOS_STALE_TIME = 5 * 60 * 1000;
const GITHUB_REPOS_GC_TIME = 10 * 60 * 1000;

export function useGitHubRepos() {
	return useQuery({
		queryKey: ["github-repos"],
		queryFn: async (): Promise<Repository[]> => {
			const repos = await client.getGithubRepos({});
			return repos;
		},
		staleTime: GITHUB_REPOS_STALE_TIME,
		gcTime: GITHUB_REPOS_GC_TIME,
		retry: 1,
	});
}
