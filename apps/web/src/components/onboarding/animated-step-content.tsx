"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const slideVariants: Variants = {
	enter: (direction: number) => ({
		y: direction > 0 ? 24 : -24,
		opacity: 0,
	}),
	center: {
		y: 0,
		opacity: 1,
	},
	exit: (direction: number) => ({
		y: direction < 0 ? 24 : -24,
		opacity: 0,
	}),
};

interface AnimatedStepContentProps {
	children: ReactNode;
	direction: number;
	stepKey: string | number;
}

export function AnimatedStepContent({
	children,
	direction,
	stepKey,
}: AnimatedStepContentProps) {
	return (
		<AnimatePresence custom={direction} initial={false} mode="wait">
			<motion.div
				animate="center"
				className="w-full"
				custom={direction}
				exit="exit"
				initial="enter"
				key={stepKey}
				transition={{
					duration: 0.18,
					ease: [0.25, 0.1, 0.25, 1],
				}}
				variants={slideVariants}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
