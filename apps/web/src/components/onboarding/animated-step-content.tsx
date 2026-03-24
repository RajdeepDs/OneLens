"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const slideVariants: Variants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 80 : -80,
		opacity: 0,
		filter: "blur(4px)",
	}),
	center: {
		x: 0,
		opacity: 1,
		filter: "blur(0px)",
	},
	exit: (direction: number) => ({
		x: direction < 0 ? 80 : -80,
		opacity: 0,
		filter: "blur(4px)",
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
					type: "spring",
					stiffness: 200,
					damping: 25,
					bounce: 0,
				}}
				variants={slideVariants}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
