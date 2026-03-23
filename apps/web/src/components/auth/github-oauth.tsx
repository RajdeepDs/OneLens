"use client";

import { Button } from "@onelens/ui/components/button";
import { GitHub, IconLoader } from "@onelens/ui/components/icons";
import { useGlobalHotkeys } from "@onelens/ui/hooks/use-global-hotkeys";
import { AnimatePresence, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.05 },
	},
} as const;

const itemVariants = {
	hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: 0.3, ease: [0.2, 0, 0, 1] as const },
	},
} as const;

const exitVariants = {
	opacity: 0,
	y: -8,
	filter: "blur(4px)",
	transition: { duration: 0.15, ease: "easeIn" as const },
} as const;

const DEFAULT_SIGN_IN_ERROR_MESSAGE = "Something went wrong. Please try again.";

function getErrorMessage(error: unknown): string {
	if (error instanceof Error) {
		return error.message;
	}

	if (typeof error === "string") {
		return error;
	}

	return DEFAULT_SIGN_IN_ERROR_MESSAGE;
}

function AuthErrorToast() {
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const error = searchParams.get("error");
		if (error) {
			const formattedError = error.replace(/_/g, " ");
			toast.error(
				formattedError === "UNAUTHORIZED" || formattedError.includes("waitlist")
					? "You're on the waitlist. We'll notify you once you're approved."
					: getErrorMessage(formattedError),
				{ id: "auth-error" }
			);
			router.replace("/login", { scroll: false });
		}
	}, [searchParams, router]);

	return null;
}

export function GitHubOAuthContainer() {
	const [isLoading, setIsLoading] = useState(false);

	const signIn = async (): Promise<void> => {
		if (isLoading) {
			return;
		}

		setIsLoading(true);

		try {
			const result = await authClient.signIn.social({ provider: "github" });

			if (result?.error) {
				toast.error(result.error.message || DEFAULT_SIGN_IN_ERROR_MESSAGE);
				setIsLoading(false);
			}
		} catch (error: unknown) {
			toast.error(getErrorMessage(error));
			setIsLoading(false);
		}
	};

	useGlobalHotkeys({
		keys: "g",
		callback: () => {
			if (!isLoading) {
				signIn();
			}
		},
		options: { preventDefault: true },
	});

	return (
		<motion.div
			animate="visible"
			className="relative flex w-full flex-col items-center justify-center gap-7"
			initial="hidden"
			variants={containerVariants}
		>
			<Suspense>
				<AuthErrorToast />
			</Suspense>

			<motion.h1
				className="text-balance text-center text-title-small-semibold"
				variants={itemVariants}
			>
				Welcome to OneLens
			</motion.h1>

			<AnimatePresence initial={false} mode="wait">
				{isLoading ? (
					<motion.div
						animate="visible"
						className="flex flex-col items-center justify-center gap-7"
						exit={exitVariants}
						initial="hidden"
						key="loading"
						variants={containerVariants}
					>
						<motion.div className="relative size-5" variants={itemVariants}>
							<motion.div
								animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1, 0.9] }}
								transition={{
									duration: 1.2,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
							>
								<IconLoader className="size-5" />
							</motion.div>
						</motion.div>

						<motion.p
							className="text-center text-body-small-regular text-gray-11"
							variants={itemVariants}
						>
							Redirecting to GitHub...
						</motion.p>
					</motion.div>
				) : (
					<motion.div
						animate="visible"
						className="flex w-full flex-col items-center justify-center gap-7"
						exit={exitVariants}
						initial="hidden"
						key="default"
						variants={containerVariants}
					>
						<motion.div className="w-full" variants={itemVariants}>
							<Button
								className="h-10 w-full font-medium"
								disabled={isLoading}
								icon={<GitHub />}
								onClick={signIn}
								shortcut={"g"}
								size={"lg"}
								variant={"outline"}
							>
								Sign in with GitHub
							</Button>
						</motion.div>

						<motion.p
							className="text-center text-body-small-regular text-gray-11"
							variants={itemVariants}
						>
							By signing in, you agree to our{" "}
							<strong className="font-medium underline underline-offset-2">
								Terms of Service
							</strong>{" "}
							and{" "}
							<strong className="font-medium underline underline-offset-2">
								Privacy Policy
							</strong>
						</motion.p>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
