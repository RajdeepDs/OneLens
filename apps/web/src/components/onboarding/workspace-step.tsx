"use client";

import { Button } from "@onelens/ui/components/button";
import { Field, FieldError, FieldLabel } from "@onelens/ui/components/field";
import { Input } from "@onelens/ui/components/input";
import { motion } from "motion/react";
import { useState } from "react";

interface WorkspaceStepProps {
	initialValue?: string;
	isLoading?: boolean;
	onNext: (data: { name: string; slug: string }) => void;
}

function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export function WorkspaceStep({
	initialValue = "",
	onNext,
	isLoading = false,
}: WorkspaceStepProps) {
	const [name, setName] = useState(initialValue);
	const [error, setError] = useState<string | null>(null);

	const slug = name ? slugify(name) : "";

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim()) {
			setError("Workspace name is required");
			return;
		}
		setError(null);
		onNext({ name: name.trim(), slug });
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
				<h2 className="text-title-small-semibold">Create your workspace</h2>
				<p className="text-body-regular-spaced text-gray-11">
					Your workspace is where your team&apos;s pull requests live.
				</p>
			</div>

			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<Field>
					<FieldLabel htmlFor="workspace-name">Workspace name</FieldLabel>
					<Input
						aria-invalid={!!error}
						className="h-10"
						disabled={isLoading}
						id="workspace-name"
						onChange={(e) => {
							setName(e.target.value);
							if (error) {
								setError(null);
							}
						}}
						placeholder="Acme Corp"
						value={name}
					/>
					{error && <FieldError>{error}</FieldError>}
				</Field>

				<Field>
					<FieldLabel htmlFor="workspace-slug">Workspace slug</FieldLabel>
					<div className="relative">
						<Input
							className="h-10 ps-33.5"
							disabled
							id="workspace-slug"
							placeholder="acme-corp"
							value={slug}
						/>
						<span className="pointer-events-none absolute inset-s-0 inset-y-0 flex items-center justify-center ps-3 text-body-small-spaced text-gray-11 peer-disabled:opacity-50">
							onelens.vercel.app/
						</span>
					</div>
				</Field>

				<Button
					className="h-10 w-full"
					disabled={!name.trim() || isLoading}
					type="submit"
				>
					{isLoading ? "Creating..." : "Continue"}
				</Button>
			</form>
		</motion.div>
	);
}
