"use client";

import { Button } from "@onelens/ui/components/button";
import { GitHub, IconLoader } from "@onelens/ui/components/icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.1, delayChildren: 0.05 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: 0.3, ease: [0.2, 0, 0, 1] as const },
	},
};

const exitVariants = {
	opacity: 0,
	y: -8,
	filter: "blur(4px)",
	transition: { duration: 0.15, ease: "easeIn" as const },
};

export function GitHubOAuthContainer() {
	const [isLoading, setIsLoading] = useState(false);

	const signIn = () => {
		setIsLoading(true);
		authClient.signIn.social({
			provider: "github",
		});
	};

	return (
		<motion.div
			animate="visible"
			className="relative flex w-full flex-col items-center justify-center gap-7"
			initial="hidden"
			variants={containerVariants}
		>
			<motion.h1
				className="text-balance text-center font-medium text-xl leading-7"
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
							className="text-center text-[13px] text-gray-11"
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
							className="text-center text-[13px] text-gray-11"
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
