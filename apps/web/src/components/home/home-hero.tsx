import * as motion from "motion/react-client";
import type { Route } from "next";
import Link from "next/link";

function AnimatedWords({
	text,
	className,
	delayOffset = 0,
}: {
	text: string;
	className?: string;
	delayOffset?: number;
}) {
	const words = text.split(" ");
	return (
		<>
			{words.map((word, i) => (
				<motion.span
					animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					className={className}
					initial={{ opacity: 0, y: 8, filter: "blur(10px)" }}
					key={i}
					style={{ display: "inline-block", whiteSpace: "pre" }}
					transition={{
						delay: delayOffset + i * WORD_STAGGER,
						duration: 0.85,
						ease: [0.16, 1, 0.3, 1],
					}}
				>
					{word}
					{i < words.length - 1 ? " " : ""}
				</motion.span>
			))}
		</>
	);
}

const PHRASE1_WORDS = 5;
const WORD_STAGGER = 0.12;
const INITIAL_DELAY = 0.3;
const PHRASE2_DELAY = INITIAL_DELAY + PHRASE1_WORDS * WORD_STAGGER + 0.18;

const PHRASE2_WORDS = 3;
const BODY_DELAY = PHRASE2_DELAY + PHRASE2_WORDS * WORD_STAGGER + 0.45;
const CTA_DELAY = BODY_DELAY + 0.35;

export function HomeHero() {
	return (
		<div className="relative mt-32">
			<div className="relative flex flex-col gap-8 text-balance">
				{/* Heading */}
				<div className="flex items-center text-wrap sm:max-w-lg md:max-w-3xl">
					<h1 className="font-semibold text-4xl leading-10 tracking-tight md:text-[56px] md:leading-13 md:tracking-normal">
						<AnimatedWords
							delayOffset={INITIAL_DELAY}
							text="The PR workflow is broken."
						/>{" "}
						<AnimatedWords
							className="font-semibold text-4xl text-gray-11 italic md:text-5xl"
							delayOffset={PHRASE2_DELAY}
							text="We're fixing it."
						/>
					</h1>
				</div>

				<div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-0">
					<motion.p
						animate={{ opacity: 1, filter: "blur(0px)" }}
						className="text-[15px] text-gray-11 leading-6 sm:max-w-lg md:max-w-3xl md:leading-7"
						initial={{ opacity: 0, filter: "blur(10px)" }}
						transition={{
							delay: BODY_DELAY,
							duration: 1.0,
							ease: [0.16, 1, 0.3, 1],
						}}
					>
						Every engineering team spends human effort on work that
						shouldn&apos;t require humans. We&apos;re building the product that
						changes that.
					</motion.p>

					<motion.div
						animate={{ opacity: 1, filter: "blur(0px)" }}
						className="hidden sm:flex"
						initial={{ opacity: 0, filter: "blur(8px)" }}
						transition={{
							delay: CTA_DELAY,
							duration: 0.9,
							ease: [0.16, 1, 0.3, 1],
						}}
					>
						<Link
							className="whitespace-nowrap text-[15px] text-gray-11 transition-colors ease-in hover:text-foreground"
							href={"/waitlist" as Route}
						>
							Join waitlist &rarr;
						</Link>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
