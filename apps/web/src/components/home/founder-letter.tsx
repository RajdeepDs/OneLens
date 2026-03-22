"use client";

import { useReducedMotion } from "motion/react";
import * as motion from "motion/react-client";

const NORMAL_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
const STAGGER_DELAY = 0.08;

function AnimatedParagraph({
	children,
	delayOffset = 0,
}: {
	children: React.ReactNode;
	delayOffset?: number;
}) {
	const shouldReduceMotion = useReducedMotion();

	const initial = shouldReduceMotion
		? {
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				scale: 1,
			}
		: {
				opacity: 0,
				y: 8,
				filter: "blur(4px)",
				scale: 0.98,
			};

	return (
		<motion.p
			animate={{
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				scale: 1,
			}}
			className="text-[15px] text-gray-11"
			initial={initial}
			transition={{
				delay: shouldReduceMotion ? 0 : delayOffset,
				duration: shouldReduceMotion ? 0 : 0.5,
				ease: shouldReduceMotion ? undefined : NORMAL_EASE,
			}}
		>
			{children}
		</motion.p>
	);
}

function AnimatedHeading({
	children,
	delayOffset = 0,
}: {
	children: React.ReactNode;
	delayOffset?: number;
}) {
	const shouldReduceMotion = useReducedMotion();

	const initial = shouldReduceMotion
		? {
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				scale: 1,
			}
		: {
				opacity: 0,
				y: 10,
				filter: "blur(6px)",
				scale: 0.98,
			};

	return (
		<motion.h2
			animate={{
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				scale: 1,
			}}
			className="text-balance font-semibold text-foreground text-lg"
			initial={initial}
			transition={{
				delay: shouldReduceMotion ? 0 : delayOffset,
				duration: shouldReduceMotion ? 0 : 0.45,
				ease: shouldReduceMotion ? undefined : NORMAL_EASE,
			}}
		>
			{children}
		</motion.h2>
	);
}

function AnimatedDivider({ delayOffset = 0 }: { delayOffset?: number }) {
	const shouldReduceMotion = useReducedMotion();

	const initial = shouldReduceMotion
		? {
				scaleX: 1,
				opacity: 0.3,
			}
		: {
				scaleX: 0,
				opacity: 0,
			};

	return (
		<motion.hr
			animate={{
				scaleX: 1,
				opacity: 0.3,
			}}
			className="my-4 origin-left"
			initial={initial}
			transition={{
				delay: shouldReduceMotion ? 0 : delayOffset,
				duration: shouldReduceMotion ? 0 : 0.4,
				ease: shouldReduceMotion ? undefined : NORMAL_EASE,
			}}
		/>
	);
}

function AnimatedSignature({ delayOffset = 0 }: { delayOffset?: number }) {
	const shouldReduceMotion = useReducedMotion();

	const initial = shouldReduceMotion
		? {
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				scale: 1,
			}
		: {
				opacity: 0,
				y: 6,
				filter: "blur(4px)",
				scale: 0.98,
			};

	return (
		<motion.div
			animate={{
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				scale: 1,
			}}
			className="flex flex-col gap-1 pt-8 text-gray-11 text-sm"
			initial={initial}
			transition={{
				delay: shouldReduceMotion ? 0 : delayOffset,
				duration: shouldReduceMotion ? 0 : 0.45,
				ease: shouldReduceMotion ? undefined : NORMAL_EASE,
			}}
		>
			<span className="text-base text-foreground">Rajdeep</span>
			<span>Founder, OneLens</span>
		</motion.div>
	);
}

export function FounderLetter() {
	const shouldReduceMotion = useReducedMotion();

	const INITIAL_DELAY = shouldReduceMotion ? 0 : 0.8;
	const HEADING_DELAY = INITIAL_DELAY + STAGGER_DELAY;
	const DIVIDER_DELAY = HEADING_DELAY + STAGGER_DELAY;
	const PARA_1_DELAY = DIVIDER_DELAY + STAGGER_DELAY;
	const PARA_2_DELAY = PARA_1_DELAY + 0.15;
	const PARA_3_DELAY = PARA_2_DELAY + 0.15;
	const PARA_4_DELAY = PARA_3_DELAY + 0.12;
	const PARA_5_DELAY = PARA_4_DELAY + 0.1;
	const PARA_6_DELAY = PARA_5_DELAY + 0.15;
	const PARA_7_DELAY = PARA_6_DELAY + 0.15;
	const SIG_DELAY = PARA_7_DELAY + 0.15;

	const containerInitial = shouldReduceMotion
		? { opacity: 1, filter: "blur(0px)" }
		: { opacity: 0, filter: "blur(8px)" };

	return (
		<motion.section
			animate={{ opacity: 1, filter: "blur(0px)" }}
			className="relative mx-auto my-28 max-w-2xl rounded-2xl border border-border/50 bg-white p-4 shadow-foreground/5 shadow-xl sm:p-12 dark:bg-gray-1 dark:shadow-foreground/10"
			initial={containerInitial}
			transition={{
				delay: shouldReduceMotion ? 0 : INITIAL_DELAY - 0.3,
				duration: shouldReduceMotion ? 0 : 0.6,
				ease: shouldReduceMotion ? undefined : NORMAL_EASE,
			}}
		>
			<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl">
				<div className="pointer-events-none absolute -bottom-1/2 -left-1/4 size-full rounded-full bg-linear-to-t from-alpha-1/50 to-transparent blur-3xl" />
				<div className="pointer-events-none absolute -top-1/4 -right-1/4 size-[80%] rounded-full bg-linear-to-b from-alpha-1/30 to-transparent blur-3xl" />
			</div>

			<div className="flex flex-col gap-4">
				<AnimatedHeading delayOffset={HEADING_DELAY}>
					Introducing OneLens
				</AnimatedHeading>
				<AnimatedDivider delayOffset={DIVIDER_DELAY} />

				<AnimatedParagraph delayOffset={PARA_1_DELAY}>
					Engineering teams spend a significant part of their week not building
					but preparing to build, waiting to ship, explaining what they built.
				</AnimatedParagraph>

				<AnimatedParagraph delayOffset={PARA_2_DELAY}>
					We&apos;ve accepted this. We&apos;ve built entire workflows around it.
					Standup rituals to explain what should be obvious. Review processes
					that bottleneck on whoever is least busy. CI pipelines that produce
					output nobody fully understands. Habits layered on top of habits, all
					treating the symptom while the problem stays untouched.
				</AnimatedParagraph>

				<AnimatedParagraph delayOffset={PARA_3_DELAY}>
					<strong className="font-medium text-foreground">
						We&apos;ve professionalized the ceremony of shipping software.
					</strong>{" "}
					And somewhere along the way, convinced ourselves this is just what
					engineering looks like.
				</AnimatedParagraph>

				<AnimatedParagraph delayOffset={PARA_4_DELAY}>
					But why?
				</AnimatedParagraph>

				<AnimatedParagraph delayOffset={PARA_5_DELAY}>
					The information needed to eliminate most of this work already exists.
					It lives in your commits, your tickets, your test history, your
					codebase. The context is there. The knowledge is there.{" "}
					<em>It just never gets used,</em> so humans fill the gap, manually,
					every day, at every team.
				</AnimatedParagraph>

				<AnimatedParagraph delayOffset={PARA_6_DELAY}>
					We think that&apos;s worth fixing. Not with another integration. Not
					with another layer of tooling on top of already broken tooling. But by
					building something that actually owns the problem, with the craft and
					conviction it deserves.
				</AnimatedParagraph>

				<AnimatedParagraph delayOffset={PARA_7_DELAY}>
					We&apos;re just getting started. If this resonates, we&apos;d love to
					hear from you.
				</AnimatedParagraph>

				<AnimatedSignature delayOffset={SIG_DELAY} />
			</div>
		</motion.section>
	);
}
