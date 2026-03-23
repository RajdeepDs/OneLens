"use client";

import { Button } from "@onelens/ui/components/button";
import { Checkbox } from "@onelens/ui/components/checkbox";
import { IconMagnifyingGlass } from "@onelens/ui/components/icons";
import { Input } from "@onelens/ui/components/input";
import { Skeleton } from "@onelens/ui/components/skeleton";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

export interface Repository {
	defaultBranch: string;
	fullName: string;
	id: number;
	isPrivate: boolean;
	url: string;
}

interface RepositoryStepProps {
	isLoading?: boolean;
	onNext: () => void;
	onSelectionChange: (ids: number[]) => void;
	onSkip?: () => void;
	repositories: Repository[];
	selectedIds: number[];
}

export function RepositoryStep({
	repositories,
	isLoading = false,
	selectedIds,
	onSelectionChange,
	onNext,
	onSkip,
}: RepositoryStepProps) {
	const [search, setSearch] = useState("");

	const filteredRepos = useMemo(() => {
		if (!search.trim()) {
			return repositories;
		}
		const query = search.toLowerCase();
		return repositories.filter((repo) =>
			repo.fullName.toLowerCase().includes(query)
		);
	}, [repositories, search]);

	const handleToggle = (id: number) => {
		if (selectedIds.includes(id)) {
			onSelectionChange(selectedIds.filter((repoId) => repoId !== id));
		} else {
			onSelectionChange([...selectedIds, id]);
		}
	};

	const handleSelectAll = () => {
		if (selectedIds.length === filteredRepos.length) {
			onSelectionChange([]);
		} else {
			onSelectionChange(filteredRepos.map((repo) => repo.id));
		}
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
				<h2 className="font-medium text-lg leading-snug">
					Select repositories
				</h2>
				<p className="text-muted-foreground text-sm">
					Choose which repositories you want to track for pull request reviews.
				</p>
			</div>

			<div className="relative">
				<IconMagnifyingGlass className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					className="h-10 pl-8"
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search repositories..."
					value={search}
				/>
			</div>

			<div className="flex max-h-80 flex-col gap-1 overflow-y-auto">
				{isLoading &&
					[1, 2, 3, 4, 5].map((i) => (
						<div className="flex items-center gap-3 p-2" key={i}>
							<Skeleton className="size-4 rounded" />
							<Skeleton className="h-4 w-48 rounded" />
						</div>
					))}

				{!isLoading && filteredRepos.length === 0 && (
					<div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
						<p className="text-muted-foreground text-sm">
							{search ? "No repositories found" : "No repositories available"}
						</p>
					</div>
				)}

				{!isLoading && filteredRepos.length > 0 && (
					<>
						<div className="flex items-center gap-2 px-2 pb-2">
							<Checkbox
								checked={
									selectedIds.length === filteredRepos.length &&
									filteredRepos.length > 0
								}
								onCheckedChange={handleSelectAll}
							/>
							<span className="text-muted-foreground text-xs">
								Select all ({filteredRepos.length})
							</span>
						</div>
						{filteredRepos.map((repo) => (
							<label
								className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
								htmlFor={`repo-${repo.id}`}
								key={repo.id}
							>
								<Checkbox
									checked={selectedIds.includes(repo.id)}
									id={`repo-${repo.id}`}
									onCheckedChange={() => handleToggle(repo.id)}
								/>
								<div className="flex min-w-0 flex-1 flex-col gap-0.5">
									<span className="truncate font-medium text-sm">
										{repo.fullName}
									</span>
									<div className="flex items-center gap-2">
										{repo.isPrivate && (
											<span className="rounded bg-muted px-1.5 py-0.5 font-medium text-[10px] text-muted-foreground uppercase">
												Private
											</span>
										)}
										<span className="text-muted-foreground text-xs">
											{repo.defaultBranch}
										</span>
									</div>
								</div>
							</label>
						))}
					</>
				)}
			</div>

			<div className="flex flex-col gap-3">
				<Button
					className="h-10 w-full"
					disabled={selectedIds.length === 0}
					onClick={onNext}
				>
					Continue {selectedIds.length > 0 && `(${selectedIds.length})`}
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
