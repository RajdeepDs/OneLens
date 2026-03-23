"use client";

import { Button } from "@onelens/ui/components/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@onelens/ui/components/field";
import { Input } from "@onelens/ui/components/input";
import { motion } from "motion/react";
import { useState } from "react";

interface WorkspaceStepProps {
	initialValue?: string;
	isLoading?: boolean;
	onNext: (name: string) => void;
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
		onNext(name.trim());
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
					Create your workspace
				</h2>
				<p className="text-muted-foreground text-sm">
					This will be the home for your team&apos;s code reviews and pull
					requests.
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
					{!error && slug && (
						<FieldDescription>
							Slug: <span className="font-mono text-xs">{slug}</span>
						</FieldDescription>
					)}
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
