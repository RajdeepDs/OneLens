"use client";

import { Button } from "@onelens/ui/components/button";
import { Field, FieldError } from "@onelens/ui/components/field";
import { Input } from "@onelens/ui/components/input";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import { orpc } from "@/utils/orpc";

export function JoinWaitlistForm() {
	const mutation = useMutation(
		orpc.joinWaitlist.mutationOptions({
			onSuccess: (data) => {
				toast.success(data.message);
				form.reset();
			},
			onError: (error) => {
				toast.error(error.message || "Something went wrong");
			},
		})
	);

	const form = useForm({
		defaultValues: {
			email: "",
		},
		onSubmit: ({ value }) => {
			mutation.mutate(value);
		},
		validators: {
			onSubmit: z.object({
				email: z.email("Please enter a valid email address"),
			}),
		},
	});

	return (
		<form
			className="w-full space-y-4"
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<form.Field name="email">
				{(field) => (
					<Field>
						<Input
							className="h-9 placeholder:text-[13px] placeholder-shown:pb-2"
							id={field.name}
							name={field.name}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder="name@company.com"
							type="email"
							value={field.state.value}
						/>
						<FieldError errors={field.state.meta.errors} />
					</Field>
				)}
			</form.Field>
			<form.Subscribe
				selector={(state) => ({
					canSubmit: state.canSubmit,
					isSubmitting: state.isSubmitting,
				})}
			>
				{({ canSubmit }) => (
					<Button
						className="w-full"
						disabled={!canSubmit || mutation.isPending}
						size="lg"
						type="submit"
					>
						{mutation.isPending ? "Submitting..." : "Submit"}
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
}
